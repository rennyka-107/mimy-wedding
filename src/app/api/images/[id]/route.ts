import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users, images } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { promises as fs } from 'fs';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// API để xem chi tiết một ảnh
export async function GET(req: Request, { params }: Params) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để thực hiện thao tác này' },
        { status: 401 }
      );
    }

    // Tìm user_id dựa trên email
    const user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email)
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Không tìm thấy thông tin người dùng' },
        { status: 404 }
      );
    }

    // Tìm ảnh theo ID và kiểm tra quyền sở hữu
    const image = await db.query.images.findFirst({
      where: and(
        eq(images.id, resolvedParams.id),
        eq(images.userId, user.id)
      ),
    });

    if (!image) {
      return NextResponse.json(
        { error: 'Không tìm thấy ảnh hoặc bạn không có quyền truy cập' },
        { status: 404 }
      );
    }

    // Trả về thông tin chi tiết ảnh
    return NextResponse.json({
      success: true,
      image: {
        id: image.id,
        name: image.name,
        originalName: image.originalName,
        url: image.url,
        mimeType: image.mimeType,
        size: image.size,
        used: image.used,
        createdAt: image.createdAt,
        updatedAt: image.updatedAt
      }
    });
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết ảnh:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}

// API để cập nhật thông tin ảnh
export async function PATCH(req: Request, { params }: Params) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để thực hiện thao tác này' },
        { status: 401 }
      );
    }

    // Tìm user_id dựa trên email
    const user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email)
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Không tìm thấy thông tin người dùng' },
        { status: 404 }
      );
    }

    // Kiểm tra xem ảnh có tồn tại và thuộc về user không
    const existingImage = await db.query.images.findFirst({
      where: and(
        eq(images.id, resolvedParams.id),
        eq(images.userId, user.id)
      ),
    });

    if (!existingImage) {
      return NextResponse.json(
        { error: 'Không tìm thấy ảnh hoặc bạn không có quyền truy cập' },
        { status: 404 }
      );
    }

    // Lấy dữ liệu cập nhật từ request body
    const body = await req.json();
    const { used } = body;

    // Cập nhật thông tin ảnh
    const updatedImage = await db
      .update(images)
      .set({
        used: used !== undefined ? used : existingImage.used,
        updatedAt: new Date()
      })
      .where(eq(images.id, resolvedParams.id))
      .returning();

    return NextResponse.json({
      success: true,
      image: updatedImage[0]
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật ảnh:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}

// API để xóa ảnh
export async function DELETE(req: Request, { params }: Params) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để thực hiện thao tác này' },
        { status: 401 }
      );
    }

    // Tìm user_id dựa trên email
    const user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email)
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Không tìm thấy thông tin người dùng' },
        { status: 404 }
      );
    }

    // Kiểm tra xem ảnh có tồn tại và thuộc về user không
    const imageToDelete = await db.query.images.findFirst({
      where: and(
        eq(images.id, resolvedParams.id),
        eq(images.userId, user.id)
      ),
    });

    if (!imageToDelete) {
      return NextResponse.json(
        { error: 'Không tìm thấy ảnh hoặc bạn không có quyền truy cập' },
        { status: 404 }
      );
    }

    // Nếu ảnh đang được sử dụng, không cho phép xóa
    if (imageToDelete.used) {
      return NextResponse.json(
        { error: 'Không thể xóa ảnh đang được sử dụng trong thiệp cưới' },
        { status: 403 }
      );
    }

    // Xóa file từ hệ thống nếu tồn tại
    try {
      await fs.unlink(imageToDelete.path);
    } catch (err) {
      console.warn(`Không thể xóa file ${imageToDelete.path} từ hệ thống`, err);
    }

    // Xóa record trong database
    await db
      .delete(images)
      .where(eq(images.id, resolvedParams.id));

    return NextResponse.json({
      success: true,
      message: 'Đã xóa ảnh thành công'
    });
  } catch (error) {
    console.error('Lỗi khi xóa ảnh:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}
