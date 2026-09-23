// pages/index.tsx
import { useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import SummaryCards from "@/components/transactions/SummaryCards";
import TransactionFilters from "@/components/transactions/TransactionFilters";
import TransactionTable from "@/components/transactions/TransactionTable";
import { ALL_STATUSES } from "@/constants/transactions";
import { TRANSACTIONS } from "@/data/transactions";
import { calculateTotals, filterTransactions } from "@/lib/transactions";
import type { StatusFilter } from "@/types/transaction";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(ALL_STATUSES);

  const filteredTransactions = useMemo(
    () => filterTransactions(TRANSACTIONS, { search, status: statusFilter }),
    [search, statusFilter]
  );

  const totals = useMemo(() => calculateTotals(filteredTransactions), [filteredTransactions]);

  return (
    <PageLayout title="iFinance — Гүйлгээний жагсаалт (Дасгал 1)">
      <SummaryCards income={totals.income} expense={totals.expense} />

      <TransactionFilters
        search={search}
        status={statusFilter}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
      />

      <TransactionTable transactions={filteredTransactions} />
    </PageLayout>
  );
}
