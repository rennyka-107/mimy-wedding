"use client";
import { useState } from "react";
import LoginModal from "@/components/popup/LoginModal";

export default function LoginDemo() {
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Đăng Nhập Demo</h1>
        
        <div className="flex justify-center">
          <button
            onClick={openModal}
            className="px-6 py-3 bg-[#fd8c06] text-white rounded-md hover:bg-[#B85F60] transition-colors"
          >
            Mở popup đăng nhập
          </button>
        </div>
        
        <div className="mt-12 p-6 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Hướng dẫn sử dụng</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Click nút trên để mở popup đăng nhập</li>
            <li>Nhập thông tin đăng nhập vào các trường</li>
            <li>Click &quot;Đăng nhập&quot; để đăng nhập</li>
            <li>Click bên ngoài popup hoặc nút đóng (X) để đóng popup</li>
          </ul>
        </div>
      </div>

      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
