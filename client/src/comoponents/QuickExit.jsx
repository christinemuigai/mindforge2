import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export default function QuickExit() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('quickExitPopupSeen');
    if (!hasSeenPopup) {
      setShowPopup(true);
      sessionStorage.setItem('quickExitPopupSeen', 'true');
    }
  }, []);

  const handleQuickExit = () => {
    // Replace the current history entry so the back button doesn't work
    window.location.replace('https://www.google.com');
  };

  return (
    <>
      <button
        onClick={handleQuickExit}
        title="Quick Exit"
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-red-300"
        aria-label="Quick Exit"
      >
        <FiX size={28} strokeWidth={3} />
      </button>

      {showPopup && (
        <div className="fixed bottom-24 left-6 z-50 w-80 bg-white border border-red-200 rounded-lg shadow-2xl p-4 text-sm text-gray-800">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-red-600 text-base">Quick Exit Button</h3>
            <button 
              onClick={() => setShowPopup(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors mt-1"
              aria-label="Close message"
            >
              <FiX size={18} />
            </button>
          </div>
          <div className="space-y-3">
            <p className="leading-relaxed">
              <strong>What it does:</strong> Clicking the red exit button closes your tab instantly. If your browser prevents that, a safe website replaces this page instead.
            </p>
            <p className="leading-relaxed">
              <strong>When to use it:</strong> Click it whenever you need to leave quickly and privately—whether someone's approaching, you feel unsafe, or you just want to exit discreetly.
            </p>
          </div>
          <button 
            onClick={() => setShowPopup(false)}
            className="mt-4 w-full bg-red-50 text-red-600 hover:bg-red-100 font-medium py-2 px-4 rounded transition-colors"
          >
            I understand
          </button>
        </div>
      )}
    </>
  );
}
