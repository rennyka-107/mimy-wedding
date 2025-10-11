"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
    {
        question: "Thiệp cưới online là gì?",
        answer: "Thiệp cưới online là phiên bản thiệp cưới điện tử, có thể chia sẻ nhanh qua link, QR code, mạng xã hội hoặc tin nhắn.",
    },
    {
        question: "Tôi có thể tự thiết kế thiệp được không?",
        answer: "Có, bạn có thể tự thiết kế thiệp bằng cách chọn các mẫu thiệp và tùy chỉnh nội dung, màu sắc, hình ảnh, video, âm nhạc, ảnh để tạo ra một trải nghiệm thú vị cho khách mời.",
    },
    {
        question: "Thiệp cưới online có miễn phí không?",
        answer: "Có. Bạn có thể sử dụng các mẫu miễn phí để tạo thiệp cơ bản, hoặc chọn gói nâng cấp để có thêm nhiều mẫu đẹp và tính năng đặc biệt hơn.",
    },
    {
        question: "Tôi có thể chia sẻ thiệp như thế nào?",
        answer: "Rất đơn giản, bạn chỉ cần gửi đường link thiệp qua Zalo, Messenger, email hoặc đăng trên mạng xã hội để mọi người dễ dàng xem.",
    },
    {
        question: "Nếu khách không quen công nghệ thì có xem được thiệp không?",
        answer: "Có. Khách chỉ cần mở đường link được gửi, không cần cài đặt hay đăng ký gì nên rất tiện lợi cho mọi đối tượng.",
    },
]

export default function FrequentlyAskedQuestions() {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // First question open by default

    const toggleQuestion = (index: number) => {
        if (openIndex === index) {
            setOpenIndex(null); // Close if already open
        } else {
            setOpenIndex(index); // Open the clicked question
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full py-[64px]"
        >
            <Image src="/images/cau-hoi-thuong-gap.png" alt="FAQ Icon" width={100} height={100} />
            <motion.label 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="font-viaoda text-[64px] text-[#CE6F70] font-normal leading-[100%]"
            >
                Câu hỏi thường gặp
            </motion.label>
            
            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-[16px] text-[#77716F] font-primary font-[500] text-[20px]"
            >
                Nếu bạn cần hỗ trợ thêm, <span className="cursor-pointer font-bold text-[#CE6F70] hover:underline transition-all duration-300">nhấn vào đây</span> để liên hệ với chúng tôi
            </motion.p>
            
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                viewport={{ once: true }}
                className="mt-[40px] flex flex-col w-full gap-[16px]"
            >
                {questions.map((q, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        viewport={{ once: true }}
                    >
                        <QuestionItem
                            question={q.question}
                            answer={q.answer}
                            isOpen={openIndex === index}
                            onClick={() => toggleQuestion(index)}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}

function QuestionItem({
    question,
    answer,
    isOpen,
    onClick
}: {
    question: string,
    answer: string,
    isOpen: boolean,
    onClick: () => void
}) {
    return (
        <div 
            className={`w-full rounded-[16px] overflow-hidden transition-colors duration-300 ${isOpen ? "shadow-sm border border-[#F0F2F3] bg-[#F9F9F9]" : "bg-white hover:bg-[#FAFAFA]"}`}
        >
            <motion.div
                className="flex justify-between items-center p-[24px] cursor-pointer"
                onClick={onClick}
                whileHover={{ x: isOpen ? 0 : 5 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <div className="flex items-center gap-[16px]">
                    <motion.div 
                        animate={{ rotate: isOpen ? 180 : 0 }} 
                        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                    >
                        <ChevronDown />
                    </motion.div>
                    <h3 className="text-[22px] font-bold text-[#4A3B36]">{question}</h3>
                </div>

            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-[24px] pb-[24px]">
                            <motion.p 
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="text-[#77716F] font-600 text-[20px]"
                            >
                                {answer}
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function ChevronDown() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="#4A3B36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function ChevronUp() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 15L12 9L6 15" stroke="#4A3B36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}