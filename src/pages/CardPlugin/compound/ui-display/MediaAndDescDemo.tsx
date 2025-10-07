import React from "react";
import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "../../../../components/CardPlugin";

const product = {
  id: "ui-mediadesc-01",
  title: "城市通勤双肩包",
  description: "防泼水面料，内部多层收纳，轻盈耐用，适合日常通勤与短途出行",
  price: 299,
  image:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop",
  inventory: 80,
  brand: "VANE",
  tags: ["耐用", "轻盈", "大容量"],
  // BadgeGroup 从 product 数据中读取字符串数组，此处提供字符串徽章
  badges: ["热卖", "新品", "促销"],
};

const MediaAndDescDemo: React.FC = () => {
  return (
    <DemoPage
      title="媒体与描述 - Media & Description"
      description="展示主图、标题、描述与徽章组的组合用法，适合信息表达与基础营销场景。"
      sourceKey="compound/ui-display/MediaAndDescDemo"
      routeFileName="src/pages/CardPlugin/compound/ui-display/MediaAndDescDemo.tsx"
    >
      <div className="card" style={{ padding: 16 }}>
        <ProductCard productId={product.id} data={product}>
          <ProductCard.Image style={{ width: "100%", aspectRatio: "4 / 3", borderRadius: 8 }} />
          <div style={{ padding: 16, display: "grid", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ProductCard.Title />
              {/* BadgeGroup 读取 product.badges（string[]） */}
              <ProductCard.BadgeGroup />
            </div>
            <ProductCard.Description lines={3} />
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ color: "#666", fontSize: 13 }}>价格：</span>
              <ProductCard.Price style={{ fontSize: 20, fontWeight: 600 }} />
            </div>
          </div>
        </ProductCard>
      </div>

      <div style={{ marginTop: 32, padding: 20, background: "#f8f9fa", borderRadius: 8 }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>说明</h3>
        <ul style={{ margin: 0, paddingLeft: 20, color: "#666", lineHeight: 1.6 }}>
          <li>主图与描述共同构成信息表达的主体区域</li>
          <li>徽章组用于突出营销标签（如热卖、新品、促销）</li>
          <li>适合与价格、库存、品牌等信息组合展示</li>
        </ul>
      </div>
    </DemoPage>
  );
};

export default MediaAndDescDemo;