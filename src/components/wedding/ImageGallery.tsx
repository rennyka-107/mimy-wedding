"use client";

import React, { useState, useEffect } from 'react';
import { useImageLimitWarning } from '@/hooks/useUserLimits';
import ConfirmationModal from '@/components/popup/ConfirmationModal';
import { toast } from 'react-hot-toast';

interface ImageItem {
  id: string;
  name: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  used: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ImageGalleryProps {
  onImageSelect: (url: string) => void;
  onImageDelete?: (imageId: string, imageUrl: string) => void;
  selectedUrl?: string;
  className?: string;
  refreshTrigger?: number; // Thêm trigger để refresh gallery
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ onImageSelect, onImageDelete, selectedUrl = '', className = '', refreshTrigger = 0 }) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // State cho modal xác nhận xóa ảnh
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<ImageItem | null>(null);
  
  // Sử dụng hook kiểm tra giới hạn ảnh
  const { imageLimit } = useImageLimitWarning();

  useEffect(() => {
    fetchUserImages(currentPage);
  }, [currentPage, refreshTrigger]); // Thêm refreshTrigger vào dependencies

  const fetchUserImages = async (page: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/images?page=${page}&limit=12`);
      
      if (!response.ok) {
        throw new Error('Không thể tải danh sách ảnh');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setImages(data.images);
        setTotalPages(data.pagination.totalPages);
      } else {
        throw new Error(data.error || 'Không thể tải danh sách ảnh');
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách ảnh:', error);
      setError(error instanceof Error ? error.message : 'Có lỗi xảy ra khi tải ảnh');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    onImageSelect(imageUrl);
  };

  const handleDeleteIconClick = (e: React.MouseEvent, image: ImageItem) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
    setImageToDelete(image);
    setIsDeleteModalOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    if (!imageToDelete) return;
    
    try {
      const response = await fetch(`/api/images/${imageToDelete.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        // Kiểm tra nếu ảnh đang được sử dụng (status code 403)
        if (response.status === 403) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Không thể xóa ảnh đang được sử dụng');
        }
        
        throw new Error('Không thể xóa ảnh');
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Cập nhật lại danh sách ảnh sau khi xóa
        fetchUserImages(currentPage);
        
        // Gọi callback nếu được cung cấp
        if (onImageDelete) {
          onImageDelete(imageToDelete.id, imageToDelete.url);
        }
        
        // Hiển thị thông báo thành công
        toast.success(`Đã xóa ảnh ${imageToDelete.originalName || ''} thành công`);
      } else {
        throw new Error(data.error || 'Không thể xóa ảnh');
      }
    } catch (error) {
      console.error('Lỗi khi xóa ảnh:', error);
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi xóa ảnh';
      setError(errorMessage);
      
      // Hiển thị thông báo lỗi
      toast.error(errorMessage);
    }
  };
  
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setImageToDelete(null);
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[#4A3B36] text-[15px] font-semibold">Danh sách ảnh đã tải lên</h3>
        <span className="text-[#757575] text-[13px]">
          {images.length} / {imageLimit?.limit || '∞'} ảnh
        </span>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-[200px]">
          <div className="w-6 h-6 border-2 border-[#fd8c06] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[200px] text-[#fd8c06]">
          {error}
        </div>
      ) : images.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[200px] text-[#757575]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.67 18.95L7.6 15.64C8.39 15.11 9.53 15.17 10.24 15.78L10.57 16.07C11.35 16.74 12.61 16.74 13.39 16.07L17.55 12.5C18.33 11.83 19.59 11.83 20.37 12.5L22 13.9" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="mt-2">Chưa có ảnh nào được tải lên</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2">
            {images.map((image) => (
              <div 
                key={image.id} 
                className={`relative border rounded-md overflow-hidden cursor-pointer ${selectedUrl === image.url ? 'ring-2 ring-[#fd8c06]' : ''}`}
                onClick={() => handleImageClick(image.url)}
              >
                <img 
                  src={image.url} 
                  alt={image.originalName || 'User uploaded image'} 
                  className="w-full h-[80px] object-cover" 
                />
                {/* Delete button */}
                <button
                  type="button"
                  onClick={(e) => handleDeleteIconClick(e, image)}
                  className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition-all duration-200"
                  title="Xóa ảnh"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="#fd8c06" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6L18 18" stroke="#fd8c06" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {selectedUrl === image.url && (
                  <div className="absolute inset-0 bg-[#fd8c06] bg-opacity-20 flex items-center justify-center">
                    <div className="bg-white rounded-full p-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12L10 17L19 8" stroke="#fd8c06" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 gap-2">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${currentPage === 1 ? 'text-[#D9D9D9]' : 'text-[#4A3B36] hover:bg-[#F5F5F5]'}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span className="text-[14px] text-[#4A3B36]">
                {currentPage} / {totalPages}
              </span>
              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${currentPage === totalPages ? 'text-[#D9D9D9]' : 'text-[#4A3B36] hover:bg-[#F5F5F5]'}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </>
      )}
      
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Xóa ảnh"
        message={`Bạn có chắc chắn muốn xóa ảnh ${imageToDelete?.originalName || 'này'}? Hành động này không thể hoàn tác.`}
        confirmText="Xóa ảnh"
        cancelText="Hủy bỏ"
        icon={
          <div className="w-12 h-12 rounded-full bg-[#FFEFEF] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998" stroke="#fd8c06" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="#fd8c06" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001" stroke="#fd8c06" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.33 16.5H13.66" stroke="#fd8c06" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.5 12.5H14.5" stroke="#fd8c06" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        }
      />
    </div>
  );
};

export default ImageGallery;
