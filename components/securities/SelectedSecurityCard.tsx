// components/securities/SelectedSecurityCard.tsx
import { Button, Card } from "antd";
import { formatMoney } from "@/lib/format";
import type { Security } from "@/types/security";
import styles from "./securities.module.css";

interface SelectedSecurityCardProps {
  security: Security;
  onSimulatePriceChange: () => void;
}

export default function SelectedSecurityCard({
  security,
  onSimulatePriceChange,
}: SelectedSecurityCardProps) {
  return (
    <Card title={`Сонгосон: ${security.name}`} className={styles.selectedCard}>
      <p>Үнэ: {formatMoney(security.price)}</p>
      <Button onClick={onSimulatePriceChange}>Үнийг +1% нэмэгдүүлэх (симуляц)</Button>
    </Card>
  );
}
