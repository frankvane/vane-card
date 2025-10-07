import React, { useEffect, useState } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useLocation } from "react-router-dom";

type DemoPageProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  // 可选：手动指定源码映射键，覆盖路由推导
  sourceKey?: string;
  // 可选：显示用的文件路径（不影响加载），便于文档展示
  routeFileName?: string;
};

// 路由路径到文件名的映射
const routeToFileMap: Record<string, string> = {
  "/": "Home",
  // 旧页面已拆分
  "/slots/basic": "slots/BasicSlots",
  "/slots/header-overlay": "slots/HeaderOverlaySlots",
  "/slots/footer-actions": "slots/FooterActionsSlots",
  "/advanced/animation-analytics": "advanced/AnimationAnalytics",
  "/advanced/custom-actions": "advanced/CustomActions",
  "/advanced/countdown-promo": "advanced/CountdownPromo",
  "/advanced/all-in-one": "advanced/AllInOne",
  "/layouts/vertical": "layouts/VerticalLayout",
  "/layouts/horizontal": "layouts/HorizontalLayout",
  "/layouts/right-image": "layouts/RightImageLayout",
  "/layouts/bottom-image": "layouts/BottomImageLayout",
  "/layouts/banner": "layouts/BannerLayout",
  "/layouts/grid": "layouts/GridLayout",
  "/layouts/minimal": "layouts/MinimalLayout",
  "/layouts/background": "layouts/BackgroundImageLayout",
  "/layouts/two-column": "layouts/TwoColumnLayout",
  "/compound/basic": "compound/layouts/BasicCompound",
  "/compound/enhanced": "compound/layouts/PluginEnhancedCompound",
  "/compound/left-right": "compound/layouts/LeftRightCompound",
  "/compound/top-bottom": "compound/layouts/TopBottomCompound",
  "/compound/sku-compound/ecommerce-sku": "compound/sku-compound/EcommerceSKUCompound",
  "/compound/ui-display/title-description": "compound/ui-display/TitleDescriptionDemo",
  "/compound/ui-display/media-desc": "compound/ui-display/MediaAndDescDemo",
  "/compound/ui-display/price-labels": "compound/ui-display/PriceLabelsDemo",
  "/compound/ui-display/savings-badge": "compound/ui-display/SavingsBadgeDemo",
  "/compound/ui-display/stock-badge": "compound/ui-display/StockBadgeDemo",
  "/compound/ui-display/coupon-bar": "compound/ui-display/CouponBarDemo",
  "/compound/controls/variant-selector": "compound/controls/VariantSelectorDemo",
  "/compound/controls/variant-selector-media": "compound/controls/VariantSelectorMediaComboDemo",
  "/compound/controls/variant-selector-price-inventory": "compound/controls/VariantSelectorPriceInventoryDemo",
  "/compound/controls/variant-selector-actions": "compound/controls/VariantSelectorActionsDemo",
  "/compound/controls/variant-media-switcher": "compound/controls/VariantMediaSwitcherDemo",
  "/compound/controls/color-swatches": "compound/controls/ColorSwatchesDemo",
  "/compound/controls/size-selector": "compound/controls/SizeSelectorDemo",
  "/compound/controls/option-picker": "compound/controls/OptionPickerDemo",
  "/compound/state/state-display": "compound/state/StateDisplayDemo",
  "/compound/controls/quantity-stepper": "compound/controls/QuantityStepperDemo",
  "/compound/a11y/actions": "compound/a11y/ActionsDemo",
  "/compound/a11y/toolbar": "compound/a11y/A11yToolbarDemo",
  "/compound/logistics/shipping-estimator": "compound/logistics/ShippingEstimatorDemo",
  "/compound/logistics/delivery-timeline": "compound/logistics/DeliveryTimelineDemo",
  "/compound/logistics/return-policy": "compound/logistics/ReturnPolicyDemo",
  "/compound/commerce-combo/upsell-bundle": "compound/commerce-combo/UpsellBundleDemo",
  "/compound/commerce-combo/order-summary": "compound/commerce-combo/OrderSummaryDemo",
  "/slots/responsive": "slots/ResponsiveSlots",
  "/slots/gallery-video": "slots/GalleryVideoSlots",
};

// 通过显式的动态导入映射，确保 Vite 能正确打包这些原文件的 raw 文本
const fileLoaderMap: Record<string, () => Promise<{ default: string }>> = {
  Home: () => import("../Home.tsx?raw"),
  // 旧页面已拆分
  "slots/BasicSlots": () => import("../slots/BasicSlots.tsx?raw"),
  "slots/HeaderOverlaySlots": () =>
    import("../slots/HeaderOverlaySlots.tsx?raw"),
  "slots/FooterActionsSlots": () =>
    import("../slots/FooterActionsSlots.tsx?raw"),
  "advanced/AnimationAnalytics": () =>
    import("../advanced/AnimationAnalytics.tsx?raw"),
  "advanced/CustomActions": () => import("../advanced/CustomActions.tsx?raw"),
  "advanced/CountdownPromo": () => import("../advanced/CountdownPromo.tsx?raw"),
  "advanced/AllInOne": () => import("../advanced/AllInOne.tsx?raw"),
  "layouts/VerticalLayout": () => import("../layouts/VerticalLayout.tsx?raw"),
  "layouts/HorizontalLayout": () =>
    import("../layouts/HorizontalLayout.tsx?raw"),
  "layouts/RightImageLayout": () =>
    import("../layouts/RightImageLayout.tsx?raw"),
  "layouts/BottomImageLayout": () =>
    import("../layouts/BottomImageLayout.tsx?raw"),
  "layouts/BannerLayout": () => import("../layouts/BannerLayout.tsx?raw"),
  "layouts/GridLayout": () => import("../layouts/GridLayout.tsx?raw"),
  "layouts/MinimalLayout": () => import("../layouts/MinimalLayout.tsx?raw"),
  "layouts/BackgroundImageLayout": () =>
    import("../layouts/BackgroundImageLayout.tsx?raw"),
  "layouts/TwoColumnLayout": () => import("../layouts/TwoColumnLayout.tsx?raw"),
  "compound/layouts/BasicCompound": () => import("../compound/layouts/BasicCompound.tsx?raw"),
  "compound/layouts/PluginEnhancedCompound": () =>
    import("../compound/layouts/PluginEnhancedCompound.tsx?raw"),
  "compound/layouts/LeftRightCompound": () => import("../compound/layouts/LeftRightCompound.tsx?raw"),
  "compound/layouts/TopBottomCompound": () => import("../compound/layouts/TopBottomCompound.tsx?raw"),
  "compound/sku-compound/EcommerceSKUCompound": () => import("../compound/sku-compound/EcommerceSKUCompound.tsx?raw"),
  "compound/ui-display/TitleDescriptionDemo": () =>
    import("../compound/ui-display/TitleDescriptionDemo.tsx?raw"),
  "compound/ui-display/PriceLabelsDemo": () =>
    import("../compound/ui-display/PriceLabelsDemo.tsx?raw"),
  "compound/ui-display/MediaAndDescDemo": () =>
    import("../compound/ui-display/MediaAndDescDemo.tsx?raw"),
  "compound/ui-display/SavingsBadgeDemo": () =>
    import("../compound/ui-display/SavingsBadgeDemo.tsx?raw"),
  "compound/ui-display/StockBadgeDemo": () =>
    import("../compound/ui-display/StockBadgeDemo.tsx?raw"),
  "compound/ui-display/CouponBarDemo": () =>
    import("../compound/ui-display/CouponBarDemo.tsx?raw"),
  "compound/controls/VariantSelectorDemo": () =>
    import("../compound/controls/VariantSelectorDemo.tsx?raw"),
  "compound/controls/ColorSwatchesDemo": () =>
    import("../compound/controls/ColorSwatchesDemo.tsx?raw"),
  "compound/controls/SizeSelectorDemo": () =>
    import("../compound/controls/SizeSelectorDemo.tsx?raw"),
  "compound/controls/OptionPickerDemo": () =>
    import("../compound/controls/OptionPickerDemo.tsx?raw"),
  "compound/controls/VariantSelectorMediaComboDemo": () =>
    import("../compound/controls/VariantSelectorMediaComboDemo.tsx?raw"),
  "compound/controls/VariantSelectorPriceInventoryDemo": () =>
    import("../compound/controls/VariantSelectorPriceInventoryDemo.tsx?raw"),
  "compound/controls/VariantSelectorActionsDemo": () =>
    import("../compound/controls/VariantSelectorActionsDemo.tsx?raw"),
  "compound/controls/VariantMediaSwitcherDemo": () =>
    import("../compound/controls/VariantMediaSwitcherDemo.tsx?raw"),
  "compound/state/StateDisplayDemo": () =>
    import("../compound/state/StateDisplayDemo.tsx?raw"),
  "compound/controls/QuantityStepperDemo": () =>
    import("../compound/controls/QuantityStepperDemo.tsx?raw"),
  "compound/a11y/ActionsDemo": () =>
    import("../compound/a11y/ActionsDemo.tsx?raw"),
  "compound/a11y/A11yToolbarDemo": () =>
    import("../compound/a11y/A11yToolbarDemo.tsx?raw"),
  "compound/logistics/ShippingEstimatorDemo": () =>
    import("../compound/logistics/ShippingEstimatorDemo.tsx?raw"),
  "compound/logistics/DeliveryTimelineDemo": () =>
    import("../compound/logistics/DeliveryTimelineDemo.tsx?raw"),
  "compound/logistics/ReturnPolicyDemo": () =>
    import("../compound/logistics/ReturnPolicyDemo.tsx?raw"),
  "compound/commerce-combo/UpsellBundleDemo": () =>
    import("../compound/commerce-combo/UpsellBundleDemo.tsx?raw"),
  "compound/commerce-combo/OrderSummaryDemo": () =>
    import("../compound/commerce-combo/OrderSummaryDemo.tsx?raw"),
  "slots/ResponsiveSlots": () => import("../slots/ResponsiveSlots.tsx?raw"),
  "slots/GalleryVideoSlots": () => import("../slots/GalleryVideoSlots.tsx?raw"),
};

const DemoPage: React.FC<DemoPageProps> = ({
  title,
  description,
  children,
  sourceKey,
}) => {
  const location = useLocation();
  const [sourceCode, setSourceCode] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadSourceCode = async () => {
      // 获取当前路由对应的文件名；若提供了 sourceKey，则优先使用
      const fileName = sourceKey ?? routeToFileMap[location.pathname];
      if (fileName) {
        try {
          // 使用显式映射，避免变量路径的动态导入在构建阶段无法被静态分析
          const loader = fileLoaderMap[fileName];
          if (loader) {
            const module = await loader();
            setSourceCode(module.default);
          } else {
            setSourceCode("// 源码映射未找到");
          }
        } catch (error) {
          console.error("加载源码失败:", error);
          setSourceCode("// 源码加载失败");
        }
      }
    };

    loadSourceCode();
  }, [location.pathname, sourceKey]);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
        {description ? <p className="page-desc">{description}</p> : null}
      </div>
      <div className="page-card">{children}</div>

      {sourceCode && (
        <div className="page-card" style={{ marginTop: "20px" }}>
          <h2 style={{ marginBottom: "10px", fontSize: "1.2em" }}>源码</h2>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
            <button
              type="button"
              aria-label="复制源码"
              onClick={() => {
                if (!sourceCode) return;
                navigator.clipboard?.writeText(sourceCode).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                });
              }}
              id="copy-code-btn"
              style={{
                padding: "6px 10px",
                fontSize: 12,
                border: "1px solid #ddd",
                borderRadius: 6,
                background: "#f7f7f7",
                cursor: "pointer",
              }}
            >
              {copied ? "已复制" : "复制"}
            </button>
          </div>
          <SyntaxHighlighter
            language="tsx"
            style={tomorrow}
            showLineNumbers={true}
            wrapLines={true}
            wrapLongLines={true}
            customStyle={{
              borderRadius: "4px",
              fontSize: "14px",
              lineHeight: "1.5",
              margin: 0,
            }}
          >
            {sourceCode}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default DemoPage;
