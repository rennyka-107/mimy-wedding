import { db } from '@/db';
import { invitations, users, images } from '@/db/schema';
import { and, count, eq } from 'drizzle-orm';

/**
 * Kiểm tra xem người dùng có vượt quá giới hạn bản nháp không
 * @param userId ID của người dùng
 * @returns Object chứa kết quả kiểm tra và thông báo lỗi (nếu có)
 */
export async function checkDraftLimit(userId: string): Promise<{ allowed: boolean; message?: string }> {
  try {
    // Lấy thông tin người dùng
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId)
    });

    if (!user) {
      return { allowed: false, message: 'Không tìm thấy thông tin người dùng' };
    }

    // Sử dụng trường draft_used để kiểm tra giới hạn
    const currentDrafts = user.draft_used || 0;

    // Kiểm tra giới hạn
    if (currentDrafts >= user.draft_limit) {
      return {
        allowed: false,
        message: `Bạn đã đạt giới hạn số lượng bản nháp (${user.draft_limit}/${user.draft_used} đã sử dụng). Vui lòng nâng cấp gói hoặc xóa các bản nháp cũ.`
      };
    }

    return { allowed: true };
  } catch (error) {
    console.error('Lỗi khi kiểm tra giới hạn bản nháp:', error);
    return { allowed: false, message: 'Có lỗi xảy ra khi kiểm tra giới hạn bản nháp' };
  }
}

/**
 * Kiểm tra xem người dùng có vượt quá giới hạn ảnh không
 * @param userId ID của người dùng
 * @param numberOfImages Số lượng ảnh cần kiểm tra
 * @returns Object chứa kết quả kiểm tra và thông báo lỗi (nếu có)
 */
export async function checkImageLimit(userId: string, numberOfImages: number = 1): Promise<{ allowed: boolean; message?: string }> {
  try {
    // Lấy thông tin người dùng
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId)
    });

    if (!user) {
      return { allowed: false, message: 'Không tìm thấy thông tin người dùng' };
    }
    
    // Đếm số lượng ảnh hiện tại từ bảng images
    const result = await db
      .select({ count: count() })
      .from(images)
      .where(eq(images.userId, userId));
    
    const currentImages = result[0]?.count || 0;

    // Kiểm tra giới hạn
    if (currentImages + numberOfImages > user.image_limit) {
      return {
        allowed: false,
        message: `Bạn đã đạt giới hạn số lượng ảnh (${user.image_limit}/${currentImages} đã sử dụng). Vui lòng nâng cấp gói hoặc xóa các ảnh cũ.`
      };
    }

    return { allowed: true };
  } catch (error) {
    console.error('Lỗi khi kiểm tra giới hạn ảnh:', error);
    return { allowed: false, message: 'Có lỗi xảy ra khi kiểm tra giới hạn ảnh' };
  }
}

/**
 * Kiểm tra xem có thể thay đổi trạng thái thiệp cưới thành draft không
 * @param userId ID của người dùng
 * @param invitationId ID của thiệp cưới (nếu cập nhật thiệp cưới hiện có)
 * @returns Object chứa kết quả kiểm tra và thông báo lỗi (nếu có)
 */
export async function canChangeToDraft(userId: string, invitationId?: string): Promise<{ allowed: boolean; message?: string }> {
  // Nếu đang cập nhật thiệp cưới hiện có, kiểm tra xem nó đã là draft chưa
  if (invitationId) {
    const invitation = await db.query.invitations.findFirst({
      where: and(
        eq(invitations.id, invitationId),
        eq(invitations.userId, userId)
      )
    });

    // Nếu thiệp cưới đã là draft, cho phép cập nhật
    if (invitation && invitation.status === 'draft') {
      return { allowed: true };
    }
  }

  // Kiểm tra giới hạn số bản nháp
  return checkDraftLimit(userId);
}
