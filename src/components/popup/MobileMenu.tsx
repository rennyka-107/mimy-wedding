"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "@/app/mobile-menu.css";
import Button from "../ui/Button";
import { signIn } from "next-auth/react";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Handle body overflow when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-opacity-20 z-40 mobile-menu-overlay"
        onClick={onClose}
      />

      {/* Popup Menu */}
      <div
        style={{ boxShadow: "0px -1px 10.7px 0px #00000040" }}
        className="fixed inset-x-0 bottom-0 bg-white rounded-t-[20px] z-50 shadow-lg mobile-menu-content"
      >
        {/* Drag Handle */}
        <div className="w-full flex justify-center pt-4">
          <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
        </div>

        {/* Header with Logo and Language */}
        <div className="flex justify-between items-center px-6 pt-5 pb-7">
          <div className="relative w-[120px] h-[32px]">
            <Image
              src="/images/logo.png"
              alt="Mimy.vn Logo"
              fill
              className="object-contain object-left"
            />
          </div>

          {/* <button className="flex items-center gap-1.5">
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="16" fill="#E31C1E"/>
              <path d="M12 3L13.1227 6.45492H16.7553L13.8163 8.59017L14.9389 12.0451L12 9.90983L9.06107 12.0451L10.1837 8.59017L7.24472 6.45492H10.8773L12 3Z" fill="#FFFF00"/>
            </svg>
            <span className="text-[#333333] font-medium text-sm">VIE</span>
          </button> */}
        </div>

        {/* Menu Links */}
        <div className="px-6 space-y-6">
          <Link
            href="/"
            className={`flex items-center gap-3 ${pathname === "/" ? "text-[#FD8C06]" : "text-[#7B7B7B]"
              }`}
            onClick={onClose}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6L8 1.33337L14 6V13.3334C14 13.687 13.8595 14.0261 13.6095 14.2762C13.3594 14.5262 13.0203 14.6667 12.6667 14.6667H3.33333C2.97971 14.6667 2.64057 14.5262 2.39052 14.2762C2.14048 14.0261 2 13.687 2 13.3334V6Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Trang chủ</span>
          </Link>

          <Link
            href="/list-template"
            className={`flex items-center gap-3 ${pathname.includes("/list-template") ? "text-[#FD8C06]" : "text-[#7B7B7B]"
              }`}
            onClick={onClose}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3334 1.33325H2.66671C1.93033 1.33325 1.33337 1.93021 1.33337 2.66659V13.3333C1.33337 14.0696 1.93033 14.6666 2.66671 14.6666H13.3334C14.0698 14.6666 14.6667 14.0696 14.6667 13.3333V2.66659C14.6667 1.93021 14.0698 1.33325 13.3334 1.33325Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.33337 6.66675C6.06975 6.66675 6.66671 6.06979 6.66671 5.33341C6.66671 4.59703 6.06975 4.00008 5.33337 4.00008C4.59699 4.00008 4.00004 4.59703 4.00004 5.33341C4.00004 6.06979 4.59699 6.66675 5.33337 6.66675Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.6667 10.6667L10.6667 6.66675L2.66669 14.6667"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Mẫu thiệp</span>
          </Link>

          {/* <Link
            href="/contact"
            className={`flex items-center gap-3 ${
              pathname.includes("/contact") ? "text-[#FD8C06]" : "text-[#7B7B7B]"
            }`}
            onClick={onClose}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6667 11.28V13.28C14.6676 13.4657 14.6294 13.6495 14.5548 13.82C14.4801 13.9905 14.3705 14.1437 14.2324 14.2705C14.0943 14.3973 13.9309 14.4947 13.7518 14.5564C13.5727 14.618 13.3819 14.6426 13.1934 14.6287C11.1619 14.3997 9.21946 13.6892 7.51337 12.5533C5.92096 11.512 4.58901 10.1801 3.54671 8.58768C2.40671 6.87486 1.69593 4.92515 1.47004 2.88702C1.45619 2.69906 1.48051 2.5089 1.54169 2.33027C1.60287 2.15164 1.69955 1.98859 1.82555 1.85055C1.95155 1.7125 2.10372 1.60259 2.27327 1.52726C2.44282 1.45193 2.6258 1.41287 2.81071 1.41202H4.81071C5.12696 1.40893 5.4349 1.51468 5.67456 1.7115C5.91423 1.90831 6.07113 2.18347 6.11337 2.49368C6.19337 3.1111 6.33463 3.71776 6.53471 4.30368C6.61946 4.54152 6.63976 4.79897 6.59341 5.04638C6.54706 5.29379 6.43609 5.5232 6.27337 5.70702L5.40671 6.57368C6.37332 8.21589 7.76114 9.60371 9.40337 10.5703L10.27 9.70368C10.4539 9.54096 10.6833 9.43001 10.9307 9.38368C11.1781 9.33734 11.4355 9.35764 11.6734 9.44236C12.2593 9.64244 12.8659 9.78368 13.4834 9.86368C13.7979 9.90636 14.0762 10.0666 14.2738 10.311C14.4714 10.5555 14.5743 10.8693 14.5667 11.1903L14.6667 11.28Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Liên hệ</span>
          </Link> */}

          {/* <Link
            href="/custom-template"
            className={`flex items-center gap-3 ${
              pathname.includes("/custom-template") ? "text-[#FD8C06]" : "text-[#7B7B7B]"
            }`}
            onClick={onClose}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.00004 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00008C14.6667 4.31826 11.6819 1.33342 8.00004 1.33342C4.31823 1.33342 1.33337 4.31826 1.33337 8.00008C1.33337 11.6819 4.31823 14.6667 8.00004 14.6667Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 5.33342V10.6667"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.33337 8.00008H10.6667"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Thiết kế riêng</span>
          </Link> */}
        </div>

        {/* Auth Buttons */}
        <div className="px-6 pt-8 pb-6 flex gap-4">
          <Button className="w-full" onClick={() => signIn('google')}>
            Đăng nhập
          </Button>
          {/* <Link
            href="/login"
            className="flex-1 bg-[#FAE4E4] text-[#FD8C06] text-center py-3.5 rounded-md border border-[#FAE4E4] font-medium text-sm"
            onClick={onClose}
          >
            Đăng nhập
          </Link>

          <Link
            href="/register"
            className="flex-1 bg-[#fd8c06] text-white text-center py-3.5 rounded-md font-medium text-sm"
            onClick={onClose}
          >
            Đăng ký
          </Link> */}
        </div>
      </div>
    </>
  );
}
