"use client";

import React from 'react';

interface WeddingBackgroundProps {
  background: string; // Can be a color (e.g. "#ff0000") or an image URL
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  additionalStyle?: React.CSSProperties;
}

const WeddingBackground: React.FC<WeddingBackgroundProps> = ({
  background,
  className = '',
  children,
  onClick,
  additionalStyle = {}
}) => {
  // Check if background is a color (starts with # or rgb) or an image URL
  const isColor = background.startsWith('#') || 
                 background.startsWith('rgb') || 
                 background.startsWith('rgba');
  
  const style = isColor
    ? { backgroundColor: background }
    : { backgroundImage: `url(${background})`};

  return (
    <div 
      className={`wedding-background ${className}`}
      style={{...style, ...additionalStyle}}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default WeddingBackground;
