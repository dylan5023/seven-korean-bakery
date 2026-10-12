import { writeFile } from "node:fs/promises";
import { defaultLocale } from "../src/lib/locales.ts";

// Pages applies this exact-match redirect before serving static assets.
await writeFile(
  new URL("../out/_redirects", import.meta.url),
  `/ /${defaultLocale} 302\n`,
);
