type EventProps = Record<string, string | number | boolean>;

// No-op placeholder. Wire up a real analytics provider here later.
export function trackEvent(name: string, props?: EventProps): void {
  void name;
  void props;
}
