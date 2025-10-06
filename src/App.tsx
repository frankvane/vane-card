import "./App.css";

import { NavLink, Navigate, Route, Routes } from "react-router-dom";

import AdvAllInOne from "./pages/CardPlugin/advanced/AllInOne";
import AdvAnimationAnalytics from "./pages/CardPlugin/advanced/AnimationAnalytics";
import AdvCountdownPromo from "./pages/CardPlugin/advanced/CountdownPromo";
import AdvCustomActions from "./pages/CardPlugin/advanced/CustomActions";
import BackgroundImageLayout from "./pages/CardPlugin/layouts/BackgroundImageLayout";
import BannerLayout from "./pages/CardPlugin/layouts/BannerLayout";
import BasicCompound from "./pages/CardPlugin/compound/BasicCompound";
import BasicSlots from "./pages/CardPlugin/slots/BasicSlots";
import BottomImageLayout from "./pages/CardPlugin/layouts/BottomImageLayout";
import CardHome from "./pages/CardPlugin/Home";
import FooterActionsSlots from "./pages/CardPlugin/slots/FooterActionsSlots";
import GridLayout from "./pages/CardPlugin/layouts/GridLayout";
import HeaderOverlaySlots from "./pages/CardPlugin/slots/HeaderOverlaySlots";
import HorizontalLayout from "./pages/CardPlugin/layouts/HorizontalLayout";
import LeftRightCompound from "./pages/CardPlugin/compound/LeftRightCompound";
import MinimalLayout from "./pages/CardPlugin/layouts/MinimalLayout";
import PluginEnhancedCompound from "./pages/CardPlugin/compound/PluginEnhancedCompound";
import React from "react";
import RightImageLayout from "./pages/CardPlugin/layouts/RightImageLayout";
import TopBottomCompound from "./pages/CardPlugin/compound/TopBottomCompound";
import TwoColumnLayout from "./pages/CardPlugin/layouts/TwoColumnLayout";
import VerticalLayout from "./pages/CardPlugin/layouts/VerticalLayout";

const App: React.FC = () => {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Vane Card 演示</h2>
        <nav className="nav">
          <NavLink to="/" end>
            首页
          </NavLink>

          <h3 style={{ marginTop: 12 }}>布局专区</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <NavLink to="/layouts/vertical">垂直布局</NavLink>
            <NavLink to="/layouts/horizontal">横向布局</NavLink>
            <NavLink to="/layouts/right-image">右图布局</NavLink>
            <NavLink to="/layouts/bottom-image">下图布局</NavLink>
            <NavLink to="/layouts/banner">Banner横幅</NavLink>
            <NavLink to="/layouts/grid">网格紧凑</NavLink>
            <NavLink to="/layouts/minimal">极简布局</NavLink>
            <NavLink to="/layouts/background">背景图布局</NavLink>
            <NavLink to="/layouts/two-column">双列对称</NavLink>
          </div>

          <h3 style={{ marginTop: 12 }}>高级专区</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <NavLink to="/advanced/animation-analytics">动画+统计</NavLink>
            <NavLink to="/advanced/custom-actions">自定义操作</NavLink>
            <NavLink to="/advanced/countdown-promo">倒计时促销</NavLink>
            <NavLink to="/advanced/all-in-one">综合示例</NavLink>
          </div>

          <h3 style={{ marginTop: 12 }}>插槽专区</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <NavLink to="/slots/basic">基础（children）</NavLink>
            <NavLink to="/slots/header-overlay">Header & Overlay</NavLink>
            <NavLink to="/slots/footer-actions">Footer Actions</NavLink>
          </div>

          <h3 style={{ marginTop: 12 }}>复合组件专区</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <NavLink to="/compound/basic">基础应用</NavLink>
            <NavLink to="/compound/left-right">左右布局</NavLink>
            <NavLink to="/compound/top-bottom">上下布局</NavLink>
            <NavLink to="/compound/enhanced">增强：复合组件+插件</NavLink>
          </div>
        </nav>
      </aside>
      <main className="main">
        <Routes>
          <Route path="/" element={<CardHome />} />

          {/* 插槽专区路由 */}
          <Route path="/slots/basic" element={<BasicSlots />} />
          <Route
            path="/slots/header-overlay"
            element={<HeaderOverlaySlots />}
          />
          <Route
            path="/slots/footer-actions"
            element={<FooterActionsSlots />}
          />

          {/* 布局专区路由 */}
          <Route path="/layouts/vertical" element={<VerticalLayout />} />
          <Route path="/layouts/horizontal" element={<HorizontalLayout />} />
          <Route path="/layouts/banner" element={<BannerLayout />} />
          <Route path="/layouts/grid" element={<GridLayout />} />
          <Route path="/layouts/minimal" element={<MinimalLayout />} />
          <Route path="/layouts/right-image" element={<RightImageLayout />} />
          <Route path="/layouts/bottom-image" element={<BottomImageLayout />} />
          <Route
            path="/layouts/background"
            element={<BackgroundImageLayout />}
          />
          <Route path="/layouts/two-column" element={<TwoColumnLayout />} />

          {/* 高级专区路由 */}
          <Route
            path="/advanced/animation-analytics"
            element={<AdvAnimationAnalytics />}
          />
          <Route
            path="/advanced/custom-actions"
            element={<AdvCustomActions />}
          />
          <Route
            path="/advanced/countdown-promo"
            element={<AdvCountdownPromo />}
          />
          <Route path="/advanced/all-in-one" element={<AdvAllInOne />} />

          {/* 复合组件专区路由 */}
          <Route path="/compound/basic" element={<BasicCompound />} />
          <Route
            path="/compound/enhanced"
            element={<PluginEnhancedCompound />}
          />
          <Route path="/compound/left-right" element={<LeftRightCompound />} />
          <Route path="/compound/top-bottom" element={<TopBottomCompound />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
