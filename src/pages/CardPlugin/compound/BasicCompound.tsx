import React from "react";
import DemoPage from "../_layout/DemoPage";
import { ProductCard } from "../../../components/CardPlugin";

const mockProductA = {
  id: "p-1001",
  title: "轻跑透气运动鞋",
  description: "柔软舒适，适合长跑与日常穿着",
  price: 349,
  image:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
  badge: "热卖",
  rating: 4.6,
  ratingCount: 1287,
  inventory: 3,
};

const BasicCompound: React.FC = () => {
  return (
    <DemoPage
      title="基础：复合组件"
      description="使用 ProductCard.* 子组件直接构建卡片结构，无插件。"
    >
      <div className="card" style={{ padding: 12 }}>
        <ProductCard productId={mockProductA.id} data={mockProductA}>
          <ProductCard.Image style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 8 }} />
          <div style={{ padding: 12 }}>
            <ProductCard.Badge />
            <ProductCard.Title />
            <ProductCard.Description />
            <ProductCard.Price />
            <ProductCard.Rating />
            <ProductCard.Inventory />
          </div>
          <div style={{ padding: 12 }}>
            <ProductCard.Actions />
          </div>
        </ProductCard>
      </div>
    </DemoPage>
  );
};

export default BasicCompound;