"use client";
import Image from "next/image";
import GrayButton from "../buttons/gray";
import ArrowDown from "../icons/arrow_down";
import Trash from "../icons/trash";
import BaseButton from "../buttons/base";
import { motion } from "framer-motion";
import { useState } from "react";
import ImageQuantityFilter from "../popup/ImageQuantityFilter";
import ThemeColorFilter from "../popup/ThemeColorFilter";
import Fire from "../icons/fire";
import ArrowRight from "../icons/arrow_right";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

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

export default function TemplateList({ title = "mẫu thiệp.", description = "Các mẫu thiệp hiện có", displayPagination = false, templates = [] }: { title?: string; description?: string | React.ReactNode; displayPagination?: boolean; templates?: TypeTemplate[] }) {
    const [isImageFilterOpen, setIsImageFilterOpen] = useState(false);
    const [isColorFilterOpen, setIsColorFilterOpen] = useState(false);

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
            {/* <Image src="/images/mau-thiep.png" alt="Template List" width={100} height={100} /> */}
            <motion.label
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-[#383637] flex w-full justify-center pt-24 font-montserrat-alter font-[700] text-[40px] sm:mt-10 md:mt-25 lg:mt-10 sm:text-[44px] lg:text-[46px] leading-[100%]"
            >
                {title}
            </motion.label>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-[16px] text-[#77716F] font-primary font-[500] text-[16px] sm:text-[18px] lg:text-[20px]"
            >
                {description}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-[16px] flex flex-wrap items-center justify-start w-full gap-[8px] sm:gap-[12px] lg:gap-[16px]"
            >
                {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <GrayButton isActive={isFree === true} onClick={() => {
                        if (isFree !== true) {
                            setIsFree(true);
                        } else {
                            setIsFree(null);
                        }
                    }} title="Miễn phí" />
                </motion.div> */}
                {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <GrayButton isActive={isFree === false} onClick={() => {
                        if (isFree !== false) {
                            setIsFree(false);
                        } else {
                            setIsFree(null);
                        }
                        setIsColorFilterOpen(false);
                    }} title="Trả phí" />
                </motion.div> */}
                {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <GrayButton isActive={selectedImageRange !== null} title="Số lượng ảnh" suffixIcon={<ArrowDown fill={selectedImageRange !== null ? "#CE6F70" : "#585858"} />} onClick={() => setIsImageFilterOpen(true)} />
                </motion.div> */}
                {/* <ImageQuantityFilter
                    isOpen={isImageFilterOpen}
                    onClose={() => setIsImageFilterOpen(false)}
                    onApply={(range, customValue) => {
                        setSelectedImageRange(range);
                        console.log("Selected image range:", range, customValue);
                        // Apply your filtering logic here
                    }}
                /> */}
                {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <GrayButton isActive={selectedColor !== null} title="Màu chủ đạo" suffixIcon={<ArrowDown fill={selectedColor !== null ? "#CE6F70" : "#585858"} />} onClick={() => setIsColorFilterOpen(true)} />
                </motion.div> */}
                {/* <ThemeColorFilter
                    isOpen={isColorFilterOpen}
                    onClose={() => setIsColorFilterOpen(false)}
                    onApply={(color) => {
                        setSelectedColor(color);
                        console.log("Selected color:", color);
                        // Apply your filtering logic here
                    }}
                />
                {(selectedImageRange !== null || selectedColor !== null || isFree !== null) && <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <GrayButton prefixIcon={<Trash />} onClick={() => {
                        setSelectedImageRange(null);
                        setSelectedColor(null);
                        setIsFree(null);
                    }} title={`(${filteredTemplates.length})`} />
                </motion.div>} */}
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="w-full mt-[16px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 px-12"
            >
                {filteredTemplates.map((template, index) => (
                    <div
                        key={index}
                    // variants={fadeInUp}
                    // custom={index}
                    // transition={{ duration: 0.5, delay: 0.1 * (index % 5) }}
                    >
                        <TemplateItem template={template} />
                    </div>
                ))}
            </motion.div>

            {/* {displayPagination && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-[36px] gap-[16px] flex items-center justify-center"
                >
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <BaseButton title="1" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <GrayButton title="2" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <GrayButton title="3" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <GrayButton title="4" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <GrayButton title="5" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <GrayButton title=">" />
                    </motion.div>
                </motion.div>
            )} */}
        </motion.div>
    )
}

function TemplateItem({ template }: { template: TypeTemplate }) {
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
                    router.push(`/invitations/create?template_id=${template.id}`);
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