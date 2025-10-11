"use client";

import React from 'react';

interface WeddingTextProps {
  content: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

const WeddingText: React.FC<WeddingTextProps> = ({ content, className = '', style, onClick }) => {
  return (
    <div className={`wedding-text ${className}`} style={style} onClick={onClick}>
      {content}
    </div>
  );
};

export default WeddingText;
