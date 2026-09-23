// data/securities.ts
import type { Security, SecurityQuote } from "@/types/security";

/** Дасгал 2-ын анхны өгөгдөл */
export const RAW_SECURITIES: Security[] = [
  { id: 1, ticker: "APU", name: "АПУ", sector: "Хүнс", price: 12500, changePercent: 1.2, volume: 3400 },
  { id: 2, ticker: "TDB", name: "ХХБ", sector: "Банк", price: 3200, changePercent: -0.8, volume: 8100 },
  { id: 3, ticker: "MIK", name: "МИК Холдинг", sector: "Санхүү", price: 980, changePercent: 2.5, volume: 15200 },
  { id: 4, ticker: "SUU", name: "Сүү", sector: "Хүнс", price: 4100, changePercent: 0.0, volume: 2100 },
  { id: 5, ticker: "GOV", name: "Говь", sector: "Хөнгөн үйлдвэр", price: 15800, changePercent: -1.5, volume: 900 },
  { id: 6, ticker: "BDS", name: "Багануур", sector: "Уул уурхай", price: 2200, changePercent: 3.1, volume: 5400 },
];

/** Дасгал 3-ын mock "backend" өгөгдөл */
export const SECURITY_QUOTES_DB: SecurityQuote[] = [
  { id: 1, ticker: "APU", price: 12500 },
  { id: 2, ticker: "TDB", price: 3200 },
  { id: 3, ticker: "MIK", price: 980 },
];
