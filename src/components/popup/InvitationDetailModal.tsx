"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface InvitationDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    invitation: {
        id: string;
        name: string;
        price: number;
        url: string;
        views: number;
        wishes: number;
        startDate: string;
        endDate: string;
        image?: string;
    } | null;
}

const InvitationDetailModal: React.FC<InvitationDetailModalProps> = ({
    isOpen,
    onClose,
    invitation
}) => {
    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 0.5 },
        exit: { opacity: 0 }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1
        },
        exit: {
            opacity: 0,
            scale: 0.8
        }
    };

    if (!invitation) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Background overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="bg-white rounded-2xl shadow-xl w-full max-w-[800px] max-h-[90vh] m-4 relative z-10 overflow-hidden"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Content */}
                        <div className="p-8 overflow-y-auto max-h-[90vh]">
                            {/* Header with Image and Title */}
                            <div className="flex items-start gap-6 mb-8">
                                {/* Image */}
                                <div className="w-2/7">
                                    <div className="w-[200px] h-[280px] bg-gray-100 rounded-lg border border-gray-200 overflow-hidden relative">
                                        {invitation.image ? (
                                            <Image
                                                src="/images/anh-cuoi-1.png"
                                                alt={invitation.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <Image
                                                src="/images/anh-cuoi-1.png"
                                                alt={invitation.name}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Title and Basic Info */}
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        Mẫu thiệp: {invitation.name}
                                    </h2>
                                    <div className="text-lg font-semibold text-[#fd8c06] mb-4">
                                        Giá trị: {invitation.price.toLocaleString('vi-VN')}đ
                                    </div>

                                    {/* Stats */}
                                    <div className="space-y-3">
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-5 h-5 mr-3 text-[#fd8c06]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                            Đường dẫn:&nbsp;<span className="text-[#fd8c06] font-bold cursor-pointer" onClick={() => window.open(invitation.url, '_blank')}>{invitation.url}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-5 h-5 mr-3 text-[#fd8c06]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            <span>Tổng số lượt truy cập: {invitation.views.toLocaleString('vi-VN')} lượt</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-5 h-5 mr-3 text-[#fd8c06]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            <span>Tổng số lời chúc: {invitation.wishes} lời chúc</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Full Width Publication History Table */}
                            <div className="w-full">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lịch sử xuất bản</h3>
                                <div className="bg-gray-50 rounded-lg overflow-hidden w-full">
                                    <table className="w-full">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Lần</th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Ngày bắt đầu</th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Ngày kết thúc</th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Số lượt truy cập</th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Số lời chúc</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white">
                                                <td className="px-6 py-4 text-sm text-gray-900">01</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{invitation.startDate || "18-01-2025"}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{invitation.endDate || "18-02-2025"}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{invitation.views.toLocaleString('vi-VN')}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{invitation.wishes}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default InvitationDetailModal;
