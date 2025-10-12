"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function AuthCallbackPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    // If authentication is successful, notify parent and close the popup
    if (status === "authenticated" && session?.user) {
      // Send message to parent window
      if (window.opener) {
        window.opener.postMessage(
          { type: 'GOOGLE_AUTH_SUCCESS' },
          window.location.origin
        );
        
        // Close the popup window after a short delay
        setTimeout(() => {
          window.close();
        }, 500);
      }
    }
  }, [status, session]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fd8c06] mx-auto mb-4"></div>
        <p className="text-gray-600">Đang xử lý đăng nhập...</p>
        {status === "authenticated" && (
          <p className="text-green-600 mt-2">Đăng nhập thành công!</p>
        )}
      </div>
    </div>
  );
}
