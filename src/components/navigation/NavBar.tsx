"use client";
import { useAuthStore } from "@/store/authStore";
import BaseButton from "../buttons/base";

export default function NavBar() {
  const { user, isAuthenticated, logout, openLoginModal } = useAuthStore();

  return (
    <div className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <div className="font-viaoda text-2xl text-[#fd8c06]">Mimy.vn</div>
      
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-gray-600">
              Xin chào, {user?.name || user?.username}
            </span>
            <BaseButton 
              title="Đăng xuất" 
              onClick={logout} 
            />
          </>
        ) : (
          <BaseButton 
            title="Đăng nhập" 
            onClick={openLoginModal} 
          />
        )}
      </div>
    </div>
  );
}
