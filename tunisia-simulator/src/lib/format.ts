// Fixed locale so server- and client-rendered output always match.
const numberFormat = new Intl.NumberFormat("en-US");

export function formatNumber(value: number): string {
  return numberFormat.format(value);
}

/** Formats an amount given in millions, e.g. 5000 -> "5,000M TND". */
export function formatMillions(value: number, currency: "TND" | "USD"): string {
  return `${numberFormat.format(value)}M ${currency}`;
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** Formats an ISO `YYYY-MM-DD` game date, e.g. "1 Jan 2026". */
export function formatGameDate(isoDate: string): string {
  return dateFormat.format(new Date(`${isoDate}T00:00:00Z`));
}
