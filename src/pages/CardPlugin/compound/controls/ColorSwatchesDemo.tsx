import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "vane-card";
import React from "react";

const product = {
  id: "ctrl-color-01",
  title: "城市通勤背包",
  description: "耐磨防泼水面料，简约大容量，适合通勤与短途旅行",
  price: 299,
  oldPrice: 359,
  image:
    "https://picsum.photos/seed/color-black/800/600",
  colors: [
    { name: "黑", hex: "#222" },
    { name: "蓝", hex: "#1e90ff" },
    { name: "灰", hex: "#888" },
  ],
  // 变体用于联动价格与库存
  variants: [
    { attributes: { 颜色: "黑" }, price: 299, stock: 12, image: "https://picsum.photos/seed/color-black/800/600" },
    { attributes: { 颜色: "蓝" }, price: 309, stock: 6, image: "https://picsum.photos/seed/color-blue/800/600" },
    { attributes: { 颜色: "灰" }, price: 289, stock: 0, image: "https://picsum.photos/seed/color-gray/800/600" },
  ],
  badges: ["限时特惠", "热卖"],
};

const ColorSwatchesDemo: React.FC = () => {
  return (
    <DemoPage
      title="交互选择：颜色圆点（ColorSwatches）"
      description="通过 ColorSwatches 进行颜色选择，并联动 Price 与 Inventory 的派生展示。"
    >
      <div className="card" style={{ padding: 12 }}>
        <ProductCard productId={product.id} data={product}>
          <ProductCard.Image style={{ width: "100%", borderRadius: 8 }} />

          <div style={{ padding: 12 }}>
            <ProductCard.Title />
            <ProductCard.Description />

            <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
              <ProductCard.BadgeGroup />
              <ProductCard.Discount />
            </div>

            <ProductCard.Section title="选择颜色" />
            <ProductCard.ColorSwatches attributeName="颜色" />
            <ProductCard.SelectedInfo style={{ marginTop: 8 }} />

            <ProductCard.Section title="价格与库存" />
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ color: "#666", fontSize: 13 }}>当前价格：</span>
              <ProductCard.Price style={{ fontSize: 20, fontWeight: 600 }} />
              <ProductCard.OldPrice style={{ color: "#999", marginLeft: 8 }} />
            </div>
            <ProductCard.Inventory style={{ marginTop: 6 }} />
          </div>
        </ProductCard>
      </div>
    </DemoPage>
  );
};

export default ColorSwatchesDemo;