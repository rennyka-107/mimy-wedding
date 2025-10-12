"use client";
import Image from "next/image";
import BaseInput from "../input/base";
import BaseButton from "../buttons/base";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

export default function Profile() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    
    // Get user data from auth context
    const { user } = useAuth();
    
    // Form state
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone: ""
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    
    // Fetch user profile data from API
    const fetchUserProfile = async () => {
        if (!user) return;
        
        try {
            const response = await fetch('/api/users/profile');
            if (response.ok) {
                const data = await response.json();
                if (data.success && data.user) {
                    setFormData({
                        email: data.user.email || "",
                        name: data.user.name || "",
                        phone: data.user.phone || ""
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    // Update form data when user changes and fetch additional info
    useEffect(() => {
        if (user) {
            // First set data from auth context
            setFormData({
                email: user.email || "",
                name: user.name || "",
                phone: ""
            });
            
            // Then fetch complete data from API
            fetchUserProfile();
        }
    }, [user]);
    
    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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
            
            // Cập nhật form với thông tin mới
            if (data.success && data.user) {
                setFormData({
                    ...formData,
                    name: data.user.name,
                    phone: data.user.phone || ""
                });
            }
            
            toast.success("Cập nhật thông tin thành công!");
            setIsEditing(false);
            setSaveMessage("Lưu thành công!");
            setTimeout(() => setSaveMessage(""), 3000);
            
            // Gọi lại fetchUserProfile để cập nhật form
            fetchUserProfile();
        } catch (error) {
            toast.error(JSON.stringify(error) || "Có lỗi xảy ra, vui lòng thử lại");
            console.error("Lỗi cập nhật thông tin:", error);
        } finally {
            setIsLoading(false);
        }
    };

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
            className="w-full py-[32px] sm:py-[48px] lg:py-[64px] px-4 sm:px-6 lg:px-0"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <motion.div variants={itemVariants}>
                <Image src="/images/de-lai-loi-nhan.png" alt="Profile Icon" width={100} height={100} />
            </motion.div>
            <motion.label
                variants={itemVariants}
                className="font-viaoda text-[32px] sm:text-[48px] lg:text-[64px] text-[#fd8c06] font-normal leading-[100%] block"
            >
                Thông tin cá nhân
            </motion.label>
            <motion.div
                variants={itemVariants}
                className="mt-[24px] sm:mt-[32px] lg:mt-[40px] flex flex-col lg:flex-row w-full gap-4 lg:gap-[2%]"
            >
                <motion.div
                    className="w-full lg:w-[49%]"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
                    <BaseInput
                        label="Email"
                        placeholder="Nhập email ..."
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
                </motion.div>
                <motion.div
                    className="w-full lg:w-[49%]"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
                    <BaseInput
                        label="Họ và tên"
                        placeholder="Nhập tên của bạn ..."
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
                </motion.div>
            </motion.div>
            <motion.div
                variants={itemVariants}
                className="mt-4 lg:mt-[16px] flex flex-col lg:flex-row w-full gap-4 lg:gap-[2%]"
            >
                <motion.div
                    className="w-full lg:w-[49%]"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
                    <BaseInput
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại ..."
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
                </motion.div>
                <motion.div className="hidden lg:block lg:w-[49%]"></motion.div>
            </motion.div>
            <motion.div
                className="mt-6 lg:mt-[16px] w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                variants={itemVariants}
            >
                <div className="flex flex-col gap-2">
                    {saveMessage && (
                        <span className="text-green-500 text-sm sm:text-base">{saveMessage}</span>
                    )}
                    {!user && (
                        <span className="text-orange-500 text-sm sm:text-base">Vui lòng đăng nhập để chỉnh sửa thông tin</span>
                    )}
                </div>
                <motion.div
                    whileHover={{ scale: user && !isLoading ? 1.05 : 1 }}
                    whileTap={{ scale: user && !isLoading ? 0.98 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="w-full sm:w-auto"
                >
                    <BaseButton 
                        title={isLoading ? "Đang cập nhật..." : "Lưu thay đổi"} 
                        onClick={handleSave} 
                        disabled={!user || isLoading || !isEditing}
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}