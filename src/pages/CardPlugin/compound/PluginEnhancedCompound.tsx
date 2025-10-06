import React from "react";
import DemoPage from "../_layout/DemoPage";
import {
  ProductCard,
  createHoverPlugin,
  createAnimationPlugin,
  createBadgePlugin,
} from "../../../components/CardPlugin";

const mockProductB = {
  id: "p-2002",
  title: "智能手表 Pro",
  description: "全天候心率监测，消息提醒，运动记录",
  price: 2999,
  image:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
  badge: "甄选",
  rating: 4.8,
  ratingCount: 5230,
  inventory: 25,
};

const PluginEnhancedCompound: React.FC = () => {
  return (
    <DemoPage
      title="增强：复合组件 + 插件"
      description="在复合组件基础上注入插件，增强交互与视觉效果。"
    >
      <div className="card" style={{ padding: 12 }}>
        <ProductCard
          productId={mockProductB.id}
          data={mockProductB}
          plugins={[
            createHoverPlugin({ enableShadow: true, scaleRatio: 1.03 }),
            createAnimationPlugin(),
            createBadgePlugin({ text: mockProductB.badge, position: "top-right" }),
          ]}
        >
          <ProductCard.Image style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 8 }} />
          <div style={{ padding: 12 }}>
            <ProductCard.Title />
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

export default PluginEnhancedCompound;