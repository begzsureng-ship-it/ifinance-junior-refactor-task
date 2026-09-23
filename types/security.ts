// types/security.ts
import type { SECTORS } from "@/constants/securities";

export type Sector = (typeof SECTORS)[number];

/** Шүүлтүүрт "Бүх салбар" сонголтыг нэмсэн төрөл */
export type SectorFilter = Sector | "all";

export interface Security {
  id: number;
  ticker: string;
  name: string;
  sector: Sector;
  price: number;
  changePercent: number;
  volume: number;
}

/** Дасгал 3-ын хайлтын API-аас ирэх товч мэдээлэл */
export type SecurityQuote = Pick<Security, "id" | "ticker" | "price">;

export type SortField = "price" | "changePercent";
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}
