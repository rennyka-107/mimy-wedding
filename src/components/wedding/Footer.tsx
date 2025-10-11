"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePathname } from "next/navigation";


export default function Footer() {
    const pathname = usePathname();
    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: true, amount: 0.3 });
    
    if (pathname.includes("invitations")) return null;
    
    // Animation variants
    const footerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.5
            }
        }
    };
    
    const linkVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1 * i,
                duration: 0.4
            }
        }),
        hover: {
            scale: 1.05,
            transition: { duration: 0.2 }
        }
    };
    
    return (
        <motion.div 
            ref={footerRef}
            variants={footerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full flex gap-[24px] items-center justify-center bg-[#CE6F70] py-[8px]"
        >
            <motion.div 
                className="text-white font-[500] text-[14px] cursor-pointer"
                variants={linkVariants}
                custom={1}
                whileHover="hover"
                onClick={() => {
                    window.open("/teams-of-service", "_blank");
                }}
            >
                Điều khoản dịch vụ
            </motion.div>
            <motion.div 
                className="text-white font-[500] text-[14px] cursor-pointer"
                variants={linkVariants}
                custom={2}
                whileHover="hover"
                onClick={() => {
                    window.open("/privacy-policy", "_blank");
                }}
            >
                Chính sách bảo mật
            </motion.div>
        </motion.div>
    )
}