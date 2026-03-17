'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import AppLogo from './shared/AppLogo';

export default function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white sticky top-0 z-50">
      <div className="px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <AppLogo />
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {/* Intentionally  */}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown  */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 text-center">Menu</p>
          </div>
        </div>
      )}
    </header>
  );
}
