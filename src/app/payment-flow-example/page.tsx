"use client";
import { useState } from "react";
import ServiceRegistrationModal, { ServiceOption } from "@/components/popup/ServiceRegistrationModal";

// Sample services data
const availableServices: ServiceOption[] = [
  {
    id: "template_customization",
    name: "Thay đổi bố cục template",
    price: 15000,
    priceUnit: "/1 tháng",
    inputType: "time",
    inputPlaceholder: "Nhập số lượng"
  },
  {
    id: "additional_images",
    name: "Thêm số lượng ảnh",
    price: 1000,
    priceUnit: "/1 ảnh",
    inputType: "quantity",
    inputPlaceholder: "Nhập số lượng"
  }
];

export default function PaymentFlowExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<{id: string, value: number}[]>([]);
  
  const handleSubmit = (services: {id: string, value: number}[]) => {
    setSelectedServices(services);
    console.log("Payment completed for services:", services);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Complete Payment Flow Example</h1>
      <p className="text-gray-600">
        This example demonstrates the full payment flow with all modals:
      </p>
      <ol className="list-decimal pl-6 space-y-2">
        <li>Service Registration Modal - Select services to purchase</li>
        <li>QR Code Payment Modal - Scan QR code to pay</li>
        <li>Payment Success Modal - Confirmation of successful payment</li>
      </ol>
      
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-[#CE6F70] text-white rounded-md w-fit mt-4"
      >
        Đăng ký dịch vụ
      </button>
      
      <ServiceRegistrationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        services={availableServices}
      />
    </div>
  );
}
