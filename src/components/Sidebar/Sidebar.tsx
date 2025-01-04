'use client';

import { usePathname } from 'next/navigation';
import { Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { navigationItems } from './config/navigation';
import { NavItem } from './NavItem';
import { useState } from 'react';

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <aside 
      className={`bg-primary text-white h-full transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className={`flex items-center gap-2 p-4 ${isCollapsed ? 'justify-center' : ''}`}>
        <Mail className="w-8 h-8 flex-shrink-0" />
        {!isCollapsed && <h1 className="text-xl font-bold">Email Manager</h1>}
      </div>
      
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {navigationItems.map((item) => (
          <NavItem
            key={item.path}
            {...item}
            isActive={pathname === item.path}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-4 hover:bg-primary-light flex items-center justify-center text-white/80 hover:text-white transition-colors border-t border-white/10"
      >
        {isCollapsed ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <div className="flex items-center gap-2 w-full">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Collapse</span>
          </div>
        )}
      </button>
    </aside>
  );
}