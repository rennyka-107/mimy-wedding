
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
    <div className="w-full bg-[#FFFFFF] px-[15%] py-[50px]">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[#383637] flex w-full justify-start pt-0 font-montserrat-alter font-[700] text-[36px] sm:text-[44px] lg:text-[46px] leading-[100%]">
            mẫu thiệp.
          </span>
          <span className="text-[#898A85] font-montserrat flex justify-start pt-3">Hãy chọn mẫu thiệp và viết lên lời mời của bạn.</span>
        </div>
        <div className="bg-[#f9f9f9] rounded-[8px] border border-[#f9f9f9] px-2 py-3 w-fit h-fit">
          <span className="px-4 p-2 bg-white rounded-[4px] font-[600] text-[#383637 text-[14px]">Tất cả thiệp (3)</span>
          <span className="px-4 p-2 bg-[#f9f9f9] rounded-[4px] text-[14px]">Thiệp cưới (2)</span>
          <span className="px-4 p-2 bg-[#f9f9f9] rounded-[4px] text-[14px]">Thiệp kỉ niệm (1)</span>
        </div>
      </div>
    </div>
  )
}