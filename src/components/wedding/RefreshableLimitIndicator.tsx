"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import LimitIndicator from './LimitIndicator';

interface RefreshableLimitIndicatorProps {
  type: 'image' | 'draft';
  refreshTrigger?: number; // Một giá trị khi thay đổi sẽ trigger refresh
  showWarning?: boolean;
  className?: string;
}

/**
 * Phiên bản LimitIndicator có thể tự động refresh khi refreshTrigger thay đổi
 */
export default function RefreshableLimitIndicator({
  type,
  refreshTrigger = 0,
  showWarning = true,
  className = ''
}: RefreshableLimitIndicatorProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  // Khi refreshTrigger thay đổi, tăng refreshKey để re-render component
  useEffect(() => {
    if (refreshTrigger > 0) {
      setRefreshKey(prev => prev + 1);
    }
  }, [refreshTrigger]);

  return (
    <LimitIndicator
      key={refreshKey}
      type={type}
      showWarning={showWarning}
      className={className}
    />
  );
}
