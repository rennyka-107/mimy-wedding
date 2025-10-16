"use client";
import { useParams, usePathname } from "next/navigation";
import useTemplateStore, { Timeline } from "@/states/templates/state";
import toast from "react-hot-toast";
import Image from "next/image";
import { originalGoldenBondState } from "@/states/origin_state/golden_bond";
import WeddingGoogleMap from "@/components/wedding/WeddingGoogleMap";
import CheckCircle from "@/components/icons/check_circle";
import { useEffect } from "react";
import { templateGoldenBond } from "@/types/wedding.type";

export default function GoldenBondTemplate() {
  const params = useParams();
  const pathname = usePathname();
  const { template: { configs: { texts, images, background_colors, url_maps, send_gifts, timeline } }, setSelectedComponent, updateTemplate } = useTemplateStore();

  useEffect(() => {
    updateTemplate(templateGoldenBond)
  }, [])
  return (
    <div className="relative font-nunito">
      <div className="mx-[16px] my-[16px] relative cursor-pointer">
        <img onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('image_1', 'image', images['image_1'])
        }} src={images['image_1'] ? images['image_1'].url : '/images/logo.png'} alt="Hero" className="cursor-pointer object-cover w-full h-full rounded-[16px]" />
        <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('image_1', 'image', images['image_1'])
        }} style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)' }} className="absolute top-0 left-0 w-full h-full rounded-[16px]"></div>
        <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_1', 'text', texts['text_1'])
        }} className="absolute top-[75%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]" style={{ fontFamily: 'WindSong', fontWeight: 500, lineHeight: '82%', letterSpacing: '0%', textAlign: 'center', width: '165px', margin: 'auto', color: texts['text_1'].text_color, fontSize: texts['text_1'].text_size }}>{texts['text_1'].content}</div>
      </div>
      <div className="m-[1rem] flex justify-between">
        <div className="w-[90px] h-[90px]">
          <img onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('image_2', 'image', images['image_2'])
          }} src={images['image_2'] ? images['image_2'].url : '/images/logo.png'} alt="Hero" className="cursor-pointer object-cover w-full h-full rounded-[16px]" />
        </div>
        <div className="w-[90px] h-[90px]">
          <img onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('image_3', 'image', images['image_3'])
          }} src={images['image_3'] ? images['image_3'].url : '/images/logo.png'} alt="Hero" className="cursor-pointer object-cover w-full h-full rounded-[16px]" />
        </div>
        <div className="w-[90px] h-[90px]">
          <img onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('image_4', 'image', images['image_4'])
          }} src={images['image_4'] ? images['image_4'].url : '/images/logo.png'} alt="Hero" className="cursor-pointer object-cover w-full h-full rounded-[16px]" />
        </div>
        <div className="w-[90px] h-[90px]">
          <img onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('image_5', 'image', images['image_5'])
          }} src={images['image_5'] ? images['image_5'].url : '/images/logo.png'} alt="Hero" className="cursor-pointer object-cover w-full h-full rounded-[16px]" />
        </div>
      </div>
      <div onClick={(e) => {
        e.stopPropagation();
        setSelectedComponent('text_2', 'text', texts['text_2'])
      }} style={{ cursor: 'pointer', margin: '24px 0 12px 0', fontStyle: 'medium', fontWeight: 500, lineHeight: '100%', letterSpacing: '0%', textAlign: 'center', width: '100%', color: texts['text_2'].text_color, fontSize: texts['text_2'].text_size }}>{texts['text_2'].content}</div>
      <div onClick={(e) => {
        e.stopPropagation();
        setSelectedComponent('text_3', 'text', texts['text_3'])
      }} style={{ cursor: 'pointer', padding: '0 27px', fontFamily: 'Viaoda Libre', fontStyle: 'regular', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', textAlign: 'center', width: '100%', color: texts['text_3'].text_color, fontSize: texts['text_3'].text_size }}>{texts['text_3'].content}</div>
      <div className="w-full pt-[2rem] pb-[1rem] relative flex flex-col items-center mt-[5rem] gap-[2rem]">
        <img src="/templates/GoldenBond/four.png" alt="four" className="w-[90px] h-[90px] absolute left-0 top-0" style={{ rotate: "270deg" }} />
        <img src="/templates/GoldenBond/four.png" alt="four" className="w-[90px] h-[90px] absolute right-0 top-0" />
        <img src="/templates/GoldenBond/four.png" alt="four" className="w-[90px] h-[90px] absolute left-0 bottom-0" style={{ rotate: "180deg" }} />
        <img src="/templates/GoldenBond/four.png" alt="four" className="w-[90px] h-[90px] absolute right-0 bottom-0" style={{ rotate: "90deg" }} />
        <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_4', 'text', texts['text_4'])
        }} style={{ cursor: 'pointer', fontFamily: 'WindSong', width: "224px", textAlign: 'center', fontStyle: 'medium', fontWeight: 400, lineHeight: '82%', letterSpacing: '0%', color: texts['text_4'].text_color, fontSize: texts['text_4'].text_size }}>
          {texts['text_4'].content}
        </div>
        <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_5', 'text', texts['text_5'])
        }} style={{ cursor: 'pointer', fontFamily: 'Viaoda Libre', width: "100%", textAlign: 'center', fontStyle: 'medium', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', color: texts['text_5'].text_color, fontSize: texts['text_5'].text_size }}>
          {texts['text_5'].content}
        </div>
        <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_6', 'text', texts['text_6'])
        }} style={{ cursor: 'pointer', fontFamily: 'WindSong', width: "224px", textAlign: 'center', fontStyle: 'medium', fontWeight: 400, lineHeight: '82%', letterSpacing: '0%', color: texts['text_6'].text_color, fontSize: texts['text_6'].text_size }}>
          {texts['text_6'].content}
        </div>
        <div className="mt-[2rem] flex flex-col items-center gap-[1rem]">
          <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('text_7', 'text', texts['text_7'])
          }} style={{ cursor: 'pointer', fontFamily: 'Viaoda Libre', textAlign: 'center', fontStyle: 'medium', fontWeight: 400, lineHeight: '82%', letterSpacing: '0%', color: texts['text_7'].text_color, fontSize: texts['text_7'].text_size }}>
            {texts['text_7'].content}
          </div>
          <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('text_8', 'text', texts['text_8'])
          }} style={{ cursor: 'pointer', width: "328px", textAlign: 'center', fontStyle: 'medium', fontWeight: 500, lineHeight: '1.5', letterSpacing: '0%', color: texts['text_8'].text_color, fontSize: texts['text_8'].text_size }}>
            {texts['text_8'].content}
          </div>
        </div>
        <div className="flex flex-col items-center gap-[1rem]">
          <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('bg_color_1', 'background_color', background_colors['bg_color_1'])
          }} style={{ cursor: 'pointer', display: "flex", alignItems: 'center', gap: '8px', background: background_colors['bg_color_1'].color, borderRadius: '8px', padding: '8px 16px', textAlign: 'center', fontStyle: 'medium', fontWeight: 500, color: texts['text_9'].text_color, fontSize: texts['text_9'].text_size }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.75 1V3.25M15.25 1V3.25M1 16.75V5.5C1 4.25736 2.00736 3.25 3.25 3.25H16.75C17.9926 3.25 19 4.25736 19 5.5V16.75M1 16.75C1 17.9926 2.00736 19 3.25 19H16.75C17.9926 19 19 17.9926 19 16.75M1 16.75V9.25C1 8.00736 2.00736 7 3.25 7H16.75C17.9926 7 19 8.00736 19 9.25V16.75M10 10.75H10.0075V10.7575H10V10.75ZM10 13H10.0075V13.0075H10V13ZM10 15.25H10.0075V15.2575H10V15.25ZM7.75 13H7.7575V13.0075H7.75V13ZM7.75 15.25H7.7575V15.2575H7.75V15.25ZM5.5 13H5.5075V13.0075H5.5V13ZM5.5 15.25H5.5075V15.2575H5.5V15.25ZM12.25 10.75H12.2575V10.7575H12.25V10.75ZM12.25 13H12.2575V13.0075H12.25V13ZM12.25 15.25H12.2575V15.2575H12.25V15.25ZM14.5 10.75H14.5075V10.7575H14.5V10.75ZM14.5 13H14.5075V13.0075H14.5V13Z" stroke={texts['text_9'].text_color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('text_9', 'text', texts['text_9'])
            }}>{texts['text_9'].content}</span>
          </div>
          <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('text_10', 'text', texts['text_10'])
          }} style={{ cursor: 'pointer', width: "100%", fontFamily: 'Viaoda Libre', textAlign: 'center', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', color: texts['text_10'].text_color, fontSize: texts['text_10'].text_size }}>
            {texts['text_10'].content}
          </div>
          <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('text_11', 'text', texts['text_11'])
          }} style={{ cursor: 'pointer', width: "100%", textAlign: 'center', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', color: texts['text_11'].text_color, fontSize: texts['text_11'].text_size }}>
            {texts['text_11'].content}
          </div>
        </div>
        <div className="mt-[2rem] flex flex-col items-center gap-[1rem]">
          <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('bg_color_2', 'background_color', background_colors['bg_color_2'])
          }} style={{ cursor: 'pointer', display: "flex", alignItems: 'center', gap: '8px', background: background_colors['bg_color_2'].color, borderRadius: '8px', padding: '8px 16px', textAlign: 'center', fontStyle: 'medium', fontWeight: 500, color: texts['text_12'].text_color, fontSize: texts['text_12'].text_size }}>
            <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8.5C12 10.1569 10.6569 11.5 9 11.5C7.34315 11.5 6 10.1569 6 8.5C6 6.84315 7.34315 5.5 9 5.5C10.6569 5.5 12 6.84315 12 8.5Z" stroke={texts['text_12'].text_color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16.5 8.5C16.5 15.6421 9 19.75 9 19.75C9 19.75 1.5 15.6421 1.5 8.5C1.5 4.35786 4.85786 1 9 1C13.1421 1 16.5 4.35786 16.5 8.5Z" stroke={texts['text_12'].text_color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('text_12', 'text', texts['text_12'])
            }}>{texts['text_12'].content}</span>
          </div>
          <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('text_13', 'text', texts['text_13'])
          }} style={{ cursor: 'pointer', width: "100%", fontFamily: 'Viaoda Libre', textAlign: 'center', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', color: texts['text_13'].text_color, fontSize: texts['text_13'].text_size }}>
            {texts['text_13'].content}
          </div>
          <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('text_14', 'text', texts['text_14'])
          }} style={{ cursor: 'pointer', width: "100%", textAlign: 'center', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', color: texts['text_14'].text_color, fontSize: texts['text_14'].text_size }}>
            {texts['text_14'].content}
          </div>
        </div>
        <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_15', 'text', texts['text_15'])
        }} className="cursor-pointer mt-[1.5rem] text-center w-full" style={{ color: texts['text_15'].text_color, fontSize: texts['text_15'].text_size }}>
          {texts['text_15'].content}
          <div className="mt-[8px] flex justify-center items-center gap-[10px]">
            <div onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('bg_color_3', 'background_color', background_colors['bg_color_3'])
            }} style={{ cursor: 'pointer', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: background_colors['bg_color_3'].color, border: background_colors['bg_color_3'].border_color === 'none' ? 'none' : `1px solid ${background_colors['bg_color_3'].border_color}` }} />
            <div onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('bg_color_4', 'background_color', background_colors['bg_color_4'])
            }} style={{ cursor: 'pointer', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: background_colors['bg_color_4'].color, border: background_colors['bg_color_4'].border_color === 'none' ? 'none' : `1px solid ${background_colors['bg_color_4'].border_color}` }} />
            <div onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('bg_color_5', 'background_color', background_colors['bg_color_5'])
            }} style={{ cursor: 'pointer', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: background_colors['bg_color_5'].color, border: background_colors['bg_color_5'].border_color === 'none' ? 'none' : `1px solid ${background_colors['bg_color_5'].border_color}` }} />
          </div>
        </div>
      </div>
      <div className="p-[40px]">
        <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_16', 'text', texts['text_16'])
        }} style={{ cursor: 'pointer', textAlign: 'center', fontWeight: 500, lineHeight: '100%', letterSpacing: '0%', color: texts['text_16'].text_color, fontSize: texts['text_16'].text_size }}>
          {texts['text_16'].content}
        </div>
        <div className="flex justify-center">
          <WeddingGoogleMap
            onClick={() => {

              setSelectedComponent('map_1', 'url_map', url_maps['map_1'])
            }}
            className="w-full h-60 mt-4"
          />
        </div>
      </div>
      <div onClick={(e) => {
        e.stopPropagation();
        setSelectedComponent('bg_color_6', 'background_color', background_colors['bg_color_6'])
      }} className="cursor-pointer relative w-[80%] mx-auto p-[40px]" style={{ borderRadius: "24px", background: background_colors['bg_color_6'].color }}>
        <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_17', 'text', texts['text_17'])
        }} style={{ cursor: 'pointer', width: "100%", fontFamily: 'WindSong', textAlign: 'center', fontWeight: 400, lineHeight: '82%', letterSpacing: '0%', color: texts['text_17'].text_color, fontSize: texts['text_17'].text_size }}>
          {texts['text_17'].content}
        </div>
        <img src="/templates/GoldenBond/bird.png" className="w-[96px] h-[55px] absolute bottom-[-10%] left-[50%] translate-y-[-50%] translate-x-[-50%]" />
        {timeline?.map((item, index) => (
          <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('timeline', 'timeline', timeline as Timeline[])
          }} key={index} className="w-full flex flex-col gap-[0.5rem] my-[1.5rem]">
            <div style={{ cursor: 'pointer', fontFamily: 'Viaoda Libre', width: "100%", textAlign: 'center', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', color: item.title.text_color, fontSize: item.title.text_size }}>
              {item.title.content}
            </div>
            <div onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('timeline', 'timeline', timeline as Timeline[])
            }} style={{ cursor: 'pointer', width: "100%", textAlign: 'center', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', color: item.datetime.text_color, fontSize: item.datetime.text_size }}>
              {item.datetime.content}
            </div>
            <div onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('timeline', 'timeline', timeline as Timeline[])
            }} style={{ cursor: 'pointer', width: "100%", textAlign: 'center', fontWeight: 400, lineHeight: '100%', letterSpacing: '0%', color: item.description.text_color, fontSize: item.description.text_size }}>
              {item.description.content}
            </div>
          </div>
        ))}
      </div>
      <div className="w-[80%] mx-auto mt-[5rem]">
        <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_33', 'text', texts['text_33'])
        }} style={{ cursor: 'pointer', fontFamily: 'Viaoda Libre', textAlign: 'center', fontWeight: 400, lineHeight: '82%', letterSpacing: '0%', color: texts['text_33']?.text_color, fontSize: texts['text_33']?.text_size }}>
          {texts['text_33']?.content}
        </div>
        <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_34', 'text', texts['text_34'])
        }} style={{ cursor: 'pointer', margin: "1rem auto", width: "283px", textAlign: 'center', fontWeight: 500, lineHeight: '100%', letterSpacing: '0%', color: texts['text_34']?.text_color, fontSize: texts['text_34']?.text_size }}>
          {texts['text_34']?.content}
        </div>
        <img onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('image_qr', 'image', images['image_qr'])
        }} style={{ cursor: 'pointer' }} src={images['image_qr'] && images['image_qr'].url} alt="qr" className="w-[135px] h-[135px] mx-auto" />
        <div className="flex flex-col mt-[1rem]">
          <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
          }} className="cursor-pointer w-[max-content] mx-auto px-[20px] py-[4px] text-center rounded-[24px]" style={{ backgroundColor: send_gifts['send_gift_1'].background_color, textAlign: 'center', fontWeight: 700, color: send_gifts['send_gift_1'].text_color, borderColor: send_gifts['send_gift_1'].border_color, borderWidth: '1px', fontSize: send_gifts['send_gift_1'].text_size }}>{send_gifts['send_gift_1'].content}</div>
          <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
          }} style={{ cursor: 'pointer', marginTop: "1rem", textAlign: 'center', lineHeight: '1', fontWeight: 500, color: send_gifts['send_gift_1'].text_bank_color, fontSize: send_gifts['send_gift_1'].text_bank_size }}>
            {send_gifts['send_gift_1'].bank_name}
          </div>
          <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
          }} style={{ cursor: 'pointer', marginTop: "0.2rem", textAlign: 'center', lineHeight: '1', fontWeight: 500, color: send_gifts['send_gift_1'].text_bank_color, fontSize: send_gifts['send_gift_1'].text_bank_size }}>
            {send_gifts['send_gift_1'].bank_number}
          </div>
          <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
          }} style={{ cursor: 'pointer', marginTop: "0.2rem", textAlign: 'center', lineHeight: '1', fontWeight: 500, color: send_gifts['send_gift_1'].text_bank_color, fontSize: send_gifts['send_gift_1'].text_bank_size }}>
            {send_gifts['send_gift_1'].bank_holder}
          </div>
        </div>
      </div>
      <div onClick={(e) => {
        e.stopPropagation();
        setSelectedComponent('image_6', 'image', images['image_6'])
      }} style={{ cursor: 'pointer', marginTop: '1rem', position: 'relative', padding: '0 54px', flexDirection: "column", display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '250px', background: `url(${images['image_6'].url}) 100% 100%`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('image_6', 'image', images['image_6'])
        }} className="bg-black" style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.5 }} />
        <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_35', 'text', texts['text_35'])
        }} className="cursor-pointer relative z-1" style={{ fontFamily: 'Viaoda Libre', textAlign: 'center', fontWeight: 400, lineHeight: '82%', letterSpacing: '0%', color: texts['text_35']?.text_color, fontSize: texts['text_35']?.text_size }}>
          {texts['text_35']?.content}
        </div>
        <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_36', 'text', texts['text_36'])
        }} className="cursor-pointer relative z-1" style={{ margin: "1rem auto", textAlign: 'center', fontWeight: 500, lineHeight: '100%', letterSpacing: '0%', color: texts['text_36']?.text_color, fontSize: texts['text_36']?.text_size }}>
          {texts['text_36']?.content}
        </div>
      </div>
    </div>
  );
}