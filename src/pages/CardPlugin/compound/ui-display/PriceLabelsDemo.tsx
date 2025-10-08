import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "vane-card";
import React from "react";

const product = {
  id: "ui-price-labels-01",
  title: "精品咖啡豆（阿拉比卡）",
  description: "精选阿拉比卡咖啡豆，中度烘焙，香气浓郁，适合手冲与意式。",
  price: 59,
  oldPrice: 79,
  image:
    "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=800&auto=format&fit=crop",
  weightGram: 250,
  badges: ["限时特惠", "精品甄选"],
};

const PriceLabelsDemo: React.FC = () => {
  return (
    <DemoPage
      title="UI 展示：价格标示（Price/OldPrice/Discount/PricePerUnit/BadgeGroup）"
      description="聚焦价格相关 UI 展示组件，包含现价、原价、折扣、单位价格与徽章组。"
    >
      <div className="card" style={{ padding: 12 }}>
        <ProductCard productId={product.id} data={product}>
          <ProductCard.Image style={{ width: "100%", borderRadius: 8 }} />

          <div style={{ padding: 12 }}>
            <ProductCard.Title />
            <ProductCard.Description />

            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
              <ProductCard.Price style={{ fontSize: 22, fontWeight: 700 }} />
              <ProductCard.OldPrice />
              <ProductCard.Discount />
            </div>

            <div style={{ marginTop: 8 }}>
              <ProductCard.PricePerUnit unitLabel="每100g" unitGram={100} />
            </div>

            <div style={{ marginTop: 10 }}>
              <ProductCard.BadgeGroup />
            </div>
          </div>
        </ProductCard>
      </div>
    </DemoPage>
  );
};

export default PriceLabelsDemo;