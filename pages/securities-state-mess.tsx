// pages/securities-state-mess.tsx
/**
 * ДААЛГАВАР 2 — State-ийн цэвэрлэгээ (Refactored)
 *
 * - `securities` бол ЦОРЫН ГАНЦ эх сурвалж (single source of truth).
 * - filtered/sorted жагсаалт, нийт үнэлгээ — derived утга тул useMemo-оор тооцно
 *   (useState + useEffect синк байхгүй).
 * - Сонгосон үнэт цаасыг object хуулбарлахгүй, зөвхөн `id`-г хадгална.
 * - Sort нь нэг `sortConfig` state-ээр удирдагдаж, шинэ массив буцаана (mutate хийхгүй).
 */
import { useMemo, useState } from "react";
import { Card, Statistic } from "antd";
import PageLayout from "@/components/PageLayout";
import SecuritiesTable from "@/components/securities/SecuritiesTable";
import SecurityFilters from "@/components/securities/SecurityFilters";
import SelectedSecurityCard from "@/components/securities/SelectedSecurityCard";
import styles from "@/components/securities/securities.module.css";
import { ALL_SECTORS, PRICE_SIMULATION_RATE } from "@/constants/securities";
import { RAW_SECURITIES } from "@/data/securities";
import { CURRENCY_SYMBOL } from "@/lib/format";
import {
  applyPriceChange,
  calculateMarketValue,
  filterSecurities,
  getNextSortConfig,
  sortSecurities,
} from "@/lib/securities";
import type { Security, SectorFilter, SortConfig, SortField } from "@/types/security";

export default function SecuritiesStatePage() {
  const [securities, setSecurities] = useState<Security[]>(RAW_SECURITIES);
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState<SectorFilter>(ALL_SECTORS);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredSecurities = useMemo(
    () => filterSecurities(securities, { search, sector: sectorFilter }),
    [securities, search, sectorFilter]
  );

  const visibleSecurities = useMemo(
    () => sortSecurities(filteredSecurities, sortConfig),
    [filteredSecurities, sortConfig]
  );

  const totalMarketValue = useMemo(
    () => calculateMarketValue(filteredSecurities),
    [filteredSecurities]
  );

  const selectedSecurity = securities.find((s) => s.id === selectedId);

  function handleSort(field: SortField) {
    setSortConfig((current) => getNextSortConfig(current, field));
  }

  function handleSimulatePriceChange() {
    if (selectedId === null) return;
    // Эх жагсаалтыг шинэчилснээр хүснэгт, карт, нийт үнэлгээ бүгд зэрэг шинэчлэгдэнэ.
    setSecurities((current) => applyPriceChange(current, selectedId, PRICE_SIMULATION_RATE));
  }

  return (
    <PageLayout title="Үнэт цаасны мэдээлэл (Дасгал 2)">
      <SecurityFilters
        search={search}
        sector={sectorFilter}
        onSearchChange={setSearch}
        onSectorChange={setSectorFilter}
      />

      <Card className={styles.summaryCard}>
        <Statistic
          title="Нийт зах зээлийн үнэлгээ (шүүлтэд)"
          value={totalMarketValue}
          suffix={CURRENCY_SYMBOL}
        />
      </Card>

      <SecuritiesTable
        securities={visibleSecurities}
        sortConfig={sortConfig}
        onSort={handleSort}
        onSelect={setSelectedId}
      />

      {selectedSecurity && (
        <SelectedSecurityCard
          security={selectedSecurity}
          onSimulatePriceChange={handleSimulatePriceChange}
        />
      )}
    </PageLayout>
  );
}
