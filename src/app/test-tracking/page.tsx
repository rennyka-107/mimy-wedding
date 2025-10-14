"use client";

import Link from "next/link";

export default function TestTrackingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Test Visit Tracking
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Hướng dẫn test:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Mở DevTools Console (F12) để xem logs</li>
            <li>Click vào một trong các link bên dưới</li>
            <li>Xem console để thấy sub_id được detect</li>
            <li>Check trang admin để thấy lượt visit được ghi nhận</li>
          </ol>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Links với sub_id:</h2>
          <div className="space-y-3">
            <Link
              href="/?sub_id=facebook"
              className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              target="_blank"
            >
              <span className="font-semibold text-blue-700">Facebook:</span>{" "}
              <code className="text-sm bg-blue-200 px-2 py-1 rounded">
                /?sub_id=facebook
              </code>
            </Link>

            <Link
              href="/?sub_id=tiktok"
              className="block p-4 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors"
              target="_blank"
            >
              <span className="font-semibold text-pink-700">TikTok:</span>{" "}
              <code className="text-sm bg-pink-200 px-2 py-1 rounded">
                /?sub_id=tiktok
              </code>
            </Link>

            <Link
              href="/?sub_id=google"
              className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              target="_blank"
            >
              <span className="font-semibold text-green-700">Google:</span>{" "}
              <code className="text-sm bg-green-200 px-2 py-1 rounded">
                /?sub_id=google
              </code>
            </Link>

            <Link
              href="/?sub_id=email_campaign"
              className="block p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              target="_blank"
            >
              <span className="font-semibold text-purple-700">Email Campaign:</span>{" "}
              <code className="text-sm bg-purple-200 px-2 py-1 rounded">
                /?sub_id=email_campaign
              </code>
            </Link>

            <Link
              href="/?sub_id=instagram"
              className="block p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
              target="_blank"
            >
              <span className="font-semibold text-orange-700">Instagram:</span>{" "}
              <code className="text-sm bg-orange-200 px-2 py-1 rounded">
                /?sub_id=instagram
              </code>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test Direct Access (no sub_id):</h2>
          <Link
            href="/"
            className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            target="_blank"
          >
            <span className="font-semibold text-gray-700">Direct Access:</span>{" "}
            <code className="text-sm bg-gray-200 px-2 py-1 rounded">/</code>
            <p className="text-sm text-gray-600 mt-2">
              Sẽ được ghi nhận với sub_id = null (Direct)
            </p>
          </Link>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            <strong>Lưu ý:</strong> Mỗi lượt visit chỉ được ghi nhận 1 lần trong vòng 30 phút.
            Để test lại, bạn cần:
          </p>
          <ul className="list-disc list-inside mt-2 text-yellow-700 text-sm">
            <li>Clear sessionStorage (DevTools → Application → Session Storage)</li>
            <li>Hoặc đợi 30 phút</li>
            <li>Hoặc sử dụng Incognito mode</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/admin"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Xem Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
