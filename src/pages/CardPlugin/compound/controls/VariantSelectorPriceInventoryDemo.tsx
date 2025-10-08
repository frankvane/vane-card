import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "vane-card";
import React from "react";

const product = {
  id: "ctrl-variant-price-inv-01",
  title: "户外防水轻量夹克",
  description:
    "三层复合面料，防风防水，透气轻盈，适合城市通勤与户外徒步。",
  price: 699,
  image:
    "https://picsum.photos/seed/variant-price/800/600",
  // 变体包含不同价格与库存，演示与 Price/Inventory 联动
  variants: [
    { attributes: { 颜色: "黑", 尺码: "M" }, price: 699, stock: 12 },
    { attributes: { 颜色: "黑", 尺码: "L" }, price: 699, stock: 8 },
    { attributes: { 颜色: "蓝", 尺码: "M" }, price: 719, stock: 3 },
    { attributes: { 颜色: "蓝", 尺码: "L" }, price: 719, stock: 0 },
    { attributes: { 颜色: "军绿", 尺码: "M" }, price: 689, stock: 5 },
    { attributes: { 颜色: "军绿", 尺码: "L" }, price: 689, stock: 2 },
  ],
};

const attributes: Record<string, string[]> = {
  颜色: ["黑", "蓝", "军绿"],
  尺码: ["M", "L"],
};

const VariantSelectorPriceInventoryDemo: React.FC = () => {
  return (
    <DemoPage
      title="交互选择：规格与价格/库存联动（VariantSelector + Price/Inventory）"
      description="选择不同规格时，价格与库存派生信息随变体联动更新。"
    >
      <div className="card" style={{ padding: 12 }}>
        <ProductCard productId={product.id} data={product}>
          <ProductCard.Image style={{ width: "100%", borderRadius: 8 }} />
          <div style={{ padding: 12 }}>
            <ProductCard.Title />
            <ProductCard.Description />

            <ProductCard.Section title="选择规格" />
            <ProductCard.VariantSelector attributes={attributes} />
            <ProductCard.SelectedInfo style={{ marginTop: 8 }} />

            <ProductCard.Section title="价格与库存联动" />
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ color: "#666", fontSize: 13 }}>当前价格：</span>
              <ProductCard.Price style={{ fontSize: 20, fontWeight: 600 }} />
            </div>
            <ProductCard.Inventory style={{ marginTop: 6 }} />
          </div>
        </ProductCard>
      </div>
    </DemoPage>
  );
};

export default VariantSelectorPriceInventoryDemo;