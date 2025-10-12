"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import MessageForm from "./MessageForm";

export default function CustomTemplate() {
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
            className="w-full py-[64px]"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <motion.div variants={itemVariants}>
                <Image src="/images/de-lai-loi-nhan.png" alt="FAQ Icon" width={100} height={100} />
            </motion.div>
            <motion.label
                variants={itemVariants}
                className="font-viaoda text-[64px] text-[#fd8c06] font-normal leading-[100%] block"
            >
                Tấm thiệp chỉ thuộc về bạn
            </motion.label>
            <motion.label
                variants={itemVariants}
                className="font-primary text-[20px] text-[#4A3B36] font-[600] block mt-[16px] leading-[200%]"
            >
                Bạn không muốn dùng mẫu có sẵn? Hãy để chúng tôi đồng hành cùng bạn tạo nên một tấm thiệp cưới độc nhất vô nhị, phản ánh đúng cá tính, câu chuyện tình yêu và phong cách riêng của hai bạn.
            </motion.label>
            <motion.label
                variants={itemVariants}
                className="font-primary text-[20px] text-[#fd8c06] font-[800] block mt-[16px]"
            >
                Với Gói Thiết Kế Riêng, bạn sẽ nhận được:
            </motion.label>
            <motion.ul
                variants={itemVariants}
                className="ml-[16px] mt-[16px] list-disc pl-[20px] mb-[16px] text-[#4A3B36] text-[20px] font-[600] leading-[200%]"
            >
                <motion.li
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
                    Thiết kế từ đầu dựa trên ý tưởng, màu sắc, chủ đề bạn mong muốn
                </motion.li>
                <motion.li
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                    className="mt-[16px]"
                >
                    Tư vấn trực tiếp cùng designer để phác thảo và chỉnh sửa đến khi hài lòng
                </motion.li>
                <motion.li
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                    className="mt-[16px]"
                >
                    Thiệp hoàn chỉnh (bản online) mang dấu ấn duy nhất của bạn
                </motion.li>
                <motion.li
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                    className="mt-[16px]"
                >
                    Đường dẫn tuỳ chỉnh theo mong muốn của bạn (không sử dụng tiền tố &quot;<span className="text-[#fd8c06]">mimywedding</span>&quot;).
                </motion.li>
                <motion.li
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                    className="mt-[16px]"
                >
                    Trọn vẹn các dịch vụ đi kèm giống như khi bạn chọn thiệp có sẵn trên web
                </motion.li>
            </motion.ul>
            <motion.label
                variants={itemVariants}
                className="font-primary text-[20px] text-[#4A3B36] font-[600] block mt-[16px] leading-[200%]"
            >
                Đây không chỉ là một tấm thiệp, mà là câu chuyện tình yêu của bạn được kể bằng hình ảnh và thiết kế. Hãy để chúng tôi biến ý tưởng của bạn thành hiện thực.
            </motion.label>
            <motion.div
                className="mt-[40px]" 
                variants={itemVariants}
            >
                <MessageForm />
            </motion.div>
        </motion.div>
    )
}

