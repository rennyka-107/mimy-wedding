import { NextResponse } from 'next/server';
import { db } from '@/db';
import { messages } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, content } = body;

    // Validation
    if (!name || !email || !content) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Định dạng email không hợp lệ' },
        { status: 400 }
      );
    }

    // Validate phone number (basic validation)
    // const phoneRegex = /^\d{9,15}$/;
    // if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
    //   return NextResponse.json(
    //     { error: 'Số điện thoại không hợp lệ' },
    //     { status: 400 }
    //   );
    // }

    // Create message in database
    const newMessage = await db
      .insert(messages)
      .values({
        name,
        email,
        content,
        status: 'new',
      })
      .returning();

    // Return success response
    return NextResponse.json(
      { 
        success: true,
        message: 'Lời nhắn đã được gửi thành công',
        data: newMessage[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving message:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}

// Lấy tất cả lời nhắn (sẽ cần xác thực admin)
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get('status');

    // Phương pháp thay thế để tránh vấn đề với where
    let allMessages;
    
    if (status) {
      allMessages = await db.select().from(messages).where(eq(messages.status, status)).orderBy(messages.createdAt);
    } else {
      allMessages = await db.select().from(messages).orderBy(messages.createdAt);
    }

    return NextResponse.json({
      success: true,
      data: allMessages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi tải dữ liệu' },
      { status: 500 }
    );
  }
}

// API để cập nhật trạng thái của lời nhắn
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Thiếu thông tin ID hoặc trạng thái' },
        { status: 400 }
      );
    }

    // Kiểm tra status hợp lệ
    const validStatus = ['new', 'read', 'processing', 'resolved', 'archived'];
    if (!validStatus.includes(status)) {
      return NextResponse.json(
        { error: 'Trạng thái không hợp lệ' },
        { status: 400 }
      );
    }

    // Cập nhật trạng thái lời nhắn
    const updatedMessage = await db
      .update(messages)
      .set({ 
        status,
        updatedAt: new Date()
      })
      .where(eq(messages.id, id))
      .returning();

    if (updatedMessage.length === 0) {
      return NextResponse.json(
        { error: 'Không tìm thấy lời nhắn' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Cập nhật trạng thái thành công',
      data: updatedMessage[0]
    });
  } catch (error) {
    console.error('Error updating message status:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi cập nhật trạng thái' },
      { status: 500 }
    );
  }
}
