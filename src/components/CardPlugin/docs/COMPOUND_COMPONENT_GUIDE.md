# CardPlugin 复合组件模式指南

## 🤔 为什么需要复合组件模式？

### 插件式架构的局限

```tsx
// ❌ 插件式：灵活但冗长
const Card = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({ src: "..." }),
    createBadgePlugin({ text: "热卖", type: "hot" }),
  ],
});

<Card cardId="1" data={product}>
  <div>{product.name}</div>
  <div>¥{product.price}</div>
</Card>;
```

**问题**：

1. 简单场景下过于繁琐
2. 开发者需要了解插件系统
3. 内容结构不够直观

### 复合组件的优势

```tsx
// ✅ 复合组件：直观且易用
<ProductCard productId="1">
  <ProductCard.Image src="..." />
  <ProductCard.Badge type="hot">热卖</ProductCard.Badge>
  <ProductCard.Title>商品名称</ProductCard.Title>
  <ProductCard.Price>¥99</ProductCard.Price>
</ProductCard>
```

**优势**：

1. ✅ 结构清晰，一目了然
2. ✅ 符合 React 开发习惯
3. ✅ 学习成本低
4. ✅ IDE 自动补全友好

---

## 🏗️ 实现方案：双层架构

```
┌─────────────────────────────────────┐
│   复合组件层（Compound Components）   │  ← 易用性优先
├─────────────────────────────────────┤
│      插件系统层（Plugin System）      │  ← 扩展性优先
├─────────────────────────────────────┤
│         核心层（CardCore）           │  ← 纯渲染逻辑
└─────────────────────────────────────┘
```

### 架构设计

```
src/components/CardPlugin/
├── core/
│   └── CardCore.tsx                 # 核心组件
├── plugins/                         # 插件系统
│   ├── types.ts
│   ├── PluginManager.ts
│   └── withPlugins.tsx
├── custom-plugins/                  # 自定义插件
│   ├── ImagePlugin/
│   ├── BadgePlugin/
│   └── ...
├── compound/                        # 复合组件层（新增）
│   ├── ProductCard.tsx              # 主复合组件
│   ├── components/                  # 子组件
│   │   ├── Image.tsx
│   │   ├── Badge.tsx
│   │   ├── Title.tsx
│   │   ├── Price.tsx
│   │   ├── Description.tsx
│   │   └── Actions.tsx
│   └── index.ts
└── index.ts
```

---

## 💻 实现代码

### 1. 创建复合组件主体

```typescript
// src/components/CardPlugin/compound/ProductCard.tsx

import React, { createContext, useContext, useState } from "react";
import { CardCore, withPlugins } from "../index";
import type { CardCoreProps } from "../core/CardCore";

// 上下文：在子组件间共享状态
interface ProductCardContextValue {
  productId: string;
  data?: any;
  state: {
    cart: boolean;
    wishlist: boolean;
  };
  setState: (updates: Partial<{ cart: boolean; wishlist: boolean }>) => void;
}

const ProductCardContext = createContext<ProductCardContextValue | null>(null);

// Hook：子组件访问上下文
export function useProductCard() {
  const context = useContext(ProductCardContext);
  if (!context) {
    throw new Error("ProductCard.* components must be used within ProductCard");
  }
  return context;
}

// 主组件
export interface ProductCardProps extends Partial<CardCoreProps> {
  productId: string;
  children: React.ReactNode;
  onCartChange?: (productId: string, added: boolean) => void;
  onWishlistChange?: (productId: string, wishlisted: boolean) => void;
  // 可选：允许传入插件
  plugins?: any[];
}

export const ProductCard: React.FC<ProductCardProps> & {
  Image: typeof Image;
  Badge: typeof Badge;
  Title: typeof Title;
  Price: typeof Price;
  Description: typeof Description;
  Actions: typeof Actions;
  Section: typeof Section;
} = ({
  productId,
  children,
  onCartChange,
  onWishlistChange,
  plugins = [],
  ...props
}) => {
  const [state, setState] = useState({ cart: false, wishlist: false });

  // 状态变化回调
  const handleStateChange = (updates: Partial<typeof state>) => {
    setState((prev) => {
      const next = { ...prev, ...updates };

      // 触发回调
      if (updates.cart !== undefined && onCartChange) {
        onCartChange(productId, next.cart);
      }
      if (updates.wishlist !== undefined && onWishlistChange) {
        onWishlistChange(productId, next.wishlist);
      }

      return next;
    });
  };

  // 上下文值
  const contextValue: ProductCardContextValue = {
    productId,
    data: props.data,
    state,
    setState: handleStateChange,
  };

  // 如果提供了插件，使用插件增强的卡片
  const Card =
    plugins.length > 0 ? withPlugins(CardCore, { plugins }) : CardCore;

  return (
    <ProductCardContext.Provider value={contextValue}>
      <Card
        cardId={productId}
        {...props}
        containerStyle={{
          background: "#fff",
          borderRadius: "8px",
          border: "1px solid #eee",
          overflow: "hidden",
          ...props.containerStyle,
        }}
      >
        {children}
      </Card>
    </ProductCardContext.Provider>
  );
};

// 导出类型
export default ProductCard;
```

### 2. 创建子组件

```typescript
// src/components/CardPlugin/compound/components/Image.tsx

import React from "react";

export interface ImageProps {
  src: string;
  alt?: string;
  lazyLoad?: boolean;
  style?: React.CSSProperties;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt = "商品图片",
  lazyLoad = true,
  style,
}) => {
  return (
    <div style={{ width: "100%", aspectRatio: "1/1", overflow: "hidden" }}>
      <img
        src={src}
        alt={alt}
        loading={lazyLoad ? "lazy" : "eager"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          ...style,
        }}
      />
    </div>
  );
};
```

```typescript
// src/components/CardPlugin/compound/components/Badge.tsx

import React from "react";

export interface BadgeProps {
  type?: "premium" | "hot" | "new" | "sale" | "default";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const colors = {
  premium: "#9C27B0",
  hot: "#FF5722",
  new: "#4CAF50",
  sale: "#F44336",
  default: "#757575",
};

const positions = {
  "top-left": { top: 8, left: 8 },
  "top-right": { top: 8, right: 8 },
  "bottom-left": { bottom: 8, left: 8 },
  "bottom-right": { bottom: 8, right: 8 },
};

export const Badge: React.FC<BadgeProps> = ({
  type = "default",
  position = "top-right",
  children,
  style,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        padding: "4px 12px",
        background: colors[type],
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
        borderRadius: 4,
        zIndex: 10,
        ...positions[position],
        ...style,
      }}
    >
      {children}
    </div>
  );
};
```

```typescript
// src/components/CardPlugin/compound/components/Title.tsx

import React from "react";

export interface TitleProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Title: React.FC<TitleProps> = ({ children, style }) => {
  return (
    <h3
      style={{
        margin: "0 0 8px 0",
        fontSize: 16,
        fontWeight: 600,
        color: "#333",
        ...style,
      }}
    >
      {children}
    </h3>
  );
};
```

```typescript
// src/components/CardPlugin/compound/components/Price.tsx

import React from "react";

export interface PriceProps {
  children: React.ReactNode;
  originalPrice?: string | number;
  discount?: string | number;
  style?: React.CSSProperties;
}

export const Price: React.FC<PriceProps> = ({
  children,
  originalPrice,
  discount,
  style,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, ...style }}>
      <span
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#e53935",
        }}
      >
        {children}
      </span>
      {originalPrice && (
        <span
          style={{
            fontSize: 14,
            color: "#999",
            textDecoration: "line-through",
          }}
        >
          {originalPrice}
        </span>
      )}
      {discount && (
        <span
          style={{
            padding: "2px 8px",
            background: "#FF5722",
            color: "#fff",
            fontSize: 12,
            borderRadius: 4,
          }}
        >
          {discount}
        </span>
      )}
    </div>
  );
};
```

```typescript
// src/components/CardPlugin/compound/components/Description.tsx

import React from "react";

export interface DescriptionProps {
  children: React.ReactNode;
  lines?: number; // 限制行数
  style?: React.CSSProperties;
}

export const Description: React.FC<DescriptionProps> = ({
  children,
  lines,
  style,
}) => {
  const lineClampStyle = lines
    ? {
        display: "-webkit-box",
        WebkitLineClamp: lines,
        WebkitBoxOrient: "vertical" as const,
        overflow: "hidden",
      }
    : {};

  return (
    <p
      style={{
        margin: "0 0 8px 0",
        fontSize: 13,
        color: "#666",
        lineHeight: 1.5,
        ...lineClampStyle,
        ...style,
      }}
    >
      {children}
    </p>
  );
};
```

```typescript
// src/components/CardPlugin/compound/components/Actions.tsx

import React from "react";
import { useProductCard } from "../ProductCard";

export interface ActionsProps {
  showCart?: boolean;
  showWishlist?: boolean;
  cartLabel?: { add: string; remove: string };
  wishlistLabel?: { add: string; remove: string };
  style?: React.CSSProperties;
}

export const Actions: React.FC<ActionsProps> = ({
  showCart = true,
  showWishlist = true,
  cartLabel = { add: "加入购物车", remove: "移出购物车" },
  wishlistLabel = { add: "加入心愿单", remove: "移出心愿单" },
  style,
}) => {
  const { state, setState } = useProductCard();

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        padding: "12px 16px",
        borderTop: "1px solid #eee",
        ...style,
      }}
    >
      {showCart && (
        <button
          onClick={() => setState({ cart: !state.cart })}
          style={{
            flex: 1,
            padding: 10,
            background: state.cart ? "#4CAF50" : "#fff",
            color: state.cart ? "#fff" : "#333",
            border: "1px solid #ddd",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          {state.cart ? cartLabel.remove : cartLabel.add}
        </button>
      )}
      {showWishlist && (
        <button
          onClick={() => setState({ wishlist: !state.wishlist })}
          style={{
            flex: 1,
            padding: 10,
            background: state.wishlist ? "#e91e63" : "#fff",
            color: state.wishlist ? "#fff" : "#333",
            border: "1px solid #ddd",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          {state.wishlist ? wishlistLabel.remove : wishlistLabel.add}
        </button>
      )}
    </div>
  );
};
```

```typescript
// src/components/CardPlugin/compound/components/Section.tsx

import React from "react";

export interface SectionProps {
  name?: string; // 可选的语义化名称
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Section: React.FC<SectionProps> = ({ children, style }) => {
  return <div style={style}>{children}</div>;
};
```

### 3. 组装复合组件

```typescript
// src/components/CardPlugin/compound/index.ts

import { ProductCard as ProductCardMain } from "./ProductCard";
import { Image } from "./components/Image";
import { Badge } from "./components/Badge";
import { Title } from "./components/Title";
import { Price } from "./components/Price";
import { Description } from "./components/Description";
import { Actions } from "./components/Actions";
import { Section } from "./components/Section";

// 组装复合组件
ProductCardMain.Image = Image;
ProductCardMain.Badge = Badge;
ProductCardMain.Title = Title;
ProductCardMain.Price = Price;
ProductCardMain.Description = Description;
ProductCardMain.Actions = Actions;
ProductCardMain.Section = Section;

export const ProductCard = ProductCardMain;

// 导出类型
export type { ProductCardProps } from "./ProductCard";
export type { ImageProps } from "./components/Image";
export type { BadgeProps } from "./components/Badge";
export type { TitleProps } from "./components/Title";
export type { PriceProps } from "./components/Price";
export type { DescriptionProps } from "./components/Description";
export type { ActionsProps } from "./components/Actions";
export type { SectionProps } from "./components/Section";
```

### 4. 导出复合组件

```typescript
// src/components/CardPlugin/index.ts

// 核心导出
export { default as CardCore } from "./core/CardCore";
export type { CardCoreProps, CardCoreRef } from "./core/CardCore";

// 插件系统
export type {
  CardPlugin,
  CardPluginContext,
  CardPluginHooks,
  // ...
} from "./plugins";
export { withPlugins } from "./plugins";

// 自定义插件
export * from "./custom-plugins";

// ===== 复合组件（新增）=====
export { ProductCard } from "./compound";
export type {
  ProductCardProps,
  ImageProps,
  BadgeProps,
  TitleProps,
  PriceProps,
  DescriptionProps,
  ActionsProps,
  SectionProps,
} from "./compound";
```

---

## 📖 使用指南

### 场景 1：简单用法（复合组件）

```tsx
import { ProductCard } from "vane-card";

function SimpleExample() {
  return (
    <ProductCard
      productId="1"
      onCartChange={(id, added) => console.log(id, added)}
    >
      <ProductCard.Image src="https://example.com/product.jpg" alt="商品" />
      <ProductCard.Badge type="hot">热卖</ProductCard.Badge>

      <div style={{ padding: 16 }}>
        <ProductCard.Title>高端运动鞋</ProductCard.Title>
        <ProductCard.Description lines={2}>
          舒适透气，适合长跑和日常穿着
        </ProductCard.Description>
        <ProductCard.Price originalPrice="¥699" discount="5折">
          ¥349
        </ProductCard.Price>
      </div>

      <ProductCard.Actions />
    </ProductCard>
  );
}
```

### 场景 2：复合组件 + 插件增强

```tsx
import {
  ProductCard,
  createHoverPlugin,
  createAnimationPlugin,
} from "vane-card";

function EnhancedExample() {
  return (
    <ProductCard
      productId="2"
      // 注入插件增强
      plugins={[
        createHoverPlugin({ enableShadow: true }),
        createAnimationPlugin(),
      ]}
    >
      <ProductCard.Image src="..." />
      <ProductCard.Badge type="premium">甄选</ProductCard.Badge>
      <div style={{ padding: 16 }}>
        <ProductCard.Title>智能手表</ProductCard.Title>
        <ProductCard.Price>¥2999</ProductCard.Price>
      </div>
      <ProductCard.Actions />
    </ProductCard>
  );
}
```

### 场景 3：纯插件式（高级定制）

```tsx
import {
  CardCore,
  withPlugins,
  createImagePlugin,
  createBadgePlugin,
  createCountdownPlugin,
} from "vane-card";

// 完全自定义的插件组合
const CustomCard = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({ lazyLoad: true }),
    createBadgePlugin({ position: "top-left" }),
    createCountdownPlugin({ durationMs: 3600000 }),
    // 自定义插件
    {
      name: "CustomPlugin",
      hooks: {
        onClick: (context) => {
          console.log("Custom behavior");
        },
      },
    },
  ],
});

function AdvancedExample() {
  return (
    <CustomCard cardId="3" data={product}>
      {/* 完全自定义内容 */}
      <div className="custom-layout">...</div>
    </CustomCard>
  );
}
```

---

## 🎯 使用场景建议

| 场景                | 推荐方式                  | 理由                         |
| ------------------- | ------------------------- | ---------------------------- |
| 📱 快速开发商品卡片 | **复合组件**              | 开发快、代码少、易维护       |
| 🎨 标准电商场景     | **复合组件 + 基础插件**   | 平衡易用性和扩展性           |
| 🔧 需要特殊交互     | **复合组件 + 自定义插件** | 保持结构清晰 + 行为定制      |
| 🚀 完全自定义行为   | **纯插件式**              | 最大灵活性                   |
| 📚 组件库开发者     | **纯插件式**              | 底层控制，构建自己的复合组件 |

---

## 💡 设计原则

### 1. 关注点分离

```
复合组件（ProductCard.*）  →  负责"内容结构"
插件系统（Plugins）        →  负责"行为逻辑"
核心组件（CardCore）       →  负责"渲染基础"
```

### 2. 渐进增强

```tsx
// Level 1: 最简单
<ProductCard productId="1">
  <ProductCard.Image src="..." />
  <ProductCard.Title>商品</ProductCard.Title>
</ProductCard>

// Level 2: 添加插件
<ProductCard productId="1" plugins={[createHoverPlugin()]}>
  ...
</ProductCard>

// Level 3: 完全自定义
const Card = withPlugins(CardCore, { plugins: [...] });
<Card>...</Card>
```

### 3. 向后兼容

```tsx
// ✅ 旧的插件式代码仍然有效
const OldWay = withPlugins(CardCore, {
  plugins: [createImagePlugin()],
});

// ✅ 新的复合组件方式也可用
<ProductCard>
  <ProductCard.Image />
</ProductCard>

// ✅ 两者可以混用
<ProductCard plugins={[createHoverPlugin()]}>
  <ProductCard.Image />
</ProductCard>
```

---

## 🔄 迁移策略

### 从旧 ProductCard 迁移

```tsx
// 旧代码（原 ProductCard）
import ProductCard from "@/components/ProductCard";

<ProductCard productId="1" layout="vertical">
  <ProductCard.Image src="..." />
  <ProductCard.Badge type="premium">甄选</ProductCard.Badge>
  <ProductCard.Title>商品</ProductCard.Title>
  <ProductCard.Price>¥99</ProductCard.Price>
</ProductCard>;

// ↓↓↓ 迁移到新架构 ↓↓↓

// 新代码（CardPlugin 复合组件）
import { ProductCard } from "vane-card";

<ProductCard productId="1">
  <ProductCard.Image src="..." />
  <ProductCard.Badge type="premium">甄选</ProductCard.Badge>
  <div style={{ padding: 16 }}>
    <ProductCard.Title>商品</ProductCard.Title>
    <ProductCard.Price>¥99</ProductCard.Price>
  </div>
</ProductCard>;
```

**变化点**：

- ✅ API 几乎一致
- ✅ `layout` prop 移除（通过 CSS/children 控制）
- ✅ 需要手动添加 padding 容器（更灵活）

---

## 📊 性能考虑

### 复合组件不会影响性能

```tsx
// ❌ 错误理解：担心创建多个 React 元素
<ProductCard>
  <ProductCard.Image />
  <ProductCard.Title />
  <ProductCard.Price />
</ProductCard>

// ✅ 实际：这些都是轻量级的函数组件，性能开销可忽略
```

### 插件系统的性能优化

```tsx
// ✅ 插件实例只创建一次
const Card = withPlugins(CardCore, {
  plugins: [createImagePlugin()], // ← 只执行一次
});

// ✅ 循环中复用
products.map((p) => (
  <Card key={p.id} data={p}>
    ...
  </Card>
));
```

---

## 🎨 最佳实践

### 1. 简单场景用复合组件

```tsx
// ✅ 推荐：清晰直观
<ProductCard productId="1">
  <ProductCard.Image src="..." />
  <ProductCard.Title>商品</ProductCard.Title>
</ProductCard>
```

### 2. 需要行为增强时添加插件

```tsx
// ✅ 推荐：结构 + 行为分离
<ProductCard
  productId="1"
  plugins={[createHoverPlugin(), createAnalyticsPlugin()]}
>
  <ProductCard.Image src="..." />
  <ProductCard.Title>商品</ProductCard.Title>
</ProductCard>
```

### 3. 复杂交互用纯插件式

```tsx
// ✅ 推荐：完全控制
const Card = withPlugins(CardCore, {
  plugins: [createCustomPlugin(), createAdvancedPlugin()],
});

<Card cardId="1" data={product}>
  <CustomLayout />
</Card>;
```

---

## 🚀 总结

### 两种模式的定位

| 特性         | 复合组件模式 | 插件式架构    |
| ------------ | ------------ | ------------- |
| **目标用户** | 业务开发者   | 框架/库开发者 |
| **学习成本** | 低（5 分钟） | 中（30 分钟） |
| **代码量**   | 少           | 较多          |
| **灵活性**   | 中           | 高            |
| **适用场景** | 80% 常规需求 | 20% 定制需求  |

### 推荐策略

```
┌─────────────────────────────────────────────┐
│                                             │
│  ProductCard 复合组件（易用性）              │  ← 80% 用户
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  ProductCard + Plugins（平衡）              │  ← 15% 用户
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  纯插件式 withPlugins（灵活性）             │  ← 5% 用户
│                                             │
└─────────────────────────────────────────────┘
```

**结论**：

- ✅ **保留插件系统**（底层能力）
- ✅ **新增复合组件**（上层易用性）
- ✅ **两者互补，不冲突**
- ✅ **用户可根据需求选择**
