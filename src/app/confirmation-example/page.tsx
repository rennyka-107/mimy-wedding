"use client";
import { useState } from "react";
import ConfirmationModal from "@/components/popup/ConfirmationModal";

export default function ConfirmationExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleConfirm = () => {
    console.log("User confirmed the action");
    // Implement your confirmation logic here
  };

  return (
    <div className="min-h-screen p-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Confirmation Modal Example</h1>
      
      <div className="space-y-4">
        <h2 className="text-xl">Default Confirmation Modal</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#fd8c06] text-white rounded-md"
        >
          Mở popup xác nhận
        </button>
        
        <ConfirmationModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          title="Bạn chắc chắn muốn đăng xuất?"
          message="Hành động này không thể hoàn tác, bạn chắc chắn muốn thoát khỏi hệ thống?"
        />
      </div>
      
      <div className="space-y-4 mt-8">
        <h2 className="text-xl">Customized Confirmation Modal</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Mở popup xác nhận tùy chỉnh
        </button>
        
        <ConfirmationModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          title="Xác nhận xóa dự án"
          message="Bạn có chắc chắn muốn xóa dự án này? Hành động này không thể hoàn tác."
          confirmText="Xóa dự án"
          cancelText="Hủy"
          icon={
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
          }
        />
      </div>
    </div>
  );
}
