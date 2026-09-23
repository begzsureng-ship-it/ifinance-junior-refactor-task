// components/Nav.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu } from "antd";
import type { MenuProps } from "antd";

const ROUTES = [
  { href: "/", label: "Нүүр — Гүйлгээний жагсаалт" },
  { href: "/securities-state-mess", label: "Дасгал 2 — State замбараагүй" },
  { href: "/securities-fetch-bug", label: "Дасгал 3 — useEffect/Fetch алдаа" },
];

const NAV_ITEMS: MenuProps["items"] = ROUTES.map(({ href, label }) => ({
  key: href,
  label: <Link href={href}>{label}</Link>,
}));

interface NavProps {
  className?: string;
}

export default function Nav({ className }: NavProps) {
  const { pathname } = useRouter();

  return <Menu mode="horizontal" selectedKeys={[pathname]} items={NAV_ITEMS} className={className} />;
}
