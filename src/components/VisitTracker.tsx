"use client";

import { useVisitTracker } from '@/hooks/useVisitTracker';
import { useEffect, useState, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

interface VisitTrackerProps {
  region?: string;
  sub_id?: string;
}

function VisitTrackerContent({ region, sub_id: propSubId }: VisitTrackerProps) {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();

  // Đảm bảo chỉ chạy trên client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lấy sub_id từ URL params nếu có, ưu tiên prop trước
  const urlSubId = searchParams.get('sub_id');
  const finalSubId = propSubId || urlSubId || undefined;
  const finalRegion = region;

  // Debug logging
  useEffect(() => {
    if (mounted) {
      console.log('[VisitTracker] Mounted! URL sub_id:', urlSubId);
      console.log('[VisitTracker] Final sub_id to track:', finalSubId);
      console.log('[VisitTracker] Final region to track:', finalRegion);
    }
  }, [mounted, urlSubId, finalSubId, finalRegion]);

  // Memoize options object - CHỈ TẠO KHI MOUNTED
  const trackingOptions = useMemo(() => {
    return {
      region: finalRegion,
      sub_id: finalSubId,
    };
  }, [finalRegion, finalSubId]);

  // Track visit CHỈ KHI mounted = true
  // Nếu chưa mounted, pass empty object để hook skip
  useVisitTracker(mounted ? trackingOptions : {});

  // Component này không render gì
  return null;
}

export function VisitTracker(props: VisitTrackerProps) {
  return (
    <Suspense fallback={null}>
      <VisitTrackerContent {...props} />
    </Suspense>
  );
}
