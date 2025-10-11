"use client";
import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SuccessIcon from "../icons/success";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentSuccessModal({
  isOpen,
  onClose
}: PaymentSuccessModalProps) {
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
            {/* Success icon */}
            <div className="flex justify-center pt-8">
              <div className="p-[12px] rounded-full bg-green-100 flex items-center justify-center">
                <SuccessIcon />
              </div>
            </div>
            
            {/* Success message */}
            <div className="px-6 py-6 text-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Thanh toán dịch vụ thành công</h2>
              <p className="text-gray-600 mb-2">
                - Cảm ơn bạn đã tin tưởng Mimy Wedding. Dịch vụ sẽ được kích hoạt trong vòng 24h tới.
              </p>
              <p className="text-gray-600">
                - Hãy kiểm tra email để nhận được thông tin sớm nhất bạn nhé.
              </p>
            </div>
            
            {/* Confirm button */}
            <div className="px-6 pb-6">
              <button
                onClick={onClose}
                className="w-full bg-[#CE6F70] text-white py-3 rounded-md hover:bg-[#B85F60] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CE6F70]"
              >
                Đã hiểu
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
