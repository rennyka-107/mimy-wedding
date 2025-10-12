"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRPaymentModal from "./QRPaymentModal";
import useTemplateStore from "@/states/templates/state";
import { formatMoneyVND, generateString } from "@/utils/helpers";

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface PublishInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: ({
    publicUrl,
    templateId,
    templatePrice,
    templateName,
    code,
    totalMoney,
    // userId,
    // paymentId,
    publicStart,
    publicEnd,
    templateConfigs,
  }: {
    publicUrl: string;
    templateId: string;
    code: string;
    totalMoney: number;
    templatePrice: number;
    templateName: string;
    // userId: string;
    // paymentId: string;
    publicStart: string;
    publicEnd: string;
    templateConfigs: unknown;
  }, callback?: () => void) => void;
  isPaid?: boolean;
  templates?: Template[];
  dailyRate?: number;
}

export interface Template {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

// Helper functions for date handling
function formatDateForInput(date: Date): string {
  return date.toISOString().split('T')[0];
}

function formatDateForDisplay(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
}

function getDayDiff(startDateStr: string, endDateStr: string): number {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include end day
}

export default function PublishInvitationModal({
  isOpen,
  onClose,
  onSubmit,
  isPaid = false,
  templates = [],
  dailyRate = 10000,
}: PublishInvitationModalProps) {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  // const [totalPrice, setTotalPrice] = useState(0);
  const [surfixUrl, setSurfixUrl] = useState<string>("thiep-cuoi");
  const modalRef = useRef<HTMLDivElement>(null);
  const { template: { configs, template_id, template_name, template_price } } = useTemplateStore()

  // Calculate days and price when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Calculate difference in days
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include end day

      // Calculate base price based on days
      let price = diffDays * dailyRate;

      // Add template price if paid version
      if (isPaid && selectedTemplateId) {
        const template = templates.find(t => t.id === selectedTemplateId);
        if (template) {
          price += template.price;
        }
      }

      // setTotalPrice(price);
    } else {
      // setTotalPrice(0);
    }
  }, [startDate, endDate, selectedTemplateId, isPaid, templates, dailyRate]);

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

  // Reset form when opening
  useEffect(() => {
    if (isOpen) {
      setStartDate("");
      setEndDate("");
      setSelectedTemplateId(isPaid && templates.length > 0 ? templates[0].id : "");
    }
  }, [isOpen, isPaid, templates]);

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

  // Handle form submission
  const handleSubmit = () => {
    // onSubmit({
    //   surfixUrl: surfixUrl,
    //   templateId: selectedTemplateId
    // });
    onClose();
    setShowPaymentModal(true);
    // console.log(template_id, "template_id");
    // console.log(configs, "configs");
  };

  

  const code = "Mimy" + generateString("", 10, 10, "both");



  // Handle payment completion
  const handlePaymentComplete = () => {
    onSubmit(
      {
        publicUrl: surfixUrl,
        templateId: template_id,
        code,
        totalMoney: template_price,
        templatePrice: template_price,
        templateName: template_name,
        // userId: "",
        // paymentId: "",
        publicStart: getCurrentDate(),
        publicEnd: getNext30Days(),
        templateConfigs: configs,
      },
      () => {
        setShowPaymentModal(false);
        onClose();
      }
    );
    
  };

  function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return `${dd}-${mm}-${yyyy}`;
  }

  function getNext30Days() {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 30); // Properly add 30 days
    const dd = String(futureDate.getDate()).padStart(2, '0');
    const mm = String(futureDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = futureDate.getFullYear();

    return `${dd}-${mm}-${yyyy}`;
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && !showPaymentModal && (
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
              className="bg-white rounded-lg shadow-xl w-full max-w-[600px] m-4 relative z-10"
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
              <div className="px-6 pt-6 pb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Xuất bản thiệp cưới của bạn</h2>
                <p className="text-gray-500">Nếu có bất kỳ vấn đề gì, vui lòng liên hệ với chúng tôi!</p>
              </div>

              {/* Content - Template information */}
              <div className="px-6 py-3">
                <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4">
                  <span className="block text-gray-800">Thiệp &quot;{template_name}&quot;</span>
                  <span className="font-medium">{formatMoneyVND(template_price)}</span>
                </div>
                <div className="text-gray-500 text-sm mt-2">
                  (Thời hạn: Từ ngày {getCurrentDate()} đến ngày {getNext30Days()})
                </div>
              </div>

              {/* URL Preview */}
              <div className="px-6 py-3">
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-100 rounded-lg py-3 px-4">
                    <div className="flex items-baseline">
                      <span className="text-gray-600">https://mimy.vn/</span>
                    </div>
                  </div>
                  <input onChange={(e) => setSurfixUrl(e.target.value)} type="text" className="flex-1 border border-[#F0F2F3] rounded-[6px] px-[12px] py-[10px] text-[#999999] outline-none" value={surfixUrl} />
                  <div className="text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z" />
                    </svg>
                  </div>
                </div>
              </div>



              {/* Removed pricing information section as it's not in the screenshot */}

              {/* Total Price */}
              <div className="px-6 py-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">Tổng tiền</span>
                  <span className="font-semibold text-gray-800">
                    {formatMoneyVND(template_price)} vnđ
                  </span>
                </div>
              </div>

              {/* Submit button */}
              <div className="px-6 pb-6">
                <button
                  onClick={handleSubmit}
                  className="cursor-pointer w-full py-3 rounded-lg focus:outline-none bg-[#fd8c06] text-white hover:bg-[#E07000] transition-colors"
                >
                  Xác nhận và tiến hành thanh toán
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QR Payment Modal (for paid version) */}
      {showPaymentModal && (
        <QRPaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={template_price}
          onPaymentConfirmed={handlePaymentComplete}
          code={code}
        />
      )}
    </>
  );
}
