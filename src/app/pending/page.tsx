import { PendingList } from '@/components/email/PendingList';

export const metadata = {
  title: 'Pending | Smart Email Manager',
  description: 'Review pending emails',
};

export default function PendingPage() {
  return <PendingList />;
}