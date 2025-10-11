"use client";
import BaseButton from "../buttons/base";
import ArrowBendUpRight from "../icons/arrow_bend_up_right";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import Button from "../ui/Button";

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
            className="w-full flex flex-col items-center lg:items-end justify-center relative">
            <svg className=" h-full w-[2000px] sm:h-[700px] sm:w-[2000px] lg:w-full lg:h-full  top-0" width="0" height="0" viewBox="0 0 2000 700" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2000 650C2000 677.614 1977.61 700 1950 700C1922.39 700 1900 677.614 1900 650C1900 677.614 1877.61 700 1850 700C1822.39 700 1800 677.614 1800 650C1800 677.614 1777.61 700 1750 700C1722.39 700 1700 677.614 1700 650C1700 677.614 1677.61 700 1650 700C1622.39 700 1600 677.614 1600 650C1600 677.614 1577.61 700 1550 700C1522.39 700 1500 677.614 1500 650C1500 677.614 1477.61 700 1450 700C1422.39 700 1400 677.614 1400 650C1400 677.614 1377.61 700 1350 700C1322.39 700 1300 677.614 1300 650C1300 677.614 1277.61 700 1250 700C1222.39 700 1200 677.614 1200 650C1200 677.614 1177.61 700 1150 700C1122.39 700 1100 677.614 1100 650C1100 677.614 1077.61 700 1050 700C1022.39 700 1000 677.614 1000 650C1000 677.614 977.614 700 950 700C922.386 700 900 677.614 900 650C900 677.614 877.614 700 850 700C822.386 700 800 677.614 800 650C800 677.614 777.614 700 750 700C722.386 700 700 677.614 700 650C700 677.614 677.614 700 650 700C622.386 700 600 677.614 600 650C600 677.614 577.614 700 550 700C522.386 700 500 677.614 500 650C500 677.614 477.614 700 450 700C422.386 700 400 677.614 400 650C400 677.614 377.614 700 350 700C322.386 700 300 677.614 300 650C300 677.614 277.614 700 250 700C222.386 700 200 677.614 200 650C200 677.614 177.614 700 150 700C122.386 700 100 677.614 100 650C100 677.614 77.6142 700 50 700C22.3858 700 0 677.614 0 650V0H2000V650Z" fill="#F9F9F9" />
            </svg>
            <img className="absolute top-0 left-1/2 -translate-x-1/2" src="./images/star-home.png" alt="star-home" />

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ y: y1 }}
                transition={{ duration: 0.7 }}
                className="absolute top-[320px] sm:top-[320px] lg:top-[320px] left-1/2 -translate-x-1/2 w-full"
            >
                <p className="text-[#383637] px-8 font-montserrat-alter font-[700] text-[40px] sm:text-[44px] lg:text-[48px]  leading-[100%] z-10 text-center w-full pb-2"
                > bởi vì mỗi tấm thiệp nói lên </p>
                <p className="text-[#FFBB53] px-8 font-montserrat-alter font-[700] text-[40px] sm:text-[44px] lg:text-[48px] leading-[100%] z-10 text-center w-full pb-4"
                > một câu chuyện riêng </p>
                <p className="text-[#898A85] px-10 font-montserrat-alter font-[400] text-[14px] sm:text-[16px] lg:text-[18px]  leading-[100%] z-10 text-center w-full pb-8 "
                > Cùng chúng mình tạo và gửi những tấm thiệp cá nhân cho mọi dịp — ngay lập tức, đẹp mắt và đầy tình yêu. </p>
                <div className="w-full flex justify-center">
                    <Button
                        variant="primary"
                        onClick={openLoginModal}
                    >
                        <span className="font-[600] text-[16px]">Tạo tấm thiệp của riêng bạn</span>
                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.75 12.75L15.5 9L11.75 5.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3.5 13.5V12C3.5 11.2044 3.81607 10.4413 4.37868 9.87868C4.94129 9.31607 5.70435 9 6.5 9H15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Button>
                </div>
            </motion.div>
            {/* <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ y: y1 }}
                transition={{ duration: 0.7 }}
                className="text-[#FFBB53] px-8 font-montserrat-alter font-[700] text-[40px] sm:text-[44px] lg:text-[48px] leading-[100%] z-10 text-center w-full absolute top-[400px] sm:top-[400px] lg:top-[375px]  left-1/2 -translate-x-1/2"
            >
                một câu chuyện riêng
            </motion.div> */}
            {/* <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ y: y1 }}
                transition={{ duration: 0.7 }}
                className="text-[#898A85] px-10 font-montserrat-alter font-[400] text-[14px] sm:text-[16px] lg:text-[16px]  leading-[100%] z-10 text-center w-full absolute top-[500px] sm:top-[450px] lg:top-[450px]  left-1/2 -translate-x-1/2"
            >
                Cùng chúng mình tạo và gửi những tấm thiệp cá nhân cho mọi dịp — ngay lập tức, đẹp mắt và đầy tình yêu.
            </motion.div> */}
            {/* <Button
                variant="primary"
                onClick={openLoginModal}
                className="absolute top-[500px] left-1/2 -translate-x-1/2"
            >
                <span className="mr-2 font-[600] text-[16px]">Tạo tấm thiệp của riêng bạn</span>
                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.75 12.75L15.5 9L11.75 5.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3.5 13.5V12C3.5 11.2044 3.81607 10.4413 4.37868 9.87868C4.94129 9.31607 5.70435 9 6.5 9H15.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </Button> */}
            {/* <motion.div 
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
                </motion.div>
            </motion.div> */}
            {/* Decorative elements for parallax effect */}
            {/* <motion.div 
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
            /> */}


        </div>
    )
}