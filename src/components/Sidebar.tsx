import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Settings, FileText, Clock } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-64 bg-primary text-white h-full p-4">
      <div className="flex items-center gap-2 mb-8">
        <Mail className="w-8 h-8" />
        <h1 className="text-xl font-bold">Email Manager</h1>
      </div>
      
      <nav className="space-y-2">
        {[
          { path: '/', icon: Mail, label: 'Inbox' },
          { path: '/drafts', icon: FileText, label: 'Drafts' },
          { path: '/pending', icon: Clock, label: 'Pending' },
          { path: '/admin', icon: Settings, label: 'Admin' },
        ].map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            href={path}
            className={`flex items-center gap-2 p-2 rounded-md hover:bg-primary-light ${
              isActive(path) ? 'bg-primary-light' : ''
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}