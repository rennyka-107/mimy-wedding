"use client";
import Image from "next/image";
import BaseInput from "../input/base";
import BaseInputArea from "../input/area";
import BaseButton from "../buttons/base";
import ArrowBendUpRight from "../icons/arrow_bend_up_right";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Button from "../ui/Button";

export default function Contact() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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
            className="w-full py-[64px] px-5 xl:px-60 lg:px-24 md:px-20 sm:px-10 "
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
                <span className="text-[#383637] flex w-full justify-center font-montserrat-alter font-[700] text-[36px] sm:text-[44px] lg:text-[46px] leading-[100%]">lời nhắn của bạn. </span>
                <span className="font-montserrat text-center flex justify-center items-center gap-2 lg:text-[18px] md:text-[16px] sm:text-[14px] text-[14px] text-[#898A85] mt-5 px-8">Nếu bạn cần hỗ trợ thêm, hãy điền biểu mẫu liên hệ phía dưới để được giải đáp nhanh nhất.</span>
            </motion.label>
            <div
                // variants={itemVariants}
                className="mt-[40px] w-full"
            >
                <div
                    className="w-full "
                    // variants={itemVariants}
                    // whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
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
                </div>
                <div
                    className="w-full"
                    // variants={itemVariants}
                    // whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
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
                </div>
            </div>
            <div
                className="mt-[16px]"
                // variants={itemVariants}
                // whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
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
            </div>
            <div
                className="mt-[16px]"
                // variants={itemVariants}
                // whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
                <span className="text-[#383637] font-montserrat text-[14px] md:text-[16px] font-[600]">Dịch vụ bạn quan tâm</span>
                <div className="flex items-center pt-4 pb-2.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.895431 15.1046 0 14 0H2ZM12.0303 4.96967C12.3196 5.25897 12.3232 5.72582 12.041 6.01947L8.04876 11.0097C8.043 11.0169 8.03685 11.0238 8.03032 11.0303C7.73743 11.3232 7.26256 11.3232 6.96966 11.0303L4.32322 8.38388C4.03032 8.09099 4.03032 7.61612 4.32322 7.32322C4.61611 7.03033 5.09098 7.03033 5.38388 7.32322L7.4774 9.41674L10.9498 4.9921C10.9559 4.98424 10.9626 4.97674 10.9697 4.96967C11.2626 4.67678 11.7374 4.67678 12.0303 4.96967Z" fill="#FD8C06" />
                    </svg>
                    <span className="text-[#383637] font-montserrat text-[14px] md:text-[16px] font-[500] pl-4">Tôi có thắc mắc cần được giải đáp</span>
                </div>
                <div className="flex items-center py-2.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#FD8C06" />
                    </svg>
                    <span className="text-[#383637] font-montserrat text-[14px] md:text-[16px] font-[500] pl-4">Tôi muốn thiết kế thiệp riêng cho mình</span>
                </div>
                <div className="flex items-center py-2.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#FD8C06" />
                    </svg>
                    <span className="text-[#383637] font-montserrat text-[14px] md:text-[16px] font-[500] pl-4">Tôi muốn thuê dịch vụ thiết kế landingpage</span>
                </div>
                <div className="flex items-center py-2.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#FD8C06" />
                    </svg>
                    <span className="text-[#383637] font-montserrat text-[14px] md:text-[16px] font-[500] pl-4">Tôi muốn thuê dịch vụ phát triển website</span>
                </div>
            </div>
            <div
                className="mt-[16px] w-full flex items-center justify-end"
                // variants={itemVariants}
            >
                <div
                    // whileHover={{ scale: 1.05 }}
                    // whileTap={{ scale: 0.98 }}
                    // transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="flex justify-end w-full"
                >
                    <Button className="w-full lg:w-" variant="primary">
                        <span className="font-[600] text-[14px] md:text-[16px] pr-2 w-full">Gửi lời nhắn</span>
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

