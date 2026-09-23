// data/transactions.ts
import type { Transaction } from "@/types/transaction";

export const TRANSACTIONS: Transaction[] = [
  { id: 1, name: "Батбаяр", amount: 250000, status: "success", date: "2026-09-01" },
  { id: 2, name: "Оюунчимэг", amount: -120000, status: "pending", date: "2026-09-02" },
  { id: 3, name: "Ганбат", amount: 500000, status: "failed", date: "2026-09-03" },
  { id: 4, name: "Сарантуяа", amount: 75000, status: "success", date: "2026-09-03" },
  { id: 5, name: "Бямбадорж", amount: -300000, status: "success", date: "2026-09-04" },
  { id: 6, name: "Мөнхзул", amount: 180000, status: "pending", date: "2026-09-05" },
  { id: 7, name: "Тэмүүлэн", amount: -50000, status: "failed", date: "2026-09-05" },
  { id: 8, name: "Ням", amount: 620000, status: "success", date: "2026-09-06" },
  { id: 9, name: "Уранцэцэг", amount: 90000, status: "pending", date: "2026-09-07" },
  { id: 10, name: "Дорж", amount: -15000, status: "success", date: "2026-09-08" },
];
