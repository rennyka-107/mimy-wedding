"use client";
import { useState } from "react";
import ServiceRegistrationModal from "@/components/popup/ServiceRegistrationModal";

// Import the ServiceOption type
import type { ServiceOption } from "@/components/popup/ServiceRegistrationModal";

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
  },
  {
    id: "delete_default_header_footer",
    name: "Nâng cấp thiệp cưới – loại bỏ header/footer mặc định",
    price: 1000,
    priceUnit: "/1 ảnh",
    inputType: "quantity",
    inputPlaceholder: "Nhập số lượng"
  }
];

export default function ServiceRegistrationExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<{id: string, value: number}[]>([]);
  
  const handleSubmit = (services: {id: string, value: number}[]) => {
    setSelectedServices(services);
    console.log("Selected services:", services);
    // In a real app, you would process the payment and register the services
    
    // Show summary of selected services
    if (services.length > 0) {
      const summary = services.map(selected => {
        const service = availableServices.find(s => s.id === selected.id);
        return `${service?.name}: ${selected.value} ${service?.inputType === 'time' ? 'tháng' : 'ảnh'}`;
      }).join(', ');
      
      alert(`Đã đăng ký dịch vụ: ${summary}`);
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Service Registration Modal Example</h1>
      
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-[#CE6F70] text-white rounded-md w-fit"
      >
        Đăng ký dịch vụ
      </button>
      
      {selectedServices.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Dịch vụ đã chọn:</h2>
          <ul className="list-disc pl-5 mt-2">
            {selectedServices.map(selected => {
              const service = availableServices.find(s => s.id === selected.id);
              const totalPrice = (service?.price || 0) * selected.value;
              return (
                <li key={selected.id}>
                  {service?.name} - {selected.value} {service?.inputType === 'time' ? 'tháng' : 'ảnh'} 
                  - {totalPrice.toLocaleString()} VND
                </li>
              );
            })}
          </ul>
        </div>
      )}
      
      <ServiceRegistrationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        services={availableServices}
      />
    </div>
  );
}
