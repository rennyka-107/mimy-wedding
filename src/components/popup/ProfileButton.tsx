"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import ProfileMenu from "./ProfileMenu";

interface ProfileButtonProps {
  userName?: string;
  userHandle?: string;
  avatarSrc?: string;
}

export default function ProfileButton({
  userName = "Huyen My Nguyen",
  userHandle = "ph.huyenmy107",
  avatarSrc = "/images/avatar-placeholder.png" // Default placeholder
}: ProfileButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      <button 
        className="flex items-center p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
        onClick={toggleMenu}
        aria-label="Open user menu"
      >
        {/* You can replace with actual avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
          {avatarSrc ? (
            <Image
              src={avatarSrc}
              alt={userName || "User profile"}
              width={40}
              height={40}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              {userName?.charAt(0) || "U"}
            </div>
          )}
        </div>
      </button>
      
      <ProfileMenu 
        isOpen={isMenuOpen}
        onClose={closeMenu}
      />
    </div>
  );
}
