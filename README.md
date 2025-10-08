# 🧩 Vane Card · CardPlugin

一个可扩展的电商产品卡组件方案：以「卡片容器 + 插件系统 + 插槽区域」为核心，通过复合组件语法和插件增强能力，快速搭建价格、优惠、比价、库存、物流、可访问性、分析上报等场景。


[![NPM Version](https://img.shields.io/badge/npm-v1.0.9-blue)](https://www.npmjs.com/package/vane-card)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)

[[在线演示](https://chinavane.netlify.app/)]| [路由与页面](#-路由与页面) | [快速开始](#-快速开始) | [插件系统](#-插件系统) | [API 文档](#-api-文档) | [开发指南](#-开发指南)

---

## ✨ 核心特性

### 🔌 插件化架构

- 基于轻量事件总线的插件系统，组合灵活、边界清晰
- 生命周期钩子完整：`onMount` / `onVisibilityChange` / 插槽渲染钩子
- 支持对外扩展与按需加载，提升性能与可维护性

### 💰 统一价格区域（priceArea）

- 使用 `config.order` 控制展示顺序，确保跨插件一致的视觉与语义
- Chip 风格统一：圆角、内边距、间距与色值规范，避免视觉割裂

### 📈 分析与上报

- `AnalyticsPlugin` 提供曝光、可见性、点击、加购等事件上报
- 可配置 `transport`（HTTP/SDK），支持最小曝光阈值与自定义扩展

### ♿ 可访问性与体验

- 提供 `A11yPlugin` 等基础增强能力，保证交互可用与信息可达
- 支持可视化插件（如 `VideoPlugin`）、交互插件（如 `HoverPlugin`）

---

## 📦 安装与本地开发

```bash
npm install
npm run dev
# 构建与预览
npm run build
npm run preview
```

---

## 🚀 快速开始

```tsx
import { CardCore, withPlugins } from "vane-card";
import { createImagePlugin } from "vane-card/custom-plugins/ImagePlugin";
import { createBadgePlugin } from "vane-card/custom-plugins/BadgePlugin";
import { createActionsPlugin } from "vane-card/custom-plugins/ActionsPlugin";

const ProductCard = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({ src: "image.jpg" }),
    createBadgePlugin({ text: "热卖", type: "hot" }),
    createActionsPlugin({ showCartButton: true }),
  ],
});

// 使用卡片
<ProductCard cardId="product-1" data={productData} containerStyle={{ borderRadius: "8px" }} />
```

> 提示：插件按需组合，建议在生产环境中仅引入必要插件，以控制打包体积。

---

## 🧭 路由与页面

应用由 `src/App.tsx` 管理路由，入口 `src/main.tsx` 使用 `HashRouter`。

- 首页：`/`（`src/pages/CardPlugin/Home.tsx`）
- 复合组件：`/compound/*`（结构由复合组件表达，行为由插件增强）
- 布局示例：`/layouts/*`（垂直/横向/右图/下图/背景图/双列等）
- 插槽示例：`/slots/*`（children、Header/Overlay、Footer、Gallery+Video、Responsive）
- 高级示例：`/advanced/*`（动画、分析、倒计时、综合联动）
- README：`/readme`（通过 `ReadmeDemo` 渲染本 README 文档）

---

## 🔌 插件系统

### 生命周期与职责边界

- `onMount(context)`: 插件初始化与总线订阅，返回 `cleanup`
- `onVisibilityChange(context)`: 处理首次曝光和可见性变化
- `renderPriceArea(context)`: 渲染价格区域片段；通过 `config.order` 控制排序

### 统一的 priceArea 排序与风格

- 排序示例：
  - `PriceCalculatorPlugin`：`order: 10`
  - `ComparePricePlugin`：`order: 20`
  - `CouponRecommendPlugin`：`order: 30`
- 风格：统一圆角、浅灰背景、内边距和间距，避免视觉不一致

### 事件总线（Bus）

- 常用事件：`sku:change`、`price:change`
- 订阅与取消：在 `onMount` 中订阅，在 `cleanup` 中释放
- 规则建议：避免短路调用触发 ESLint `no-unused-expressions`，使用显式 `if`

### AnalyticsPlugin 事件上报

- 订阅事件：`sku:change`、`price:change`
- 上报事件：曝光、可见性、点击、加购（可配置 `minExposureMs`）
- 自定义上报：通过 `transport(payload)` 或集成外部 SDK（如 Sentry/自研埋点）

---

## 📚 内置与示例插件（节选）

- `PriceCalculatorPlugin`：计算并展示价格信息（支持多态价格）
- `ComparePricePlugin`：展示对比价与折扣信息
- `CouponPlugin` / `CouponRecommendPlugin`：展示与推荐优惠券
- `InventoryPlugin`：库存状态与售罄提示
- `VideoPlugin`：媒体播放与交互控制
- `A11yPlugin`：可访问性增强
- `ActionsPlugin`：操作区按钮（加购/查看详情）
- `ResponsivePlugin`：响应式行为与样式细节

> 完整列表详见 `src/components/CardPlugin/custom-plugins`。

---

## 🏗️ 目录结构（关键部分）

```
src/
  App.tsx                # 路由与侧边导航
  main.tsx               # 应用入口（HashRouter）
  components/
    CardPlugin/          # 卡片容器与内置插件
      custom-plugins/    # 业务定制插件（价格、优惠、比价、分析等）
  pages/
    CardPlugin/          # 演示页面
      Home.tsx           # 首页（已重构为设计升级版）
      ReadmeDemo.tsx     # README 渲染页
      layouts/*          # 布局示例
      slots/*            # 插槽示例
      advanced/*         # 高级示例
      compound/*         # 复合组件示例
```

---

## 🧩 API 文档

> 以下 API 为常规用法摘要，详细类型请参考源码与注释。

### CardCore（核心容器）

- 负责：状态持有、事件总线、插件生命周期驱动与插槽渲染
- 关键 Props：
  - `cardId: string`：卡片唯一标识
  - `data: Record<string, any>`：业务数据（价格、SKU、库存等）
  - `containerStyle?: React.CSSProperties`：容器样式

### withPlugins（高阶组合）

- 用法：`const ProductCard = withPlugins(CardCore, { plugins: [...] })`
- 作用：组合多个插件并将其生命周期与 UI 输出注入到 `CardCore`

### 插件类型（摘要）

```ts
type PluginContext = {
  cardId: string;
  bus: { on: Function; off: Function; emit: Function };
  refs: Record<string, any>;
  data: Record<string, any>;
  config?: Record<string, any>;
};

type Plugin = {
  name: string;
  config?: { order?: number; [key: string]: any };
  onMount?: (ctx: PluginContext) => () => void;
  onVisibilityChange?: (ctx: PluginContext) => void;
  renderPriceArea?: (ctx: PluginContext) => React.ReactNode;
};
```

---

## 🔧 开发指南

- 代码风格：遵循 ESLint，避免短路表达式触发 `no-unused-expressions`，请使用显式 `if`
- 插件排序：统一使用 `config.order` 控制 `priceArea` 内的展示顺序
- 总线管理：在 `onMount` 订阅，在返回的 `cleanup` 中取消订阅
- 视觉一致性：统一 Chip 风格与间距，避免跨插件视觉跳跃
- 上报策略：为生产环境提供 `transport` 实现（HTTP/SDK），保证可靠与可控

---

## 🧪 测试建议

- 单元测试：
  - 插件排序与 `priceArea` 输出顺序
  - 事件总线订阅与取消（资源泄露检查）
  - `AnalyticsPlugin` 上报触发条件与 payload 结构
- 端到端：核心页面渲染与关键交互路径（加购、SKU 切换等）

---

## 💡 扩展建议

- 增加更多价格相关插件：分期、免息、到站时效
- 物流与售后：运费估算、退换保障、到站时间线
- 深化分析：关联点击流与滚动行为，进行聚合上报与 A/B 测试

---

## 🙏 致谢

- 感谢社区与使用者的反馈，帮助我们持续优化插件架构与体验

---

## 📦 包大小与优化

> 由于 CardPlugin 为演示与组件方案，以下建议偏向“工程策略与模式”。

### 模块大小（示例估算）

| 模块                | 原始大小 | Gzip 后 | 说明                               |
| ------------------- | -------- | ------- | ---------------------------------- |
| 核心容器（CardCore）| ~10 KB   | ~3.5 KB | 状态持有 + 插件生命周期驱动        |
| 插件系统（Bus/HOC） | ~14 KB   | ~4.5 KB | 事件总线 + `withPlugins` 组合      |
| 单个插件            | ~2-6 KB  | ~1-2 KB | 根据功能复杂度不同                 |
| 演示页面集合        | ~120 KB  | ~35 KB  | 仅在 Demo 环境打包                 |

> 提示：生产环境仅引入必要插件与核心容器，演示页面不参与生产打包。

### Tree-Shaking 支持与导入建议

> 原则：尽量使用命名导出与独立模块，避免副作用，确保打包器能静态分析去除未使用代码。

```json
// package.json（建议）
{
  "sideEffects": false,
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/index.es.js",
      "types": "./dist/index.d.ts"
    },
    "./core": {
      "import": "./dist/core.es.js",
      "types": "./dist/core.d.ts"
    },
    "./plugins": {
      "import": "./dist/plugins.es.js",
      "types": "./dist/plugins.d.ts"
    }
  }
}
```

#### ✅ 推荐导入方式（支持 Tree-Shaking）

```tsx
import { CardCore, withPlugins } from "vane-card/core";
import { createPriceCalculatorPlugin } from "vane-card/custom-plugins/PriceCalculatorPlugin";
import { createComparePricePlugin } from "vane-card/custom-plugins/ComparePricePlugin";

const ProductCard = withPlugins(CardCore, {
  plugins: [
    createPriceCalculatorPlugin(),
    createComparePricePlugin(),
  ],
});
```

#### ⚠️ 不推荐的导入方式（可能集成所有插件）

```tsx
// ❌ 不推荐：使用通配导入（示例）
import * as Card from "vane-card";
// 可能引入所有导出，无法充分 Tree-Shaking
```

### 动态导入与代码分割

```tsx
// 按需加载大型或低频插件
import { CardCore, withPlugins } from "vane-card/core";

const basePlugins = [];

async function loadAdvancedPlugins() {
  const [
    { createVideoPlugin },
    { createAnalyticsPlugin },
    { createCouponRecommendPlugin },
  ] = await Promise.all([
    import("vane-card/custom-plugins/VideoPlugin"),
    import("vane-card/custom-plugins/AnalyticsPlugin"),
    import("vane-card/custom-plugins/CouponRecommendPlugin"),
  ]);

  return [
    createVideoPlugin({ autoplay: false }),
    createAnalyticsPlugin({ minExposureMs: 600 }),
    createCouponRecommendPlugin({}),
  ];
}

const ProductCard = withPlugins(CardCore, { plugins: basePlugins });

// 场景触发后再加载
loadAdvancedPlugins().then((plugins) => {
  // 在实际库中，这里可能需要重新组合或使用运行时插件挂载机制
  // Demo 环境可直接在页面层按需切换示例
});
```

### Vite 构建优化

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          card: ["vane-card"],
        },
      },
    },
  },
});
```

### Webpack 构建优化

```js
// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true,
    sideEffects: false,
    splitChunks: {
      cacheGroups: {
        card: {
          test: /[\\/]node_modules[\\/]vane-card[\\/]/,
          name: "card",
          chunks: "all",
        },
      },
    },
  },
};
```

### 打包分析与验证方法

```bash
# Vite 项目
npm run build
npx vite-bundle-visualizer

# 或使用 rollup-plugin-visualizer
npm i -D rollup-plugin-visualizer
```

```ts
// vite.config.ts（可选）
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true, gzipSize: true, brotliSize: true }),
  ],
});
```

---

## 🧱 架构与设计原则

### 分层结构

- 核心容器层：持有状态、驱动插件生命周期、聚合插槽渲染。
- 插件层：实现独立功能，通过 Hook 与总线通信，输出 UI 片段或行为。
- 页面层：根据业务场景组合不同插件并组织布局与导航。

### 职责边界

- 容器不关心具体业务逻辑；插件面向单一职责，避免过度耦合。
- 插槽区域采用显式命名与排序控制，统一视觉与语义。
- 总线事件需定义清晰的语义与负载结构，避免“字符串魔法”。

### 错误处理与健壮性

- 插件在 `onMount` 中订阅事件，并在 `cleanup` 释放资源，避免泄漏。
- 分析与上报建议在生产环境注入 `transport`，保证可靠性与可观测性。
- 对外暴露模块尽量无副作用，确保打包器能正确 Tree-Shaking。

---

## 📚 插件目录

本节按照项目当前真实存在的内容进行梳理，改为“表格形式”列出清单，包含名称、说明与路径，便于查阅与对照代码。

### 现有插件清单（src/components/CardPlugin/custom-plugins）

| 插件名称 | 简要说明 | 入口路径 |
| --- | --- | --- |
| A11yPlugin | 无障碍辅助与键盘导航，提升可访问性 | `src/components/CardPlugin/custom-plugins/A11yPlugin/index.ts` |
| ActionsPlugin | 动作区按钮（购买、收藏、加购）统一行为 | `src/components/CardPlugin/custom-plugins/ActionsPlugin/index.tsx` |
| AnalyticsPlugin | 埋点与曝光/点击事件上报，支持可插拔传输 | `src/components/CardPlugin/custom-plugins/AnalyticsPlugin/index.ts` |
| AnimationPlugin | 卡片动效与过渡，增强交互体验 | `src/components/CardPlugin/custom-plugins/AnimationPlugin/index.ts` |
| BadgePlugin | 角标/标签展示，用于促销标识等 | `src/components/CardPlugin/custom-plugins/BadgePlugin/index.tsx` |
| ComparePricePlugin | 原价对比与折扣显示，展示优惠力度 | `src/components/CardPlugin/custom-plugins/ComparePricePlugin/index.tsx` |
| CountdownPlugin | 倒计时促销组件，适用于限时活动 | `src/components/CardPlugin/custom-plugins/CountdownPlugin/index.tsx` |
| CouponPlugin | 优惠券展示与领取逻辑 | `src/components/CardPlugin/custom-plugins/CouponPlugin/index.tsx` |
| CouponRecommendPlugin | 自动推荐最佳优惠方案 | `src/components/CardPlugin/custom-plugins/CouponRecommendPlugin/index.tsx` |
| GalleryPlugin | 图片画廊与缩略图联动 | `src/components/CardPlugin/custom-plugins/GalleryPlugin/index.tsx` |
| HoverPlugin | 悬停反馈与交互态控制 | `src/components/CardPlugin/custom-plugins/HoverPlugin/index.tsx` |
| ImagePlugin | 主图展示与懒加载 | `src/components/CardPlugin/custom-plugins/ImagePlugin/index.tsx` |
| InventoryPlugin | 库存状态与阈值提醒 | `src/components/CardPlugin/custom-plugins/InventoryPlugin/index.tsx` |
| OrderSummaryPlugin | 订单摘要/结算信息展示 | `src/components/CardPlugin/custom-plugins/OrderSummaryPlugin/index.tsx` |
| PriceCalculatorPlugin | 价格计算与促销规则整合 | `src/components/CardPlugin/custom-plugins/PriceCalculatorPlugin/index.tsx` |
| QuantityPlugin | 数量步进与校验 | `src/components/CardPlugin/custom-plugins/QuantityPlugin/index.tsx` |
| ResponsivePlugin | 响应式布局适配 | `src/components/CardPlugin/custom-plugins/ResponsivePlugin/index.ts` |
| ReviewPlugin | 评分与评论展示 | `src/components/CardPlugin/custom-plugins/ReviewPlugin/index.tsx` |
| SKUPlugin | SKU 编码与规格组合展示 | `src/components/CardPlugin/custom-plugins/SKUPlugin/index.tsx` |
| StatePlugin | 共享状态与事件总线桥接 | `src/components/CardPlugin/custom-plugins/StatePlugin/index.tsx` |
| UserTagPlugin | 用户标签/画像展示 | `src/components/CardPlugin/custom-plugins/UserTagPlugin/index.tsx` |
| VideoPlugin | 商品视频播放 | `src/components/CardPlugin/custom-plugins/VideoPlugin/index.tsx` |

> 注：以上清单来自 `src/components/CardPlugin/custom-plugins/*` 实际目录结构，均已在演示站可用。建议在生产环境中按需引入以控制体积。

### 复合组件清单（src/components/CardPlugin/compound/components）

| 组件名称 | 简要说明 | 组件路径 |
| --- | --- | --- |
| A11yToolbar | 无障碍工具条，辅助键盘/阅读器 | `src/components/CardPlugin/compound/components/A11yToolbar.tsx` |
| Actions | 行为按钮集合（购买、收藏、加购等） | `src/components/CardPlugin/compound/components/Actions.tsx` |
| Badge | 单个标签/角标 | `src/components/CardPlugin/compound/components/Badge.tsx` |
| BadgeGroup | 标签分组显示 | `src/components/CardPlugin/compound/components/BadgeGroup.tsx` |
| Brand | 品牌标识与信息 | `src/components/CardPlugin/compound/components/Brand.tsx` |
| ColorSwatches | 颜色样例选择 | `src/components/CardPlugin/compound/components/ColorSwatches.tsx` |
| CouponBar | 优惠/券信息栏 | `src/components/CardPlugin/compound/components/CouponBar.tsx` |
| DeliveryTimeline | 配送时效/进度 | `src/components/CardPlugin/compound/components/DeliveryTimeline.tsx` |
| Description | 商品文案描述 | `src/components/CardPlugin/compound/components/Description.tsx` |
| Discount | 折扣信息展示 | `src/components/CardPlugin/compound/components/Discount.tsx` |
| Divider | 分隔线 | `src/components/CardPlugin/compound/components/Divider.tsx` |
| FeatureList | 特性/卖点列表 | `src/components/CardPlugin/compound/components/FeatureList.tsx` |
| Image | 商品主图展示 | `src/components/CardPlugin/compound/components/Image.tsx` |
| Inventory | 库存状态 | `src/components/CardPlugin/compound/components/Inventory.tsx` |
| OldPrice | 原价显示 | `src/components/CardPlugin/compound/components/OldPrice.tsx` |
| OptionPicker | 选项选择器（尺码/颜色等） | `src/components/CardPlugin/compound/components/OptionPicker.tsx` |
| OrderSummaryPanel | 订单摘要面板 | `src/components/CardPlugin/compound/components/OrderSummaryPanel.tsx` |
| Price | 当前价格 | `src/components/CardPlugin/compound/components/Price.tsx` |
| PricePerUnit | 单位价格 | `src/components/CardPlugin/compound/components/PricePerUnit.tsx` |
| QuantityStepper | 数量步进器 | `src/components/CardPlugin/compound/components/QuantityStepper.tsx` |
| Rating | 评分展示 | `src/components/CardPlugin/compound/components/Rating.tsx` |
| ReturnPolicy | 退换政策说明 | `src/components/CardPlugin/compound/components/ReturnPolicy.tsx` |
| SKUCode | SKU 编码 | `src/components/CardPlugin/compound/components/SKUCode.tsx` |
| SavingsBadge | 节省金额角标 | `src/components/CardPlugin/compound/components/SavingsBadge.tsx` |
| Section | 区块容器 | `src/components/CardPlugin/compound/components/Section.tsx` |
| SelectedInfo | 已选规格/信息 | `src/components/CardPlugin/compound/components/SelectedInfo.tsx` |
| Shipping | 运费信息 | `src/components/CardPlugin/compound/components/Shipping.tsx` |
| ShippingEstimator | 运费预估 | `src/components/CardPlugin/compound/components/ShippingEstimator.tsx` |
| SizeSelector | 尺寸选择 | `src/components/CardPlugin/compound/components/SizeSelector.tsx` |
| SpecsTable | 参数规格表 | `src/components/CardPlugin/compound/components/SpecsTable.tsx` |
| StockBadge | 库存角标 | `src/components/CardPlugin/compound/components/StockBadge.tsx` |
| Subtitle | 副标题 | `src/components/CardPlugin/compound/components/Subtitle.tsx` |
| Tags | 标签集合 | `src/components/CardPlugin/compound/components/Tags.tsx` |
| Title | 标题 | `src/components/CardPlugin/compound/components/Title.tsx` |
| UpsellBundle | 加购/捆绑推荐 | `src/components/CardPlugin/compound/components/UpsellBundle.tsx` |
| VariantMediaSwitcher | 变体媒体切换 | `src/components/CardPlugin/compound/components/VariantMediaSwitcher.tsx` |
| VariantSelector | 变体选择 | `src/components/CardPlugin/compound/components/VariantSelector.tsx` |
| Warranty | 质保信息 | `src/components/CardPlugin/compound/components/Warranty.tsx` |

> 复合组件入口：`src/components/CardPlugin/compound/ProductCard.tsx`，通过组合上述组件形成完整页面区块，适合作为业务页面的基础拼装单元。

---

## 🎯 组件与 Props 深入

### CardCore 详解

```ts
export interface CardCoreProps<TData = Record<string, any>> {
  cardId: string;
  data: TData;
  containerStyle?: React.CSSProperties;
  className?: string;
  onEvent?: (evt: { type: string; payload?: any }) => void;
}
```

- `cardId`：全局唯一标识，便于事件与分析维度对齐。
- `data`：承载价格、SKU、库存、物流等业务数据。
- `containerStyle`：容器样式，建议仅做轻定制，避免风格割裂。
- `onEvent`：容器级事件回调（可与总线联动）。

### 插件上下文与类型

```ts
export type PluginBus = {
  on: (type: string, handler: Function) => void;
  off: (type: string, handler: Function) => void;
  emit: (type: string, payload?: any) => void;
};

export type PluginContext<TData = Record<string, any>> = {
  cardId: string;
  bus: PluginBus;
  refs: Record<string, any>;
  data: TData;
  config?: Record<string, any>;
  visible?: boolean;
};

export type CardPlugin = {
  name: string;
  config?: { order?: number; [key: string]: any };
  onMount?: (ctx: PluginContext) => () => void;
  onVisibilityChange?: (ctx: PluginContext) => void;
  renderPriceArea?: (ctx: PluginContext) => React.ReactNode;
  renderHeader?: (ctx: PluginContext) => React.ReactNode;
  renderFooter?: (ctx: PluginContext) => React.ReactNode;
  renderOverlay?: (ctx: PluginContext) => React.ReactNode;
};
```

### 插件编写示例

```tsx
// 示例：统一价格 Chip 的风格与排序
export function createComparePricePlugin(config?: { order?: number }) {
  const cfg = { order: 20, ...config };
  return {
    name: "ComparePricePlugin",
    config: cfg,
    renderPriceArea(ctx: PluginContext) {
      const { data } = ctx;
      if (!data?.comparePrice || !data?.price) return null;
      const discount = Math.round(
        ((data.comparePrice - data.price) / data.comparePrice) * 100
      );
      return (
        <span
          style={{
            display: "inline-block",
            borderRadius: 12,
            background: "#f2f3f5",
            padding: "4px 8px",
            marginLeft: 8,
            fontSize: 12,
          }}
        >
          省{discount}%
        </span>
      );
    },
  } as CardPlugin;
}
```

---

## 📐 视觉与风格规范（建议）

### Chip 规范

- 圆角：`12px`
- 字重：`500`
- 颜色：`#111` / 灰层级 `#8f9aa3` / 背景 `#f2f3f5`
- 间距：左右 `8px`，行间 `6px`
- 状态：默认/强调/风险/成功（色板分级）

### 卡片容器

- 阴影：`0 4px 12px rgba(0,0,0,0.08)`
- 悬浮：提升对比度与阴影强度，控制动效时长 `160ms`
- 辅助：平铺视图采用细分隔线，避免视觉拥挤

---


## 🔐 安全与合规（建议）

- 避免在插件中直接进行网络写入操作，统一经 `transport` 或页面层代理。
- 对敏感信息（如用户 ID）进行脱敏与匿名化处理。
- 遵循地区隐私法规（GDPR/CCPA），为上报提供关闭与清除机制。

---

## 🧰 工程实践与规范

- 代码风格：ESLint + Prettier，避免隐式副作用与短路表达式误用。
- 类型：严格启用 TS 检查，插件类型统一导出，便于扩展与维护。
- Commit：采用约定式提交（feat/fix/docs/chore/refactor/test）。

---

## 🗺️ 路线图（Roadmap）

- 增加价格相关插件（分期、免息、价格趋势）
- 增强物流与到站时效展示（区域/天气/节假日）
- 完善分析上报与 A/B 测试支持
- 补充端到端测试与 Bundle 分析脚本

---

## ❓ 常见问题（FAQ）

**Q：如何控制 `priceArea` 的展示顺序？**
- A：在插件的 `config.order` 中设置数值，数值越小越靠前。

**Q：为什么要避免短路表达式？**
- A：在某些 ESLint 配置下会触发 `no-unused-expressions`，建议改为显式 `if` 语句。

**Q：如何实现曝光与可见性上报？**
- A：通过 `AnalyticsPlugin` 订阅 `onVisibilityChange` 与相关总线事件，采用 `transport` 进行上报。

**Q：演示页面是否参与生产构建？**
- A：不建议，生产仅引入核心容器与必要插件，演示路由仅用于本地与文档展示。

**Q：如何引入大型插件而不影响首屏？**
- A：使用动态导入与代码分割，按需在交互触发后加载。

---

## 📝 变更日志（示例占位）

- 1.0.5：首页设计升级与 README 路由；插件系统一致性修复
- 1.0.4：修复 Demo 页面与导航结构；完善 `priceArea` 规范
- 1.0.3：增加分析上报能力与总线事件统一
- 1.0.2：补充示例插件与复合组件演示
- 1.0.1：初始版本与基础路由

---

## 🧾 许可证

- 采用 MIT 许可证，允许商业与二次开发使用。

---

## 👏 致贡献者

- 欢迎通过 Issue/PR 参与讨论与改进，共同完善 CardPlugin 方案与示例库。

---

## 📎 附录 A：示例数据结构

```ts
type PriceData = {
  price: number;
  comparePrice?: number;
  currency?: string;
  installments?: { months: number; interestFree?: boolean };
};

type LogisticsData = {
  region?: string;
  shippingCost?: number;
  etaDays?: number;
};

type ProductData = {
  sku: string;
  title: string;
  images: string[];
  video?: string;
  priceInfo: PriceData;
  logistics?: LogisticsData;
  inventory?: { stock: number; status: "in_stock" | "sold_out" | "low" };
};
```

---

## 📎 附录 B：CSS 主题变量（建议）

```css
:root {
  --card-bg: #fff;
  --card-fg: #111;
  --card-muted: #8f9aa3;
  --card-chip-bg: #f2f3f5;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --card-radius: 12px;
}
```

---

## 📎 附录 C：ESLint 规则建议

```js
// eslint.config.js（片段）
export default [
  {
    rules: {
      "no-unused-expressions": "error",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
```

---

## 📎 附录 D：可访问性细则

- 图片需提供 `alt` 文本或合理占位文案。
- 交互控件具备键盘可达性与焦点样式。
- 颜色对比度满足 WCAG 2.1 AA 标准。

---

## 📎 附录 E：性能预算（建议）

- 首屏 JS：≤ 150KB（Gzip）
- 交互延迟：≤ 100ms（关键点击路径）
- 动效：≤ 200ms（入场/悬浮）

---

## 📎 附录 F：示例代码合集（多场景）

### 1. 基础卡片 + 价格区组合

```tsx
import { CardCore, withPlugins } from "vane-card/core";
import { createPriceCalculatorPlugin } from "vane-card/custom-plugins/PriceCalculatorPlugin";
import { createComparePricePlugin } from "vane-card/custom-plugins/ComparePricePlugin";

const ProductCard = withPlugins(CardCore, {
  plugins: [
    createPriceCalculatorPlugin({ currency: "CNY" }),
    createComparePricePlugin({ showPercent: true }),
  ],
});

export default function BasicPriceDemo() {
  return (
    <ProductCard
      cardId="p-1001"
      data={{ price: 199, comparePrice: 299 }}
      containerStyle={{ width: 320 }}
    />
  );
}
```

### 2. 优惠券推荐 + 分期

```tsx
import { CardCore, withPlugins } from "vane-card/core";
import { createCouponPlugin } from "vane-card/custom-plugins/CouponPlugin";
import { createCouponRecommendPlugin } from "vane-card/custom-plugins/CouponRecommendPlugin";
import { createInstallmentPlugin } from "vane-card/custom-plugins/InstallmentPlugin";

const ProductCard = withPlugins(CardCore, {
  plugins: [
    createCouponPlugin({ maxShown: 2 }),
    createCouponRecommendPlugin({ strategy: "best-discount" }),
    createInstallmentPlugin({ months: [3, 6], interestFree: true }),
  ],
});
```

### 3. 库存 + 到站时效

```tsx
import { CardCore, withPlugins } from "vane-card/core";
import { createInventoryPlugin } from "vane-card/custom-plugins/InventoryPlugin";
import { createLogisticsETAPlugin } from "vane-card/custom-plugins/LogisticsETAPlugin";

const ProductCard = withPlugins(CardCore, {
  plugins: [
    createInventoryPlugin({ lowStockThreshold: 3 }),
    createLogisticsETAPlugin({ riskAware: true }),
  ],
});
```

### 4. 图集 + 视频 + 悬停预取

```tsx
import { CardCore, withPlugins } from "vane-card/core";
import { createGalleryPlugin } from "vane-card/custom-plugins/GalleryPlugin";
import { createVideoPlugin } from "vane-card/custom-plugins/VideoPlugin";
import { createHoverPlugin } from "vane-card/custom-plugins/HoverPlugin";

const ProductCard = withPlugins(CardCore, {
  plugins: [
    createGalleryPlugin(),
    createVideoPlugin({ autoplay: false }),
    createHoverPlugin({ prefetch: true }),
  ],
});
```

### 5. 分析上报（曝光 + 加购）

```tsx
import { CardCore, withPlugins } from "vane-card/core";
import { createAnalyticsPlugin } from "vane-card/custom-plugins/AnalyticsPlugin";

const ProductCard = withPlugins(CardCore, {
  plugins: [
    createAnalyticsPlugin({
      minExposureMs: 800,
      transport: async (payload) => {
        await fetch("/collect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      },
    }),
  ],
});
```

### 6. 稳健性：错误重试与回退

```tsx
import { CardCore, withPlugins } from "vane-card/core";
import { createRetryOnErrorPlugin } from "vane-card/custom-plugins/RetryOnErrorPlugin";
import { createFallbackContentPlugin } from "vane-card/custom-plugins/FallbackContentPlugin";

const ProductCard = withPlugins(CardCore, {
  plugins: [
    createRetryOnErrorPlugin({ maxRetries: 3, retryDelay: 1200 }),
    createFallbackContentPlugin({ label: "稍后再试" }),
  ],
});
```

---

## 📎 附录 G：事件总线事件字典（建议）

- `sku:change`：规格变更
- `price:change`：价格变更
- `coupon:apply`：优惠券应用
- `inventory:low`：库存告警
- `inventory:soldout`：售罄提示
- `logistics:update`：物流信息更新
- `video:play`：视频播放
- `video:pause`：视频暂停
- `gallery:open`：图集打开
- `gallery:close`：图集关闭
- `analytics:exposure`：曝光事件
- `analytics:click`：点击事件
- `analytics:addToCart`：加购事件
- `analytics:visibility`：可见性变化
- `error:occurred`：错误事件
- `fallback:used`：回退启用

> 建议：统一事件负载结构与命名，避免后期维护成本。

---

## 📎 附录 H：主题变量清单（扩展）

```css
:root {
  --card-bg: #fff;
  --card-fg: #111;
  --card-muted: #8f9aa3;
  --card-chip-bg: #f2f3f5;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --card-radius: 12px;
  --card-primary: #2f6fed;
  --card-success: #10b981;
  --card-warning: #f59e0b;
  --card-danger: #ef4444;
  --card-border: #e5e7eb;
  --card-hover-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  --chip-padding-x: 8px;
  --chip-padding-y: 4px;
  --chip-gap: 8px;
  --chip-radius: 12px;
}
```

---

## 📎 附录 I：FAQ 扩展集（部分）

**Q：如何避免插件之间的视觉冲突？**
- A：统一 Chip 风格与间距；在 `order` 控制排序，强调信息靠前。

**Q：插件是否可以跨页面复用？**
- A：可以。插件面向单一职责，组合灵活，建议在不同页面按需引入。

**Q：如何在 SSR 环境使用？**
- A：避免在插件 `onMount` 中直接访问 `window`；将依赖放到可用时机。

**Q：是否支持国际化？**
- A：建议将文案与符号由页面层注入，插件只负责结构与逻辑。

**Q：是否有统一的埋点口径？**
- A：由 `AnalyticsPlugin` 给出基础口径；生产环境可按需扩展 `transport`。

---

## 📎 附录 J：价格策略案例库（参考）

- 案例 1：基础价 + 对比价 + 优惠券叠加 → 显示折扣百分比 Chip
- 案例 2：会员价优先显示，非会员展示“升级会员更优惠”提示
- 案例 3：跨区税费导致总价提升 → Chip 显示“含税”与税额提示
- 案例 4：满减活动与优惠券冲突 → 推荐最优组合并解释“为何选择该券”
- 案例 5：分期免息（3/6/12）选择器 → 显示每期应付与总额
- 案例 6：价格锁定 30 分钟 → 展示倒计时与到期策略
- 案例 7：历史低价提醒 → 当日/近 30 天最低价标记
- 案例 8：渠道订单（批量） → 显示批量价与起订量说明
- 案例 9：兑换币种 → 汇率换算与小数精度控制
- 案例 10：价格保留小数与整数模式切换 → `showCents` 控制
- 案例 11：购物券多层级 → 推荐最优组合并给出节省金额
- 案例 12：抢购秒杀 → 价格闪烁与计时条显示剩余时长
- 案例 13：包邮门槛 → 显示“再购 X 即包邮”的提示
- 案例 14：多仓异价 → 根据仓库位置不同展示对应价格
- 案例 15：售后保障 → Chip 展示“7 天无理由/延保”信息
- 案例 16：教育优惠 → 学生验证后显示优惠价
- 案例 17：企业采购 → 发票与含税价切换提示
- 案例 18：组合优惠 → 套餐总价与单品对比节省
- 案例 19：拼团价 → 人数达标后价格更新与提示
- 案例 20：预售定金 → 定金抵扣规则与尾款提示

---

## 📎 附录 K：上报 Payload 规范示例

```json
{
  "cardId": "p-1001",
  "event": "analytics:addToCart",
  "timestamp": 1712345678901,
  "visibility": {
    "exposed": true,
    "duration": 1234
  },
  "sku": {
    "id": "sku-01",
    "title": "黑色 128G",
    "price": 1999,
    "comparePrice": 2399
  },
  "context": {
    "page": "/product/1001",
    "referrer": "/search?q=phone",
    "sessionId": "abcdefg",
    "user": {
      "loggedIn": true,
      "memberLevel": "gold"
    }
  }
}
```

### 变体示例：曝光事件

```json
{
  "cardId": "p-1001",
  "event": "analytics:exposure",
  "timestamp": 1712345678000,
  "visibility": {
    "exposed": true,
    "duration": 850
  },
  "context": { "page": "/" }
}
```

### 变体示例：点击事件

```json
{
  "cardId": "p-1001",
  "event": "analytics:click",
  "timestamp": 1712345680000,
  "target": {
    "role": "cta",
    "label": "立即购买"
  }
}
```

> 规范建议：
> - 事件命名统一使用 `analytics:*` 前缀（或统一域）。
> - 在生产环境中提供 `transport`，批量与重试策略避免丢数。
> - 附加维度（如页面、来源、会话）统一由页面层注入。

---

## 📎 附录 L：路由与页面映射表（扩展）

| 路由               | 组件文件                                   | 说明                   |
| ------------------ | ------------------------------------------ | ---------------------- |
| `/`                | `pages/CardPlugin/Home.tsx`                | 首页与导览             |
| `/readme`          | `pages/CardPlugin/ReadmeDemo.tsx`          | README 渲染            |
| `/layouts/vertical`| `pages/CardPlugin/layouts/Vertical.tsx`    | 垂直布局               |
| `/layouts/horizontal`| `pages/CardPlugin/layouts/Horizontal.tsx`| 横向布局               |
| `/layouts/right-image`| `pages/CardPlugin/layouts/RightImage.tsx`| 右图布局             |
| `/layouts/bottom-image`| `pages/CardPlugin/layouts/BottomImage.tsx`| 下图布局           |
| `/layouts/bg-image`| `pages/CardPlugin/layouts/BackgroundImage.tsx` | 背景图布局        |
| `/layouts/two-column`| `pages/CardPlugin/layouts/TwoColumn.tsx` | 双列布局               |
| `/slots/header`    | `pages/CardPlugin/slots/HeaderSlotDemo.tsx`| Header 插槽示例        |
| `/slots/footer`    | `pages/CardPlugin/slots/FooterSlotDemo.tsx`| Footer 插槽示例        |
| `/slots/overlay`   | `pages/CardPlugin/slots/OverlaySlotDemo.tsx`| Overlay 插槽示例     |
| `/slots/gallery`   | `pages/CardPlugin/slots/GallerySlotDemo.tsx`| Gallery 插槽示例     |
| `/slots/responsive`| `pages/CardPlugin/slots/ResponsiveSlotDemo.tsx`| 响应式插槽示例    |
| `/advanced/animation`| `pages/CardPlugin/advanced/AnimationDemo.tsx`| 动画示例         |
| `/advanced/analytics`| `pages/CardPlugin/advanced/AnalyticsDemo.tsx`| 分析与上报示例   |
| `/advanced/countdown`| `pages/CardPlugin/advanced/CountdownDemo.tsx`| 倒计时示例       |
| `/advanced/composite`| `pages/CardPlugin/advanced/CompositeDemo.tsx`| 综合联动示例    |

---

## 📎 附录 M：贡献指南（简版）

1. Fork 仓库并创建分支（命名：`feat/*`、`fix/*`、`docs/*`）
2. 按规范编写代码与文档，确保 ESLint/TS 校验通过
3. 提交 PR，并说明改动动机、影响范围与验证方法
4. Review 通过后合并；如涉及 API 变更需同步更新 README 与示例

---

## 📎 附录 N：术语表（Glossary）

- 插槽（Slot）：预留的渲染区域，如 `priceArea`、`Header`、`Footer`。
- 生命周期（Lifecycle）：插件的运行时钩子，如 `onMount`、`onVisibilityChange`。
- 总线（Bus）：插件间通信工具，提供 `on`/`off`/`emit` 能力。
- 上报（Analytics）：采集性能与用户行为并发送到数据平台的过程。
- 熔断（Circuit Breaker）：在错误或风险环境下主动降级与隔离的策略。

---

## 📎 附录 O：FAQ 扩展（更多场景）

**Q：如何在极端低网速下保证关键信息可见？**
- A：采用骨架屏与占位信息；非关键插件延迟加载或动态导入。

**Q：插件之间如何共享上下文数据？**
- A：通过总线或容器 `data` 字段，仅共享必要的只读数据，避免耦合。

**Q：卡片支持哪些插槽？**
- A：推荐 `Header`、`Overlay`、`Footer`、`priceArea` 等；扩展插槽需遵循命名与排序规范。

**Q：如何控制 Chip 的语义层级？**
- A：重要信息使用强调色，次要信息保持浅灰；统一圆角与间距，避免视觉噪音。

**Q：上报失败如何处理？**
- A：提供重试与离线队列（可选），记录错误并在资源空闲时再试；避免阻塞交互。

**Q：是否支持自定义主题？**
- A：建议通过 CSS 变量或主题插件控制；避免在插件内硬编码颜色。

**Q：如何保障可访问性？**
- A：所有交互控件应具备键盘可达性与焦点样式；颜色对比度达标。

**Q：如何集成三方埋点 SDK？**
- A：通过 `transport` 注入或在页面层统一处理，插件仅负责采集与触发。

**Q：如何做单元与集成测试？**
- A：单测覆盖排序与总线；集成测验证组合渲染与交互路径；端到端模拟用户行为。

**Q：如何防止事件名称冲突？**
- A：采用命名空间前缀，如 `analytics:*`、`sku:*`、`price:*`；统一维护字典。

**Q：如何在移动端优化体验？**
- A：控制动效时长与触发阈值；兼顾点击目标大小与误触概率；减少阻塞脚本。

**Q：加载顺序如何安排？**
- A：关键可见信息优先；非关键插件延后或交互触发；必要时使用并发控制。

**Q：如何监控性能问题？**
- A：采集渲染与交互时序；结合网络指标与错误日志；设置性能预算与告警阈值。

**Q：插件之间如何避免重复渲染？**
- A：遵循单一职责；在容器合并输出时做去重；必要时通过标识位控制。

**Q：如何做路由与页面结构的扩展？**
- A：路由表遵循分区与分组原则；演示页面与生产页面分离；统一导航与入口。

**Q：是否支持国际化与货币格式？**
- A：在 `PriceCalculatorPlugin` 提供 `currency` 与 `format`；文案由页面层管理。

**Q：如何统一视觉风格？**
- A：通过主题变量与设计规范；在 README 与示例中提供视觉示例与约束说明。

**Q：如何进行版本迁移？**
- A：提供迁移指南与变更清单；先重构重复实现与短路调用，再统一排序与风格。

---

## 📎 附录 P：示例数据批量列表（片段）

```ts
export const demoProducts = [
  {
    sku: "p-1001",
    title: "旗舰手机 128G",
    images: ["/img/p-1001-1.jpg", "/img/p-1001-2.jpg"],
    priceInfo: { price: 1999, comparePrice: 2399, currency: "CNY" },
    logistics: { region: "华东", shippingCost: 0, etaDays: 2 },
    inventory: { stock: 8, status: "in_stock" },
  },
  {
    sku: "p-1002",
    title: "轻薄笔记本 16G/512G",
    images: ["/img/p-1002-1.jpg"],
    priceInfo: { price: 5999, comparePrice: 6999, currency: "CNY" },
    logistics: { region: "华南", shippingCost: 15, etaDays: 3 },
    inventory: { stock: 2, status: "low" },
  },
  {
    sku: "p-1003",
    title: "真无线耳机",
    images: ["/img/p-1003-1.jpg", "/img/p-1003-2.jpg", "/img/p-1003-3.jpg"],
    priceInfo: { price: 399, comparePrice: 499, currency: "CNY" },
    logistics: { region: "华北", shippingCost: 0, etaDays: 1 },
    inventory: { stock: 0, status: "sold_out" },
  },
  {
    sku: "p-1004",
    title: "电竞显示器 27"",
    images: ["/img/p-1004-1.jpg"],
    priceInfo: { price: 2299, comparePrice: 2699, currency: "CNY" },
    logistics: { region: "西南", shippingCost: 25, etaDays: 5 },
    inventory: { stock: 15, status: "in_stock" },
  },
  {
    sku: "p-1005",
    title: "机械键盘",
    images: ["/img/p-1005-1.jpg", "/img/p-1005-2.jpg"],
    priceInfo: { price: 499, comparePrice: 699, currency: "CNY" },
    logistics: { region: "东北", shippingCost: 12, etaDays: 4 },
    inventory: { stock: 6, status: "in_stock" },
  },
  // ...（更多示例条目）
];
```

---

## 📎 附录 Q：更多实践建议

- 将 `AnalyticsPlugin` 的 `transport` 抽象为接口，便于接入不同埋点平台。
- 为 `priceArea` 定义可复用的 Chip 组件，集中维护风格与状态。
- 引入 `visualizer` 或 Bundle 分析工具，监控依赖与按需导入效果。
- 在演示页面使用 `ReactMarkdown` 渲染 README，保证文档与演示一致性。

---

## 📄 许可证

[MIT License](./LICENSE) © 2025 Frank Vane

---

## 🔗 相关链接

- [GitHub 仓库](https://github.com/frankvane/vane-card)
- [NPM 包](https://www.npmjs.com/package/vane-card)
- [在线演示](https://chinavane.netlify.app/)
- [问题反馈](https://github.com/frankvane/vane-card/issues)
- [更新日志](./CHANGELOG.md)

---

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

如果这个项目对您有帮助，欢迎 ⭐ Star 支持！

---

Made with ❤️ by Frank Vane
