import { Database, Table, Box, Mail, Palette, Info } from 'lucide-react';
import { WelcomeStep } from '../steps/WelcomeStep';
import { DatabaseConnection } from '../steps/DatabaseConnection';
import { TableSetup } from '../steps/TableSetup';
import { DummyDataSetup } from '../steps/DummyDataSetup';
import { EmailSetup } from '../steps/EmailSetup';
import { BrandingSetup } from '../steps/BrandingSetup';

// Welcome step is separate from the main setup steps
export const welcomeStep = {
  id: 'welcome' as const,
  title: 'Welcome',
  description: 'Project overview and getting started',
  icon: Info,
  component: WelcomeStep
};

// Main setup steps (excluding welcome)
export const setupSteps = [
  {
    id: 'database-connection',
    title: 'Database Connection',
    description: 'Connect to your Supabase project',
    icon: Database,
    component: DatabaseConnection
  },
  {
    id: 'table-setup',
    title: 'Table Setup',
    description: 'Create and verify required database tables',
    icon: Table,
    component: TableSetup
  },
  {
    id: 'dummy-data',
    title: 'Sample Data',
    description: 'Install sample data to explore the system',
    icon: Box,
    component: DummyDataSetup
  },
  {
    id: 'email',
    title: 'Email Connection',
    description: 'Connect your email account',
    icon: Mail,
    component: EmailSetup
  },
  {
    id: 'branding',
    title: 'Company Branding',
    description: 'Customize the appearance',
    icon: Palette,
    component: BrandingSetup
  }
] as const;

// Combined steps for internal use
export const steps = [welcomeStep, ...setupSteps] as const;

export type StepId = typeof steps[number]['id'];