import React from 'react';
import { FiX } from 'react-icons/fi';

export default function QuickExit() {
  const handleQuickExit = () => {
    // Replace the current history entry so the back button doesn't work
    window.location.replace('https://www.google.com');
  };

  return (
    <button
      onClick={handleQuickExit}
      title="Quick Exit"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-red-300"
      aria-label="Quick Exit"
    >
      <FiX size={28} strokeWidth={3} />
    </button>
  );
}
