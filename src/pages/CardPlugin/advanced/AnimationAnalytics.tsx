/**
 * 高级示例：动画 + 统计
 */

import {
  CardCore,
  createAnalyticsPlugin,
  createAnimationPlugin,
  createHoverPlugin,
  withPlugins,
} from "vane-card";

import DemoPage from "../_layout/DemoPage";
import React from "react";

const Card = withPlugins(CardCore, {
  plugins: [
    createAnimationPlugin(),
    createAnalyticsPlugin(),
    createHoverPlugin({ enableShadow: true }),
  ],
});

export default function AnimationAnalytics() {
  const product = {
    id: "adv-aa-1",
    name: "动画 + 统计",
    price: 899,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  };

  return (
    <DemoPage
      title="高级示例：动画 + 统计"
      description="进入动画（淡入+上移）与点击统计插件的组合。"
    >
      <div style={{ maxWidth: 400, margin: "0 auto" }}>
        <Card
          cardId={product.id}
          data={product}
          containerStyle={{
            background: "#fff",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{ width: "100%", aspectRatio: "1/1", overflow: "hidden" }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
            />
          </div>
          <div style={{ padding: 16 }}>
            <h3 style={{ margin: "0 0 8px 0", fontSize: 18 }}>
              {product.name}
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 700,
                color: "#e53935",
              }}
            >
              ¥{product.price}
            </p>
          </div>
        </Card>
      </div>
    </DemoPage>
  );
}
