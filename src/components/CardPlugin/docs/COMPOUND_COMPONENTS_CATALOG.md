# Compound Components Catalog

本文件对 `src/components/CardPlugin/compound/components` 下的复合子组件进行表格化总结，涵盖功能、典型使用、示例页与注意事项，便于快速检索与落地。

> 约定：组件均可通过 `ProductCard.<ComponentName>` 静态挂载使用；数据默认读取 `ProductCard` 的 `data`、`state` 与上下文。

## 快速目录（编号 + 分类）

| 编号 | 组件 | 类别 | 功能概述 | 典型使用/挂载 | 示例页 | 注意事项 |
| --- | --- | --- | --- | --- | --- | --- |
| CC-001 | Section | 结构与分区 | 内容分区标题 | `ProductCard.Section` | `/compound/ecommerce-sku` | 用于结构化分段 |
| CC-002 | Divider | 结构与分区 | 分隔线 | `ProductCard.Divider` | 综合示例 | 注意上下间距统一 |
| CC-003 | Title | UI展示（静态） | 标题 | `ProductCard.Title` | `/compound/ecommerce-sku` | 传入 `children` 可覆盖 |
| CC-004 | Subtitle | UI展示（静态） | 副标题 | `ProductCard.Subtitle` | 综合示例 | 与 `Title` 搭配 |
| CC-005 | Description | UI展示（静态） | 商品描述 | `ProductCard.Description` | `/compound/ecommerce-sku` | 若传入 `children` 则优先 |
| CC-006 | Image | UI展示（静态） | 主图展示 | `ProductCard.Image` | 综合示例 | 存在变体图时考虑 `VariantMediaSwitcher` |
| CC-007 | OldPrice | UI展示（静态） | 原价 | `ProductCard.OldPrice` | 综合示例 | 与 `Price`/`Discount` 搭配 |
| CC-008 | Price | UI展示（静态） | 价格展示 | `ProductCard.Price` | `/compound/ecommerce-sku` | 可读取当前变体价格 |
| CC-009 | Discount | UI展示（静态） | 折扣信息 | `ProductCard.Discount` | 综合示例 | 与价格/旧价搭配 |
| CC-010 | PricePerUnit | UI展示（静态） | 单位价格 | `ProductCard.PricePerUnit` | 综合示例 | 指定度量单位更清晰 |
| CC-011 | Rating | UI展示（静态） | 评分 | `ProductCard.Rating` | 综合示例 | 仅展示文案；可结合评论 |
| CC-012 | Tags | UI展示（静态） | 标签 | `ProductCard.Tags` | `/compound/ecommerce-sku` | 从 `data.tags` 或 `items` 读取 |
| CC-013 | Brand | UI展示（静态） | 品牌信息 | `ProductCard.Brand` | `/compound/ecommerce-sku` | 若无品牌返回 `null` |
| CC-014 | Badge | UI展示（静态） | 单个徽章 | `ProductCard.Badge` | 综合示例 | 与 `BadgeGroup` 组合更灵活 |
| CC-015 | BadgeGroup | UI展示（静态） | 多徽章叠加 | `ProductCard.BadgeGroup` | 综合示例 | 数据源可来自 `data.badges` |
| CC-016 | FeatureList | UI展示（静态） | 卖点列表 | `ProductCard.FeatureList` | 综合示例 | 数据来自 `data.features` 或 `items` |
| CC-017 | SpecsTable | UI展示（静态） | 规格参数表 | `ProductCard.SpecsTable` | 综合示例 | 表格字段来自 `data.specs` |
| CC-018 | Warranty | UI展示（静态） | 质保信息 | `ProductCard.Warranty` | 综合示例 | 文案/链接配置 |
| CC-019 | SKUCode | UI展示（静态） | 货号/条码 | `ProductCard.SKUCode` | `/compound/ecommerce-sku` | 数据来自 `data` 或 `variants` |
| CC-020 | Shipping | UI展示（静态） | 基础配送信息 | `ProductCard.Shipping` | 综合示例 | 静态信息，与估算区分 |
| CC-021 | Inventory | 状态展示（派生） | 库存状态 | `ProductCard.Inventory` | `/compound/ecommerce-sku` | 自动从 `variants/data.inventory` 推断 |
| CC-022 | StockBadge | 状态展示（派生） | 库存徽章 | `ProductCard.StockBadge` | 综合示例 | 支持样式/配色/尺寸/文案 |
| CC-023 | SelectedInfo | 状态展示（派生） | 已选信息摘要 | `ProductCard.SelectedInfo` | 综合示例 | 读取选中属性/数量 |
| CC-024 | SavingsBadge | 状态展示（派生） | 节省金额徽标 | `ProductCard.SavingsBadge` | 综合示例 | 旧价/现价派生数值 |
| CC-025 | VariantSelector | 交互选择（控件） | 多维度 SKU 选择 | `ProductCard.VariantSelector` | 综合示例 | 也可传入 `attributes` |
| CC-026 | ColorSwatches | 交互选择（控件） | 颜色圆点选择 | `ProductCard.ColorSwatches` | 综合示例 | 与 SKU 联动更佳 |
| CC-027 | SizeSelector | 交互选择（控件） | 尺码选择 | `ProductCard.SizeSelector` | 综合示例 | 与 SKU 联动 |
| CC-028 | OptionPicker | 交互选择（控件） | 通用属性选择 | `ProductCard.OptionPicker` | 综合示例 | 同步上下文选项 |
| CC-029 | QuantityStepper | 交互选择（控件） | 数量步进器 | `ProductCard.QuantityStepper` | 综合示例 | 约束最大值于变体库存 |
| CC-030 | VariantMediaSwitcher | 媒体与联动（功能） | 变体主图切换 | `ProductCard.VariantMediaSwitcher` | `/compound/ecommerce-sku` | 缩略图与规格联动 |
| CC-031 | ShippingEstimator | 物流与售后（功能） | 配送费估算 | `ProductCard.ShippingEstimator` | `/compound/ecommerce-sku` | 回调驱动到达时效 |
| CC-032 | DeliveryTimeline | 物流与售后（功能） | 配送到达时间线 | `ProductCard.DeliveryTimeline` | `/compound/ecommerce-sku` | 可与估算联动 |
| CC-033 | ReturnPolicy | 物流与售后（功能） | 售后/退换政策 | `ProductCard.ReturnPolicy` | `/compound/ecommerce-sku` | 支持窗口期/免邮配置 |
| CC-034 | CouponBar | 促销与结算（功能） | 优惠券展示与选择 | `ProductCard.CouponBar` | 综合示例 | 与优惠/价格插件一致性 |
| CC-035 | UpsellBundle | 促销与结算（功能） | 搭配购推荐 | `ProductCard.UpsellBundle` | `/compound/ecommerce-sku` | 组合项与优惠百分比 |
| CC-036 | OrderSummaryPanel | 促销与结算（功能） | 订单摘要 | `ProductCard.OrderSummaryPanel` | 综合示例 | 支持税/运费选项 |
| CC-037 | Actions | 操作与可访问性（增强） | 操作区（购买/收藏等） | `ProductCard.Actions` | 综合示例 | 与插件按钮区协调 |
| CC-038 | A11yToolbar | 操作与可访问性（增强） | 可访问性工具栏 | `ProductCard.A11yToolbar` | `/compound/ecommerce-sku` | 偏好持久化与样式变量协作 |

## 使用建议

- 复合组件用于结构表达，插件用于行为增强；二者可协作但职责清晰。
- 重要联动示例：`ShippingEstimator → DeliveryTimeline` 通过回调传递 `etaDays`；`VariantMediaSwitcher` 根据选中变体更新主图。
- 数据约定：优先读取 `ProductCard` 上下文 `data/variants`；通用组件提供 `props` 覆盖。
- 与插件联动时，优先统一 `PluginBus` 键名（如 `sku.selection/quantity/coupon.applied`）。

## 路由与示例页参考

- 综合示例页：`/compound/ecommerce-sku`
- 其他组件的独立 Demo 若未在导航中列出，可在综合示例页内观察其行为，或在后续迭代中补充到 `src/pages/CardPlugin/compound/*Demo.tsx`。

## 维护与扩展

## 统计汇总

- 总组件数：38
- 按类别统计：
  - 结构与分区：2（CC-001–CC-002）
  - UI展示（静态）：18（CC-003–CC-020）
  - 状态展示（派生）：4（CC-021–CC-024）
  - 交互选择（控件）：5（CC-025–CC-029）
  - 媒体与联动（功能）：1（CC-030）
  - 物流与售后（功能）：3（CC-031–CC-033）
  - 促销与结算（功能）：3（CC-034–CC-036）
  - 操作与可访问性（增强）：2（CC-037–CC-038）

### 分类说明

- UI展示（静态）：主要负责信息呈现，不涉及交互与状态写入。
- 状态展示（派生）：从上下文/数据派生显示（如库存、节省金额），自身不改变业务状态。
- 交互选择（控件）：用于用户输入与选项选择，会更新 `ProductCardContext.state`。
- 媒体与联动（功能）：与变体/选择联动的媒体组件。
- 物流与售后（功能）：提供运费估算、到达时效与售后政策功能。
- 促销与结算（功能）：围绕优惠与订单摘要功能组件。
- 操作与可访问性（增强）：行动入口与可访问性偏好设置。

- 如需新增子组件：在 `compound/components` 中实现并在 `compound/index.ts` 静态挂载与类型导出。
- 如需联动插件：在 `ProductCardContext` 中通过 `plugins` 注入，或使用 `PluginBus` 订阅关键事件。
- 建议为关键组件补充 Storybook/单元测试，覆盖边界条件与交互。

## 示例页重规划建议（分类 → 示例构建）

依据上述分类，对 `src/pages/CardPlugin/compound` 复合组件专区的示例页进行分组与增补规划，便于学习与验证。

- UI展示（静态）
  - 已有：`BasicCompound.tsx`（含部分展示用法）
  - 建议新增：
    - `TitleDemo.tsx`（标题/副标题）→ 路由：`/compound/ui/title`
    - `PriceDemo.tsx`（现价/原价/折扣/单位价）→ 路由：`/compound/ui/price`
    - `MediaAndDescDemo.tsx`（主图/描述/品牌/标签/徽章组/卖点/规格表）→ 路由：`/compound/ui/media-desc`

- 状态展示（派生）
  - 已有：`StockBadgeDemo.tsx`、`SavingsBadgeDemo.tsx`
  - 建议新增：
    - `InventoryDemo.tsx`（库存派生）→ 路由：`/compound/state/inventory`
    - `SelectedInfoDemo.tsx`（已选信息摘要）→ 路由：`/compound/state/selected-info`

- 交互选择（控件）
  - 建议新增：
    - `VariantSelectorDemo.tsx`（多维SKU）→ 路由：`/compound/controls/variant-selector`
    - `ColorSwatchesDemo.tsx`（颜色选择）→ 路由：`/compound/controls/color-swatches`
    - `SizeSelectorDemo.tsx`（尺码选择）→ 路由：`/compound/controls/size-selector`
    - `OptionPickerDemo.tsx`（通用属性）→ 路由：`/compound/controls/option-picker`
    - `QuantityStepperDemo.tsx`（数量步进）→ 路由：`/compound/controls/quantity-stepper`

- 媒体与联动（功能）
  - 已有：`VariantMediaSwitcherDemo.tsx`

- 物流与售后（功能）
  - 已有：`ShippingEstimatorDemo.tsx`、`DeliveryTimelineDemo.tsx`、`ReturnPolicyDemo.tsx`

- 促销与结算（功能）
  - 已有：`CouponBarDemo.tsx`、`UpsellBundleDemo.tsx`、`OrderSummaryDemo.tsx`

- 操作与可访问性（增强）
  - 已有：`A11yToolbarDemo.tsx`
  - 建议新增：
    - `ActionsDemo.tsx`（操作区）→ 路由：`/compound/a11y/actions`

- 布局与综合（场景）
  - 已有：`LeftRightCompound.tsx`、`TopBottomCompound.tsx`、`PluginEnhancedCompound.tsx`、`EcommerceSKUCompound.tsx`

### 分组导航建议（路由与侧边栏）

- 在 `src/App.tsx` 侧边导航中按分类分组：`UI 展示 / 状态展示 / 交互选择 / 媒体联动 / 物流售后 / 促销结算 / 可访问性 / 布局与综合`。
- 路由层级建议统一为：`/compound/<category>/<demo>`，与现有 `/compound/ecommerce-sku` 并存。

### 示例页内容规范

- 每个 Demo 页：引入 `DemoPage` 统一头部说明与小结；使用轻量 `productData`/`variants` 示例，聚焦一个主题组件，必要时添加 1–2 个相关子组件对比。
- 将联动示例集中到综合页（如 `EcommerceSKUCompound.tsx`），避免单页过度复杂。

### 落地步骤（后续实施）

- 更新导航与路由：在 `src/App.tsx` 中新增分组与路径。
- 逐步补齐 Demo 页：先覆盖“交互选择（控件）”与“UI展示（静态）”缺口。
- 在 `COMPOUND_COMPONENTS_CATALOG.md` 中为每个新 Demo 添加行，并标注路由。