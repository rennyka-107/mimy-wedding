"use client";
import React, { useState } from "react";
import BaseInput from "../input/base";
import BaseInputArea from "../input/area";
import BaseButton from "../buttons/base";
import ArrowBendUpRight from "../icons/arrow_bend_up_right";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function MessageForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    content: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    content: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Validate form
  const validate = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập tên của bạn";
      valid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email không hợp lệ";
        valid = false;
      }
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
      valid = false;
    }

    // Content validation
    if (!formData.content.trim()) {
      newErrors.content = "Vui lòng nhập lời nhắn";
      valid = false;
    } else if (formData.content.length < 10) {
      newErrors.content = "Lời nhắn quá ngắn (tối thiểu 10 ký tự)";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Vui lòng kiểm tra lại thông tin");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Lỗi khi gửi lời nhắn');
      }

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        content: ""
      });
      
      toast.success('Lời nhắn đã được gửi thành công!');
    } catch (error) {
      toast.error(JSON.stringify(error) || 'Có lỗi xảy ra, vui lòng thử lại');
      console.error('Error submitting message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex w-full gap-[1%] flex-wrap md:flex-nowrap">
        <div className="w-full md:w-[33%] mb-4 md:mb-0">
          <BaseInput
            label="Tên của bạn"
            placeholder="Nhập tên của bạn ..."
            type="text"
            value={formData.name}
            onChange={handleChange}
            onBlur={() => {}}
            onFocus={() => {}}
            error={errors.name}
            disabled={isSubmitting}
            readOnly={false}
            required={true}
            name="name"
            id="name"
          />
        </div>
        <div className="w-full md:w-[33%] mb-4 md:mb-0">
          <BaseInput
            label="Email"
            placeholder="Nhập email ..."
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => {}}
            onFocus={() => {}}
            error={errors.email}
            disabled={isSubmitting}
            readOnly={false}
            required={true}
            name="email"
            id="email"
          />
        </div>
        <div className="w-full md:w-[33%]">
          <BaseInput
            label="Zalo/Số điện thoại"
            placeholder="Nhập số điện thoại ..."
            type="text"
            value={formData.phone}
            onChange={handleChange}
            onBlur={() => {}}
            onFocus={() => {}}
            error={errors.phone}
            disabled={isSubmitting}
            readOnly={false}
            required={true}
            name="phone"
            id="phone"
          />
        </div>
      </div>
      <div className="mt-[16px]">
        <BaseInputArea
          label="Lời nhắn của bạn"
          placeholder="Nhập lời nhắn của bạn ..."
          value={formData.content}
          onChange={handleChange}
          onBlur={() => {}}
          onFocus={() => {}}
          error={errors.content}
          disabled={isSubmitting}
          readOnly={false}
          required={true}
          name="content"
          id="content"
        />
      </div>
      <div className="mt-[16px] w-full flex items-center justify-end">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <BaseButton 
            title={isSubmitting ? "Đang gửi..." : "Gửi lời nhắn"} 
            suffixIcon={!isSubmitting ? <ArrowBendUpRight /> : undefined}
            disabled={isSubmitting}
            onClick={() => {}} // Thêm onClick nhưng chỉ là dummy function vì đã có onSubmit ở form
          />
        </motion.div>
      </div>
    </form>
  );
}
