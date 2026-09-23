// lib/securities.ts
import { ALL_SECTORS } from "@/constants/securities";
import type { Security, SectorFilter, SortConfig, SortField } from "@/types/security";

interface SecurityFilterParams {
  search: string;
  sector: SectorFilter;
}

export function filterSecurities(
  securities: Security[],
  { search, sector }: SecurityFilterParams
): Security[] {
  const normalizedSearch = search.toLowerCase();

  return securities.filter(
    (s) =>
      s.ticker.toLowerCase().includes(normalizedSearch) &&
      (sector === ALL_SECTORS || s.sector === sector)
  );
}

/** Эх массивыг mutate хийхгүй — үргэлж ШИНЭ массив буцаана */
export function sortSecurities(securities: Security[], sort: SortConfig | null): Security[] {
  if (!sort) return securities;

  const factor = sort.direction === "asc" ? 1 : -1;
  return [...securities].sort((a, b) => (a[sort.field] - b[sort.field]) * factor);
}

/** Ижил багана дээр дахин дарвал чиглэл солигдоно, өөр баганад asc-аас эхэлнэ */
export function getNextSortConfig(current: SortConfig | null, field: SortField): SortConfig {
  if (current?.field === field) {
    return { field, direction: current.direction === "asc" ? "desc" : "asc" };
  }
  return { field, direction: "asc" };
}

export function calculateMarketValue(securities: Security[]): number {
  return securities.reduce((sum, s) => sum + s.price * s.volume, 0);
}

export function applyPriceChange(securities: Security[], id: number, rate: number): Security[] {
  return securities.map((s) => (s.id === id ? { ...s, price: s.price * rate } : s));
}
