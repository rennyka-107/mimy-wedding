"use client";
import { useState } from "react";
import RegisterModal from "@/components/popup/RegisterModal";

export default function RegisterDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Đăng Ký Demo</h1>
        
        <div className="flex justify-center">
          <button
            onClick={openModal}
            className="px-6 py-3 bg-[#CE6F70] text-white rounded-md hover:bg-[#B85F60] transition-colors"
          >
            Mở popup đăng ký
          </button>
        </div>
        
        <div className="mt-12 p-6 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Hướng dẫn sử dụng</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Click nút trên để mở popup đăng ký</li>
            <li>Nhập thông tin đăng ký vào các trường</li>
            <li>Nhấn nút &quot;Gửi mã qua email&quot; để nhận mã xác thực</li>
            <li>Chọn đồng ý với điều khoản dịch vụ và chính sách bảo mật</li>
            <li>Click &quot;Đăng ký&quot; để hoàn tất đăng ký</li>
          </ul>
        </div>
      </div>

      <RegisterModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
