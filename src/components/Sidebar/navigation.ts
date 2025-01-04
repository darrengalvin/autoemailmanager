import { Mail, Settings, FileText, Clock } from 'lucide-react';
import { NavigationItem } from './types';

export const navigationItems: NavigationItem[] = [
  { path: '/', icon: Mail, label: 'Inbox' },
  { path: '/drafts', icon: FileText, label: 'Drafts' },
  { path: '/pending', icon: Clock, label: 'Pending' },
  { path: '/admin', icon: Settings, label: 'Admin' },
];