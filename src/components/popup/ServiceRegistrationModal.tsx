"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRPaymentModal from "./QRPaymentModal";
import PaymentSuccessModal from "./PaymentSuccessModal";

export interface ServiceOption {
  id: string;
  name: string;
  price: number;
  priceUnit?: string; // e.g., "/1 tháng" or "/1 ảnh"
  inputType?: "time" | "quantity";
  inputPlaceholder?: string;
  description?: string;
}

interface ServiceRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedServices: {id: string, value: number}[]) => void;
  services: ServiceOption[];
}

export default function ServiceRegistrationModal({
  isOpen,
  onClose,
  onSubmit,
  services
}: ServiceRegistrationModalProps) {
  const [selectedServices, setSelectedServices] = useState<{id: string, value: number}[]>([]);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Calculate total price
  const totalPrice = selectedServices.reduce((total, selectedService) => {
    const service = services.find(s => s.id === selectedService.id);
    if (service) {
      return total + (service.price * selectedService.value);
    }
    return total;
  }, 0);

  // Reset selections when opening
  useEffect(() => {
    if (isOpen) {
      setSelectedServices([]);
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

  // Toggle service selection
  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => {
      // Check if service is already selected
      const isSelected = prev.some(item => item.id === serviceId);
      
      if (isSelected) {
        // Remove service from selection
        return prev.filter(item => item.id !== serviceId);
      } else {
        // Add service with default value of 1
        return [...prev, { id: serviceId, value: 1 }];
      }
    });
  };

  // Update service value
  const updateServiceValue = (serviceId: string, value: number) => {
    setSelectedServices(prev => 
      prev.map(item => 
        item.id === serviceId ? { ...item, value } : item
      )
    );
  };

  const handleSubmit = () => {
    onClose();
    // Show QR payment modal instead of closing directly
    setShowQRModal(true);
  };
  
  // Handle after successful payment
  const handlePaymentComplete = () => {
    onSubmit(selectedServices);
    setShowQRModal(false);
    setShowSuccessModal(true);
  };

  return (
    <>
    <AnimatePresence>
      {isOpen && !showQRModal && (
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
            <div className="px-6 pt-6">
              <h2 className="text-2xl font-bold text-[#4A3B36] mb-2">Đăng ký dịch vụ</h2>
              <p className="text-[#4A3B36]">Nhấn vào ô dịch vụ bạn muốn sử dụng</p>
            </div>
            
            {/* Service options */}
            <div className="px-6 py-4 space-y-4">
              {services.map(service => {
                const isSelected = selectedServices.some(item => item.id === service.id);
                const selectedItem = selectedServices.find(item => item.id === service.id);
                
                return (
                  <div key={service.id}>
                    <div 
                      className={`rounded-md p-4 flex items-center bg-gray-100`}
                    >
                      <input 
                        type="checkbox" 
                        id={service.id}
                        checked={isSelected}
                        onChange={() => toggleService(service.id)}
                        className={`w-5 h-5 ${isSelected ? "text-[#CE6F70]" : "text-gray-400"} border-gray-300 rounded focus:ring-[#CE6F70]`}
                      />
                      <div className="ml-3 flex-1">
                        <label htmlFor={service.id} className="text-[#4A3B36] font-[500] cursor-pointer">
                          {service.name}
                        </label>
                      </div>
                      <button 
                        type="button" 
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label="Information"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Additional input fields when service is selected */}
                    {isSelected && (
                      <div className="mt-2">
                        {service.inputType === "time" && (
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col items-start text-sm text-gray-500 mb-2">
                              <span className="text-[18px] text-[#4A3B36] font-[800]">Thời gian</span>
                              <span className="text-[#4A3B36]">(Đơn giá {service.price.toLocaleString()} VND{service.priceUnit || "/1 tháng"})</span>
                            </div>
                            <div className="flex items-center">
                              <input 
                                type="number" 
                                value={selectedItem?.value || 1}
                                onChange={(e) => updateServiceValue(service.id, parseInt(e.target.value) || 1)}
                                min="1"
                                placeholder={service.inputPlaceholder || "Nhập số lượng"}
                                className="px-4 py-2 text-[#4A3B36] bg-white border border-gray-300 rounded-md w-40 focus:outline-none focus:ring-2 focus:ring-[#CE6F70] focus:border-transparent"
                              />
                              <span className="ml-2 text-[#4A3B36]">(tháng)</span>
                            </div>
                          </div>
                        )}
                        
                        {service.inputType === "quantity" && (
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col items-start text-sm text-gray-500 mb-2">
                              <span className="text-[18px] text-[#4A3B36] font-[800]">Số lượng ảnh</span>
                              <span className="text-[#4A3B36]">(Đơn giá {service.price.toLocaleString()} VND{service.priceUnit || "/1 ảnh"})</span>
                            </div>
                            <div className="flex items-center">
                              <input 
                                type="number" 
                                value={selectedItem?.value || 1}
                                onChange={(e) => updateServiceValue(service.id, parseInt(e.target.value) || 1)}
                                min="1"
                                placeholder={service.inputPlaceholder || "Nhập số lượng"}
                                className="px-4 py-2 text-[#4A3B36] bg-white border border-gray-300 rounded-md w-40 focus:outline-none focus:ring-2 focus:ring-[#CE6F70] focus:border-transparent"
                              />
                              <span className="ml-2 text-[#4A3B36]">(ảnh)</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Total section */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-[18px] font-bold text-[#4A3B36]">Tổng tiền</span>
                <span className="text-[18px] font-bold text-[#4A3B36]">
                  {totalPrice > 0 ? `${totalPrice.toLocaleString()} (VND)` : "0 (VND)"}
                </span>
              </div>
            </div>
            
            {/* Submit button */}
            <div className="px-6 pb-6">
              <button
                onClick={handleSubmit}
                className="w-full bg-[#CE6F70] text-white py-3 rounded-md hover:bg-[#B85F60] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CE6F70]"
                disabled={selectedServices.length === 0}
              >
                Thanh toán ngay
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    
    {/* QR Payment Modal */}
    <QRPaymentModal 
      isOpen={showQRModal}
      onClose={() => setShowQRModal(false)}
      amount={totalPrice}
      code={""}
      onPaymentConfirmed={handlePaymentComplete}
    />
    <PaymentSuccessModal
      isOpen={showSuccessModal}
      onClose={() => setShowSuccessModal(false)}
    />
    </>
  );
}
