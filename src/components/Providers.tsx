"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
        {children}
      </AuthProvider>
    </SessionProvider>
  );
}
