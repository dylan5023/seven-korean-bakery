"use client";

import { useEffect, useState } from "react";
import { business } from "@/lib/business";
import type { Locale } from "@/lib/locales";
import { getContent } from "@/content";

function getTodayInVancouver() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: business.timeZone,
    weekday: "long",
  }).format(new Date());
}

export function StoreHours({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    const updateToday = () => setToday(getTodayInVancouver());
    updateToday();
    const interval = window.setInterval(updateToday, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <dl className="hours-list">
      {business.hours.map((row) => {
        const isToday = today === row.day;
        return (
          <div
            className={`hours-row${isToday ? " is-today" : ""}`}
            key={row.day}
          >
            <dt>
              <span className="hours-language-pair">
                <span
                  className={
                    locale === "en" ? "hours-primary" : "hours-secondary"
                  }
                >
                  {locale === "en" ? row.en : row.ko}
                </span>
                <span
                  className={
                    locale === "en" ? "hours-secondary" : "hours-primary"
                  }
                  lang={locale === "en" ? "ko" : "en"}
                >
                  {locale === "en" ? row.ko : row.en}
                </span>
              </span>
              {isToday && (
                <span className="today-tag">{content.store.today}</span>
              )}
            </dt>
            <dd className="hours-language-pair hours-time-pair">
              <span
                className={
                  locale === "en" ? "hours-primary" : "hours-secondary"
                }
              >
                {locale === "en" ? row.hours : row.koHours}
              </span>
              <span
                className={
                  locale === "en" ? "hours-secondary" : "hours-primary"
                }
                lang={locale === "en" ? "ko" : "en"}
              >
                {locale === "en" ? row.koHours : row.hours}
              </span>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
