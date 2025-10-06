/**
 * 右图布局示例（内容在左，图片在右）
 * 标准卡片样式，适合列表/详情推荐位
 */

import {
  CardCore,
  createActionsPlugin,
  createHoverPlugin,
  createStatePlugin,
  withPlugins,
} from "../../../components/CardPlugin";

import DemoPage from "../_layout/DemoPage";
import React from "react";

interface ProductData {
  id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
}

const RightImageCard = withPlugins(CardCore, {
  plugins: [
    createHoverPlugin({ enableShadow: true }),
    createStatePlugin({ enableCart: true, enableWishlist: true }),
    createActionsPlugin({ showCartButton: true, showWishlistButton: true }),
  ],
});

export default function RightImageLayout() {
  const products: ProductData[] = [
    {
      id: "1",
      name: "降噪蓝牙耳机",
      price: 1299,
      description: "主动降噪，HiFi音质，30小时续航",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    },
    {
      id: "2",
      name: "现代风格椅子",
      price: 799,
      description: "北欧设计，简约时尚，适合多种家居风格",
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=800",
    },
  ];

  return (
    <DemoPage
      title="右图布局（内容左 / 图片右）"
      description="标准卡片样式：内容在左，图片在右，通过 row-reverse 实现。适用于精选列表、推荐位。"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {products.map((p) => (
          <RightImageCard
            key={p.id}
            cardId={p.id}
            data={p}
            containerStyle={{
              background: "#fff",
              borderRadius: "10px",
              border: "1px solid #eee",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            {/* 图片（右侧） */}
            <div
              style={{
                width: "260px",
                height: "180px",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="lazy"
              />
            </div>

            {/* 内容（左侧） */}
            <div style={{ flex: 1, padding: "16px" }}>
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#333",
                }}
              >
                {p.name}
              </h3>
              {p.description && (
                <p
                  style={{
                    margin: "0 0 12px 0",
                    color: "#666",
                    fontSize: "13px",
                  }}
                >
                  {p.description}
                </p>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{ color: "#e53935", fontSize: 20, fontWeight: 800 }}
                >
                  ¥{p.price}
                </span>
              </div>
            </div>
          </RightImageCard>
        ))}
      </div>

      <div
        style={{
          marginTop: 40,
          padding: 20,
          background: "#f5f5f5",
          borderRadius: 8,
        }}
      >
        <h2 style={{ marginTop: 0 }}>布局说明</h2>
        <ul style={{ lineHeight: 1.8 }}>
          <li>
            通过容器 <code>flexDirection: row-reverse</code> 让图片位于右侧
          </li>
          <li>内容区自适应，价格与描述置于左侧，视觉起点更聚焦信息</li>
          <li>适合推荐位、精选列表、编辑推荐卡片</li>
        </ul>
      </div>
    </DemoPage>
  );
}
