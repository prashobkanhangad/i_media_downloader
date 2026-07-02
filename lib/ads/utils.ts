export type AdsbygoogleQueue = Record<string, unknown>;

declare global {
  interface Window {
    adsbygoogle?: AdsbygoogleQueue[];
  }
}

export function pushAdSenseAd(): void {
  try {
    window.adsbygoogle = window.adsbygoogle ?? [];
    window.adsbygoogle.push({});
  } catch {
    // Ad blockers or script load failures should not break the page.
  }
}
