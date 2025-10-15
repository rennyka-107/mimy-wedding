"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Star from "../icons/star";
import UserInformation from "../icons/user_information";
import Services from "../icons/services";
import Lock from "../icons/lock";
import Logout from "../icons/logout";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileMenu({ 
  isOpen, 
  onClose
}: ProfileMenuProps) {
  const { user, logout } = useAuth();
  
  // Get user info from auth store
  const userName = user?.name || "";
  const userHandle = user?.email || "";
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring" as const, 
        duration: 0.3, 
        stiffness: 300, 
        damping: 25 
      } 
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { 
        duration: 0.2 
      }
    }
  };

  const menuItems = [
    {
      id: 'wedding',
      icon: <Star />,
      text: "Thiệp cưới của bạn",
      href: "/invitations"
    },
    // {
    //   id: 'info',
    //   icon: <UserInformation />,
    //   text: "Thông tin",
    //   href: "/profile"
    // },
    // {
    //   id: 'services',
    //   icon: <Services />,
    //   text: "Dịch vụ của bạn",
    //   href: "/services"
    // },    
    // {
    //   id: 'password',
    //   icon: <Lock  />,
    //   text: "Đổi mật khẩu",
    //   href: "/change-password"
    // },
    {
      id: 'logout',
      icon: <Logout />,
      text: "Đăng xuất",
      href: "#"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          className="font-montserrat absolute top-[110%] right-0 w-64 bg-white rounded-lg shadow-lg border border-gray-100 z-[9999]"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="p-4 border-b border-gray-100">
            <div className="font-medium text-gray-800">{userName}</div>
            <div className="text-sm text-gray-500">{userHandle}</div>
          </div>
          <nav className="py-2">
            <ul>
              {menuItems.map((item,idx) => (
                <li key={item.id} className="px-1">
                  <Link href={item.href} 
                    className="flex items-center px-3 py-2 text-[#4A3B36] hover:bg-[#fff8e6] hover:text-[#fd8c06] rounded-md transition-colors"
                    onClick={(e) => {
                      if (item.id === 'logout') {
                        e.preventDefault();
                        logout();
                      }
                      onClose();
                    }}
                  >
                    <span className="text-gray-500 mr-3">{item.icon}</span>
                    {item.text}
                  </Link>
                  {idx === menuItems.length - 2}
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
