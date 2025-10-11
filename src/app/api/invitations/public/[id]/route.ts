import { NextResponse } from 'next/server';
import { db } from '@/db';
import { invitations } from '@/db/schema';
import { eq } from 'drizzle-orm';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// API để xem thiệp cưới công khai (không cần đăng nhập)
export async function GET(req: Request, { params }: Params) {
  try {
    const resolvedParams = await params;
    // Tìm thiệp cưới theo id
    const invitation = await db.query.invitations.findFirst({
      where: eq(invitations.id, resolvedParams.id)
    });

    if (!invitation) {
      return NextResponse.json(
        { error: 'Không tìm thấy thiệp cưới' },
        { status: 404 }
      );
    }

    // Chỉ hiển thị các thiệp cưới đã thanh toán
    if (invitation.status !== 'paid') {
      return NextResponse.json(
        { error: 'Thiệp cưới này chưa được kích hoạt' },
        { status: 403 }
      );
    }

    // Tăng số lượt truy cập
    const updatedInvitation = await db
      .update(invitations)
      .set({
        access_number: (invitation.access_number || 0) + 1,
        updatedAt: new Date()
      })
      .where(eq(invitations.id, resolvedParams.id))
      .returning();

    // Chỉ trả về các thông tin cần thiết cho người xem
    return NextResponse.json({
      success: true,
      invitation: {
        id: updatedInvitation[0].id,
        name: updatedInvitation[0].name,
        template_id: updatedInvitation[0].template_id,
        data: updatedInvitation[0].data,
        date_from: updatedInvitation[0].date_from,
        date_to: updatedInvitation[0].date_to,
        access_number: updatedInvitation[0].access_number
      }
    });
  } catch (error) {
    console.error('Lỗi khi lấy thiệp cưới công khai:', error);
    
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}
