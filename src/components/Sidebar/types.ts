import { LucideIcon } from 'lucide-react';

export interface NavItemProps {
  path: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  isCollapsed?: boolean;
}

export interface NavigationItem {
  path: string;
  icon: LucideIcon;
  label: string;
}