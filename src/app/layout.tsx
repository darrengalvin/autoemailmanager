import '@/styles/globals.css';
import { Metadata } from 'next';
import { Providers } from './providers';
import { SidebarWrapper } from '@/components/Sidebar/SidebarWrapper';
import { AuthStatusHeader } from '@/components/common/AuthStatusHeader';

export const metadata: Metadata = {
  title: 'Smart Email Manager',
  description: 'AI-powered email management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <Providers>
          <div className="flex flex-col h-full">
            <AuthStatusHeader />
            <div className="flex flex-1 bg-gray-100">
              <SidebarWrapper />
              <main className="flex-1 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </Providers>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('error', function(e) {
              if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
                e.stopImmediatePropagation();
              }
            });
          `
        }} />
      </body>
    </html>
  );
}