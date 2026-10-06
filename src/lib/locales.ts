export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];

// Default language. Change here to switch where "/" redirects.
export const defaultLocale: Locale = "ko";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
