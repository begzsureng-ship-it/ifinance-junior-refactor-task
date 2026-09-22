/**
 * ДААЛГАВАР 2 — State-ийн замбараагүй хэрэглээ (Үнэт цаасны жагсаалт)
 *
*/

import * as React from "react";
import { useState, useEffect } from "react";
import { Table, Input, Select, Card, Button, Typography, Space, Statistic } from "antd";
import type { ColumnsType } from "antd/es/table";
import Nav from "../components/Nav";

const { Title } = Typography;
const { Option } = Select;

interface Security {
  id: number;
  ticker: string;
  name: string;
  sector: string;
  price: number;
  changePercent: number;
  volume: number;
}

const RAW_SECURITIES: Security[] = [
  { id: 1, ticker: "APU", name: "АПУ", sector: "Хүнс", price: 12500, changePercent: 1.2, volume: 3400 },
  { id: 2, ticker: "TDB", name: "ХХБ", sector: "Банк", price: 3200, changePercent: -0.8, volume: 8100 },
  { id: 3, ticker: "MIK", name: "МИК Холдинг", sector: "Санхүү", price: 980, changePercent: 2.5, volume: 15200 },
  { id: 4, ticker: "SUU", name: "Сүү", sector: "Хүнс", price: 4100, changePercent: 0.0, volume: 2100 },
  { id: 5, ticker: "GOV", name: "Говь", sector: "Хөнгөн үйлдвэр", price: 15800, changePercent: -1.5, volume: 900 },
  { id: 6, ticker: "BDS", name: "Багануур", sector: "Уул уурхай", price: 2200, changePercent: 3.1, volume: 5400 },
];

const SecuritiesStateMessPage: React.FunctionComponent = () => {
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");

  const [filteredSecurities, setFilteredSecurities] = useState<Security[]>(RAW_SECURITIES);

  useEffect(() => {
    const result = RAW_SECURITIES.filter((s) => {
      const matchesSearch = s.ticker.toLowerCase().includes(search.toLowerCase());
      const matchesSector = sectorFilter === "all" || s.sector === sectorFilter;
      return matchesSearch && matchesSector;
    });
    setFilteredSecurities(result);
  }, [search, sectorFilter]);

  const [totalMarketValue, setTotalMarketValue] = useState(0);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < filteredSecurities.length; i++) {
      sum += filteredSecurities[i].price * filteredSecurities[i].volume;
    }
    setTotalMarketValue(sum);
  }, [filteredSecurities]);

  const [selectedSecurity, setSelectedSecurity] = useState<Security | null>(null);

  function handleSimulatePriceChange() {
    if (!selectedSecurity) return;
    setSelectedSecurity({
      ...selectedSecurity,
      price: selectedSecurity.price * 1.01,
    });
  }
  const [sortByPriceAsc, setSortByPriceAsc] = useState(false);
  const [sortByChangeAsc, setSortByChangeAsc] = useState(false);

  function handleSortByPrice() {
    filteredSecurities.sort((a, b) =>
      sortByPriceAsc ? b.price - a.price : a.price - b.price
    );
    setFilteredSecurities(filteredSecurities); // ⚠️ ижил array reference дамжуулж байна
    setSortByPriceAsc(!sortByPriceAsc);
  }

  function handleSortByChange() {
    filteredSecurities.sort((a, b) =>
      sortByChangeAsc ? b.changePercent - a.changePercent : a.changePercent - b.changePercent
    );
    setFilteredSecurities(filteredSecurities); // ⚠️ ижил array reference дамжуулж байна
    setSortByChangeAsc(!sortByChangeAsc);
  }

  const columns: ColumnsType<Security> = [
    { title: "Ticker", dataIndex: "ticker", key: "ticker" },
    { title: "Нэр", dataIndex: "name", key: "name" },
    {
      title: (
        <span onClick={handleSortByPrice} style={{ cursor: "pointer" }}>
          Үнэ {sortByPriceAsc ? "↑" : "↓"}
        </span>
      ),
      dataIndex: "price",
      key: "price",
      render: (value: number) => `${value.toLocaleString()}₮`,
    },
    {
      title: (
        <span onClick={handleSortByChange} style={{ cursor: "pointer" }}>
          Өөрчлөлт % {sortByChangeAsc ? "↑" : "↓"}
        </span>
      ),
      dataIndex: "changePercent",
      key: "changePercent",
      render: (value: number) => `${value}%`,
    },
    {
      title: "Сонгох",
      key: "action",
      render: (_: unknown, record: Security) => (
        <Button size="small" onClick={() => setSelectedSecurity(record)}>
          Сонгох
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Nav />
      <Title level={2}>Үнэт цаасны мэдээлэл (Дасгал 2)</Title>

      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Ticker хайх"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 200 }}
        />
        <Select value={sectorFilter} onChange={(v) => setSectorFilter(v)} style={{ width: 200 }}>
          <Option value="all">Бүх салбар</Option>
          <Option value="Хүнс">Хүнс</Option>
          <Option value="Банк">Банк</Option>
          <Option value="Санхүү">Санхүү</Option>
          <Option value="Хөнгөн үйлдвэр">Хөнгөн үйлдвэр</Option>
          <Option value="Уул уурхай">Уул уурхай</Option>
        </Select>
      </Space>

      <Card style={{ marginBottom: 16, maxWidth: 320 }}>
        <Statistic
          title="Нийт зах зээлийн үнэлгээ (шүүлтэд)"
          value={totalMarketValue}
          suffix="₮"
        />
      </Card>

      <Table
        columns={columns}
        dataSource={filteredSecurities}
        rowKey="id"
        pagination={false}
      />

      {selectedSecurity && (
        <Card title={`Сонгосон: ${selectedSecurity.name}`} style={{ marginTop: 24, maxWidth: 400 }}>
          <p>Үнэ: {selectedSecurity.price.toLocaleString()}₮</p>
          <Button onClick={handleSimulatePriceChange}>
            Үнийг +1% нэмэгдүүлэх (симуляц)
          </Button>
        </Card>
      )}
    </div>
  );
};

export default SecuritiesStateMessPage;
