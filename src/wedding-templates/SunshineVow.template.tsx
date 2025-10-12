"use client";

import React, { useState } from 'react';
import WeddingText from '../components/wedding/WeddingText';
import WeddingImage from '../components/wedding/WeddingImage';
import WeddingBackground from '../components/wedding/WeddingBackground';
import WeddingGoogleMap from '../components/wedding/WeddingGoogleMap';
import { DateIcon } from '@/components/icons/date';
import { LocationIcon } from '@/components/icons/location';
import CheckCircle from '@/components/icons/check_circle';
import useTemplateStore from '@/states/templates/state';
import { useParams, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

const SunshineVowTemplate: React.FC = () => {
  const params = useParams();
  const pathname = usePathname();
  // States for form
  const [name, setName] = useState('');
  const [wishes, setWishes] = useState('');
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");

  const { template: { configs: { texts, images, background_colors, url_maps, send_gifts } }, setSelectedComponent } = useTemplateStore();

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

  // Hero background with gradient overlay
  const heroBgUrl = '/templates/SunshineVow/background.png';

  return (
    <div className="font-['Inter',sans-serif] relative">
      {/* Hero Section */}
      <WeddingBackground
        background={heroBgUrl}
        className="min-h-[550px] flex items-end justify-center pb-20 relative"
        additionalStyle={{
          backgroundImage: `url('${heroBgUrl}')`,
          backgroundSize: '448px 306px',
          // backgroundPosition: 'left',
          backgroundRepeat: 'no-repeat',
        }}
      >
      </WeddingBackground>
      <div className="w-full flex items-center justify-center absolute top-[20px] left-1/2 -translate-x-1/2 z-1">
        <WeddingBackground
          onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('image_1', 'image', images['image_1'])
          }}
          background="/abc"
          additionalStyle={{
            width: "100%",
            margin: "0 20px",
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
          }} >
          <WeddingText
            onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('text_1', 'text', texts['text_1'])
            }}
            className="font-[400] mb-[30px] font-poisoned text-center" style={{ color: texts['text_1'].text_color, fontSize: texts['text_1'].text_size }} content={texts['text_1'].content} />
        </WeddingBackground>
      </div>

      {/* Photo Gallery */}
      <div className="px-[20px]">
        <div className="grid grid-cols-3 gap-2">
          <WeddingImage
            onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('image_2', 'image', images['image_2'])
            }}
            imageUrl={images['image_2'].url}
            alt="Wedding photo 1"
            className="w-full object-cover rounded-lg"
            width={120}
            height={120}
          />
          <WeddingImage
            onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('image_3', 'image', images['image_3'])
            }}
            imageUrl={images['image_3'].url}
            alt="Wedding photo 2"
            className="w-full object-cover rounded-lg"
            width={120}
            height={120}
          />
          <WeddingImage
            onClick={(e) => {
              e.stopPropagation();
              setSelectedComponent('image_4', 'image', images['image_4'])
            }}
            imageUrl={images['image_4'].url}
            alt="Wedding photo 3"
            className="w-full object-cover rounded-lg"
            width={120}
            height={120}
          />
        </div>
        <WeddingText
          content={texts['text_2'].content}
          onClick={() => setSelectedComponent('text_2', 'text', texts['text_2'])}
          className="mt-[4rem] font-post-no-bills-jaffna-extra-bold text-center mb-2" style={{ color: texts['text_2'].text_color, fontSize: texts['text_2'].text_size }}
        />
        <WeddingText
          content={texts['text_3'].content}
          onClick={() => setSelectedComponent('text_3', 'text', texts['text_3'])}
          className="font-[400] font-plus-jakarta-sans text-left" style={{ color: texts['text_3'].text_color, fontSize: texts['text_3'].text_size }}
        />
      </div>

      {/* Bride & Groom Profiles */}
      <div className="px-[20px] py-4">
        <div className="flex justify-center items-center gap-[20px]">
          <div className="text-center w-[50%]">
            <WeddingImage
              imageUrl={images['image_5'].url}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('image_5', 'image', images['image_5'])
              }}
              alt="Bride"
              className="rounded-full w-full object-cover mx-auto mb-2"
              width={170}
              height={172}
            />
            <WeddingText
              content={texts['text_4'].content}
              onClick={() => setSelectedComponent('text_4', 'text', texts['text_4'])}
              className="font-post-no-bills-jaffna-semi-bold" style={{ color: texts['text_4'].text_color, fontSize: texts['text_4'].text_size }}
            />
          </div>
          <div className="text-center w-[50%]">
            <WeddingImage
              imageUrl={images['image_5'].url}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('image_5', 'image', images['image_5'])
              }}
              alt="Groom"
              className="rounded-full w-full object-cover mx-auto mb-2"
              width={170}
              height={172}
            />
            <WeddingText
              content={texts['text_5'].content}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('text_5', 'text', texts['text_5'])
              }}
              className="font-post-no-bills-jaffna-semi-bold" style={{ color: texts['text_5'].text_color, fontSize: texts['text_5'].text_size }}
            />
          </div>
        </div>
      </div>

      {/* Our Wedding Section */}
      <div className="px-6 pt-6">
        <WeddingText
          content={texts['text_6'].content}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('text_6', 'text', texts['text_6'])
          }}
          className="font-post-no-bills-jaffna-extra-bold text-center" style={{ color: texts['text_6'].text_color, fontSize: texts['text_6'].text_size }}
        />
        <WeddingText
          content={texts['text_7'].content}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent('text_7', 'text', texts['text_7'])
          }}
          className="text-center mb-6 font-plus-jakarta-sans" style={{ color: texts['text_7'].text_color, fontSize: texts['text_7'].text_size }}
        />

        {/* Calendar */}
        <div className="bg-white mb-6">
          <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
            <div onClick={() => setSelectedComponent('text_8', 'text', texts['text_8'])} className="font-[700]" style={{ color: texts['text_8'].text_color, fontSize: texts['text_8'].text_size }}>{texts['text_8'].content}</div>
            <div onClick={() => setSelectedComponent('text_9', 'text', texts['text_9'])} className="font-[700]" style={{ color: texts['text_9'].text_color, fontSize: texts['text_9'].text_size }}>{texts['text_9'].content}</div>
            <div onClick={() => setSelectedComponent('text_10', 'text', texts['text_10'])} className="font-[700]" style={{ color: texts['text_10'].text_color, fontSize: texts['text_10'].text_size }}>{texts['text_10'].content}</div>
            <div onClick={() => setSelectedComponent('text_11', 'text', texts['text_11'])} className="font-[700]" style={{ color: texts['text_11'].text_color, fontSize: texts['text_11'].text_size }}>{texts['text_11'].content}</div>
            <div onClick={() => setSelectedComponent('text_12', 'text', texts['text_12'])} className="font-[700]" style={{ color: texts['text_12'].text_color, fontSize: texts['text_12'].text_size }}>{texts['text_12'].content}</div>
            <div onClick={() => setSelectedComponent('text_13', 'text', texts['text_13'])} className="font-[700]" style={{ color: texts['text_13'].text_color, fontSize: texts['text_13'].text_size }}>{texts['text_13'].content}</div>
            <div onClick={() => setSelectedComponent('text_14', 'text', texts['text_14'])} className="font-[700]" style={{ color: texts['text_14'].text_color, fontSize: texts['text_14'].text_size }}>{texts['text_14'].content}</div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            <div onClick={() => setSelectedComponent('text_15', 'text', texts['text_15'])} className="p-2 font-[400]" style={{ color: texts['text_15'].text_color, fontSize: texts['text_15'].text_size }}><div className="p-[5px]">{texts['text_15'].content}</div></div>
            <div onClick={() => setSelectedComponent('text_16', 'text', texts['text_16'])} className="p-2 font-[400]" style={{ color: texts['text_16'].text_color, fontSize: texts['text_16'].text_size }}><div className="p-[5px]">{texts['text_16'].content}</div></div>
            <div onClick={() => setSelectedComponent('text_17', 'text', texts['text_17'])} className="p-2 font-[400]" style={{ color: texts['text_17'].text_color, fontSize: texts['text_17'].text_size }}><div className="p-[5px]">{texts['text_17'].content}</div></div>
            <div onClick={() => setSelectedComponent('text_18', 'text', texts['text_18'])} className="p-2 font-[400]" style={{ color: texts['text_18'].text_color, fontSize: texts['text_18'].text_size }}><div className="p-[5px]">{texts['text_18'].content}</div></div>
            <div onClick={() => setSelectedComponent('text_19', 'text', texts['text_19'])} className="p-2 font-[700]" style={{ color: texts['text_19'].text_color, fontSize: texts['text_19'].text_size }}>
              <WeddingBackground onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('bg_color_1', 'background_color', background_colors['bg_color_1'])
              }}
                background={background_colors['bg_color_1'].color}
                className="flex items-center justify-center p-[5px] text-[15px]"
                additionalStyle={{ background: 'url("/templates/SunshineVow/heart-fill.svg")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}> {texts['text_19'].content} </WeddingBackground>
            </div>
            <div onClick={() => setSelectedComponent('text_20', 'text', texts['text_20'])} className="p-2 font-[400]" style={{ color: texts['text_20'].text_color, fontSize: texts['text_20'].text_size }}><div className="p-[5px]">{texts['text_20'].content}</div></div>
            <div onClick={() => setSelectedComponent('text_21', 'text', texts['text_21'])} className="p-2 font-[400]" style={{ color: texts['text_21'].text_color, fontSize: texts['text_21'].text_size }}><div className="p-[5px]">{texts['text_21'].content}</div></div>
          </div>
        </div>

        {/* Wedding Details */}
        <div className="p-4 mb-6">
          <div className="flex items-center gap-2">
            <DateIcon />
            <WeddingText onClick={() => setSelectedComponent('text_22', 'text', texts['text_22'])} content={texts['text_22'].content} className="font-plus-jakarta-sans" style={{ color: texts['text_22'].text_color, fontSize: texts['text_22'].text_size }} />
          </div>
          <WeddingText onClick={() => setSelectedComponent('text_23', 'text', texts['text_23'])} content={texts['text_23'].content} className="font-plus-jakarta-sans" style={{ color: texts['text_23'].text_color, fontSize: texts['text_23'].text_size }} />
          <WeddingText onClick={() => setSelectedComponent('text_24', 'text', texts['text_24'])} content={texts['text_24'].content} className="font-plus-jakarta-sans" style={{ color: texts['text_24'].text_color, fontSize: texts['text_24'].text_size }} />

          <div className="flex items-center gap-2 mt-4">
            <LocationIcon />
            <WeddingText onClick={() => setSelectedComponent('text_25', 'text', texts['text_25'])} content={texts['text_25'].content} className="font-plus-jakarta-sans" style={{ color: texts['text_25'].text_color, fontSize: texts['text_25'].text_size }} />
          </div>
          <WeddingText onClick={() => setSelectedComponent('text_26', 'text', texts['text_26'])} content={texts['text_26'].content} className="font-plus-jakarta-sans" style={{ color: texts['text_26'].text_color, fontSize: texts['text_26'].text_size }} />
          <WeddingText onClick={() => setSelectedComponent('text_27', 'text', texts['text_27'])} content={texts['text_27'].content} className="font-plus-jakarta-sans" style={{ color: texts['text_27'].text_color, fontSize: texts['text_27'].text_size }} />

          <div className="mt-4">
            <WeddingGoogleMap
              onClick={() => {
                // console.log('click', url_maps['map_1'].url)
                // window.open(url_maps['map_1'].url, '_blank')
                setSelectedComponent('map_1', 'url_map', url_maps['map_1'])
              }}
              className="w-full h-60 mt-4"
            />
          </div>
        </div>
      </div>

      <div className="px-10 pb-6">
        <WeddingText onClick={() => setSelectedComponent('text_28', 'text', texts['text_28'])} content={texts['text_28'].content} className="font-[400]" style={{ color: texts['text_28'].text_color, fontSize: texts['text_28'].text_size }} />
        <div className="flex items-center gap-2">
          <WeddingBackground onClick={() => setSelectedComponent('bg_color_2', 'background_color', background_colors['bg_color_2'])} background={background_colors['bg_color_2'].color} className={`rounded-[50%] p-4 ${background_colors['bg_color_2'].border_color === 'none' ? '' : `border border-[${background_colors['bg_color_2'].border_color}]`}`} />
          <WeddingBackground onClick={() => setSelectedComponent('bg_color_3', 'background_color', background_colors['bg_color_3'])} background={background_colors['bg_color_3'].color} className={`rounded-[50%] p-4 ${background_colors['bg_color_3'].border_color === 'none' ? '' : `border border-[${background_colors['bg_color_3'].border_color}]`}`} />
          <WeddingBackground onClick={() => setSelectedComponent('bg_color_4', 'background_color', background_colors['bg_color_4'])} background={background_colors['bg_color_4'].color} className={`rounded-[50%] p-4 ${background_colors['bg_color_4'].border_color === 'none' ? '' : `border border-[${background_colors['bg_color_4'].border_color}]`}`} />
        </div>
      </div>

      {/* Timeline Section */}
      <div className="px-10">
        <WeddingBackground onClick={(e) => { e.stopPropagation(); setSelectedComponent('bg_color_5', 'background_color', background_colors['bg_color_5']) }} background={background_colors['bg_color_5'].color} className={`px-6 py-8 rounded-[24px] ${background_colors['bg_color_5'].border_color === 'none' ? '' : `border border-[${background_colors['bg_color_5'].border_color}]`}`}>
          <WeddingText
            onClick={(e) => { e.stopPropagation(); setSelectedComponent('text_29', 'text', texts['text_29']) }}
            content={texts['text_29'].content}
            className="font-plus-jakarta-sans text-center mb-2 leading-[82%]" style={{ color: texts['text_29'].text_color, fontSize: texts['text_29'].text_size }}
          />

          <div className="p-4 flex flex-col items-center">
            <WeddingText onClick={(e) => { e.stopPropagation(); setSelectedComponent('text_30', 'text', texts['text_30']) }} content={texts['text_30'].content} className="font-plus-jakarta-sans" style={{ color: texts['text_30'].text_color, fontSize: texts['text_30'].text_size }} />
            <WeddingText onClick={(e) => { e.stopPropagation(); setSelectedComponent('text_31', 'text', texts['text_31']) }} content={texts['text_31'].content} className="mb-2 font-plus-jakarta-sans" style={{ color: texts['text_31'].text_color, fontSize: texts['text_31'].text_size }} />
            <WeddingText onClick={(e) => { e.stopPropagation(); setSelectedComponent('text_32', 'text', texts['text_32']) }} content={texts['text_32'].content} className="font-[600] font-plus-jakarta-sans" style={{ color: texts['text_32'].text_color, fontSize: texts['text_32'].text_size }} />
          </div>

          <div className="p-4 flex flex-col items-center">
            <WeddingText onClick={(e) => { e.stopPropagation(); setSelectedComponent('text_33', 'text', texts['text_33']) }} content={texts['text_33'].content} className="font-plus-jakarta-sans" style={{ color: texts['text_33'].text_color, fontSize: texts['text_33'].text_size }} />
            <WeddingText onClick={(e) => { e.stopPropagation(); setSelectedComponent('text_34', 'text', texts['text_34']) }} content={texts['text_34'].content} className="mb-2 font-plus-jakarta-sans" style={{ color: texts['text_34'].text_color, fontSize: texts['text_34'].text_size }} />
            <WeddingText onClick={(e) => { e.stopPropagation(); setSelectedComponent('text_35', 'text', texts['text_35']) }} content={texts['text_35'].content} className="font-[600] font-plus-jakarta-sans" style={{ color: texts['text_35'].text_color, fontSize: texts['text_35'].text_size }} />
          </div>

          <div className="p-4 flex flex-col items-center">
            <WeddingText onClick={(e) => { e.stopPropagation(); setSelectedComponent('text_36', 'text', texts['text_36']) }} content={texts['text_36'].content} className="font-plus-jakarta-sans" style={{ color: texts['text_36'].text_color, fontSize: texts['text_36'].text_size }} />
            <WeddingText onClick={(e) => { e.stopPropagation(); setSelectedComponent('text_37', 'text', texts['text_37']) }} content={texts['text_37'].content} className="mb-2 font-plus-jakarta-sans" style={{ color: texts['text_37'].text_color, fontSize: texts['text_37'].text_size }} />
            <WeddingText onClick={(e) => { e.stopPropagation(); setSelectedComponent('text_38', 'text', texts['text_38']) }} content={texts['text_38'].content} className="font-[600] font-plus-jakarta-sans" style={{ color: texts['text_38'].text_color, fontSize: texts['text_38'].text_size }} />
          </div>

          <div className="p-4 flex flex-col items-center">
            <WeddingText onClick={(e) => { e.stopPropagation(); setSelectedComponent('text_39', 'text', texts['text_39']) }} content={texts['text_39'].content} className="font-plus-jakarta-sans" style={{ color: texts['text_39'].text_color, fontSize: texts['text_39'].text_size }} />
            <WeddingText onClick={(e) => { e.stopPropagation(); setSelectedComponent('text_40', 'text', texts['text_40']) }} content={texts['text_40'].content} className="mb-2 font-plus-jakarta-sans" style={{ color: texts['text_40'].text_color, fontSize: texts['text_40'].text_size }} />
            <WeddingText onClick={(e) => { e.stopPropagation(); setSelectedComponent('text_41', 'text', texts['text_41']) }} content={texts['text_41'].content} className="font-[600] font-plus-jakarta-sans" style={{ color: texts['text_41'].text_color, fontSize: texts['text_41'].text_size }} />
          </div>
        </WeddingBackground>
      </div>

      {/* Gift Giving Section */}
      <div className="px-10 py-8">
        <WeddingBackground background="white" className="px-6 py-8">
          <WeddingText
            onClick={() => setSelectedComponent('text_50', 'text', texts['text_50'])}
            content={texts['text_50'].content}
            className="font-plus-jakarta-sans font-[400] text-center mb-4" style={{ color: texts['text_50'].text_color, fontSize: texts['text_50'].text_size }}
          />
          <WeddingText
            onClick={() => setSelectedComponent('text_51', 'text', texts['text_51'])}
            content={texts['text_51'].content}
            className="font-[600] font-plus-jakarta-sans text-center mb-6" style={{ color: texts['text_51'].text_color, fontSize: texts['text_51'].text_size }}
          />

          <div className="text-center">
            <div className="bg-white rounded-lg inline-block mb-4">
              <WeddingImage
                onClick={() => setSelectedComponent('image_7', 'image', images['image_7'])}
                imageUrl={images['image_7'].url}
                alt="QR Code"
                className="w-[200px] h-[200px] mx-auto"
                width={200}
                height={200}
              />
            </div>
            <WeddingText
              onClick={() => setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])}
              content={send_gifts['send_gift_1'].content} className="cursor-pointer w-[fit-content] inline-block px-6 py-2 rounded-[24px] font-[600] font-plus-jakarta-sans text-center mb-5" style={{ color: send_gifts['send_gift_1'].text_color, fontSize: send_gifts['send_gift_1'].text_size, backgroundColor: send_gifts['send_gift_1'].background_color, borderColor: send_gifts['send_gift_1'].border_color }} />
            <WeddingText
              onClick={() => setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])}
              content={send_gifts['send_gift_1'].bank_name} style={{ color: send_gifts['send_gift_1'].text_bank_color, fontSize: send_gifts['send_gift_1'].text_bank_size }} className="text-[15px] font-[600] font-plus-jakarta-sans text-center" />
            <WeddingText
              onClick={() => setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])}
              content={send_gifts['send_gift_1'].bank_holder} style={{ color: send_gifts['send_gift_1'].text_bank_color, fontSize: send_gifts['send_gift_1'].text_bank_size }} className="text-[15px] font-[600] font-plus-jakarta-sans text-center" />
            <WeddingText
              onClick={() => setSelectedComponent('send_gift_1', 'send_gift', send_gifts['send_gift_1'])}
              content={send_gifts['send_gift_1'].bank_number} style={{ color: send_gifts['send_gift_1'].text_bank_color, fontSize: send_gifts['send_gift_1'].text_bank_size }} className="text-[15px] text-[#787878] font-[600] font-plus-jakarta-sans text-center mb-2" />
          </div>
        </WeddingBackground>
      </div>
      {/* Footer */}
      <WeddingBackground
        onClick={() => setSelectedComponent('image_6', 'image', images['image_6'])}
        background="#1F2937" additionalStyle={{ backgroundImage: `url('${images['image_6'].url}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="text-white px-6 py-8 text-center">
        <WeddingText
          onClick={() => setSelectedComponent('text_52', 'text', texts['text_52'])}
          content={texts['text_52'].content}
          className="font-plus-jakarta-sans font-[600] my-3" style={{ color: texts['text_52'].text_color, fontSize: texts['text_52'].text_size }}
        />
        <WeddingText
          onClick={() => setSelectedComponent('text_53', 'text', texts['text_53'])}
          content={texts['text_53'].content}
          className="w-[70%] mx-auto font-[600] font-plus-jakarta-sans mb-4" style={{ color: texts['text_53'].text_color, fontSize: texts['text_53'].text_size }}
        />

      </WeddingBackground>
      <div className="w-full py-[1rem] text-center bg-[#484848] font-[600] text-[14px] text-[#FFFFFF]">
        Made by
        <span className="font-plus-jakarta-sans font-[800] ml-[0.2rem]">
          Mimy Wedding
        </span>
      </div>
    </div>
  );
};

export default SunshineVowTemplate;
