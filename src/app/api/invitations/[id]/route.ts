import { NextResponse } from 'next/server';
import { db } from '@/db';
import { invitations, users } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { canChangeToDraft } from '@/utils/limits';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// Helper để kiểm tra quyền truy cập
async function checkAccess(invitationId: string, userEmail: string) {
  // Tìm user_id dựa trên email
  const user = await db.query.users.findFirst({
    where: eq(users.email, userEmail)
  });

  if (!user) {
    return { error: 'Không tìm thấy thông tin người dùng', status: 404 };
  }

  // Kiểm tra xem thiệp cưới có tồn tại và thuộc về user này không
  const invitation = await db.query.invitations.findFirst({
    where: and(
      eq(invitations.id, invitationId),
      eq(invitations.userId, user.id)
    )
  });

  if (!invitation) {
    return { error: 'Không tìm thấy thiệp cưới hoặc bạn không có quyền truy cập', status: 404 };
  }

  return { user, invitation };
}

// API để lấy chi tiết thiệp cưới theo ID
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

    // Kiểm tra quyền truy cập
    const result = await checkAccess(resolvedParams.id, session.user.email);
    
    if ('error' in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json({
      success: true,
      invitation: result.invitation
    });
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết thiệp cưới:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}

// API để cập nhật thiệp cưới theo ID
export async function PUT(req: Request, { params }: Params) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để thực hiện thao tác này' },
        { status: 401 }
      );
    }

    // Kiểm tra quyền truy cập
    const result = await checkAccess(resolvedParams.id, session.user.email);
    
    if ('error' in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    // Lấy dữ liệu từ body
    const body = await req.json();
    const { name, status, total_money, access_number, date_from, date_to, template_id, data } = body;

    // Validate dữ liệu
    if (name === '') {
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
    
    // Kiểm tra giới hạn bản nháp nếu cập nhật trạng thái từ 'paid' sang 'draft'
    if (status === 'draft' && result.invitation.status === 'paid') {
      const checkResult = await canChangeToDraft(result.user.id, resolvedParams.id);
      
      if (!checkResult.allowed) {
        return NextResponse.json(
          { error: checkResult.message },
          { status: 403 }
        );
      }
    }

    // Tạo object chứa các trường cần cập nhật
    const updateData: { [key: string]: string | number | boolean | Date | null } = {
      updatedAt: new Date()
    };

    // Chỉ thêm các trường có dữ liệu mới
    if (name !== undefined) updateData.name = name;
    if (status !== undefined) updateData.status = status;
    if (total_money !== undefined) updateData.total_money = total_money;
    if (access_number !== undefined) updateData.access_number = access_number;
    if (date_from !== undefined) updateData.date_from = date_from ? new Date(date_from) : null;
    if (date_to !== undefined) updateData.date_to = date_to ? new Date(date_to) : null;
    if (template_id !== undefined) updateData.template_id = template_id;
    if (data !== undefined) updateData.data = data;

    // Cập nhật thiệp cưới
    const updatedInvitation = await db
      .update(invitations)
      .set(updateData)
      .where(eq(invitations.id, resolvedParams.id))
      .returning();
      
    // Cập nhật số lượng draft_used nếu thay đổi trạng thái
    if (status) {
      const oldStatus = result.invitation.status;
      
      // Nếu thay đổi từ paid sang draft, tăng draft_used
      if (status === 'draft' && oldStatus === 'paid') {
        await db
          .update(users)
          .set({
            draft_used: (result.user.draft_used || 0) + 1,
            updatedAt: new Date()
          })
          .where(eq(users.id, result.user.id));
      }
      
      // Nếu thay đổi từ draft sang paid, giảm draft_used
      if (status === 'paid' && oldStatus === 'draft') {
        const currentDraftUsed = result.user.draft_used || 0;
        await db
          .update(users)
          .set({
            draft_used: Math.max(0, currentDraftUsed - 1), // Đảm bảo không có giá trị âm
            updatedAt: new Date()
          })
          .where(eq(users.id, result.user.id));
      }
    }

    return NextResponse.json({
      success: true,
      invitation: updatedInvitation[0]
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật thiệp cưới:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}

// API để xóa thiệp cưới theo ID
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

    // Kiểm tra quyền truy cập
    const result = await checkAccess(resolvedParams.id, session.user.email);
    
    if ('error' in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    // Xóa thiệp cưới
    await db
      .delete(invitations)
      .where(eq(invitations.id, resolvedParams.id));
      
    // Nếu thiệp cưới có trạng thái là draft, giảm số lượng draft_used
    if (result.invitation.status === 'draft') {
      const currentDraftUsed = result.user.draft_used || 0;
      await db
        .update(users)
        .set({
          draft_used: Math.max(0, currentDraftUsed - 1), // Đảm bảo không có giá trị âm
          updatedAt: new Date()
        })
        .where(eq(users.id, result.user.id));
    }

    return NextResponse.json({
      success: true,
      message: 'Đã xóa thiệp cưới thành công'
    });
  } catch (error) {
    console.error('Lỗi khi xóa thiệp cưới:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}
