interface Window {
  gtag?: (
    type: 'config' | 'event',
    trackingId: string,
    config?: Record<string, unknown>
  ) => void;
} 