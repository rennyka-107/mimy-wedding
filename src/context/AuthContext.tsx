"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import LoginModal from "@/components/popup/LoginModal";
import RegisterModal from "@/components/popup/RegisterModal";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

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
  loginWithGoogle: () => Promise<void>;
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

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signIn('google', { callbackUrl: '/' });
      closeLoginModal();
    } catch (error) {
      console.error('Đăng nhập Google thất bại:', error);
      setError('Có lỗi xảy ra khi đăng nhập với Google');
      toast.error('Có lỗi xảy ra khi đăng nhập với Google');
    } finally {
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
