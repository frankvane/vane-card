# CardPlugin 架构总览与优化方案

本文件从架构、组件/插件、示例页三个维度梳理项目，并提出可落地的优化建议与新增模块规划，供后续迭代参考。

## 架构总览

- 核心组件：`CardCore`
  - 职责：基础渲染容器，承载 children 与插件渲染钩子。
- 插件系统：`plugins/*`
  - 关键模块：`types.ts`（类型系统）、`PluginBus.ts`（事件/数据总线）、`PluginManager.ts`（插件生命周期）、`withPlugins.tsx`（HOC 注入）。
  - 通信总线能力：`emit/on/once/off`、`getData/setData/deleteData/hasData/getAll/clear`。
- 自定义插件：`custom-plugins/*`
  - 行为增强（例如：图片、徽章、动画、响应式、可访问性、库存、价格、比价、优惠券、SKU、数量）。
- 复合组件：`compound/*`
  - `ProductCard.tsx` 提供 `ProductCardContext`，并聚合子组件（`Image/Title/Price/...`）。
  - `index.ts` 组装静态子组件，导出类型，提升开发者易用性。
- 入口导出：`components/CardPlugin/index.ts`
  - 同时导出核心、插件系统、自定义插件与复合组件。

## 关键关系与数据流

- 复合组件层用于“结构”，插件层用于“行为”。两者渐进增强、互不替代。
- 插件间通过 `PluginBus` 共享数据；建议约定键名命名空间：
  - `sku.selection`（选中规格）、`sku.variant`（匹配变体对象）、`sku.price`（当前变体单价）
  - `coupon.applied`（已应用优惠券对象）
  - `quantity`（购买数量）
- 示例页通过组合多个插件与复合组件子节点，快速构建电商场景。

## 现有模块清单（摘选）

- 自定义插件：`ImagePlugin/BadgePlugin/HoverPlugin/AnimationPlugin/AnalyticsPlugin/CountdownPlugin/ResponsivePlugin/ReviewPlugin/VideoPlugin/GalleryPlugin/InventoryPlugin/A11yPlugin/PriceCalculatorPlugin/ComparePricePlugin/CouponPlugin/UserTagPlugin/SKUPlugin/QuantityPlugin`
- 复合组件子组件：`Image/Title/Price/OldPrice/Discount/Tags/Brand/Subtitle/Rating/Inventory/BadgeGroup/PricePerUnit/QuantityStepper/OptionPicker/ColorSwatches/SizeSelector/VariantSelector/SelectedInfo/Section/Divider/FeatureList/SpecsTable/SKUCode` 等。
- 示例页：`pages/CardPlugin` 下包含布局、插槽、高级与复合组件专区；新增 `compound/EcommerceSKUCompound.tsx` 演示 SKU/价格/比价/优惠券/标签联动。

## 已识别优化机会

1) 类型与约定优化
- 给 `PluginBus` 常用键建立集中类型定义（如 `PluginBusKeys`），避免字符串散落与类型不匹配。
- 插件配置项统一 `Config` 类型风格（默认值、可选项、命名一致性）。
- 在复合组件与插件之间建立轻量桥接（如 `ProductCardContext` 与 `PluginBus` 同步关键数据），增强一致性。
  - ✅ **已落地**：新增 `plugins/BusKeys.ts` 并在 SKU/Quantity/Price/Coupon 插件统一使用；新增订阅工具 `plugins/utils/busHelpers.ts`（为后续桥接铺路）。

2) 性能优化
- 列表场景引入虚拟化插件（`VirtualizationPlugin`）：结合 `IntersectionObserver` 与可视区域渲染，减少 DOM 数量。
- 图片懒加载与占位骨架：在 `ImagePlugin` 增加 `loading=skeleton` 选项或新增 `SkeletonPlugin`。
- 插件钩子渲染分层：减少不必要的重渲染，确保仅当相关 `bus` 键变化时刷新。
  - ✅ **已落地**：在 `QuantityPlugin` 与 `PriceCalculatorPlugin` 中使用定向订阅（仅监听 `sku.variant/sku.price/quantity/coupon.applied`），通过 `forceUpdate` 精准刷新。
  - ✅ **已落地**：当库存为 0 时，`QuantityPlugin` 将数量设为 0 并禁用交互（显示缺货），避免误购。

3) 交互与 UX
- ✅ 数量联动：已实现规格切换时数量重置与上限钳制；新增配置 `resetOnVariantChange`、`clampOnMaxDecrease`（默认启用）。
- ✅ 价格联动：`PriceCalculatorPlugin` 支持显示合计（`showTotalPrice`）；新增 `OrderSummaryPlugin` 展示账单明细（税费/运费可选）。
- ✅ 比价高亮与排序：`ComparePricePlugin` 已增强排序/过滤与低价高亮/差值提示，并联动当前价。
- ✅ 优惠券智能推荐：新增 `CouponRecommendPlugin` 基于 `subtotal` 推荐更优券，支持一键应用与自动应用（可选）。
- 可访问性：补充按钮 `aria-pressed/aria-label`，键盘操作、焦点管理、语义结构优化。

4) 工程与测试
- 添加插件单测（校验钩子与总线交互）、端到端示例快照测试。
- 提供 ESLint/TS 规则对可选链与类型断言的统一校验。

## 新增功能模块规划

1) OrderSummaryPlugin（结算摘要/账单明细）
- 目标：在页脚展示 `单价 × 数量 − 优惠券 = 合计` 的明细行，支持税费/运费扩展。
- 数据来源：`sku.price`、`quantity`、`coupon.applied`，可选：`shipping.fee`、`tax.rate`。
- 配置项示例：`showBreakdown`、`showTax`、`showShipping`、`currency`、`locale`。

2) VirtualizationPlugin（列表虚拟化）
- 目标：大列表卡片性能优化；按可视区域渲染并自动回收。
- 要点：`renderWindowSize`、`overscan`、`onItemVisible` 钩子回调。

3) SkeletonPlugin（骨架屏/占位）
- 目标：在数据/图片加载期间提供占位，减少感知延迟。
- 支持：图像骨架、文本骨架、价格骨架、按钮骨架；样式可配置。

4) IntlPlugin（国际化）
- 目标：统一货币、日期、文案的国际化展示；与价格插件联动 `locale/currency`。

5) ThemePlugin（主题/暗色模式）
- 目标：为卡片提供统一的主题变量与暗色模式切换。
- 方案：CSS 变量 + 插件注入 className，复合组件子节点读取变量。

6) RecommendationPlugin（相关推荐/搭配购）
- 目标：在卡片内部或外部区域展示相关推荐，提升转化；数据由宿主传入。

## 现有组件的改进计划（示例）

- PriceCalculatorPlugin
  - 新增账单明细模式：`showBreakdown`，支持税费/运费显示与可配置项。✅ 已落地（通过 OrderSummaryPlugin 展示）
  - 输出事件：`price:change`（含当前单价/数量/合计），供外部埋点使用。✅ 已落地

- ComparePricePlugin
  - 支持排序与高亮策略：最低价/平台白名单；增加波动标记（涨/跌）。✅ 已落地（排序/过滤/差值提示与联动高亮）

- CouponPlugin
  - 增加“智能选券”功能：根据 `subtotal` 推荐最优券；配置 `autoSuggest`。✅ 已落地（通过 CouponRecommendPlugin 推荐与可选自动应用）

- SKUPlugin
  - 输出事件：`sku:change`（携带 attrs、variant、stock）；与数量插件协作（已实现重置与钳制）。✅ 已落地

- QuantityPlugin
  - 增加配置：`resetOnVariantChange`、`clampOnMaxDecrease`；对输入非法值的防抖与提示。✅ 已落地

- A11yPlugin
  - 完善 ARIA 与键盘操作支持；聚焦环可配置。⏳ 进行中

## 文档规划与维护

- 新增本文档：`ARCHITECTURE_AND_OPTIMIZATION.md`，便于团队快速理解结构与迭代方向。
- 保持 `COMPOUND_COMPONENT_GUIDE.md`、`ENHANCEMENT_PLAN.md` 与示例页 README 的同步更新。
- 在示例页 README 中补充新示例的导航与说明（见下文对 README 的更新）。

## 示例页更新建议

- 在复合组件专区新增/标注电商增强示例（`EcommerceSKUCompound`）：突出总线键与联动行为（SKU/数量/价格/优惠券/库存）。
- 在高级专区加入“自定义账单明细插件”的示例，展示扩展的可插拔性。

---

以上优化与新增模块均为增量改动，保持对现有架构的尊重与最小侵入，可逐步实施并通过示例页验证效果。