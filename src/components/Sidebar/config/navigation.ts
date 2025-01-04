import { Mail, FileText, Clock, Settings } from 'lucide-react';
import { NavigationItem } from '../types';

export const navigationItems: NavigationItem[] = [
  { path: '/', icon: Mail, label: 'Inbox' },
  { path: '/drafts', icon: FileText, label: 'Drafts' },
  { path: '/pending', icon: Clock, label: 'Pending' },
  { path: '/settings', icon: Settings, label: 'Settings' }
];