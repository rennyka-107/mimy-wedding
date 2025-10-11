"use client";
import ProfileButton from "@/components/popup/ProfileButton";

export default function ProfileDemo() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Menu Demo</h1>
        
        <div className="flex justify-end">
          <ProfileButton 
            userName="Huyen My Nguyen"
            userHandle="ph.huyenmy107"
          />
        </div>
        
        <div className="mt-12 p-6 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Hướng dẫn sử dụng</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Click vào avatar để mở menu người dùng</li>
            <li>Menu sẽ hiển thị các tùy chọn như trong thiết kế</li>
            <li>Click bất kỳ đâu bên ngoài menu để đóng</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
