// constants/securities.ts
import type { SectorFilter } from "@/types/security";

export const SECTORS = ["Хүнс", "Банк", "Санхүү", "Хөнгөн үйлдвэр", "Уул уурхай"] as const;

export const ALL_SECTORS = "all" as const;

export const SECTOR_FILTER_OPTIONS: { value: SectorFilter; label: string }[] = [
  { value: ALL_SECTORS, label: "Бүх салбар" },
  ...SECTORS.map((sector) => ({ value: sector, label: sector })),
];

/** "vniig nemegdvvleh +1% " simulats osoltiin coffcent */
export const PRICE_SIMULATION_RATE = 1.01;

/** Хайлтын input-ийн\ */
export const SEARCH_DEBOUNCE_MS = 300;


export const MOCK_API_LATENCY_MS = 300;
