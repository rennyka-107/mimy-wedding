import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users, images } from '@/db/schema';
import { eq, and, inArray } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { promises as fs } from 'fs';

// API để xóa nhiều ảnh cùng lúc
export async function POST(req: Request) {
  try {
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

    // Lấy danh sách ID ảnh cần xóa từ request body
    const body = await req.json();
    const { imageIds } = body;

    if (!imageIds || !Array.isArray(imageIds) || imageIds.length === 0) {
      return NextResponse.json(
        { error: 'Danh sách ảnh cần xóa không hợp lệ' },
        { status: 400 }
      );
    }

    // Tìm tất cả các ảnh cần xóa mà thuộc về user
    const imagesToDelete = await db.query.images.findMany({
      where: and(
        eq(images.userId, user.id),
        inArray(images.id, imageIds)
      ),
    });

    if (imagesToDelete.length === 0) {
      return NextResponse.json(
        { error: 'Không tìm thấy ảnh nào để xóa' },
        { status: 404 }
      );
    }

    // Kiểm tra xem có ảnh nào đang được sử dụng không
    const usedImages = imagesToDelete.filter(img => img.used);
    if (usedImages.length > 0) {
      return NextResponse.json({
        error: `Không thể xóa ${usedImages.length} ảnh đang được sử dụng trong thiệp cưới`,
        usedImageIds: usedImages.map(img => img.id)
      }, { status: 403 });
    }

    // Xóa tất cả các file từ hệ thống
    for (const image of imagesToDelete) {
      try {
        await fs.unlink(image.path);
      } catch (err) {
        console.warn(`Không thể xóa file ${image.path} từ hệ thống`, err);
      }
    }

    // Xóa tất cả các record trong database
    await db
      .delete(images)
      .where(and(
        eq(images.userId, user.id),
        inArray(images.id, imageIds)
      ));

    // Đếm số lượng ảnh đã xóa
    const deletedCount = imagesToDelete.length;

    return NextResponse.json({
      success: true,
      message: `Đã xóa ${deletedCount} ảnh thành công`,
      deletedCount
    });
  } catch (error) {
    console.error('Lỗi khi xóa nhiều ảnh:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}
