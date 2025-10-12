"use client";
import { useState } from "react";
import FilterModal from "./FilterModal";

interface ImageQuantityFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (range: string | null, customValue?: number) => void;
}

export default function ImageQuantityFilter({
  isOpen,
  onClose,
  onApply
}: ImageQuantityFilterProps) {
  const [selectedRange, setSelectedRange] = useState<string | null>(null);
  const [customQuantity, setCustomQuantity] = useState<string>("");

  const handleSelectRange = (range: string) => {
    setSelectedRange(range);
  };

  const handleApplyFilter = () => {
    if (selectedRange === "custom" && customQuantity) {
      onApply(selectedRange, parseInt(customQuantity, 10));
    } else {
      onApply(selectedRange);
    }
    onClose();
  };

  const handleReset = () => {
    setSelectedRange(null);
    setCustomQuantity("");
  };

  return (
    <FilterModal
      isOpen={isOpen}
      onClose={onClose}
      title="Số lượng ảnh"
      onApplyFilter={handleApplyFilter}
      onReset={handleReset}
    >
      <div className="grid grid-cols-2 gap-3">
        <button
          className={`py-3 px-4 border rounded-md text-center ${
            selectedRange === "0-3" ? "border-[#fd8c06] bg-[#FADCDC] text-[#fd8c06]" : "border-gray-200 text-gray-700"
          }`}
          onClick={() => handleSelectRange("0-3")}
        >
          0-3
        </button>
        <button
          className={`py-3 px-4 border rounded-md text-center ${
            selectedRange === "3-5" ? "border-[#fd8c06] bg-[#FADCDC] text-[#fd8c06]" : "border-gray-200 text-gray-700"
          }`}
          onClick={() => handleSelectRange("3-5")}
        >
          3-5
        </button>
        <button
          className={`py-3 px-4 border rounded-md text-center ${
            selectedRange === "5-8" ? "border-[#fd8c06] bg-[#FADCDC] text-[#fd8c06]" : "border-gray-200 text-gray-700"
          }`}
          onClick={() => handleSelectRange("5-8")}
        >
          5-8
        </button>
        <button
          className={`py-3 px-4 border rounded-md text-center ${
            selectedRange === ">8" ? "border-[#fd8c06] bg-[#FADCDC] text-[#fd8c06]" : "border-gray-200 text-gray-700"
          }`}
          onClick={() => handleSelectRange(">8")}
        >
          &gt;8
        </button>
      </div>

      <div className="mt-4">
        <input
          type="number"
          placeholder="Nhập số lượng ảnh"
          className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#fd8c06] focus:border-transparent transition-all"
          value={customQuantity}
          onChange={(e) => {
            setCustomQuantity(e.target.value);
            if (e.target.value) {
              setSelectedRange("custom");
            }
          }}
        />
      </div>
    </FilterModal>
  );
}
