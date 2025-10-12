"use client";

import React, { useState } from "react";
import Banner from "@/components/wedding/Banner";
import TemplateList, { TypeTemplate } from "@/components/wedding/TemplateList";
import FrequentlyAskedQuestions from "@/components/wedding/FrequentlyAskedQuestions";
import Contact from "@/components/wedding/Contact";
import ArrowRight from "@/components/icons/arrow_right";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ProfileMenu from "@/components/popup/ProfileMenu";
import NavItem from "@/components/navigation/NavItem";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/wedding/Header";

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
  const { user, openLoginModal } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to close mobile menu
  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // check if route is home page "/"

  // const pathname = usePathname();
  // console.log(pathname, "pathname")

  return (
    <div className="bg-[#FFFFFF]">
      {/* <Header /> */}
      <div className="absolute top-0 z-46 w-full">
        <Header />
        <div className="absolute inset-0 bg-[#F9F9F9] z-48"></div>
      </div>
      <svg className="absolute top-0 z-49 w-full xs:h-[800px] sm:h-full" width="1440" height="825" viewBox="0 0 1440 825" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="1" filter="url(#filter0_f_642_1849)">
          <path d="M945 -0.49998C945 59.3063 921.242 116.663 878.953 158.953C836.663 201.242 779.306 225 719.5 225C659.694 225 602.337 201.242 560.047 158.953C517.758 116.663 494 59.3064 494 -0.499946L945 -0.49998Z" fill="#FFE6AD" />
          <path d="M1440.5 225C1410.89 225 1381.56 219.167 1354.2 207.835C1326.85 196.502 1301.99 179.892 1281.05 158.953C1260.11 138.013 1243.5 113.154 1232.17 85.7951C1220.83 58.4362 1215 29.1131 1215 -0.5L1440.5 -0.49998V225Z" fill="#FFE6AD" />
          <path d="M226 -0.49998C226 29.1131 220.167 58.4362 208.835 85.7951C197.502 113.154 180.892 138.013 159.953 158.953C139.013 179.892 114.154 196.502 86.7951 207.835C59.4362 219.167 30.1131 225 0.5 225L0.50001 -0.49998H226Z" fill="#FFE6AD" />
        </g>
        <defs>
          <filter id="filter0_f_642_1849" x="-599.5" y="-600.5" width="2640" height="1425.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="300" result="effect1_foregroundBlur_642_1849" />
          </filter>
        </defs>
      </svg>
      <Banner />
      <div className="w-full px-4 sm:px-6 lg:px-[10%] mt-0">
        <label
          // initial={{ opacity: 0 }}
          // whileInView={{ opacity: 1 }}
          // transition={{ duration: 0.5, delay: 0.3 }}
          // viewport={{ once: true }}
          className="text-[#383637] flex w-full justify-center pt-0 sm:pt-24 font-montserrat-alter font-[700] text-[36px] mt-0  md:mt-40 lg:mt-35 xl:mt-10 sm:text-[44px] lg:text-[46px] leading-[100%]"
        >
          mẫu thiệp.
        </label>

        <div
          // initial={{ opacity: 0 }}
          // whileInView={{ opacity: 1 }}
          // transition={{ duration: 0.5, delay: 0.5 }}
          // viewport={{ once: true }}
          className="mt-[16px] text-[#77716F] font-primary font-[500] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]"
        >
          <div className="text-[#898A85] font-montserrat flex justify-center items-center gap-2 text-center flex-wrap lg:flex-nowrap px-4">Hãy chọn mẫu thiệp để bắt đầu hành trình thiết kế lời mời  hoàn hảo.
            <span onClick={() => {
              window.open("/list-template", "_blank");
            }} className="font-montserrat cursor-pointer font-[600] text-[#FD8C06] lg:text-[20px] md:text-[18px] sm:text-[14px]"> Xem tất cả
            </span></div>
        </div>

        <TemplateList templates={templates} description={<div className="text-[#898A85] font-montserrat flex justify-center items-center gap-2 text-center flex-wrap lg:flex-nowrap px-4">Hãy chọn mẫu thiệp để bắt đầu hành trình thiết kế lời mời  hoàn hảo.
          <span onClick={() => {
            window.open("/list-template", "_blank");
          }} className="font-montserrat cursor-pointer font-[600] text-[#FD8C06] lg:text-[20px] md:text-[18px] sm:text-[14px]"> Xem tất cả
          </span></div>} />
        <FrequentlyAskedQuestions />
        <Contact />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
