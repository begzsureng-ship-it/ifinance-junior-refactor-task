// pages/securities-fetch-bug.tsx
/**
 * ДААЛГАВАР 3 — useEffect/fetch-ийн засвар (Refactored)
 *
 * 1) Effect-ийн dependency нь render бүрд шинэ болдог `params` object биш,
 *    primitive `debouncedQuery` string → тасралтгүй loop арилсан.
 * 2) Давхацсан mount-ийн effect болон onChange доторх fetch-ийг устгаж,
 *    өгөгдөл татах цэгийг `useSecuritySearch` hook-д нэг л газар болгосон.
 * 3) Хайлтыг debounce хийсэн — бичиж дуусаад SEARCH_DEBOUNCE_MS-ийн дараа л fetch хийнэ.
 */
import { useState } from "react";
import { Alert, Card, Input, List } from "antd";
import PageLayout from "@/components/PageLayout";
import styles from "@/components/securities/securities.module.css";
import { SEARCH_DEBOUNCE_MS } from "@/constants/securities";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useSecuritySearch } from "@/hooks/useSecuritySearch";
import { formatMoney } from "@/lib/format";

export default function SecuritiesSearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);
  const { securities, loading, requestCount } = useSecuritySearch(debouncedQuery);

  return (
    <PageLayout title="Үнэт цаасны хайлт (Дасгал 3 — засварласан)">
      <Alert
        className={styles.statusAlert}
        type="success"
        showIcon
        message={`State-ээр хөтөлсөн хүсэлтийн тоо: ${requestCount}`}
        description="Одоо console дэх логийн тоотой тохирно — хайлт бичиж дуусахад зөвхөн 1 хүсэлт явна."
      />

      <Input
        placeholder="Ticker хайх (жишээ нь APU)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
        allowClear
      />

      <Card>
        <List
          loading={loading}
          dataSource={securities}
          rowKey="id"
          renderItem={(s) => (
            <List.Item>
              {s.ticker} — {formatMoney(s.price)}
            </List.Item>
          )}
        />
      </Card>
    </PageLayout>
  );
}
