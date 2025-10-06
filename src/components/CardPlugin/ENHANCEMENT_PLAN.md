# CardPlugin 组件增强计划

## 📊 当前状态分析

### 已实现的核心功能

#### 1. 核心架构

- ✅ **CardCore**: 纯渲染核心组件
- ✅ **PluginManager**: 插件生命周期管理
- ✅ **PluginBus**: 插件间通信总线
- ✅ **withPlugins HOC**: 插件注入机制
- ✅ 完整的 TypeScript 类型系统

#### 2. 已实现插件 (8 个)

- ✅ **ImagePlugin**: 基础图片渲染
- ✅ **BadgePlugin**: 徽章/标签显示
- ✅ **HoverPlugin**: 悬停交互效果
- ✅ **StatePlugin**: 购物车/心愿单状态管理
- ✅ **ActionsPlugin**: 操作按钮渲染
- ✅ **AnimationPlugin**: 卡片入场动画
- ✅ **AnalyticsPlugin**: 点击/交互统计
- ✅ **CountdownPlugin**: 倒计时徽章

#### 3. 示例页面结构

- ✅ 布局专区（9 种布局）
- ✅ 插槽专区（3 种插槽模式）
- ✅ 高级专区（4 种高级应用）

---

## 🎯 功能增强建议

### 一、核心能力增强

#### 1.1 性能优化

```typescript
// 建议：虚拟化支持插件
const createVirtualizationPlugin = () => ({
  name: "VirtualizationPlugin",
  description: "支持大量卡片的虚拟化渲染",
  hooks: {
    onMount: (context) => {
      // 使用 Intersection Observer 优化渲染
    },
  },
});
```

**优先级**: ⭐⭐⭐⭐
**实施难度**: 中等
**收益**: 大列表场景下性能提升 10-50 倍

#### 1.2 响应式布局

```typescript
// 建议：响应式插件
const createResponsivePlugin = (config: {
  breakpoints: { mobile: number; tablet: number; desktop: number };
  layouts: { mobile: string; tablet: string; desktop: string };
}) => ({
  name: "ResponsivePlugin",
  hooks: {
    onResize: (context, width) => {
      // 根据设备宽度切换布局
    },
  },
});
```

**优先级**: ⭐⭐⭐⭐⭐
**实施难度**: 中等
**收益**: 移动端适配自动化

#### 1.3 主题系统

```typescript
// 建议：主题插件
interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    danger: string;
    success: string;
  };
  spacing: { xs: number; sm: number; md: number; lg: number; xl: number };
  typography: { fontFamily: string; fontSize: Record<string, string> };
}

const createThemePlugin = (theme: ThemeConfig) => ({
  name: "ThemePlugin",
  hooks: {
    transformProps: (props) => {
      // 注入主题变量到 containerStyle
    },
  },
});
```

**优先级**: ⭐⭐⭐⭐
**实施难度**: 中等
**收益**: 统一品牌风格，支持暗色模式

---

### 二、交互体验增强

#### 2.1 拖拽排序插件

```typescript
const createDraggablePlugin = (config?: {
  dragHandleSelector?: string;
  onDragStart?: (cardId: string) => void;
  onDragEnd?: (cardId: string, newIndex: number) => void;
}) => ({
  name: "DraggablePlugin",
  priority: 80,
  hooks: {
    onMount: (context) => {
      const container = context.getContainer();
      container?.setAttribute("draggable", "true");
      container?.addEventListener("dragstart", handleDragStart);
      container?.addEventListener("dragend", handleDragEnd);
    },
    onUnmount: (context) => {
      // 清理事件监听器
    },
  },
});
```

**优先级**: ⭐⭐⭐
**实施难度**: 中等
**收益**: 购物车排序、收藏列表整理

#### 2.2 手势操作插件

```typescript
const createGesturePlugin = (config: {
  enableSwipe?: boolean; // 滑动删除
  enablePinch?: boolean; // 双指缩放
  enableLongPress?: boolean; // 长按预览
  onSwipeLeft?: (cardId: string) => void;
  onSwipeRight?: (cardId: string) => void;
  onLongPress?: (cardId: string) => void;
}) => ({
  name: "GesturePlugin",
  priority: 70,
  // 使用 Hammer.js 或原生 Touch Events
});
```

**优先级**: ⭐⭐⭐⭐
**实施难度**: 较高
**收益**: 移动端操作体验大幅提升

#### 2.3 动画序列插件

```typescript
const createAnimationSequencePlugin = (config: {
  entrance?: "fade" | "slide" | "zoom" | "bounce";
  exit?: "fade" | "slide" | "zoom";
  hover?: "lift" | "glow" | "pulse";
  stagger?: number; // 列表进入时的交错延迟
}) => ({
  name: "AnimationSequencePlugin",
  priority: 5,
  hooks: {
    onMount: (context) => {
      // 使用 CSS 或 Framer Motion 实现动画
    },
  },
});
```

**优先级**: ⭐⭐⭐
**实施难度**: 中等
**收益**: 更丰富的视觉体验

---

### 三、数据管理增强

#### 3.1 加载状态插件

```typescript
const createLoadingPlugin = (config?: {
  skeleton?: React.ReactNode; // 骨架屏
  spinner?: React.ReactNode;
  minLoadingTime?: number; // 最小加载时间（避免闪烁）
}) => ({
  name: "LoadingPlugin",
  hooks: {
    renderOverlay: (context) => {
      if (context.state.isLoading) {
        return config?.skeleton || <Spinner />;
      }
      return null;
    },
  },
});
```

**优先级**: ⭐⭐⭐⭐⭐
**实施难度**: 低
**收益**: 更好的加载体验

#### 3.2 缓存插件

```typescript
const createCachePlugin = (config: {
  cacheKey: (cardId: string) => string;
  ttl?: number; // 缓存过期时间
  storage?: "memory" | "localStorage" | "indexedDB";
}) => ({
  name: "CachePlugin",
  hooks: {
    onBeforeDataChange: (context, oldData, newData) => {
      // 缓存数据到存储
    },
    onMount: (context) => {
      // 从缓存恢复数据
    },
  },
});
```

**优先级**: ⭐⭐⭐
**实施难度**: 中等
**收益**: 减少网络请求，提升响应速度

#### 3.3 实时同步插件

```typescript
const createRealtimePlugin = (config: {
  websocketUrl: string;
  channel: string;
  onUpdate: (cardId: string, data: any) => void;
}) => ({
  name: "RealtimePlugin",
  hooks: {
    onMount: (context) => {
      // 建立 WebSocket 连接
      // 监听服务端更新
    },
    onUnmount: (context) => {
      // 断开连接
    },
  },
});
```

**优先级**: ⭐⭐⭐
**实施难度**: 较高
**收益**: 库存/价格实时更新

---

### 四、媒体增强

#### 4.1 视频插件

```typescript
const createVideoPlugin = (config: {
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  poster?: string; // 封面图
  playOnHover?: boolean; // 悬停播放
}) => ({
  name: "VideoPlugin",
  priority: 40,
  hooks: {
    renderHeader: (context) => {
      const videoSrc = context.data?.video || config.src;
      return (
        <video
          autoPlay={config.autoplay}
          muted={config.muted}
          loop={config.loop}
          poster={config.poster}
        >
          <source src={videoSrc} />
        </video>
      );
    },
    onHover: (context, isHovered) => {
      if (config.playOnHover) {
        const video = context.getContainer()?.querySelector("video");
        isHovered ? video?.play() : video?.pause();
      }
    },
  },
});
```

**优先级**: ⭐⭐⭐⭐
**实施难度**: 中等
**收益**: 电商场景下更直观的商品展示

#### 4.2 图片画廊插件

```typescript
const createGalleryPlugin = (config: {
  images: string[];
  autoplay?: boolean;
  interval?: number;
  showThumbnails?: boolean;
  showIndicators?: boolean;
  enableZoom?: boolean; // 点击放大预览
}) => ({
  name: "GalleryPlugin",
  priority: 40,
  hooks: {
    renderHeader: (context) => {
      const [currentIndex, setCurrentIndex] = useState(0);
      // 轮播图逻辑
      return <Carousel images={config.images} />;
    },
  },
});
```

**优先级**: ⭐⭐⭐⭐
**实施难度**: 中等
**收益**: 多图展示，提升转化率

#### 4.3 3D 模型插件

```typescript
const create3DModelPlugin = (config: {
  modelUrl: string; // .glb 或 .gltf
  enableRotation?: boolean;
  enableZoom?: boolean;
  autoRotate?: boolean;
}) => ({
  name: "3DModelPlugin",
  priority: 40,
  hooks: {
    renderHeader: (context) => {
      // 使用 Three.js 或 @google/model-viewer
      return <ModelViewer modelUrl={config.modelUrl} />;
    },
  },
});
```

**优先级**: ⭐⭐
**实施难度**: 高
**收益**: 高端商品（珠宝、家具）展示

---

### 五、电商场景增强

#### 5.1 价格计算插件

```typescript
const createPriceCalculatorPlugin = (config?: {
  showOriginalPrice?: boolean;
  showDiscount?: boolean;
  showSavings?: boolean;
  currency?: string;
  locale?: string;
}) => ({
  name: "PriceCalculatorPlugin",
  hooks: {
    renderFooter: (context) => {
      const { price, originalPrice } = context.data;
      const discount = (
        ((originalPrice - price) / originalPrice) *
        100
      ).toFixed(0);
      return (
        <div>
          <span className="current-price">¥{price}</span>
          {originalPrice && (
            <>
              <span className="original-price">¥{originalPrice}</span>
              <span className="discount">-{discount}%</span>
            </>
          )}
        </div>
      );
    },
  },
});
```

**优先级**: ⭐⭐⭐⭐
**实施难度**: 低
**收益**: 价格展示更清晰

#### 5.2 库存状态插件

```typescript
const createInventoryPlugin = (config: {
  lowStockThreshold?: number;
  showStockCount?: boolean;
  urgencyMessage?: (stock: number) => string;
}) => ({
  name: "InventoryPlugin",
  hooks: {
    renderOverlay: (context) => {
      const stock = context.data?.stock || 0;
      if (stock === 0) {
        return <Badge>售罄</Badge>;
      }
      if (stock < (config.lowStockThreshold || 10)) {
        return <Badge color="warning">仅剩 {stock} 件</Badge>;
      }
      return null;
    },
  },
});
```

**优先级**: ⭐⭐⭐⭐
**实施难度**: 低
**收益**: 制造紧迫感，提升转化

#### 5.3 比价插件

```typescript
const createComparePricePlugin = (config: {
  competitors?: Array<{ name: string; price: number; url: string }>;
  showLowestPrice?: boolean;
}) => ({
  name: "ComparePricePlugin",
  hooks: {
    renderFooter: (context) => {
      // 显示其他平台价格对比
      return <PriceComparison competitors={config.competitors} />;
    },
  },
});
```

**优先级**: ⭐⭐⭐
**实施难度**: 低
**收益**: 增强用户信任

#### 5.4 优惠券插件

```typescript
const createCouponPlugin = (config: {
  coupons: Array<{
    code: string;
    discount: number;
    minAmount?: number;
    expiry?: Date;
  }>;
  autoApply?: boolean;
}) => ({
  name: "CouponPlugin",
  hooks: {
    renderFooter: (context) => {
      return (
        <div className="coupons">
          {config.coupons.map((coupon) => (
            <CouponTag key={coupon.code} coupon={coupon} />
          ))}
        </div>
      );
    },
  },
});
```

**优先级**: ⭐⭐⭐⭐
**实施难度**: 低
**收益**: 促销转化

---

### 六、社交增强

#### 6.1 分享插件

```typescript
const createSharePlugin = (config: {
  platforms?: Array<"wechat" | "weibo" | "qq" | "facebook" | "twitter">;
  shareData: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
  onShare?: (platform: string) => void;
}) => ({
  name: "SharePlugin",
  hooks: {
    renderFooter: (context) => {
      return (
        <ShareButtons platforms={config.platforms} onShare={config.onShare} />
      );
    },
  },
});
```

**优先级**: ⭐⭐⭐⭐
**实施难度**: 中等
**收益**: 社交传播，拉新

#### 6.2 评论/评分插件

```typescript
const createReviewPlugin = (config: {
  showRating?: boolean;
  showReviewCount?: boolean;
  enableUserReview?: boolean;
  onReviewSubmit?: (rating: number, comment: string) => void;
}) => ({
  name: "ReviewPlugin",
  hooks: {
    renderFooter: (context) => {
      const { rating, reviewCount } = context.data;
      return (
        <div>
          <StarRating value={rating} readonly />
          <span>({reviewCount} 评价)</span>
        </div>
      );
    },
  },
});
```

**优先级**: ⭐⭐⭐⭐⭐
**实施难度**: 低
**收益**: 提升可信度

#### 6.3 用户标签插件

```typescript
const createUserTagPlugin = (config: {
  tags: Array<{ label: string; color: string }>;
  maxTags?: number;
}) => ({
  name: "UserTagPlugin",
  hooks: {
    renderOverlay: (context) => {
      const tags = context.data?.tags || config.tags;
      return (
        <div className="tags">
          {tags.slice(0, config.maxTags).map((tag) => (
            <Tag key={tag.label} color={tag.color}>
              {tag.label}
            </Tag>
          ))}
        </div>
      );
    },
  },
});
```

**优先级**: ⭐⭐⭐
**实施难度**: 低
**收益**: 用户生成内容展示

---

### 七、无障碍/可访问性增强

#### 7.1 无障碍插件

```typescript
const createA11yPlugin = (config?: {
  announceOnFocus?: boolean;
  keyboardNavigation?: boolean;
  highContrast?: boolean;
}) => ({
  name: "A11yPlugin",
  priority: 100,
  hooks: {
    onMount: (context) => {
      const container = context.getContainer();
      // ARIA 标签
      container?.setAttribute("role", "article");
      container?.setAttribute("aria-label", context.data?.name);

      // 键盘导航
      if (config.keyboardNavigation) {
        container?.setAttribute("tabindex", "0");
        container?.addEventListener("keydown", handleKeyboard);
      }
    },
  },
});
```

**优先级**: ⭐⭐⭐⭐
**实施难度**: 中等
**收益**: 符合 WCAG 标准，扩大用户群

#### 7.2 国际化插件

```typescript
const createI18nPlugin = (config: {
  locale: string;
  messages: Record<string, Record<string, string>>;
  formatNumber?: (value: number, locale: string) => string;
  formatCurrency?: (value: number, currency: string) => string;
}) => ({
  name: "I18nPlugin",
  hooks: {
    transformData: (context, data) => {
      // 翻译文本
      return {
        ...data,
        name: config.messages[config.locale][data.name] || data.name,
      };
    },
  },
});
```

**优先级**: ⭐⭐⭐⭐
**实施难度**: 中等
**收益**: 多语言市场支持

---

## 🖼️ vane-lazy-image 集成方案

### 方案一：增强现有 ImagePlugin

#### 优势

- ✅ 最小化改动
- ✅ 向后兼容
- ✅ 用户无需学习新 API

#### 实现方案

```typescript
// src/components/CardPlugin/custom-plugins/ImagePlugin/index.tsx

import { VaneLazyImage } from "vane-lazy-image";
import type { CardPlugin, PluginCreator } from "../../plugins/types";
import React from "react";

export interface ImagePluginConfig {
  src?: string;
  alt?: string;
  lazyLoad?: boolean;
  placeholder?: React.ReactNode;
  errorFallback?: React.ReactNode;

  // ===== vane-lazy-image 集成参数 =====
  useVaneLazyImage?: boolean; // 是否启用 vane-lazy-image

  // 懒加载配置
  rootMargin?: string; // Intersection Observer rootMargin
  threshold?: number | number[]; // 可见性阈值

  // 占位图
  placeholderSrc?: string; // 低质量占位图
  placeholderBlur?: number; // 模糊程度 (px)

  // 过渡动画
  fadeInDuration?: number; // 淡入时长 (ms)
  enableZoom?: boolean; // 点击放大

  // 性能优化
  srcSet?: string; // 响应式图片
  sizes?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";

  // 回调
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
  onLoadError?: (error: Error) => void;
}

export const createImagePlugin: PluginCreator<any, ImagePluginConfig> = (
  config = {}
) => {
  const {
    lazyLoad = true,
    useVaneLazyImage = true, // 默认启用
    placeholder,
    errorFallback,
    rootMargin = "50px",
    threshold = 0.01,
    placeholderSrc,
    placeholderBlur = 10,
    fadeInDuration = 300,
    enableZoom = false,
    onLoadStart,
    onLoadComplete,
    onLoadError,
  } = config;

  const plugin: CardPlugin = {
    name: "ImagePlugin",
    version: "2.0.0", // 版本升级
    description: "图片渲染插件（集成 vane-lazy-image）",
    priority: 50,

    hooks: {
      renderHeader: (context) => {
        const src = config.src || context.data?.image;
        const alt = config.alt || context.data?.name || "商品图片";

        if (!src) return null;

        // 使用 vane-lazy-image
        if (useVaneLazyImage && lazyLoad) {
          return (
            <VaneLazyImage
              src={src}
              alt={alt}
              placeholderSrc={placeholderSrc}
              placeholderBlur={placeholderBlur}
              rootMargin={rootMargin}
              threshold={threshold}
              fadeInDuration={fadeInDuration}
              enableZoom={enableZoom}
              onLoadStart={onLoadStart}
              onLoadComplete={onLoadComplete}
              onLoadError={onLoadError}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              // 响应式图片
              srcSet={config.srcSet}
              sizes={config.sizes}
              loading={config.loading}
              decoding={config.decoding}
            />
          );
        }

        // 降级：原生 img
        return (
          <img
            src={src}
            alt={alt}
            loading={lazyLoad ? "lazy" : "eager"}
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onError={(e) => {
              if (onLoadError) {
                onLoadError(new Error("Image load failed"));
              }
              if (errorFallback) {
                e.currentTarget.style.display = "none";
              }
            }}
          />
        );
      },
    },

    config,
  };

  return plugin;
};
```

#### 使用示例

```tsx
import { CardCore, createImagePlugin, withPlugins } from "vane-card";

// 基础用法（自动启用 vane-lazy-image）
const Card1 = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({
      lazyLoad: true, // 默认使用 vane-lazy-image
    }),
  ],
});

// 高级配置
const Card2 = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({
      lazyLoad: true,
      useVaneLazyImage: true,

      // 占位图配置
      placeholderSrc: "https://example.com/placeholder.jpg",
      placeholderBlur: 15,

      // 性能优化
      rootMargin: "100px", // 提前 100px 加载
      threshold: 0.1,

      // 视觉效果
      fadeInDuration: 500,
      enableZoom: true,

      // 响应式
      srcSet: "image-400.jpg 400w, image-800.jpg 800w",
      sizes: "(max-width: 600px) 400px, 800px",

      // 回调
      onLoadComplete: () => console.log("图片加载完成"),
      onLoadError: (err) => console.error("图片加载失败", err),
    }),
  ],
});

// 禁用 vane-lazy-image（使用原生懒加载）
const Card3 = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({
      lazyLoad: true,
      useVaneLazyImage: false, // 使用原生 loading="lazy"
    }),
  ],
});
```

---

### 方案二：独立的 VaneLazyImagePlugin

#### 优势

- ✅ 职责更单一
- ✅ 不影响现有 ImagePlugin
- ✅ 用户可自由选择

#### 实现方案

```typescript
// src/components/CardPlugin/custom-plugins/VaneLazyImagePlugin/index.tsx

import { VaneLazyImage } from "vane-lazy-image";
import type { CardPlugin, PluginCreator } from "../../plugins/types";
import React from "react";

export interface VaneLazyImagePluginConfig {
  // 基础配置
  src?: string;
  alt?: string;

  // vane-lazy-image 特性
  placeholderSrc?: string;
  placeholderBlur?: number;
  rootMargin?: string;
  threshold?: number | number[];
  fadeInDuration?: number;
  enableZoom?: boolean;

  // 响应式
  srcSet?: string;
  sizes?: string;

  // 样式
  containerStyle?: React.CSSProperties;
  imageStyle?: React.CSSProperties;

  // 回调
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
  onLoadError?: (error: Error) => void;

  // 性能
  priority?: "high" | "low" | "auto";
  fetchPriority?: "high" | "low" | "auto";
}

export const createVaneLazyImagePlugin: PluginCreator<
  any,
  VaneLazyImagePluginConfig
> = (config = {}) => {
  const plugin: CardPlugin = {
    name: "VaneLazyImagePlugin",
    version: "1.0.0",
    description: "vane-lazy-image 懒加载插件",
    priority: 50,

    // 依赖检查（可选）
    dependencies: [], // 不依赖其他插件

    hooks: {
      renderHeader: (context) => {
        const src = config.src || context.data?.image;
        const alt = config.alt || context.data?.name || "商品图片";

        if (!src) return null;

        return (
          <div style={config.containerStyle}>
            <VaneLazyImage
              src={src}
              alt={alt}
              placeholderSrc={config.placeholderSrc}
              placeholderBlur={config.placeholderBlur || 10}
              rootMargin={config.rootMargin || "50px"}
              threshold={config.threshold || 0.01}
              fadeInDuration={config.fadeInDuration || 300}
              enableZoom={config.enableZoom || false}
              srcSet={config.srcSet}
              sizes={config.sizes}
              priority={config.priority}
              fetchPriority={config.fetchPriority}
              onLoadStart={config.onLoadStart}
              onLoadComplete={config.onLoadComplete}
              onLoadError={config.onLoadError}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                ...config.imageStyle,
              }}
            />
          </div>
        );
      },
    },

    config,
  };

  return plugin;
};
```

#### 使用示例

```tsx
import { CardCore, createVaneLazyImagePlugin, withPlugins } from "vane-card";

const ProductCard = withPlugins(CardCore, {
  plugins: [
    createVaneLazyImagePlugin({
      placeholderSrc: "/placeholder.jpg",
      placeholderBlur: 15,
      fadeInDuration: 500,
      enableZoom: true,
      rootMargin: "100px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
      onLoadComplete: () => console.log("加载完成"),
    }),
  ],
});
```

---

### 方案三：混合方案（推荐）

#### 策略

1. **增强 ImagePlugin**（方案一）作为默认方案
2. **新增 VaneLazyImagePlugin**（方案二）作为高级方案
3. 通过 `useVaneLazyImage` 开关在两者间切换

#### 优势

- ✅ 灵活性最高
- ✅ 兼容性最好
- ✅ 用户可根据需求选择

#### 导出配置

```typescript
// src/components/CardPlugin/custom-plugins/index.ts

export { createImagePlugin } from "./ImagePlugin"; // 已增强
export type { ImagePluginConfig } from "./ImagePlugin";

export { createVaneLazyImagePlugin } from "./VaneLazyImagePlugin"; // 新增
export type { VaneLazyImagePluginConfig } from "./VaneLazyImagePlugin";

// ... 其他插件导出
```

---

## 📋 实施优先级建议

### P0 - 立即实施（1-2 周）

1. ✅ **vane-lazy-image 集成**（方案三：混合方案）
2. ✅ **LoadingPlugin**（加载状态/骨架屏）
3. ✅ **ReviewPlugin**（评分/评价）
4. ✅ **ResponsivePlugin**（响应式布局）

### P1 - 短期实施（1 个月）

5. ✅ **ThemePlugin**（主题系统）
6. ✅ **VideoPlugin**（视频展示）
7. ✅ **GalleryPlugin**（图片画廊）
8. ✅ **InventoryPlugin**（库存状态）
9. ✅ **SharePlugin**（社交分享）

### P2 - 中期实施（2-3 个月）

10. ✅ **GesturePlugin**（手势操作）
11. ✅ **AnimationSequencePlugin**（动画序列）
12. ✅ **DraggablePlugin**（拖拽排序）
13. ✅ **A11yPlugin**（无障碍）
14. ✅ **I18nPlugin**（国际化）

### P3 - 长期规划（3+ 个月）

15. ✅ **VirtualizationPlugin**（虚拟化）
16. ✅ **RealtimePlugin**（实时同步）
17. ✅ **CachePlugin**（缓存）
18. ✅ **3DModelPlugin**（3D 模型）

---

## 🎨 示例页面扩展建议

### 新增示例页面

```
src/pages/CardPlugin/
├── media/                    # 媒体专区（新增）
│   ├── VideoCard.tsx        # 视频卡片
│   ├── GalleryCard.tsx      # 图片画廊
│   └── 3DModelCard.tsx      # 3D 模型
├── interactive/              # 交互专区（新增）
│   ├── DraggableCard.tsx    # 拖拽排序
│   ├── GestureCard.tsx      # 手势操作
│   └── AnimatedCard.tsx     # 高级动画
├── ecommerce/                # 电商专区（新增）
│   ├── PriceCard.tsx        # 价格计算
│   ├── InventoryCard.tsx    # 库存展示
│   ├── CouponCard.tsx       # 优惠券
│   └── ReviewCard.tsx       # 评价展示
└── performance/              # 性能专区（新增）
    ├── VirtualList.tsx      # 虚拟列表
    ├── LazyLoadDemo.tsx     # 懒加载对比
    └── CacheDemo.tsx        # 缓存策略
```

---

## 📦 包依赖管理

### 新增依赖

```json
{
  "dependencies": {
    "vane-lazy-image": "^1.0.0", // 图片懒加载
    "framer-motion": "^10.0.0", // 动画库（可选）
    "@react-three/fiber": "^8.0.0", // 3D 渲染（可选）
    "@react-three/drei": "^9.0.0", // 3D 辅助库（可选）
    "react-intersection-observer": "^9.0.0" // Intersection Observer
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

---

## 🔧 迁移指南

### 从旧 ImagePlugin 迁移到 vane-lazy-image

#### 步骤 1: 安装依赖

```bash
npm install vane-lazy-image
```

#### 步骤 2: 更新代码（向后兼容）

```tsx
// 旧代码（仍然有效）
const Card = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({
      lazyLoad: true,
    }),
  ],
});

// 新代码（启用 vane-lazy-image 高级特性）
const Card = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({
      lazyLoad: true,
      useVaneLazyImage: true, // 显式启用
      placeholderSrc: "/placeholder.jpg",
      fadeInDuration: 500,
      enableZoom: true,
    }),
  ],
});
```

#### 步骤 3: 性能对比测试

```tsx
// 性能测试页面
import { CardCore, createImagePlugin, withPlugins } from "vane-card";

// 原生懒加载
const NativeCard = withPlugins(CardCore, {
  plugins: [createImagePlugin({ useVaneLazyImage: false })],
});

// vane-lazy-image
const VaneCard = withPlugins(CardCore, {
  plugins: [createImagePlugin({ useVaneLazyImage: true })],
});

// 对比渲染
export function PerformanceComparison() {
  return (
    <div>
      <h2>原生懒加载</h2>
      <NativeCard data={product} />

      <h2>vane-lazy-image</h2>
      <VaneCard data={product} />
    </div>
  );
}
```

---

## 📊 预期收益

### 性能提升

- **首屏加载时间**: 减少 30-50%
- **LCP (Largest Contentful Paint)**: 提升 20-40%
- **内存占用**: 大列表场景下降低 40-60%

### 用户体验

- **视觉流畅度**: 淡入动画 + 占位图，无闪烁
- **交互响应**: 手势操作 + 拖拽排序
- **可访问性**: 符合 WCAG 2.1 AA 标准

### 开发效率

- **代码复用**: 插件化架构，功能模块独立
- **类型安全**: 完整的 TypeScript 支持
- **易于维护**: 单一职责原则，便于调试

---

## 🚀 总结

### 核心增强方向

1. **性能优化**: vane-lazy-image + 虚拟化 + 缓存
2. **交互体验**: 手势 + 动画 + 拖拽
3. **电商场景**: 价格 + 库存 + 评价 + 优惠券
4. **媒体增强**: 视频 + 画廊 + 3D
5. **可访问性**: A11y + i18n + 响应式

### 推荐实施路径

```
Phase 1 (立即): vane-lazy-image 集成 + Loading + Review + Responsive
Phase 2 (1 月): Theme + Video + Gallery + Inventory + Share
Phase 3 (2 月): Gesture + Animation + Draggable + A11y + I18n
Phase 4 (3 月): Virtualization + Realtime + Cache + 3D
```

### 关键成功因素

- ✅ 向后兼容（不破坏现有代码）
- ✅ 渐进增强（可选启用新特性）
- ✅ 性能优先（懒加载 + 虚拟化）
- ✅ 类型安全（完整的 TS 定义）
- ✅ 文档完善（示例 + API 文档）
