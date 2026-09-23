// components/PageLayout.tsx
import type { ReactNode } from "react";
import { Typography } from "antd";
import Nav from "./Nav";
import styles from "./PageLayout.module.css";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

/** Бүх хуудсанд давтагдаж байсан padding + Nav + гарчгийг нэг дор */
export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className={styles.page}>
      <Nav className={styles.nav} />
      <Typography.Title level={2}>{title}</Typography.Title>
      {children}
    </div>
  );
}
