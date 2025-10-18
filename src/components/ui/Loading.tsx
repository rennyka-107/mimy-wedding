import React from "react";

interface LoadingProps {
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  text?: string;
  showText?: boolean;
}

export function Loading({
  fullScreen = true,
  size = "md",
  text = "Đang tải...",
  showText = true,
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const containerClass = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50"
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-4">
        {/* Spinner with gradient */}
        <div className="relative">
          <div
            className={`${sizeClasses[size]} rounded-full border-4 border-gray-200 border-t-transparent animate-spin`}
            style={{
              borderTopColor: "transparent",
              borderRightColor: "#FD8C06",
              borderBottomColor: "#FFBB53",
              borderLeftColor: "#FD8C06",
            }}
          ></div>
          <div
            className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-gradient-to-r from-[#FFBB53] to-[#FD8C06] blur-xl opacity-20 animate-pulse`}
          ></div>
        </div>

        {/* Loading text */}
        {showText && (
          <p
            className={`${textSizeClasses[size]} font-medium bg-gradient-to-r from-[#FFBB53] to-[#FD8C06] bg-clip-text text-transparent animate-pulse`}
          >
            {text}
          </p>
        )}

        {/* Decorative dots */}
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FFBB53] to-[#FD8C06] animate-bounce [animation-delay:0ms]"></div>
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FFBB53] to-[#FD8C06] animate-bounce [animation-delay:150ms]"></div>
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FFBB53] to-[#FD8C06] animate-bounce [animation-delay:300ms]"></div>
        </div>
      </div>
    </div>
  );
}

// Alternative: Simple inline spinner (không full screen)
export function LoadingSpinner({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  };

  return (
    <div
      className={`${sizeClasses[size]} w-full h-full rounded-full border-gray-200 border-t-transparent animate-spin ${className}`}
      style={{
        borderTopColor: "transparent",
        borderRightColor: "#FD8C06",
        borderBottomColor: "#FFBB53",
        borderLeftColor: "#FD8C06",
      }}
    ></div>
  );
}

// Alternative: Beautiful card loading skeleton
export function LoadingSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="w-full h-full space-y-4 p-4">
      <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse bg-[length:200%_100%] [animation:shimmer_1.5s_infinite]"></div>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse bg-[length:200%_100%] [animation:shimmer_1.5s_infinite]"
          style={{ animationDelay: `${i * 0.1}s`, width: `${100 - i * 10}%` }}
        ></div>
      ))}
    </div>
  );
}

// Alternative: Pulsating ring loader
export function LoadingRing({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute inset-0 rounded-full border-4 border-[#FFBB53]/30"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#FFBB53] border-r-[#FD8C06] animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-[#FD8C06] border-r-[#FFBB53] animate-spin [animation-direction:reverse] [animation-duration:0.8s]"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFBB53] to-[#FD8C06] blur-lg opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
}

export default Loading;
