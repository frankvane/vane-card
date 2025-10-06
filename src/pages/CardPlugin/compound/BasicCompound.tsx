import DemoPage from "../_layout/DemoPage";
import { ProductCard } from "../../../components/CardPlugin";
import React from "react";

const mockProductA = {
  id: "p-1001",
  title: "轻跑透气运动鞋",
  subtitle: "轻量缓震｜透气网面",
  description: "柔软舒适，适合长跑与日常穿着",
  price: 349,
  oldPrice: 399,
  image:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
  badge: "热卖",
  brand: "Vane",
  tags: ["轻量", "透气", "缓震"],
  shippingInfo: "全国包邮，48小时内发货",
  warranty: "一年质保，七天无理由退换",
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
            <ProductCard.Subtitle />
            <ProductCard.Description />
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <ProductCard.Price />
              <ProductCard.OldPrice />
              <ProductCard.Discount />
            </div>
            <ProductCard.Tags />
            <ProductCard.Brand />
            <ProductCard.Shipping />
            <ProductCard.Warranty />
            <ProductCard.Rating />
            <ProductCard.Inventory />
          </div>
          <ProductCard.Divider />
          <div style={{ padding: 12 }}>
            <ProductCard.Actions />
          </div>
        </ProductCard>
      </div>
    </DemoPage>
  );
};

export default BasicCompound;