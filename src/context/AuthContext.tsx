"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import LoginModal from "@/components/popup/LoginModal";
import RegisterModal from "@/components/popup/RegisterModal";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export type GoogleUserData = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
};

type AuthContextType = {
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
  user: {id: string, name: string, email: string, phone: string} | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: (onSuccess?: (userData: GoogleUserData) => void) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [user, setUser] = useState<{id: string, name: string, email: string, phone: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Sync user with session
  useEffect(() => {
    if (session?.user) {
      setUser(session?.user as {id: string, name: string, email: string, phone: string});
    } else {
      setUser(null);
    }
  }, [session]);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false); // Close register if open
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false); // Close login if open
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
        return;
      }
      
      toast.success('Đăng nhập thành công!');
      closeLoginModal();
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
      setError('Có lỗi xảy ra khi đăng nhập');
      toast.error('Có lỗi xảy ra khi đăng nhập');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Đăng ký thất bại');
      }

      toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
      closeRegisterModal();
      openLoginModal();
    } catch (error) {
      console.error('Đăng ký thất bại:', error);
      setError(JSON.stringify(error) || 'Có lỗi xảy ra khi đăng ký');
      toast.error(JSON.stringify(error) || 'Có lỗi xảy ra khi đăng ký');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (onSuccess?: (userData: GoogleUserData) => void) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Open popup window for Google OAuth
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const baseUrl = window.location.origin;
      const callbackUrl = `${baseUrl}/auth/callback`;
      const authUrl = `${baseUrl}/api/auth/signin/google?callbackUrl=${encodeURIComponent(callbackUrl)}`;
      
      const popup = window.open(
        authUrl,
        'Google Login',
        `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
      );

      if (!popup) {
        toast.error('Vui lòng cho phép popup để đăng nhập với Google');
        setIsLoading(false);
        return;
      }

      // Listen for messages from popup
      const messageHandler = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          window.removeEventListener('message', messageHandler);
          
          // Wait a bit for the session to update
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Get the updated session to retrieve user data
          const response = await fetch('/api/auth/session');
          const sessionData = await response.json();
          
          if (sessionData?.user) {
            const userData: GoogleUserData = {
              id: sessionData.user.id || '',
              name: sessionData.user.name || null,
              email: sessionData.user.email || '',
              image: sessionData.user.image || null,
            };
            
            // Call the callback with user data for further processing
            if (onSuccess) {
              onSuccess(userData);
            }
            
            toast.success('Đăng nhập Google thành công!');
            closeLoginModal();
          }
          
          setIsLoading(false);
        }
      };

      window.addEventListener('message', messageHandler);

      // Also check if popup is closed without successful login
      const checkPopupClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopupClosed);
          window.removeEventListener('message', messageHandler);
          setIsLoading(false);
        }
      }, 500);
      
    } catch (error) {
      console.error('Đăng nhập Google thất bại:', error);
      setError('Có lỗi xảy ra khi đăng nhập với Google');
      toast.error('Có lỗi xảy ra khi đăng nhập với Google');
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Đăng xuất thất bại:', error);
      toast.error('Có lỗi xảy ra khi đăng xuất');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoginModalOpen,
        isRegisterModalOpen,
        openLoginModal,
        closeLoginModal,
        openRegisterModal,
        closeRegisterModal,
        user,
        login,
        register,
        loginWithGoogle,
        logout,
        isLoading,
        error,
      }}
    >
      {children}
      {/* Render modals here so they're available throughout the app */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
