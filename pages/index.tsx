import React, { useState } from "react";
import { Table, Input, Select, Card, Row, Col, Tag, Statistic } from "antd";
import Nav from "../components/Nav";

const { Option } = Select;

export default function Home() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const transactions: any[] = [
    { id: 1, name: "Батбаяр", amount: 250000, status: "success", date: "2026-09-01" },
    { id: 2, name: "Оюунчимэг", amount: -120000, status: "pending", date: "2026-09-02" },
    { id: 3, name: "Ганбат", amount: 500000, status: "failed", date: "2026-09-03" },
    { id: 4, name: "Сарантуяа", amount: 75000, status: "success", date: "2026-09-03" },
    { id: 5, name: "Бямбадорж", amount: -300000, status: "success", date: "2026-09-04" },
    { id: 6, name: "Мөнхзул", amount: 180000, status: "pending", date: "2026-09-05" },
    { id: 7, name: "Тэмүүлэн", amount: -50000, status: "failed", date: "2026-09-05" },
    { id: 8, name: "Ням", amount: 620000, status: "success", date: "2026-09-06" },
    { id: 9, name: "Уранцэцэг", amount: 90000, status: "pending", date: "2026-09-07" },
    { id: 10, name: "Дорж", amount: -15000, status: "success", date: "2026-09-08" },
  ];

  // Шүүлт хийх
  let filtered: any[] = [];
  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];
    let matchesSearch = t.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    let matchesStatus = statusFilter === "all" ? true : t.status === statusFilter;
    if (matchesSearch && matchesStatus) {
      filtered.push(t);
    }
  }

  // Нийт орлого тооцоолол
  let totalIncome = 0;
  for (let i = 0; i < filtered.length; i++) {
    if (filtered[i].amount > 0) {
      totalIncome += filtered[i].amount;
    }
  }
  const formattedIncome =
    totalIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₮";

  // Нийт зарлага тооцоолол
  let totalExpense = 0;
  for (let i = 0; i < filtered.length; i++) {
    if (filtered[i].amount < 0) {
      totalExpense += Math.abs(filtered[i].amount);
    }
  }
  const formattedExpense =
    totalExpense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₮";

  const columns = [
    { title: "Нэр", dataIndex: "name", key: "name" },
    {
      title: "Дүн",
      dataIndex: "amount",
      key: "amount",
      render: (value: any) => {
        const formatted =
          Math.abs(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₮";
        return value < 0 ? (
          <span style={{ color: "red" }}>-{formatted}</span>
        ) : (
          <span style={{ color: "green" }}>+{formatted}</span>
        );
      },
    },
    {
      title: "Төлөв",
      dataIndex: "status",
      key: "status",
      render: (status: any) => {
        if (status === "success") {
          return <Tag color="green">Амжилттай</Tag>;
        } else if (status === "pending") {
          return <Tag color="orange">Хүлээгдэж буй</Tag>;
        } else {
          return <Tag color="red">Цуцлагдсан</Tag>;
        }
      },
    },
    { title: "Огноо", dataIndex: "date", key: "date" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Nav />
      <h1 style={{ marginBottom: 16 }}>iFinance — Гүйлгээний жагсаалт (Дасгал 1)</h1>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card>
            <Statistic title="Нийт орлого" value={formattedIncome} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic title="Нийт зарлага" value={formattedExpense} />
          </Card>
        </Col>
      </Row>

      <div style={{ marginBottom: 16, display: "flex", gap: 12 }}>
        <Input
          placeholder="Нэрээр хайх"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 240 }}
        />
        <Select
          value={statusFilter}
          onChange={(v) => setStatusFilter(v)}
          style={{ width: 200 }}
        >
          <Option value="all">Бүгд</Option>
          <Option value="success">Амжилттай</Option>
          <Option value="pending">Хүлээгдэж буй</Option>
          <Option value="failed">Цуцлагдсан</Option>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div>Илэрц олдсонгүй</div>
      ) : (
        <Table
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
}
