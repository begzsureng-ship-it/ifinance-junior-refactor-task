/**
 * ДААЛГАВАР 3 — useEffect-ийн буруу хэрэглээ (Хүсэлт давхардах алдаа)
 *
 * Энэ хуудсыг ажиллуулбал ачаалах даруйдаа болон бичих үед олон удаа
 * (зарим тохиолдолд тасралтгүй) сүлжээний хүсэлт явуулна. Console (болон
 * Network tab)-ыг нээж "[fetchSecurities] Хүсэлт #N" гэсэн лог хэдэн удаа
 * хэвлэгдэж байгааг ажиглаж, шалтгааныг олж засварлана уу.
 *
 * Алдааны 3 эх үүсвэр:
 *
 * 1) params нь render бүрд ШИНЭ object болж үүсдэг тул, useEffect-ийн
 *    dependency болгож ашиглахад React "өөрчлөгдсөн" гэж үзээд render
 *    бүрд дахин ажиллана. Энэ effect дотор setState байгаа тул
 *    render → шинэ params → effect → setState → render → ... гэсэн
 *    ТАСРАЛТГҮЙ мөчлөг (loop) үүсгэнэ.
 * 2) Дээрхтэй ДАВХАЦСАН, "эхний ачааллаар мэдээлэл татъя" гэсэн тусдаа
 *    нэг useEffect(..., []) нэмж бичсэн — mount дээр нэмэлт хүсэлт үүсгэнэ.
 * 3) Хайлтын input бичих БҮРД (debounce-гүйгээр) шууд fetch дуудна.
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { Input, List, Alert, Typography, Card } from "antd";
import Nav from "../components/Nav";

const { Title } = Typography;

interface Security {
  id: number;
  ticker: string;
  price: number;
}

const SECURITIES_DB: Security[] = [
  { id: 1, ticker: "APU", price: 12500 },
  { id: 2, ticker: "TDB", price: 3200 },
  { id: 3, ticker: "MIK", price: 980 },
];

// Бодит backend байхгүй тул сүлжээний хүсэлтийг дуурайлган симуляц хийж,
// дуудагдах бүрд тоолуур нэмэгдүүлж, console дээр хэвлэнэ.
let requestCounter = 0;
function fetchSecurities(query: string): Promise<Security[]> {
  requestCounter += 1;
  console.log(`[fetchSecurities] Хүсэлт #${requestCounter}, query="${query}"`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        SECURITIES_DB.filter((s) =>
          s.ticker.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 300);
  });
}

const SecuritiesFetchBugPage: React.FunctionComponent = () => {
  const [securities, setSecurities] = useState<Security[]>([]);
  const [query, setQuery] = useState("");
  const [requestCount, setRequestCount] = useState(0);

  // ⚠️ (1) params нь render бүрд шинэ reference-тэй object тул
  // энэ effect бараг render бүрд дахин ажиллана (тасралтгүй мөчлөгийн эрсдэлтэй).
  const params = { query };
  useEffect(() => {
    fetchSecurities(params.query).then((data) => {
      setSecurities(data);
      setRequestCount((c) => c + 1);
    });
  }, [params]);

  // ⚠️ (2) Дээрхтэй давхацсан, mount дээр тусад нь дахин fetch дуудаж байна.
  useEffect(() => {
    fetchSecurities("").then((data) => setSecurities(data));
  }, []);

  // ⚠️ (3) Хайлтын input бичих бүрд debounce-гүйгээр шууд fetch дуудна.
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    fetchSecurities(e.target.value).then((data) => setSecurities(data));
  }

  return (
    <div style={{ padding: 24 }}>
      <Nav />
      <Title level={2}>Үнэт цаасны хайлт (Дасгал 3 — fetch алдаатай жишээ)</Title>

      <Alert
        style={{ marginBottom: 16 }}
        type="error"
        showIcon
        message={`State-ээр хөтөлсөн хүсэлтийн тоо: ${requestCount}`}
        description="Бодит тоо (console дэх лог) үүнээс их байж болно — учир нь өөрөө алдаатай!"
      />

      <Input
        placeholder="Ticker хайх (жишээ нь APU)"
        value={query}
        onChange={handleSearchChange}
        style={{ marginBottom: 16, maxWidth: 320 }}
      />

      <Card>
        <List
          dataSource={securities}
          renderItem={(s) => (
            <List.Item key={s.id}>
              {s.ticker} — {s.price.toLocaleString()}₮
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default SecuritiesFetchBugPage;
