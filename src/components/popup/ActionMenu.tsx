"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface ActionMenuProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  onAction: (action: string) => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  isOpen,
  onClose,
  position,
  onAction
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const menuVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.15 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { duration: 0.1 }
    }
  };

  const menuItems = [
    {
      id: "publish",
      label: "Xuất bản thiệp",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      color: "text-gray-700"
    },
    {
      id: "view",
      label: "Xem chi tiết",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      color: "text-gray-700"
    },
    {
      id: "edit",
      label: "Chỉnh sửa",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      color: "text-gray-700"
    },
    {
      id: "wishes",
      label: "Xem lời chúc",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      color: "text-gray-700"
    },
    {
      id: "delete",
      label: "Xóa thiệp",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      color: "text-red-600"
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        className="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[160px]"
        style={{
          left: position.x,
          top: position.y,
        }}
        variants={menuVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => {
              onAction(item.id);
              onClose();
            }}
            className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center space-x-3 transition-colors ${item.color} ${
              index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <span className={item.color}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default ActionMenu;
