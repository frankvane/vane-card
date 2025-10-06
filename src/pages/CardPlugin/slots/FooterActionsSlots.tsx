/**
 * 插槽示例：Footer Actions（底部操作区）
 */

import React from "react";
import DemoPage from "../_layout/DemoPage";
import {
  CardCore,
  createActionsPlugin,
  createHoverPlugin,
  createImagePlugin,
  createStatePlugin,
  withPlugins,
  type CardPluginContext,
} from "../../../components/CardPlugin";

interface ProductData {
  id: string;
  name: string;
  price: number;
  image: string;
}

const ProductCard = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({ lazyLoad: true }),
    createHoverPlugin({ enableShadow: true }),
    createStatePlugin({ enableCart: true, enableWishlist: true }),
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
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            {context.state.cart ? "已加购" : "加入购物车"}
          </button>
          <button
            onClick={() =>
              context.setState({ wishlist: !context.state.wishlist })
            }
            style={{
              padding: "10px 16px",
              background: context.state.wishlist ? "#e91e63" : "#fff",
              color: context.state.wishlist ? "#fff" : "#333",
              border: context.state.wishlist ? "none" : "1px solid #ddd",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            {context.state.wishlist ? "已心愿" : "心愿单"}
          </button>
        </div>
      ),
    }),
  ],
});

export default function FooterActionsSlots() {
  const products: ProductData[] = [
    {
      id: "f1",
      name: "现代风格椅子",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=400",
    },
    {
      id: "f2",
      name: "时尚运动鞋",
      price: 399,
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
    },
  ];

  return (
    <DemoPage
      title="插槽示例：Footer Actions"
      description="通过 createActionsPlugin 在底部插入自定义操作按钮。"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {products.map((p) => (
          <ProductCard
            key={p.id}
            cardId={p.id}
            data={p}
            containerStyle={{
              background: "#fff",
              borderRadius: 8,
              border: "1px solid #eee",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: 16 }}>
              <h3 style={{ margin: "0 0 8px 0", fontSize: 16 }}>{p.name}</h3>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#e53935" }}>
                ¥{p.price}
              </div>
            </div>
          </ProductCard>
        ))}
      </div>
    </DemoPage>
  );
}
