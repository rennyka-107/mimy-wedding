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
  serviceDescription = "Sau khi chuyển khoản xong, bấm nút “Xác nhận thanh toán” bên dưới để hệ thống kiểm tra giao dịch.",
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
              <h2 className="text-[20px] md:text-2xl font-[600] text-[#383637] pb-2">Quét QR thanh toán</h2>
              <p className="text-[#898A85] text-[14px] md:text-[16px]">Nếu có bất kỳ vấn đề gì, vui lòng liên hệ với chúng tôi theo địa chỉ <span className="text-[#FD8C06] font-[600]">contact@mimy.vn</span>!</p>
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
            <div className="flex items-center justify-between px-6 pb-2">
              <span className="text-[#383637] font-[600] text-[14px] md:text-[16px]">Số tài khoản (BIDV)</span>
              <div className="flex items-center">
                <span className="text-[#383637] font-[500] pr-2 text-[14px] md:text-[16px]">8899250111</span>
                <svg className="cursor-pointer" onClick={() => navigator.clipboard.writeText('8899250111')} width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_798_2065)">
                    <path d="M18.3333 8.25H10.0833C9.07081 8.25 8.25 9.07081 8.25 10.0833V18.3333C8.25 19.3459 9.07081 20.1667 10.0833 20.1667H18.3333C19.3459 20.1667 20.1667 19.3459 20.1667 18.3333V10.0833C20.1667 9.07081 19.3459 8.25 18.3333 8.25Z" stroke="#FD8C06" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4.5835 13.7497H3.66683C3.1806 13.7497 2.71428 13.5565 2.37047 13.2127C2.02665 12.8689 1.8335 12.4026 1.8335 11.9163V3.66634C1.8335 3.18011 2.02665 2.7138 2.37047 2.36998C2.71428 2.02616 3.1806 1.83301 3.66683 1.83301H11.9168C12.4031 1.83301 12.8694 2.02616 13.2132 2.36998C13.557 2.7138 13.7502 3.18011 13.7502 3.66634V4.58301" stroke="#FD8C06" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_798_2065">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-between px-6 pb-3">
              <span className="text-[#383637] font-[600] text-[14px] md:text-[16px]">Nội dung</span>
              <div className="flex items-center">
                <span className="text-[#383637] font-[500] pr-2 text-[14px] md:text-[16px]">{code}</span>
                <svg className="cursor-pointer" onClick={() => navigator.clipboard.writeText(code)} width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_798_2065)">
                    <path d="M18.3333 8.25H10.0833C9.07081 8.25 8.25 9.07081 8.25 10.0833V18.3333C8.25 19.3459 9.07081 20.1667 10.0833 20.1667H18.3333C19.3459 20.1667 20.1667 19.3459 20.1667 18.3333V10.0833C20.1667 9.07081 19.3459 8.25 18.3333 8.25Z" stroke="#FD8C06" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4.5835 13.7497H3.66683C3.1806 13.7497 2.71428 13.5565 2.37047 13.2127C2.02665 12.8689 1.8335 12.4026 1.8335 11.9163V3.66634C1.8335 3.18011 2.02665 2.7138 2.37047 2.36998C2.71428 2.02616 3.1806 1.83301 3.66683 1.83301H11.9168C12.4031 1.83301 12.8694 2.02616 13.2132 2.36998C13.557 2.7138 13.7502 3.18011 13.7502 3.66634V4.58301" stroke="#FD8C06" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_798_2065">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="text-[#898A85] font-[400] px-6 pb-4 text-[12px] md:text-[14px]" >Vui lòng sao chép chính xác nội dung khi chuyển khoản để hệ thống xác nhận giao dịch.</div>

            <div className="px-6">
              <div className="flex items-center justify-between pt-4 pb-2 border-t border-gray-100">
                <span className="text-[#383637] font-[600] text-[14px] md:text-[16px]">Tổng tiền</span>
                <span className="text-[#383637] font-[500] text-[14px] md:text-[16px]">{amount.toLocaleString()} (VND)</span>
              </div>
              <p className="text-sm text-[#898A85] pb-8 text-[12px] md:text-[16px]">
                {serviceDescription}
              </p>
            </div>

            {/* Button */}
            <div className="px-6 pb-6">
              <button
                onClick={handlePaymentConfirmed}
                className="text-[14px] cursor-pointer w-full bg-[#fd8c06] text-white py-3 rounded-md hover:bg-[#E07000] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fd8c06] border border-[#D5D7DA]"
              >
                Xác nhận thanh toán
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
