// hooks/useSecuritySearch.ts
import { useEffect, useState } from "react";
import { fetchSecurities } from "@/lib/securitiesApi";
import type { SecurityQuote } from "@/types/security";

/**
 * Өгөгдөл татах ЦОРЫН ГАНЦ цэг.
 * - Dependency нь primitive `query` тул render бүрд дахин ажиллахгүй.
 * - Cleanup-ийн `ignore` flag нь хожуу ирсэн (хуучин) хариуг state-д бичихээс сэргийлнэ
 *   (race condition).
 */
export function useSecuritySearch(query: string) {
  const [securities, setSecurities] = useState<SecurityQuote[]>([]);
  const [loading, setLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    fetchSecurities(query).then((data) => {
      setRequestCount((count) => count + 1);
      if (ignore) return;
      setSecurities(data);
      setLoading(false);
    });

    return () => {
      ignore = true;
    };
  }, [query]);

  return { securities, loading, requestCount };
}
