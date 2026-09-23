# Refactoring тайлан

Функциональ байдлыг хадгалж, 3 дасгалын кодыг цэвэрлэж дахин зохион байгуулсан.
`npx tsc --noEmit` болон `npm run build` алдаагүй ажилладаг.

## Шинэ бүтэц

```
types/        transaction.ts, security.ts        — бүх TypeScript төрөл
constants/    transactions.ts, securities.ts     — status config, page size, sectors, debounce г.м.
data/         transactions.ts, securities.ts     — mock өгөгдөл
lib/          format.ts                          — formatMoney / formatSignedMoney (нэг газар)
              transactions.ts, securities.ts     — цэвэр (pure) функцууд: filter, sort, totals
              securitiesApi.ts                   — mock fetchSecurities
hooks/        useDebouncedValue.ts, useSecuritySearch.ts
components/   PageLayout.tsx (+ .module.css)     — padding + Nav + гарчиг
              transactions/  StatusTag, AmountText, SummaryCards, TransactionFilters, TransactionTable
              securities/    SecurityFilters, SecuritiesTable, SortableTitle, SelectedSecurityCard
pages/        зөвхөн state + компонентуудыг холбоно
```

## Дасгал 1 — `/`

| Асуудал | Засвар |
|---|---|
| Мөнгө форматлах regex 3 газар давтагдсан | `lib/format.ts` → `formatMoney`, `formatSignedMoney` (`Intl.NumberFormat`) |
| `any` ашигласан | `Transaction` interface, `TransactionStatus` union type, `ColumnsType<Transaction>` |
| `for` мөчлөг | `filterTransactions` (`.filter`), `calculateTotals` (`.reduce`) + `useMemo` |
| Бүх зүйл нэг компонентэд | `SummaryCards`, `TransactionFilters`, `TransactionTable`, `StatusTag`, `AmountText` |
| Inline style | CSS Modules (`*.module.css`) |
| `"success"` г.м. magic string | `STATUS_CONFIG: Record<TransactionStatus, …>` — Select-ийн сонголт, Tag хоёулаа эндээс |
| `pageSize: 5` | `TRANSACTIONS_PAGE_SIZE` |

## Дасгал 2 — `/securities-state-mess`

| Асуудал | Засвар |
|---|---|
| `filteredSecurities` state + effect | `useMemo` дээр derived утга |
| `totalMarketValue` гинжин effect | `useMemo(() => calculateMarketValue(...))` |
| `selectedSecurity` хуулбар object | Зөвхөн `selectedId` хадгалж, `securities.find(...)`-оор олно |
| `.sort()` in-place mutate | `sortSecurities` → `[...list].sort(...)` шинэ массив |
| 2 тусдаа boolean sort | Нэг `sortConfig: { field, direction } \| null` |

Үр дүн: "+1%" симуляц одоо хүснэгт, карт, нийт үнэлгээ **гурвууланг** зэрэг шинэчилнэ;
шүүлт солигдоход sort алдагдахгүй.

## Дасгал 3 — `/securities-fetch-bug`

| Асуудал | Засвар |
|---|---|
| `params` object dependency → тасралтгүй loop | Dependency нь primitive `query` string |
| Давхацсан mount effect + onChange доторх fetch | Өгөгдөл татах цэг ганцхан: `useSecuritySearch` hook |
| Debounce байхгүй | `useDebouncedValue(query, 300)` |
| (нэмэлт) Race condition | Effect cleanup-д `ignore` flag — хуучин хариу state-ийг дарахгүй |

Үр дүн: хуудас нээхэд 1 хүсэлт, "ap" гэж бичихэд +1 хүсэлт (өмнө нь хязгааргүй).

> Тэмдэглэл: `reactStrictMode: true` учир **dev** горимд mount дээр effect 2 удаа
> ажиллаж, console дээр 2 хүсэлт харагдаж болно — энэ нь React-ийн хүлээгдэж буй
> зан төлөв; production build дээр 1 удаа.
