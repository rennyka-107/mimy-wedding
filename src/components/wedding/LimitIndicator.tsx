"use client";
import React from 'react';
import useUserLimits from '@/hooks/useUserLimits';
import { motion } from 'framer-motion';

interface LimitIndicatorProps {
  type: 'image' | 'draft';
  showWarning?: boolean;
  className?: string;
}

export default function LimitIndicator({ type, showWarning = true, className = '' }: LimitIndicatorProps) {
  const { image, draft, isLoading, error } = useUserLimits();
  
  const limitInfo = type === 'image' ? image : draft;
  const { limit, used, remaining } = limitInfo;
  
  // Tính tỷ lệ sử dụng
  const usagePercent = limit ? Math.min(100, (used / limit) * 100) : 0;
  
  // Xác định màu sắc dựa trên tỷ lệ sử dụng
  let barColor = 'bg-green-500';
  if (usagePercent >= 90) {
    barColor = 'bg-red-500';
  } else if (usagePercent >= 70) {
    barColor = 'bg-orange-400';
  } else if (usagePercent >= 50) {
    barColor = 'bg-yellow-400';
  }
  
  if (isLoading) {
    return <div className={`text-sm text-gray-500 ${className}`}>Đang tải thông tin giới hạn...</div>;
  }
  
  if (error) {
    return null;
  }
  
  return (
    <div className={`${className}`}>
      <div className="flex justify-between text-sm mb-1 text-[#4A3B36]">
        <span>Giới hạn {type === 'image' ? 'ảnh' : 'bản nháp'}</span>
        <span>
          {used}/{limit}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div
          className={`${barColor} h-2.5 rounded-full`}
          style={{ width: `${usagePercent}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${usagePercent}%` }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>
      
      {showWarning && remaining <= Math.max(1, limit * 0.2) && (
        <p className="text-xs mt-1 text-orange-500">
          {remaining === 0 ? (
            'Bạn đã đạt giới hạn tối đa. Vui lòng nâng cấp gói hoặc xóa bớt.'
          ) : remaining === 1 ? (
            `Đây là ${type === 'image' ? 'ảnh' : 'bản nháp'} cuối cùng bạn có thể sử dụng.`
          ) : (
            `Chỉ còn ${remaining} ${type === 'image' ? 'ảnh' : 'bản nháp'} có thể sử dụng.`
          )}
        </p>
      )}
    </div>
  );
}
