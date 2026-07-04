// Fixed Arabic (Tunisia) locale so server- and client-rendered output match.
// ar-TN uses Western (Latin) digits, as is standard in the Maghreb.
const LOCALE = "ar-TN";

const numberFormat = new Intl.NumberFormat(LOCALE);

export function formatNumber(value: number): string {
  return numberFormat.format(value);
}

/** Formats an amount given in millions, e.g. 5000 -> "5.000 مليون دينار". */
export function formatMillions(value: number, currency: "TND" | "USD"): string {
  const unit = currency === "TND" ? "دينار" : "دولار";
  return `${numberFormat.format(value)} مليون ${unit}`;
}

/** Arabic month-count phrase with correct grammatical number, e.g. "شهران". */
export function formatMonths(count: number): string {
  if (count === 1) return "شهر واحد";
  if (count === 2) return "شهران";
  if (count >= 3 && count <= 10) return `${count} أشهر`;
  return `${count} شهرًا`;
}

const dateFormat = new Intl.DateTimeFormat(LOCALE, {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** Formats an ISO `YYYY-MM-DD` game date, e.g. "1 جانفي 2026". */
export function formatGameDate(isoDate: string): string {
  return dateFormat.format(new Date(`${isoDate}T00:00:00Z`));
}
