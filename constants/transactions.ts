// constants/transactions.ts
import type { StatusFilter, TransactionStatus } from "@/types/transaction";

export const ALL_STATUSES = "all" as const satisfies StatusFilter;

export const TRANSACTIONS_PAGE_SIZE = 5;

/**
 * Төлөв бүрийн бичиг, өнгө — нэг л газар тодорхойлно.
 * Record<TransactionStatus, ...> учир шинэ төлөв нэмбэл энд заавал бичих
 * шаардлагатай болно (compile-time шалгалт).
 */
export const STATUS_CONFIG: Record<TransactionStatus, { label: string; color: string }> = {
  success: { label: "Амжилттай", color: "green" },
  pending: { label: "Хүлээгдэж буй", color: "orange" },
  failed: { label: "Цуцлагдсан", color: "red" },
};

export const STATUS_FILTER_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: ALL_STATUSES, label: "Бүгд" },
  ...(Object.keys(STATUS_CONFIG) as TransactionStatus[]).map((status) => ({
    value: status,
    label: STATUS_CONFIG[status].label,
  })),
];
