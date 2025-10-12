"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface Wish {
    id: string;
    content: string;
    sender: string;
    arrive: boolean;
    order_id: string;
    createdAt: string;
    updatedAt: string;
    public_url: string | null;
}

interface WishesModalProps {
    isOpen: boolean;
    onClose: () => void;
    invitationTitle?: string;
    orderId?: string;
}

const WishesModal: React.FC<WishesModalProps> = ({
    isOpen,
    onClose,
    invitationTitle = "Thiệp cưới",
    orderId
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [wishes, setWishes] = useState<Wish[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch wishes when modal opens and orderId is available
    useEffect(() => {
        if (isOpen && orderId) {
            fetchWishes();
        }
    }, [isOpen, orderId]);

    const fetchWishes = async () => {
        if (!orderId) return;
        
        setLoading(true);
        try {
            const response = await fetch(`/api/wishes?orderId=${orderId}`);
            const data = await response.json();
            
            if (data.status === "success") {
                setWishes(data.data || []);
            } else {
                console.error("Error fetching wishes:", data.message);
                setWishes([]);
            }
        } catch (error) {
            console.error("Error fetching wishes:", error);
            setWishes([]);
        } finally {
            setLoading(false);
        }
    };

    const totalWishes = wishes.length;
    const attendingCount = wishes.filter(w => w.arrive === true).length;

    const filteredWishes = wishes.filter((wish: Wish) => {
        const matchesSearch = wish.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            wish.sender.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesDate = true;
        if (startDate || endDate) {
            const wishDate = new Date(wish.createdAt);
            if (startDate) {
                const start = new Date(startDate);
                matchesDate = matchesDate && wishDate >= start;
            }
            if (endDate) {
                const end = new Date(endDate);
                matchesDate = matchesDate && wishDate <= end;
            }
        }

        return matchesSearch && matchesDate;
    });

    const modalVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.2 }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.15 }
        }
    };

    const overlayVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 0.7 },
        exit: { opacity: 0 }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <motion.div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                    >

                    </motion.div>
                    <motion.div
                        className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-6xl max-h-[90vh] z-10 relative overflow-hidden"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="px-6 py-4 flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-[#fd8c06]">Lời chúc của bạn</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Search and Filters */}
                        <div className="px-6 py-4">
                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="flex-1 min-w-[200px]">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm theo tên thiệp"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full outline-none text-[#A4A7AE] px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <span className="text-sm text-[#A4A7AE]">Từ ngày:</span>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="text-[#A4A7AE] px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <span className="text-sm text-[#A4A7AE]">Đến ngày:</span>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="text-[#A4A7AE] px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Statistics */}
                        {/* <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex gap-8">
                                    <span><strong>Tổng:</strong> {totalWishes} (lời chúc)</span>
                                    <span><strong>Người gửi:</strong> {totalWishes} (người)</span>
                                    <span><strong>Dự lễ:</strong> {attendingCount} (thiệp)</span>
                                </div>
                            </div>
                        </div> */}

                        {/* Table */}
                        <div className="px-6 py-4 overflow-auto max-h-[60vh]">
                            <table className="w-full border-collapse border-gray-300 border rounded-lg">
                                <thead className="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Thời gian</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Lời chúc</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Người gửi</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Dự lễ</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Đến từ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                                Đang tải lời chúc...
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredWishes.map((wish: Wish, index: number) => (
                                            <tr key={wish.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                                                    {new Date(wish.createdAt).toLocaleDateString('vi-VN')}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900 max-w-md">
                                                    <div className="line-clamp-3">
                                                        {wish.content}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                                                    {wish.sender}
                                                </td>
                                                <td className="px-4 py-3 text-sm whitespace-nowrap">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${wish.arrive
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                        }`}>
                                                        {wish.arrive ? "Có" : "Không"}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                                                    {wish.public_url ? (
                                                        <span className="text-blue-600 hover:text-blue-800">
                                                            {process.env.NEXT_PUBLIC_BASE_URL}{wish.public_url}
                                                        </span>
                                                    ) : "-"}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>

                            {!loading && filteredWishes.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    {wishes.length === 0 ? "Chưa có lời chúc nào" : "Không có lời chúc nào được tìm thấy"}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4">
                            <div className="flex justify-end">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

        </AnimatePresence>
    );
};

export default WishesModal;
