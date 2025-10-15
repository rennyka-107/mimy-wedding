"use client";

import React from 'react';
import Image from 'next/image';
interface WeddingGoogleMapProps {
  className?: string;
  onClick?: () => void;
}

const WeddingGoogleMap: React.FC<WeddingGoogleMapProps> = ({
  className = '',
  onClick
}) => {

  return (
    <div style={{
      boxShadow: "0 4px 14.8px 0 rgba(0, 0, 0, 0.10)"
    }} className={`cursor-pointer hover:bg-[#F9F9F9] wedding-google-map-container border border-[#f0f0f0] rounded-[8px] max-w-[150px] h-[auto] bg-white px-[1rem] py-[0.5rem] ${className}`} onClick={onClick}>
      <Image
        src={"/images/google-map1.png"}
        alt="Google Map"
        width={1042}
        height={200}
        className="w-full"
      />
    </div>
  );
};

export default WeddingGoogleMap;
