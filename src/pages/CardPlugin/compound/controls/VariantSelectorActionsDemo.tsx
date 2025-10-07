import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "../../../../components/CardPlugin";
import React from "react";

const product = {
  id: "ctrl-variant-actions-01",
  title: "轻量越野跑背包（12L）",
  description:
    "贴合背负系统，肩带透气网布，适合越野跑与城市通勤的轻量背包。",
  price: 359,
  image:
    "https://picsum.photos/seed/variant-actions/800/600",
  variants: [
    { attributes: { 颜色: "黑", 容量: "12L" }, price: 359, stock: 9 },
    { attributes: { 颜色: "蓝", 容量: "12L" }, price: 369, stock: 0 },
    { attributes: { 颜色: "橙", 容量: "12L" }, price: 379, stock: 4 },
  ],
  badges: ["轻量", "快干材质"],
};

const attributes: Record<string, string[]> = {
  颜色: ["黑", "蓝", "橙"],
  容量: ["12L"],
};

const VariantSelectorActionsDemo: React.FC = () => {
  return (
    <DemoPage
      title="交互选择：规格与操作联动（VariantSelector + Actions）"
      description="选择规格后，价格/库存展示随变体联动。Actions 提供加入购物车/愿望清单操作。"
    >
      <div className="card" style={{ padding: 12 }}>
        <ProductCard
          productId={product.id}
          data={product}
        >
          <ProductCard.Image style={{ width: "100%", borderRadius: 8 }} />
          <div style={{ padding: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ProductCard.Badge />
              <ProductCard.Title />
            </div>
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

            <ProductCard.Divider />
            <ProductCard.Actions />
            <div style={{ color: "#888", fontSize: 12, marginTop: 6 }}>
              提示：若所选变体库存为 0，建议在实际项目中禁用“加入购物车”。
            </div>
          </div>
        </ProductCard>
      </div>
    </DemoPage>
  );
};

export default VariantSelectorActionsDemo;
