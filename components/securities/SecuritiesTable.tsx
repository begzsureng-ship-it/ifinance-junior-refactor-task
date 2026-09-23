// components/securities/SecuritiesTable.tsx
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { formatMoney } from "@/lib/format";
import type { Security, SortConfig, SortField } from "@/types/security";
import SortableTitle from "./SortableTitle";

interface SecuritiesTableProps {
  securities: Security[];
  sortConfig: SortConfig | null;
  onSort: (field: SortField) => void;
  onSelect: (id: number) => void;
}

export default function SecuritiesTable({
  securities,
  sortConfig,
  onSort,
  onSelect,
}: SecuritiesTableProps) {
  const columns: ColumnsType<Security> = [
    { title: "Ticker", dataIndex: "ticker", key: "ticker" },
    { title: "Нэр", dataIndex: "name", key: "name" },
    {
      title: <SortableTitle label="Үнэ" field="price" sortConfig={sortConfig} onSort={onSort} />,
      dataIndex: "price",
      key: "price",
      render: (price: number) => formatMoney(price),
    },
    {
      title: (
        <SortableTitle
          label="Өөрчлөлт %"
          field="changePercent"
          sortConfig={sortConfig}
          onSort={onSort}
        />
      ),
      dataIndex: "changePercent",
      key: "changePercent",
      render: (value: number) => `${value}%`,
    },
    {
      title: "Сонгох",
      key: "action",
      render: (_: unknown, record: Security) => (
        <Button size="small" onClick={() => onSelect(record.id)}>
          Сонгох
        </Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={securities} rowKey="id" pagination={false} />;
}
