'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Package, BarChart2, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '@/lib/axios';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get('/api/auth/me');
        setUser(res.data || null);
      } catch (error) {
        console.error('Failed to fetch user');
        setUser(null);
      }
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/api/auth/logout');
      router.push('/auth/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const links = [
    { name: 'Products', href: '/dashboard/products', icon: Package },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  ];

  return (
    <>
      {/* Hamburger (Mobile) */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow"
      >
        <Menu size={20} className="text-gray-900" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col justify-between z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-semibold text-lg">{user?.name || 'Guest'}</span>
            <button title="Logout" className="hover:text-red-400" onClick={handleLogout}>
              <LogOut size={20} />
            </button>
          </div>

          {/* Nav */}
          <nav className="space-y-2">
            {links.map(({ name, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800 transition ${
                  pathname === href ? 'bg-gray-800' : ''
                }`}
              >
                <Icon size={18} />
                <span>{name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            className="flex items-center gap-2 text-red-500 hover:text-red-400 text-sm"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
