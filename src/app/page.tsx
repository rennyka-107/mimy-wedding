"use client";

import React from "react";
import Banner from "@/components/wedding/Banner";
import TemplateList, { TypeTemplate } from "@/components/wedding/TemplateList";
import FrequentlyAskedQuestions from "@/components/wedding/FrequentlyAskedQuestions";
import Contact from "@/components/wedding/Contact";
import ArrowRight from "@/components/icons/arrow_right";

const templates: TypeTemplate[] = [
  {
    id: "sunset_glow",
    name: 'Sunset Glow',
    url: "/images/sunset_glow.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 30000,
    
  },
  {
    id: "sunshine_vow",
    name: 'Sunshine Vow',
    url: "/images/sunshine_vow.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 30000,
    
  },
  {
    id: "meadow_bliss",
    name: 'Meadow Bliss',
    url: "/images/meadow_bliss.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 30000,
    
  },
  {
    id: "emerald_harmony",
    name: 'Emerald Harmony',
    url: "/images/emerald_harmony.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 60000,
    
  },
  {
    id: "shining_love",
    name: 'Shining Love',
    url: "/images/shining_love.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 60000,
    
  },
  {
    id: "forest_charm",
    name: 'Forest Charm',
    url: "/images/forest_charm.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,
    
  },
  {
    id: "jade_whisper",
    name: 'Jade Whisper',
    url: "/images/jade_whisper.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,
    
  },
  {
    id: "olive_serenity",
    name: 'Olive Serenity',
    url: "/images/olive_serenity.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,
    
  },
  {
    id: "peach_promise",
    name: 'Peach Promise',
    url: "/images/peach_promise.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,
    
  },
  {
    id: "ocean_embrace",
    name: 'Ocean Embrace',
    url: "/images/ocean_embrace.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,
    
  },
  // {
  //   id: "honey_grace",
  //   name: 'Honey Grace',
  //   url: "/images/honey_grace.png",
  //   is_free: true,
  //   image_quantity: 5,
  //   theme_color: "yellow",
  //   price: 0,
    
  // },
  // {
  //   id: "sunset_glow",
  //   name: 'Sunset Glow',
  //   url: "/images/sunset_glow.png",
  //   is_free: true,
  //   image_quantity: 5,
  //   theme_color: "yellow",
  //   price: 0,
    
  // },
  // {
  //   id: "ruby_flame",
  //   name: 'Ruby Flame',
  //   url: "/images/ruby_flame.png",
  //   is_free: true,
  //   image_quantity: 5,
  //   theme_color: "yellow",
  //   price: 0,
    
  // },
  // {
  //   id: "ocean_embrace",
  //   name: 'Ocean Embrace',
  //   url: "/images/ocean_embrace.png",
  //   is_free: true,
  //   image_quantity: 5,
  //   theme_color: "yellow",
  //   price: 0,
    
  // },
  // {
  //   id: "meadow_bliss",
  //   name: 'Meadow Bliss',
  //   url: "/images/meadow_bliss.png",
  //   is_free: true,
  //   image_quantity: 5,
  //   theme_color: "yellow",
  //   price: 0,
    
  // },
  // {
  //   id: "moss_journey",
  //   name: 'Moss Journey',
  //   url: "/images/moss_journey.png",
  //   is_free: true,
  //   image_quantity: 5,
  //   theme_color: "yellow",
  //   price: 0,
    
  // },
  // {
  //   id: "emerald_harmony",
  //   name: 'Emerald Harmony',
  //   url: "/images/emerald_harmony.png",
  //   is_free: true,
  //   image_quantity: 5,
  //   theme_color: "yellow",
  //   price: 0,
    
  // },
  // {
  //   id: "amethyst_glow",
  //   name: 'Amethyst Glow',
  //   url: "/images/amethyst_glow.png",
  //   is_free: true,
  //   image_quantity: 5,
  //   theme_color: "yellow",
  //   price: 0,
    
  // },
  // {
  //   id: "azure_sky",
  //   name: 'Azure Sky',
  //   url: "/images/azure_sky.png",
  //   is_free: true,
  //   image_quantity: 5,
  //   theme_color: "yellow",
  //   price: 0,
    
  // },
  // {
  //   id: "golden_bloom",
  //   name: 'Golden Bloom',
  //   url: "/images/golden_bloom.png",
  //   is_free: true,
  //   image_quantity: 5,
  //   theme_color: "yellow",
  //   price: 0,
    
  // },
  // {
  //   id: "shining_love",
  //   name: 'Shining Love',
  //   url: "/images/shining_love.png",
  //   is_free: true,
  //   image_quantity: 5,
  //   theme_color: "yellow",
  //   price: 0,
    
  // },
]

export default function WeddingPage() {
  return (
    <div className="bg-[#FFFFFF]">
      {/* <Header /> */}
      <Banner />
      <div className="w-full px-4 sm:px-6 lg:px-[10%]">
        <TemplateList templates={templates} description={<div className="font-montserrat flex justify-center items-center gap-2 text-[18px]">Hãy chọn mẫu thiệp để bắt đầu hành trình thiết kế lời mời  hoàn hảo.
          
          <span onClick={() => {
          window.open("/list-template", "_blank");
        }} className="font-montserrat cursor-pointer font-[600] text-[#FD8C06] text-[18px]"> Xem tất cả
        </span></div>} />
        <FrequentlyAskedQuestions />
        <Contact />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
