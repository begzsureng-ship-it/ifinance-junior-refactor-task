// components/transactions/SummaryCards.tsx
import { Card, Col, Row, Statistic } from "antd";
import { formatMoney } from "@/lib/format";
import type { TransactionTotals } from "@/types/transaction";
import styles from "./transactions.module.css";

export default function SummaryCards({ income, expense }: TransactionTotals) {
  const cards = [
    { title: "Нийт орлого", value: income },
    { title: "Нийт зарлага", value: expense },
  ];

  return (
    <Row gutter={16} className={styles.summary}>
      {cards.map(({ title, value }) => (
        <Col span={12} key={title}>
          <Card>
            <Statistic title={title} value={formatMoney(value)} />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
