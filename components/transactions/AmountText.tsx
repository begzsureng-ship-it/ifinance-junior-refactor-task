// components/transactions/AmountText.tsx
import { Typography } from "antd";
import { formatSignedMoney } from "@/lib/format";

export default function AmountText({ amount }: { amount: number }) {
  return (
    <Typography.Text type={amount < 0 ? "danger" : "success"}>
      {formatSignedMoney(amount)}
    </Typography.Text>
  );
}
