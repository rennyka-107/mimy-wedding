"use client";

import React, { useRef } from 'react';

interface ColorDisplayProps {
  colorValue: string;
  onChange?: (newColor: string) => void;
  className?: string;
  editable?: boolean;
}

/**
 * Component to display a color with its hex value
 * Can be either read-only or editable
 */
const ColorDisplay: React.FC<ColorDisplayProps> = ({ 
  colorValue, 
  onChange, 
  className = '',
  editable = false 
}) => {
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleClick = () => {
    if (editable && colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  return (
    <div 
      className={`flex items-center bg-[#F5F5F5] rounded-[4px] px-3 py-2 ${className} ${editable ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      <div 
        className="w-5 h-5 mr-3" 
        style={{ backgroundColor: colorValue }}
      />
      <span className="font-medium text-sm text-[#222222]">{colorValue}</span>
      {editable && (
        <input
          ref={colorInputRef}
          type="color"
          value={colorValue}
          onChange={handleColorChange}
          className="invisible absolute"
        />
      )}
    </div>
  );
};

export default ColorDisplay;
