/**
 * 横向布局示例（图片在左）
 * 紧凑型列表布局，图片在左侧，内容在右侧
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
  badge?: string;
  badgeType?: "premium" | "hot" | "new" | "sale";
}

const HorizontalCard = withPlugins(CardCore, {
  plugins: [
    createHoverPlugin({ enableShadow: true, shadowIntensity: "light" }),
    createStatePlugin({ enableCart: true, enableWishlist: true }),
    createActionsPlugin({ showCartButton: true, showWishlistButton: true }),
  ],
});

export default function HorizontalLayout() {
  const products: ProductData[] = [
    {
      id: "1",
      name: "专业运动耳机",
      price: 899,
      description: "高品质音质，舒适佩戴，长续航",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      badge: "热卖",
      badgeType: "hot",
    },
    {
      id: "2",
      name: "智能手环",
      price: 299,
      description: "健康监测，运动追踪",
      image:
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
      badge: "新品",
      badgeType: "new",
    },
    {
      id: "3",
      name: "无线充电器",
      price: 199,
      description: "快速充电，支持多设备",
      image:
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400",
    },
  ];

  return (
    <DemoPage
      title="横向布局（图片在左）"
      description="紧凑型列表布局，适用于搜索结果、列表视图"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {products.map((product) => (
          <HorizontalCard
            key={product.id}
            cardId={product.id}
            data={product}
            containerStyle={{
              background: "#fff",
              borderRadius: "8px",
              border: "1px solid #eee",
              overflow: "hidden",
              display: "flex",
            }}
          >
            {/* 图片（左侧） */}
            <div
              style={{
                width: "120px",
                height: "120px",
                flexShrink: 0,
                position: "relative",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                loading="lazy"
              />
              {product.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    padding: "2px 8px",
                    background:
                      product.badgeType === "hot" ? "#FF5722" : "#4CAF50",
                    color: "#fff",
                    fontSize: "10px",
                    borderRadius: "4px",
                  }}
                >
                  {product.badge}
                </div>
              )}
            </div>

            {/* 内容（右侧） */}
            <div
              style={{
                flex: 1,
                padding: "12px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                {product.name}
              </h3>
              {product.description && (
                <p
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "12px",
                    color: "#666",
                    flex: 1,
                  }}
                >
                  {product.description}
                </p>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#e53935",
                  }}
                >
                  ¥{product.price}
                </span>
              </div>
            </div>
          </HorizontalCard>
        ))}
      </div>

      {/* 说明文档 */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>布局说明</h2>
        <h3>适用场景</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>搜索结果列表</li>
          <li>新闻资讯列表</li>
          <li>购物车页面</li>
          <li>订单列表</li>
        </ul>

        <h3>布局特点</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>图片在左侧，固定宽度（120px）</li>
          <li>内容在右侧，自适应宽度</li>
          <li>节省垂直空间，适合长列表</li>
          <li>视线从左到右，符合阅读习惯</li>
        </ul>

        <h3>设计要点</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>图片使用固定尺寸，保持列表整齐</li>
          <li>图片不用插件渲染，直接在 children 中灵活控制</li>
          <li>内容区使用 flex 布局，价格固定在底部</li>
        </ul>
      </div>
    </DemoPage>
  );
}
