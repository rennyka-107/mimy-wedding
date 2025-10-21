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
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import LoginModal from '@/components/popup/LoginModal';
import { useAuth } from '@/context/AuthContext';
import { template2010ForYa, template2010MyLight, templateCocoaEmbrace, templateForestCharm, templateGoldenBond, templateJadeWhisper, templateOliveHarmony, templateSunshineVow } from '@/types/wedding.type';
import T2010MyLightTemplate from '@/wedding-templates/2010MyLight.template';
import T2010ForYaTemplate from '@/wedding-templates/2010ForYa.template';

export default function ViewInvitationPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const { user } = useAuth();
    const { template, updateTemplate } = useTemplateStore();
    const router = useRouter();
    
    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);
    };
    useEffect(() => {
        switch (id) {
            case "sunshine_vow":
                updateTemplate(templateSunshineVow)
                return;
            case "olive_harmony":
                updateTemplate(templateOliveHarmony)
                return;
            case "cocoa_embrace":
                updateTemplate(templateCocoaEmbrace)
                return;
            case "golden_bond":
                updateTemplate(templateGoldenBond)
                return;
            case "forest_charm":
                updateTemplate(templateForestCharm)
                return;
            case "jade_whisper":
                updateTemplate(templateJadeWhisper)
                return;
            case "2010_my_light":
                updateTemplate(template2010MyLight)
                return;
            case "2010_for_ya":
                updateTemplate(template2010ForYa)
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
            case "2010_my_light":
                if (id === "2010_my_light") { return <T2010MyLightTemplate /> } else return <ComingSoon />;
            case "2010_for_ya":
                if (id === "2010_for_ya") { return <T2010ForYaTemplate /> } else return <ComingSoon />;
            default:
                // Else return coming soon page
                return <ComingSoon />;
        }
    }, [template.template_id, id])

    return (
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading...</div>}>
            <div className="w-full h-full bg-[#E9EAEB] flex items-center justify-center">
                <div className="w-[448px] h-[calc(100vh-86px)] bg-white border border-none shadow-sm rounded-sm overflow-y-auto scrollbar-hidden">
                    {renderTemplate}
                    <Button
                        className='fixed bottom-[5%] left-1/2 -translate-x-1/2 shadow-xl'
                        variant="primary"
                        onClick={() => {
                            if (user) {
                                router.push(`/invitations/create?template_id=${template.template_id}`);
                            } else {
                                setIsLoginModalOpen(true);
                            }
                        }}
                    >
                        <span className="md:block hidden font-[600] text-[14px] md:text-[16px] pr-2 ">Tạo tấm thiệp của riêng bạn</span>
                        <span className="md:hidden block font-[600] text-[14px] md:text-[16px] pr-2 ">Tạo thiệp ngay</span>
                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.75 12.75L15.5 9L11.75 5.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3.5 13.5V12C3.5 11.2044 3.81607 10.4413 4.37868 9.87868C4.94129 9.31607 5.70435 9 6.5 9H15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Button>
                </div>
            </div>
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={handleCloseLoginModal}
            />
        </Suspense>

    );
}

function ComingSoon() {
    return (
        <div className="w-full min-h-screen relative overflow-hidden bg-gradient-to-br from-[#FFF5E6] via-white to-[#FFE8E8] flex items-center justify-center p-8">
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
                className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-[#fd8c06]/20 to-[#FF9999]/10 blur-3xl"
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
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-[#FFBB53]/10 to-[#fd8c06]/10 blur-3xl"
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
                                    <stop offset="100%" stopColor="#fd8c06" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    className="font-montserrat-alter font-bold text-5xl md:text-6xl mb-4 bg-gradient-to-r from-[#FFBB53] via-[#FD8C06] to-[#fd8c06] bg-clip-text text-transparent"
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
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#fd8c06" fillOpacity="0.3" />
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