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
import Button from "../ui/Button";
import { usePathname } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Header() {
  const { user } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  console.log(pathname, "pathnameasfasfasf")

  // Toggle mobile menu
  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to close mobile menu
  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // if(pathname === '/') return <></>

  return (
    <>
      <header className={` ${pathname === "/" ? "bg-transparent" : "bg-[#F9F9F9] sticky"} top-0 z-50 flex px-0 md:px-[80px]`}>
        <div className="px-6 md:pl-[96px] md:pr-[40px] flex justify-between items-center py-[10px] w-full">
          {/* Logo */}
          <div className="py-3">
            <Link href="/" className="flex items-center">
              <Image
                unoptimized
                src="/images/logo.png"
                alt="Mimy Logo"
                width={100}
                height={40}
                className="h-10 w-auto lg:block hidden"
              />
              <Image
                unoptimized
                src="/images/logo-icon.png"
                alt="Mimy Logo"
                width={100}
                height={40}
                className="block lg:hidden w-[100px] h-[40px] object-contain"
                style={{ minWidth: '100px', minHeight: '40px' }}
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
          <div className="hidden md:flex items-center w-full justify-between ">
            <nav className="flex items-center gap-[40px] px-[54px] py-[21px] text-[16px]">
              <NavItem href="/"> <div className="md:text-[14px] lg:text-[16px] whitespace-nowrap font-[700] text-[#FFBB53]">Trang chủ</div> </NavItem>
              <NavItem href="/list-template"><div className="md:text-[14px] lg:text-[16px] whitespace-nowrap font-[600] text-[#383637]">Mẫu thiệp</div></NavItem>
              {/* <NavItem href="/custom-template"><div className="text-[16px] font-[600] text-[#383637]">Thiết kế riêng</div></NavItem>
              <NavItem href="/contact"><div className="text-[16px] font-[600] text-[#383637]">Liên hệ</div></NavItem> */}
            </nav>

            <div className="flex items-center ml-4 gap-[8px] relative">
              {user ? (
                <>
                  <button
                    className="cursor-pointer flex items-center gap-2 py-[6px] px-[16px] rounded-[6px]
             bg-gradient-to-r from-[#FFBB53] to-[#FD8C06]
             text-white font-montserrat text-[16px] font-[600] leading-[24px]
             hover:opacity-90 transition-opacity"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  >
                    <span className="hidden sm:inline">
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
                  <Button
                    variant="primary"
                    onClick={() => signIn('google')}
                  >
                    <svg className="max-h-[20px] max-w-[20px]" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3335 2.66699H2.66683C1.93045 2.66699 1.3335 3.26395 1.3335 4.00033V12.0003C1.3335 12.7367 1.93045 13.3337 2.66683 13.3337H13.3335C14.0699 13.3337 14.6668 12.7367 14.6668 12.0003V4.00033C14.6668 3.26395 14.0699 2.66699 13.3335 2.66699Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M14.6668 4.66699L8.68683 8.46699C8.48101 8.59594 8.24304 8.66433 8.00016 8.66433C7.75729 8.66433 7.51932 8.59594 7.3135 8.46699L1.3335 4.66699" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="lg:hidden block ml-2 font-[600] md:text-[14px] lg:text-[16px]">Đăng nhập</span>
                    <span className="hidden lg:block ml-2 font-[600] whitespace-nowrap">Đăng nhập bằng Email</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header >

      {/* Mobile Menu Popup */}
      < MobileMenu isOpen={isMobileMenuOpen} onClose={handleCloseMobileMenu} />
    </>
  );
}
