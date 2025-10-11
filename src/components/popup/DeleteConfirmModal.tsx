"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  invitationName?: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  invitationName
}) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
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

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-30"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-[500px] m-4 relative z-10"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Content */}
            <div className="p-6">
              {/* Warning Icon */}
              <div className="flex justify-start mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>

              <h1 className="text-[20px] font-[600] text-[#4A3B36] mb-3">
                Bạn chắc chắn muốn xóa thiệp?
              </h1>
              
              <p className="text-[#A4A7AE] mb-6 leading-relaxed">
                Đây là hành động không thể hoàn tác. Bạn chắc chắn muốn xóa thiệp{" "}
                {invitationName && (
                  <span className="font-medium text-[#4A3B36]">&quot;{invitationName}&quot;</span>
                )}{" "}
                của mình?
              </p>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-6 py-3 bg-[#CE6F70] hover:bg-[#B85F60] text-white rounded-lg font-medium transition-colors"
                >
                  Xóa thiệp
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
