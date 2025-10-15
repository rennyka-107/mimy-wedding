"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import QRCode from "qrcode";

// Function to generate random ID if not provided
function generateRandomId() {
  return "ABVEDFUSI" + Math.floor(1000 + Math.random() * 9000);
}

interface QRPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  code: string;
  referenceId?: string;
  serviceDescription?: string;
  onPaymentConfirmed?: () => void;
}

export default function QRPaymentModal({
  isOpen,
  onClose,
  amount,
  code,
  referenceId = generateRandomId(),
  serviceDescription = "Vui lòng không chỉnh sửa nội dung thanh toán mặc định.",
  onPaymentConfirmed
}: QRPaymentModalProps) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [qrCodeData, setQrCodeData] = useState<string>("");

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
      transition: { duration: 0.2 }
    }
  };

  // Handle payment confirmation
  const handlePaymentConfirmed = () => {
    // Call the callback if provided
    if (onPaymentConfirmed) {
      onPaymentConfirmed();
    }
    // Close the modal
    // onClose();
  };

  // useEffect(() => {
  //   generateQRCode();
  // }, []);

  // const generateQRCode = () => {
  //   // Generate QR code logic
  //   QRCode.toDataURL("00020101021238590010A00000072701290006970418011596247MIMYSTUDIO0208QRIBFTTA53037045404" +amount +"5802VN62130809"+code+"6304B0F3", (err, data) => {
  //     if (data) {
  //       setQrCodeData(data);
  //     }
  //   });
  // };

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
              className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4 p-4 relative z-10"
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
              <div className="px-6 pt-6 pb-3">
                <h2 className="text-2xl font-[600] text-[#383637] pb-2">Quét QR thanh toán</h2>
                <p className="text-[#898A85] text-[14px]">Nếu có bất kỳ vấn đề gì, vui lòng liên hệ với chúng tôi theo địa chỉ contact@mimy.vn!</p>
              </div>
              
              {/* QR Code */}
              <div className="px-6 py-4 flex justify-center">
                <div className="relative w-64 h-64 bg-white rounded-md">
                  <div className="relative w-full h-full">
                    {/* Placeholder for actual QR code - in a real app, generate based on payment information */}
                    <Image 
                      // src={qrCodeData} 
                      src={"https://qr.sepay.vn/img?acc=96247MIMYSTUDIO&bank=BIDV&amount=" + amount + "&des=" + code}
                      alt="QR Code for payment"
                      fill
                      className="object-contain"
                      onError={(e) => {
                        // Fallback if image doesn't exist
                        // const target = e.target as HTMLImageElement;
                        // target.onerror = null;
                        // target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjQwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iI2YxZjFmMSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IidBcmlhbCcsIHNhbnMtc2VyaWYiIGZpbGw9IiM4ODgiPlFSIENvZGU8L3RleHQ+PC9zdmc+";
                      }}
                    />
                    
                    {/* Logo overlay in center of QR code */}
                    {/* <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border-4 border-white">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                        MW
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              
              {/* Payment details */}
              <div className="px-6">
                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <span className="text-[#383637] font-[600]">Tổng tiền</span>
                  <span className="text-[#383637] font-[600]">{amount.toLocaleString()} (VND)</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-[#383637] font-[600]">Nội dung thanh toán</span>
                  <span className="text-[#383637] font-[600]">{code}</span>
                </div>
                
                <p className="text-sm text-[#898A85] pt-2 pb-8">
                  {serviceDescription}
                </p>
              </div>
              
              {/* Button */}
              <div className="px-6 pb-6">
                <button
                  onClick={handlePaymentConfirmed}
                  className="cursor-pointer w-full bg-[#fd8c06] text-white py-3 rounded-md hover:bg-[#E07000] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fd8c06] border border-[#D5D7DA]"
                >
                  Xác nhận đã thanh toán
                </button>
              </div>
            </motion.div>
          </div>
        )}
    </AnimatePresence>
  );
}
