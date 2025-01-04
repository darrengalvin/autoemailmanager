import { Email } from '@/types';

export interface EmailListProps {
  emails: Email[];
  onEmailClick?: (email: Email) => void;
}

export interface EmailItemProps {
  email: Email;
  onClick?: () => void;
}