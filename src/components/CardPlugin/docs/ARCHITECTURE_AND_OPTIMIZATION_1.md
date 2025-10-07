






toolName: view_folder

status: success

e:\vane-card\src\components\CardPlugin\compound




toolName: search_codebase

status: success

query: List available custom plugins and their primary responsibilities to identify modification points and new plugin opportunities.




toolName: search_codebase

status: success

query: List current compound component files to assess sub-component structure and identify expansion points.




toolName: search_codebase

status: success

query: Scan architecture doc to align enhancement plan terminology and ensure consistency with documented plugin states and future work.




toolName: todo_write

status: success

Todos updated: 4 items

以下是针对 `e:\vane-card\src` 的增强方案，围绕复合组件子组件扩展、现有插件的修改点与新增插件清单，已排除图片处理（后续将集成 `vane-lazy-image`）。

**总体思路**
- 强化复合组件 `compound/*` 的“结构表达”，让更多信息与交互以子组件呈现。
- 现有行为插件沿用 `PluginBus` 联动，统一键名与事件输出，提升一致性与可维护性。
- 新增插件遵循“低耦合、可插拔”，以 `applyDefaults` 管理配置，优先与现有 BusKeys 对齐。

**可新增子组件**
- 价格与结算相关
  - `OrderSummaryPanel`：账单明细面板（合计、税费、运费、优惠券），读取 `sku.price/quantity/coupon.applied`。
  - `SavingsBadge`：节省金额/折扣百分比徽章，辅助 `Discount` 展示。
- 规格与库存相关
  - `StockBadge`：低库存/售罄提示徽章，读取当前变体库存。
  - `VariantMediaSwitcher`：按规格切换主图/视频，与 `SKUCode/VariantSelector`联动。
- 配送与保障相关
  - `ShippingEstimator`：配送费与到达时效简版显示，读取/写入 `shipping.fee`。
  - `DeliveryTimeline`：预计发货/收货时间时间线。
  - `ReturnPolicy`：退换政策简要说明，与 `Warranty`互补。
- 促销与优惠相关
  - `CouponBar`：顶部优惠信息条（最佳券、满减提示），与 `CouponRecommendPlugin`呼应。
  - `UpsellBundle`：搭配购/组合包展示，支持“加入组合”操作。
- 交互与可访问性
  - `A11yToolbar`：页面快捷键/对比度切换/焦点提示开关，与 `A11yPlugin`协作。
  - `URLSyncIndicator`：当前选择状态是否已同步到 URL 的提示。

参考现有子组件目录：`e:\vane-card\src\components\CardPlugin\compound\index.ts` 已包含 `QuantityStepper/VariantSelector/SelectedInfo/Inventory/...`，上述新增保持相同风格与上下文 `useProductCard`。

**现有插件的修改点**
- `PriceCalculatorPlugin`
  - 增强配置：`roundingMode`、`taxInclusive`、`discountStacking`；与 `OrderSummaryPlugin` 数据结构对齐。
  - 事件：扩展 `price:change` 载荷（含 breakdown、currency、locale）。
- `OrderSummaryPlugin`
  - 支持 `shippingFee/taxRate` 外源注入；新增 `formatLineItem` 自定义行格式化。
  - 新增总线键：`order.breakdown`（小计/税费/运费/合计）。
- `ComparePricePlugin`
  - 增加 `cacheTTL` 与数据来源抽象适配器；支持“平台白名单”与“价差波动图”。
- `CouponPlugin` 与 `CouponRecommendPlugin`
  - 券校验与互斥规则（满减阈值、白名单品类）；`autoApplyBest` 增加“仅提示最佳券”模式。
  - 总线键扩展：`coupon.suggested`（推荐券）、`coupon.applied`（已应用券）。
- `SKUPlugin`
  - 不可用选项禁用策略；支持 `URLSyncPlugin` 同步 `sku.selection` 到 URL 查询参数。
  - 图片联动：暴露 `variant.image` 到总线，供 `VariantMediaSwitcher` 使用。
- `QuantityPlugin`
  - 已实现输入防抖与校验提示；提升：参数化 `inputDebounceMs/showValidationHint`，与复合组件 `QuantityStepper` 对齐。
  - 新增事件：`quantity:change`（含来源 `button|input`）。
- `A11yPlugin`
  - 完善 `aria-*` 标签与键盘导航；对 `ActionsPlugin/VariantSelector/QuantityStepper` 提供焦点管理接口。
- 其他插件
  - `ResponsivePlugin`：布局断点与容器样式统一配置；与复合组件容器 `containerStyle` 协调。
  - `AnalyticsPlugin`：统一埋点事件命名，如 `sku:change/price:change/quantity:change/coupon:apply`。

图片处理暂不开发：`ImagePlugin` 保持现状；后续以 `VaneLazyImagePlugin` 或增强版 `ImagePlugin` 接入 `vane-lazy-image`（参考文档方案），当前不纳入本阶段。

**新增插件清单**
- 结算与价格
  - `TaxPlugin`：税费计算，提供 `tax.rate/tax.amount`，与 `OrderSummaryPlugin` 联动。
  - `ShippingPlugin`：配送费用估算，输出 `shipping.fee/shipping.method`。
  - `LoyaltyPlugin`：积分/会员价显示，输出 `loyalty.points` 与抵扣方案。
- 选择与联动
  - `URLSyncPlugin`：将 `sku.selection/quantity/coupon.applied` 同步到 URL；支持回显。
  - `BundlePlugin`：组合包/加购，输出 `bundle.items/bundle.total`。
- 推荐与促销
  - `RecommendationPlugin`：相关推荐（与 `UserTagPlugin` 联动）；支持“搭配购”。
  - `PriceAlertPlugin`：价格提醒（订阅 `price:change`），仅前端提示与埋点，不含推送服务。
- 可用性与工程
  - `DebugBusInspectorPlugin`：在开发模式下展示当前总线数据、事件流。
  - `IntlPlugin`：统一 `currency/locale`，为价格/日期/文案提供格式化。

**PluginBus 键与事件建议**
- 键名（新增/扩展）
  - `sku.selection`、`sku.variant`、`sku.price`（已用，继续沿用）
  - `quantity`、`coupon.applied`、`coupon.suggested`
  - `order.breakdown`、`shipping.fee`、`tax.rate`、`tax.amount`、`loyalty.points`
- 事件
  - `sku:change`、`quantity:change`、`price:change`、`coupon:apply`、`coupon:suggest`、`order:update`

**实施优先级与路径**
- P0（当月落地）
  - 子组件：`OrderSummaryPanel/StockBadge/CouponBar`（与现有插件强联动，价值高）。
  - 插件：`TaxPlugin/ShippingPlugin/URLSyncPlugin`（为账单与可分享性铺路）。
- P1（1–2 个月）
  - 子组件：`VariantMediaSwitcher/DeliveryTimeline/A11yToolbar`。
  - 插件：`LoyaltyPlugin/RecommendationPlugin`。
- P2（后续）
  - 子组件：`UpsellBundle/ReturnPolicy/SavingsBadge`。
  - 插件：`PriceAlertPlugin/DebugBusInspectorPlugin/IntlPlugin`。

**落地建议**
- 在 `pages/CardPlugin/compound/EcommerceSKUCompound.tsx` 先接入 `OrderSummaryPanel/StockBadge/CouponBar`，对齐总线键。
- 为每个新增插件补充最小示例与文档，更新 `ARCHITECTURE_AND_OPTIMIZATION.md` 与示例页 README。
- 统一配置默认值通过 `applyDefaults`，并在 `custom-plugins/index.ts` 完成导出与类型补充。

如需，我可以先在 `compound/components` 中实现 2–3 个子组件（例如 `OrderSummaryPanel/StockBadge/CouponBar`），并为 `TaxPlugin/ShippingPlugin/URLSyncPlugin` 提供脚手架代码，随后在复合示例页接入验证。

---

## 批次实现总结与状态标注（2025-10）

本批次已完成以下复合子组件与示例页集成，并在开发环境通过预览验证：

- 复合子组件（ProductCard 静态挂载）
  - `VariantMediaSwitcher`（规格切换主图） — [已完成]
  - `ShippingEstimator`（配送费估算） — [已完成]
  - `DeliveryTimeline`（配送时间线） — [已完成]
  - `ReturnPolicy`（退换政策） — [已完成]
  - `UpsellBundle`（搭配购） — [已完成]
  - `A11yToolbar`（可访问性工具栏） — [已完成]

- 示例页与路由
  - 新增演示页：`compound/VariantMediaSwitcherDemo`、`ShippingEstimatorDemo`、`DeliveryTimelineDemo`、`ReturnPolicyDemo`、`UpsellBundleDemo`、`A11yToolbarDemo` — [已完成]
  - 更新入口导航与路由：`src/App.tsx` — [已完成]
  - 综合示例页增强：`compound/EcommerceSKUCompound` 集成上述子组件，完成 ETA 联动（`ShippingEstimator → DeliveryTimeline`）— [已完成]

- 修复与工程
  - 修复 `ShippingEstimatorDemo.tsx` JSX 字符转义问题（`>` → `&gt;`）— [已完成]

### 与本文档计划项的对应标注

- 可新增子组件（状态）：
  - `OrderSummaryPanel` — [计划中]
  - `SavingsBadge` — [计划中]
  - `StockBadge` — [计划中]
  - `VariantMediaSwitcher` — [已完成]
  - `ShippingEstimator` — [已完成]
  - `DeliveryTimeline` — [已完成]
  - `ReturnPolicy` — [已完成]
  - `CouponBar` — [计划中]
  - `UpsellBundle` — [已完成]
  - `A11yToolbar` — [已完成]
  - `URLSyncIndicator` — [计划中]

- 实施优先级与路径：
  - P1 子组件 `VariantMediaSwitcher/DeliveryTimeline/A11yToolbar` — [已完成]
  - P2 子组件 `UpsellBundle/ReturnPolicy/SavingsBadge` — 其中 `UpsellBundle/ReturnPolicy` [已完成]，`SavingsBadge` [计划中]

### 后续行动建议

- 接入真实业务数据（配送费/时效、退换政策、搭配购），替换示例常量。
- 为 `A11yToolbar` 偏好添加本地存储持久化与初始化恢复。
- 在 `EcommerceSKUCompound` 中补充 `OrderSummaryPanel/StockBadge/CouponBar` 的集成，统一与插件总线键对齐。
- 增加单元测试与 Storybook 文档，覆盖关键交互与演示用例。
