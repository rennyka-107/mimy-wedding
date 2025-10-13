"use client";

import { useEffect, useRef } from 'react';

interface VisitTrackerOptions {
  region?: string;
  sub_id?: string;
}

export function useVisitTracker(options: VisitTrackerOptions = {}) {
  const hasTracked = useRef(false);
  const lastOptionsRef = useRef<string>('');
  const optionsStringified = JSON.stringify(options);
  
  useEffect(() => {
    const currentOptions = JSON.parse(optionsStringified);
    
    console.log('[useVisitTracker] Effect triggered with options:', currentOptions);
    console.log('[useVisitTracker] hasTracked.current:', hasTracked.current);
    console.log('[useVisitTracker] lastOptionsRef.current:', lastOptionsRef.current);
    
    // SKIP nếu cả 2 đều undefined - component chưa sẵn sàng
    if (currentOptions.region === undefined && currentOptions.sub_id === undefined) {
      console.log('[useVisitTracker] Both undefined, not ready yet, skipping');
      return;
    }
    
    // Reset hasTracked nếu options thay đổi từ undefined sang có giá trị
    if (lastOptionsRef.current !== optionsStringified) {
      const lastOpts = lastOptionsRef.current ? JSON.parse(lastOptionsRef.current) : {};
      
      console.log('[useVisitTracker] Options changed from:', lastOpts, 'to:', currentOptions);
      
      // Nếu trước đó cả 2 undefined, giờ có giá trị -> reset để track
      const wasEmpty = lastOpts.region === undefined && lastOpts.sub_id === undefined;
      const hasValue = currentOptions.region !== undefined || currentOptions.sub_id !== undefined;
      
      if (wasEmpty && hasValue) {
        console.log('[useVisitTracker] Changed from empty to has value, resetting hasTracked');
        hasTracked.current = false;
      }
      
      lastOptionsRef.current = optionsStringified;
    }
    
    // Chỉ chạy nếu chưa track
    if (hasTracked.current) {
      console.log('[useVisitTracker] Already tracked, skipping');
      return;
    }
    
    const trackVisit = async () => {
      console.log('[useVisitTracker] ✅ Proceeding to track with options:', currentOptions);
      
      try {
        // Lấy current domain
        const currentDomain = window.location.hostname;
        
        // Lấy referrer
        const referrer = document.referrer;
        
        // Check xem có phải internal navigation không
        let isInternalNavigation = false;
        
        if (referrer) {
          try {
            const referrerUrl = new URL(referrer);
            const referrerDomain = referrerUrl.hostname;
            
            // Nếu referrer cùng domain -> internal navigation
            isInternalNavigation = referrerDomain === currentDomain;
          } catch (e) {
            // Nếu parse referrer failed, coi như external
            isInternalNavigation = false;
          }
        }

        // Chỉ track nếu không phải internal navigation
        if (!isInternalNavigation) {
          // Check sessionStorage để tránh duplicate trong cùng session
          const sessionKey = 'visit_tracked';
          const lastTracked = sessionStorage.getItem(sessionKey);
          
          // Nếu đã track trong vòng 30 phút, skip
          if (lastTracked) {
            const lastTrackedTime = parseInt(lastTracked, 10);
            const now = Date.now();
            const thirtyMinutes = 30 * 60 * 1000;
            
            if (now - lastTrackedTime < thirtyMinutes) {
              hasTracked.current = true;
              return;
            }
          }

          // Gọi API để track visit
          const trackingData = {
            region: currentOptions.region,
            sub_id: currentOptions.sub_id,
          };

          console.log('[useVisitTracker] Tracking visit with data:', trackingData);

          const response = await fetch('/api/visits', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(trackingData),
          });

          if (response.ok) {
            const result = await response.json();
            // Lưu timestamp vào sessionStorage
            sessionStorage.setItem(sessionKey, Date.now().toString());
            hasTracked.current = true;
            console.log('[useVisitTracker] Visit tracked successfully:', result);
          } else {
            console.error('[useVisitTracker] Failed to track visit:', response.status);
          }
        } else {
          hasTracked.current = true;
          console.log('Internal navigation detected, visit not tracked');
        }
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    trackVisit();
  }, [optionsStringified]); // Re-run when options change
}
