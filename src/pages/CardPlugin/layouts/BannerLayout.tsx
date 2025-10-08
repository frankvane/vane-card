/**
 * Banner横幅布局示例
 * 全宽展示，左侧内容右侧图片的促销横幅布局
 */

import {
  CardCore,
  createHoverPlugin,
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

export default function BannerLayout() {
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
      description: "健康监测，运动追踪，智能提醒",
      image:
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
      badge: "新品",
      badgeType: "new",
    },
  ];

  const Card = withPlugins(CardCore, {
    plugins: [createHoverPlugin({ enableShadow: true })],
  });

  return (
    <DemoPage
      title="Banner横幅布局"
      description="全宽展示的促销横幅，适用于页面头部、活动推广"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* 紫色渐变 Banner */}
        <Card
          cardId="banner-1"
          data={products[0]}
          containerStyle={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "12px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            minHeight: "260px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          {/* 左侧：内容区域 (55%) */}
          <div
            style={{
              width: "55%",
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <h2
              style={{
                margin: "0 0 16px 0",
                fontSize: "36px",
                fontWeight: "bold",
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              {products[0].name}
            </h2>
            <p
              style={{
                margin: "0 0 24px 0",
                fontSize: "16px",
                color: "rgba(255,255,255,0.95)",
                lineHeight: 1.8,
              }}
            >
              {products[0].description}
            </p>
            <div style={{ marginBottom: "28px" }}>
              <span
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "#FFD700",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                ¥{products[0].price}
              </span>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                style={{
                  padding: "14px 32px",
                  background: "#fff",
                  color: "#667eea",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.15)";
                }}
              >
                加入购物车
              </button>
              <button
                style={{
                  padding: "14px 32px",
                  background: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  border: "2px solid rgba(255,255,255,0.6)",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                  e.currentTarget.style.borderColor = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
                }}
              >
                加入心愿单
              </button>
            </div>
          </div>

          {/* 右侧：图片区域 (45%) */}
          <div
            style={{
              width: "45%",
              height: "260px",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <img
              src={products[0].image}
              alt={products[0].name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              loading="lazy"
            />
            {products[0].badge && (
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  padding: "8px 20px",
                  background: "#FF5722",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
              >
                {products[0].badge}
              </div>
            )}
          </div>
        </Card>

        {/* 橙色渐变 Banner */}
        <Card
          cardId="banner-2"
          data={products[1]}
          containerStyle={{
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            borderRadius: "12px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            minHeight: "260px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          {/* 左侧：内容区域 */}
          <div
            style={{
              width: "55%",
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <h2
              style={{
                margin: "0 0 16px 0",
                fontSize: "36px",
                fontWeight: "bold",
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              {products[1].name}
            </h2>
            <p
              style={{
                margin: "0 0 24px 0",
                fontSize: "16px",
                color: "rgba(255,255,255,0.95)",
                lineHeight: 1.8,
              }}
            >
              {products[1].description}
            </p>
            <div style={{ marginBottom: "28px" }}>
              <span
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "#fff",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                ¥{products[1].price}
              </span>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                style={{
                  padding: "14px 32px",
                  background: "#fff",
                  color: "#f5576c",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  transition: "all 0.3s",
                }}
              >
                立即购买
              </button>
              <button
                style={{
                  padding: "14px 32px",
                  background: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  border: "2px solid rgba(255,255,255,0.6)",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s",
                }}
              >
                了解详情
              </button>
            </div>
          </div>

          {/* 右侧：图片区域 */}
          <div
            style={{
              width: "45%",
              height: "260px",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <img
              src={products[1].image}
              alt={products[1].name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              loading="lazy"
            />
            {products[1].badge && (
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  padding: "8px 20px",
                  background: "#4CAF50",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
              >
                {products[1].badge}
              </div>
            )}
          </div>
        </Card>
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
          <li>页面顶部主推广位</li>
          <li>活动专区入口</li>
          <li>重点商品推荐</li>
          <li>促销活动展示</li>
        </ul>

        <h3>布局特点</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>全宽展示，视觉冲击力强</li>
          <li>左侧内容 55%，右侧图片 45%，黄金比例</li>
          <li>渐变背景营造品牌氛围</li>
          <li>大字号价格和行动按钮，引导转化</li>
        </ul>

        <h3>设计要点</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>使用渐变背景区分不同活动或分类</li>
          <li>标题 36px，价格 48px，层次分明</li>
          <li>按钮有悬停效果，增强交互反馈</li>
          <li>徽章位于图片右上角，不遮挡主体</li>
          <li>使用 CardPlugin 包裹，布局主体通过自定义内容呈现</li>
        </ul>

        <h3>颜色方案</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>
            <strong>紫色系</strong>：高端、科技感（#667eea → #764ba2）
          </li>
          <li>
            <strong>粉橙系</strong>：活力、时尚感（#f093fb → #f5576c）
          </li>
          <li>
            <strong>蓝绿系</strong>：清新、自然感（可自定义）
          </li>
        </ul>
      </div>
    </DemoPage>
  );
}
