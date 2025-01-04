import { Mail } from 'lucide-react';

interface ComposeButtonProps {
  onClick: () => void;
}

export function ComposeButton({ onClick }: ComposeButtonProps) {
  return (
    <button 
      onClick={onClick} 
      className="btn-primary flex items-center gap-2"
    >
      <Mail className="w-4 h-4" />
      Compose
    </button>
  );
}