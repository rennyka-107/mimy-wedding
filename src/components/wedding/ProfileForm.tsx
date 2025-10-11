"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import BaseInput from "../input/base";
import BaseInputArea from "../input/area";
import BaseButton from "../buttons/base";
import { motion } from "framer-motion";

export default function ProfileForm() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsEditing(true);
  };

  // Handle save changes
  const handleSave = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để cập nhật thông tin");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Cập nhật thất bại");
      }

      const data = await response.json();
      
      toast.success("Cập nhật thông tin thành công!");
      setIsEditing(false);
    } catch (error) {
      toast.error(JSON.stringify(error) || "Có lỗi xảy ra, vui lòng thử lại");
      console.error("Lỗi cập nhật thông tin:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông tin cá nhân</h2>
      
      <div className="mb-6">
        <BaseInput
          label="Email"
          placeholder="Email của bạn"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => {}}
          onFocus={() => {}}
          error=""
          disabled={true}
          readOnly={true}
          required={true}
          name="email"
          id="email"
        />
        <p className="text-sm text-gray-500 mt-1">Email không thể thay đổi</p>
      </div>
      
      <div className="mb-6">
        <BaseInput
          label="Họ và tên"
          placeholder="Nhập họ và tên của bạn"
          type="text"
          value={formData.name}
          onChange={handleChange}
          onBlur={() => {}}
          onFocus={() => {}}
          error=""
          disabled={!user}
          readOnly={false}
          required={true}
          name="name"
          id="name"
        />
      </div>
      
      <div className="mb-6">
        <BaseInput
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          type="text"
          value={formData.phone}
          onChange={handleChange}
          onBlur={() => {}}
          onFocus={() => {}}
          error=""
          disabled={!user}
          readOnly={false}
          required={false}
          name="phone"
          id="phone"
        />
      </div>
      
      
      <div className="flex justify-end mt-8">
        <motion.div
          whileHover={{ scale: user && !isLoading ? 1.03 : 1 }}
          whileTap={{ scale: user && !isLoading ? 0.97 : 1 }}
        >
          <BaseButton
            title={isLoading ? "Đang cập nhật..." : "Cập nhật thông tin"}
            onClick={handleSave}
            disabled={!user || isLoading || !isEditing}
          />
        </motion.div>
      </div>
      
      {!user && (
        <div className="text-center mt-4">
          <p className="text-orange-500">Vui lòng đăng nhập để chỉnh sửa thông tin</p>
        </div>
      )}
    </div>
  );
}
