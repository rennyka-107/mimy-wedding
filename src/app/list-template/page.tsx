
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
            <TemplateList templates={templates} displayPagination />
        </div>
    )
}