import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function PUT(req: Request) {
  try {
    // Lấy session hiện tại để xác thực người dùng
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để thực hiện thao tác này' },
        { status: 401 }
      );
    }

    // Lấy dữ liệu từ request body
    const body = await req.json();
    const { name, phone } = body;

    // Validate dữ liệu
    if (!name) {
      return NextResponse.json(
        { error: 'Tên không được để trống' },
        { status: 400 }
      );
    }

    // Cập nhật thông tin người dùng trong database
    const updatedUser = await db
      .update(users)
      .set({
        name,
        phone: phone || null,
        updatedAt: new Date()
      })
      .where(eq(users.email, session.user.email))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json(
        { error: 'Không tìm thấy người dùng' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Cập nhật thông tin thành công',
      user: {
        name: updatedUser[0].name,
        email: updatedUser[0].email,
        phone: updatedUser[0].phone,
      }
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin người dùng:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}

// API để lấy thông tin người dùng hiện tại
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để thực hiện thao tác này' },
        { status: 401 }
      );
    }

    // Lấy thông tin user từ database
    const user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email)
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Không tìm thấy người dùng' },
        { status: 404 }
      );
    }

    // Trả về thông tin cơ bản của người dùng (không bao gồm password)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
        emailVerified: user.emailVerified
      }
    });
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người dùng:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}
