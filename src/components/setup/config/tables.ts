import { TableInfo } from '@/utils/supabase/tableVerification';

export const requiredTables: TableInfo[] = [
  {
    name: 'users',
    description: 'User profiles and settings',
    exists: false,
    checking: false
  },
  {
    name: 'emails',
    description: 'Email data and metadata',
    exists: false,
    checking: false
  },
  {
    name: 'email_threads',
    description: 'Email conversation threads',
    exists: false,
    checking: false
  },
  {
    name: 'ai_suggestions',
    description: 'AI-generated email responses',
    exists: false,
    checking: false
  },
  {
    name: 'email_categories',
    description: 'Custom email categorization',
    exists: false,
    checking: false
  },
  {
    name: 'token_usage',
    description: 'AI token usage tracking',
    exists: false,
    checking: false
  }
];