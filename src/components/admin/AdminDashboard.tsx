"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import UserManagement from "./UserManagement";

interface Visit {
  id: string;
  ip: string;
  visit_time: string;
  region: string | null;
  sub_id: string | null;
  createdAt: string;
}

type TabType = "visits" | "users";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("visits");
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  // Advanced filters
  const [timeFilter, setTimeFilter] = useState<string>("");
  const [ipFilter, setIpFilter] = useState<string>("");
  const [sourceFilter, setSourceFilter] = useState<string>("");
  // Expandable IP groups
  const [expandedIPs, setExpandedIPs] = useState<Set<string>>(new Set());
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    uniqueIPs: 0,
  });
  const router = useRouter();

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    try {
      // Get all visits (up to 1000) for admin
      const url = filter
        ? `/api/visits?sub_id=${filter}&limit=1000`
        : "/api/visits?limit=1000";
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "success") {
        setVisits(data.data);
        calculateStats(data.data);
      }
    } catch (err) {
      console.error("Error fetching visits:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (visitsData: Visit[]) => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const uniqueIPs = new Set(visitsData.map(v => v.ip)).size;
    const todayCount = visitsData.filter(v => new Date(v.visit_time) >= todayStart).length;
    const weekCount = visitsData.filter(v => new Date(v.visit_time) >= weekStart).length;

    setStats({
      total: visitsData.length,
      today: todayCount,
      thisWeek: weekCount,
      uniqueIPs,
    });
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getSubIdSummary = () => {
    const subIdMap = new Map<string, number>();
    visits.forEach(visit => {
      const subId = visit.sub_id || "Direct";
      subIdMap.set(subId, (subIdMap.get(subId) || 0) + 1);
    });
    return Array.from(subIdMap.entries()).sort((a, b) => b[1] - a[1]);
  };

  // Apply filters to visits
  const getFilteredVisits = () => {
    return visits.filter(visit => {
      // Time filter
      if (timeFilter) {
        const visitDate = new Date(visit.visit_time);
        const now = new Date();
        
        switch(timeFilter) {
          case "today":
            const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            if (visitDate < todayStart) return false;
            break;
          case "yesterday":
            const yesterdayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
            const yesterdayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            if (visitDate < yesterdayStart || visitDate >= yesterdayEnd) return false;
            break;
          case "7days":
            const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            if (visitDate < weekStart) return false;
            break;
          case "30days":
            const monthStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            if (visitDate < monthStart) return false;
            break;
        }
      }
      
      // IP filter
      if (ipFilter && !visit.ip.toLowerCase().includes(ipFilter.toLowerCase())) {
        return false;
      }
      
      // Source filter
      if (sourceFilter) {
        const source = visit.sub_id || "direct";
        if (!source.toLowerCase().includes(sourceFilter.toLowerCase())) {
          return false;
        }
      }
      
      return true;
    });
  };

  const handleClearFilters = () => {
    setTimeFilter("");
    setIpFilter("");
    setSourceFilter("");
    setFilter("");
  };

  // Group visits by IP
  const getGroupedVisits = () => {
    const filteredVisits = getFilteredVisits();
    const grouped = new Map<string, Visit[]>();
    
    filteredVisits.forEach(visit => {
      const existing = grouped.get(visit.ip) || [];
      existing.push(visit);
      grouped.set(visit.ip, existing);
    });
    
    // Sort by number of visits (descending)
    return Array.from(grouped.entries())
      .map(([ip, visits]) => ({ ip, visits }))
      .sort((a, b) => b.visits.length - a.visits.length);
  };

  const toggleIPExpand = (ip: string) => {
    const newExpanded = new Set(expandedIPs);
    if (newExpanded.has(ip)) {
      newExpanded.delete(ip);
    } else {
      newExpanded.add(ip);
    }
    setExpandedIPs(newExpanded);
  };

  const getMostRecentVisit = (visits: Visit[]) => {
    return visits.reduce((latest, visit) => {
      return new Date(visit.visit_time) > new Date(latest.visit_time) ? visit : latest;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Đăng xuất
            </button>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("visits")}
              className={`pb-3 px-4 font-medium transition-colors ${
                activeTab === "visits"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Lượt truy cập
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`pb-3 px-4 font-medium transition-colors ${
                activeTab === "users"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Người dùng
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "visits" ? (
          <>
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Tổng lượt truy cập</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Hôm nay</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.today}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">7 ngày qua</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">{stats.thisWeek}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">IP duy nhất</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">{stats.uniqueIPs}</p>
          </div>
        </div>

        {/* Source Summary */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Nguồn truy cập</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {getSubIdSummary().map(([source, count]) => (
              <div key={source} className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 truncate">{source}</p>
                <p className="text-xl font-bold text-gray-900">{count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bộ lọc</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Time Period Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thời gian
              </label>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tất cả</option>
                <option value="today">Hôm nay</option>
                <option value="yesterday">Hôm qua</option>
                <option value="7days">7 ngày qua</option>
                <option value="30days">30 ngày qua</option>
              </select>
            </div>

            {/* IP Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa chỉ IP
              </label>
              <input
                type="text"
                value={ipFilter}
                onChange={(e) => setIpFilter(e.target.value)}
                placeholder="Nhập IP cần tìm..."
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Source Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nguồn truy cập
              </label>
              <input
                type="text"
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                placeholder="facebook, tiktok..."
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleClearFilters}
              variant="ghost"
              className="px-6 py-2"
            >
              Xóa tất cả bộ lọc
            </Button>
            <div className="flex-1" />
            <div className="text-sm text-gray-600 self-center">
              Hiển thị: <span className="font-semibold text-gray-900">{getFilteredVisits().length}</span> / {visits.length} lượt truy cập
            </div>
          </div>
        </div>

        {/* Visits Table - Grouped by IP */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Danh sách lượt truy cập theo IP ({getGroupedVisits().length} IP - {getFilteredVisits().length} lượt truy cập)
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Đang tải...</div>
          ) : getFilteredVisits().length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {visits.length === 0 ? "Chưa có lượt truy cập nào" : "Không tìm thấy lượt truy cập nào phù hợp với bộ lọc"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                      
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      STT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Địa chỉ IP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số lượt truy cập
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lần truy cập gần nhất
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Khu vực
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nguồn
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getGroupedVisits().map((group, index) => {
                    const isExpanded = expandedIPs.has(group.ip);
                    const mostRecent = getMostRecentVisit(group.visits);
                    
                    return (
                      <>
                        {/* Main IP Row */}
                        <tr 
                          key={group.ip} 
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => toggleIPExpand(group.ip)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="focus:outline-none">
                              {isExpanded ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              )}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-semibold text-gray-900">
                            {group.ip}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                              {group.visits.length} lượt
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(mostRecent.visit_time)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {mostRecent.region || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {mostRecent.sub_id ? (
                              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                                {mostRecent.sub_id}
                              </span>
                            ) : (
                              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                Direct
                              </span>
                            )}
                          </td>
                        </tr>
                        
                        {/* Expanded Detail Rows */}
                        {isExpanded && group.visits.map((visit, visitIndex) => (
                          <tr 
                            key={visit.id} 
                            className="bg-gray-50 border-l-4 border-blue-400"
                          >
                            <td className="px-6 py-3"></td>
                            <td className="px-6 py-3 whitespace-nowrap text-xs text-gray-500">
                              {index + 1}.{visitIndex + 1}
                            </td>
                            <td className="px-6 py-3 whitespace-nowrap text-xs text-gray-600">
                              <span className="ml-4">↳ Chi tiết lượt {visitIndex + 1}</span>
                            </td>
                            <td className="px-6 py-3 whitespace-nowrap text-xs text-gray-600">
                              -
                            </td>
                            <td className="px-6 py-3 whitespace-nowrap text-xs text-gray-700">
                              {formatDate(visit.visit_time)}
                            </td>
                            <td className="px-6 py-3 whitespace-nowrap text-xs text-gray-700">
                              {visit.region || "-"}
                            </td>
                            <td className="px-6 py-3 whitespace-nowrap">
                              {visit.sub_id ? (
                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                                  {visit.sub_id}
                                </span>
                              ) : (
                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                  Direct
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
          </>
        ) : (
          <UserManagement />
        )}
      </main>
    </div>
  );
}
