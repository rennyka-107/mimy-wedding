"use client";
import { useState } from "react";
import PasswordChangeModal from "@/components/popup/PasswordChangeModal";

export default function PasswordChangeExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleSubmit = (oldPassword: string, newPassword: string) => {
    console.log("Password change requested:", { oldPassword, newPassword });
    // In a real app, you would call an API endpoint here
    alert("Mật khẩu đã được thay đổi thành công!");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Password Change Modal Example</h1>
      
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-[#fd8c06] text-white rounded-md w-fit"
      >
        Đổi mật khẩu
      </button>
      
      <PasswordChangeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
