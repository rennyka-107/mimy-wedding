"use client";
import BaseButton from "../buttons/base";
import ArrowBendUpRight from "../icons/arrow_bend_up_right";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Banner() {
    const { openLoginModal, openRegisterModal, user, logout } = useAuth();
    const bannerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: bannerRef,
        offset: ["start start", "end start"]
    });
    
    // Parallax effect transformations
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]); // Slower movement
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]); // Medium movement
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]); // Faster movement
    
    return (
        <div 
            ref={bannerRef}
            className="mimy-banner w-full flex flex-col items-center lg:items-end justify-center px-4 sm:px-6 lg:pr-[200px] py-[150px] sm:py-[200px] lg:py-[300px] relative overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ y: y1 }}
                transition={{ duration: 0.7 }}
                className="text-stroke-pink font-viaoda text-[40px] sm:text-[60px] lg:text-[90px] font-normal leading-[100%] z-10 text-center lg:text-right"
            >
                Thiệp cưới online
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ y: y2 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-stroke-light-pink font-viaoda text-[40px] sm:text-[60px] lg:text-[90px] font-normal leading-[100%] z-10 text-center lg:text-right"
            >
                lưu giữ yêu thương
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ y: y3 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-[24px] max-w-[658px] text-center lg:text-right text-[#77716F] leading-[100%] font-primary font-[500] text-[14px] sm:text-[16px] lg:text-[18px] z-10 px-4 lg:px-0"
            >
                Mỗi tấm thiệp không chỉ là lời mời, mà còn là dấu ấn ghi lại khoảnh khắc hạnh phúc của hai bạn. Cùng chúng mình viết lên câu chuyện của riêng bạn
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-[24px] text-[#77716F] flex flex-col sm:flex-row items-center gap-[12px] sm:gap-[24px]"
            >
                {user ? (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <BaseButton title="Đăng nhập" suffixIcon={<ArrowBendUpRight />} onClick={openLoginModal} />  
                    </motion.div>
                ) : (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <BaseButton title="Đăng nhập" suffixIcon={<ArrowBendUpRight />} onClick={openLoginModal} />
                    </motion.div>
                )}
                {/* hoặc
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <BaseButton title="Đăng ký" onClick={openRegisterModal} />
                </motion.div> */}
            </motion.div>
            {/* Decorative elements for parallax effect */}
            <motion.div 
                className="absolute top-[15%] left-[10%] w-[150px] h-[150px] rounded-full bg-pink-100 opacity-30 blur-xl"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
            />
            <motion.div 
                className="absolute bottom-[20%] left-[25%] w-[100px] h-[100px] rounded-full bg-pink-200 opacity-20 blur-md"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -120]) }}
            />
            <motion.div 
                className="absolute top-[40%] right-[15%] w-[80px] h-[80px] rounded-full bg-pink-100 opacity-20 blur-lg"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -60]) }}
            />
        </div>
    )
}