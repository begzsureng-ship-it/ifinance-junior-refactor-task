// components/transactions/TransactionFilters.tsx
import { Input, Select, Space } from "antd";
import { STATUS_FILTER_OPTIONS } from "@/constants/transactions";
import type { StatusFilter } from "@/types/transaction";
import styles from "./transactions.module.css";

interface TransactionFiltersProps {
  search: string;
  status: StatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
}

export default function TransactionFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: TransactionFiltersProps) {
  return (
    <Space size={12} className={styles.filters}>
      <Input
        placeholder="Нэрээр хайх"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
      />
      <Select
        value={status}
        onChange={onStatusChange}
        options={STATUS_FILTER_OPTIONS}
        className={styles.statusSelect}
      />
    </Space>
  );
}
