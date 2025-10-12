"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "../popup/LoginModal";

export type TypeTemplate = {
    id: string;
    name: string;
    url: string;
    is_free: boolean;
    image_quantity: number;
    theme_color: string;
    price: number;
}

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function TemplateList({ title = "mẫu thiệp.", description = "Hãy chọn mẫu thiệp và viết nên câu chuyện của bạn.", displayPagination = false, templates = [] }: { title?: string; description?: string | React.ReactNode; displayPagination?: boolean; templates?: TypeTemplate[] }) {

    const { user } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    // State for storing filter values
    const [selectedImageRange, setSelectedImageRange] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [isFree, setIsFree] = useState<boolean | null>(null);

    const filteredTemplates = templates.filter(template => {
        let valid_image = true;
        let valid_color = true;
        let valid_free = true;
        if (selectedImageRange) {
            if (selectedImageRange.includes("-")) {
                const [min, max] = selectedImageRange.split("-").map(Number);
                valid_image = template.image_quantity >= min && template.image_quantity <= max;
            }
            if (selectedImageRange.includes(">")) {
                const min = Number(selectedImageRange.split(">")[1]);
                valid_image = template.image_quantity >= min;
            }
            if (selectedImageRange.includes("<")) {
                const max = Number(selectedImageRange.split("<")[1]);
                valid_image = template.image_quantity <= max;
            }
        }
        if (selectedColor) {
            valid_color = template.theme_color === selectedColor;
        }
        if (isFree !== null) {
            valid_free = template.is_free === isFree;
        }
        return valid_image && valid_color && valid_free;
    });



    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-[16px] flex flex-wrap items-center justify-start w-full gap-[8px] sm:gap-[12px] lg:gap-[16px]"
            >
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="w-full mt-[16px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 px-12"
            >
                {filteredTemplates.map((template, index) => (
                    <div key={index}                    >
                        <TemplateItem user={user} setIsLoginModalOpen={setIsLoginModalOpen} template={template} />
                    </div>
                ))}
            </motion.div>

            <CheckLoginModal isLoginModalOpen={isLoginModalOpen} handleCloseLoginModal={() => setIsLoginModalOpen(false)} />
        </motion.div>
    )
}

function TemplateItem({ template, user, setIsLoginModalOpen }: { template: TypeTemplate, user: { id: string, name: string, email: string, phone: string } | null, setIsLoginModalOpen: (open: boolean) => void }) {
    const router = useRouter();
    function formatCurrency(value: number) {
        return new Intl.NumberFormat("vi-VN").format(value);
    }
    return (
        <motion.div

            transition={{ type: "spring", stiffness: 300 }}
            className="mt-[24px] w-full flex flex-col items-center"
        >
            <motion.div
                onClick={() => router.push(`/invitations/${template.id}`)}
                className="w-full px-[12px] py-[6px] h-full aspect-[2/3] rounded-2xl border-[1px] border-[#E4E4E4] overflow-hidden relative group cursor-pointer">
                <motion.div
                    className="w-full h-[500%]"
                    whileHover={{
                        y: "-80%",
                        transition: {
                            duration: 10,
                            ease: "easeInOut"
                        }
                    }}
                >
                    <img
                        // unoptimized
                        src={template.url}
                        alt="Card background"
                        width={200}
                        height={200}
                        className="w-full object-top"
                    />
                </motion.div>
            </motion.div>
            <div className="font-montserrat w-full text-center mt-[16px] mb-[8px] text-[#383637] text-[14px] sm:text-[16px] lg:text-[18px] font-[600]">
                {template.name}
            </div>
            <div className="w-full flex-col justify-center items-center gap-[32px] text-[#FD8C06] text-[14px] sm:text-[16px] lg:text-[18px] font-[600]">
                <div className="flex justify-center items-center gap-[6px]">
                    {formatCurrency(template.price)} (đ)
                </div>
                <div className="cursor-pointer mt-4" onClick={() => {
                    if (user) {
                        router.push(`/invitations/create?template_id=${template.id}`);
                    } else {
                        setIsLoginModalOpen(true);
                    }
                }}>
                    <Button className="w-full"
                        variant="primary"
                    >
                        <span className=" font-[500] text-[14px] mr-2">Tạo thiệp</span>
                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.75 12.75L15.5 9L11.75 5.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3.5 13.5V12C3.5 11.2044 3.81607 10.4413 4.37868 9.87868C4.94129 9.31607 5.70435 9 6.5 9H15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

function CheckLoginModal({ isLoginModalOpen, handleCloseLoginModal }: { isLoginModalOpen: boolean, handleCloseLoginModal: () => void }) {
    return <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        callback={handleCloseLoginModal}
    />
}