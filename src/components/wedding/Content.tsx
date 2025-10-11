"use client";
import Image from "next/image";
import BaseInput from "../input/base";
import BaseInputArea from "../input/area";
import BaseButton from "../buttons/base";
import ArrowBendUpRight from "../icons/arrow_bend_up_right";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Content({
    title,
    description,
    contents,
}: {
    title: string;
    description: string;
    contents: {
        label: string;
        value: string[];
        id: string;
    }[];
}) {
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
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="font-viaoda text-[64px] text-[#CE6F70] font-normal leading-[100%]"
            >
                {title}
            </motion.label>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-[16px] text-[#77716F] font-primary font-[500] text-[20px]"
            >
                {description}
            </motion.p>
            {contents.map((content, index) => (
                <motion.div
                    className="text-[20px] font-semibold lead-[200%] mt-[36px]"
                    key={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <label className="text-[#CE6F70]">{content.label}</label>
                    {content.value.map((value, index) => (
                        <p key={index} className="text-[#4A3B36] mt-[16px]">{value}</p>
                    ))}
                </motion.div>
            ))}
        </motion.div>
    )
}

