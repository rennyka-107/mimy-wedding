"use client";
import Image from "next/image";
import BaseInput from "../input/base";
import BaseInputArea from "../input/area";
import BaseButton from "../buttons/base";
import ArrowBendUpRight from "../icons/arrow_bend_up_right";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Contact() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 0.8,
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
            className="w-full py-[64px]"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {/* <motion.div variants={itemVariants}>
                <Image src="/images/de-lai-loi-nhan.png" alt="FAQ Icon" width={100} height={100} />
            </motion.div> */}
            <motion.label 
                variants={itemVariants}
                className=""
            >
                <span className="text-[#383637] flex w-full justify-center font-montserrat-alter font-[700] text-[40px] sm:text-[44px] lg:text-[46px] leading-[100%]">lời nhắn của bạn </span>
                <span className="font-montserrat flex justify-center items-center gap-2 text-[18px] text-[#898A85] mt-5">Nếu bạn cần hỗ trợ thêm, hãy điền biểu mẫu liên hệ phía dưới để được giải đáp nhanh nhất.</span>
            </motion.label>
            <motion.div 
                variants={itemVariants} 
                className="mt-[40px] flex w-full gap-[2%]"
            >
                <motion.div 
                    className="w-[49%]"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
                    <BaseInput
                        label="Tên của bạn"
                        placeholder="Nhập tên của bạn ..."
                        type="text"
                        value=""
                        onChange={() => { }}
                        onBlur={() => { }}
                        onFocus={() => { }}
                        error=""
                        disabled={false}
                        readOnly={false}
                        required={true}
                        name="name"
                        id="name"
                    />
                </motion.div>
                <motion.div 
                    className="w-[49%]"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
                    <BaseInput
                        label="Email/Zalo"
                        placeholder="Email hoặc Zalo liên hệ..."
                        type="email"
                        value=""
                        onChange={() => { }}
                        onBlur={() => { }}
                        onFocus={() => { }}
                        error=""
                        disabled={false}
                        readOnly={false}
                        required={true}
                        name="email"
                        id="email"
                    />
                </motion.div>
            </motion.div>
            <motion.div 
                className="mt-[16px]" 
                variants={itemVariants}
                whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
                <BaseInputArea
                    label="Lời nhắn của bạn"
                    placeholder="Nhập lời nhắn của bạn ..."
                    value=""
                    onChange={() => { }}
                    onBlur={() => { }}
                    onFocus={() => { }}
                    error=""
                    disabled={false}
                    readOnly={false}
                    required={true}
                    name="content"
                    id="content"
                />
            </motion.div>
            <motion.div 
                className="mt-[16px] w-full flex items-center justify-end"
                variants={itemVariants}
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    <BaseButton title="Gửi lời nhắn" suffixIcon={<ArrowBendUpRight />} />
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

