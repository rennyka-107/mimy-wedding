"use client";
import Image from "next/image";
import BaseInput from "../input/base";
import BaseInputArea from "../input/area";
import BaseButton from "../buttons/base";
import ArrowBendUpRight from "../icons/arrow_bend_up_right";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Button from "../ui/Button";
import toast from "react-hot-toast";

export default function Contact() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    const [message, setMessage] = useState<{
        name: string;
        email: string;
        content: string;
        services: {
            "Tôi có thắc mắc cần được giải đáp": boolean;
            "Tôi muốn thiết kế thiệp riêng cho mình": boolean;
            "Tôi muốn thuê dịch vụ thiết kế landingpage": boolean;
            "Tôi muốn thuê dịch vụ phát triển website": boolean;
        }
    }>({
        name: "",
        email: "",
        content: "",
        services: {
            "Tôi có thắc mắc cần được giải đáp": true,
            "Tôi muốn thiết kế thiệp riêng cho mình": false,
            "Tôi muốn thuê dịch vụ thiết kế landingpage": false,
            "Tôi muốn thuê dịch vụ phát triển website": false
        }
    })

    const handleSubmit = () => {
        // handle call api post message
        const data = {
            name: message.name,
            email: message.email,
            content: message.content + "\n\n" + "Dịch vụ tôi quan tâm: " + Object.keys(message.services).filter((key: string) => message.services[key as keyof typeof message.services]).join(", "),
        }
        fetch("/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            if (!response.ok) {
                toast.error("Lỗi khi gửi lời nhắn!. Vui lòng thử lại");
            }
            return response.json();
        })
        .then((data) => {
            toast.success("Gửi lời nhắn thành công.");
            setMessage({
                name: "",
                email: "",
                content: "",
                services: {
                    "Tôi có thắc mắc cần được giải đáp": true,
                    "Tôi muốn thiết kế thiệp riêng cho mình": false,
                    "Tôi muốn thuê dịch vụ thiết kế landingpage": false,
                    "Tôi muốn thuê dịch vụ phát triển website": false
                }
            })
        })
        .catch((error) => {
            toast.error("Lỗi khi gửi lời nhắn!. Vui lòng thử lại");
        });
    }

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

    const renderCheckComponent = (checked: boolean) => {
        return checked ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.895431 15.1046 0 14 0H2ZM12.0303 4.96967C12.3196 5.25897 12.3232 5.72582 12.041 6.01947L8.04876 11.0097C8.043 11.0169 8.03685 11.0238 8.03032 11.0303C7.73743 11.3232 7.26256 11.3232 6.96966 11.0303L4.32322 8.38388C4.03032 8.09099 4.03032 7.61612 4.32322 7.32322C4.61611 7.03033 5.09098 7.03033 5.38388 7.32322L7.4774 9.41674L10.9498 4.9921C10.9559 4.98424 10.9626 4.97674 10.9697 4.96967C11.2626 4.67678 11.7374 4.67678 12.0303 4.96967Z" fill="#FD8C06" />
        </svg> : <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#FD8C06" />
        </svg>
    }

    return (
        <motion.div
            ref={sectionRef}
            className="w-full py-[64px] px-5 xl:px-60 lg:px-24 md:px-20 sm:px-10 "
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <motion.label
                variants={itemVariants}
                className=""
            >
                <span className="text-[#383637] flex w-full justify-center font-montserrat-alter font-[700] text-[28px] sm:text-[44px] lg:text-[46px] leading-[100%]">lời nhắn của bạn. </span>
                <span className="font-montserrat text-center flex justify-center items-center gap-2 lg:text-[18px] md:text-[16px] sm:text-[14px] text-[14px] text-[#898A85] mt-5 px-8">Nếu bạn cần hỗ trợ thêm, hãy điền biểu mẫu liên hệ phía dưới để được giải đáp nhanh nhất.</span>
            </motion.label>
            <div
                className="mt-[40px] w-full"
            >
                <div
                    className="w-full "
                >
                    <BaseInput
                        label="Tên của bạn"
                        placeholder="Nhập tên của bạn ..."
                        type="text"
                        value={message.name}
                        onChange={(e) => setMessage({ ...message, name: e.target.value })}
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
                >
                    <BaseInput
                        label="Email/Zalo"
                        placeholder="Email hoặc Zalo liên hệ..."
                        type="email"
                        value={message.email}
                        onChange={(e) => setMessage({ ...message, email: e.target.value })}
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
                className="mt-[16px]"            >
                <BaseInputArea
                    label="Lời nhắn của bạn"
                    placeholder="Nhập lời nhắn của bạn ..."
                    value={message.content}
                    onChange={(e) => setMessage({ ...message, content: e.target.value })}
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

            >
                <span className="text-[#383637] font-montserrat text-[14px] md:text-[16px] font-[600]">Dịch vụ bạn quan tâm</span>
                <div onClick={() => setMessage({ ...message, services: { ...message.services, "Tôi có thắc mắc cần được giải đáp": !message.services["Tôi có thắc mắc cần được giải đáp"] } })} className="cursor-pointer flex items-center pt-4 pb-2.5">
                    {renderCheckComponent(message.services["Tôi có thắc mắc cần được giải đáp"])}
                    <span className="text-[#383637] font-montserrat text-[14px] md:text-[16px] font-[500] pl-4">Tôi có thắc mắc cần được giải đáp</span>
                </div>
                <div onClick={() => setMessage({ ...message, services: { ...message.services, "Tôi muốn thiết kế thiệp riêng cho mình": !message.services["Tôi muốn thiết kế thiệp riêng cho mình"] } })} className="cursor-pointer flex items-center py-2.5">
                    {renderCheckComponent(message.services["Tôi muốn thiết kế thiệp riêng cho mình"])}
                    <span className="text-[#383637] font-montserrat text-[14px] md:text-[16px] font-[500] pl-4">Tôi muốn thiết kế thiệp riêng cho mình</span>
                </div>
                <div onClick={() => setMessage({ ...message, services: { ...message.services, "Tôi muốn thuê dịch vụ thiết kế landingpage": !message.services["Tôi muốn thuê dịch vụ thiết kế landingpage"] } })} className="cursor-pointer flex items-center py-2.5">
                    {renderCheckComponent(message.services["Tôi muốn thuê dịch vụ thiết kế landingpage"])}
                    <span className="text-[#383637] font-montserrat text-[14px] md:text-[16px] font-[500] pl-4">Tôi muốn thuê dịch vụ thiết kế landingpage</span>
                </div>
                <div onClick={() => setMessage({ ...message, services: { ...message.services, "Tôi muốn thuê dịch vụ phát triển website": !message.services["Tôi muốn thuê dịch vụ phát triển website"] } })} className="cursor-pointer flex items-center py-2.5">
                    {renderCheckComponent(message.services["Tôi muốn thuê dịch vụ phát triển website"])}
                    <span className="text-[#383637] font-montserrat text-[14px] md:text-[16px] font-[500] pl-4">Tôi muốn thuê dịch vụ phát triển website</span>
                </div>
            </div>
            <div
                className="mt-[16px] w-full flex items-center justify-end"
            >
                <div
                    className="flex justify-end w-full"
                >
                    <Button onClick={handleSubmit} className="w-full lg:w-" variant="primary">
                        <span className="font-[600] text-[14px] md:text-[16px] pr-2 w-full">Gửi lời nhắn</span>
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

