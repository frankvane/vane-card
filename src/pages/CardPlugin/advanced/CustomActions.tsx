/**
 * 高级示例：自定义操作区
 */

import React from "react";

import DemoPage from "../_layout/DemoPage";
import {
  CardCore,
  createActionsPlugin,
  createHoverPlugin,
  createStatePlugin,
  withPlugins,
  type CardPluginContext,
} from "../../../components/CardPlugin";

const Card = withPlugins(CardCore, {
  plugins: [
    createHoverPlugin({ enableShadow: true }),
    createStatePlugin({}),
    createActionsPlugin({
      renderCustomActions: (context: CardPluginContext) => (
        <div style={{ padding: 12, display: "flex", gap: 8 }}>
          <button
            onClick={() => context.setState({ cart: !context.state.cart })}
            style={{
              flex: 1,
              padding: "10px",
              background: context.state.cart ? "#4CAF50" : "#FF5722",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontSize: 14,
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

export default function CustomActions() {
  const product = {
    id: "adv-ca-1",
    name: "自定义操作示例",
    price: 699,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  };

  return (
    <DemoPage
      title="高级示例：自定义操作"
      description="通过 ActionsPlugin 的 renderCustomActions 自定义操作区。"
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
