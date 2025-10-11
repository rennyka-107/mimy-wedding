"use client";
import { useState } from "react";

export default function DatePickerExample() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Date Selection Example</h1>
      
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Select Publication Dates</h2>
        
        <div className="space-y-4">
          {/* Start Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Từ ngày</label>
            <div className="relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CE6F70]"
                min={new Date().toISOString().split('T')[0]}
              />
              <button 
                type="button"
                onClick={() => {
                  const today = new Date();
                  setStartDate(today.toISOString().split('T')[0]);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#CE6F70]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* End Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Đến ngày</label>
            <div className="relative">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CE6F70]"
                min={startDate || new Date().toISOString().split('T')[0]}
              />
              <button 
                type="button"
                onClick={() => {
                  if (startDate) {
                    // Set end date to 7 days after start date by default
                    const start = new Date(startDate);
                    const end = new Date(start);
                    end.setDate(end.getDate() + 7);
                    setEndDate(end.toISOString().split('T')[0]);
                  } else {
                    // If no start date, set end date to 7 days from today
                    const today = new Date();
                    const end = new Date(today);
                    end.setDate(end.getDate() + 7);
                    setEndDate(end.toISOString().split('T')[0]);
                  }
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#CE6F70]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Date Selection Instructions */}
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="font-medium text-blue-800 mb-2">Cách chọn ngày:</h3>
          <ol className="list-decimal pl-5 text-blue-700 space-y-1">
            <li>Nhấn vào biểu tượng lịch ở bên phải để chọn ngày tự động</li>
            <li>Nhấn vào ô nhập để mở lịch và chọn thủ công</li>
            <li>Biểu tượng lịch ở &quot;Từ ngày&quot; sẽ chọn ngày hiện tại</li>
            <li>Biểu tượng lịch ở &quot;Đến ngày&quot; sẽ chọn 7 ngày từ ngày bắt đầu</li>
          </ol>
        </div>
        
        {/* Selected Date Display */}
        {(startDate || endDate) && (
          <div className="mt-6 p-4 bg-green-50 rounded-md">
            <h3 className="font-medium text-green-800 mb-2">Ngày đã chọn:</h3>
            <p className="text-green-700">
              <strong>Từ ngày:</strong> {startDate || "Chưa chọn"}
            </p>
            <p className="text-green-700">
              <strong>Đến ngày:</strong> {endDate || "Chưa chọn"}
            </p>
            {startDate && endDate && (
              <p className="text-green-700 mt-2">
                <strong>Tổng số ngày:</strong> {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} ngày
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
