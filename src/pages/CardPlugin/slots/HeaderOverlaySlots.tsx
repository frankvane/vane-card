/**
 * 插槽示例：Header & Overlay（评分/徽章等覆盖在图片区域）
 */

import React from "react";
import DemoPage from "../_layout/DemoPage";
import {
  CardCore,
  createHoverPlugin,
  createImagePlugin,
  withPlugins,
  type CardPlugin,
  type CardPluginContext,
} from "vane-card";

interface ProductData {
  id: string;
  name: string;
  image: string;
  badge?: string;
  rating?: number;
  reviews?: number;
}

// 评分插件：使用 renderHeader 将评分贴在图片上
const createRatingPlugin = (): CardPlugin => ({
  name: "RatingPlugin",
  version: "1.0.0",
  priority: 30,
  hooks: {
    renderHeader: (context: CardPluginContext) => {
      const rating = context.data?.rating;
      const reviews = context.data?.reviews;
      if (!rating) return null;
      return (
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: 8,
            background: "rgba(0,0,0,0.7)",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: 4,
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            gap: 4,
            zIndex: 10,
          }}
        >
          <span>⭐</span>
          <span>{rating.toFixed(1)}</span>
          {reviews && <span style={{ opacity: 0.8 }}>({reviews})</span>}
        </div>
      );
    },
  },
});

// 徽章插件：使用 renderOverlay 将促销徽章贴在图片角落
const createSimpleBadgePlugin = (): CardPlugin => ({
  name: "SimpleBadgePlugin",
  version: "1.0.0",
  priority: 40,
  hooks: {
    renderOverlay: (context: CardPluginContext) => {
      const badge = context.data?.badge;
      if (!badge) return null;
      return (
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            padding: "4px 10px",
            background: "#FF5722",
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            borderRadius: 16,
            zIndex: 10,
          }}
        >
          {badge}
        </div>
      );
    },
  },
});

const ProductCard = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({ lazyLoad: true }),
    createRatingPlugin(),
    createSimpleBadgePlugin(),
    createHoverPlugin({ enableShadow: true }),
  ],
});

export default function HeaderOverlaySlots() {
  const products: ProductData[] = [
    {
      id: "h1",
      name: "专业单反相机",
      image:
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
      badge: "限时优惠",
      rating: 4.8,
      reviews: 1234,
    },
    {
      id: "h2",
      name: "旗舰耳机",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      badge: "热卖",
      rating: 4.7,
      reviews: 980,
    },
  ];

  return (
    <DemoPage
      title="插槽示例：Header & Overlay"
      description="使用插件渲染钩子在图片上叠加评分与徽章。"
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
              <h3 style={{ margin: 0, fontSize: 16 }}>{product.name}</h3>
            </div>
          </ProductCard>
        ))}
      </div>
    </DemoPage>
  );
}
