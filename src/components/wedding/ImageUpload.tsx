"use client";

import React, { useRef, useState, ChangeEvent, DragEvent, useEffect } from 'react';
import { useImageLimitWarning } from '@/hooks/useUserLimits';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  onImageUploadUrl?: (url: string) => void;
  onImageRemove?: () => void;
  initialImageUrl?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, onImageUploadUrl, onImageRemove, initialImageUrl = '', className = '' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(initialImageUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Sử dụng hook kiểm tra giới hạn ảnh
  const { checkAndWarnImageLimit, imageLimit, isLoading: isLoadingLimits } = useImageLimitWarning();

  useEffect(() => {
    setPreviewUrl(initialImageUrl);
  }, [initialImageUrl]);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        uploadFile(file);
      }
    }
  };

  const uploadFile = async (file: File) => {
    try {
      // Kiểm tra giới hạn ảnh trước khi upload
      const canUpload = checkAndWarnImageLimit(1);
      if (!canUpload) {
        setUploadError("Vượt quá giới hạn số lượng ảnh. Vui lòng nâng cấp gói hoặc xóa bớt ảnh cũ.");
        return;
      }
      
      setIsUploading(true);
      setUploadError(null);
      
      // Tạo preview URL tạm thời ngay lập tức để hiển thị preview trước khi upload hoàn tất
      const tempPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(tempPreviewUrl);
      
      // Tạo FormData để gửi lên server
      const formData = new FormData();
      formData.append('file', file);
      
      // Gọi callback ngay để cập nhật file cho component cha
      onImageUpload(file);
      
      // Gửi request lên API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      
      if (data.success && data.url) {
        // Nếu upload thành công, cập nhật URL chính thức từ server
        // Revoke URL tạm thời để tránh rò rỉ bộ nhớ
        URL.revokeObjectURL(tempPreviewUrl);
        setPreviewUrl(data.url);
        
        if (onImageUploadUrl) {
          onImageUploadUrl(data.url);
        }
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
      
      // Nếu có lỗi và đang sử dụng preview tạm thời, trở về URL ban đầu hoặc xóa preview
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(initialImageUrl || '');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        uploadFile(file);
      }
    }
  };
  
  const handleRemoveImage = () => {
    setPreviewUrl('');
    if (onImageRemove) {
      onImageRemove();
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={className}>
      {/* Vùng kéo thả ảnh - luôn hiển thị */}
      <div 
        className={`flex flex-col items-center justify-center border border-dashed rounded-md p-6 cursor-pointer mb-4
          ${isDragging ? 'border-[#CE6F70] bg-[#FFF9F9]' : isUploading ? 'border-[#F0F0F0] bg-[#FAFAFA]' : 'border-[#D9D9D9] bg-white'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center">
          {isUploading ? (
            <>
              <div className="w-6 h-6 border-2 border-[#CE6F70] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-center text-[#757575] text-[15px] mt-4 font-normal">
                Đang tải ảnh lên...
              </p>
            </>
          ) : (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16.5V6" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.75 10.25L12 6L16.25 10.25" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-center text-[#757575] text-[15px] mt-4 font-normal">
                Kéo thả hoặc nhấn vào <span className="text-[#CE6F70] font-medium">đây</span> để tải ảnh lên
              </p>
              {uploadError && (
                <p className="text-center text-[#CE6F70] text-[13px] mt-2">
                  Lỗi: {uploadError}
                </p>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Phần preview ảnh - chỉ hiển thị khi có ảnh */}
      <div className={`${previewUrl ? 'block' : 'hidden'} mt-2`}>
        <p className="text-[#4A3B36] text-[14px] mb-2 font-semibold">Xem trước:</p>
        <div className="relative border rounded-md overflow-hidden">
          <img 
            src={previewUrl || '/placeholder-image.png'} 
            alt="Uploaded preview" 
            className="w-full h-[200px] object-cover" 
          />
          {/* <button 
            type="button" 
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#CE6F70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="#CE6F70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button> */}
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
