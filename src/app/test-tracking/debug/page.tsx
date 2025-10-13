"use client";

import { useState } from "react";

export default function DebugTrackingPage() {
  const [testResult, setTestResult] = useState<any>(null);
  const [visits, setVisits] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [testSubId, setTestSubId] = useState("test_debug");

  const testDirectAPI = async () => {
    setLoading(true);
    setTestResult(null);

    try {
      console.log("=== TESTING DIRECT API CALL ===");
      console.log("Sending sub_id:", testSubId);

      const response = await fetch("/api/visits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sub_id: testSubId,
          region: "Debug Test",
        }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      setTestResult({
        success: response.ok,
        status: response.status,
        data: data,
      });

      // Refresh visits list
      await fetchVisits();
    } catch (error) {
      console.error("Error:", error);
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchVisits = async () => {
    try {
      const response = await fetch("/api/visits?limit=10");
      const data = await response.json();
      console.log("Fetched visits:", data);
      
      if (data.status === "success") {
        setVisits(data.data);
      }
    } catch (error) {
      console.error("Error fetching visits:", error);
    }
  };

  const clearSessionStorage = () => {
    sessionStorage.removeItem("visit_tracked");
    alert("Session storage cleared! Bạn có thể test lại.");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🔍 Debug Visit Tracking
        </h1>

        {/* Test Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Direct API Call</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub ID to test:
              </label>
              <input
                type="text"
                value={testSubId}
                onChange={(e) => setTestSubId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., facebook, tiktok, test_123"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={testDirectAPI}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {loading ? "Testing..." : "Test API Direct"}
              </button>

              <button
                onClick={fetchVisits}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Refresh Visits List
              </button>

              <button
                onClick={clearSessionStorage}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Clear Session Storage
              </button>
            </div>
          </div>

          {/* Test Result */}
          {testResult && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Test Result:</h3>
              <div
                className={`p-4 rounded-lg ${
                  testResult.success
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <p className="font-mono text-sm">
                  <strong>Status:</strong> {testResult.status}
                </p>
                <pre className="mt-2 text-xs overflow-auto">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Recent Visits */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Visits (Last 10)
          </h2>

          {visits.length === 0 ? (
            <p className="text-gray-500">
              Chưa có visits. Click "Test API Direct" để tạo visit mới.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      IP
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Sub ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Region
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Visit Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {visits.map((visit) => (
                    <tr key={visit.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">
                        {visit.id.substring(0, 8)}...
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">
                        {visit.ip}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {visit.sub_id ? (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {visit.sub_id}
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                            null
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {visit.region || "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {new Date(visit.visit_time).toLocaleString("vi-VN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            📝 Hướng dẫn Debug:
          </h3>
          <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
            <li>Mở DevTools Console (F12) để xem logs chi tiết</li>
            <li>Nhập sub_id vào ô input (ví dụ: "facebook")</li>
            <li>Click "Test API Direct" - sẽ gọi API trực tiếp</li>
            <li>Xem console logs để thấy data được gửi và nhận</li>
            <li>
              Check "Recent Visits" table để xem sub_id có được lưu đúng không
            </li>
            <li>
              Nếu sub_id = null, check console logs để tìm nguyên nhân
            </li>
          </ol>
        </div>

        {/* Console Logs Guide */}
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">
            🔎 Console Logs Cần Xem:
          </h3>
          <div className="text-yellow-800 text-sm space-y-1">
            <p>
              <strong>Frontend:</strong>
            </p>
            <pre className="text-xs bg-yellow-100 p-2 rounded">
              {`=== TESTING DIRECT API CALL ===
Sending sub_id: facebook`}
            </pre>
            <p className="mt-2">
              <strong>Backend (Terminal):</strong>
            </p>
            <pre className="text-xs bg-yellow-100 p-2 rounded">
              {`[API /visits POST] Received request body: { sub_id: 'facebook', region: 'Debug Test' }
[API /visits POST] Extracted sub_id: facebook
[API /visits POST] Data to insert: { ip: '::1', visit_time: ..., region: 'Debug Test', sub_id: 'facebook' }
[API /visits POST] Inserted successfully: { id: '...', sub_id: 'facebook', ... }`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
