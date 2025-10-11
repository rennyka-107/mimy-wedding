"use client";
import { Suspense, use, useEffect, useMemo } from 'react'
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
                if(id === "sunshine_vow") {return <SunshineVowTemplate />} else return <ComingSoon />;
            case "olive_harmony":
                if(id === "olive_harmony") {return <OliveHarmonyTemplate />} else return <ComingSoon />;
            case "cocoa_embrace":
                if(id === "cocoa_embrace") {return <CocoaEmbraceTemplate />} else return <ComingSoon />;
            case "golden_bond":
                if(id === "golden_bond") {return <GoldenBondTemplate />} else return <ComingSoon />;
            case "forest_charm":
                if(id === "forest_charm") {return <ForestCharmTemplate />} else return <ComingSoon />;
            case "jade_whisper":
                if(id === "jade_whisper") {return <JadeWhisperTemplate />} else return <ComingSoon />;
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
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#CE6F70" fillOpacity="0.3"/>
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
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FFBB53" fillOpacity="0.3"/>
                        </svg>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}