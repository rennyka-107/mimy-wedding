"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SaveDraftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SaveDraftModal: React.FC<SaveDraftModalProps> = ({
  isOpen,
  onClose
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-white opacity-30"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-[600px] m-4 relative z-10"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Content */}
            <div className="p-6">
              {/* Success Icon */}
              <div className="flex justify-start mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-green-500">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <h1 className="text-[20px] font-[600] text-[#4A3B36] mb-3 text-left">
                Thiệp của bạn đã được lưu lại
              </h1>
              
              <p className="text-[#A4A7AE] text-left mb-6 leading-relaxed">
                Thiệp của bạn đã được lưu lại, hãy vào mục &quot;Thiệp của tôi&quot; để xem lại tấm thiệp của bạn nhé.
              </p>

              {/* Action button */}
              <button
                onClick={onClose}
                className="w-full bg-[#fd8c06] hover:bg-[#B85F60] text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Đã hiểu
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SaveDraftModal;
