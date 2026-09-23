// lib/transactions.ts
import { ALL_STATUSES } from "@/constants/transactions";
import type { StatusFilter, Transaction, TransactionTotals } from "@/types/transaction";

interface TransactionFilterParams {
  search: string;
  status: StatusFilter;
}

export function filterTransactions(
  transactions: Transaction[],
  { search, status }: TransactionFilterParams
): Transaction[] {
  const normalizedSearch = search.toLowerCase();

  return transactions.filter(
    (t) =>
      t.name.toLowerCase().includes(normalizedSearch) &&
      (status === ALL_STATUSES || t.status === status)
  );
}

export function calculateTotals(transactions: Transaction[]): TransactionTotals {
  return transactions.reduce<TransactionTotals>(
    (totals, { amount }) =>
      amount > 0
        ? { ...totals, income: totals.income + amount }
        : { ...totals, expense: totals.expense + Math.abs(amount) },
    { income: 0, expense: 0 }
  );
}
