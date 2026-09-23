// components/securities/SortableTitle.tsx
import { Button } from "antd";
import type { SortConfig, SortField } from "@/types/security";
import styles from "./securities.module.css";

interface SortableTitleProps {
  label: string;
  field: SortField;
  sortConfig: SortConfig | null;
  onSort: (field: SortField) => void;
}

function getArrow(field: SortField, sortConfig: SortConfig | null): string {
  if (sortConfig?.field !== field) return "↕";
  return sortConfig.direction === "asc" ? "↑" : "↓";
}

export default function SortableTitle({ label, field, sortConfig, onSort }: SortableTitleProps) {
  return (
    <Button type="link" className={styles.sortButton} onClick={() => onSort(field)}>
      {label} {getArrow(field, sortConfig)}
    </Button>
  );
}
