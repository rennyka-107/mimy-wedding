"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HomeIcon from "../icons/home";
import ViIcon from "../icons/vi";
import NavItem from "../navigation/NavItem";
import { useAuth } from "@/context/AuthContext";
import ProfileMenu from "../popup/ProfileMenu";
import MobileMenu from "../popup/MobileMenu";

export default function Header() {
  const { user, openLoginModal } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Toggle mobile menu
  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to close mobile menu
  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-[#FAE4E4] sticky top-0 z-50">
        <div className="pl-6 md:pl-[96px] pr-6 md:pr-[40px] flex items-center justify-between py-[10px]">
          {/* Logo */}
          <div className="py-3">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Mimy Wedding Logo"
                width={100}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>
          
          {/* Mobile Menu Button (Hamburger) */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={handleToggleMobileMenu}
            aria-label="Menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="#333333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Right Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center">
            <nav className="flex items-center gap-[40px] px-[54px] py-[21px]">
              <NavItem href="/" icon={<HomeIcon />}>Trang chủ</NavItem>
              <NavItem href="/list-template">Mẫu thiệp</NavItem>
              <NavItem href="/custom-template">Thiết kế riêng</NavItem>
              <NavItem href="/contact">Liên hệ</NavItem>
            </nav>

            {/* User Profile or Language selector */}
            <div className="flex items-center ml-4 gap-[8px] relative">
              {user ? (
                <>
                  <button
                    className="flex items-center gap-2 py-1 px-4 hover:bg-[#f7d4d4] rounded-full transition-colors"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  >
                    <span className="text-[#CE6F70] font-[800] text-[18px] hidden sm:inline">
                      {user?.name || "User"} <span className="ml-1">▾</span>
                    </span>
                  </button>
                  <ProfileMenu
                    isOpen={isProfileMenuOpen}
                    onClose={() => setIsProfileMenuOpen(false)}
                  />
                </>
              ) : (
                <>
                  <button
                    className="flex items-center gap-1 rounded-sm px-2 py-[2px] hover:bg-[#f7d4d4] transition-colors"
                    onClick={openLoginModal}
                  >
                    <ViIcon />
                    <span className="lang-text">VIE</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Popup */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleCloseMobileMenu} />
    </>
  );
}
