"use client";
import { useParams, usePathname } from "next/navigation";
import useTemplateStore, { Countdown } from "@/states/templates/state";
import toast from "react-hot-toast";
import Image from "next/image";
import { originalForestCharmState } from "@/states/origin_state/forest_charm";
import WeddingGoogleMap from "@/components/wedding/WeddingGoogleMap";
import CheckCircle from "@/components/icons/check_circle";
import { useEffect, useState } from "react";
import { templateForestCharm } from "@/types/wedding.type";

export default function JadeWhisperTemplate() {
    const params = useParams();
    const pathname = usePathname();
    const { template: { configs: { texts, images, background_colors, url_maps, send_gifts, countdown: countdownConfig } }, setSelectedComponent, updateTemplate } = useTemplateStore();

    const [countdown, setCountdown] = useState({ days: 18, hours: 1, minutes: 31, seconds: 3 });

    useEffect(() => {
        updateTemplate(templateForestCharm)
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
            {/* <div className="absolute top-[-10px] left-0 right-0 z-2 "> */}
            <svg className="absolute top-0 z-2 left-1/2 -translate-x-1/2" width="461" height="66" viewBox="0 0 461 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_579_2754)">
                    <path d="M456.014 30H455.982C455.474 45.5532 443.141 58 428 58C412.859 58 400.526 45.5532 400.018 30H399.981C399.463 45.5532 386.911 58 371.5 58C356.089 58 343.537 45.5532 343.019 30H342.982C342.474 45.5532 330.141 58 315 58C299.859 58 287.526 45.5532 287.018 30H286.981C286.463 45.5532 273.911 58 258.5 58C243.089 58 230.537 45.5532 230.019 30H229.982C229.474 45.5532 217.141 58 202 58C186.859 58 174.526 45.5532 174.018 30H173.981C173.463 45.5532 160.911 58 145.5 58C130.089 58 117.537 45.5532 117.019 30H116.981C116.463 45.5532 103.911 58 88.5 58C73.0888 58 60.5365 45.5532 60.0186 30H59.9824C59.4735 45.5532 47.1408 58 32 58C16.8592 58 4.52647 45.5532 4.01758 30H4.01367V29.8809C4.00524 29.5883 4 29.2947 4 29C4 28.705 4.00523 28.411 4.01367 28.1182V0H456.014V30Z" fill={background_colors['bg_color_5'].color} />
                </g>
                <defs>
                    <filter id="filter0_d_579_2754" x="0" y="0" width="460.014" height="66" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_579_2754" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_579_2754" result="shape" />
                    </filter>
                </defs>
            </svg>

            {/* </div> */}
            <div className="absolute top-[-10px] z-0 left-1/2 -translate-x-1/2">
                <svg width="464" height="584" viewBox="0 0 464 584" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M464 560.344H463.985C463.985 573.07 453.669 583.387 440.943 583.387C428.218 583.387 417.901 573.07 417.901 560.345L417.894 560.939C417.578 573.39 407.386 583.387 394.859 583.387C382.146 583.387 371.837 573.091 371.816 560.382C371.796 573.091 361.253 583.387 348.251 583.387C335.236 583.387 324.686 573.07 324.686 560.345C324.685 573.07 314.368 583.387 301.643 583.387C288.917 583.387 278.601 573.07 278.601 560.345C278.6 573.07 268.05 583.387 255.035 583.387C243.72 583.387 234.268 575.589 231.992 565.189C229.716 575.589 220.266 583.387 208.951 583.387C195.936 583.387 185.385 573.07 185.385 560.345L185.377 560.939C185.061 573.39 174.87 583.387 162.343 583.387C149.617 583.387 139.301 573.07 139.301 560.345C139.301 573.07 128.749 583.387 115.734 583.387C102.72 583.387 92.1691 573.07 92.1689 560.345C92.1688 573.07 81.8517 583.387 69.126 583.387C56.4004 583.386 46.0841 573.07 46.084 560.345C46.0839 573.07 35.7678 583.387 23.042 583.387C10.3163 583.387 0.000129889 573.07 0 560.345C0 560.085 0.00614081 559.827 0.0146484 559.569V0H464V560.344Z" fill="#F2F2F2" />
                </svg>
            </div>
            <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('image_1', 'image', images['image_1'])
            }} className="absolute top-0 z-1"
                style={{
                    width: "100%",
                    // margin: "0 20px",
                    aspectRatio: "388/494",
                    backgroundImage: `url("${images['image_1'].url}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    WebkitMaskImage: 'url("/templates/ForestCharm/svg1.svg")',
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                    maskImage: 'url("/templates/ForestCharm/svg1.svg")',
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    maskPosition: "center",
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "center",
                    cursor: 'pointer'
                }}
            />


            {/* Header Section */}
            <div className="pt-[40px] pb-[20px] px-[20px] text-center">
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_1', 'text', texts['text_1'])
                }} style={{ cursor: 'pointer', fontFamily: 'Send Flowers', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', textAlign: 'center', color: texts['text_1'].text_color, fontSize: texts['text_1'].text_size }}>
                    {texts['text_1'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_2', 'text', texts['text_2'])
                }} style={{ cursor: 'pointer', fontFamily: 'Send Flowers', fontWeight: 400, lineHeight: '1.2', textAlign: 'center', marginTop: '8px', color: texts['text_2'].text_color, fontSize: texts['text_2'].text_size }}>
                    {texts['text_2'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_3', 'text', texts['text_3'])
                }} style={{ cursor: 'pointer', fontFamily: 'Afacad', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', textAlign: 'center', marginTop: '16px', padding: '0 20px', color: texts['text_3'].text_color, fontSize: texts['text_3'].text_size }}>
                    {texts['text_3'].content}
                </div>
            </div>

            {/* Countdown Timer */}
            <div className="cursor-pointer px-[32px] pb-[30px]" onClick={(e) => {
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
                    <div style={{  width: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 8px', borderRadius: '8px' }}>
                        <div style={{ fontSize: countdownConfig?.number_size, fontWeight: 700, color: countdownConfig?.number_color }}>{String(countdown.hours).padStart(2, '0')}</div>
                        <div style={{ cursor: 'pointer', fontSize: countdownConfig?.text_size, fontWeight: 400, color: countdownConfig?.text_color }}>
                            Hours
                        </div>
                    </div>
                    <div style={{  width: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 8px', borderRadius: '8px' }}>
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
                    setSelectedComponent('text_8', 'text', texts['text_8'])
                }} style={{ cursor: 'pointer', fontFamily: 'Plus Jakarta Sans', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', color: texts['text_8'].text_color, fontSize: texts['text_8'].text_size }}>
                    {texts['text_8'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_9', 'text', texts['text_9'])
                }} style={{ cursor: 'pointer', fontFamily: 'Plus Jakarta Sans', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', marginTop: '8px', color: texts['text_9'].text_color, fontSize: texts['text_9'].text_size }}>
                    {texts['text_9'].content}
                </div>
            </div>

            {/* Location Section */}
            <div className="px-[20px] text-center">
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_10', 'text', texts['text_10'])
                }} style={{ cursor: 'pointer', fontWeight: 400, lineHeight: '1.4', color: texts['text_10'].text_color, fontSize: texts['text_10'].text_size }}>
                    {texts['text_10'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_11', 'text', texts['text_11'])
                }} style={{ cursor: 'pointer', width: "364px", margin: "auto", fontWeight: 400, lineHeight: '1.3', marginTop: '8px', color: texts['text_11'].text_color, fontSize: texts['text_11'].text_size }}>
                    {texts['text_11'].content}
                </div>
                {/* <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_12', 'text', texts['text_12'])
                }} style={{ fontWeight: 700, lineHeight: '1.3', color: texts['text_12'].text_color, fontSize: texts['text_12'].text_size }}>
                    {texts['text_12'].content}
                </div> */}
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_13', 'text', texts['text_13'])
                }} style={{ cursor: 'pointer', fontWeight: 400, lineHeight: '1.6', marginTop: '12px', padding: '0 10px', color: texts['text_13'].text_color, fontSize: texts['text_13'].text_size }}>
                    {texts['text_13'].content}
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
                }} style={{ cursor: 'pointer', fontWeight: 500, lineHeight: '1.4', marginBottom: '12px', color: texts['text_15'].text_color, fontSize: texts['text_15'].text_size }}>
                    {texts['text_15'].content}
                </div>
                <div className="mt-[8px] flex justify-center items-center gap-[10px]">
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('bg_color_2', 'background_color', background_colors['bg_color_2'])
                    }} style={{ cursor: 'pointer', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: background_colors['bg_color_2'].color, border: background_colors['bg_color_2'].border_color === 'none' ? 'none' : `1px solid ${background_colors['bg_color_2'].border_color}` }} />
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('bg_color_3', 'background_color', background_colors['bg_color_3'])
                    }} style={{ cursor: 'pointer', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: background_colors['bg_color_3'].color, border: background_colors['bg_color_3'].border_color === 'none' ? 'none' : `1px solid ${background_colors['bg_color_3'].border_color}` }} />
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('bg_color_4', 'background_color', background_colors['bg_color_4'])
                    }} style={{ cursor: 'pointer', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: background_colors['bg_color_4'].color, border: background_colors['bg_color_4'].border_color === 'none' ? 'none' : `1px solid ${background_colors['bg_color_4'].border_color}` }} />
                </div>
            </div>

            {/* Thank You Section */}
            <div className="px-[32px] pb-[30px]">
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_16', 'text', texts['text_16'])
                }} style={{ cursor: 'pointer', fontWeight: 700, lineHeight: '100%', letterSpacing: '0%', textAlign: 'left', marginBottom: '16px', color: texts['text_16'].text_color, fontSize: texts['text_16'].text_size }}>
                    {texts['text_16'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_17', 'text', texts['text_17'])
                }} style={{ cursor: 'pointer', fontFamily: 'Afacad', fontWeight: 400, letterSpacing: '0%', textAlign: 'justify', textJustify: 'inter-word', color: texts['text_17'].text_color, fontSize: texts['text_17'].text_size }}>
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
                }} style={{ cursor: 'pointer', fontWeight: 700, lineHeight: '100%', textAlign: 'left', marginBottom: '12px', color: texts['text_18'].text_color, fontSize: texts['text_18'].text_size }}>
                    {texts['text_18'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_19', 'text', texts['text_19'])
                }} style={{ cursor: 'pointer', fontFamily: 'Afacad', fontWeight: 400, letterSpacing: '0%', textAlign: 'justify', textJustify: 'inter-word', marginBottom: '16px', color: texts['text_19'].text_color, fontSize: texts['text_19'].text_size }}>
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
                }} style={{ cursor: 'pointer', fontWeight: 700, lineHeight: '100%', textAlign: 'right', marginBottom: '12px', color: texts['text_20'].text_color, fontSize: texts['text_20'].text_size }}>
                    {texts['text_20'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_21', 'text', texts['text_21'])
                }} style={{ cursor: 'pointer', fontFamily: 'Afacad', fontWeight: 400, letterSpacing: '0%', textAlign: 'justify', textJustify: 'inter-word', marginBottom: '16px', color: texts['text_21'].text_color, fontSize: texts['text_21'].text_size }}>
                    {texts['text_21'].content}
                </div>
                <img onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('image_4', 'image', images['image_4'])
                }} src={images['image_4'] ? images['image_4'].url : '/images/logo.png'} alt="Bride" className="cursor-pointer object-cover w-full h-auto rounded-[16px]" />
            </div>

            <div className="w-[80%] mx-auto mt-[2rem] pb-[1rem] relative">
                <svg onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('bg_color_6', 'background_color', background_colors['bg_color_6'])
                }} className="absolute top-[30%] right-0 cursor-pointer" width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.46 11.576C28.1054 2.7015 16.2266 0.204146 8.95961 6.22203C5.4638 9.11718 2.87062 14.1924 3.33817 22.0611C3.79377 29.7267 7.1703 39.9951 15.4751 53.0987C30.709 50.1657 40.5007 45.5871 46.3951 40.6652C52.4457 35.6127 54.3634 30.2458 54.0757 25.7159C53.4776 16.2996 43.5187 9.3613 34.7571 13.0006L32.373 13.9907L31.46 11.576Z" fill={background_colors['bg_color_6'].color} stroke="white" strokeWidth="5" />
                </svg>
                <svg onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('bg_color_7', 'background_color', background_colors['bg_color_7'])
                }} className="absolute top-[50%] left-0 cursor-pointer" width="70" height="69" viewBox="0 0 70 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.9213 14.1548C34.8804 2.61595 49.9744 -0.988373 59.4741 6.39552C64.0831 9.97808 67.5454 16.3512 67.2636 26.2589C66.9875 35.9609 63.1031 49.0046 53.1483 65.7499C33.9073 62.7055 21.3926 57.357 13.754 51.3692C5.95321 45.2544 3.26394 38.5186 3.4538 32.684C3.84539 20.6585 16.2636 11.352 27.6688 15.6811L30.0829 16.5978L30.9213 14.1548Z" fill={background_colors['bg_color_7']?.color} stroke="white" strokeWidth="5" />
                </svg>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_22', 'text', texts['text_22'])
                }} style={{ cursor: 'pointer', textAlign: 'center', fontWeight: 600, lineHeight: '100%', letterSpacing: '0%', color: texts['text_22'].text_color, fontSize: texts['text_22'].text_size }}>
                    {texts['text_22'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_23', 'text', texts['text_23'])
                }} style={{ cursor: 'pointer', fontFamily: 'Afacad', margin: "1rem auto 1.5rem auto", width: "283px", textAlign: 'center', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', color: texts['text_23'].text_color, fontSize: texts['text_23'].text_size }}>
                    {texts['text_23'].content}
                </div>
                <img onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('image_qr', 'image', images['image_qr'])
                }} src={images['image_qr'] ? images['image_qr'].url : '/images/qr-mimy.png'} alt="qr" className="w-[135px] h-[135px] mx-auto cursor-pointer" />
                <div className="flex flex-col mt-[1rem]">
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
                    }} className="cursor-pointer w-[max-content] mx-auto px-[20px] py-[6px] text-center rounded-[24px]" style={{ backgroundColor: send_gifts['send_gift_1'].background_color, borderColor: send_gifts['send_gift_1'].border_color, borderWidth: '1px', textAlign: 'center', fontWeight: 500, color: send_gifts['send_gift_1'].text_color, fontSize: send_gifts['send_gift_1'].text_size }}>{send_gifts['send_gift_1'].content}</div>
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
                    {/* <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
                    }} style={{ marginTop: "1rem", textAlign: 'center', lineHeight: '1', fontWeight: 400, color: send_gifts['send_gift_1'].text_bank_color, fontSize: send_gifts['send_gift_1'].text_bank_size }}>
                        {send_gifts['send_gift_1'].bank_holder}
                    </div> */}
                </div>
            </div>
        </div>
    );
}
