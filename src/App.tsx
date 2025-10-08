import "./App.css";

import { NavLink, Navigate, Route, Routes } from "react-router-dom";

import A11yToolbarDemo from "./pages/CardPlugin/compound/a11y/A11yToolbarDemo";
import ActionsDemo from "./pages/CardPlugin/compound/a11y/ActionsDemo";
import AdvAllInOne from "./pages/CardPlugin/advanced/AllInOne";
import AdvAnimationAnalytics from "./pages/CardPlugin/advanced/AnimationAnalytics";
import AdvCountdownPromo from "./pages/CardPlugin/advanced/CountdownPromo";
import AdvCustomActions from "./pages/CardPlugin/advanced/CustomActions";
import BackgroundImageLayout from "./pages/CardPlugin/layouts/BackgroundImageLayout";
import BannerLayout from "./pages/CardPlugin/layouts/BannerLayout";
import BasicCompound from "./pages/CardPlugin/compound/layouts/BasicCompound";
import BasicSlots from "./pages/CardPlugin/slots/BasicSlots";
import BottomImageLayout from "./pages/CardPlugin/layouts/BottomImageLayout";
import CardHome from "./pages/CardPlugin/Home";
import ColorSwatchesDemo from "./pages/CardPlugin/compound/controls/ColorSwatchesDemo";
import CouponBarDemo from "./pages/CardPlugin/compound/ui-display/CouponBarDemo";
import DeliveryTimelineDemo from "./pages/CardPlugin/compound/logistics/DeliveryTimelineDemo";
import EcommerceSKUCompound from "./pages/CardPlugin/compound/sku-compound/EcommerceSKUCompound";
import FooterActionsSlots from "./pages/CardPlugin/slots/FooterActionsSlots";
import GalleryVideoSlots from "./pages/CardPlugin/slots/GalleryVideoSlots";
import GridLayout from "./pages/CardPlugin/layouts/GridLayout";
import HeaderOverlaySlots from "./pages/CardPlugin/slots/HeaderOverlaySlots";
import HorizontalLayout from "./pages/CardPlugin/layouts/HorizontalLayout";
import LeftRightCompound from "./pages/CardPlugin/compound/layouts/LeftRightCompound";
import MediaAndDescDemo from "./pages/CardPlugin/compound/ui-display/MediaAndDescDemo";
import MinimalLayout from "./pages/CardPlugin/layouts/MinimalLayout";
import OptionPickerDemo from "./pages/CardPlugin/compound/controls/OptionPickerDemo";
import OrderSummaryDemo from "./pages/CardPlugin/compound/commerce-combo/OrderSummaryDemo";
import PluginEnhancedCompound from "./pages/CardPlugin/compound/layouts/PluginEnhancedCompound";
import PriceLabelsDemo from "./pages/CardPlugin/compound/ui-display/PriceLabelsDemo";
import QuantityStepperDemo from "./pages/CardPlugin/compound/controls/QuantityStepperDemo";
import React from "react";
import ReadmeDemo from "./pages/CardPlugin/ReadmeDemo";
import ResponsiveSlots from "./pages/CardPlugin/slots/ResponsiveSlots";
import ReturnPolicyDemo from "./pages/CardPlugin/compound/logistics/ReturnPolicyDemo";
import RightImageLayout from "./pages/CardPlugin/layouts/RightImageLayout";
import SavingsBadgeDemo from "./pages/CardPlugin/compound/ui-display/SavingsBadgeDemo";
import ShippingEstimatorDemo from "./pages/CardPlugin/compound/logistics/ShippingEstimatorDemo";
import SizeSelectorDemo from "./pages/CardPlugin/compound/controls/SizeSelectorDemo";
import StateDisplayDemo from "./pages/CardPlugin/compound/state/StateDisplayDemo";
import StockBadgeDemo from "./pages/CardPlugin/compound/ui-display/StockBadgeDemo";
import TitleDescriptionDemo from "./pages/CardPlugin/compound/ui-display/TitleDescriptionDemo";
import TopBottomCompound from "./pages/CardPlugin/compound/layouts/TopBottomCompound";
import TwoColumnLayout from "./pages/CardPlugin/layouts/TwoColumnLayout";
import UpsellBundleDemo from "./pages/CardPlugin/compound/commerce-combo/UpsellBundleDemo";
import VariantMediaSwitcherDemo from "./pages/CardPlugin/compound/controls/VariantMediaSwitcherDemo";
import VariantSelectorActionsDemo from "./pages/CardPlugin/compound/controls/VariantSelectorActionsDemo";
import VariantSelectorDemo from "./pages/CardPlugin/compound/controls/VariantSelectorDemo";
import VariantSelectorMediaComboDemo from "./pages/CardPlugin/compound/controls/VariantSelectorMediaComboDemo";
import VariantSelectorPriceInventoryDemo from "./pages/CardPlugin/compound/controls/VariantSelectorPriceInventoryDemo";
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
          <NavLink to="/readme">README 文档</NavLink>

 <h3 style={{ marginTop: 12 }}>复合组件专区</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <NavLink to="/compound/ui-display/title-description">
              UI：标题+描述
            </NavLink>
            <NavLink to="/compound/ui-display/media-desc">
              UI：媒体与描述
            </NavLink>
            <NavLink to="/compound/ui-display/price-labels">
              UI：价格标示
            </NavLink>
            <NavLink to="/compound/ui-display/savings-badge">
              UI：节省金额徽章
            </NavLink>
            <NavLink to="/compound/ui-display/stock-badge">
              UI：库存提示徽章
            </NavLink>
            <NavLink to="/compound/ui-display/coupon-bar">
              UI：优惠信息条
            </NavLink>
            <NavLink to="/compound/state/state-display">状态：派生展示</NavLink>
            <NavLink to="/compound/controls/variant-selector">
              控件：规格选择
            </NavLink>
            <NavLink to="/compound/controls/variant-selector-media">
              控件：规格+主图联动
            </NavLink>
            <NavLink to="/compound/controls/variant-selector-price-inventory">
              控件：规格+价格/库存联动
            </NavLink>
            <NavLink to="/compound/controls/variant-selector-actions">
              控件：规格+操作联动
            </NavLink>
            <NavLink to="/compound/controls/variant-media-switcher">
              控件：规格切换主图
            </NavLink>
            <NavLink to="/compound/controls/color-swatches">
              控件：颜色选择
            </NavLink>
            <NavLink to="/compound/controls/size-selector">
              控件：尺码选择
            </NavLink>
            <NavLink to="/compound/controls/option-picker">
              控件：通用属性
            </NavLink>
            <NavLink to="/compound/controls/quantity-stepper">
              控件：数量步进
            </NavLink>
            <NavLink to="/compound/commerce-combo/order-summary">
              组合：订单明细面板
            </NavLink>
            <NavLink to="/compound/commerce-combo/upsell-bundle">
              组合：搭配购
            </NavLink>
            <NavLink to="/compound/logistics/shipping-estimator">
              物流：配送费估算
            </NavLink>
            <NavLink to="/compound/logistics/delivery-timeline">
              物流：配送时间线
            </NavLink>
            <NavLink to="/compound/logistics/return-policy">
              物流：退换政策
            </NavLink>
            <NavLink to="/compound/a11y/toolbar">可访问性工具栏</NavLink>
            <NavLink to="/compound/a11y/actions">可访问性：操作区</NavLink>

            <NavLink to="/compound/basic">基础应用</NavLink>
            <NavLink to="/compound/left-right">左右布局</NavLink>
            <NavLink to="/compound/top-bottom">上下布局</NavLink>
            <NavLink to="/compound/enhanced">增强：复合组件+插件</NavLink>
            <NavLink to="/compound/sku-compound/ecommerce-sku">
              电商增强 + SKU
            </NavLink>
          </div>


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


        </nav>
      </aside>
      <main className="main">
        <Routes>
          <Route path="/" element={<CardHome />} />
          <Route path="/readme" element={<ReadmeDemo />} />

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
          <Route path="/slots/gallery-video" element={<GalleryVideoSlots />} />
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
          <Route
            path="/compound/sku-compound/ecommerce-sku"
            element={<EcommerceSKUCompound />}
          />
          <Route
            path="/compound/ui-display/title-description"
            element={<TitleDescriptionDemo />}
          />
          <Route
            path="/compound/ui-display/media-desc"
            element={<MediaAndDescDemo />}
          />
          <Route
            path="/compound/ui-display/price-labels"
            element={<PriceLabelsDemo />}
          />
          <Route
            path="/compound/ui-display/savings-badge"
            element={<SavingsBadgeDemo />}
          />
          <Route
            path="/compound/ui-display/stock-badge"
            element={<StockBadgeDemo />}
          />
          <Route
            path="/compound/ui-display/coupon-bar"
            element={<CouponBarDemo />}
          />
          <Route
            path="/compound/state/state-display"
            element={<StateDisplayDemo />}
          />
          <Route
            path="/compound/controls/variant-selector"
            element={<VariantSelectorDemo />}
          />
          <Route
            path="/compound/controls/variant-selector-media"
            element={<VariantSelectorMediaComboDemo />}
          />
          <Route
            path="/compound/controls/variant-selector-price-inventory"
            element={<VariantSelectorPriceInventoryDemo />}
          />
          <Route
            path="/compound/controls/variant-selector-actions"
            element={<VariantSelectorActionsDemo />}
          />
          <Route
            path="/compound/controls/variant-media-switcher"
            element={<VariantMediaSwitcherDemo />}
          />
          <Route
            path="/compound/controls/color-swatches"
            element={<ColorSwatchesDemo />}
          />
          <Route
            path="/compound/controls/size-selector"
            element={<SizeSelectorDemo />}
          />
          <Route
            path="/compound/controls/option-picker"
            element={<OptionPickerDemo />}
          />
          <Route
            path="/compound/controls/quantity-stepper"
            element={<QuantityStepperDemo />}
          />
          <Route
            path="/compound/commerce-combo/order-summary"
            element={<OrderSummaryDemo />}
          />
          <Route
            path="/compound/commerce-combo/upsell-bundle"
            element={<UpsellBundleDemo />}
          />
          <Route
            path="/compound/logistics/shipping-estimator"
            element={<ShippingEstimatorDemo />}
          />
          <Route
            path="/compound/logistics/delivery-timeline"
            element={<DeliveryTimelineDemo />}
          />
          <Route
            path="/compound/logistics/return-policy"
            element={<ReturnPolicyDemo />}
          />
          <Route path="/compound/a11y/toolbar" element={<A11yToolbarDemo />} />
          <Route path="/compound/a11y/actions" element={<ActionsDemo />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
