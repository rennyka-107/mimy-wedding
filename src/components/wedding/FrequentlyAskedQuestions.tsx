"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
    {
        question: "Thiệp online là gì?",
        answer: "Thiệp online là phiên bản thiệp điện tử, giúp bạn gửi lời mời đến bạn bè, người thân thông qua mạng xã hội hoặc tin nhắn, trong trường hợp không thể gặp trực tiếp.",
    },
    {
        question: "Tôi có thể tự thiết kế thiệp được không?",
        answer: "Có, bạn có thể tự thiết kế thiệp bằng cách chọn các mẫu thiệp có sẵn của chúng tôi và tùy chỉnh nội dung, màu sắc, hình ảnh, để tạo ra một tấm thiệp của riêng bạn.",
    },
    {
        question: "Thiệp cưới có thời hạn bao lâu?",
        answer: "Mỗi thiệp cưới sẽ được lưu giữ trong vòng 03 tháng kể từ khi xuất bản. Bạn vẫn có thể xuất bản lại khi thiệp đã hết hạn, và thời hạn của thiệp sẽ được tính theo lần xuất bản tiếp theo.",
    },
    {
        question: "Tôi có thể chia sẻ thiệp như thế nào?",
        answer: "Rất đơn giản, bạn chỉ cần gửi đường link thiệp qua Zalo, Messenger, Email hoặc đăng trên mạng xã hội để mọi người dễ dàng xem.",
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
            className="w-full py-[96px] lg:px-40 md:px-20 sm:px-10"
        >
            {/* <Image src="/images/cau-hoi-thuong-gap.png" alt="FAQ Icon" width={100} height={100} /> */}
            <motion.label 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-[#383637] flex w-full justify-center pt-24 font-montserrat-alter font-[700] text-[40px] sm:text-[44px] lg:text-[46px] leading-[100%]"
            >
                câu hỏi thường gặp.
            </motion.label>
            
            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="font-montserrat flex justify-center items-center gap-2 lg:text-[18px] md:text-[16px] sm:text-[14px] text-[#898A85] mt-5"
            >
                Bạn cũng có thể liên hệ với chúng tôi thông qua biểu mẫu bên dưới.
            </motion.p>
            
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                viewport={{ once: true }}
                className="mt-[40px] flex flex-col w-full gap-[16px] "
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
            className={` font-montserrat w-full rounded-[16px] overflow-hidden transition-colors duration-300 ${isOpen ? "shadow-sm border border-[#FD8C06] bg-[#FFF8E6]" : "bg-[#F9F9F9] hover:bg-[#F9F9F9]"}`}
        >
            <motion.div
                className="flex justify-between items-center px-6 pt-6 pb-3 cursor-pointer"
                onClick={onClick}
                whileHover={{ x: isOpen ? 0 : 5 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <div className="flex items-center gap-[16px]">
                    <motion.div  className="bg-white lg:p-2 p-1 rounded-[50px]"
                        animate={{ rotate: isOpen ? 180 : 0 }} 
                        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                    >
                        <ChevronDown />
                    </motion.div>
                    <h3 className="font-bold text-[#383637] lg:text-[16px] sm:text-[14px] text-[14px]">{question}</h3>
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
                                className="text-[#383637] font-600 lg:text-[16px] sm:text-[14px] text-[14px]"
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
        <svg className="lg:w-6 lg:h-6 w-5 h-5" width="0" height="0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="#FD8C06" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function ChevronUp() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 15L12 9L6 15" stroke="#383637" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}