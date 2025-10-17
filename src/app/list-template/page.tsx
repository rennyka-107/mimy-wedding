'use client';
import TemplateList, { TypeTemplate } from "@/components/wedding/TemplateList";
import { useState, useRef, useEffect } from "react";

const templates: TypeTemplate[] = [
  {
    id: "2010_my_light",
    name: 'Thiệp cưới 20-10 My Light',
    url: "/images/20-10-mylight.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 30000,
  },
  {
    id: "2010_for_ya",
    name: 'Thiệp cưới 20-10 For Ya',
    url: "/images/2010_for_ya.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 30000,
  },
  {
    id: "olive_harmony",
    name: 'Thiệp cưới Olive Harmony',
    url: "/images/olive_harmony.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "green",
    price: 30000,
  },
  {
    id: "cloudy_bliss",
    name: 'Thiệp mời tốt nghiệp Cloudy Bliss',
    url: "/images/cloudy_bliss.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "blue",
    price: 30000,
  },
  {
    id: "light_sky_wish",
    name: 'Thiệp sinh nhật Light Sky Wish',
    url: "/images/Light Sky Wish.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "blue",
    price: 30000,
  },
  {
    id: "cocoa_embrace",
    name: 'Thiệp cưới Cocoa Embrace',
    url: "/images/cocoa_embrace.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 30000,
  },
  {
    id: "golden_bond",
    name: 'Thiệp cưới Golden Bond',
    url: "/images/golden_bond.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 30000,

  },
  {
    id: "forest_charm",
    name: 'Thiệp cưới Forest Charm',
    url: "/images/forest_charm.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "green",
    price: 50000,

  },
  {
    id: "jade_whisper",
    name: 'Thiệp cưới Jade Whisper',
    url: "/images/jade_whisper.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "green",
    price: 50000,

  },
  {
    id: "ruby_heart",
    name: 'Thiệp cưới Ruby Heart',
    url: "/images/ruby_heart.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "red",
    price: 60000,

  },
  {
    id: "blush_love",
    name: 'Thiệp cưới Blush Love ',
    url: "/images/blush_love.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "pink",
    price: 60000,

  },
  {
    id: "sunshine_vow",
    name: 'Thiệp cưới Sunshine Vow',
    url: "/images/sunshine_vow.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 60000,
  },
  {
    id: "peach_promise",
    name: 'Thiệp cưới Peach Promise',
    url: "/images/peach_promise.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 50000,

  },
  {
    id: "lavender_dream",
    name: 'Thiệp cưới Lavender Dream',
    url: "/images/lavender_dream.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "lavender",
    price: 60000,

  },
  {
    id: "honey_grace",
    name: 'Thiệp cưới Honey Grace',
    url: "/images/honey_grace.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 50000,

  },
  {
    id: "sunset_glow",
    name: 'Thiệp cưới Sunset Glow',
    url: "/images/sunset_glow.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 60000,
  },
  {
    id: "ruby_flame",
    name: 'Thiệp cưới Ruby Flame',
    url: "/images/ruby_flame.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "red",
    price: 50000,
  },
  {
    id: "ocean_embrace",
    name: 'Thiệp cưới Ocean Embrace',
    url: "/images/ocean_embrace.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "blue",
    price: 90000,
  },
  {
    id: "meadow_bliss",
    name: 'Thiệp cưới Meadow Bliss',
    url: "/images/meadow_bliss.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "green",
    price: 90000,
  },
  {
    id: "moss_journey",
    name: 'Thiệp cưới Moss Journey',
    url: "/images/moss_journey.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "green",
    price: 50000,
  },
  {
    id: "emerald_harmony",
    name: 'Thiệp cưới Emerald Harmony',
    url: "/images/emerald_harmony.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "green",
    price: 90000,
  },
  {
    id: "amethyst_glow",
    name: 'Thiệp cưới Amethyst Glow',
    url: "/images/amethyst_glow.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "lavender",
    price: 60000,
  },
  {
    id: "azure_sky",
    name: 'Thiệp cưới Azure Sky',
    url: "/images/azure_sky.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "blue",
    price: 80000,
  },
  {
    id: "golden_bloom",
    name: 'Thiệp cưới Golden Bloom',
    url: "/images/golden_bloom.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 80000,
  },
  {
    id: "shining_love",
    name: 'Thiệp cưới Shining Love',
    url: "/images/shining_love.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "yellow",
    price: 80000,
  },
  {
    id: "sapphire_bond",
    name: 'Thiệp cưới Sapphire Bond',
    url: "/images/sapphire_bond.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "blue",
    price: 90000,
  },
  {
    id: "scarlet_whisper",
    name: 'Thiệp cưới Scarlet Whisper',
    url: "/images/scarlet_whisper.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "red",
    price: 60000,
  },
  {
    id: "olive_serenity",
    name: 'Thiệp cưới Olive Serenity',
    url: "/images/olive_serenity.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "green",
    price: 90000,
  },
  {
    id: "cobalt_promise",
    name: 'Thiệp kỉ niệm yêu Cobalt Promise',
    url: "/images/Cobalt Promise.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "blue",
    price: 30000,
  },
  {
    id: "indigo_whisper",
    name: 'Thiệp kỉ niệm yêu Indigo Whisper',
    url: "/images/Indigo Whisper.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "blue",
    price: 30000,
  },
  {
    id: "verdant_path",
    name: 'Thiệp mời tốt nghiệp Verdant Path',
    url: "/images/Verdant Path.png",
    is_free: true,
    image_quantity: 5,
    theme_color: "green",
    price: 30000,
  },
]

export default function ListTemplatePage() {
  const [displayTemplates, setDisplayTemplates] = useState<TypeTemplate[]>(templates);
  const [showPricePopup, setShowPricePopup] = useState(false);
  const [showColorPopup, setShowColorPopup] = useState(false);
  const [showTypePopup, setShowTypePopup] = useState(false);
  const [selectedPriceSort, setSelectedPriceSort] = useState<'default' | 'asc' | 'desc'>('default');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const pricePopupRef = useRef<HTMLDivElement>(null);
  const colorPopupRef = useRef<HTMLDivElement>(null);
  const typePopupRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close popups
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pricePopupRef.current && !pricePopupRef.current.contains(event.target as Node)) {
        setShowPricePopup(false);
      }
      if (colorPopupRef.current && !colorPopupRef.current.contains(event.target as Node)) {
        setShowColorPopup(false);
      }
      if (typePopupRef.current && !typePopupRef.current.contains(event.target as Node)) {
        setShowTypePopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (search: string) => {
    let filteredTemplates = templates.filter(template =>
      template.name.toLowerCase().includes(search.toLowerCase())
    );

    // Apply type filter
    if (selectedTypes.length > 0) {
      filteredTemplates = filteredTemplates.filter(template => {
        return selectedTypes.some(type => template.name.toLowerCase().includes(type.toLowerCase()));
      });
    }

    // Apply color filter
    if (selectedColors.length > 0) {
      filteredTemplates = filteredTemplates.filter(template =>
        selectedColors.includes(template.theme_color)
      );
    }

    // Apply price sort
    if (selectedPriceSort === 'asc') {
      filteredTemplates = [...filteredTemplates].sort((a, b) => a.price - b.price);
    } else if (selectedPriceSort === 'desc') {
      filteredTemplates = [...filteredTemplates].sort((a, b) => b.price - a.price);
    }

    setDisplayTemplates(filteredTemplates);
  };

  const handlePriceSort = (sort: 'default' | 'asc' | 'desc') => {
    setSelectedPriceSort(sort);
    let sortedTemplates = [...displayTemplates];

    if (sort === 'asc') {
      sortedTemplates = sortedTemplates.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
      sortedTemplates = sortedTemplates.sort((a, b) => b.price - a.price);
    } else {
      // Reset to original order with current filters
      sortedTemplates = templates.filter(template => {
        const matchesType = selectedTypes.length === 0 || selectedTypes.some(type => template.name.toLowerCase().includes(type.toLowerCase()));
        const matchesColor = selectedColors.length === 0 || selectedColors.includes(template.theme_color);
        return matchesType && matchesColor;
      });
    }

    setDisplayTemplates(sortedTemplates);
    setShowPricePopup(false);
  };

  const handleColorToggle = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];

    setSelectedColors(newColors);

    let filteredTemplates = templates;

    // Apply type filter
    if (selectedTypes.length > 0) {
      filteredTemplates = filteredTemplates.filter(template => {
        return selectedTypes.some(type => template.name.toLowerCase().includes(type.toLowerCase()));
      });
    }

    // Apply color filter
    if (newColors.length > 0) {
      filteredTemplates = filteredTemplates.filter(template =>
        newColors.includes(template.theme_color)
      );
    }

    // Apply current price sort
    if (selectedPriceSort === 'asc') {
      filteredTemplates = [...filteredTemplates].sort((a, b) => a.price - b.price);
    } else if (selectedPriceSort === 'desc') {
      filteredTemplates = [...filteredTemplates].sort((a, b) => b.price - a.price);
    }

    setDisplayTemplates(filteredTemplates);
  };

  const handleTypeToggle = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];

    setSelectedTypes(newTypes);

    let filteredTemplates = templates;

    // Apply type filter
    if (newTypes.length > 0) {
      filteredTemplates = filteredTemplates.filter(template => {
        return newTypes.some(t => template.name.toLowerCase().includes(t.toLowerCase()));
      });
    }

    // Apply color filter
    if (selectedColors.length > 0) {
      filteredTemplates = filteredTemplates.filter(template =>
        selectedColors.includes(template.theme_color)
      );
    }

    // Apply current price sort
    if (selectedPriceSort === 'asc') {
      filteredTemplates = [...filteredTemplates].sort((a, b) => a.price - b.price);
    } else if (selectedPriceSort === 'desc') {
      filteredTemplates = [...filteredTemplates].sort((a, b) => b.price - a.price);
    }

    setDisplayTemplates(filteredTemplates);
  };

  const colorOptions = [
    { value: 'green', label: 'Xanh' },
    { value: 'red', label: 'Đỏ' },
    { value: 'lavender', label: 'Tím' },
    { value: 'yellow', label: 'Vàng' },
    { value: 'pink', label: 'Hồng' },
    { value: 'blue', label: 'Nâu' },
  ];

  const typeOptions = [
    { value: 'cưới', label: 'Thiệp cưới' },
    { value: 'sinh nhật', label: 'Thiệp sinh nhật' },
    { value: '20-10', label: 'Thiệp 20-10' },
    { value: 'đầy tháng', label: 'Thiệp con đầy tháng' },
    { value: 'tốt nghiệp', label: 'Thiệp mời lễ tốt nghiệp' },
    { value: 'kỷ niệm', label: 'Thiệp kỷ niệm' },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] px-0 md:px-[10%] py-10 md:py-[50px]">
      <div>
        <div className="flex flex-col justify-center items-center md:items-center gap-4 mx-[50px]">
          <div>
            <span className="text-[#383637] block font-montserrat-alter font-[700] text-[28px] sm:text-[44px] lg:text-[46px] leading-[100%] w-full text-center">
              danh sách thiệp
            </span>
            <span className="text-[#898A85] font-montserrat block pt-3 w-full text-center text-[14px] md:text-[16px]">
              Hãy chọn mẫu thiệp và viết lên lời mời của bạn.
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between pt-6 mx-[50px] gap-4">
          <div className="flex gap-2 w-full ">
            {/* Type Filter with Popup */}
            <div className="relative" ref={typePopupRef}>
              <div
                onClick={() => setShowTypePopup(!showTypePopup)}
                className="flex justify-center items-center px-4 py-2 bg-[#f9f9f9] rounded-[4px] text-[14px] w-full md:w-fit h-fit cursor-pointer hover:bg-[#f0f0f0] transition-colors"
              >
                <span className="lg:block hidden pr-2 font-[600] text-[#383637]">Loại thiệp</span>
                <span className="lg:hidden block pr-2 font-[600] text-[#383637]">Loại</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 4.5L6 7.5L3 4.5" stroke="#383637" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Type Popup */}
              {showTypePopup && (
                <div className="absolute top-full mt-2 left-0 bg-white rounded-[8px] shadow-lg border border-gray-200 py-2 w-[200px] z-50">
                  {typeOptions.map((type) => (
                    <div
                      key={type.value}
                      onClick={() => handleTypeToggle(type.value)}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer font-montserrat text-[14px] text-[#383637] flex items-center justify-start gap-2"
                    >
                      <div className="w-[20%]">
                        {selectedTypes.includes(type.value) && (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#383637" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className="flex-1">{type.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Filter with Popup */}
            <div className="relative" ref={pricePopupRef}>
              <div
                onClick={() => setShowPricePopup(!showPricePopup)}
                className="flex justify-center items-center px-4 py-2 bg-[#f9f9f9] rounded-[4px] text-[14px] w-full md:w-fit h-fit cursor-pointer hover:bg-[#f0f0f0] transition-colors"
              >
                <span className="lg:block hidden pr-2 font-[600] text-[#383637]">Mức giá</span>
                <span className="lg:hidden block pr-2 font-[600] text-[#383637]">Giá</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 4.5L6 7.5L3 4.5" stroke="#383637" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Price Popup */}
              {showPricePopup && (
                <div className="absolute top-full mt-2 left-0 bg-white rounded-[8px] shadow-lg border border-gray-200 py-2 w-[150px] z-50">
                  <div
                    onClick={() => handlePriceSort('default')}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer font-montserrat text-[14px] text-[#383637] flex items-center justify-start"
                  >
                    <div className="w-[20%]">
                      {selectedPriceSort === 'default' && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#383637" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="flex-1">Mặc định</span>
                  </div>
                  <div
                    onClick={() => handlePriceSort('asc')}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer font-montserrat text-[14px] text-[#383637] flex items-center justify-start"
                  >
                    <div className="w-[20%]">
                      {selectedPriceSort === 'asc' && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#383637" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="flex-1">Tăng dần</span>
                  </div>
                  <div
                    onClick={() => handlePriceSort('desc')}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer font-montserrat text-[14px] text-[#383637] flex items-center justify-start"
                  >
                    <div className="w-[20%]">
                      {selectedPriceSort === 'desc' && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#383637" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="flex-1">Giảm dần</span>
                  </div>
                </div>
              )}
            </div>

            {/* Color Filter with Popup */}
            <div className="relative" ref={colorPopupRef}>
              <div
                onClick={() => setShowColorPopup(!showColorPopup)}
                className="flex justify-center items-center px-4 py-2 bg-[#f9f9f9] rounded-[4px] text-[14px] w-full md:w-fit h-fit cursor-pointer hover:bg-[#f0f0f0] transition-colors"
              >
                <span className="lg:block hidden pr-2 font-[600] text-[#383637]">Màu sắc</span>
                <span className="lg:hidden block pr-2 font-[600] text-[#383637]">Màu</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 4.5L6 7.5L3 4.5" stroke="#383637" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Color Popup */}
              {showColorPopup && (
                <div className="absolute top-full mt-2 left-0 bg-white rounded-[8px] shadow-lg border border-gray-200 py-2 w-[150px] z-50">
                  {colorOptions.map((color) => (
                    <div
                      key={color.value}
                      onClick={() => handleColorToggle(color.value)}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer font-montserrat text-[14px] text-[#383637] flex items-center justify-start gap-2"
                    >
                      <div className="w-[20%]">
                        {selectedColors.includes(color.value) && (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#383637" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className="flex-1">{color.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-start items-center px-4 py-2 bg-[#f9f9f9] rounded-[4px] text-[14px] w-full md:w-[500px] h-fit overflow-hidden">
            <svg className="mr-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z" stroke="#383637" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.75 15.7498L12.4875 12.4873" stroke="#383637" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
              placeholder="Tìm kiếm theo tên thiệp"
              className="font-montserrat font-[500] text-[#383637] placeholder-[#898A85] rounded-[8px] px-3  outline-none transition-colors duration-200"
            />
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <TemplateList templates={displayTemplates} />
      </div>
      {/* <Footer /> */}
    </div>
  )
}