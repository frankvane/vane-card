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
import EcommerceSKUCompound from "./pages/CardPlugin/compound/EcommerceSKUCompound";
import FooterActionsSlots from "./pages/CardPlugin/slots/FooterActionsSlots";
import GalleryVideoSlots from "./pages/CardPlugin/slots/GalleryVideoSlots";
import GridLayout from "./pages/CardPlugin/layouts/GridLayout";
import HeaderOverlaySlots from "./pages/CardPlugin/slots/HeaderOverlaySlots";
import HorizontalLayout from "./pages/CardPlugin/layouts/HorizontalLayout";
import LeftRightCompound from "./pages/CardPlugin/compound/LeftRightCompound";
import MinimalLayout from "./pages/CardPlugin/layouts/MinimalLayout";
import OrderSummaryDemo from "./pages/CardPlugin/compound/OrderSummaryDemo";
import SavingsBadgeDemo from "./pages/CardPlugin/compound/SavingsBadgeDemo";
import StockBadgeDemo from "./pages/CardPlugin/compound/StockBadgeDemo";
import CouponBarDemo from "./pages/CardPlugin/compound/CouponBarDemo";
import VariantMediaSwitcherDemo from "./pages/CardPlugin/compound/VariantMediaSwitcherDemo";
import ShippingEstimatorDemo from "./pages/CardPlugin/compound/ShippingEstimatorDemo";
import DeliveryTimelineDemo from "./pages/CardPlugin/compound/DeliveryTimelineDemo";
import ReturnPolicyDemo from "./pages/CardPlugin/compound/ReturnPolicyDemo";
import UpsellBundleDemo from "./pages/CardPlugin/compound/UpsellBundleDemo";
import A11yToolbarDemo from "./pages/CardPlugin/compound/A11yToolbarDemo";
import PluginEnhancedCompound from "./pages/CardPlugin/compound/PluginEnhancedCompound";
import React from "react";
import ResponsiveSlots from "./pages/CardPlugin/slots/ResponsiveSlots";
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
            <NavLink to="/slots/gallery-video">Gallery + Video</NavLink>
            <NavLink to="/slots/responsive">Responsive</NavLink>
          </div>

          <h3 style={{ marginTop: 12 }}>复合组件专区</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <NavLink to="/compound/basic">基础应用</NavLink>
            <NavLink to="/compound/left-right">左右布局</NavLink>
            <NavLink to="/compound/top-bottom">上下布局</NavLink>
            <NavLink to="/compound/enhanced">增强：复合组件+插件</NavLink>
            <NavLink to="/compound/ecommerce-sku">电商增强 + SKU</NavLink>
            <NavLink to="/compound/order-summary">订单明细面板</NavLink>
            <NavLink to="/compound/savings-badge">节省金额徽章</NavLink>
            <NavLink to="/compound/stock-badge">库存提示徽章</NavLink>
            <NavLink to="/compound/coupon-bar">优惠信息条</NavLink>
            <NavLink to="/compound/variant-media-switcher">规格切换主图</NavLink>
            <NavLink to="/compound/shipping-estimator">配送费估算</NavLink>
            <NavLink to="/compound/delivery-timeline">配送时间线</NavLink>
            <NavLink to="/compound/return-policy">退换政策</NavLink>
            <NavLink to="/compound/upsell-bundle">搭配购</NavLink>
            <NavLink to="/compound/a11y-toolbar">可访问性工具栏</NavLink>
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
          <Route
            path="/slots/gallery-video"
            element={<GalleryVideoSlots />}
          />
          <Route path="/slots/responsive" element={<ResponsiveSlots />} />

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
          <Route path="/compound/ecommerce-sku" element={<EcommerceSKUCompound />} />
          <Route path="/compound/order-summary" element={<OrderSummaryDemo />} />
            <Route path="/compound/savings-badge" element={<SavingsBadgeDemo />} />
            <Route path="/compound/stock-badge" element={<StockBadgeDemo />} />
            <Route path="/compound/coupon-bar" element={<CouponBarDemo />} />
            <Route path="/compound/variant-media-switcher" element={<VariantMediaSwitcherDemo />} />
            <Route path="/compound/shipping-estimator" element={<ShippingEstimatorDemo />} />
            <Route path="/compound/delivery-timeline" element={<DeliveryTimelineDemo />} />
            <Route path="/compound/return-policy" element={<ReturnPolicyDemo />} />
            <Route path="/compound/upsell-bundle" element={<UpsellBundleDemo />} />
            <Route path="/compound/a11y-toolbar" element={<A11yToolbarDemo />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
