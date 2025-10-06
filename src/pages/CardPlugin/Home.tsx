/**
 * CardPlugin 主页
 * 展示插件式卡片组件的特性和示例导航
 */

import { Link } from "react-router-dom";
import React from "react";
import {
  ProductCard,
  createHoverPlugin,
  createAnimationPlugin,
} from "../../components/CardPlugin";

export default function CardPluginHome() {
  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            marginBottom: "16px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          CardPlugin
        </h1>
        <p style={{ fontSize: "20px", color: "#666" }}>插件式卡片组件系统</p>
        <p style={{ fontSize: "16px", color: "#999", marginTop: "8px" }}>
          基于 WaterfallPlugin 架构，将 ProductCard 升级为插件式开发模式
        </p>
      </div>

      {/* 核心特性 */}
      <div style={{ marginBottom: "60px" }}>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          核心特性
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {[
            {
              title: "插件式架构",
              desc: "功能模块化，易于维护和扩展",
              icon: "🧩",
            },
            {
              title: "灵活组合",
              desc: "按需组合插件，自由配置功能",
              icon: "⚡",
            },
            {
              title: "生命周期钩子",
              desc: "完整的生命周期支持，精确控制",
              icon: "🔄",
            },
            {
              title: "插件通信",
              desc: "PluginBus 实现插件间数据共享",
              icon: "📡",
            },
            {
              title: "TypeScript",
              desc: "完整的类型定义和类型推导",
              icon: "📘",
            },
            {
              title: "易于扩展",
              desc: "简单创建自定义插件",
              icon: "🛠️",
            },
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                padding: "24px",
                background: "#fff",
                borderRadius: "12px",
                border: "1px solid #eee",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                {feature.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 示例导航 */}
      <div style={{ marginBottom: "60px" }}>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          示例演示
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          <Link
            to="/basic"
            style={{
              padding: "24px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "12px",
              color: "#fff",
              textDecoration: "none",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>基础示例</h3>
            <p style={{ fontSize: "14px", opacity: 0.9 }}>
              展示最简单的卡片使用方式，包含图片、徽章、操作按钮等基础功能
            </p>
          </Link>

          <Link
            to="/advanced"
            style={{
              padding: "24px",
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              borderRadius: "12px",
              color: "#fff",
              textDecoration: "none",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>高级示例</h3>
            <p style={{ fontSize: "14px", opacity: 0.9 }}>
              演示自定义插件开发、插件通信、倒计时等高级功能
            </p>
          </Link>

          <Link
            to="/layout"
            style={{
              padding: "24px",
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              borderRadius: "12px",
              color: "#fff",
              textDecoration: "none",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>布局示例</h3>
            <p style={{ fontSize: "14px", opacity: 0.9 }}>
              展示垂直、横向、大图等不同布局方式和样式配置
            </p>
          </Link>

          <Link
            to="/slot"
            style={{
              padding: "24px",
              background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
              borderRadius: "12px",
              color: "#fff",
              textDecoration: "none",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>插槽示例</h3>
            <p style={{ fontSize: "14px", opacity: 0.9 }}>
              演示通过 children 和插件钩子实现的各种插槽功能
            </p>
          </Link>
        </div>
      </div>

      {/* 复合组件版块 */}
      <div style={{ marginBottom: "60px" }}>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          复合组件（ProductCard.*）
        </h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "16px" }}>
          面向业务开发者的直观用法：结构交由复合组件表达，行为交由插件增强
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "24px",
          }}
        >
          {/* 基础：复合组件模式 */}
          <div style={{ background: "#fff", borderRadius: "12px", padding: "16px" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "12px" }}>基础：复合组件模式</h3>
            <div style={{ border: "1px solid #eee", borderRadius: "8px", overflow: "hidden" }}>
              <ProductCard
                productId="p-basic"
                data={{
                  title: "高端运动鞋",
                  description: "舒适透气，适合长跑和日常穿着",
                  price: 349,
                  image: "/vite.svg",
                  badge: "热卖",
                }}
                containerStyle={{ background: "#fafafa" }}
              >
                <ProductCard.Image />
                <div style={{ padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <ProductCard.Badge />
                    <ProductCard.Title />
                  </div>
                  <ProductCard.Description />
                  <ProductCard.Price />
                  <ProductCard.Actions />
                </div>
              </ProductCard>
            </div>
          </div>

          {/* 增强：复合组件 + 插件模式 */}
          <div style={{ background: "#fff", borderRadius: "12px", padding: "16px" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "12px" }}>增强：复合组件 + 插件模式</h3>
            <div style={{ border: "1px solid #eee", borderRadius: "8px", overflow: "hidden" }}>
              <ProductCard
                productId="p-enhanced"
                data={{
                  title: "智能手表",
                  description: "全天候健康监测，支持离线音乐",
                  price: 2999,
                  image: "/vite.svg",
                  badge: "甄选",
                }}
                plugins={[
                  createHoverPlugin({ enableShadow: true, enableScale: true }),
                  createAnimationPlugin(),
                ]}
                containerStyle={{ background: "#fafafa" }}
              >
                <ProductCard.Image />
                <div style={{ padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <ProductCard.Badge />
                    <ProductCard.Title />
                  </div>
                  <ProductCard.Description />
                  <ProductCard.Price />
                  <ProductCard.Actions />
                </div>
              </ProductCard>
            </div>
          </div>
        </div>
      </div>

      {/* 内置插件 */}
      <div style={{ marginBottom: "60px" }}>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          内置插件
        </h2>
        <div
          style={{
            background: "#f5f5f5",
            padding: "32px",
            borderRadius: "12px",
          }}
        >
          <div style={{ display: "grid", gap: "16px" }}>
            {[
              {
                name: "ImagePlugin",
                desc: "处理商品图片展示，支持懒加载",
              },
              {
                name: "BadgePlugin",
                desc: "显示商品徽章（热卖、新品、甄选等）",
              },
              {
                name: "StatePlugin",
                desc: "管理购物车和心愿单状态",
              },
              {
                name: "ActionsPlugin",
                desc: "渲染操作按钮（购物车、心愿单等）",
              },
              {
                name: "HoverPlugin",
                desc: "悬停时的视觉反馈效果",
              },
            ].map((plugin, index) => (
              <div
                key={index}
                style={{
                  padding: "16px",
                  background: "#fff",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <code
                  style={{
                    padding: "4px 12px",
                    background: "#667eea",
                    color: "#fff",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginRight: "16px",
                  }}
                >
                  {plugin.name}
                </code>
                <span style={{ color: "#666" }}>{plugin.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 快速开始 */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #eee",
          borderRadius: "12px",
          padding: "32px",
        }}
      >
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>快速开始</h2>
        <pre
          style={{
            background: "#f5f5f5",
            padding: "16px",
            borderRadius: "8px",
            overflow: "auto",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          {`import {
  CardCore,
  withPlugins,
  createImagePlugin,
  createBadgePlugin,
  createActionsPlugin,
} from 'vane-card';

// 创建带插件的卡片
const ProductCard = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({ src: 'image.jpg' }),
    createBadgePlugin({ text: '热卖', type: 'hot' }),
    createActionsPlugin({ showCartButton: true }),
  ],
});

// 使用卡片
<ProductCard
  cardId="product-1"
  data={productData}
  containerStyle={{ borderRadius: '8px' }}
/>`}
        </pre>
      </div>
    </div>
  );
}
