// components/securities/SecurityFilters.tsx
import { Input, Select, Space } from "antd";
import { SECTOR_FILTER_OPTIONS } from "@/constants/securities";
import type { SectorFilter } from "@/types/security";
import styles from "./securities.module.css";

interface SecurityFiltersProps {
  search: string;
  sector: SectorFilter;
  onSearchChange: (value: string) => void;
  onSectorChange: (value: SectorFilter) => void;
}

export default function SecurityFilters({
  search,
  sector,
  onSearchChange,
  onSectorChange,
}: SecurityFiltersProps) {
  return (
    <Space className={styles.filters}>
      <Input
        placeholder="Ticker хайх"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.filterControl}
      />
      <Select<SectorFilter>
        value={sector}
        onChange={onSectorChange}
        options={SECTOR_FILTER_OPTIONS}
        className={styles.filterControl}
      />
    </Space>
  );
}
