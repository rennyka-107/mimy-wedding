"use client";
import ImageQuantityFilter from "@/components/popup/ImageQuantityFilter";
import ThemeColorFilter from "@/components/popup/ThemeColorFilter";
import { useState } from "react";

export default function YourComponent() {
  // State for controlling modal visibility
  const [isImageFilterOpen, setIsImageFilterOpen] = useState(false);
  const [isColorFilterOpen, setIsColorFilterOpen] = useState(false);
  
  // State for storing filter values
  const [selectedImageRange, setSelectedImageRange] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  return (
    <div>
      {/* Button to open image quantity filter */}
      <button 
        onClick={() => setIsImageFilterOpen(true)}
        className="px-4 py-2 border rounded-md"
      >
        Lọc theo số lượng ảnh
      </button>
      
      {/* Button to open theme color filter */}
      <button 
        onClick={() => setIsColorFilterOpen(true)}
        className="px-4 py-2 border rounded-md ml-2"
      >
        Lọc theo màu chủ đạo
      </button>
      
      {/* Image Quantity Filter */}
      <ImageQuantityFilter
        isOpen={isImageFilterOpen}
        onClose={() => setIsImageFilterOpen(false)}
        onApply={(range, customValue) => {
          setSelectedImageRange(range);
          console.log("Selected image range:", range, customValue);
          // Apply your filtering logic here
        }}
      />
      
      {/* Theme Color Filter */}
      <ThemeColorFilter 
        isOpen={isColorFilterOpen}
        onClose={() => setIsColorFilterOpen(false)}
        onApply={(color) => {
          setSelectedColor(color);
          console.log("Selected color:", color);
          // Apply your filtering logic here
        }}
      />
    </div>
  );
}