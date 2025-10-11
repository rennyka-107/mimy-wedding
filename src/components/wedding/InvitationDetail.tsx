"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Service {
  id: number;
  name: string;
  price: number;
  startDate: string;
  endDate: string;
}

export default function InvitationDetail() {
  const params = useParams<{ id: string }>();
  const invitationId = params.id;
  console.log(invitationId, "wtfd");
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Sample data for the invitation detail
  const invitationData = {
    id: "INV-2025-000123",
    createdDate: "12/03/2025",
    paymentMethod: "Chuyển khoản",
    paymentStatus: "Đã thanh toán",
    customer: {
      name: "Nguyễn Văn A",
      email: "12/03/2025", // This seems like a mistake in the screenshot, but I'm following the image
      phone: "Đã thanh toán" // This also seems like a mistake in the screenshot
    },
    services: [
      {
        id: 1,
        name: 'Mẫu Thiệp hồng "Sakura"',
        price: 150000,
        startDate: "18/08/2024",
        endDate: "20/08/2024"
      },
      {
        id: 2,
        name: "Sửa nội dung template",
        price: 0,
        startDate: "-",
        endDate: "-"
      },
      {
        id: 3,
        name: "Sửa hình ảnh template",
        price: 0,
        startDate: "-",
        endDate: "-"
      }
    ],
    totalAmount: 150000,
    discount: 0,
    finalAmount: 150000
  };

  return (
    <motion.div
      className="w-full py-[40px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="w-full flex items-start justify-between mb-6" variants={itemVariants}>
        <div className="w-full flex flex-col">
          <Image
            src="/images/de-lai-loi-nhan.png"
            alt="Flower decoration"
            width={100}
            height={100}
            className="mr-4"
          />
          <div className="w-full flex items-center justify-between">
            <h1 className="font-viaoda mt-[12px] text-[64px] text-[#CE6F70] font-normal leading-[100%]">
              Chi tiết thiệp cưới
            </h1>
            <Link href="/invitations">
              <button className="flex items-center px-4 py-2 border border-[#CE6F70] rounded-md text-[#CE6F70] hover:bg-[#FAE7E7] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Quay lại
              </button>
            </Link>
          </div>
        </div>

      </motion.div>

      {/* Invoice Information */}
      <motion.div className="mb-8" variants={itemVariants}>
        <h2 className="text-[#CE6F70] text-[24px] font-[600] mb-4">Thông tin hóa đơn</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-[#4A3B36] font-[600] text-[18px] mb-2">Mã hóa đơn</p>
            <input type="text" value={invitationData.id} className="w-full text-[#4A3B36] font-[500] text-[18px] border border-gray-300 rounded-md p-3 bg-white" />
          </div>
          <div>
            <p className="text-[#4A3B36] font-[600] text-[18px] mb-2">Ngày tạo</p>
            <input type="date" value={invitationData.createdDate} className="w-full text-[#4A3B36] font-[500] text-[18px] border border-gray-300 rounded-md p-3 bg-white" />
          </div>
          <div>
            <p className="text-[#4A3B36] font-[600] text-[18px] mb-2">Phương thức thanh toán</p>
            <input type="text" value={invitationData.paymentMethod} className="w-full text-[#4A3B36] font-[500] text-[18px] border border-gray-300 rounded-md p-3 bg-white" />
          </div>
          <div>
            <p className="text-[#4A3B36] font-[600] text-[18px] mb-2">Trạng thái thanh toán</p>
            <input type="text" value={invitationData.paymentStatus} className="w-full text-[#4A3B36] font-[500] text-[18px] border border-gray-300 rounded-md p-3 bg-white" />
          </div>
        </div>
      </motion.div>

      {/* Customer Information */}
      <motion.div className="mb-8" variants={itemVariants}>
        <h2 className="text-[#CE6F70] text-[24px] font-[600] mb-4">Thông tin khách hàng</h2>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-[#4A3B36] font-[600] text-[18px] mb-2">Tên khách hàng</p>
            <input type="text" value={invitationData.customer.name} className="w-full text-[#4A3B36] font-[500] text-[18px] border border-gray-300 rounded-md p-3 bg-white" />
          </div>
          <div>
            <p className="text-[#4A3B36] font-[600] text-[18px] mb-2">Email</p>
            <input type="text" value={invitationData.customer.email} className="w-full text-[#4A3B36] font-[500] text-[18px] border border-gray-300 rounded-md p-3 bg-white" />
          </div>
          <div>
            <p className="text-[#4A3B36] font-[600] text-[18px] mb-2">Số điện thoại</p>
            <input type="text" value={invitationData.customer.phone} className="w-full text-[#4A3B36] font-[500] text-[18px] border border-gray-300 rounded-md p-3 bg-white" />
          </div>
        </div>
      </motion.div>

      {/* Services */}
      <motion.div className="mt-6" variants={itemVariants}>
        <h2 className="text-xl font-medium text-[#CE6F70]">Dịch vụ đăng ký</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border border-[#E9EAEB]">
            <thead>
              <tr className="border-b border-[#E9EAEB]">
                <th className="px-[20px] py-[10px] text-left font-[600] text-[#4A3B36]">Tên dịch vụ</th>
                <th className="px-[20px] py-[10px] text-right font-[600] text-[#4A3B36]">Đơn giá (VNĐ)</th>
                <th className="px-[20px] py-[10px] text-center font-[600] text-[#4A3B36]">Ngày bắt đầu</th>
                <th className="px-[20px] py-[10px] text-center font-[600] text-[#4A3B36]">Ngày hết hạn</th>
              </tr>
            </thead>
            <tbody>
              {invitationData.services.map((service, index) => (
                <tr key={index} className="px-[20px] py-[10px] text-left cursor-pointer text-[#CE6F70] font-[600]">
                  <td className="px-[20px] py-[10px] text-left text-[#4A3B36] font-[600]">{service.name}</td>
                  <td className="px-[20px] py-[10px] text-right text-[#4A3B36] font-[600]">{service.price.toLocaleString()}</td>
                  <td className="px-[20px] py-[10px] text-center text-[#4A3B36] font-[600]">{service.startDate}</td>
                  <td className="px-[20px] py-[10px] text-center text-[#4A3B36] font-[600]">{service.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Payment Information */}
      <motion.div className="mt-[2rem]" variants={itemVariants}>
        <div className="flex justify-between items-center border-b border-[#E9EAEB]">
          <div>
            <h2 className="text-[#CE6F70] text-[24px] font-[600] mb-4">Thành tiền</h2>
            <p className="text-sm text-gray-500 mb-4">
              Đơn vị: VNĐ. Nếu có phương thức thanh toán sử dụng đơn vị khác, sẽ được ghi rõ bên cạnh.
            </p>
          </div>
          <div>
            <div className="flex justify-between py-2">
              <span className="text-[#4A3B36] font-[600] text-[18px]">{invitationData.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="w-full">
            <div className="flex justify-between py-2">
              <span className="text-[#4A3B36] font-[600] text-[18px]">Tổng tiền dịch vụ</span>
              <span className="text-[#4A3B36] font-[600] text-[18px]">{invitationData.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#4A3B36] font-[600] text-[18px]">Chiết khấu (%)</span>
              <span className="text-[#4A3B36] font-[600] text-[18px]">{invitationData.discount}</span>
            </div>
            
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
