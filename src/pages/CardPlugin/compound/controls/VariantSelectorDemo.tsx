import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "vane-card";
import React from "react";

const product = {
  id: "ctrl-variant-01",
  title: "轻量跑步运动鞋",
  description: "回弹缓震，中底轻量化设计，适合日常跑步训练",
  price: 399,
  image:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
  variants: [
    { attributes: { 颜色: "黑", 尺码: "41" }, price: 399, stock: 6 },
    { attributes: { 颜色: "黑", 尺码: "42" }, price: 399, stock: 8 },
    { attributes: { 颜色: "白", 尺码: "41" }, price: 389, stock: 5 },
    { attributes: { 颜色: "白", 尺码: "42" }, price: 389, stock: 3 },
    { attributes: { 颜色: "蓝", 尺码: "41" }, price: 409, stock: 0 },
    { attributes: { 颜色: "蓝", 尺码: "42" }, price: 409, stock: 0 },
  ],
};

const attributes: Record<string, string[]> = {
  颜色: ["黑", "白", "蓝"],
  尺码: ["41", "42"],
};

const VariantSelectorDemo: React.FC = () => {
  return (
    <DemoPage
      title="交互选择：规格选择（VariantSelector）"
      description="展示通过 VariantSelector 进行规格选择，并联动 Price 与 Inventory 的派生展示。"
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

            <ProductCard.Section title="价格与库存" />
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

export default VariantSelectorDemo;