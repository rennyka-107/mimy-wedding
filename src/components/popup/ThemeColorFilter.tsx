"use client";
import { useState } from "react";
import FilterModal from "./FilterModal";

interface ThemeColorFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (color: string | null) => void;
}

export default function ThemeColorFilter({
  isOpen,
  onClose,
  onApply
}: ThemeColorFilterProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const colorOptions = [
    { id: "green", name: "Xanh lá", colorClass: "bg-green-500" },
    { id: "red", name: "Đỏ", colorClass: "bg-red-500" },
    { id: "pink", name: "Hồng", colorClass: "bg-pink-400" },
    { id: "yellow", name: "Vàng", colorClass: "bg-yellow-400" }
  ];

  const handleSelectColor = (colorId: string) => {
    setSelectedColor(colorId === selectedColor ? null : colorId);
  };

  const handleApplyFilter = () => {
    onApply(selectedColor);
    onClose();
  };

  const handleReset = () => {
    setSelectedColor(null);
  };

  return (
    <FilterModal
      isOpen={isOpen}
      onClose={onClose}
      title="Màu chủ đạo"
      onApplyFilter={handleApplyFilter}
      onReset={handleReset}
    >
      <div className="grid grid-cols-2 gap-3">
        {colorOptions.map((color) => (
          <button
            key={color.id}
            className={`py-3 px-4 border rounded-md text-center flex items-center justify-center ${
              selectedColor === color.id ? "border-[#fd8c06] bg-[#FADCDC] text-[#fd8c06]" : "border-gray-200 text-gray-700"
            }`}
            onClick={() => handleSelectColor(color.id)}
          >
            <span className={`w-4 h-4 inline-block mr-2 rounded-full ${color.colorClass}`}></span>
            {color.name}
          </button>
        ))}
      </div>
    </FilterModal>
  );
}
