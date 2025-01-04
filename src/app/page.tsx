import { EmailDashboardWrapper } from '@/components/email/EmailDashboard/EmailDashboardWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inbox | Smart Email Manager',
  description: 'View and manage your emails',
};

export default function HomePage() {
  return <EmailDashboardWrapper />;
}