export function MicrosoftIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M0 0h11v11H0z"/>
      <path fill="currentColor" d="M12 0h11v11H12z"/>
      <path fill="currentColor" d="M0 12h11v11H0z"/>
      <path fill="currentColor" d="M12 12h11v11H12z"/>
    </svg>
  );
}