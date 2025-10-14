"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import BaseInput from "../input/base";
import ImageIcon from "../icons/image";
import DraftIcon from "../icons/draft";
import ActionMenu from "../popup/ActionMenu";
import DeleteConfirmModal from "../popup/DeleteConfirmModal";
import InvitationDetailModal from "../popup/InvitationDetailModal";
import WishesModal from "../popup/WishesModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Invitation {
  id: number;
  name: string;
  price: number;
  quantity: number;
  status: string;
  startDate: string;
  endDate: string;
  public_url: string;
  views: number;
}

export default function InvitationManagement() {
  const sectionRef = useRef(null);
  const router = useRouter();
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [searchQuery, setSearchQuery] = useState("");
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [stats, setStats] = useState({
    totalInvitations: 0,
    totalWishes: 0,
    totalViews: 0,
    totalImages: 0
  });
  const [actionMenu, setActionMenu] = useState({
    isOpen: false,
    position: { x: 0, y: 0 },
    invitationId: null as string | null
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    invitationId: null as string | null,
    invitationName: ""
  });
  const [detailModal, setDetailModal] = useState<{
    isOpen: boolean, invitation: {
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
  }>({
    isOpen: false,
    invitation: null
  });
  const [wishesModal, setWishesModal] = useState({
    isOpen: false,
    invitationId: null as string | null,
    invitationName: ""
  });
  const { user } = useAuth();

  function getInvitations() {
    const url = user?.id ? `/api/orders?userId=${user.id}` : "/api/orders";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data, "data");
        if (data.status === "success" && data.data) {
          const now = new Date();

          const mappedInvitations = data.data.map((order: { id: number, template_name: string, template_price: number, public_start: string, public_end: string, public_url: string, views: number }) => {
            let status = "Bản nháp";

            if (order.public_start && order.public_end) {
              const startDate = new Date(order.public_start);
              const endDate = new Date(order.public_end);

              if (now < startDate) {
                status = "Sắp xuất bản";
              } else if (now >= startDate && now <= endDate) {
                status = "Đã xuất bản";
              } else if (now > endDate) {
                status = "Hết hạn";
              }
            } else if (!order.public_start) {
              status = "Bản nháp";
            }

            return {
              id: order.id,
              name: order.template_name,
              price: order.template_price,
              status: status,
              startDate: order.public_start ? new Date(order.public_start).toLocaleDateString('vi-VN') : "",
              endDate: order.public_end ? new Date(order.public_end).toLocaleDateString('vi-VN') : "",
              public_url: order.public_url ? order.public_url : "",
              views: order.views || 0
            };
          });

          setInvitations(mappedInvitations);

          // Fetch wishes stats and update stats
          getWishesStats(mappedInvitations);
        }
      })
      .catch(error => {
        toast.error("Lỗi khi tải danh sách thiệp mời!");
        console.error("Error fetching orders:", error);
      });
  }

  function getWishesStats(mappedInvitations: { id: number }[]) {
    if (!user?.id) {
      // Set default stats if no user
      setStats({
        totalInvitations: mappedInvitations.length,
        totalWishes: 0,
        totalViews: mappedInvitations.reduce((sum: number, inv: unknown) => sum + (inv as { views: number })?.views, 0),
        totalImages: 10 // This should come from images API
      });
      return;
    }

    fetch(`/api/wishes/stats?userId=${user.id}`)
      .then(response => response.json())
      .then(data => {
        console.log("Wishes stats:", data);
        if (data.status === "success" && data.data) {
          setStats({
            totalInvitations: mappedInvitations.length,
            totalWishes: data.data.total_wishes || 0,
            totalViews: mappedInvitations.reduce((sum: number, inv: unknown) => sum + (inv as { views: number })?.views, 0),
            totalImages: 10 // This should come from images API
          });
        } else {
          // Fallback to default stats if API fails
          setStats({
            totalInvitations: mappedInvitations.length,
            totalWishes: 0,
            totalViews: mappedInvitations.reduce((sum: number, inv: unknown) => sum + (inv as { views: number })?.views, 0),
            totalImages: 10
          });
        }
      })
      .catch(error => {
        console.error("Error fetching wishes stats:", error);
        // Fallback to default stats if API fails
        setStats({
          totalInvitations: mappedInvitations.length,
          totalWishes: 0,
          totalViews: mappedInvitations.reduce((sum: number, inv: unknown) => sum + (inv as { views: number })?.views, 0),
          totalImages: 10
        });
      });
  }

  useEffect(() => {
    getInvitations();
  }, [user]);

  const filteredInvitations = invitations.filter(invitation => {
    const matchesSearch = invitation.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" ||
      (activeFilter === "draft" && invitation.status === "Bản nháp") ||
      (activeFilter === "upcoming" && invitation.status === "Sắp xuất bản") ||
      (activeFilter === "published" && invitation.status === "Đã xuất bản") ||
      (activeFilter === "expired" && invitation.status === "Hết hạn");

    return matchesSearch && matchesFilter;
  });

  const handleActionClick = (event: React.MouseEvent, invitationId: string) => {
    event.preventDefault();
    event.stopPropagation();

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setActionMenu({
      isOpen: true,
      position: {
        x: rect.left - 160, // Offset to show menu to the left of button
        y: rect.bottom + 5
      },
      invitationId
    });
  };

  const handleActionMenuClose = () => {
    setActionMenu(prev => ({ ...prev, isOpen: false }));
  };

  const handleAction = (action: string) => {
    const invitation = invitations.find(inv => inv.id.toString() === actionMenu.invitationId);
    if (!invitation) return;

    switch (action) {
      case "publish":
        console.log("Xuất bản thiệp:", invitation.name);
        // Handle publish logic
        break;
      case "view":
        setDetailModal({
          isOpen: true,
          invitation: {
            id: invitation.id.toString(),
            name: invitation.name,
            price: invitation.price,
            url: invitation.public_url ? process.env.NEXT_PUBLIC_BASE_URL + invitation.public_url : "mimy.vn/huyenmy-duclong",
            views: invitation.views || 0,
            wishes: 0,
            startDate: invitation.startDate,
            endDate: invitation.endDate
          }
        });
        break;
      case "edit":
        console.log("Chỉnh sửa:", invitation.name);
        router.push(`/invitations/edit/${invitation.id}`);
        // Navigate to edit page
        break;
      case "wishes":
        setWishesModal({
          isOpen: true,
          invitationId: invitation.id.toString(),
          invitationName: invitation.name
        });
        break;
      case "delete":
        setDeleteModal({
          isOpen: true,
          invitationId: invitation.id.toString(),
          invitationName: invitation.name
        });
        break;
    }
  };

  const handleDeleteConfirm = async () => {
    const invitationId = deleteModal.invitationId;
    if (!invitationId) return;

    try {
      // Call delete API
      const response = await fetch(`/api/orders?id=${invitationId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.status === "success") {
        // Remove from local state
        setInvitations(prev => prev.filter(inv => inv.id.toString() !== invitationId));

        // Update stats
        setStats(prev => ({
          ...prev,
          totalInvitations: prev.totalInvitations - 1
        }));

        // Show toast success
        toast.success("Xóa thiệp thành công!");

        console.log("Invitation deleted successfully:", invitationId);
      } else {
        console.error("Failed to delete invitation:", data.message);
        toast.error("Xóa thiệp thất bại! Vui lòng thao tác lại.");
        // You could show a toast error here
      }
    } catch (error) {
      console.error("Error deleting invitation:", error);
      toast.error("Xóa thiệp thất bại! Vui lòng thao tác lại.");
      // You could show a toast error here
    }

    // Close modal regardless of success/failure
    setDeleteModal({ isOpen: false, invitationId: null, invitationName: "" });
  };

  // Dummy data for invitations
  // const invitations: Invitation[] = [
  //   {
  //     id: 1,
  //     name: 'Thiệp hồng "Sakura"',
  //     price: 0,
  //     quantity: 0,
  //     status: "Bản nháp",
  //     startDate: "",
  //     endDate: "",
  //   },
  //   {
  //     id: 2,
  //     name: 'Thiệp hồng "Sakura" (1)',
  //     price: 150000,
  //     quantity: 500,
  //     status: "Đã thanh toán",
  //     startDate: "10/08/2024",
  //     endDate: "20/08/2024",
  //   },
  // ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      ref={sectionRef}
      className="w-full py-8"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-[#fd8c06] mb-1">{stats.totalInvitations}</div>
              <div className="text-sm text-gray-600">Thiệp đã tạo</div>
            </div>
            <div className="w-10 h-10 bg-[#FFF8E6] rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-[#fd8c06]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-[#fd8c06] mb-1">{stats.totalWishes}</div>
              <div className="text-sm text-gray-600">Lời chúc</div>
            </div>
            <div className="w-10 h-10 bg-[#FFF8E6] rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-[#fd8c06]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-[#fd8c06] mb-1">{stats.totalViews}</div>
              <div className="text-sm text-gray-600">Lượt xem thiệp</div>
            </div>
            <div className="w-10 h-10 bg-[#FFF8E6] rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-[#fd8c06]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs and Table */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 lg:p-6 border-b gap-4">
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === "all"
                  ? "bg-[#fd8c06] text-white"
                  : "text-gray-600 hover:text-[#fd8c06] hover:bg-[#FFF8E6]"
                }`}
            >
              Tất cả ({invitations.length})
            </button>
            <button
              onClick={() => setActiveFilter("draft")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === "draft"
                  ? "bg-[#fd8c06] text-white"
                  : "text-gray-600 hover:text-[#fd8c06] hover:bg-[#FFF8E6]"
                }`}
            >
              Bản nháp ({invitations.filter(i => i.status === "Bản nháp").length})
            </button>
            <button
              onClick={() => setActiveFilter("upcoming")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === "upcoming"
                  ? "bg-[#fd8c06] text-white"
                  : "text-gray-600 hover:text-[#fd8c06] hover:bg-[#FFF8E6]"
                }`}
            >
              Sắp xuất bản ({invitations.filter(i => i.status === "Sắp xuất bản").length})
            </button>
            <button
              onClick={() => setActiveFilter("published")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === "published"
                  ? "bg-[#fd8c06] text-white"
                  : "text-gray-600 hover:text-[#fd8c06] hover:bg-[#FFF8E6]"
                }`}
            >
              Đã xuất bản ({invitations.filter(i => i.status === "Đã xuất bản").length})
            </button>
            <button
              onClick={() => setActiveFilter("expired")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === "expired"
                  ? "bg-[#fd8c06] text-white"
                  : "text-gray-600 hover:text-[#fd8c06] hover:bg-[#FFF8E6]"
                }`}
            >
              Hết hạn ({invitations.filter(i => i.status === "Hết hạn").length})
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 whitespace-nowrap">Ngày hết hạn</span>
              <input
                type="date"
                className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#fd8c06] focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 whitespace-nowrap">Ngày bắt đầu</span>
              <input
                type="date"
                className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#fd8c06] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Desktop Table - Hidden on mobile/tablet */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left text-md font-bold text-gray-600">Tên thiệp</th>
                <th className="px-6 py-4 text-left text-md font-bold text-gray-600">Trạng thái</th>
                <th className="px-6 py-4 text-left text-md font-bold text-gray-600">Đường dẫn</th>
                <th className="px-6 py-4 text-left text-md font-bold text-gray-600">Ngày bắt đầu</th>
                <th className="px-6 py-4 text-left text-md font-bold text-gray-600">Ngày hết hạn</th>
                <th className="px-6 py-4 text-left text-md font-bold text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvitations.map((invitation) => (
                <tr key={invitation.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{invitation.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    {invitation.status === "Đã xuất bản" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                        Đã xuất bản
                      </span>
                    ) : invitation.status === "Sắp xuất bản" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1.5"></div>
                        Sắp xuất bản
                      </span>
                    ) : invitation.status === "Hết hạn" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></div>
                        Hết hạn
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5"></div>
                        Bản nháp
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {invitation.public_url ? (
                      <div className="flex items-center text-blue-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                        <span onClick={() => window.open(process.env.NEXT_PUBLIC_BASE_URL + invitation.public_url, '_blank')} className=" cursor-pointer text-sm">{process.env.NEXT_PUBLIC_BASE_URL + invitation.public_url}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{invitation.startDate || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{invitation.endDate || "-"}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Thao tác</span>
                      <button
                        onClick={(e) => handleActionClick(e, invitation.id.toString())}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card Layout - Shown on mobile/tablet */}
        <div className="lg:hidden space-y-4">
          {filteredInvitations.map((invitation) => (
            <div key={invitation.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              {/* Header with name and action button */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-lg mb-2">{invitation.name}</h3>
                  <div className="mb-2">
                    {invitation.status === "Đã xuất bản" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                        Đã xuất bản
                      </span>
                    ) : invitation.status === "Sắp xuất bản" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1.5"></div>
                        Sắp xuất bản
                      </span>
                    ) : invitation.status === "Hết hạn" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></div>
                        Hết hạn
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5"></div>
                        Bản nháp
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={(e) => handleActionClick(e, invitation.id.toString())}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded hover:bg-gray-100 ml-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>

              {/* URL Section */}
              {invitation.public_url && (
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">Đường dẫn</div>
                  <div className="flex items-center text-blue-600">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                    <span
                      onClick={() => window.open(process.env.NEXT_PUBLIC_BASE_URL + invitation.public_url, '_blank')}
                      className="cursor-pointer text-sm break-all"
                    >
                      {process.env.NEXT_PUBLIC_BASE_URL + invitation.public_url}
                    </span>
                  </div>
                </div>
              )}

              {/* Dates Section */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Ngày bắt đầu</div>
                  <div className="text-gray-900">{invitation.startDate || "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Ngày hết hạn</div>
                  <div className="text-gray-900">{invitation.endDate || "-"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Action Menu */}
      <ActionMenu
        isOpen={actionMenu.isOpen}
        onClose={handleActionMenuClose}
        position={actionMenu.position}
        onAction={handleAction}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, invitationId: null, invitationName: "" })}
        onConfirm={handleDeleteConfirm}
        invitationName={deleteModal.invitationName}
      />

      {/* Invitation Detail Modal */}
      <InvitationDetailModal
        isOpen={detailModal.isOpen}
        onClose={() => setDetailModal({ isOpen: false, invitation: null })}
        invitation={detailModal.invitation}
      />

      {/* Wishes Modal */}
      <WishesModal
        isOpen={wishesModal.isOpen}
        onClose={() => setWishesModal({ isOpen: false, invitationId: null, invitationName: "" })}
        invitationTitle={wishesModal.invitationName}
        orderId={wishesModal.invitationId || undefined}
      />
    </motion.div>
  );
}
