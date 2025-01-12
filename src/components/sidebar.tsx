'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Info, Settings, User, PlusCircle, FileSliders } from 'lucide-react';

const Sidebar = () => {
  const [isOpen] = useState(true);

  const menuItems = [
    { name: 'Home', href: '/', icon: <Home size={20} /> },
    { name: 'About', href: '/about', icon: <Info size={20} /> },
    { name: 'Profile', href: '/profile', icon: <User size={20} /> },
    { name: 'Settings', href: '/settings', icon: <Settings size={20} /> },
    { name: 'Add Note', href: '/add-note', icon: <PlusCircle size={20} /> }, // Link Add Note
    { name: 'Edit Note', href: '/edit-note', icon: <FileSliders size={20} /> },
  ];

  return (
    <div>
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white shadow-lg">
        <div className="p-6 flex flex-col justify-between h-full">
          {/* Sidebar Content */}
          <div>
            <h1 className="text-2xl font-bold mb-8">My Notes</h1>
            <nav>
              <ul className="space-y-4">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 transition"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
