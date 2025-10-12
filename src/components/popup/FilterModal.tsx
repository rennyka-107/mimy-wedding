"use client";
import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onApplyFilter: () => void;
  onReset: () => void;
}

export default function FilterModal({
  isOpen,
  onClose,
  title,
  children,
  onApplyFilter,
  onReset
}: FilterModalProps) {
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
            <div className="px-6 py-4">
              <h2 className="text-xl font-medium text-gray-800">{title}</h2>
            </div>
            
            {/* Content */}
            <div className="px-6 pb-4">
              {children}
            </div>
            
            {/* Footer buttons */}
            <div className="px-6 py-4 flex space-x-3">
              <button
                onClick={onReset}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fd8c06]"
              >
                Đặt lại
              </button>
              <button
                onClick={onApplyFilter}
                className="flex-1 bg-[#fd8c06] text-white py-2 px-4 rounded-md hover:bg-[#B85F60] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fd8c06]"
              >
                Lọc
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
