import { DraftsList } from '@/components/email/DraftsList';

export const metadata = {
  title: 'Drafts | Smart Email Manager',
  description: 'Manage your email drafts',
};

export default function DraftsPage() {
  return <DraftsList />;
}