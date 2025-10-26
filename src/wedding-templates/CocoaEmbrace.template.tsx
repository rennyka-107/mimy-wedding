"use client";
import { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import useTemplateStore, { Timeline } from "@/states/templates/state";
import toast from "react-hot-toast";
import Image from "next/image";
import { originalOliveHarmonyState } from "@/states/origin_state/olive_harmony";
import WeddingGoogleMap from "@/components/wedding/WeddingGoogleMap";
import CheckCircle from "@/components/icons/check_circle";
import { originalCocoaEmbraceState } from "@/states/origin_state/cocoa_embrace";
import { templateCocoaEmbrace } from "@/types/wedding.type";

export default function CocoaEmbraceTemplate({isPublicPage = false}: {isPublicPage: boolean}) {
  const params = useParams();
  const pathname = usePathname();
  // States for form
  const [name, setName] = useState('');
  const [wishes, setWishes] = useState('');
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const { template: { configs: { texts, images, background_colors, url_maps, send_gifts, timeline } }, setSelectedComponent, updateTemplate, deleteComponent } = useTemplateStore();

  useEffect(() => {
    if (!isPublicPage) updateTemplate(templateCocoaEmbrace)
  }, [isPublicPage])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pathname.includes("/p/")) {
      // call api to create wish
      console.log({ name, wishes, attendance }, params.publicUrl);
      fetch('/api/wishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: wishes,
          sender: name,
          arrive: attendance === "yes",
          publicUrl: params.publicUrl
        }),
      }).then((res) => {
        if (res.ok) {
          console.log('Wish created successfully');
          toast.success('Gửi lời chúc thành công! Cảm ơn bạn vì lời chúc!');
        }
      })

    }

  };


  return (
    <div className="relative font-nunito">
      <div className="w-full">
        {!images['image_1'].isDeleted && <div className="w-full h-[347px] mb-[2rem]">
          <img onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('image_1', 'image', images['image_1'])
          }} src={images['image_1'] ? images['image_1'].url : '/images/logo.png'} alt="Hero" className="cursor-pointer object-cover w-full h-full" />
        </div>}
        {!texts['text_1'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_1', 'text', texts['text_1'])
        }} className="px-[48px] cursor-pointer font-pecita text-center w-full" style={{ color: texts['text_1'].text_color, fontSize: texts['text_1'].text_size }}>
          {texts['text_1'].content}
        </div>}
        {!texts['text_2'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_2', 'text', texts['text_2'])
        }} className="px-[48px] cursor-pointer" style={{ color: texts['text_2'].text_color, fontSize: texts['text_2'].text_size }}>
          {texts['text_2'].content}
        </div>}
        {(!texts['text_3'].isDeleted || !texts['text_4'].isDeleted || !texts['text_5'].isDeleted || !texts['text_6'].isDeleted || !texts['text_7'].isDeleted || !texts['text_8'].isDeleted) && <div className="px-[48px] flex justify-between mt-[2rem]">
          {(!texts['text_3'].isDeleted || !texts['text_4'].isDeleted || !texts['text_5'].isDeleted) && <div className="flex flex-col gap-[4px] flex-1">
            {!texts['text_3'].isDeleted && <div onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('text_3', 'text', texts['text_3'])
            }} style={{ cursor: 'pointer', color: texts['text_3'].text_color, fontSize: texts['text_3'].text_size }}>{texts['text_3'].content}</div>}
            {!texts['text_4'].isDeleted && <div onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('text_4', 'text', texts['text_4'])
            }} style={{ cursor: 'pointer', color: texts['text_4'].text_color, fontSize: texts['text_4'].text_size }}>{texts['text_4'].content}</div>}
            {!texts['text_5'].isDeleted && <div onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('text_5', 'text', texts['text_5'])
            }} style={{ cursor: 'pointer', color: texts['text_5'].text_color, fontSize: texts['text_5'].text_size }}>{texts['text_5'].content}</div>}
          </div>}
          {(!texts['text_6'].isDeleted || !texts['text_7'].isDeleted || !texts['text_8'].isDeleted) && <div className="flex flex-col gap-[4px] items-end flex-1">
            {!texts['text_6'].isDeleted && <div onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('text_6', 'text', texts['text_6'])
            }} style={{ cursor: 'pointer', color: texts['text_6'].text_color, fontSize: texts['text_6'].text_size }}>{texts['text_6'].content}</div>}
            {!texts['text_7'].isDeleted && <div onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('text_7', 'text', texts['text_7'])
            }} style={{ cursor: 'pointer', color: texts['text_7'].text_color, fontSize: texts['text_7'].text_size }}>{texts['text_7'].content}</div>}
            {!texts['text_8'].isDeleted && <div onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('text_8', 'text', texts['text_8'])
            }} style={{ cursor: 'pointer', color: texts['text_8'].text_color, fontSize: texts['text_8'].text_size }}>{texts['text_8'].content}</div>}
          </div>}
        </div>}
        {!texts['text_9'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_9', 'text', texts['text_9'])
        }} className="cursor-pointer px-[48px] font-pecita text-center leading-[1] w-full mt-[2rem]" style={{ color: texts['text_9'].text_color, fontSize: texts['text_9'].text_size }}>
          {texts['text_9'].content}
        </div>}
        {!texts['text_10'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_10', 'text', texts['text_10'])
        }} className="cursor-pointer px-[48px] text-center w-full" style={{ color: texts['text_10'].text_color, fontSize: texts['text_10'].text_size }}>
          {texts['text_10'].content}
        </div>}
        {!texts['text_11'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_11', 'text', texts['text_11'])
        }} className="cursor-pointer px-[32px] font-pecita leading-[1] mt-[2rem] text-center w-full" style={{ color: texts['text_11'].text_color, fontSize: texts['text_11'].text_size }}>
          {texts['text_11'].content}
        </div>}
        {!texts['text_12'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_12', 'text', texts['text_12'])
        }} className="cursor-pointer px-[32px] font-pecita leading-[1] text-center w-full" style={{ color: texts['text_12'].text_color, fontSize: texts['text_12'].text_size }}>
          {texts['text_12'].content}
        </div>}
        {!texts['text_13'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_13', 'text', texts['text_13'])
        }} className="cursor-pointer px-[32px] mt-[1rem] text-center w-full" style={{ color: texts['text_13'].text_color, fontSize: texts['text_13'].text_size }}>
          {texts['text_13'].content}
        </div>}
        {!texts['text_14'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_14', 'text', texts['text_14'])
        }} className="cursor-pointer px-[32px] text-center w-full" style={{ color: texts['text_14'].text_color, fontSize: texts['text_14'].text_size }}>
          {texts['text_14'].content}
        </div>}
        {!texts['text_15'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_15', 'text', texts['text_15'])
        }} className="cursor-pointer px-[32px] mt-[1.5rem] text-center w-full" style={{ color: texts['text_15'].text_color, fontSize: texts['text_15'].text_size }}>
          {texts['text_15'].content}
        </div>}
        {!texts['text_16'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_16', 'text', texts['text_16'])
        }} className="cursor-pointer px-[32px] text-center w-full" style={{ color: texts['text_16'].text_color, fontSize: texts['text_16'].text_size }}>
          {texts['text_16'].content}
        </div>}
        {!texts['text_17'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_17', 'text', texts['text_17'])
        }} className="cursor-pointer px-[32px] text-center w-full" style={{ color: texts['text_17'].text_color, fontSize: texts['text_17'].text_size }}>
          {texts['text_17'].content}
        </div>}
        {!texts['text_18'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_18', 'text', texts['text_18'])
        }} className="cursor-pointer px-[32px] mt-[1.5rem] text-center w-full" style={{ color: texts['text_18'].text_color, fontSize: texts['text_18'].text_size }}>
          {texts['text_18'].content}
        </div>}
        {(!background_colors['bg_color_1'].isDeleted || !background_colors['bg_color_2'].isDeleted || !background_colors['bg_color_3'].isDeleted) && <div className="mt-[8px] flex justify-center items-center gap-[10px]">
          {(!background_colors['bg_color_1'].isDeleted) && <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('bg_color_1', 'background_color', background_colors['bg_color_1'])
          }} style={{ cursor: 'pointer', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: background_colors['bg_color_1'].color, border: background_colors['bg_color_1'].border_color === 'none' ? 'none' : `1px solid ${background_colors['bg_color_1'].border_color}` }} />}
          {(!background_colors['bg_color_2'].isDeleted) && <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('bg_color_2', 'background_color', background_colors['bg_color_2'])
          }} style={{ cursor: 'pointer', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: background_colors['bg_color_2'].color, border: background_colors['bg_color_2'].border_color === 'none' ? 'none' : `1px solid ${background_colors['bg_color_2'].border_color}` }} />}
          {(!background_colors['bg_color_3'].isDeleted) && <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('bg_color_3', 'background_color', background_colors['bg_color_3'])
          }} style={{ cursor: 'pointer', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: background_colors['bg_color_3'].color, border: background_colors['bg_color_3'].border_color === 'none' ? 'none' : `1px solid ${background_colors['bg_color_3'].border_color}` }} />}
        </div>}
        {!texts['text_19'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_19', 'text', texts['text_19'])
        }} className="cursor-pointer px-[32px] mt-[1.5rem] text-center w-full" style={{ color: texts['text_19'].text_color, fontSize: texts['text_19'].text_size }}>
          {texts['text_19'].content}
        </div>}
        {!url_maps['map_1'].isDeleted && <div className="flex justify-center">
          <WeddingGoogleMap
            onClick={() => {

              setSelectedComponent('map_1', 'url_map', url_maps['map_1'])
            }}
            className="w-full h-60 mt-4"
          />
        </div>}
        {!texts['text_20'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_20', 'text', texts['text_20'])
        }} className="cursor-pointer px-[48px] mt-[1.5rem] w-full font-[800]" style={{ color: texts['text_20'].text_color, fontSize: texts['text_20'].text_size }}>
          {texts['text_20'].content}
        </div>}
        {(timeline && timeline?.length > 0) && <div className="cursor-pointer px-[48px]" onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('timeline', 'timeline', timeline as Timeline[])
        }}>
          {timeline?.map((timeline, index) =>
            <div key={index} className="flex items-center gap-[1rem] py-[12px]" style={{ borderStyle: 'dashed', borderBottomWidth: '1px', borderColor: '#B46B4D' }}>
              <div className="rounded-[50%] w-[32px] h-[32px] flex items-center justify-center bg-[#F8F7F7] text-[#B46B4D] font-[700]">
                {index + 1}
              </div>
              <div className="flex flex-col">
                <div style={{ textAlign: 'left', fontWeight: 500, color: timeline.datetime.text_color, fontSize: timeline.datetime.text_size }}>{timeline.datetime.content}</div>
                <div style={{ textAlign: 'left', fontWeight: 700, color: timeline.title.text_color, fontSize: timeline.title.text_size }}>{timeline.title.content}</div>
              </div>
            </div>
          )}
        </div>}
        <div className="px-[48px] py-[36px]">
          <div className="flex flex-col items-center">
            <div>
              <div className="flex flex-col items-center gap-[10px]">
                {texts['text_27'].isDeleted && <div onClick={(e) => {
                  e.stopPropagation();
                  setSelectedComponent('text_27', 'text', texts['text_27'])
                }} className="cursor-pointer" style={{ textAlign: 'center', lineHeight: '1', fontWeight: 800, color: texts['text_27'].text_color, fontSize: texts['text_27'].text_size }}>
                  {texts['text_27'].content}
                </div>}
                {texts['text_28'].isDeleted && <div onClick={(e) => {
                  e.stopPropagation();
                  setSelectedComponent('text_28', 'text', texts['text_28'])
                }} className="cursor-pointer" style={{ textAlign: 'center', lineHeight: '1', fontWeight: 600, color: texts['text_28'].text_color, fontSize: texts['text_28'].text_size }}>
                  {texts['text_28'].content}
                </div>}
                {images['image_3'].isDeleted && <Image onClick={(e) => {
                  e.stopPropagation();
                  setSelectedComponent('image_3', 'image', images['image_3'])
                }} src={images['image_3'].url} alt={images['image_3'].id} width={100} height={100} className="cursor-pointer" style={{ width: '150px', height: '150px', marginTop: '1rem' }} />}
                {send_gifts['send_gift_1'].isDeleted && <div onClick={(e) => {
                  e.stopPropagation();
                  setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
                }} className="cursor-pointer w-[max-content] px-[20px] py-[4px] text-center rounded-[24px]" style={{ backgroundColor: send_gifts['send_gift_1'].background_color, borderColor: send_gifts['send_gift_1'].border_color, borderWidth: '1px', textAlign: 'center', fontWeight: 700, color: send_gifts['send_gift_1'].text_color, fontSize: send_gifts['send_gift_1'].text_size }}>{send_gifts['send_gift_1'].content}</div>}
              </div>
            </div>
            {send_gifts['send_gift_1'].isDeleted && <div className="flex flex-col">
              <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
              }} className="cursor-pointer" style={{ marginTop: "1rem", textAlign: 'center', lineHeight: '1', fontWeight: 500, color: send_gifts['send_gift_1'].text_bank_color, fontSize: send_gifts['send_gift_1'].text_bank_size }}>
                {send_gifts['send_gift_1'].bank_name}
              </div>
              <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
              }} className="cursor-pointer" style={{ marginTop: "0.2rem", textAlign: 'center', lineHeight: '1', fontWeight: 500, color: send_gifts['send_gift_1'].text_bank_color, fontSize: send_gifts['send_gift_1'].text_bank_size }}>
                {send_gifts['send_gift_1'].bank_number}
              </div>
              <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
              }} className="cursor-pointer" style={{ marginTop: "0.2rem", textAlign: 'center', lineHeight: '1', fontWeight: 500, color: send_gifts['send_gift_1'].text_bank_color, fontSize: send_gifts['send_gift_1'].text_bank_size }}>
                {send_gifts['send_gift_1'].bank_holder}
              </div>
            </div>}

          </div>
        </div>
        <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('image_2', 'image', images['image_2'])
        }} className="cursor-pointer" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '250px', background: images['image_2'].isDeleted ? 'none' : `url(${images['image_2'].url}) 100% 100%`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
          <div className="bg-black" style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.5 }} />
          {!texts['text_29'].isDeleted && <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('text_29', 'text', texts['text_29'])
          }} className="cursor-pointer" style={{ position: 'relative', zIndex: 1, padding: '0 48px', textAlign: 'left', lineHeight: '1', fontWeight: 400, color: texts['text_29'].text_color, fontSize: texts['text_29'].text_size }}>
            {texts['text_29'].content}
          </div>}
        </div>
      </div>
    </div>
  )
}