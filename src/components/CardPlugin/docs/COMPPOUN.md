






toolName: search_codebase

status: success

query: Locate and summarize current exports and content of CardPlugin index file and CardCore. Confirm whether compound folder exists and how withPlugins exports are structured.




toolName: todo_write

status: success

Todos updated: 4 items




toolName: search_codebase

status: success

query: Confirm whether CardCore has defined header/footer/overlay slot render points or props. Search for CardCore.tsx to understand current slot responsibilities.




toolName: search_codebase

status: success

query: Check pages/CardPlugin to see existing demos and where to add a new demo page for compound mode; list files under pages/CardPlugin.

**改造目标**
- 在保持现有插件架构不变的前提下，引入“复合组件（Compound Components）”操作模式，面向业务开发者提供更直观、低门槛的用法，同时与插件系统无缝协作。

**新增目录结构**
- `src/components/CardPlugin/compound/`
  - `ProductCard.tsx`（主复合组件，封装上下文与状态）
  - `components/Image.tsx`（图片子组件）
  - `components/Badge.tsx`（徽章子组件）
  - `components/Title.tsx`（标题子组件）
  - `components/Price.tsx`（价格子组件）
  - `components/Description.tsx`（描述子组件）
  - `components/Actions.tsx`（操作按钮子组件，内置简单状态联动）
  - `components/Section.tsx`（通用内容分区）
  - `index.ts`（组装并导出 `ProductCard` 以及子组件类型）

**需要新增的文件与内容要点**
- `src/components/CardPlugin/compound/ProductCard.tsx`
  - 封装 `ProductCardContext`（`productId`、`data`、`state.cart/wishlist`、`setState`）。
  - 支持 `plugins?: CardPlugin[]`，有插件时内部通过 `withPlugins(CardCore, { plugins })` 包装。
  - 传递 `cardId=productId` 给 `CardCore`，并应用默认容器样式（可通过 `containerStyle` 覆盖）。
- `src/components/CardPlugin/compound/components/*`
  - 每个子组件仅负责结构与样式，不含通用行为逻辑（行为由插件处理）。
  - `Actions.tsx` 使用 `useProductCard()` 读写 `cart/wishlist` 状态，演示最小交互闭环。
- `src/components/CardPlugin/compound/index.ts`
  - 组装 `ProductCard` 复合组件：挂载 `Image/Badge/Title/Price/Description/Actions/Section`。
  - 导出组装好的 `ProductCard` 及各子组件的类型。

**需要修改的现有文件**
- `src/components/CardPlugin/index.ts`
  - 保持现有导出不变（`CardCore`、`withPlugins`、插件与类型导出）。
  - 新增导出：`export { ProductCard } from "./compound";` 以及对应类型导出（`ProductCardProps`, `ImageProps`, `BadgeProps`, `TitleProps`, `PriceProps`, `DescriptionProps`, `ActionsProps`, `SectionProps`）。
- `src/components/CardPlugin/core/CardCore.tsx`
  - 无需重构；已具备 `children` 渲染与 `renderContent(data, context)` 能力，可直接承载复合组件子节点。
  - 若希望更明确的插槽边界，可在文档中约定：图片区（header）、内容区（content）、底部区（footer）、覆盖层（overlay）通过插件钩子渲染；复合组件子节点默认落在 `children` 区域。
- `src/components/CardPlugin/plugins/withPlugins.tsx`
  - 无需修改即可工作。可选增强（非必需）：后续可在 HOC 内部提供 React Context Hook（`useCard`/`useCardBus`/`useCardSlot`）以便复合组件子节点访问插件上下文与将插件渲染结果聚合到指定 slot（本文仅记录为规划，不纳入本次改造）。
- `src/components/CardPlugin/README.md`
  - 增补“复合组件模式”章节：对比插件式 vs 复合组件；新增使用示例；强调两者可混用。
- `src/components/CardPlugin/COMPOUND_COMPONENT_GUIDE.md`
  - 将指南中的示例与目录结构落地为上述新增文件；标注“向后兼容策略”和“何时选用复合组件”的实践建议。
- `src/pages/CardPlugin/README.md`
  - 在示例概览中加入“复合组件示例”一项；增补示例入口（文件列表中新增 `CompoundDemo.tsx` 或在现有 `BasicDemo.tsx` 中增加一节）。

**示例页新增（建议）**
- `src/pages/CardPlugin/CompoundDemo.tsx`（或将一段示例加入 `BasicDemo.tsx`）
  - 引入：`import { ProductCard } from "../../components/CardPlugin";`
  - 演示最小用法与“复合组件 + 插件增强”的混用：
    - 基本用法：`<ProductCard.Image/> <ProductCard.Title/> <ProductCard.Price/> <ProductCard.Actions/>`
    - 增强用法：`<ProductCard plugins={[createHoverPlugin(), createAnimationPlugin()]}>...</ProductCard>`

**插件钩子与插槽映射（文档约定，不改代码）**
- `header` → `renderHeader`
- `footer` → `renderFooter`
- `overlay` → `renderOverlay`
- `badge` → `renderBadge`
- `actions` → `renderActions`
- `contentWrapper` → `renderContentWrapper`
- 约定：复合组件子节点默认渲染于 `children`。如需将子节点与插件输出合并到指定插槽，后续可通过可选增强的 `useCardSlot(slotName)` 完成（本次不改动）。

**迁移与兼容建议**
- 保持旧代码有效：`withPlugins(CardCore, { plugins: [...] })` 不受影响。
- 新增复合组件用法：业务代码可用 `ProductCard.*` 快速搭结构；当需要行为增强时，给 `ProductCard` 传 `plugins` 即可。
- 渐进迁移：先以新增页面/模块方式试点复合组件，不改动现有高级示例；待新模式稳定后在文档中引导迁移。

**测试与验收建议**
- 用现有示例页的布局/插槽/高级场景在新 `CompoundDemo.tsx` 中各写一个最小例，确保：
  - 复合组件基本渲染无报错；
  - 传入 `plugins` 时，悬停、统计、动画等行为生效；
  - 与 `CardCore` 的 `children` 协同正常（内容正确显示）。
- 运行开发环境：`npm run dev`，在示例导航页添加到“复合组件示例”的入口以便手动回归。

**后续可选增强（不纳入本次改造）**
- 在 `withPlugins` 内提供 Context Hooks（`useCard`/`useCardBus`/`useCardSlot`），复合组件子节点可更灵活访问插件上下文与聚合渲染。
- 增加 `VaneLazyImagePlugin` 或在 `ImagePlugin` 中整合 `vane-lazy-image`，供复合组件的图片子组件按需切换。

**总结**
- 本次改造以“新增目录与文件 + 入口导出补齐 + 文档与示例扩展”为主，不动现有插件管理与生命周期执行逻辑。复合组件承担“结构与内容表达”，插件继续承担“通用行为与装饰”，两者可在同一组件中自然协作，实现易用与扩展性的兼顾。


我已快速审阅现有复合子组件，基于当前实现提出可扩展的子组件清单，按功能分类，避免重复并覆盖常见电商场景。
**已扩展子组件**

- 数据展示：`SpecsTable`（规格参数表）、`FeatureList`（卖点列表）、`SKUCode`（货号/条码）、`BadgeGroup`（多徽章叠加）、`PricePerUnit`（单价/每100g）。

- 交互选择：`ColorSwatches`（颜色圆点选择）、`SizeSelector`（尺码选择）、`VariantSelector`（多维度SKU选择）、`QuantityStepper`（数量步进器）、`OptionPicker`（通用属性选择）。

**可扩展方向**


- 价格与促销：`Savings`（节省金额：旧价-现价）、`CouponEntry`（优惠券输入/选择）、`Installments`（分期信息）、`LimitedTime`（限时文案条）、`Countdown`（倒计时）。
- 物流与服务：`DeliveryETA`（预计到达时间）、`StorePickup`（自提点信息）、`FreeShippingBadge`（包邮标识）、`ReturnPolicy`（退换政策）、`ServiceIcons`（客服/维修/上门等）。
- 信任与社交：`SellerInfo`（商家信息）、`GuaranteeMarks`（正品/发票/极速退）、`RatingBreakdown`（评分分布）、`ReviewSnippet`（精选评价摘要）、`ShareButtons`（分享入口）。
- 布局与结构：`Grid`（网格区块）、`Columns`（多列容器）、`Stack`（纵向间距容器）、`Spacer`（占位间隔）、`MediaObject`（图文并排预设）。
- 状态与占位：`Skeleton`（加载骨架）、`ErrorState`（错误占位）、`EmptyState`（空态）、`LoadingSpinner`（局部加载）。
- 媒体增强：`ImageCarousel`（图片轮播）、`Video`（商品视频）、`LazyImage`（懒加载+失败回退）、`Overlay`（图片遮罩层）。

**设计准则**
- 统一模式：从 `ProductCard` 上下文读取数据，支持 props 覆盖；无数据时优雅降级。
- 低耦合：只负责自身渲染与交互，布局由页面容器控制（如 `flex/grid`）。
- 轻状态：需要跨子组件联动时，扩展 `ProductCard.state` 与 `setState`（如 `VariantSelector`、`QuantityStepper`）。
- 样式简约：提供 `className/style`，避免强绑定主题；必要时暴露关键小型样式钩子。

**优先实现建议（可立刻开工）**
- `QuantityStepper`：增减数量并写入 `state.cart[productId]`。
- `ColorSwatches` + `SizeSelector`：选择SKU属性，写入 `state` 并驱动价格/库存联动。
- `FeatureList`：卖点条目（图标+文案），用于 TopBottom/LeftRight 布局丰富信息区。
- `Countdown`：促销倒计时，结束后自动切换到普通状态。

如果你认可，我可以先在 `compound/components` 中实现以上 3–4 个组件，并在 `BasicCompound` 或 `LeftRightCompound` 中加入演示，保持与现有模式一致。
