import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { isLocale } from "@/lib/locales";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main className="flex flex-1 items-center justify-center p-8">
      <h1 className="text-4xl font-bold">{getContent(locale).siteTitle}</h1>
    </main>
  );
}
