# CardPlugin 示例文档

## 📚 示例概览

CardPlugin 提供了丰富的示例，展示插件化卡片组件的各种使用场景：

| 示例         | 文件               | 说明                                   |
| ------------ | ------------------ | -------------------------------------- |
| **首页**     | `Home.tsx`         | 组件介绍、功能特性、快速导航           |
| **基础示例** | `BasicDemo.tsx`    | 最简单的使用方式，展示数据驱动的插件   |
| **高级示例** | `AdvancedDemo.tsx` | 自定义插件、插件通信、高级交互         |
| **布局示例** | `LayoutDemo.tsx`   | 垂直、横向、大图等不同布局方式         |
| **插槽示例** | `SlotDemo.tsx`     | 通过 children 和插件钩子实现的插槽功能 |

## 🎯 核心概念

### 1. 插件 vs Children

```tsx
// ✅ 插件 - 处理通用的行为和交互
const ProductCard = withPlugins(CardCore, {
  plugins: [
    createImagePlugin(), // 图片渲染
    createBadgePlugin(), // 徽章渲染
    createHoverPlugin(), // 悬停效果
    createStatePlugin(), // 状态管理
    createActionsPlugin(), // 操作按钮
  ],
});

// ✅ Children - 渲染个性化的内容和布局
<ProductCard data={product}>
  <div>{product.name}</div>
  <div>{product.description}</div>
  <div>¥{product.price}</div>
</ProductCard>;
```

### 2. 数据驱动：context.data

插件可以通过 `context.data` 动态读取每个卡片的数据：

```tsx
// 插件实现
const createImagePlugin = (config) => ({
  hooks: {
    renderHeader: (context) => {
      // 优先使用 config，其次从 context.data 读取
      const src = config.src || context.data?.image;
      const alt = config.alt || context.data?.name;
      return <img src={src} alt={alt} />;
    },
  },
});

// 使用时
const ProductCard = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({ lazyLoad: true }), // ✅ 不传 src
  ],
});

<ProductCard data={{ image: "url", name: "商品名" }}>
  {/* 插件自动从 data 读取 */}
</ProductCard>;
```

### 3. 插件组合与配置

不同场景使用不同的插件组合：

```tsx
// 标准卡片（完整功能）
const StandardCard = withPlugins(CardCore, {
  plugins: [
    createImagePlugin(),
    createBadgePlugin(),
    createHoverPlugin(),
    createStatePlugin(),
    createActionsPlugin(),
  ],
});

// 简化卡片（仅交互）
const SimpleCard = withPlugins(CardCore, {
  plugins: [createHoverPlugin(), createStatePlugin()],
});

// 特色卡片（增强效果）
const FeaturedCard = withPlugins(CardCore, {
  plugins: [
    createImagePlugin(),
    createHoverPlugin({ shadowIntensity: "heavy" }),
    createStatePlugin(),
  ],
});
```

## 📖 示例详解

### BasicDemo.tsx - 基础示例

**关键特性：**

- 展示最简单的使用方式
- 演示 `context.data` 数据驱动
- 商品列表的标准渲染

**核心代码：**

```tsx
// 1. 创建组件（只创建一次）
const ProductCard = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({ lazyLoad: true }),
    createBadgePlugin({ position: "top-right" }),
    createHoverPlugin({ enableShadow: true }),
    createStatePlugin({ enableCart: true }),
    createActionsPlugin({ showCartButton: true }),
  ],
});

// 2. 使用组件（传递数据）
{
  products.map((product) => (
    <ProductCard key={product.id} data={product}>
      <div>{product.name}</div>
      <div>¥{product.price}</div>
    </ProductCard>
  ));
}
```

### AdvancedDemo.tsx - 高级示例

**关键特性：**

- 自定义插件开发（动画、统计）
- 插件间通信
- 动态内容（倒计时）
- 自定义操作按钮

**核心代码：**

```tsx
// 自定义插件
const createAnimationPlugin = (): CardPlugin => ({
  name: "AnimationPlugin",
  hooks: {
    onMount: (context) => {
      // 入场动画
      const container = context.getContainer();
      container.style.opacity = "0";
      setTimeout(() => {
        container.style.opacity = "1";
      }, 100);
    },
  },
});

// 组合插件
const AdvancedCard = withPlugins(CardCore, {
  plugins: [
    createAnimationPlugin(),
    createAnalyticsPlugin(),
    createHoverPlugin(),
    createActionsPlugin({
      renderFooter: (context) => (
        <div>
          <button>立即抢购</button>
          <button>分享</button>
        </div>
      ),
    }),
  ],
});
```

### LayoutDemo.tsx - 布局示例

**关键特性：**

- 垂直布局（标准卡片）
- 横向布局（紧凑型）
- 大图布局（特色展示）
- 响应式网格布局

**使用场景：**

- **垂直布局**：商品列表、产品展示
- **横向布局**：列表视图、搜索结果
- **大图布局**：重点推荐、Banner

### SlotDemo.tsx - 插槽示例

**关键特性：**

- Children 插槽（商品信息、描述、促销）
- 插件渲染钩子（图片、徽章、评分）
- 条件插槽（根据数据显示/隐藏）

**插槽类型：**

```tsx
<ProductCard data={product}>
  {/* 商品名称插槽 */}
  <h3>{product.name}</h3>

  {/* 店铺信息插槽（条件渲染） */}
  {product.shop && <div>🏪 {product.shop}</div>}

  {/* 描述插槽 */}
  {product.description && <p>{product.description}</p>}

  {/* 促销信息插槽 */}
  {product.promotion && <div>🎁 {product.promotion}</div>}

  {/* 价格插槽 */}
  <div>¥{product.price}</div>
</ProductCard>
```

## 🎨 设计原则

### 1. 单一职责

- **插件**：专注于特定功能（图片、徽章、状态）
- **Children**：专注于内容渲染

### 2. 组合优于继承

- 通过组合不同插件实现不同功能
- 避免创建过多的组件变体

### 3. 数据驱动

- 插件通过 `context.data` 读取数据
- 配置优先级：`config` > `context.data` > 默认值

### 4. 性能优化

- 组件在外部创建一次，循环中复用
- 避免重复创建组件和插件系统

## 🚀 快速开始

### 1. 最简单的使用

```tsx
import {
  CardCore,
  withPlugins,
  createImagePlugin,
} from "@/components/CardPlugin";

const ProductCard = withPlugins(CardCore, {
  plugins: [createImagePlugin()],
});

<ProductCard data={{ image: "url", name: "商品" }}>
  <div>商品内容</div>
</ProductCard>;
```

### 2. 添加更多插件

```tsx
const ProductCard = withPlugins(CardCore, {
  plugins: [
    createImagePlugin(),
    createBadgePlugin(),
    createHoverPlugin(),
    createStatePlugin(),
    createActionsPlugin(),
  ],
});
```

### 3. 自定义插件

```tsx
const myPlugin: CardPlugin = {
  name: "MyPlugin",
  hooks: {
    onMount: (context) => {
      console.log("Card mounted:", context.cardId);
    },
    renderFooter: (context) => {
      return <div>自定义底部</div>;
    },
  },
};

const ProductCard = withPlugins(CardCore, {
  plugins: [myPlugin, ...otherPlugins],
});
```

## 📝 最佳实践

### ✅ DO

```tsx
// ✅ 在组件外部创建一次
const ProductCard = withPlugins(CardCore, { plugins: [...] });

export function MyComponent() {
  return products.map(p => <ProductCard key={p.id} data={p} />);
}

// ✅ 使用 context.data 传递数据
<ProductCard data={product}>
  <div>{product.name}</div>
</ProductCard>

// ✅ 插件处理通用行为
createHoverPlugin()
createStatePlugin()

// ✅ Children 处理个性化内容
<ProductCard>
  <div>{customContent}</div>
</ProductCard>
```

### ❌ DON'T

```tsx
// ❌ 在循环中创建组件
products.map(p => {
  const Card = withPlugins(CardCore, { plugins: [...] });
  return <Card />;
});

// ❌ 插件中硬编码数据
createImagePlugin({ src: 'fixed.jpg' })

// ❌ Children 中处理通用行为
<ProductCard>
  <div onMouseEnter={...} onMouseLeave={...}>
    {/* 悬停逻辑应该用插件 */}
  </div>
</ProductCard>
```

## 🔗 相关资源

- [CardPlugin 核心文档](../../components/CardPlugin/README.md)
- [插件开发指南](../../components/CardPlugin/plugins/README.md)
- [自定义插件示例](../../components/CardPlugin/custom-plugins/README.md)

## 💡 常见问题

### Q: 什么时候使用插件，什么时候使用 Children？

**A**:

- **插件**：通用的、可复用的行为和交互（悬停、状态、动画）
- **Children**：个性化的、可变的内容和布局（文字、描述、价格）

### Q: 插件如何获取每个卡片的不同数据？

**A**: 通过 `context.data` 读取数据：

```tsx
const createImagePlugin = (config) => ({
  hooks: {
    renderHeader: (context) => {
      const src = context.data?.image;
      return <img src={src} />;
    },
  },
});
```

### Q: 如何自定义插件？

**A**: 创建符合 `CardPlugin` 接口的对象：

```tsx
const myPlugin: CardPlugin = {
  name: "MyPlugin",
  version: "1.0.0",
  hooks: {
    onMount: (context) => {
      /* 初始化逻辑 */
    },
    renderFooter: (context) => <div>自定义内容</div>,
  },
};
```

### Q: 如何调试插件？

**A**: 使用 `enableDebug` 选项：

```tsx
const ProductCard = withPlugins(CardCore, {
  plugins: [...],
  enableDebug: true, // 在控制台输出调试信息
});
```
