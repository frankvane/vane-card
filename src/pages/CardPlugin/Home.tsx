import { Link } from "react-router-dom";
import React, { ReactNode } from "react";

// 设计升级版首页：更强的视觉层次、卡片化信息架构、清晰 CTA
export default function CardPluginHome() {
  const Section = ({ title, children }: { title: string; children: ReactNode }) => (
    <section style={{ marginTop: 28 }}>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{title}</h2>
      <div style={{ marginTop: 14 }}>{children}</div>
    </section>
  );

  const Card = ({ title, children }: { title: string; children: ReactNode }) => (
    <div
      style={{
        padding: 16,
        borderRadius: 14,
        border: "1px solid #e7e9ee",
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(249,250,255,1) 100%)",
        boxShadow: "0 6px 20px rgba(30, 41, 59, 0.08)",
        transition: "transform 200ms ease, box-shadow 200ms ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 12px 28px rgba(30, 41, 59, 0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 6px 20px rgba(30, 41, 59, 0.08)";
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{title}</div>
      <div style={{ color: "#4b5563" }}>{children}</div>
    </div>
  );

  const NavItem = ({ to, children }: { to: string; children: ReactNode }) => (
    <Link
      to={to}
      style={{
        display: "block",
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #e5e7eb",
        color: "#111827",
        textDecoration: "none",
        background:
          "linear-gradient(180deg, rgba(249,250,251,1) 0%, rgba(243,244,246,1) 100%)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background =
          "linear-gradient(180deg, rgba(243,244,246,1) 0%, rgba(229,231,235,1) 100%)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background =
          "linear-gradient(180deg, rgba(249,250,251,1) 0%, rgba(243,244,246,1) 100%)";
      }}
    >
      {children}
    </Link>
  );

  return (
    <div style={{ padding: 24, maxWidth: 1120, margin: "0 auto" }}>
      {/* Hero 区：品牌标题 + 副标题 + 主 CTA */}
      <div
        style={{
          padding: 28,
          borderRadius: 18,
          background:
            "linear-gradient(120deg, rgba(67,97,238,0.12) 0%, rgba(67,97,238,0.06) 40%, rgba(16,185,129,0.08) 100%)",
          border: "1px solid rgba(67,97,238,0.25)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24 }}>🧩</span>
          <h1 style={{ margin: 0, fontSize: 24 }}>Vane Card · CardPlugin</h1>
        </div>
        <p style={{ marginTop: 8, color: "#334155", fontSize: 15 }}>
          以「卡片容器 + 插件扩展 + 插槽区域」构建电商产品卡，统一的 priceArea 承载价格与优惠信息，事件总线与分析插件提供跨插件通信与可观测能力。
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <Link
            to="/compound/basic"
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              background: "#4361ee",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              boxShadow: "0 6px 18px rgba(67, 97, 238, 0.2)",
            }}
          >
            立即体验基础示例
          </Link>
          <Link
            to="/readme"
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              background: "#fff",
              color: "#111827",
              textDecoration: "none",
              border: "1px solid #e5e7eb",
              fontWeight: 700,
            }}
          >
            查看文档
          </Link>
        </div>
      </div>

      {/* 系统概览 */}
      <Section title="系统概览">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          <Card title="📂 架构与目录">
            <div>
              - 组件与容器：`src/components/CardPlugin`
              <br />- 页面与路由：`src/pages/CardPlugin` 与 `src/App.tsx`
              <br />- 插件与演示：`custom-plugins`，含价格、优惠、比价、分析、可视化等
            </div>
          </Card>
          <Card title="🔔 事件与状态">
            <div>
              - 总线事件：如 `sku:change`、`price:change`
              <br />- 生命周期：`onMount` / `onVisibilityChange` / 插槽渲染钩子
            </div>
          </Card>
          <Card title="💰 统一价格区域">
            <div>
              - 插件 `config.order` 控制 `priceArea` 展示顺序
              <br />- 标准化 Chip 样式与间距，保证一致体验
            </div>
          </Card>
          <Card title="📈 分析与上报">
            <div>
              - `AnalyticsPlugin` 支持曝光/可见性/点击/加购上报
              <br />- 可自定义 `transport` 与最小曝光阈值
            </div>
          </Card>
        </div>
      </Section>

      {/* 快速导航 */}
      <Section title="快速导航">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
          <Card title="🧱 复合组件专区">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
              <NavItem to="/compound/basic">基础应用</NavItem>
              <NavItem to="/compound/left-right">左右布局</NavItem>
              <NavItem to="/compound/top-bottom">上下布局</NavItem>
              <NavItem to="/compound/enhanced">增强：复合组件+插件</NavItem>
              <NavItem to="/compound/sku-compound/ecommerce-sku">电商增强 + SKU</NavItem>
            </div>
          </Card>

          <Card title="📐 布局专区">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
              <NavItem to="/layouts/vertical">垂直布局</NavItem>
              <NavItem to="/layouts/horizontal">横向布局</NavItem>
              <NavItem to="/layouts/right-image">右图布局</NavItem>
              <NavItem to="/layouts/bottom-image">下图布局</NavItem>
              <NavItem to="/layouts/banner">Banner横幅</NavItem>
              <NavItem to="/layouts/grid">网格紧凑</NavItem>
              <NavItem to="/layouts/minimal">极简布局</NavItem>
              <NavItem to="/layouts/background">背景图布局</NavItem>
              <NavItem to="/layouts/two-column">双列对称</NavItem>
            </div>
          </Card>

          <Card title="🧩 插槽专区">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
              <NavItem to="/slots/basic">基础（children）</NavItem>
              <NavItem to="/slots/header-overlay">Header & Overlay</NavItem>
              <NavItem to="/slots/footer-actions">Footer Actions</NavItem>
              <NavItem to="/slots/gallery-video">Gallery + Video</NavItem>
              <NavItem to="/slots/responsive">Responsive</NavItem>
            </div>
          </Card>

          <Card title="🚀 高级专区">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
              <NavItem to="/advanced/animation-analytics">动画+统计</NavItem>
              <NavItem to="/advanced/custom-actions">自定义操作</NavItem>
              <NavItem to="/advanced/countdown-promo">倒计时促销</NavItem>
              <NavItem to="/advanced/all-in-one">综合示例</NavItem>
            </div>
          </Card>
        </div>
      </Section>

      {/* 文档与示例 CTA */}
      <Section title="文档与示例">
        <div
          style={{
            padding: 16,
            borderRadius: 14,
            background: "#f6f9ff",
            border: "1px solid #dbeafe",
          }}
        >
          <div style={{ fontWeight: 700 }}>📖 项目 README</div>
          <div style={{ marginTop: 8, color: "#4b5563" }}>
            查看 <Link to="/readme">README</Link> 获取完整说明，或浏览侧边栏的演示路由。
          </div>
        </div>
      </Section>
    </div>
  );
}