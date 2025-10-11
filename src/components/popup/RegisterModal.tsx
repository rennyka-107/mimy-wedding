"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState("");
  
  const { register, loginWithGoogle, isLoading, error: authError } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Update local error when auth error changes
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

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
      opacity: 0.5,
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!username || !email || !password || !confirmPassword || !verificationCode) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    
    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Xác nhận mật khẩu không khớp");
      return;
    }
    
    if (!agreeToTerms) {
      setError("Vui lòng đồng ý với điều khoản");
      return;
    }
    
    try {
      // Kiểm tra mã xác thực trước
      const verifyResponse = await fetch('/api/auth/verification', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email,
          code: verificationCode,
          name: username,
          password: password 
        })
      });

      const verifyData = await verifyResponse.json();
      
      if (!verifyResponse.ok) {
        throw new Error(verifyData.error || 'Xác thực email thất bại');
      }
      
      // Nếu xác thực OK, đăng ký tài khoản
      const registerResponse = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name: username,
          email: email,
          password: password,
          code: verificationCode
        })
      });
      
      const registerData = await registerResponse.json();
      
      if (!registerResponse.ok) {
        throw new Error(registerData.error || 'Đăng ký thất bại');
      }
      
      toast.success('Đăng ký thành công!');
      onClose();
    } catch (err) {
      setError(JSON.stringify(err) || "Đăng ký thất bại");
    }
  };

  const handleSendCode = async () => {
    if (!email) {
      toast.error("Email không được để trống");
      return;
    }
    // Use simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Địa chỉ email không hợp lệ");
      return;
    }
    
    try {
      const response = await fetch('/api/auth/verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Gửi mã xác thực thất bại');
      }
      
      setCodeSent(true);
      toast.success("Đã gửi mã xác thực đến " + email);
    } catch (err) {
      toast.error(JSON.stringify(err) || 'Không thể gửi mã xác thực');
      setError(JSON.stringify(err) || 'Không thể gửi mã xác thực');
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle();
      // Modal will be closed by AuthContext if successful
    } catch (err) {
      setError(JSON.stringify(err) || "Đăng ký bằng Google thất bại");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background overlay */}
          <motion.div 
            className="absolute inset-0 backdrop-blur-[2px] bg-black bg-opacity-5"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
          
          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 relative z-10 max-h-[90vh] overflow-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Header */}
            <div className="px-6 py-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Đăng ký</h2>
              <p className="text-gray-500">Nhập thông tin theo mẫu bên dưới</p>
            </div>
            
            {/* Form */}
            <form onSubmit={handleRegister} className="px-6 pb-6">
              {/* Email field */}
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email của bạn"
                  disabled={codeSent}
                  className="w-full text-[#A4A7AE] px-4 py-3 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#CE6F70] focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                  required
                />
              </div>
              
              {/* Verification code */}
              <div className="mb-4 flex gap-2">
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={codeSent && isLoading}
                  className="px-4 py-2 bg-[#CE6F70] text-white rounded-md hover:bg-[#B85F60] transition-colors text-sm whitespace-nowrap disabled:bg-gray-300"
                >
                  {codeSent ? "Gửi lại mã" : "Gửi mã xác thực"}
                </button>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Mã xác thực"
                  className="w-full text-[#A4A7AE] px-4 py-3 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#CE6F70] focus:border-transparent transition-all"
                  required
                />
              </div>
              
              {/* Fullname - Chỉ hiển thị sau khi đã gửi mã */}
              {codeSent && (
                <div className="mb-4">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Họ và tên"
                    className="w-full text-[#A4A7AE] px-4 py-3 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#CE6F70] focus:border-transparent transition-all"
                    required
                  />
                </div>
              )}
              
              {/* Password fields - Chỉ hiển thị sau khi đã gửi mã */}
              {codeSent && (
                <>
                  {/* Password input */}
                  <div className="mb-4 relative">
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mật khẩu"
                        className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#CE6F70] focus:border-transparent transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
                      >
                        {showPassword ? "Ẩn" : "Hiện"}
                      </button>
                    </div>
                  </div>
                  
                  {/* Confirm password input */}
                  <div className="mb-4 relative">
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu"
                        className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#CE6F70] focus:border-transparent transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
                      >
                        {showConfirmPassword ? "Ẩn" : "Hiện"}
                      </button>
                    </div>
                  </div>
                  
                  {/* Agreement checkbox */}
                  <div className="mb-6 flex items-center">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={agreeToTerms}
                      onChange={() => setAgreeToTerms(!agreeToTerms)}
                      className="mr-2 h-4 w-4 accent-[#CE6F70]"
                      required
                    />
                    <label htmlFor="agree" className="text-gray-700 text-sm">
                      Tôi đồng ý với <Link href="/terms" className="text-[#CE6F70] underline">điều khoản sử dụng</Link>
                    </label>
                  </div>
                </>
              )}
              
              {/* Error display */}
              {error && (
                <div className="mb-4 text-red-500 text-sm">{error}</div>
              )}
              
              {/* Submit button - Chỉ hiển thị sau khi đã nhập mã xác thực */}
              {codeSent && (
                <div className="mb-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#CE6F70] text-white py-3 px-4 rounded-md hover:bg-[#B85F60] transition-colors focus:outline-none focus:ring-2 focus:ring-[#CE6F70] focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin inline-block h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang đăng ký...
                      </>
                    ) : (
                      "Đăng ký"
                    )}
                  </button>
                </div>
              )}

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink px-4 text-gray-400">hoặc tiếp tục với</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>
              
              {/* Google login */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={handleGoogleRegister}
                  disabled={isLoading}
                  className="w-full border border-gray-200 rounded-md px-4 py-3 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </>
                  ) : (
                    <div className="text-black flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 mr-2">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                      </svg>
                      Google
                    </div>
                  )}
                </button>
              </div>
                            
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
