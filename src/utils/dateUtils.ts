export function formatEmailTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  
  if (diff < minute) {
    return 'Just now';
  }
  
  if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes}m ago`;
  }
  
  if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours}h ago`;
  }
  
  // If less than 7 days ago, show day name
  if (diff < 7 * day) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
  
  // If this year, show month and day
  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  
  // Otherwise show full date
  return date.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}