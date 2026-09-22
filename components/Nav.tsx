import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu } from "antd";
import type { MenuProps } from "antd";

const NAV_ITEMS: MenuProps["items"] = [
  {
    key: "/",
    label: <Link href="/">Нүүр — Гүйлгээний жагсаалт</Link>,
  },
  {
    key: "/securities-state-mess",
    label: <Link href="/securities-state-mess">Дасгал 2 — State замбараагүй</Link>,
  },
  {
    key: "/securities-fetch-bug",
    label: <Link href="/securities-fetch-bug">Дасгал 3 — useEffect/Fetch алдаа</Link>,
  },
];

const Nav: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[router.pathname]}
      items={NAV_ITEMS}
      style={{ marginBottom: 24 }}
    />
  );
};

export default Nav;
