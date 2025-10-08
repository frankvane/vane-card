/**
 * 插槽示例：基础（children 自定义内容）
 */

import {
  CardCore,
  createActionsPlugin,
  createHoverPlugin,
  createImagePlugin,
  createStatePlugin,
  withPlugins,
} from "vane-card";

import DemoPage from "../_layout/DemoPage";
import React from "react";

interface ProductData {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  shop?: string;
  description?: string;
  promotion?: string;
  image: string;
}

const ProductCard = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({ lazyLoad: true }),
    createHoverPlugin({ enableShadow: true, enableScale: true }),
    createStatePlugin({ enableCart: true, enableWishlist: true }),
    createActionsPlugin({ showCartButton: true, showWishlistButton: true }),
  ],
});

export default function BasicSlots() {
  const products: ProductData[] = [
    {
      id: "s1",
      name: "降噪蓝牙耳机",
      price: 1299,
      originalPrice: 1599,
      shop: "音频旗舰店",
      description: "主动降噪，HiFi音质，30小时续航",
      promotion: "限时8折",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    },
    {
      id: "s2",
      name: "智能机械手表",
      price: 2888,
      shop: "品牌直营",
      description: "瑞士机芯，蓝宝石镜面，50米防水",
      promotion: "满3000减200",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    },
  ];

  return (
    <DemoPage
      title="插槽示例：基础（children）"
      description="通过 children 自定义主要内容区域，搭配图片/操作等插件。"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            cardId={product.id}
            data={product}
            containerStyle={{
              background: "#fff",
              borderRadius: 8,
              border: "1px solid #eee",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: 16 }}>
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#333",
                }}
              >
                {product.name}
              </h3>

              {product.shop && (
                <div
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: 12,
                    color: "#0a0",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span>🏪</span>
                  <span>{product.shop}</span>
                </div>
              )}

              {product.description && (
                <p
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: 13,
                    color: "#666",
                    lineHeight: 1.5,
                  }}
                >
                  {product.description}
                </p>
              )}

              {product.promotion && (
                <div
                  style={{
                    margin: "0 0 12px 0",
                    padding: "4px 8px",
                    background: "#fff3e0",
                    border: "1px solid #ffe0b2",
                    borderRadius: 4,
                    fontSize: 12,
                    color: "#e65100",
                  }}
                >
                  🎁 {product.promotion}
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{ fontSize: 20, fontWeight: "bold", color: "#e53935" }}
                >
                  ¥{product.price}
                </span>
                {product.originalPrice && (
                  <span
                    style={{
                      fontSize: 14,
                      color: "#999",
                      textDecoration: "line-through",
                    }}
                  >
                    ¥{product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </ProductCard>
        ))}
      </div>
    </DemoPage>
  );
}
