/**
 * 高级示例：倒计时促销
 */

import {
  CardCore,
  createCountdownPlugin,
  createHoverPlugin,
  createStatePlugin,
  withPlugins,
} from "../../../components/CardPlugin";

import DemoPage from "../_layout/DemoPage";
import React from "react";

const Card = withPlugins(CardCore, {
  plugins: [
    createHoverPlugin({ enableShadow: true }),
    createStatePlugin({}),
    // 使用倒计时插件：演示 1 小时倒计时
    createCountdownPlugin({ durationMs: 60 * 60 * 1000, position: "top-left" }),
  ],
});

export default function CountdownPromo() {
  const product = {
    id: "adv-cp-1",
    name: "限时特惠商品",
    price: 999,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  };

  return (
    <DemoPage
      title="高级示例：倒计时促销"
      description="倒计时徽章 + 价格对比，演示动态内容更新。"
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
            style={{
              width: "100%",
              aspectRatio: "1/1",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
            />
            {/* 倒计时徽章由 CountdownPlugin 负责渲染 */}
            <div
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                padding: "4px 12px",
                background: "#F44336",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                borderRadius: 4,
              }}
            >
              限时特惠
            </div>
          </div>
          <div style={{ padding: 16 }}>
            <h3 style={{ margin: "0 0 8px 0", fontSize: 18 }}>
              {product.name}
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: "#e53935" }}>
                ¥{product.price}
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: "#999",
                  textDecoration: "line-through",
                }}
              >
                ¥{product.originalPrice}
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  padding: "2px 8px",
                  background: "#FF5722",
                  color: "#fff",
                  fontSize: 12,
                  borderRadius: 4,
                }}
              >
                5折
              </span>
            </div>
          </div>
        </Card>
      </div>
    </DemoPage>
  );
}
