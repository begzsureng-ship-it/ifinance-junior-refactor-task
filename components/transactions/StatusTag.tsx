// components/transactions/StatusTag.tsx
import { Tag } from "antd";
import { STATUS_CONFIG } from "@/constants/transactions";
import type { TransactionStatus } from "@/types/transaction";

export default function StatusTag({ status }: { status: TransactionStatus }) {
  const { label, color } = STATUS_CONFIG[status];
  return <Tag color={color}>{label}</Tag>;
}
