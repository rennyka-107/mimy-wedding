import React from "react";
import Link from "next/link";

interface PageNotFoundProps {
  title?: string;
  description?: string;
  showHomeButton?: boolean;
  homeButtonText?: string;
  homeButtonLink?: string;
}

export function PageNotFound({
  title = "Trang không tồn tại",
  description = "Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.",
  showHomeButton = true,
  homeButtonText = "Quay về trang chủ",
  homeButtonLink = "/",
}: PageNotFoundProps) {
  return (
    <div className="h-[100vh] flex items-center justify-center  px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon/Number */}
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-[120px] md:text-[160px] font-bold bg-gradient-to-r from-[#FFBB53] to-[#FD8C06] bg-clip-text text-transparent leading-none">
              404
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFBB53] to-[#FD8C06] blur-3xl opacity-20 -z-10"></div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#000000] mb-4">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-base md:text-lg">
          {description}
        </p>

        {/* Decorative element */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FFBB53] to-[#FD8C06] animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FFBB53] to-[#FD8C06] animate-pulse delay-75"></div>
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FFBB53] to-[#FD8C06] animate-pulse delay-150"></div>
        </div>

        {/* Home Button */}
        {showHomeButton && (
          <Link
            href={homeButtonLink}
            className="inline-flex items-center justify-center h-11 px-6 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-[#FFBB53] to-[#FD8C06] hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD8C06]"
          >
            {homeButtonText}
          </Link>
        )}
      </div>
    </div>
  );
}

export default PageNotFound;
