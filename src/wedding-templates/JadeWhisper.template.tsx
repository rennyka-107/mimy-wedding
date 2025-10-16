"use client";
import { useParams, usePathname } from "next/navigation";
import useTemplateStore, { Countdown } from "@/states/templates/state";
import toast from "react-hot-toast";
import Image from "next/image";
import WeddingGoogleMap from "@/components/wedding/WeddingGoogleMap";
import { useEffect, useState } from "react";
import { originalJadeWhisperState } from "@/states/origin_state/jade_whisper";
import { templateJadeWhisper } from "@/types/wedding.type";


export default function JadeWhisperTemplate() {
    const params = useParams();
    const pathname = usePathname();
    const { template: { configs: { texts, images, background_colors, url_maps, send_gifts, countdown: countdownConfig } }, setSelectedComponent, updateTemplate } = useTemplateStore();

    const [countdown, setCountdown] = useState({ days: 18, hours: 1, minutes: 31, seconds: 3 });

    useEffect(() => {
        updateTemplate(templateJadeWhisper)
    }, [])

    useEffect(() => {
        if (countdownConfig?.content) {
            const date = new Date(countdownConfig?.content);
            const now = new Date();
            const diff = date.getTime() - now.getTime();
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            setCountdown({ days, hours, minutes, seconds });
        }
    }, [countdownConfig?.content]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative pt-[36rem] font-plus-jakarta-sans bg-white">
            <img src={'/templates/JadeWhisper/bgsvg.svg'} className="absolute top-[10px] z-0 left-1/2 -translate-x-1/2" />
            <div className="absolute top-[30px] z-0 left-1/2 -translate-x-1/2">
                <svg width="409" height="521" viewBox="0 0 409 521" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M204.072 0C316.738 0 408.072 91.1101 408.072 203.5C408.072 210.089 407.758 216.604 407.145 223.032V513C407.145 517.418 403.563 521 399.145 521H8C3.58172 521 2.8805e-08 517.418 0 513V207.64H0.114258C0.0867221 206.263 0.0722656 204.883 0.0722656 203.5C0.0722656 91.1101 91.4062 0 204.072 0Z" fill="white" />
                </svg>
            </div>
            <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('image_1', 'image', images['image_1'])
            }} className="cursor-pointer absolute top-[50px] left-1/2 -translate-x-1/2 z-1"
                style={{
                    width: "90%",
                    margin: "auto",
                    aspectRatio: "388/494",
                    backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.3) 100%),url("${images['image_1'].url}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    WebkitMaskImage: 'url("/templates/SunShineVow/union.svg")',
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                    maskImage: 'url("/templates/SunShineVow/union.svg")',
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    maskPosition: "center",
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "center",
                }}
            />


            {/* Header Section */}
            <div className="pt-[40px] pb-[20px] text-center">
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_1', 'text', texts['text_1'])
                }} className="cursor-pointer" style={{ fontFamily: 'Viaoda Libre', fontWeight: 400, lineHeight: '40px', letterSpacing: '0%', textAlign: 'center', color: texts['text_1'].text_color, fontSize: texts['text_1'].text_size }}>
                    {texts['text_1'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_2', 'text', texts['text_2'])
                }} className="cursor-pointer" style={{ fontFamily: 'Send Flowers', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', textAlign: 'center', color: texts['text_2'].text_color, fontSize: texts['text_2'].text_size }}>
                    {texts['text_2'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_3', 'text', texts['text_3'])
                }} className="cursor-pointer" style={{ fontFamily: 'Send Flowers', fontWeight: 400, lineHeight: '1.2', textAlign: 'center', marginTop: '8px', color: texts['text_3'].text_color, fontSize: texts['text_3'].text_size }}>
                    {texts['text_3'].content}
                </div>
                <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', backgroundColor: background_colors['bg_color_1'].color, padding: '2rem', marginTop: '1rem' }}>
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('text_4', 'text', texts['text_4'])
                    }} className="cursor-pointer" style={{ fontFamily: 'Viaoda Libre', fontWeight: 400, lineHeight: '82%', letterSpacing: '0%', textAlign: 'center', color: texts['text_4'].text_color, fontSize: texts['text_4'].text_size }}>
                        {texts['text_4'].content}
                    </div>
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('text_5', 'text', texts['text_5'])
                    }} className="cursor-pointer" style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, lineHeight: '100%', letterSpacing: '0%', textAlign: 'center', marginTop: '16px', padding: '0 20px', color: texts['text_5'].text_color, fontSize: texts['text_5'].text_size }}>
                        {texts['text_5'].content}
                    </div>
                </div>
            </div>

            <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('text_6', 'text', texts['text_6'])
            }} className="cursor-pointer" style={{ fontFamily: 'Viaoda Libre', fontWeight: 400, lineHeight: '40px', letterSpacing: '0%', textAlign: 'center', marginTop: '16px', padding: '0 20px', color: texts['text_6'].text_color, fontSize: texts['text_6'].text_size }}>
                {texts['text_6'].content}
            </div>
            <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('text_7', 'text', texts['text_7'])
            }} className="cursor-pointer" style={{ fontFamily: 'Afacad', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', textAlign: 'center', marginTop: '16px', padding: '0 20px', color: texts['text_7'].text_color, fontSize: texts['text_7'].text_size }}>
                {texts['text_7'].content}
            </div>
            <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('text_8', 'text', texts['text_8'])
            }} className="cursor-pointer" style={{ fontFamily: 'Afacad', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', textAlign: 'center', marginTop: '16px', padding: '0 20px', color: texts['text_8'].text_color, fontSize: texts['text_8'].text_size }}>
                {texts['text_8'].content}
            </div>
            {/* Countdown Timer */}
            <div className="cursor-pointer mt-[1rem] px-[32px] pb-[30px]" onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('countdown', 'countdown', countdownConfig as Countdown)
            }}>
                <div style={{ borderRadius: "50px", backgroundColor: countdownConfig?.background }} className="flex justify-center gap-[12px]">
                    <div style={{ width: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 8px', borderRadius: '8px' }}>
                        <div style={{ fontSize: countdownConfig?.number_size, fontWeight: 700, color: countdownConfig?.number_color }}>{countdown.days}</div>
                        <div style={{ cursor: 'pointer', fontSize: countdownConfig?.text_size, fontWeight: 400, color: countdownConfig?.text_color }}>
                            Days
                        </div>
                    </div>
                    <div style={{ width: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 8px', borderRadius: '8px' }}>
                        <div style={{ fontSize: countdownConfig?.number_size, fontWeight: 700, color: countdownConfig?.number_color }}>{String(countdown.hours).padStart(2, '0')}</div>
                        <div style={{ cursor: 'pointer', fontSize: countdownConfig?.text_size, fontWeight: 400, color: countdownConfig?.text_color }}>
                            Hours
                        </div>
                    </div>
                    <div style={{ width: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 8px', borderRadius: '8px' }}>
                        <div style={{ fontSize: countdownConfig?.number_size, fontWeight: 700, color: countdownConfig?.number_color }}>{String(countdown.minutes).padStart(2, '0')}</div>
                        <div style={{ cursor: 'pointer', fontSize: countdownConfig?.text_size, fontWeight: 400, color: countdownConfig?.text_color }}>
                            Minutes
                        </div>
                    </div>
                    <div style={{ width: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 8px', borderRadius: '8px' }}>
                        <div style={{ fontSize: countdownConfig?.number_size, fontWeight: 700, color: countdownConfig?.number_color }}>{String(countdown.seconds).padStart(2, '0')}</div>
                        <div style={{ cursor: 'pointer', fontSize: countdownConfig?.text_size, fontWeight: 400, color: countdownConfig?.text_color }}>
                            Seconds
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Time Section */}
            <div className="px-[20px] pb-[24px] text-center">
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_13', 'text', texts['text_13'])
                }} className="cursor-pointer" style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', color: texts['text_13'].text_color, fontSize: texts['text_13'].text_size }}>
                    {texts['text_13'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_14', 'text', texts['text_14'])
                }} className="cursor-pointer" style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', marginTop: '12px', color: texts['text_14'].text_color, fontSize: texts['text_14'].text_size }}>
                    {texts['text_14'].content}
                </div>
            </div>

            {/* Location Section */}
            <div className="px-[20px] text-center">
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_15', 'text', texts['text_15'])
                }} className="cursor-pointer" style={{ fontFamily: 'Afacad', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', color: texts['text_15'].text_color, fontSize: texts['text_15'].text_size }}>
                    {texts['text_15'].content}
                </div>
            </div>

            <div className="flex justify-center">
                <WeddingGoogleMap
                    onClick={() => {

                        setSelectedComponent('map_1', 'url_map', url_maps['map_1'])
                    }}
                    className="w-full h-60 mt-4"
                />
            </div>

            {/* Dress Code Section */}
            <div className="mt-[24px] px-[20px] pb-[30px] text-center">
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_15', 'text', texts['text_15'])
                }} className="cursor-pointer" style={{ fontWeight: 500, lineHeight: '1.4', marginBottom: '12px', color: texts['text_15'].text_color, fontSize: texts['text_15'].text_size }}>
                    {texts['text_15'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_16', 'text', texts['text_16'])
                }} className="cursor-pointer" style={{ fontWeight: 700, lineHeight: '100%', letterSpacing: '0%', textAlign: 'center', marginBottom: '16px', color: texts['text_16'].text_color, fontSize: texts['text_16'].text_size }}>
                    {texts['text_16'].content}
                </div>
                <div className="mt-[8px] flex justify-center items-center gap-[10px]">
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('bg_color_2', 'background_color', background_colors['bg_color_2'])
                    }} className="cursor-pointer" style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: background_colors['bg_color_2'].color, border: background_colors['bg_color_2'].border_color === 'none' ? 'none' : `1px solid ${background_colors['bg_color_2'].border_color}` }} />
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('bg_color_3', 'background_color', background_colors['bg_color_3'])
                    }} className="cursor-pointer" style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: background_colors['bg_color_3'].color, border: background_colors['bg_color_3'].border_color === 'none' ? 'none' : `1px solid ${background_colors['bg_color_3'].border_color}` }} />
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('bg_color_4', 'background_color', background_colors['bg_color_4'])
                    }} className="cursor-pointer" style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: background_colors['bg_color_4'].color, border: background_colors['bg_color_4'].border_color === 'none' ? 'none' : `1px solid ${background_colors['bg_color_4'].border_color}` }} />
                </div>
            </div>

            {/* Thank You Section */}
            <div className="px-[32px] pb-[10px]">

                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_17', 'text', texts['text_17'])
                }} className="cursor-pointer" style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, letterSpacing: '0%', textAlign: 'justify', textJustify: 'inter-word', color: texts['text_17'].text_color, fontSize: texts['text_17'].text_size }}>
                    {texts['text_17'].content}
                </div>
            </div>

            {/* Bottom Image */}
            <div className="w-full px-[32px]">
                <img onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('image_2', 'image', images['image_2'])
                }} src={images['image_2'] ? images['image_2'].url : '/images/logo.png'} alt="Wedding" className="cursor-pointer object-cover w-full h-auto mx-auto rounded-[8px]" />
            </div>

            {/* Groom Section */}
            <div className="px-[32px] py-[30px]">
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_18', 'text', texts['text_18'])
                }} className="cursor-pointer" style={{ fontFamily: 'Afacad', fontWeight: 400, lineHeight: '100%', textAlign: 'left', marginBottom: '12px', color: texts['text_18'].text_color, fontSize: texts['text_18'].text_size }}>
                    {texts['text_18'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_19', 'text', texts['text_19'])
                }} className="cursor-pointer" style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, letterSpacing: '0%', textAlign: 'justify', textJustify: 'inter-word', marginBottom: '16px', color: texts['text_19'].text_color, fontSize: texts['text_19'].text_size }}>
                    {texts['text_19'].content}
                </div>
                <img onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('image_3', 'image', images['image_3'])
                }} src={images['image_3'] ? images['image_3'].url : '/images/logo.png'} alt="Groom" className="cursor-pointer object-cover w-full h-auto rounded-[16px]" />
            </div>

            {/* Bride Section */}
            <div className="px-[32px] pb-[30px]">
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_20', 'text', texts['text_20'])
                }} className="cursor-pointer" style={{ fontFamily: 'Afacad', fontWeight: 400, lineHeight: '100%', textAlign: 'left', marginBottom: '12px', color: texts['text_20'].text_color, fontSize: texts['text_20'].text_size }}>
                    {texts['text_20'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_21', 'text', texts['text_21'])
                }} className="cursor-pointer" style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, letterSpacing: '0%', textAlign: 'justify', textJustify: 'inter-word', marginBottom: '16px', color: texts['text_21'].text_color, fontSize: texts['text_21'].text_size }}>
                    {texts['text_21'].content}
                </div>
                <img onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('image_4', 'image', images['image_4'])
                }} src={images['image_4'] ? images['image_4'].url : '/images/logo.png'} alt="Bride" className="cursor-pointer object-cover w-full h-auto rounded-[16px]" />
            </div>

            <div className="w-[80%] mx-auto mt-[2rem] pb-[1rem] relative">
                <svg className="absolute top-[30%] right-0" width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.46 11.576C28.1054 2.7015 16.2266 0.204146 8.95961 6.22203C5.4638 9.11718 2.87062 14.1924 3.33817 22.0611C3.79377 29.7267 7.1703 39.9951 15.4751 53.0987C30.709 50.1657 40.5007 45.5871 46.3951 40.6652C52.4457 35.6127 54.3634 30.2458 54.0757 25.7159C53.4776 16.2996 43.5187 9.3613 34.7571 13.0006L32.373 13.9907L31.46 11.576Z" fill="#A2DB97" stroke="white" strokeWidth="5" />
                </svg>
                <svg className="absolute top-[50%] left-0" width="70" height="69" viewBox="0 0 70 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.9213 14.1548C34.8804 2.61595 49.9744 -0.988373 59.4741 6.39552C64.0831 9.97808 67.5454 16.3512 67.2636 26.2589C66.9875 35.9609 63.1031 49.0046 53.1483 65.7499C33.9073 62.7055 21.3926 57.357 13.754 51.3692C5.95321 45.2544 3.26394 38.5186 3.4538 32.684C3.84539 20.6585 16.2636 11.352 27.6688 15.6811L30.0829 16.5978L30.9213 14.1548Z" fill="#B2CDAC" stroke="white" strokeWidth="5" />
                </svg>
                {/* <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_22', 'text', texts['text_22'])
                }} style={{ fontFamily: 'Afacad', textAlign: 'center', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', color: texts['text_22'].text_color, fontSize: texts['text_22'].text_size }}>
                    {texts['text_22'].content}
                </div> */}
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_23', 'text', texts['text_23'])
                }} className="cursor-pointer" style={{ fontFamily: 'Afacad', margin: "1rem auto 1.5rem auto", width: "283px", textAlign: 'center', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', color: texts['text_23'].text_color, fontSize: texts['text_23'].text_size }}>
                    {texts['text_23'].content}
                </div>
                <img onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('image_qr', 'image', images['image_qr'])
                }} src={images['image_qr'] && images['image_qr'].url} alt="qr" className="w-[135px] h-[135px] mx-auto cursor-pointer" />
                <div className="flex flex-col mt-[1rem]">
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
                    }} className="cursor-pointer w-[max-content] mx-auto px-[20px] py-[6px] text-center rounded-[24px]" style={{ backgroundColor: send_gifts['send_gift_1'].background_color, textAlign: 'center', fontWeight: 500, color: send_gifts['send_gift_1'].text_color, fontSize: send_gifts['send_gift_1'].text_size, borderColor: send_gifts['send_gift_1'].border_color, borderWidth: '1px' }}>{send_gifts['send_gift_1'].content}</div>
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
                    }} className="cursor-pointer" style={{ marginTop: "1rem", textAlign: 'center', lineHeight: '1', fontWeight: 400, color: send_gifts['send_gift_1'].text_bank_color, fontSize: send_gifts['send_gift_1'].text_bank_size }}>
                        {send_gifts['send_gift_1'].bank_name}
                    </div>
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
                    }} className="cursor-pointer" style={{ marginTop: "0.5rem", textAlign: 'center', lineHeight: '1', fontWeight: 400, color: send_gifts['send_gift_1'].text_bank_color, fontSize: send_gifts['send_gift_1'].text_bank_size }}>
                        {send_gifts['send_gift_1'].bank_number}
                    </div>
                </div>
            </div>
        </div>
    );
}
