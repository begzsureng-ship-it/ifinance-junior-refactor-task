// lib/format.ts
export const CURRENCY_SYMBOL = "₮";

// Locale-ийг тогтмол болгосноор server/client render ижил гарна (hydration зөрөхгүй).
const numberFormatter = new Intl.NumberFormat("en-US");

/** 1250000 → "1,250,000₮" */
export function formatMoney(value: number): string {
  return `${numberFormatter.format(value)}${CURRENCY_SYMBOL}`;
}

/** -120000 → "-120,000₮", 250000 → "+250,000₮" */
export function formatSignedMoney(value: number): string {
  const sign = value < 0 ? "-" : "+";
  return `${sign}${formatMoney(Math.abs(value))}`;
}
