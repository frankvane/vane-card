/**
 * 高级示例：综合（动画 + 统计 + 自定义操作 + 倒计时）
 */

import React from "react";

import DemoPage from "../_layout/DemoPage";
import {
  CardCore,
  createActionsPlugin,
  createHoverPlugin,
  createStatePlugin,
  withPlugins,
  createAnimationPlugin,
  createAnalyticsPlugin,
  createCountdownPlugin,
  type CardPluginContext,
} from "vane-card";

const Card = withPlugins(CardCore, {
  plugins: [
    createAnimationPlugin(),
    createAnalyticsPlugin(),
    createHoverPlugin({ enableShadow: true }),
    createStatePlugin({}),
    // 倒计时徽章（30 分钟）
    createCountdownPlugin({ durationMs: 30 * 60 * 1000, position: "top-left" }),
    createActionsPlugin({
      renderCustomActions: (context: CardPluginContext) => (
        <div style={{ padding: 12, display: "flex", gap: 8 }}>
          <button
            onClick={() => context.setState({ cart: !context.state.cart })}
            style={{
              flex: 1,
              padding: 10,
              background: context.state.cart ? "#4CAF50" : "#FF5722",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            {context.state.cart ? "已加购" : "立即抢购"}
          </button>
          <button
            onClick={() => alert("分享成功！")}
            style={{
              padding: "10px 16px",
              background: "#fff",
              color: "#333",
              border: "1px solid #ddd",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            分享
          </button>
        </div>
      ),
    }),
  ],
});

export default function AllInOne() {
  const product = {
    id: "adv-all-1",
    name: "综合高级示例",
    price: 899,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  };

  return (
    <DemoPage
      title="高级示例：综合"
      description="动画、统计、自定义操作与倒计时整合在一张卡片。"
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
            {/* 倒计时徽章由 CountdownPlugin 渲染 */}
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
