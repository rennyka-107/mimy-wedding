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
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3333 5.33334L9.33333 1.82667C8.96665 1.4987 8.49196 1.31738 8 1.31738C7.50805 1.31738 7.03335 1.4987 6.66667 1.82667L2.66667 5.33334C2.45491 5.52272 2.28594 5.75504 2.17098 6.01483C2.05603 6.27463 1.99774 6.55592 2 6.84V12.6667C2 13.1971 2.21072 13.7058 2.58579 14.0809C2.96086 14.456 3.46957 14.6667 4 14.6667H12C12.5304 14.6667 13.0391 14.456 13.4142 14.0809C13.7893 13.7058 14 13.1971 14 12.6667V6.83334C14.0013 6.55038 13.9426 6.27036 13.8276 6.01179C13.7127 5.75322 13.5442 5.52197 13.3333 5.33334ZM9.33333 13.3333H6.66667V10C6.66667 9.82319 6.73691 9.65362 6.86193 9.5286C6.98696 9.40357 7.15652 9.33334 7.33333 9.33334H8.66667C8.84348 9.33334 9.01305 9.40357 9.13807 9.5286C9.2631 9.65362 9.33333 9.82319 9.33333 10V13.3333ZM12.6667 12.6667C12.6667 12.8435 12.5964 13.0131 12.4714 13.1381C12.3464 13.2631 12.1768 13.3333 12 13.3333H10.6667V10C10.6667 9.46957 10.456 8.96086 10.0809 8.58579C9.70581 8.21072 9.1971 8 8.66667 8H7.33333C6.8029 8 6.29419 8.21072 5.91912 8.58579C5.54405 8.96086 5.33334 9.46957 5.33334 10V13.3333H4C3.82319 13.3333 3.65362 13.2631 3.5286 13.1381C3.40357 13.0131 3.33334 12.8435 3.33334 12.6667V6.83334C3.33346 6.73868 3.35373 6.64513 3.39281 6.55892C3.4319 6.47271 3.48889 6.39581 3.56 6.33334L7.56 2.83334C7.68166 2.72646 7.83806 2.66751 8 2.66751C8.16194 2.66751 8.31834 2.72646 8.44 2.83334L12.44 6.33334C12.5111 6.39581 12.5681 6.47271 12.6072 6.55892C12.6463 6.64513 12.6665 6.73868 12.6667 6.83334V12.6667Z" fill="#FD8C06" />
            </svg>

            <span>Trang chủ</span>
          </Link>

          <Link
            href="/list-template"
            className={`flex items-center gap-3 ${pathname.includes("/list-template") ? "text-[#FD8C06]" : "text-[#7B7B7B]"
              }`}
            onClick={onClose}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.94239 13.4353C7.57097 12.5203 6.67334 11.875 5.625 11.875C4.24429 11.875 3.125 12.9943 3.125 14.375C3.125 15.4105 2.28551 16.25 1.24998 16.25C1.20773 16.25 1.16582 16.2486 1.12427 16.2459C1.77207 17.369 2.98524 18.125 4.37498 18.125C6.44017 18.125 8.11545 16.4556 8.12494 14.3926C8.12498 14.3867 8.125 14.3809 8.125 14.375C8.125 14.0426 8.06014 13.7254 7.94239 13.4353ZM7.94239 13.4353C8.93765 13.0961 9.88432 12.642 10.7646 12.0856M6.5625 12.0641C6.90192 11.0664 7.35675 10.1176 7.91437 9.23543M10.7646 12.0856C12.3316 11.0951 13.6882 9.78016 14.7339 8.21171L17.9639 3.36672C18.0689 3.20911 18.125 3.02392 18.125 2.83449C18.125 2.30458 17.6954 1.875 17.1655 1.875C16.9761 1.875 16.7909 1.93107 16.6333 2.03615L11.7883 5.26614C10.2198 6.31177 8.90493 7.66836 7.91437 9.23543M10.7646 12.0856C10.1997 10.8194 9.1806 9.80031 7.91437 9.23543" stroke="#FD8C06" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
          <Button className="w-full" variant='ghost' onClick={() => signIn('google')}>
            <div className="text-black flex items-center ">
              <Image
                unoptimized
                src="/images/logo-google.png"
                alt="Google Logo"
                width={28}
                height={28}
                className="pl-1"
              />
              <span className="pl-3 text-[#] text-[14px] font-[600]">
                Tiếp tục với Google
              </span>
            </div>
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
