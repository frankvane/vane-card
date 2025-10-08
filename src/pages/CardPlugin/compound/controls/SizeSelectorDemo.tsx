import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "vane-card";
import React from "react";

const product = {
  id: "ctrl-size-01",
  title: "轻跑透气运动鞋",
  description: "柔软舒适，适合长跑与日常穿着",
  price: 349,
  oldPrice: 399,
  image:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
  sizes: ["39", "40", "41", "42"],
  variants: [
    { attributes: { 尺码: "39" }, price: 349, stock: 2 },
    { attributes: { 尺码: "40" }, price: 349, stock: 5 },
    { attributes: { 尺码: "41" }, price: 359, stock: 0 },
    { attributes: { 尺码: "42" }, price: 359, stock: 8 },
  ],
};

const SizeSelectorDemo: React.FC = () => {
  return (
    <DemoPage
      title="交互选择：尺码选择（SizeSelector）"
      description="通过 SizeSelector 进行尺码选择，并联动 Price 与 Inventory 的派生展示。"
    >
      <div className="card" style={{ padding: 12 }}>
        <ProductCard productId={product.id} data={product}>
          <ProductCard.Image style={{ width: "100%", borderRadius: 8 }} />

          <div style={{ padding: 12 }}>
            <ProductCard.Title />
            <ProductCard.Description />

            <ProductCard.Section title="选择尺码" />
            <ProductCard.SizeSelector attributeName="尺码" />
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

export default SizeSelectorDemo;