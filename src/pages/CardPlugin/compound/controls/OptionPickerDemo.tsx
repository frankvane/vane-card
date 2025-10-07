import React from "react";
import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "../../../../components/CardPlugin";

const product = {
  id: "ctrl-option-01",
  title: "户外保温水壶",
  description: "双层不锈钢，长效保温保冷，防漏设计",
  price: 129,
  oldPrice: 159,
  image:
    "https://images.unsplash.com/photo-1549388604-817d15aa0110?q=80&w=800&auto=format&fit=crop",
  // 无需预设 attributes 字段，直接通过 OptionPicker 控制 state.attributes
  variants: [
    { attributes: { 容量: "500ml", 颜色: "银色" }, price: 129, stock: 10 },
    { attributes: { 容量: "750ml", 颜色: "银色" }, price: 149, stock: 6 },
    { attributes: { 容量: "1000ml", 颜色: "银色" }, price: 159, stock: 0 },
    { attributes: { 容量: "500ml", 颜色: "黑色" }, price: 129, stock: 8 },
    { attributes: { 容量: "750ml", 颜色: "黑色" }, price: 149, stock: 4 },
    { attributes: { 容量: "1000ml", 颜色: "黑色" }, price: 159, stock: 2 },
  ],
};

const OptionPickerDemo: React.FC = () => {
  return (
    <DemoPage
      title="交互选择：通用属性选择（OptionPicker）"
      description="通过多个 OptionPicker 控制不同属性，派生联动 Price 与 Inventory。"
    >
      <div className="card" style={{ padding: 12 }}>
        <ProductCard productId={product.id} data={product}>
          <ProductCard.Image style={{ width: "100%", borderRadius: 8 }} />

          <div style={{ padding: 12 }}>
            <ProductCard.Title />
            <ProductCard.Description />

            <ProductCard.Section title="选择属性" />
            <div style={{ display: "grid", gap: 8 }}>
              <ProductCard.OptionPicker name="容量" options={["500ml", "750ml", "1000ml"]} />
              <ProductCard.OptionPicker name="颜色" options={["银色", "黑色"]} />
            </div>
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

export default OptionPickerDemo;