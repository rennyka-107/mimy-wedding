import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

interface LimitInfo {
  limit: number;
  used: number;
  remaining: number;
}

interface UserLimits {
  image: LimitInfo;
  draft: LimitInfo;
  isLoading: boolean;
  error: string | null;
  fetchLimits: () => Promise<void>;
}

export default function useUserLimits(): UserLimits {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageLimits, setImageLimits] = useState<LimitInfo>({
    limit: 0,
    used: 0,
    remaining: 0
  });
  const [draftLimits, setDraftLimits] = useState<LimitInfo>({
    limit: 0,
    used: 0,
    remaining: 0
  });

  const fetchLimits = async () => {
    if (!user) {
      setError('Vui lòng đăng nhập để xem thông tin giới hạn');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/users/limits');
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Không thể lấy thông tin giới hạn');
      }

      const data = await response.json();
      
      if (data.success && data.limits) {
        setImageLimits(data.limits.image);
        setDraftLimits(data.limits.draft);
      }
    } catch (error) {
      setError(JSON.stringify(error) || 'Có lỗi xảy ra khi lấy thông tin giới hạn');
      console.error('Lỗi khi lấy giới hạn người dùng:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Lấy thông tin giới hạn khi user thay đổi
  useEffect(() => {
    if (user) {
      fetchLimits();
    }
  }, [user]);

  return {
    image: imageLimits,
    draft: draftLimits,
    isLoading,
    error,
    fetchLimits
  };
}

/**
 * Hook để kiểm tra và hiển thị cảnh báo khi upload ảnh gần đến giới hạn
 */
export function useImageLimitWarning() {
  const { image, isLoading } = useUserLimits();
  
  /**
   * Kiểm tra và hiển thị cảnh báo về giới hạn ảnh
   * @param imagesToUpload Số lượng ảnh chuẩn bị upload (mặc định: 1)
   * @returns true nếu còn có thể upload, false nếu đã đạt giới hạn
   */
  const checkAndWarnImageLimit = (imagesToUpload: number = 1): boolean => {
    if (isLoading) return true;
    
    // Đã đạt giới hạn tối đa
    if (image.remaining <= 0) {
      toast.error(`Bạn đã đạt giới hạn số lượng ảnh (${image.limit}/${image.used}). Vui lòng nâng cấp gói hoặc xóa các ảnh cũ.`);
      return false;
    }
    
    // Sẽ vượt quá giới hạn nếu upload tất cả các ảnh này
    if (image.remaining < imagesToUpload) {
      toast.error(`Bạn chỉ có thể upload thêm ${image.remaining} ảnh. Vui lòng giảm số lượng ảnh hoặc nâng cấp gói của bạn.`);
      return false;
    }
    
    // Nếu sau khi upload thêm sẽ đạt đúng giới hạn tối đa
    if (image.used + imagesToUpload >= image.limit) {
      toast.error(`Lưu ý: Đây là ảnh cuối cùng bạn có thể upload. Sau khi upload, bạn sẽ đạt giới hạn tối đa (${image.limit} ảnh).`);
    } 
    // Còn có thể upload nhưng sắp đạt giới hạn (còn 20% hoặc ít hơn và chưa đạt giới hạn sau khi upload)
    else if (image.remaining <= Math.max(1, image.limit * 0.2) && image.used + imagesToUpload < image.limit) {
      toast(`Chú ý: Bạn sắp đạt giới hạn số lượng ảnh (còn ${image.remaining - imagesToUpload} ảnh sau khi upload).`, { 
        icon: '⚠️',
        style: { backgroundColor: '#FEF3C7', color: '#92400E' }
      });
    }
    
    return true;
  };
  
  return {
    checkAndWarnImageLimit,
    imageLimit: image,
    isLoading
  };
}
