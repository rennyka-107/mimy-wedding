"use client";
import { Suspense, use, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import useTemplateStore from '@/states/templates/state';
import SunshineVowTemplate from '@/wedding-templates/SunshineVow.template';
import OliveHarmonyTemplate from '@/wedding-templates/OliveHarmony.template';
import CocoaEmbraceTemplate from '@/wedding-templates/CocoaEmbrace.template';
import GoldenBondTemplate from '@/wedding-templates/GoldenBond.template';
import ForestCharmTemplate from '@/wedding-templates/ForestCharm.template';
import JadeWhisperTemplate from '@/wedding-templates/JadeWhisper.template';
import { originalSunshineVowState } from '@/states/origin_state/sunshine_vow';
import { originalCocoaEmbraceState } from '@/states/origin_state/cocoa_embrace';
import { originalOliveHarmonyState } from '@/states/origin_state/olive_harmony';
import { originalGoldenBondState } from '@/states/origin_state/golden_bond';
import { originalForestCharmState } from '@/states/origin_state/forest_charm';
import { originalJadeWhisperState } from '@/states/origin_state/jade_whisper';

export default function ViewInvitationPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params);
    const { template, updateTemplate } = useTemplateStore();

    const [isJoin, setIsJoin] = useState<boolean>(true);
    const [content, setContent] = useState<string>("");
    const [sender, setSender] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenModal(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
    useEffect(() => {
        switch (id) {
            case "sunshine_vow":
                updateTemplate({
                    template_id: 'sunshine_vow',
                    template_name: 'Sunshine Vow',
                    template_price: 4000,
                    configs: {
                        texts: originalSunshineVowState.texts,
                        images: originalSunshineVowState.images,
                        background_colors: originalSunshineVowState.background_colors,
                        url_maps: originalSunshineVowState.url_maps,
                        send_gifts: originalSunshineVowState.send_gifts,
                    }
                })
                return;
            case "olive_harmony":
                updateTemplate({
                    template_id: 'olive_harmony',
                    template_name: 'Olive Harmony',
                    template_price: 4000,
                    configs: {
                        texts: originalOliveHarmonyState.texts,
                        images: originalOliveHarmonyState.images,
                        background_colors: originalOliveHarmonyState.background_colors,
                        url_maps: originalOliveHarmonyState.url_maps,
                        send_gifts: originalOliveHarmonyState.send_gifts,
                    }
                })
                return;
            case "cocoa_embrace":
                updateTemplate({
                    template_id: 'cocoa_embrace',
                    template_name: 'Cocoa Embrace',
                    template_price: 4000,
                    configs: {
                        texts: originalCocoaEmbraceState.texts,
                        images: originalCocoaEmbraceState.images,
                        background_colors: originalCocoaEmbraceState.background_colors,
                        url_maps: originalCocoaEmbraceState.url_maps,
                        send_gifts: originalCocoaEmbraceState.send_gifts,
                    }
                })
                return;
            case "golden_bond":
                updateTemplate({
                    template_id: 'golden_bond',
                    template_name: 'Golden Bond',
                    template_price: 4000,
                    configs: {
                        texts: originalGoldenBondState.texts,
                        images: originalGoldenBondState.images,
                        background_colors: originalGoldenBondState.background_colors,
                        url_maps: originalGoldenBondState.url_maps,
                        send_gifts: originalGoldenBondState.send_gifts,
                    }
                })
                return;
            case "forest_charm":
                console.log("forest_charm ne con cho nay",)
                updateTemplate({
                    template_id: 'forest_charm',
                    template_name: 'Forest Charm',
                    template_price: 4000,
                    configs: {
                        texts: originalForestCharmState.texts,
                        images: originalForestCharmState.images,
                        background_colors: originalForestCharmState.background_colors,
                        url_maps: originalForestCharmState.url_maps,
                        send_gifts: originalForestCharmState.send_gifts,
                    }
                })
                return;
            case "jade_whisper":
                updateTemplate({
                    template_id: 'jade_whisper',
                    template_name: 'Jade Whisper',
                    template_price: 4000,
                    configs: {
                        texts: originalJadeWhisperState.texts,
                        images: originalJadeWhisperState.images,
                        background_colors: originalJadeWhisperState.background_colors,
                        url_maps: originalJadeWhisperState.url_maps,
                        send_gifts: originalJadeWhisperState.send_gifts,
                    }
                })
                return;
            default:
                return;
        }

    }, [id])

    console.log(template)

    const renderTemplate = useMemo(() => {
        switch (template.template_id) {
            case "sunshine_vow":
                if (id === "sunshine_vow") { return <SunshineVowTemplate /> } else return <ComingSoon />;
            case "olive_harmony":
                if (id === "olive_harmony") { return <OliveHarmonyTemplate /> } else return <ComingSoon />;
            case "cocoa_embrace":
                if (id === "cocoa_embrace") { return <CocoaEmbraceTemplate /> } else return <ComingSoon />;
            case "golden_bond":
                if (id === "golden_bond") { return <GoldenBondTemplate /> } else return <ComingSoon />;
            case "forest_charm":
                if (id === "forest_charm") { return <ForestCharmTemplate /> } else return <ComingSoon />;
            case "jade_whisper":
                if (id === "jade_whisper") { return <JadeWhisperTemplate /> } else return <ComingSoon />;
            default:
                // Else return coming soon page
                return <ComingSoon />;
        }
    }, [template.template_id, id])

    // console.log(publicUrl, "publicUrl");
    return (
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading...</div>}>
            <div className="w-full h-full bg-[#E9EAEB] flex items-center justify-center">
                <div className="w-[448px] h-[calc(100vh-86px)] bg-white border shadow-sm rounded-sm overflow-y-auto scrollbar-hidden">
                    {renderTemplate}
                    <div ref={ref} style={{ boxShadow: openModal ? "0px -4px 9.6px 0px #0000000D" : "" }} className={`fixed bottom-0 px-[24px] py-[20px] w-[inherit] rounded-t-[24px] ${openModal ? "bg-white" : "bg-transparent"}`}>
                        {openModal && <div onClick={() => setIsJoin(!isJoin)} className='cursor-pointer flex gap-[10px] items-center'>
                            {isJoin ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.895431 15.1046 0 14 0H2ZM12.0303 4.96967C12.3196 5.25897 12.3232 5.72582 12.041 6.01947L8.04876 11.0097C8.043 11.0169 8.03685 11.0238 8.03032 11.0303C7.73743 11.3232 7.26256 11.3232 6.96966 11.0303L4.32322 8.38388C4.03032 8.09099 4.03032 7.61612 4.32322 7.32322C4.61611 7.03033 5.09098 7.03033 5.38388 7.32322L7.4774 9.41674L10.9498 4.9921C10.9559 4.98424 10.9626 4.97674 10.9697 4.96967C11.2626 4.67678 11.7374 4.67678 12.0303 4.96967Z" fill="#5F9654" />
                            </svg> : <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_639_2430)">
                                    <path d="M13.3333 1.14282H2.66663C1.82506 1.14282 1.14282 1.82506 1.14282 2.66663V13.3333C1.14282 14.1749 1.82506 14.8571 2.66663 14.8571H13.3333C14.1749 14.8571 14.8571 14.1749 14.8571 13.3333V2.66663C14.8571 1.82506 14.1749 1.14282 13.3333 1.14282Z" fill="#B20000" stroke="#B20000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.71423 5.71436L10.2857 10.2858" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.2857 5.71436L5.71423 10.2858" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_639_2430">
                                        <rect width="16" height="16" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            }
                            <div className='text-[14px] font-[500] text-[#000000]'>{isJoin ? "Tham dự lễ cưới" : "Không tham dự lễ cưới"}</div>
                        </div>}
                        {openModal && <input onChange={(e) => setSender(e.target.value)} type="text" className='bg-[#FAFAFA] mt-2 rounded-[50px] lead-[82%] outline-none text-[14px] font-[500] px-[24px] py-[16px] w-full text-[#000000]' placeholder="Gửi lời chúc..." />}
                        <div className='relative'>
                            <input style={{ boxShadow: !openModal ? "0px 1px 4px 0px #00000026" : "" }} onClick={() => setOpenModal(true)} onChange={(e) => setContent(e.target.value)} type="text" className='bg-[#FAFAFA] mt-2 rounded-[50px] lead-[82%] outline-none text-[14px] font-[500] px-[24px] py-[16px] w-full text-[#000000]' placeholder="Gửi lời chúc..." />
                            <div className='hover:bg-[#d6d4d4] p-[6px] cursor-pointer absolute top-[55%] -translate-y-[50%] right-[5%] w-[fit-content] bg-[#FAFAFA] rounded-[50px]'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 17L20 12L15 7" stroke="#484848" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4 18V16C4 14.9391 4.42143 13.9217 5.17157 13.1716C5.92172 12.4214 6.93913 12 8 12H20" stroke="#484848" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>

    );
}

function ComingSoon() {
    return (
        <div className="w-full min-h-screen relative overflow-hidden bg-gradient-to-br from-[#FFF5E6] via-white to-[#FFE8E8] flex items-center justify-center p-8">
            {/* Animated background circles */}
            <motion.div
                className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-[#FFBB53]/20 to-[#FD8C06]/10 blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-[#CE6F70]/20 to-[#FF9999]/10 blur-3xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-[#FFBB53]/10 to-[#CE6F70]/10 blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Main content */}
            <div className="relative z-10 text-center">
                {/* Sparkle icon animation */}
                <motion.div
                    className="flex justify-center mb-8"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.2
                    }}
                >
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                d="M40 5L45 25L55 15L50 35L70 30L55 45L75 50L55 55L65 70L45 60L40 75L35 60L15 70L25 55L5 50L25 45L10 30L30 35L25 15L35 25L40 5Z"
                                fill="url(#gradient)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <defs>
                                <linearGradient id="gradient" x1="5" y1="5" x2="75" y2="75">
                                    <stop offset="0%" stopColor="#FFBB53" />
                                    <stop offset="50%" stopColor="#FD8C06" />
                                    <stop offset="100%" stopColor="#CE6F70" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    className="font-montserrat-alter font-bold text-5xl md:text-6xl mb-4 bg-gradient-to-r from-[#FFBB53] via-[#FD8C06] to-[#CE6F70] bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    Coming Soon
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="mt-3 font-montserrat text-[#898A85] text-lg md:text-xl mb-8 max-w-md mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    Mẫu thiệp này đang được hoàn thiện. Hãy quay lại sau nhé!
                </motion.p>

                {/* Animated dots */}
                <motion.div
                    className="flex justify-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FFBB53] to-[#FD8C06]"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </motion.div>

                {/* Decorative hearts */}
                <div className="absolute -top-10 -left-10">
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 10, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#CE6F70" fillOpacity="0.3" />
                        </svg>
                    </motion.div>
                </div>

                <div className="absolute -bottom-10 -right-10">
                    <motion.div
                        animate={{
                            y: [0, 20, 0],
                            rotate: [0, -10, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FFBB53" fillOpacity="0.3" />
                        </svg>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}