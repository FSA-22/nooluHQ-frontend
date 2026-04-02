'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Bell, ChevronDown, Search } from 'lucide-react';
import AppLogo from './shared/AppLogo';
import Image from 'next/image';
import clsx from 'clsx';
import { Input } from './ui/input';
import { useCurrentUserFromDashboard } from '@/hooks/useCurrentUser';

/* ---------------- SEARCH COMPONENT ---------------- */
function SearchBar() {
  return (
    <div className="w-full max-w-2xl">
      <div
        className="flex items-center gap-2 px-3 py-2 
      transition"
      >
        <Search size={16} className="text-gray-500" />
        <Input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent border-0 active:outline-none outline-none text-sm w-full placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}

/* ---------------- HEADER ---------------- */
export default function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading: loadingUser } = useCurrentUserFromDashboard();

  const pathname = usePathname();

  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <header className="w-full bg-white sticky top-0 z-50">
      <div className="px-4 md:px-6 h-16 flex items-center justify-between">
        {/* LEFT: Logo */}
        <div className="flex items-center">
          <AppLogo />
        </div>

        {/* CENTER: Search (Desktop only + Dashboard only) */}
        {isDashboard && (
          <div className="hidden md:flex flex-1 justify-center px-6">
            <SearchBar />
          </div>
        )}

        {/* RIGHT: Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {isDashboard && (
            <>
              {/* Notification */}
              <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                <Bell size={18} />
              </button>

              {/* User */}
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg transition">
                <Image
                  src="/icons/user-1.svg"
                  alt="avatar"
                  width={28}
                  height={28}
                  className="rounded-full"
                />
                <span className="text-sm font-medium">
                  {loadingUser ? 'loading user...' : user?.name || 'Guest'}
                </span>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </>
          )}
        </div>

        {/* MOBILE RIGHT */}
        <div className="flex md:hidden items-center gap-2">
          {/* Dashboard quick actions */}
          {isDashboard && (
            <>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Search size={18} />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Bell size={18} />
              </button>
            </>
          )}

          {/* Menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ---------------- MOBILE DROPDOWN ---------------- */}
      <div
        className={clsx(
          'md:hidden overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-100 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="px-4 pb-4">
          <div className="bg-gray-50 rounded-xl p-4 shadow-sm space-y-4">
            {/* Search (Dashboard only) */}
            {isDashboard && <SearchBar />}

            {/* User Section */}
            {isDashboard && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/icons/user-1.svg"
                    alt="avatar"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">Adebanjo Promise</p>
                    <p className="text-xs text-gray-500">Account Settings</p>
                  </div>
                </div>

                <ChevronDown size={18} className="text-gray-500" />
              </div>
            )}

            {/* Placeholder menu (extend later) */}
            <div className="pt-2 border-t">
              <p className="text-xs text-gray-400 text-center">
                Navigation / Menu Items
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
