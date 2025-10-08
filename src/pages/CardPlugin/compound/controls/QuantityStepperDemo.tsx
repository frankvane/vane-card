import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "vane-card";
import React from "react";

const product = {
  id: "qty-stepper-01",
  title: "户外登山背包 30L",
  description: "轻量耐用，多仓位设计，通勤与户外均适用",
  price: 299,
  image:
    "https://picsum.photos/seed/quantity-stepper/800/600",
  variants: [
    { attributes: { 颜色: "黑" }, price: 299, stock: 5 },
    { attributes: { 颜色: "蓝" }, price: 299, stock: 2 },
    { attributes: { 颜色: "红" }, price: 299, stock: 0 },
  ],
};

const attributes: Record<string, string[]> = {
  颜色: ["黑", "蓝", "红"],
};

const QuantityStepperDemo: React.FC = () => {
  return (
    <DemoPage
      title="交互选择：数量步进（QuantityStepper）"
      description="演示根据规格派生可售数量范围，并通过数量步进控件更新内部状态。"
    >
      <div className="card" style={{ padding: 12 }}>
        <ProductCard productId={product.id} data={product}>
          <ProductCard.Image style={{ width: "100%", borderRadius: 8 }} />
          <div style={{ padding: 12 }}>
            <ProductCard.Title />
            <ProductCard.Description />

            <ProductCard.Section title="选择颜色" />
            <ProductCard.VariantSelector attributes={attributes} />
            <ProductCard.SelectedInfo style={{ marginTop: 8 }} />

            <ProductCard.Section title="数量与可售范围" />
            <ProductCard.QuantityStepper min={1} step={1} />
            <ProductCard.Inventory style={{ marginTop: 6 }} />
          </div>
        </ProductCard>
      </div>
    </DemoPage>
  );
};

export default QuantityStepperDemo;