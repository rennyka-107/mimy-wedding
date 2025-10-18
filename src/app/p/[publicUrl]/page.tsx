"use client";
import { use, useEffect, useRef, useState } from 'react'
import useTemplateStore from '@/states/templates/state';
import SunshineVowTemplate from '@/wedding-templates/SunshineVow.template';
import OliveHarmonyTemplate from '@/wedding-templates/OliveHarmony.template';
import CocoaEmbraceTemplate from '@/wedding-templates/CocoaEmbrace.template';
import GoldenBondTemplate from '@/wedding-templates/GoldenBond.template';
import ForestCharmTemplate from '@/wedding-templates/ForestCharm.template';
import JadeWhisperTemplate from '@/wedding-templates/JadeWhisper.template';
import toast from 'react-hot-toast';
import T2010MyLightTemplate from '@/wedding-templates/2010MyLight.template';
import T2010ForYaTemplate from '@/wedding-templates/2010ForYa.template';
import PageNotFound from '@/components/ui/PageNotFound';
import { LoadingRing, LoadingSkeleton } from '@/components/ui/Loading';

export default function PublicPage({
    params,
}: {
    params: Promise<{ publicUrl: string }>
}) {
    const { publicUrl } = use(params);
    const { updateTemplate, template: { template_id } } = useTemplateStore();

    const [isJoin, setIsJoin] = useState<boolean>(true);
    const [content, setContent] = useState<string>("");
    const [sender, setSender] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isExpire, setIsExpire] = useState<boolean>(false);
    const [wishes, setWishes] = useState<{ sender: string; content: string }[]>([]);
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpenModal(false);
            }
        };

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    function renderTemplate() {
        switch (template_id) {
            case "sunshine_vow":
                if (loading) return <SunshineVowTemplate />;
                return <SunshineVowTemplate />;
            case "olive_harmony":
                if (loading) return <OliveHarmonyTemplate />;
                return <OliveHarmonyTemplate />;
            case "cocoa_embrace":
                if (loading) return <CocoaEmbraceTemplate />;
                return <CocoaEmbraceTemplate />;
            case "golden_bond":
                if (loading) return <GoldenBondTemplate />;
                return <GoldenBondTemplate />;
            case "forest_charm":
                if (loading) return <ForestCharmTemplate />;
                return <ForestCharmTemplate />;
            case "jade_whisper":
                if (loading) return <JadeWhisperTemplate />;
                return <JadeWhisperTemplate />;
            case "2010_my_light":
                if (loading) return <T2010MyLightTemplate />;
                return <T2010MyLightTemplate />;
            case "2010_for_ya":
                if (loading) return <T2010ForYaTemplate />;
                return <T2010ForYaTemplate />;
            default:
                if (loading) return <SunshineVowTemplate />;
                return <SunshineVowTemplate />;
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // if (pathname.includes("/p/")) {
        // call api to create wish
        if (!content) {
            toast.error('Vui lòng nhập lời chúc!');
            return;
        }
        if (!sender) {
            toast.error('Vui lòng nhập tên!');
            return;
        }
        fetch('/api/wishes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
                sender,
                arrive: isJoin,
                publicUrl: publicUrl
            }),
        }).then((res) => {
            if (res.ok) {
                console.log('Wish created successfully');
                toast.success('Gửi lời chúc thành công! Cảm ơn bạn vì lời chúc!');
                // Thêm lời chúc mới vào danh sách
                setWishes(prev => [...prev, { sender, content }]);
                setSender("");
                setContent("");
                setOpenModal(false);
            }
        })

        // }

    };


    async function fetchData() {
        try {
            const response = await fetch(`/api/orders?publicUrl=${publicUrl}`);
            const data = await response.json();
            if (data.status === "success") {
                updateTemplate({
                    template_id: data.data.template_id,
                    template_name: data.data.template_name,
                    template_price: data.data.template_price,
                    configs: data.data.template_config,
                });
                setWishes(data.data.wishes.map((wish: { sender: string; content: string }) => ({
                    sender: wish.sender,
                    content: wish.content,
                })));
                setLoading(false);
                setIsExpire(false);
            } else {
                setLoading(false);
                setIsExpire(true);
                console.log("Error:", data.message);
            }
        } catch (error) {
            setLoading(false);
            setIsExpire(true);
            console.log("Error:", error);
        }

    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center bg-[#f9f9f9]">
            {!loading ? !isExpire ? <div className="w-[448px] h-full bg-white border shadow-sm rounded-sm overflow-y-auto">
                {renderTemplate()}
                <div ref={ref} className={`fixed bottom-0 px-[24px] py-[20px] w-[inherit] rounded-t-[24px] ${openModal ? "bg-white" : "bg-transparent"}`}>
                    {/* Wishes List */}
                    {wishes.length > 0 && (
                        <div className="mb-4 overflow-hidden relative" style={{ height: '180px' }}>
                            <style jsx>{`
                                @keyframes scrollUpContinuous {
                                    0% {
                                        transform: translateY(0);
                                    }
                                    100% {
                                        transform: translateY(-50%);
                                    }
                                }
                                .wishes-container {
                                    animation: scrollUpContinuous 10s linear infinite;
                                }
                                .fade-overlay {
                                    position: absolute;
                                    bottom: 0;
                                    left: 0;
                                    right: 0;
                                    height: 100px;
                                    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
                                    pointer-events: none;
                                    z-index: 10;
                                }
                            `}</style>
                            <div className="wishes-container flex flex-col gap-3">
                                {[...wishes.slice(-8), ...wishes.slice(-8)].map((wish, index) => {
                                    const position = index % wishes.slice(-8).length;
                                    const totalWishes = wishes.slice(-8).length;
                                    const reversedIndex = totalWishes - 1 - position;

                                    let opacity = 1;
                                    if (reversedIndex === 0) opacity = 0.3;
                                    else if (reversedIndex === 1) opacity = 0.6;
                                    else if (reversedIndex === 2) opacity = 0.85;

                                    return (
                                        <div
                                            key={`wish-${index}`}
                                            className="px-[18px] py-[6px] w-[fit-content] border-none"
                                            style={{
                                                // opacity,
                                                backgroundColor: '#FFF8EF',
                                                backdropFilter: 'blur(50px)',
                                                boxShadow: '0px 2px 2px 0px rgba(100, 78, 55, 0.15)',
                                                borderRadius: '550px'
                                            }}
                                        >
                                            <div className="row gap-1">
                                                <span className="font-montserrat leading-0 font-[700] text-[13px] text-[#925224] whitespace-nowrap">{wish.sender}: </span>
                                                <span className="font-montserrat leading-0 font-[500] text-[13px] text-[#925224]">{wish.content}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* <div className="fade-overlay"></div> */}
                        </div>
                    )}
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
                    {openModal && <input value={sender} onChange={(e) => setSender(e.target.value)} type="text" className='bg-[#FAFAFA] mt-2 rounded-[50px] lead-[82%] outline-none text-[14px] font-[500] px-[24px] py-[16px] w-full text-[#000000]' placeholder="Tên người gửi" />}
                    <div className='relative'>
                        <input style={{ boxShadow: !openModal ? "0px 1px 4px 0px #00000026" : "" }} value={content} onClick={() => setOpenModal(true)} onChange={(e) => setContent(e.target.value)} type="text" className='bg-[#FAFAFA] mt-2 rounded-[50px] lead-[82%] outline-none text-[14px] font-[500] px-[24px] py-[16px] w-full text-[#000000]' placeholder="Gửi lời chúc..." />
                        <div onClick={handleSubmit} className='hover:bg-[#d6d4d4] p-[6px] cursor-pointer absolute top-[55%] -translate-y-[50%] right-[5%] w-[fit-content] bg-[#FAFAFA] rounded-[50px]'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 17L20 12L15 7" stroke="#484848" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4 18V16C4 14.9391 4.42143 13.9217 5.17157 13.1716C5.92172 12.4214 6.93913 12 8 12H20" stroke="#484848" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div> : <PageNotFound /> : <div className="w-full h-[100vh] flex items-center justify-center">
                <LoadingRing />
            </div>}
        </div>
    );
}