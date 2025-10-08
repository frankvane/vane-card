import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "vane-card";
import React from "react";
const demoProduct = {
  id: "P-5001",
  title: "蓝牙降噪耳机",
  image:
    "https://picsum.photos/seed/upsell-main/1200/800",
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
      { id: "I-CASE", title: "收纳保护套", price: 6900, image: "https://picsum.photos/seed/bundle-case/800/600" },
      { id: "I-CLEAN", title: "清洁套装", price: 3900, image: "https://picsum.photos/seed/bundle-clean/800/600" },
    ],
    bundlePrice: 66900,
  },
  {
    id: "B-2",
    title: "耳机 + 替换耳罩",
    items: [
      { id: "I-HEADPHONE", title: "降噪耳机（本品）", price: 59900, image: demoProduct.image },
      { id: "I-EARPADS", title: "替换耳罩（一副）", price: 5900, image: "https://picsum.photos/seed/bundle-earpads/800/600" },
    ],
    savingsPercent: 10,
  },
];

export default function UpsellBundleDemo() {
  const [message, setMessage] = React.useState<string>("");

  return (
    <DemoPage
      title="UpsellBundle 搭配购示例"
      description="展示常见搭配组合与折扣价，支持点击加入搭配购的交互回调。"
      sourceKey="compound/commerce-combo/UpsellBundleDemo"
    >
      <div style={{ padding: 24 }}>
        <ProductCard productId={demoProduct.id} data={demoProduct}>
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
    </DemoPage>
  );
}