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
                  className="w-full text-black px-4 py-3 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#CE6F70] focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
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
                  className="w-full text-black px-4 py-3 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#CE6F70] focus:border-transparent transition-all"
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
                    className="w-full text-black px-4 py-3 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#CE6F70] focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 text-black rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#CE6F70] focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 text-black rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#CE6F70] focus:border-transparent transition-all"
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
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
