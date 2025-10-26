"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SuccessPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  publicUrl?: string;
  publicStart?: string;
  publicEnd?: string;
}

const SuccessPublishModal: React.FC<SuccessPublishModalProps> = ({
  isOpen,
  onClose,
  publicUrl = "https://mimy.vn/huyenmy-duclong",
  publicStart = "18-01-2025",
  publicEnd = "18-02-2025"
}) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.7 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50
    }
  };

  const handleViewInvitation = () => {
    if (publicUrl) {
      window.open(publicUrl, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="font-montserrat fixed inset-0 flex items-center justify-center z-50">
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-black backdrop-blur-[2px] bg-opacity-30"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-[500px] m-4 p-4 relative z-10 overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-2">
              <div className="flex items-center gap-3">
                <div className="w-[142px]">
                    <img src="/images/logo.png" alt="" />
                </div>
              </div>
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-500">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <h1 className="text-[20px] md:text-[24px] font-[600] text-[#383637] mb-4">
                Thiệp cưới của bạn đã được xuất bản
              </h1>
              
              <div className="space-y-3 mb-6 text-[14px] md:text-[16px]">
                <p className="text-[#383637]">
                  Bạn đã tạo thiệp thành công.
                </p>
                <p className="text-[#383637] text-[14px] md:text-[16px]">
                  Thiệp của bạn có hiệu lực từ ngày <span className="font-[600] text-[#fd8c06]">{publicStart}</span> đến ngày <span className="font-[600] text-[#fd8c06]">{publicEnd}</span>.
                </p>
                <p className="text-[#383637] text-[14px] md:text-[16px]">
                  Hãy truy cập
                  <span className="font-[600] text-[#fd8c06] text-[14px] md:text-[16px]"> {publicUrl} </span>
                  để xem ngay thiệp cưới của bạn nhé!
                </p>
                <p className="text-[#383637] text-[14px] md:text-[16px]">
                  Chúc bạn có một đám cưới trọn vẹn, hạnh phúc và ngập tràn yêu thương!
                </p>
              </div>

              {/* Action button */}
              <button
                onClick={handleViewInvitation}
                className="w-full bg-[#fd8c06] hover:bg-[#fd8c06] text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Xem thiệp ngay
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SuccessPublishModal;
