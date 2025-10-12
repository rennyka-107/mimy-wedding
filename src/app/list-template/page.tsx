
import TemplateList, { TypeTemplate } from "@/components/wedding/TemplateList";

const templates: TypeTemplate[] = [
  {
    id: "olive_harmony",
    name: 'Olive Harmony',
    url: "/images/olive_harmony.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,

  },
  {
    id: "golden_bond",
    name: 'Golden Bond',
    url: "/images/golden_bond.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,

  },
  {
    id: "ruby_heart",
    name: 'Ruby Heart',
    url: "/images/ruby_heart.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,

  },
  {
    id: "blush_love",
    name: 'Blush Love',
    url: "/images/blush_love.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,

  },
  {
    id: "sunshine_vow",
    name: 'Sunshine Vow',
    url: "/images/sunshine_vow.png",
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
    id: "lavender_dream",
    name: 'Lavender Dream',
    url: "/images/lavender_dream.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,

  },
  {
    id: "honey_grace",
    name: 'Honey Grace',
    url: "/images/honey_grace.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,

  },
  {
    id: "sunset_glow",
    name: 'Sunset Glow',
    url: "/images/sunset_glow.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,

  },
  {
    id: "ruby_flame",
    name: 'Ruby Flame',
    url: "/images/ruby_flame.png",
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
  {
    id: "meadow_bliss",
    name: 'Meadow Bliss',
    url: "/images/meadow_bliss.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,

  },
  {
    id: "moss_journey",
    name: 'Moss Journey',
    url: "/images/moss_journey.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,

  },
  {
    id: "emerald_harmony",
    name: 'Emerald Harmony',
    url: "/images/emerald_harmony.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,

  },
  {
    id: "amethyst_glow",
    name: 'Amethyst Glow',
    url: "/images/amethyst_glow.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,

  },
  {
    id: "azure_sky",
    name: 'Azure Sky',
    url: "/images/azure_sky.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,

  },
  {
    id: "golden_bloom",
    name: 'Golden Bloom',
    url: "/images/golden_bloom.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,

  },
  {
    id: "shining_love",
    name: 'Shining Love',
    url: "/images/shining_love.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 0,

  },
]

export default function ListTemplatePage() {
  return (
    <div className="w-full bg-[#FFFFFF] px-0 md:px-[10%] py-10 md:py-[50px]">
      <div>
        <div className="flex flex-col justify-center items-center md:items-center gap-4 mx-[50px]">
          <div>
            <span className="text-[#383637] block font-montserrat-alter font-[700] text-[28px] sm:text-[44px] lg:text-[46px] leading-[100%] w-full text-center">
              danh sách thiệp.
            </span>
            <span className="text-[#898A85] font-montserrat block pt-3 w-full text-center text-[14px] md:text-[16px]">
              Hãy chọn mẫu thiệp và viết lên lời mời của bạn.
            </span>
          </div>
          <div className="bg-[#f9f9f9] justify-center rounded-[8px] border border-[#f9f9f9] px-1 md:px-2 py-2 md:py-3 w-fit md:w-auto flex flex-wrap">
            <span className="px-2 md:px-4 py-2 bg-white rounded-[4px] font-[600] text-[#383637] text-[14px]">Tất cả (3)</span>
            <span className="px-2 md:px-4 py-2 bg-[#f9f9f9] rounded-[4px] text-[14px] text-[#383637]">Thiệp cưới (2)</span>
            <span className="px-2 md:px-4 py-2 bg-[#f9f9f9] rounded-[4px] text-[14px] text-[#383637]">Khác (1)</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between pt-6 mx-[50px] gap-4">
          <div className="flex gap-2 w-full ">
            <div className="flex justify-center items-center px-4 py-2 bg-[#f9f9f9] rounded-[4px] text-[14px] w-full md:w-fit h-fit">
              <span className="pr-2 font-[600] text-[#383637]">Mức giá</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 4.5L6 7.5L3 4.5" stroke="#383637" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex justify-center items-center px-4 py-2 bg-[#f9f9f9] rounded-[4px] text-[14px] w-full md:w-fit h-fit">
              <span className="pr-2 font-[600] text-[#383637]">Màu sắc</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 4.5L6 7.5L3 4.5" stroke="#383637" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="flex justify-start items-center px-4 py-2 bg-[#f9f9f9] rounded-[4px] text-[14px] w-full md:w-[400px] h-fit">
            <svg className="mr-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z" stroke="#383637" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.75 15.7498L12.4875 12.4873" stroke="#383637" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-[600] text-[#383637]">Tìm kiếm theo tên thiệp</span>
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <TemplateList templates={templates} />
      </div>
      {/* <Footer /> */}
    </div>
  )
}