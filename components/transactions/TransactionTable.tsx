// components/transactions/TransactionTable.tsx
import { Empty, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TRANSACTIONS_PAGE_SIZE } from "@/constants/transactions";
import type { Transaction } from "@/types/transaction";
import AmountText from "./AmountText";
import StatusTag from "./StatusTag";

// Props/state-ээс хамаарахгүй тул компонентын гадна нэг удаа үүсгэнэ.
const COLUMNS: ColumnsType<Transaction> = [
  { title: "Нэр", dataIndex: "name", key: "name" },
  {
    title: "Дүн",
    dataIndex: "amount",
    key: "amount",
    render: (amount: Transaction["amount"]) => <AmountText amount={amount} />,
  },
  {
    title: "Төлөв",
    dataIndex: "status",
    key: "status",
    render: (status: Transaction["status"]) => <StatusTag status={status} />,
  },
  { title: "Огноо", dataIndex: "date", key: "date" },
];

export default function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return <Empty description="Илэрц олдсонгүй" />;
  }

  return (
    <Table
      columns={COLUMNS}
      dataSource={transactions}
      rowKey="id"
      pagination={{ pageSize: TRANSACTIONS_PAGE_SIZE }}
    />
  );
}
