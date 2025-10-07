import React from "react";
import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "../../../../components/CardPlugin";

const product = {
  id: "state-display-01",
  title: "防风轻薄外套",
  description: "轻薄防风面料，城市通勤与户外皆可",
  price: 459,
  image:
    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=800&auto=format&fit=crop",
  variants: [
    { attributes: { 颜色: "黑", 尺码: "M" }, price: 459, stock: 7 },
    { attributes: { 颜色: "黑", 尺码: "L" }, price: 459, stock: 5 },
    { attributes: { 颜色: "灰", 尺码: "M" }, price: 449, stock: 3 },
    { attributes: { 颜色: "灰", 尺码: "L" }, price: 449, stock: 0 },
  ],
};

const attributes: Record<string, string[]> = {
  颜色: ["黑", "灰"],
  尺码: ["M", "L"],
};

const StateDisplayDemo: React.FC = () => {
  return (
    <DemoPage
      title="状态展示：价格/库存/选中信息（派生）"
      description="通过选择规格派生展示 Price 与 Inventory，并用 SelectedInfo 汇总当前选择状态。"
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

            <ProductCard.Section title="派生展示：价格与库存" />
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

export default StateDisplayDemo;