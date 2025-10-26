"use client";
import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface PublicationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  invitationUrl?: string;
}

export default function PublicationSuccessModal({
  isOpen,
  onClose,
  startDate,
  endDate,
  invitationUrl = "https://mimywedding/huyenmy-duclong"
}: PublicationSuccessModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Format dates
  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

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
            className="absolute inset-0 backdrop-blur-[2px] bg-white bg-opacity-5"
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
            {/* Logo */}
            <div className="flex justify-center pt-6">
              <div className="w-16 h-16">
                <Image 
                  src="/images/mimy-logo.png" 
                  alt="Mimy.vn Logo" 
                  width={64} 
                  height={64}
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.style.display = 'none';
                  }}
                />
                {/* Fallback text if image fails to load */}
                <div className="text-[#fd8c06] font-bold text-xl">
                  Mimy.vn
                </div>
              </div>
            </div>
            
            {/* Success message */}
            <div className="px-6 pt-4 pb-2 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Thiệp của bạn đã được xuất bản</h2>
              <p className="text-gray-600 mb-1">
                Bạn đã tạo thiệp thành công.
              </p>
              <p className="text-gray-600 mb-3">
                Thiệp của bạn có hiệu lực từ ngày {formatDate(startDate)} đến {formatDate(endDate)}.
              </p>
              
              <p className="text-gray-600 mb-3">
                Hãy truy cập <a href={invitationUrl} className="text-[#fd8c06] hover:underline">{invitationUrl}</a> để xem ngay thiệp cưới của bạn nhé!
              </p>
              
              <p className="text-gray-600 mb-4">
                Chúc bạn có một đám cưới tròn ven, hạnh phúc và ngập tràn yêu thương!
              </p>
            </div>
            
            {/* View button */}
            <div className="px-6 pb-6">
              <Link href={invitationUrl} target="_blank">
                <button
                  className="w-full bg-[#fd8c06] text-white py-3 rounded-md hover:bg-[#B85F60] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fd8c06]"
                >
                  Xem thiệp ngay
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
