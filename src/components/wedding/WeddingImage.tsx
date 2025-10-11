"use client";

import React from 'react';
import Image from 'next/image';

interface WeddingImageProps {
  imageUrl: string;
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
  onClick?: (e: React.MouseEvent) => void;
}

const WeddingImage: React.FC<WeddingImageProps> = ({ 
  imageUrl, 
  className = '',
  alt = 'Wedding image',
  width = 400,
  height = 300,
  onClick
}) => {
  return (
    <div className={`wedding-image-container ${className}`} onClick={onClick}>
      <Image 
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-contain rounded-md"
      />
    </div>
  );
};

export default WeddingImage;
