import { db } from "@/db";
import { users, verificationCodes } from "@/db/schema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, code } = body;

    // Validate input data
    if (!name || !email || !password || !code) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Mật khẩu phải có ít nhất 8 ký tự" },
        { status: 400 }
      );
    }

    // Check verification code
    const verificationRecord = await db.query.verificationCodes.findFirst({
      where: eq(verificationCodes.email, email)
    });

    // Kiểm tra mã xác thực
    if (!verificationRecord) {
      return NextResponse.json(
        { error: "Chưa gửi mã xác thực cho email này" },
        { status: 400 }
      );
    }

    if (verificationRecord.code !== code) {
      return NextResponse.json(
        { error: "Mã xác thực không chính xác" },
        { status: 400 }
      );
    }

    // Kiểm tra thời hạn
    if (new Date() > verificationRecord.expires) {
      return NextResponse.json(
        { error: "Mã xác thực đã hết hạn, vui lòng gửi lại mã mới" },
        { status: 400 }
      );
    }
    
    // Check if email already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email)
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email đã được sử dụng" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        emailVerified: new Date() // Đánh dấu email đã được xác thực
      })
      .returning({ id: users.id, name: users.name, email: users.email });
    
    // Đánh dấu mã xác thực đã được sử dụng
    await db
      .update(verificationCodes)
      .set({ verified: true })
      .where(eq(verificationCodes.email, email));

    return NextResponse.json({
      success: true,
      user: newUser[0]
    }, { status: 201 });

  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { error: "Đăng ký không thành công, vui lòng thử lại sau" },
      { status: 500 }
    );
  }
}
