import { NextResponse } from 'next/server';
import { db } from '@/db';
import { invitations, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { canChangeToDraft } from '@/utils/limits';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// API để lấy danh sách thiệp cưới của user hiện tại
export async function GET() {
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

    // Lấy danh sách thiệp cưới của user
    const userInvitations = await db.query.invitations.findMany({
      where: eq(invitations.userId, user.id),
      orderBy: (invitations, { desc }) => [desc(invitations.updatedAt)]
    });

    return NextResponse.json({
      success: true,
      invitations: userInvitations
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách thiệp cưới:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}

// API để tạo thiệp cưới mới
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

    // Lấy dữ liệu từ body
    const body = await req.json();
    const { name, status, total_money, access_number, date_from, date_to, template_id, data } = body;

    // Validate dữ liệu
    if (!name) {
      return NextResponse.json(
        { error: 'Tên thiệp cưới không được để trống' },
        { status: 400 }
      );
    }

    if (status && status !== 'draft' && status !== 'paid') {
      return NextResponse.json(
        { error: 'Trạng thái thiệp cưới không hợp lệ' },
        { status: 400 }
      );
    }
    
    // Kiểm tra giới hạn bản nháp nếu status là draft
    if (!status || status === 'draft') {
      const checkResult = await canChangeToDraft(user.id);
      
      if (!checkResult.allowed) {
        return NextResponse.json(
          { error: checkResult.message },
          { status: 403 }
        );
      }
    }

    // Tạo thiệp cưới mới
    const newInvitation = await db.insert(invitations).values({
      userId: user.id,
      name,
      status: status || 'draft',
      total_money: total_money || 0,
      access_number: access_number || 0,
      date_from: date_from ? new Date(date_from) : null,
      date_to: date_to ? new Date(date_to) : null,
      template_id: template_id || null,
      data: data || null,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    
    // Nếu thiệp cưới có status là draft, tăng số lượng draft_used
    if (!status || status === 'draft') {
      await db
        .update(users)
        .set({
          draft_used: (user.draft_used || 0) + 1,
          updatedAt: new Date()
        })
        .where(eq(users.id, user.id));
    }

    return NextResponse.json({
      success: true,
      invitation: newInvitation[0]
    });
  } catch (error) {
    console.error('Lỗi khi tạo thiệp cưới:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}
