import {
  ProductCard,
  createA11yPlugin,
  createAnimationPlugin,
  createBadgePlugin,
  createGalleryPlugin,
  createHoverPlugin,
  createInventoryPlugin,
  createResponsivePlugin,
  createReviewPlugin,
  createVideoPlugin,
} from "vane-card";

import DemoPage from "../../_layout/DemoPage";
import React from "react";

const mockProductB = {
  id: "p-2002",
  title: "智能手表 Pro",
  description: "全天候心率监测，消息提醒，运动记录",
  price: 2999,
  image:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
  badge: "甄选",
  rating: 4.8,
  ratingCount: 5230,
  inventory: 25,
  // 媒体增强字段
  video:
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  images: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=800&auto=format&fit=crop",
  ],
};

const PluginEnhancedCompound: React.FC = () => {
  return (
    <DemoPage
      title="增强：复合组件 + 插件"
      description="在复合组件基础上注入插件，增强交互与视觉效果。"
    >
      <div className="card" style={{ padding: 12 }}>
        <ProductCard
          productId={mockProductB.id}
          data={mockProductB}
          plugins={[
            createHoverPlugin({ enableShadow: true, scaleRatio: 1.03 }),
            createAnimationPlugin(),
            createBadgePlugin({ text: mockProductB.badge, position: "top-right" }),
            createResponsivePlugin({
              breakpoints: { mobile: 600, tablet: 900, desktop: 1200 },
              layouts: { mobile: "vertical", tablet: "vertical", desktop: "horizontal" },
              containerStyles: {
                mobile: { padding: 8 },
                tablet: { padding: 12 },
                desktop: { padding: 16 },
              },
            }),
            createReviewPlugin({ showRating: true, showReviewCount: true }),
            // 可控位置：通过 headerPosition/order 控制渲染位置与顺序
            createVideoPlugin({ autoplay: false, controls: true, muted: true, playOnHover: false, headerPosition: "before", order: 5 }),
            createGalleryPlugin({ autoplay: true, interval: 2500, showIndicators: true, headerPosition: "before", order: 10 ,videoIndex:1}),
            createInventoryPlugin({ lowStockThreshold: 10, showOverlayWhenSoldOut: true }),
            createA11yPlugin({ keyboardNavigation: true, announceOnFocus: false }),
          ]}
        >
          {/* 如果开启 Video/Gallery 插件，头部媒体由插件渲染；这里保留 Image 以兼容无媒体场景 */}
          {/* <ProductCard.Image style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 8 }} /> */}
          <div style={{ padding: 12 }}>
            <ProductCard.Title />
            <ProductCard.Price />
            <ProductCard.Rating />
            <ProductCard.Inventory />
          </div>
          <div style={{ padding: 12 }}>
            <ProductCard.Actions />
          </div>
        </ProductCard>
      </div>
    </DemoPage>
  );
};

export default PluginEnhancedCompound;
