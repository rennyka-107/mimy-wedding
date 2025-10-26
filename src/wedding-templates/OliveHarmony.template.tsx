"use client";
import { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import useTemplateStore, { Timeline } from "@/states/templates/state";
import toast from "react-hot-toast";
import Image from "next/image";
import { originalOliveHarmonyState } from "@/states/origin_state/olive_harmony";
import WeddingGoogleMap from "@/components/wedding/WeddingGoogleMap";
import CheckCircle from "@/components/icons/check_circle";
import { templateOliveHarmony } from "@/types/wedding.type";

export default function OliveHarmonyTemplate({ isPublicPage = false }: { isPublicPage: boolean }) {
  const params = useParams();
  const pathname = usePathname();
  // States for form
  const [name, setName] = useState('');
  const [wishes, setWishes] = useState('');
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const { template: { configs: { texts, images, background_colors, url_maps, send_gifts, timeline } }, setSelectedComponent, updateTemplate } = useTemplateStore();

  useEffect(() => {
    if (!isPublicPage) updateTemplate(templateOliveHarmony)
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
      <img src={images['left'] ? images['left'].url : '/images/logo.png'} alt="Hero" className="absolute top-[200px] left-0 object-cover" />
      <img src={images['right'] ? images['right'].url : '/images/logo.png'} alt="Hero" className="absolute top-[30px] right-0 object-cover" />
      <div className="w-full pt-[75px]">
        {images['image_1'] && !images['image_1'].isDeleted && <div className="w-[263px] h-[263px] mx-auto rounded-[50%] overflow-hidden">
          <Image unoptimized onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('image_1', 'image', images['image_1'])
          }} src={images['image_1'] ? images['image_1'].url : '/images/logo.png'} alt="Hero" width={120} height={120} className="cursor-pointer object-cover w-full h-full" />
        </div>}
        {texts['text_1'] && !texts['text_1'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_1', 'text', texts['text_1'])
        }} className="cursor-pointer font-[700] text-center mt-[1rem] leading-[2] tracking-[0%]" style={{ color: texts['text_1'].text_color, fontSize: texts['text_1'].text_size }}>{texts['text_1'] && texts['text_1'].content}</div>}
        {texts['text_2'] && !texts['text_2'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_2', 'text', texts['text_2'])
        }} className="cursor-pointer font-[700] text-center leading-0 tracking-[0%]" style={{ color: texts['text_2'].text_color, fontSize: texts['text_2'].text_size }}>{texts['text_2'] && texts['text_2'].content}</div>}
        {texts['text_3'] && !texts['text_3'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_3', 'text', texts['text_3'])
        }} className="cursor-pointer px-[48px] font-[700] text-center mt-8" style={{ color: texts['text_3'].text_color, fontSize: texts['text_3'].text_size }}>{texts['text_3'] && texts['text_3'].content}</div>}
        {images['image_2'] && !images['image_2'].isDeleted && <div className="px-[48px] mt-[2rem]">
          <Image unoptimized onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('image_2', 'image', images['image_2'])
          }} src={images['image_2'] ? images['image_2'].url : '/images/logo.png'} alt="Hero" width={120} height={120} className="cursor-pointer object-cover rounded-[16px] w-full h-full" />
        </div>}
        <div className="px-[48px] flex justify-between mt-[2rem]">
          <div className="flex flex-col gap-[4px] flex-1">
            {texts['text_4'] && !texts['text_4'].isDeleted && <div onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('text_4', 'text', texts['text_4'])
            }} className="cursor-pointer" style={{ color: texts['text_4'].text_color, fontSize: texts['text_4'].text_size }}>{texts['text_4'].content}</div>}
            {texts['text_5'] && !texts['text_5'].isDeleted && <div onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('text_5', 'text', texts['text_5'])
            }} className="cursor-pointer" style={{ color: texts['text_5'].text_color, fontSize: texts['text_5'].text_size }}>{texts['text_5'].content}</div>}
            {texts['text_6'] && !texts['text_6'].isDeleted && <div onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('text_6', 'text', texts['text_6'])
            }} className="cursor-pointer" style={{ color: texts['text_6'].text_color, fontSize: texts['text_6'].text_size }}>{texts['text_6'].content}</div>}
          </div>
          <div className="flex flex-col gap-[4px] items-end flex-1">
            {texts['text_7'] && !texts['text_7'].isDeleted && <div onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('text_7', 'text', texts['text_7'])
            }} className="cursor-pointer" style={{ color: texts['text_7'].text_color, fontSize: texts['text_7'].text_size }}>{texts['text_7'].content}</div>}
            {texts['text_8'] && !texts['text_8'].isDeleted && <div onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('text_8', 'text', texts['text_8'])
            }} className="cursor-pointer" style={{ color: texts['text_8'].text_color, fontSize: texts['text_8'].text_size }}>{texts['text_8'].content}</div>}
            {texts['text_9'] && !texts['text_9'].isDeleted && <div onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('text_9', 'text', texts['text_9'])
            }} className="cursor-pointer" style={{ color: texts['text_9'].text_color, fontSize: texts['text_9'].text_size }}>{texts['text_9'].content}</div>}
          </div>
        </div>
        {texts['text_10'] && !texts['text_10'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_10', 'text', texts['text_10'])
        }} className="cursor-pointer" style={{ marginTop: '2rem', textAlign: 'center', fontWeight: 700, color: texts['text_10'].text_color, fontSize: texts['text_10'].text_size }}>{texts['text_10'].content}</div>}
        {texts['text_11'] && !texts['text_11'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_11', 'text', texts['text_11'])
        }} className="cursor-pointer" style={{ padding: '0 48px', textAlign: 'center', fontWeight: 500, color: texts['text_11'].text_color, fontSize: texts['text_11'].text_size }}>{texts['text_11'].content}</div>}
        {texts['text_12'] && !texts['text_12'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_12', 'text', texts['text_12'])
        }} className="cursor-pointer" style={{ fontFamily: 'WindSong', padding: '0 48px', marginTop: "12px", textAlign: 'center', fontWeight: 500, color: texts['text_12'].text_color, fontSize: texts['text_12'].text_size }}>{texts['text_12'].content}</div>}
        {texts['text_13'] && !texts['text_13'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_13', 'text', texts['text_13'])
        }} className="cursor-pointer" style={{ fontFamily: 'WindSong', padding: '0 48px', textAlign: 'center', fontWeight: 500, color: texts['text_13'].text_color, fontSize: texts['text_13'].text_size }}>{texts['text_13'].content}</div>}
        {texts['text_14'] && !texts['text_14'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_14', 'text', texts['text_14'])
        }} className="cursor-pointer" style={{ fontFamily: 'WindSong', padding: '0 48px', textAlign: 'center', fontWeight: 500, color: texts['text_14'].text_color, fontSize: texts['text_14'].text_size }}>{texts['text_14'].content}</div>}
        {texts['text_15'] && !texts['text_15'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_15', 'text', texts['text_15'])
        }} className="cursor-pointer" style={{ padding: '0 48px', marginTop: "42px", textAlign: 'center', fontWeight: 500, color: texts['text_15'].text_color, fontSize: texts['text_15'].text_size }}>{texts['text_15'].content}</div>}
        {texts['text_16'] && !texts['text_16'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_16', 'text', texts['text_16'])
        }} className="cursor-pointer" style={{ padding: '0 48px', textAlign: 'center', fontWeight: 500, color: texts['text_16'].text_color, fontSize: texts['text_16'].text_size }}>{texts['text_16'].content}</div>}
        {texts['text_17'] && !texts['text_17'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_17', 'text', texts['text_17'])
        }} className="cursor-pointer" style={{ padding: '0 48px', marginTop: "22px", textAlign: 'center', fontWeight: 500, color: texts['text_17'].text_color, fontSize: texts['text_17'].text_size }}>{texts['text_17'].content}</div>}
        {texts['text_18'] && !texts['text_18'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_18', 'text', texts['text_18'])
        }} className="cursor-pointer" style={{ padding: '0 48px', textAlign: 'center', fontWeight: 500, color: texts['text_18'].text_color, fontSize: texts['text_18'].text_size }}>{texts['text_18'].content}</div>}
        {texts['text_19'] && !texts['text_19'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_19', 'text', texts['text_19'])
        }} className="cursor-pointer" style={{ padding: '0 48px', textAlign: 'center', fontWeight: 500, color: texts['text_19'].text_color, fontSize: texts['text_19'].text_size }}>{texts['text_19'].content}</div>}
        {texts['text_20'] && !texts['text_20'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_20', 'text', texts['text_20'])
        }} className="cursor-pointer" style={{ padding: '0 48px', marginTop: "24px", textAlign: 'center', fontWeight: 500, color: texts['text_20'].text_color, fontSize: texts['text_20'].text_size }}>{texts['text_20'].content}</div>}
        <div className="mt-[8px] flex justify-center items-center gap-[10px]">
          <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('bg_color_1', 'background_color', background_colors['bg_color_1'])
          }} className="cursor-pointer" style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: background_colors['bg_color_1'].isDeleted ? 'none' : background_colors['bg_color_1'].color, border: background_colors['bg_color_1'].border_color === 'none' ? 'none' : `1px solid ${background_colors['bg_color_1'].border_color}` }} />
          <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('bg_color_2', 'background_color', background_colors['bg_color_2'])
          }} className="cursor-pointer" style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: background_colors['bg_color_2'].isDeleted ? 'none' : background_colors['bg_color_2'].color, border: background_colors['bg_color_2'].border_color === 'none' ? 'none' : `1px solid ${background_colors['bg_color_2'].border_color}` }} />
          <div onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('bg_color_4', 'background_color', background_colors['bg_color_4'])
          }} className="cursor-pointer" style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: background_colors['bg_color_4'].isDeleted ? 'none' : background_colors['bg_color_4'].color, border: background_colors['bg_color_4'].border_color === 'none' ? 'none' : `1px solid ${background_colors['bg_color_4'].border_color}` }} />
        </div>
        {texts['text_21'] && !texts['text_21'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_21', 'text', texts['text_21'])
        }} className="cursor-pointer" style={{ padding: '0 48px', marginTop: "24px", textAlign: 'center', fontWeight: 500, color: texts['text_21'].text_color, fontSize: texts['text_21'].text_size }}>{texts['text_21'].content}
        </div>}
        {url_maps['map_1'] && !url_maps['map_1'].isDeleted && <div className="flex justify-center">
          <WeddingGoogleMap
            onClick={() => {

              setSelectedComponent('map_1', 'url_map', url_maps['map_1'])
            }}
            className="w-full h-60 mt-4"
          />
        </div>}
        {texts['text_22'] && !texts['text_22'].isDeleted && <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('text_22', 'text', texts['text_22'])
        }} className="cursor-pointer" style={{ padding: '0 48px', marginTop: "24px", textAlign: 'left', fontWeight: 700, color: texts['text_22'].text_color, fontSize: texts['text_22'].text_size }}>{texts['text_22'].content}
        </div>}
        <div className="px-[48px]" onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('timeline', 'timeline', timeline as Timeline[])
        }}>
          {timeline && timeline.length > 0 && timeline?.map((timeline, index) => (
            <div key={index} className="cursor-pointer flex items-center gap-[1rem] py-[12px]" style={{ borderStyle: 'dashed', borderBottomWidth: '1px', borderColor: '#8BB087' }}>
              <div className="rounded-[50%] w-[32px] h-[32px] flex items-center justify-center bg-[#F8F7F7] text-[#719D6D] font-[700]">
                {index + 1}
              </div>
              <div className="flex flex-col">
                <div className="cursor-pointer" style={{ textAlign: 'left', fontWeight: 500, color: timeline.datetime.text_color, fontSize: timeline.datetime.text_size }}>{timeline.datetime.content}</div>
                <div className="cursor-pointer" style={{ textAlign: 'left', fontWeight: 700, color: timeline.title.text_color, fontSize: timeline.title.text_size }}>{timeline.title.content}</div>
              </div>
            </div>
          ))}

        </div>
        <div className="px-[48px] py-[36px] mt-[32px]">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              {texts['text_37'] && !texts['text_37'].isDeleted && <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('text_37', 'text', texts['text_37'])
              }} className="cursor-pointer" style={{ fontFamily: "WindSong", textAlign: 'left', lineHeight: '1', fontWeight: 400, color: texts['text_37']?.text_color ?? '#000', fontSize: texts['text_37']?.text_size ?? '16px' }}>
                {texts['text_37']?.content ?? ''}
              </div>}
              {send_gifts['send_gift_1'] && !send_gifts['send_gift_1'].isDeleted && <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
              }} className="cursor-pointer" style={{ marginTop: "1rem", textAlign: 'left', lineHeight: '1', fontWeight: 500, color: send_gifts['send_gift_1'].text_bank_color, fontSize: send_gifts['send_gift_1'].text_bank_size }}>
                {send_gifts['send_gift_1'].bank_name}
              </div>}
              {send_gifts['send_gift_1'] && !send_gifts['send_gift_1'].isDeleted && <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
              }} className="cursor-pointer" style={{ marginTop: "0.2rem", textAlign: 'left', lineHeight: '1', fontWeight: 500, color: send_gifts['send_gift_1'].text_bank_color, fontSize: send_gifts['send_gift_1'].text_bank_size }}>
                {send_gifts['send_gift_1'].bank_number}
              </div>}
              {send_gifts['send_gift_1'] && !send_gifts['send_gift_1'].isDeleted && <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
              }} className="cursor-pointer" style={{ marginTop: "0.2rem", textAlign: 'left', lineHeight: '1', fontWeight: 500, color: send_gifts['send_gift_1'].text_bank_color, fontSize: send_gifts['send_gift_1'].text_bank_size }}>
                {send_gifts['send_gift_1'].bank_holder}
              </div>}
            </div>
            <div>
              <div className="flex flex-col items-center gap-[10px]">
                {images['image_4'] && !images['image_4'].isDeleted && <Image onClick={(e) => {
                  e.stopPropagation();
                  setSelectedComponent('image_4', 'image', images['image_4'])
                }} src={images['image_4'].url} alt={images['image_4'].id} width={100} height={100} style={{ width: '80px', height: '80px' }} />}
                {send_gifts['send_gift_1'] && !send_gifts['send_gift_1'].isDeleted && <div onClick={(e) => {
                  e.stopPropagation();
                  setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])
                }} className="cursor-pointer w-[max-content] px-[20px] py-[4px] text-center rounded-[24px]" style={{ backgroundColor: send_gifts['send_gift_1'].background_color, border: `1px solid ${send_gifts['send_gift_1'].border_color}`, textAlign: 'center', fontWeight: 700, color: send_gifts['send_gift_1'].text_color, fontSize: send_gifts['send_gift_1'].text_size }}>{send_gifts['send_gift_1'].content}</div>}
              </div>
            </div>
          </div>
        </div>
        <div onClick={(e) => {
          e.stopPropagation();
          setSelectedComponent('image_5', 'image', images['image_5'])
        }} className="cursor-pointer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '200px', background: images['image_5'].isDeleted ? 'none' : `url(${images['image_5'].url}) 100% 100%`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
          {texts['text_38'] && !texts['text_38'].isDeleted && <div style={{ padding: '0 48px', textAlign: 'left', lineHeight: '1', fontWeight: 400, color: texts['text_38']?.text_color ?? '#000', fontSize: texts['text_38']?.text_size ?? '16px' }}>
            {texts['text_38']?.content ?? ''}
          </div>}
        </div>
      </div>
    </div>
  )
}