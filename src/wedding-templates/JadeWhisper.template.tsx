"use client";
import { useParams, usePathname } from "next/navigation";
import useTemplateStore from "@/states/templates/state";
import toast from "react-hot-toast";
import Image from "next/image";
import WeddingGoogleMap from "@/components/wedding/WeddingGoogleMap";
import { useEffect, useState } from "react";
import { originalJadeWhisperState } from "@/states/origin_state/jade_whisper";


export default function JadeWhisperTemplate() {
    const params = useParams();
    const pathname = usePathname();
    const { template: { configs: { texts, images, background_colors, url_maps, send_gifts } }, setSelectedComponent, updateTemplate } = useTemplateStore();

    const [countdown, setCountdown] = useState({ days: 18, hours: 1, minutes: 31, seconds: 3 });

    useEffect(() => {
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
    }, [])

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
            <div className="absolute top-[50px] left-1/2 -translate-x-1/2 z-1"
                style={{
                    width: "90%",
                    margin: "auto",
                    aspectRatio: "388/494",
                    backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.3) 100%),url("${images['image_1'].url}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    WebkitMaskImage: 'url("/templates/SunshineVow/union.svg")',
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                    maskImage: 'url("/templates/SunshineVow/union.svg")',
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
                <div style={{ fontFamily: 'Viaoda Libre', fontWeight: 400, lineHeight: '40px', letterSpacing: '0%', textAlign: 'center', color: texts['text_1'].text_color, fontSize: texts['text_1'].text_size }}>
                    {texts['text_1'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_2', 'text', texts['text_2'])
                }} style={{ fontFamily: 'Send Flowers', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', textAlign: 'center', color: texts['text_2'].text_color, fontSize: texts['text_2'].text_size }}>
                    {texts['text_2'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_3', 'text', texts['text_3'])
                }} style={{ fontFamily: 'Send Flowers', fontWeight: 400, lineHeight: '1.2', textAlign: 'center', marginTop: '8px', color: texts['text_3'].text_color, fontSize: texts['text_3'].text_size }}>
                    {texts['text_3'].content}
                </div>
                <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', backgroundColor: background_colors['bg_color_1'].color, padding: '2rem', marginTop: '1rem' }}>
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('text_4', 'text', texts['text_4'])
                    }} style={{ fontFamily: 'Viaoda Libre', fontWeight: 400, lineHeight: '82%', letterSpacing: '0%', textAlign: 'center', color: texts['text_4'].text_color, fontSize: texts['text_4'].text_size }}>
                        {texts['text_4'].content}
                    </div>
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('text_5', 'text', texts['text_5'])
                    }} style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, lineHeight: '100%', letterSpacing: '0%', textAlign: 'center', marginTop: '16px', padding: '0 20px', color: texts['text_5'].text_color, fontSize: texts['text_5'].text_size }}>
                        {texts['text_5'].content}
                    </div>
                </div>
            </div>
            
            <div style={{ fontFamily: 'Viaoda Libre', fontWeight: 400, lineHeight: '40px', letterSpacing: '0%', textAlign: 'center', marginTop: '16px', padding: '0 20px', color: texts['text_6'].text_color, fontSize: texts['text_6'].text_size }}>
                {texts['text_6'].content}
            </div>
            <div style={{ fontFamily: 'Afacad', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', textAlign: 'center', marginTop: '16px', padding: '0 20px', color: texts['text_7'].text_color, fontSize: texts['text_7'].text_size }}>
                {texts['text_7'].content}
            </div>
            <div style={{ fontFamily: 'Afacad', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', textAlign: 'center', marginTop: '16px', padding: '0 20px', color: texts['text_8'].text_color, fontSize: texts['text_8'].text_size }}>
                {texts['text_8'].content}
            </div>
            {/* Countdown Timer */}
            <div className="mt-[1rem] px-[32px] pb-[30px]">
                <div style={{ borderRadius: "50px", backgroundColor: background_colors['bg_color_2'].color, border: `1px solid ${background_colors['bg_color_2'].border_color}` }} className="flex justify-center gap-[12px]">
                    <div style={{ width: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 8px', borderRadius: '8px' }}>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#2B2B2B' }}>{countdown.days}</div>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            setSelectedComponent('text_9', 'text', texts['text_9'])
                        }} style={{ fontSize: texts['text_9'].text_size, fontWeight: 400, color: texts['text_9'].text_color }}>
                            {texts['text_9'].content}
                        </div>
                    </div>
                    <div style={{ width: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 8px', borderRadius: '8px',  }}>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#2B2B2B' }}>{String(countdown.hours).padStart(2, '0')}</div>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            setSelectedComponent('text_10', 'text', texts['text_10'])
                        }} style={{ fontSize: texts['text_10'].text_size, fontWeight: 400, color: texts['text_10'].text_color }}>
                            {texts['text_10'].content}
                        </div>
                    </div>
                    <div style={{ width: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 8px', borderRadius: '8px' }}>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#2B2B2B' }}>{String(countdown.minutes).padStart(2, '0')}</div>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            setSelectedComponent('text_11', 'text', texts['text_11'])
                        }} style={{ fontSize: texts['text_11'].text_size, fontWeight: 400, color: texts['text_11'].text_color }}>
                            {texts['text_11'].content}
                        </div>
                    </div>
                    <div style={{ width: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 8px', borderRadius: '8px' }}>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#2B2B2B' }}>{String(countdown.seconds).padStart(2, '0')}</div>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            setSelectedComponent('text_12', 'text', texts['text_12'])
                        }} style={{ fontSize: texts['text_12'].text_size, fontWeight: 400, color: texts['text_12'].text_color }}>
                            {texts['text_12'].content}
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Time Section */}
            <div className="px-[20px] pb-[24px] text-center">
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_13', 'text', texts['text_13'])
                }} style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', color: texts['text_13'].text_color, fontSize: texts['text_13'].text_size }}>
                    {texts['text_13'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_14', 'text', texts['text_14'])
                }} style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', marginTop: '12px', color: texts['text_14'].text_color, fontSize: texts['text_14'].text_size }}>
                    {texts['text_14'].content}
                </div>
            </div>

            {/* Location Section */}
            <div className="px-[20px] text-center">
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_15', 'text', texts['text_15'])
                }} style={{ fontFamily: 'Afacad', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', color: texts['text_15'].text_color, fontSize: texts['text_15'].text_size }}>
                    {texts['text_15'].content}
                </div>
                {/* <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_16', 'text', texts['text_16'])
                }} style={{ width: "364px", margin: "auto", fontWeight: 400, lineHeight: '1.3', marginTop: '8px', color: texts['text_16'].text_color, fontSize: texts['text_16'].text_size }}>
                    {texts['text_16'].content}
                </div> */}
                {/* <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_12', 'text', texts['text_12'])
                }} style={{ fontWeight: 700, lineHeight: '1.3', color: texts['text_12'].text_color, fontSize: texts['text_12'].text_size }}>
                    {texts['text_12'].content}
                </div> */}
                {/* <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_17', 'text', texts['text_17'])
                }} style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', marginTop: '12px', padding: '0 10px', color: texts['text_17'].text_color, fontSize: texts['text_17'].text_size }}>
                    {texts['text_17'].content}
                </div> */}
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
                }} style={{ fontWeight: 500, lineHeight: '1.4', marginBottom: '12px', color: texts['text_15'].text_color, fontSize: texts['text_15'].text_size }}>
                    {texts['text_15'].content}
                </div>
                <div className="mt-[8px] flex justify-center items-center gap-[10px]">
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('bg_color_2', 'background_color', background_colors['bg_color_2'])
                    }} style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: background_colors['bg_color_2'].color, border: background_colors['bg_color_2'].border_color === 'none' ? 'none' : `1px solid ${background_colors['bg_color_2'].border_color}` }} />
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('bg_color_3', 'background_color', background_colors['bg_color_3'])
                    }} style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: background_colors['bg_color_3'].color, border: background_colors['bg_color_3'].border_color === 'none' ? 'none' : `1px solid ${background_colors['bg_color_3'].border_color}` }} />
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('bg_color_4', 'background_color', background_colors['bg_color_4'])
                    }} style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: background_colors['bg_color_4'].color, border: background_colors['bg_color_4'].border_color === 'none' ? 'none' : `1px solid ${background_colors['bg_color_4'].border_color}` }} />
                </div>
            </div>

            {/* Thank You Section */}
            <div className="px-[32px] pb-[30px]">
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_16', 'text', texts['text_16'])
                }} style={{ fontWeight: 700, lineHeight: '100%', letterSpacing: '0%', textAlign: 'left', marginBottom: '16px', color: texts['text_16'].text_color, fontSize: texts['text_16'].text_size }}>
                    {texts['text_16'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_17', 'text', texts['text_17'])
                }} style={{ fontFamily: 'Afacad', fontWeight: 400, letterSpacing: '0%', textAlign: 'justify', textJustify: 'inter-word', color: texts['text_17'].text_color, fontSize: texts['text_17'].text_size }}>
                    {texts['text_17'].content}
                </div>
            </div>

            {/* Bottom Image */}
            <div className="w-full px-[32px]">
                <img onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('image_2', 'image', images['image_2'])
                }} src={images['image_2'] ? images['image_2'].url : '/images/logo.png'} alt="Wedding" className="object-cover w-full h-auto mx-auto rounded-[8px]" />
            </div>

            {/* Groom Section */}
            <div className="px-[32px] py-[30px]">
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_18', 'text', texts['text_18'])
                }} style={{ fontWeight: 700, lineHeight: '100%', textAlign: 'left', marginBottom: '12px', color: texts['text_18'].text_color, fontSize: texts['text_18'].text_size }}>
                    {texts['text_18'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_19', 'text', texts['text_19'])
                }} style={{ fontFamily: 'Afacad', fontWeight: 400, letterSpacing: '0%', textAlign: 'justify', textJustify: 'inter-word', marginBottom: '16px', color: texts['text_19'].text_color, fontSize: texts['text_19'].text_size }}>
                    {texts['text_19'].content}
                </div>
                <img onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('image_3', 'image', images['image_3'])
                }} src={images['image_3'] ? images['image_3'].url : '/images/logo.png'} alt="Groom" className="object-cover w-full h-auto rounded-[16px]" />
            </div>

            {/* Bride Section */}
            <div className="px-[32px] pb-[30px]">
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_20', 'text', texts['text_20'])
                }} style={{ fontWeight: 700, lineHeight: '100%', textAlign: 'right', marginBottom: '12px', color: texts['text_20'].text_color, fontSize: texts['text_20'].text_size }}>
                    {texts['text_20'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_21', 'text', texts['text_21'])
                }} style={{ fontFamily: 'Afacad', fontWeight: 400, letterSpacing: '0%', textAlign: 'justify', textJustify: 'inter-word', marginBottom: '16px', color: texts['text_21'].text_color, fontSize: texts['text_21'].text_size }}>
                    {texts['text_21'].content}
                </div>
                <img onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('image_4', 'image', images['image_4'])
                }} src={images['image_4'] ? images['image_4'].url : '/images/logo.png'} alt="Bride" className="object-cover w-full h-auto rounded-[16px]" />
            </div>

            <div className="w-[80%] mx-auto mt-[2rem] pb-[1rem] relative">
                <svg className="absolute top-[30%] right-0" width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.46 11.576C28.1054 2.7015 16.2266 0.204146 8.95961 6.22203C5.4638 9.11718 2.87062 14.1924 3.33817 22.0611C3.79377 29.7267 7.1703 39.9951 15.4751 53.0987C30.709 50.1657 40.5007 45.5871 46.3951 40.6652C52.4457 35.6127 54.3634 30.2458 54.0757 25.7159C53.4776 16.2996 43.5187 9.3613 34.7571 13.0006L32.373 13.9907L31.46 11.576Z" fill="#A2DB97" stroke="white" strokeWidth="5" />
                </svg>
                <svg className="absolute top-[50%] left-0" width="70" height="69" viewBox="0 0 70 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.9213 14.1548C34.8804 2.61595 49.9744 -0.988373 59.4741 6.39552C64.0831 9.97808 67.5454 16.3512 67.2636 26.2589C66.9875 35.9609 63.1031 49.0046 53.1483 65.7499C33.9073 62.7055 21.3926 57.357 13.754 51.3692C5.95321 45.2544 3.26394 38.5186 3.4538 32.684C3.84539 20.6585 16.2636 11.352 27.6688 15.6811L30.0829 16.5978L30.9213 14.1548Z" fill="#B2CDAC" stroke="white" strokeWidth="5" />
                </svg>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_22', 'text', texts['text_22'])
                }} style={{ textAlign: 'center', fontWeight: 600, lineHeight: '100%', letterSpacing: '0%', color: texts['text_22'].text_color, fontSize: texts['text_22'].text_size }}>
                    {texts['text_22'].content}
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('text_23', 'text', texts['text_23'])
                }} style={{ fontFamily: 'Afacad', margin: "1rem auto 1.5rem auto", width: "283px", textAlign: 'center', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', color: texts['text_23'].text_color, fontSize: texts['text_23'].text_size }}>
                    {texts['text_23'].content}
                </div>
                <img src="/images/qr-mimy.png" alt="qr" className="w-[135px] h-[135px] mx-auto" />
                <div className="flex flex-col mt-[1rem]">
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
                    }} className="w-[max-content] mx-auto px-[20px] py-[6px] text-center rounded-[24px]" style={{ backgroundColor: send_gifts['send_gift_1'].background_color, textAlign: 'center', fontWeight: 500, color: send_gifts['send_gift_1'].text_color, fontSize: send_gifts['send_gift_1'].text_size }}>{send_gifts['send_gift_1'].content}</div>
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
                    }} style={{ marginTop: "1rem", textAlign: 'center', lineHeight: '1', fontWeight: 400, color: send_gifts['send_gift_1'].text_bank_color, fontSize: send_gifts['send_gift_1'].text_bank_size }}>
                        {send_gifts['send_gift_1'].bank_name}
                    </div>
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
                    }} style={{ marginTop: "0.5rem", textAlign: 'center', lineHeight: '1', fontWeight: 400, color: send_gifts['send_gift_1'].text_bank_color, fontSize: send_gifts['send_gift_1'].text_bank_size }}>
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
