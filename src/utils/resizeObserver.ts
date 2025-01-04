// Utility to handle ResizeObserver errors
export function setupResizeObserverError() {
  // Suppress ResizeObserver loop limit exceeded error
  window.addEventListener('error', (e) => {
    if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
      e.stopImmediatePropagation();
    }
  });
}