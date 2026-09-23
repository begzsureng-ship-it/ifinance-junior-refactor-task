// lib/securitiesApi.ts
import { MOCK_API_LATENCY_MS } from "@/constants/securities";
import { SECURITY_QUOTES_DB } from "@/data/securities";
import type { SecurityQuote } from "@/types/security";

// Бодит backend байхгүй тул сүлжээний хүсэлтийг дуурайлган симуляц хийж,
// дуудагдах бүрд тоолуур нэмэгдүүлж, console дээр хэвлэнэ.
let requestCounter = 0;

export function fetchSecurities(query: string): Promise<SecurityQuote[]> {
  requestCounter += 1;
  console.log(`[fetchSecurities] Хүсэлт #${requestCounter}, query="${query}"`);

  const normalizedQuery = query.toLowerCase();

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(SECURITY_QUOTES_DB.filter((s) => s.ticker.toLowerCase().includes(normalizedQuery)));
    }, MOCK_API_LATENCY_MS);
  });
}
