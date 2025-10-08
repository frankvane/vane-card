/**
 * 垂直布局示例
 * 图片在上，内容在下的经典卡片布局
 */

import {
  CardCore,
  createActionsPlugin,
  createBadgePlugin,
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
  description?: string;
  image: string;
  badge?: string;
  badgeType?: "premium" | "hot" | "new" | "sale";
}

const VerticalCard = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({ lazyLoad: true }),
    createBadgePlugin({ position: "top-right" }),
    createHoverPlugin({ enableShadow: true, enableScale: true }),
    createStatePlugin({ enableCart: true, enableWishlist: true }),
    createActionsPlugin({ showCartButton: true, showWishlistButton: true }),
  ],
});

export default function VerticalLayout() {
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
    {
      id: "4",
      name: "蓝牙音箱",
      price: 599,
      description: "360度环绕音效",
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    },
  ];

  return (
    <DemoPage
      title="垂直布局"
      description="图片在上，内容在下的经典卡片布局，适用于商品列表、产品展示"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <VerticalCard
            key={product.id}
            cardId={product.id}
            data={product}
            containerStyle={{
              background: "#fff",
              borderRadius: "8px",
              border: "1px solid #eee",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "16px" }}>
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {product.name}
              </h3>
              {product.description && (
                <p
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "13px",
                    color: "#666",
                  }}
                >
                  {product.description}
                </p>
              )}
              <p
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#e53935",
                }}
              >
                ¥{product.price}
              </p>
            </div>
          </VerticalCard>
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
          <li>电商商品列表</li>
          <li>产品展示页面</li>
          <li>内容卡片网格</li>
        </ul>

        <h3>布局特点</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>图片占据卡片上半部分，视觉焦点明确</li>
          <li>内容在下方，信息层次清晰</li>
          <li>适合展示图片为主的商品</li>
          <li>响应式网格布局，自动适配屏幕</li>
        </ul>

        <h3>使用的插件</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>
            <strong>ImagePlugin</strong> - 从 context.data.image 读取图片
          </li>
          <li>
            <strong>BadgePlugin</strong> - 从 context.data.badge 读取徽章
          </li>
          <li>
            <strong>HoverPlugin</strong> - 悬停时的阴影和缩放效果
          </li>
          <li>
            <strong>StatePlugin</strong> - 管理购物车和心愿单状态
          </li>
          <li>
            <strong>ActionsPlugin</strong> - 渲染操作按钮
          </li>
        </ul>
      </div>
    </DemoPage>
  );
}
