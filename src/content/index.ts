import type { Locale } from "@/lib/locales";
import en from "./en";
import ko from "./ko";

const content = { ko, en } satisfies Record<Locale, typeof ko>;

export function getContent(locale: Locale) {
  return content[locale];
}
