'use client';
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { usePathname, useRouter } from 'next/navigation';
import {
  RiAddFill,
  RiMoonLine,
  RiSunLine,
  RiTerminalBoxFill,
  RiUser3Line,
} from '@remixicon/react';
import Link from 'next/link';
import { useUserStore } from '@/stores/userStore';

const Navbar = () => {
  const { name, role } = useUserStore((state) => state);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const router = useRouter();
  const auth_routes = ['/auth/register', '/auth/login'];
  const pathname = usePathname();

  const handleChangeTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    document.documentElement.classList.toggle('dark');
  };

  if (auth_routes.includes(pathname)) {
    return null;
  }

  return (
    <nav className="border-b border-gray-300 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-950 z-[100]">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <Link href="/home">
          <div className="flex items-center gap-1 dark:text-white">
            <h2 className="font-bold">DevCamper</h2>
            <RiTerminalBoxFill className="h-6 w-6" />
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="secondary" onClick={handleChangeTheme}>
            {theme === 'light' ? (
              <RiSunLine className="h-5 w-5" />
            ) : (
              <RiMoonLine className="h-5 w-5" />
            )}
          </Button>
          <Link href="/profile">
            <Button variant="secondary" className="flex items-center gap-2">
              {name?.length >= 15 ? `${name?.substring(0, 15)}...` : name}
              <RiUser3Line className="h-5 w-5" />
            </Button>
          </Link>

          {pathname !== '/createBootcamp' &&
            (role === 'publisher' || role === 'admin') && (
              <Button
                variant="primary"
                onClick={() => router.push('/addBootcamp')}
                className="flex items-center gap-2"
              >
                <RiAddFill className="h-5 w-5" />
                Add Bootcamp
              </Button>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
