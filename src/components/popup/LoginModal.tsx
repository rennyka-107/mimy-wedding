"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useAuth, GoogleUserData } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import Button from "../ui/Button";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  callback?: () => void;
}

export default function LoginModal({ isOpen, onClose, callback }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.8,
      transition: {
        duration: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        delay: 0.1,
        duration: 0.2
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        duration: 0.3,
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  const { login, loginWithGoogle, error: authError, isLoading } = useAuth();
  const [error, setError] = useState("");

  // Update local error when auth error changes
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
    } catch (err) {
      setError(JSON.stringify(err) || "Đăng nhập thất bại");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      signIn("google");
      callback && callback();
    } catch (err) {
      setError(JSON.stringify(err) || "Đăng nhập với Google thất bại");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
          <motion.div
            className="absolute inset-0 backdrop-blur-[2px] bg-black bg-opacity-5"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />

          <motion.div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-[550px] m-4 relative z-10 h-fit"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="px-10 pt-10 w-full">
              <h2 className="text-[#383637] font-[Montserrat] text-[20px] md:text-[24px] font-bold leading-[100%] mb-2">Đăng nhập bằng Google</h2>
            </div>
            <div className="w-full px-10 pb-2 text-[#898A85] font-[Montserrat] text-[14px] font-normal leading-[20px] mb-2 ">
              Tài khoản của bạn sẽ được tạo tự động khi đăng nhập lần đầu bằng Google.
            </div>
            <form onSubmit={handleLogin} className="px-10 pt-2 ">
              <div className="mb-4">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="cursor-pointer w-full border text-[#A4A7AE] bg-[#f9f9f9] border-none rounded-[8px] px-4 py-3 flex items-center justify-start hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#A4A7AE]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </>
                  ) : (
                    <div className="text-black flex items-center ">
                      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 mr-2">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                      </svg> */}
                      <Image
                            unoptimized
                            src="./images/logo-google.png"
                            alt="Google Logo"
                            width={28}
                            height={28}
                            className="pl-1"
                          />
                      <span className="pl-3 text-[#383637] text-[14px] font-[600]">
                        Tiếp tục với Google
                      </span>
                    </div>
                  )}
                </button>
              </div>
            </form>
            <div className="flex items-center pt-4 pb-2.5 mb-2 px-10 w-full">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.895431 15.1046 0 14 0H2ZM12.0303 4.96967C12.3196 5.25897 12.3232 5.72582 12.041 6.01947L8.04876 11.0097C8.043 11.0169 8.03685 11.0238 8.03032 11.0303C7.73743 11.3232 7.26256 11.3232 6.96966 11.0303L4.32322 8.38388C4.03032 8.09099 4.03032 7.61612 4.32322 7.32322C4.61611 7.03033 5.09098 7.03033 5.38388 7.32322L7.4774 9.41674L10.9498 4.9921C10.9559 4.98424 10.9626 4.97674 10.9697 4.96967C11.2626 4.67678 11.7374 4.67678 12.0303 4.96967Z" fill="#FD8C06" />
              </svg>
              <span className="text-[#383637] font-montserrat text-[14px] font-[500] pl-3 w-fit">Tôi đồng ý với <a href="https://mimy.vn/teams-of-service" className="font-[600] text-[#FD8C06]">Điều khoản dịch vụ</a>  và  <a href="https://mimy.vn/privacy-policy" className="font-[600] text-[#FD8C06]">Chính sách bảo mật</a></span>
            </div>
            <div className="w-full flex mb-10">
              <Button
                variant="ghost"
                onClick={onClose}
                className="flex mx-10 font-[600] text-[14px]  w-full focus:outline-none focus:ring-0 focus:text-inherit"
                aria-label="Close"
              >
                Bỏ qua
              </Button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
