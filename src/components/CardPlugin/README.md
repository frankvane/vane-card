# CardPlugin - 插件式卡片组件系统

## 📖 概述

CardPlugin 是将原有的 ProductCard 组件升级为插件式架构的全新卡片组件系统。它参考了 WaterfallPlugin 的设计理念，通过插件化的方式实现功能模块化、易扩展、易维护。

## 🎯 架构设计

### 核心架构

```
CardPlugin/
├── core/
│   └── CardCore.tsx          # 核心卡片组件（纯渲染逻辑）
├── plugins/
│   ├── types.ts              # 插件类型定义
│   ├── PluginManager.ts      # 插件管理器
│   ├── PluginBus.ts          # 插件通信总线
│   ├── withPlugins.tsx       # HOC 组合器
│   └── index.ts              # 插件系统导出
├── custom-plugins/
│   ├── ImagePlugin/          # 图片处理插件
│   ├── StatePlugin/          # 状态管理插件
│   ├── ActionsPlugin/        # 操作按钮插件
│   ├── BadgePlugin/          # 徽章插件
│   ├── HoverPlugin/          # 悬停效果插件
│   └── index.ts              # 插件统一导出
└── index.ts                  # 主入口
```

### 设计原则

1. **核心简单** - CardCore 只负责基础渲染，不包含任何业务逻辑
2. **插件扩展** - 所有功能通过插件实现，按需组合
3. **类型安全** - 完整的 TypeScript 类型定义
4. **生命周期** - 提供完整的生命周期钩子
5. **插件通信** - 通过 PluginBus 实现插件间通信

## 🚀 快速开始

### 基础用法

```tsx
import {
  CardCore,
  withPlugins,
  createImagePlugin,
  createBadgePlugin,
  createActionsPlugin,
} from "vane-card";

// 创建带插件的卡片组件
const ProductCard = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({
      src: "https://example.com/image.jpg",
      alt: "商品图片",
      lazyLoad: true,
    }),
    createBadgePlugin({
      text: "热卖",
      type: "hot",
      position: "top-right",
    }),
    createActionsPlugin({
      showCartButton: true,
      showWishlistButton: true,
    }),
  ],
  enableDebug: false,
});

// 使用卡片
function App() {
  return (
    <ProductCard
      cardId="product-1"
      data={productData}
      containerStyle={{
        background: "#fff",
        borderRadius: "8px",
        border: "1px solid #eee",
      }}
    >
      <div style={{ padding: "16px" }}>
        <h3>商品名称</h3>
        <p>¥99.00</p>
      </div>
    </ProductCard>
  );
}
```

## 📦 内置插件

### 1. ImagePlugin - 图片处理插件

处理商品图片展示，支持懒加载。

```tsx
createImagePlugin({
  src: "image.jpg",
  alt: "商品图片",
  lazyLoad: true,
  placeholder: <div>加载中...</div>,
  errorFallback: <div>加载失败</div>,
});
```

### 2. BadgePlugin - 徽章插件

显示商品徽章（热卖、新品、甄选等）。

```tsx
createBadgePlugin({
  text: "热卖",
  type: "hot", // 'premium' | 'hot' | 'new' | 'sale' | 'default'
  position: "top-right",
  customStyle: {},
});
```

### 3. StatePlugin - 状态管理插件

管理购物车和心愿单状态。

```tsx
createStatePlugin({
  enableCart: true,
  enableWishlist: true,
  onCartChange: (cardId, isAdded) => {
    console.log("购物车状态变化", cardId, isAdded);
  },
  onWishlistChange: (cardId, isWishlisted) => {
    console.log("心愿单状态变化", cardId, isWishlisted);
  },
});
```

### 4. ActionsPlugin - 操作按钮插件

渲染购物车、心愿单等操作按钮。

```tsx
createActionsPlugin({
  showCartButton: true,
  showWishlistButton: true,
  cartButtonText: { add: "加入购物车", remove: "移出购物车" },
  wishlistButtonText: { add: "加入心愿单", remove: "移出心愿单" },
  renderCustomActions: (context) => {
    // 自定义渲染
    return <div>自定义按钮</div>;
  },
});
```

### 5. HoverPlugin - 悬停效果插件

卡片悬停时的视觉反馈。

```tsx
createHoverPlugin({
  enableShadow: true,
  enableScale: true,
  enableBorder: false,
  shadowIntensity: "medium", // 'light' | 'medium' | 'heavy'
  scaleRatio: 1.02,
});
```

## 🛠️ 自定义插件

### 创建自定义插件

```tsx
import type { CardPlugin } from "vane-card";

// 1. 定义插件
const createMyPlugin = (config?: MyPluginConfig): CardPlugin => ({
  name: "MyPlugin",
  version: "1.0.0",
  description: "我的自定义插件",
  priority: 50, // 优先级，数字越大越先执行

  hooks: {
    // 挂载时触发
    onMount: (context) => {
      console.log("插件挂载", context.cardId);
    },

    // 点击时触发
    onClick: (context, event) => {
      console.log("卡片被点击", context.cardId);
    },

    // 悬停时触发
    onHover: (context, isHovered) => {
      console.log("悬停状态", isHovered);
    },

    // 渲染覆盖层
    renderOverlay: (context) => {
      return <div style={{ position: "absolute" }}>覆盖层</div>;
    },

    // 转换 Props
    transformProps: (props) => {
      return {
        ...props,
        containerStyle: {
          ...props.containerStyle,
          border: "2px solid red",
        },
      };
    },
  },

  config,
});

// 2. 使用插件
const MyCard = withPlugins(CardCore, {
  plugins: [createMyPlugin()],
});
```

### 可用的生命周期钩子

```typescript
interface CardPluginHooks<T = any> {
  // 生命周期
  onMount?: (context) => void | (() => void);
  onUnmount?: (context) => void;
  onPropsChange?: (context, prevProps, nextProps) => void;

  // 交互
  onClick?: (context, event) => void;
  onHover?: (context, isHovered) => void;
  onVisibilityChange?: (context, isVisible) => void;

  // 状态
  onCartChange?: (context, isAdded) => void;
  onWishlistChange?: (context, isWishlisted) => void;
  onStateChange?: (context, prevState, nextState) => void;

  // 尺寸
  onResize?: (context, width, height) => void;

  // 数据
  onBeforeDataChange?: (context, oldData, newData) => boolean;
  onDataChange?: (context, oldData, newData) => void;

  // 错误
  onError?: (context, error, errorInfo) => void;

  // 渲染
  renderContainer?: (context, children) => React.ReactNode;
  renderContentWrapper?: (context, children) => React.ReactNode;
  renderOverlay?: (context) => React.ReactNode;
  renderHeader?: (context) => React.ReactNode;
  renderFooter?: (context) => React.ReactNode;
  renderBadge?: (context) => React.ReactNode;
  renderActions?: (context) => React.ReactNode;

  // 转换
  transformProps?: (props) => props;
  transformData?: (context, data) => data;
}
```

### 插件上下文

插件钩子中可以访问完整的上下文信息：

```typescript
interface CardPluginContext<T = any> {
  // 基础数据
  cardId: string;
  data?: T;

  // DOM 引用
  containerRef: React.RefObject<HTMLDivElement | null>;
  getContainer: () => HTMLDivElement | null;

  // 状态
  state: CardState;
  setState: (updates: Partial<CardState>) => void;

  // 尺寸
  size: CardSize;

  // 配置
  props: CardCoreProps<T>;

  // 插件通信
  bus?: PluginBus;
  sharedData?: Map<string, any>;

  // 设备信息
  deviceInfo?: DeviceInfo;

  // 工具方法
  forceUpdate: () => void;
  getSize: () => CardSize;
}
```

## 🔄 从 ProductCard 迁移

### 原有方式

```tsx
// 原有的 ProductCard
import ProductCard from "@/components/ProductCard";

<ProductCard productId="1001" layout="vertical">
  <ProductCard.Image src="image.jpg" />
  <ProductCard.Badge type="premium">甄选</ProductCard.Badge>
  <ProductCard.Title>商品标题</ProductCard.Title>
  <ProductCard.Price>¥99.00</ProductCard.Price>
</ProductCard>;
```

### 插件式方式

```tsx
// 新的 CardPlugin
import {
  CardCore,
  withPlugins,
  createImagePlugin,
  createBadgePlugin,
} from "vane-card";

const ProductCard = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({ src: "image.jpg" }),
    createBadgePlugin({ text: "甄选", type: "premium" }),
  ],
});

<ProductCard cardId="1001" layout="vertical">
  <div style={{ padding: "16px" }}>
    <h3>商品标题</h3>
    <p>¥99.00</p>
  </div>
</ProductCard>;
```

## 🎨 高级用法

### 插件通信

通过 PluginBus 实现插件间通信：

```tsx
const PluginA: CardPlugin = {
  name: "PluginA",
  hooks: {
    onMount: (context) => {
      // 发送事件
      context.bus?.emit("custom:event", { data: "hello" });

      // 设置共享数据
      context.bus?.setData("shared:key", "value");
    },
  },
};

const PluginB: CardPlugin = {
  name: "PluginB",
  hooks: {
    onMount: (context) => {
      // 监听事件
      const unsubscribe = context.bus?.on("custom:event", (data) => {
        console.log("收到事件", data);
      });

      // 获取共享数据
      const value = context.bus?.getData("shared:key");

      return () => {
        unsubscribe?.();
      };
    },
  },
};
```

### 插件依赖

声明插件依赖关系：

```tsx
const DependentPlugin: CardPlugin = {
  name: "DependentPlugin",
  dependencies: ["StatePlugin"], // 依赖 StatePlugin
  hooks: {
    onMount: (context) => {
      // 可以安全使用 StatePlugin 提供的功能
    },
  },
};
```

### 插件优先级

通过 priority 控制插件执行顺序（数字越大越先执行）：

```tsx
const HighPriorityPlugin: CardPlugin = {
  name: "HighPriorityPlugin",
  priority: 100,
  // ...
};

const LowPriorityPlugin: CardPlugin = {
  name: "LowPriorityPlugin",
  priority: 10,
  // ...
};
```

## 📚 示例

查看 `src/pages/CardPlugin/` 目录下的示例：

- **BasicDemo.tsx** - 基础用法示例
- **AdvancedDemo.tsx** - 高级功能示例（自定义插件、插件通信等）

## 🔍 对比

### 插件式架构 vs 传统组件

| 特性     | 传统组件           | 插件式架构       |
| -------- | ------------------ | ---------------- |
| 功能扩展 | 需要修改组件代码   | 新增插件即可     |
| 代码维护 | 功能耦合，难以维护 | 模块化，易于维护 |
| 功能组合 | 固定功能组合       | 灵活组合插件     |
| 类型安全 | 部分类型支持       | 完整的类型定义   |
| 通信方式 | Props drilling     | PluginBus 通信   |
| 生命周期 | 有限的钩子         | 完整的钩子系统   |

## 🎯 最佳实践

1. **插件单一职责** - 每个插件只负责一个功能
2. **合理使用优先级** - 根据插件执行顺序设置优先级
3. **声明依赖关系** - 明确插件间的依赖
4. **使用 TypeScript** - 充分利用类型系统
5. **插件可配置** - 通过 config 参数提供配置选项
6. **清理副作用** - 在 onUnmount 或返回清理函数

## 📝 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
