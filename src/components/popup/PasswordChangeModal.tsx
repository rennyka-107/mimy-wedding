"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (oldPassword: string, newPassword: string) => void;
}

export default function PasswordChangeModal({
  isOpen,
  onClose,
  onSubmit
}: PasswordChangeModalProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset form when opening
  useEffect(() => {
    if (isOpen) {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
    }
  }, [isOpen]);

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
      transition: { duration: 0.2 } 
    },
    exit: { 
      opacity: 0,
      transition: { delay: 0.1, duration: 0.2 } 
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -20 },
    visible: { 
      opacity: 0.8, 
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
      transition: { duration: 0.2 }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới không khớp");
      return;
    }
    
    // Password strength validation could be added here
    
    // Submit
    onSubmit(oldPassword, newPassword);
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
            className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 relative z-10"
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
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Đổi mật khẩu</h2>
              <p className="text-gray-500">Nhập thông tin theo mẫu bên dưới</p>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 pb-6">
              {/* Old password input (with visibility toggle) */}
              <div className="mb-4 relative">
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Mật khẩu cũ"
                    className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#CE6F70] focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showOldPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>
              </div>
              
              {/* New password input */}
              <div className="mb-4 relative">
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mật khẩu mới"
                    className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#CE6F70] focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>
              </div>
              
              {/* Confirm new password input */}
              <div className="mb-6 relative">
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
                    className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#CE6F70] focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>
              </div>
              
              {/* Error message */}
              {error && (
                <div className="mb-4 text-red-500 text-sm">
                  {error}
                </div>
              )}
              
              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-[#CE6F70] text-white py-3 rounded-md hover:bg-[#B85F60] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CE6F70]"
              >
                Đổi mật khẩu
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
