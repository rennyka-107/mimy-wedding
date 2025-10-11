import { NextResponse } from 'next/server';
import { db } from '@/db';
import { verificationCodes, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import nodemailer from 'nodemailer';

// Hàm tạo mã OTP 6 chữ số
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Hàm tạo thời hạn 10 phút từ thời điểm hiện tại
function getExpiryTime() {
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 10); // 10 phút
  return expiryDate;
}

// Cấu hình mail transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email không được để trống' },
        { status: 400 }
      );
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Định dạng email không hợp lệ' },
        { status: 400 }
      );
    }

    // Kiểm tra xem email đã tồn tại trong database chưa
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email)
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email đã được đăng ký' },
        { status: 400 }
      );
    }

    // Tạo mã xác thực mới
    const verificationCode = generateOTP();
    const expires = getExpiryTime();

    // Xóa mã cũ nếu có
    await db.delete(verificationCodes).where(eq(verificationCodes.email, email));

    // Lưu mã mới vào database
    await db.insert(verificationCodes).values({
      email,
      code: verificationCode,
      expires,
      verified: false
    });

    // Gửi email
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME || 'Mimy Wedding'}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: 'Mã xác thực đăng ký tài khoản',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #CE6F70; text-align: center;">Mimy Wedding</h2>
          <div style="padding: 20px; border: 1px solid #f7d4d4; border-radius: 5px;">
            <h3>Xác thực email</h3>
            <p>Chào bạn,</p>
            <p>Cảm ơn bạn đã đăng ký tài khoản Mimy Wedding. Vui lòng sử dụng mã xác thực bên dưới để hoàn tất quá trình đăng ký:</p>
            <div style="text-align: center; margin: 20px 0;">
              <div style="font-size: 24px; font-weight: bold; letter-spacing: 5px; padding: 10px; background-color: #f7f7f7; border-radius: 5px; display: inline-block;">
                ${verificationCode}
              </div>
            </div>
            <p>Mã này có hiệu lực trong 10 phút.</p>
            <p>Nếu bạn không yêu cầu đăng ký tài khoản, vui lòng bỏ qua email này.</p>
            <p>Trân trọng,<br>Đội ngũ Mimy Wedding</p>
          </div>
        </div>
      `
    };

    // Gửi email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Mã xác thực đã được gửi đến email của bạn' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending verification code:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}

// API để xác thực mã OTP
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { email, code, name, password } = body;

    if (!email || !code || !name || !password) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc' },
        { status: 400 }
      );
    }

    // Tìm mã xác thực
    const verificationRecord = await db.query.verificationCodes.findFirst({
      where: eq(verificationCodes.email, email)
    });

    if (!verificationRecord) {
      return NextResponse.json(
        { error: 'Không tìm thấy mã xác thực' },
        { status: 400 }
      );
    }

    // Kiểm tra mã xác thực có hợp lệ không
    if (verificationRecord.code !== code) {
      return NextResponse.json(
        { error: 'Mã xác thực không chính xác' },
        { status: 400 }
      );
    }

    // Kiểm tra thời hạn
    if (new Date() > verificationRecord.expires) {
      return NextResponse.json(
        { error: 'Mã xác thực đã hết hạn' },
        { status: 400 }
      );
    }

    // Đánh dấu đã xác thực
    await db
      .update(verificationCodes)
      .set({ verified: true })
      .where(eq(verificationCodes.email, email));

    // Trả về thành công để client tiếp tục đăng ký với thông tin đã xác thực
    return NextResponse.json(
      { message: 'Xác thực thành công', verified: true, email, name },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying code:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}
