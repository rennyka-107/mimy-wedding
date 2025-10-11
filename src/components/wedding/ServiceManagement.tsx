"use client";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BaseInput from "../input/base";
import BaseButton from "../buttons/base";
import BoldButton from "../buttons/bold";
import ServiceRegistrationModal, { ServiceOption } from "../popup/ServiceRegistrationModal";

interface Service {
  id: number;
  name: string;
  price: number;
  status: string;
  startDate: string;
  endDate: string;
}

const availableServices: ServiceOption[] = [
  {
    id: "template_customization",
    name: "Thay đổi bố cục template (15.000đ/Tháng)",
    price: 15000,
    priceUnit: "/1 tháng",
    inputType: "time",
    inputPlaceholder: "Nhập số lượng"
  },
  {
    id: "additional_images",
    name: "Thêm số lượng ảnh (1.000đ/Ảnh)",
    price: 1000,
    priceUnit: "/1 ảnh",
    inputType: "quantity",
    inputPlaceholder: "Nhập số lượng"
  },
  {
    id: "delete_default_header_footer",
    name: "Nâng cấp thiệp cưới – loại bỏ logo web (30.000/Tháng)",
    price: 1000,
    // priceUnit: "/1 ảnh",
    // inputType: "quantity",
    // inputPlaceholder: "Nhập số lượng"
  }
];

export default function ServiceManagement() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<{id: string, value: number}[]>([]);
  const handleSubmit = (services: {id: string, value: number}[]) => {
      setSelectedServices(services);
      console.log("Payment completed for services:", services);
    };
  // Dummy data for services
  const services: Service[] = [
    {
      id: 1,
      name: 'Sửa nội dung template',
      price: 0,
      status: 'Đã thanh toán',
      startDate: '[ngày đăng ký tk]',
      endDate: 'Vô thời hạn',
    },
    {
      id: 2,
      name: 'Sửa hình ảnh template',
      price: 0,
      status: 'Đã thanh toán',
      startDate: '[ngày đăng ký tk]',
      endDate: 'Vô thời hạn',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      ref={sectionRef}
      className="w-full py-[40px]"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div variants={itemVariants}>
        <h1 className="font-viaoda text-[64px] text-[#CE6F70] font-normal leading-[100%]">
          Dịch vụ của bạn
        </h1>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6 flex justify-between items-center gap-4">
        <div className="w-1/2">
          <BaseInput
            label=""
            placeholder="Tìm kiếm theo tên dịch vụ"
            type="text"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            onBlur={() => { }}
            onFocus={() => { }}
            error=""
            disabled={false}
            readOnly={false}
            required={false}
            name="search"
            id="search"
          />
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <BoldButton onClick={() => setIsModalOpen(true)} title="Thêm dịch vụ" />
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8 flex justify-between items-center">
        <h2 className="text-xl font-medium text-[#CE6F70]">Dịch vụ đã đăng ký</h2>


      </motion.div>

      <motion.div variants={itemVariants} className="mt-4">
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border border-[#E9EAEB]">
            <thead>
              <tr className="border-b border-[#E9EAEB]">
                <th className="px-[20px] py-[10px] text-left font-[600] text-[#4A3B36]">Tên dịch vụ</th>
                <th className="px-[20px] py-[10px] text-right font-[600] text-[#4A3B36]">Tổng tiền (VNĐ)</th>
                <th className="px-[20px] py-[10px] text-center font-[600] text-[#4A3B36]">Trạng thái</th>
                <th className="px-[20px] py-[10px] text-center font-[600] text-[#4A3B36]">Ngày hiệu lực</th>
                <th className="px-[20px] py-[10px] text-center font-[600] text-[#4A3B36]">Ngày hết hạn</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b border-[#E9EAEB] hover:bg-gray-50">
                  <td className="px-[20px] py-[10px] text-left cursor-pointer text-[#CE6F70] font-[600]">{service.name}</td>
                  <td className="px-[20px] py-[10px] text-right text-[#4A3B36] font-[600]">{service.price}</td>
                  <td className="px-[20px] py-[10px] text-center">
                    <span className="px-2 py-1 bg-[#FADCDC] text-[#CE6F70] font-[600] rounded-md text-sm">
                      {service.status}
                    </span>
                  </td>
                  <td className="px-[20px] py-[10px] text-center text-[#4A3B36] font-[600]">{service.startDate}</td>
                  <td className="px-[20px] py-[10px] text-center text-[#4A3B36] font-[600]">{service.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      <ServiceRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        services={availableServices}
      />
    </motion.div>
  );
}
