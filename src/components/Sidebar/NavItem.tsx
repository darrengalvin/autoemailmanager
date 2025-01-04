'use client';

import Link from 'next/link';
import { NavItemProps } from './types';

export function NavItem({ path, icon: Icon, label, isActive, isCollapsed }: NavItemProps) {
  const handleClick = () => {
    console.group('Navigation Item Clicked');
    console.log('Path:', path);
    console.log('Label:', label);
    console.log('Is Active:', isActive);
    console.log('Current Time:', new Date().toISOString());
    console.groupEnd();
  };

  return (
    <Link
      href={path}
      onClick={handleClick}
      className={`flex items-center gap-3 p-3 rounded-md hover:bg-primary-light mb-1 transition-all duration-200 group ${
        isActive ? 'bg-primary-light' : ''
      } ${isCollapsed ? 'justify-center w-12' : ''}`}
      title={isCollapsed ? label : undefined}
    >
      <div className={`flex-shrink-0 ${isCollapsed ? 'w-6 h-6 flex items-center justify-center' : ''}`}>
        <Icon className={`w-5 h-5 ${isCollapsed ? 'group-hover:scale-110 transition-transform' : ''}`} />
      </div>
      {!isCollapsed && <span className="text-sm">{label}</span>}
    </Link>
  );
}