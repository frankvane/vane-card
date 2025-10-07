import React from "react";
import { ProductCard } from "../../../components/CardPlugin/compound";

const demoProduct = {
  id: "P-5001",
  title: "蓝牙降噪耳机",
  image:
    "https://images.unsplash.com/photo-1518441902113-c1d3c9629470?q=80&w=1200&auto=format&fit=crop",
  price: 59900,
  oldPrice: 79900,
  inventory: 35,
};

const bundles = [
  {
    id: "B-1",
    title: "耳机 + 保护套 + 清洁套装",
    items: [
      { id: "I-HEADPHONE", title: "降噪耳机（本品）", price: 59900, image: demoProduct.image },
      { id: "I-CASE", title: "收纳保护套", price: 6900, image: "https://images.unsplash.com/photo-1526273600906-2aa9330989b2?q=80&w=800&auto=format&fit=crop" },
      { id: "I-CLEAN", title: "清洁套装", price: 3900, image: "https://images.unsplash.com/photo-1567401463434-3e3a01d80f04?q=80&w=800&auto=format&fit=crop" },
    ],
    bundlePrice: 66900,
  },
  {
    id: "B-2",
    title: "耳机 + 替换耳罩",
    items: [
      { id: "I-HEADPHONE", title: "降噪耳机（本品）", price: 59900, image: demoProduct.image },
      { id: "I-EARPADS", title: "替换耳罩（一副）", price: 5900, image: "https://images.unsplash.com/photo-1565959376272-9a3cb138d0f6?q=80&w=800&auto=format&fit=crop" },
    ],
    savingsPercent: 10,
  },
];

export default function UpsellBundleDemo() {
  const [message, setMessage] = React.useState<string>("");

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>UpsellBundle 搭配购示例</h2>
      <p style={{ color: "#666", marginBottom: 24 }}>
        展示常见搭配组合与折扣价，支持点击加入搭配购的交互回调。
      </p>

      <ProductCard data={demoProduct}>
        <ProductCard.Section title="推荐搭配">
          <ProductCard.UpsellBundle
            bundles={bundles}
            layout="horizontal"
            onAddBundle={(b) => setMessage(`已选择搭配购：${b.title}`)}
          />
        </ProductCard.Section>
      </ProductCard>

      {message && (
        <div style={{ marginTop: 16, color: "#333" }}>{message}</div>
      )}
    </div>
  );
}