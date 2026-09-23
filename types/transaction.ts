// types/transaction.ts
export type TransactionStatus = "success" | "pending" | "failed";

/** Шүүлтүүрт "Бүгд" сонголтыг нэмсэн төрөл */
export type StatusFilter = TransactionStatus | "all";

export interface Transaction {
  id: number;
  name: string;
  /** Эерэг бол орлого, сөрөг бол зарлага */
  amount: number;
  status: TransactionStatus;
  date: string;
}

export interface TransactionTotals {
  income: number;
  expense: number;
}
