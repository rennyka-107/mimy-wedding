"use client";

import React from 'react';

interface NumberInputProps {
  value: string | number;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

/**
 * Component for number input with increment and decrement buttons
 */
const NumberInput: React.FC<NumberInputProps> = ({ 
  value, 
  onChange, 
  min = 1, 
  max = 100,
  step = 1,
  className = '' 
}) => {
  const handleIncrement = () => {
    const currentValue = parseInt(value.toString(), 10);
    const newValue = Math.min(currentValue + step, max);
    onChange(newValue.toString());
  };

  const handleDecrement = () => {
    const currentValue = parseInt(value.toString(), 10);
    const newValue = Math.max(currentValue - step, min);
    onChange(newValue.toString());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === '') {
      onChange('');
      return;
    }

    const numValue = parseInt(newValue, 10);
    if (!isNaN(numValue)) {
      onChange(numValue.toString());
    }
  };

  const handleBlur = () => {
    const currentValue = parseInt(value.toString(), 10) || 0;
    const clampedValue = Math.max(min, Math.min(max, currentValue));
    onChange(clampedValue.toString());
  };

  return (
    <div className={`flex items-center justify-between bg-[#F5F5F5] rounded-[4px] ${className}`}>
      <button 
        type="button"
        onClick={handleDecrement}
        className="flex items-center justify-center w-8 h-full text-[#4A3B36] font-medium text-base"
      >
        −
      </button>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full bg-transparent text-center outline-none text-[#222222] font-medium"
        style={{ maxWidth: '40px' }}
      />
      <button 
        type="button"
        onClick={handleIncrement}
        className="flex items-center justify-center w-8 h-full text-[#4A3B36] font-medium text-base"
      >
        +
      </button>
    </div>
  );
};

export default NumberInput;
