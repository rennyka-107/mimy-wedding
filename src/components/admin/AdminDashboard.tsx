"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

interface Visit {
  id: string;
  ip: string;
  visit_time: string;
  region: string | null;
  sub_id: string | null;
  createdAt: string;
}

export default function AdminDashboard() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Đăng xuất
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Filter */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium text-gray-700">Lọc theo nguồn:</label>
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Nhập sub_id (facebook, tiktok...)"
              className="flex-1 px-4 text-black py-2 border border-[#ffbb53] rounded-lg focus:ring-2 focus:ring-[#ffbb53] focus:border-transparent"
            />
            <Button
              onClick={fetchVisits}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Áp dụng
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setFilter("");
                setTimeout(fetchVisits, 0);
              }}
            >
              Xóa lọc
            </Button>
          </div>
        </div>

        {/* Visits Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Danh sách lượt truy cập ({visits.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Đang tải...</div>
          ) : visits.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Chưa có lượt truy cập nào</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      STT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thời gian
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
                  {visits.map((visit, index) => (
                    <tr key={visit.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {visit.ip}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(visit.visit_time)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {visit.region || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {visit.sub_id ? (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
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
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
