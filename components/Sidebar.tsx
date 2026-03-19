'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { navLinks } from '@/constants';
import Image from 'next/image';
import FeatureCard from './FeatureCard';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* DESKTOP / TABLET SIDEBAR */}
      <aside
        className="
          hidden md:flex flex-col
          h-screen bg-white
          transition-all duration-300
          md:w-20 hover:w-64 xl:w-64 group mt-8 gap-8
        "
      >
        <nav className="flex flex-col gap-2 pl-3">
          {navLinks.map(({ name, href, src }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={name}
                href={href}
                className={clsx(
                  'flex items-center rounded-sm transition-all',
                  'md:justify-start md:group-hover:justify-start',
                  ' gap-3',
                  isActive ? 'bg-primaryDeep/10' : 'hover:bg-gray-100',
                )}
              >
                {/* ICON */}
                <div
                  className={clsx(
                    'flex items-center justify-center rounded-lg transition py-4 px-3 shrink-0',
                    '',
                    isActive ? 'bg-text-primaryNormal' : '',
                  )}
                >
                  <Image
                    height={18}
                    width={18}
                    alt={name}
                    src={src}
                    className={clsx(isActive ? 'opacity-100' : 'opacity-70')}
                  />
                </div>

                {/* TEXT */}
                <span
                  className={clsx(
                    'desc-text text-sm font-medium whitespace-nowrap transition-all',
                    'md:opacity-0 md:w-0 md:overflow-hidden xl:opacity-100 xl:w-full xl:overflow-auto',
                    'group-hover:opacity-100 group-hover:w-auto',
                    isActive ? 'text-primaryNorma' : 'text-gray-600',
                  )}
                >
                  {name}
                </span>

                {/* ACTIVE INDICATOR */}
                {isActive && (
                  <div className=" xl:block ml-auto h-full w-1 rounded bg-primaryNorma" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="w-full mx-auto  max-w-58"></div>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <div
        className="
          fixed bottom-0 left-0 right-0
          md:hidden bg-white border-t
          flex justify-around items-center
          py-2 z-50 
        "
      >
        {navLinks.map(({ name, href, src }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={name}
              href={href}
              className="flex flex-col items-center text-xs"
            >
              {/* TEXT */}
              <span
                className={clsx(
                  'mb-2 opacity-0 active:opacity-100  font-medium transition',
                  isActive ? 'text-primaryNorma' : 'text-gray-500',
                )}
              >
                {name}
              </span>

              {/* ICON */}
              <div
                className={clsx(
                  'h-10 w-10 flex items-center justify-center rounded-lg transition',
                  isActive ? 'bg-text-primaryNormal' : 'bg-gray-100',
                )}
              >
                <Image
                  height={18}
                  width={18}
                  alt={name}
                  src={src}
                  className={clsx(isActive ? 'opacity-100' : 'opacity-70')}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
