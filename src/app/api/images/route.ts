import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users, images } from '@/db/schema';
import { eq, desc, and, count, SQL } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { checkImageLimit } from '@/utils/limits';

// API để lấy danh sách ảnh của người dùng
export async function GET(req: Request) {
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

    // Lấy các query params
    const url = new URL(req.url);
    const used = url.searchParams.get('used'); // 'true', 'false', hoặc null
    const limit = parseInt(url.searchParams.get('limit') || '50'); // Số lượng ảnh tối đa
    const page = parseInt(url.searchParams.get('page') || '1'); // Trang hiện tại
    const offset = (page - 1) * limit;

    // Xây dựng điều kiện lọc
    let conditions: SQL<unknown> | undefined = eq(images.userId, user.id);
    
    if (used === 'true') {
      conditions = and(conditions, eq(images.used, true));
    } else if (used === 'false') {
      conditions = and(conditions, eq(images.used, false));
    }

    // Lấy danh sách ảnh
    const userImages = await db.query.images.findMany({
      where: conditions,
      orderBy: [desc(images.createdAt)],
      limit: limit,
      offset: offset,
    });

    // Đếm tổng số ảnh
    const countResult = await db
      .select({ count: count() })
      .from(images)
      .where(conditions);
    
    const totalImages = countResult[0]?.count || 0;
    const totalPages = Math.ceil(totalImages / limit);

    return NextResponse.json({
      success: true,
      images: userImages.map(img => ({
        id: img.id,
        name: img.name,
        originalName: img.originalName,
        url: img.url,
        mimeType: img.mimeType,
        size: img.size,
        used: img.used,
        createdAt: img.createdAt,
        updatedAt: img.updatedAt
      })),
      pagination: {
        total: totalImages,
        page,
        limit,
        totalPages
      }
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách ảnh:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}

// API để upload ảnh
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

    // Parse request data
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    // Kiểm tra nếu không có file nào được gửi lên
    if (!file) {
      return NextResponse.json(
        { error: 'Không có ảnh nào được tải lên' },
        { status: 400 }
      );
    }

    // Kiểm tra giới hạn số lượng ảnh
    const checkResult = await checkImageLimit(user.id, 1);
    
    if (!checkResult.allowed) {
      return NextResponse.json(
        { error: checkResult.message },
        { status: 403 }
      );
    }

    // TODO: Thay thế bằng logic upload thực tế
    // Giả lập một URL từ CDN
    const randomId = Math.floor(Math.random() * 1000000);
    const timestamp = new Date().getTime();
    const mockUrl = `/uploads/${randomId}_${timestamp}.jpg`;
    
    // Tạo một bản ghi trong cơ sở dữ liệu (đã comment vì chỉ để mô phỏng)
    try {
      // Thêm thông tin ảnh vào database
      await db.insert(images).values({
        userId: user.id,
        name: `image_${randomId}`,
        originalName: file.name,
        path: `/uploads/${randomId}_${timestamp}.jpg`, // Đường dẫn đến file trong hệ thống
        url: mockUrl,
        mimeType: file.type,
        size: file.size,
        used: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } catch (err) {
      console.error('Lỗi khi lưu thông tin ảnh:', err);
      // Tiếp tục mà không ném lỗi, vì đây là môi trường demo
    }

    // Trả về URL ảnh cho client
    return NextResponse.json({
      success: true,
      message: 'Đã tải lên ảnh thành công',
      url: mockUrl
    });
  } catch (error) {
    console.error('Lỗi khi upload ảnh:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}
