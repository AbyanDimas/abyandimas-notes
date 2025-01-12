'use client';

import { useState } from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Settings</h1>
        <div className="mb-4">
          <label className="flex items-center space-x-4">
            <span className="text-gray-700">Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center space-x-4">
            <span className="text-gray-700">Enable Notifications</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded"
            />
          </label>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Save Settings
        </button>
      </div>
    </div>
  );
}
