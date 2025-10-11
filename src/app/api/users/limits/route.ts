import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users, images } from '@/db/schema';
import { eq, count } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// API để lấy thông tin giới hạn và mức sử dụng của người dùng
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để thực hiện thao tác này' },
        { status: 401 }
      );
    }

    // Lấy thông tin user
    const user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email)
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Không tìm thấy thông tin người dùng' },
        { status: 404 }
      );
    }

    // Đếm số lượng ảnh hiện tại của user từ bảng images
    const imageCountResult = await db
      .select({ count: count() })
      .from(images)
      .where(eq(images.userId, user.id));
    
    const imageUsed = imageCountResult[0]?.count || 0;
    
    // Trả về thông tin giới hạn
    return NextResponse.json({
      success: true,
      limits: {
        image: {
          limit: user.image_limit,
          used: imageUsed,
          remaining: Math.max(0, user.image_limit - imageUsed)
        },
        draft: {
          limit: user.draft_limit,
          used: user.draft_used,
          remaining: Math.max(0, user.draft_limit - (user.draft_used || 0))
        }
      }
    });
  } catch (error) {
    console.error('Lỗi khi lấy thông tin giới hạn:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}

// API để cập nhật giới hạn người dùng (chỉ dành cho admin)
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để thực hiện thao tác này' },
        { status: 401 }
      );
    }

    // TODO: Kiểm tra quyền admin (cần triển khai)
    
    // Lấy dữ liệu từ request
    const body = await req.json();
    const { userId, image_limit, draft_limit } = body;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Thiếu thông tin người dùng' },
        { status: 400 }
      );
    }

    // Tìm user cần cập nhật
    const userToUpdate = await db.query.users.findFirst({
      where: eq(users.id, userId)
    });

    if (!userToUpdate) {
      return NextResponse.json(
        { error: 'Không tìm thấy người dùng cần cập nhật' },
        { status: 404 }
      );
    }

    // Tạo object chứa các trường cần cập nhật
    const updateData: { [key: string]: string | number | boolean | Date | null } = {
      updatedAt: new Date()
    };

    if (image_limit !== undefined) updateData.image_limit = image_limit;
    if (draft_limit !== undefined) updateData.draft_limit = draft_limit;

    // Cập nhật thông tin giới hạn
    const updatedUser = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId))
      .returning();

    // Đếm số lượng ảnh hiện tại của user từ bảng images
    const imageCountResult = await db
      .select({ count: count() })
      .from(images)
      .where(eq(images.userId, userId));
    
    const imageUsed = imageCountResult[0]?.count || 0;
    
    return NextResponse.json({
      success: true,
      limits: {
        image: {
          limit: updatedUser[0].image_limit,
          used: imageUsed,
          remaining: Math.max(0, updatedUser[0].image_limit - imageUsed)
        },
        draft: {
          limit: updatedUser[0].draft_limit,
          used: updatedUser[0].draft_used,
          remaining: Math.max(0, updatedUser[0].draft_limit - (updatedUser[0].draft_used || 0))
        }
      }
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật giới hạn:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}
