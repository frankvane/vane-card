下面是一份插件扩展规划文档，结合现有复合组件与插件体系，明确下一步可扩展内容与落地方式。

状态清单（已处理/待办）
- [x] 梳理现有插件钩子与复合组件插槽映射
- [x] 提出可扩展插件方向与分类并列出清单
- [x] 定义插件接口契约与数据约束示例
- [x] 给出性能与打包策略建议
- [x] 制定测试与质量保障方案
- [x] 规划里程碑与优先级
- [x] 提供插件注册与渲染示例用法

- [ ] 在 `types.ts` 增加 `renderPriceArea` 等新插槽类型定义（向后兼容）
- [ ] 在 `Price`、`CouponBar`、`OrderSummaryPanel` 中预留插槽容器（不影响旧用法）
- [ ] 实现核心电商插件：`PriceCalculatorPlugin`、`InventoryPlugin`、`SKUPlugin`、`QuantityPlugin`
- [ ] 建立集成测试场景与性能基线（曝光/交互/懒加载策略）
- [ ] 完善开发者文档与插件模板（子路径导出与树摇指南）

阶段计划（Next Steps）
- M1（本周）：
  - 在 `types.ts` 增加 `renderPriceArea` 类型与可选插槽定义
  - 更新 `Price`、`CouponBar`、`OrderSummaryPanel` 以容纳价格区扩展输出
  - 提供示例插件骨架与最小演示（注册、渲染、清理副作用）

- M2（下周）：
  - 交付核心电商插件：价格计算、库存、SKU、数量
  - 为价格区输出 `SavingsBadge`、对比价、可领券提示的组合渲染
  - 建立单元测试覆盖 `transformProps` 与生命周期钩子

- M3：
  - 导购与个性化：评价摘要、Upsell（`UpsellBundle`）、用户标签
  - 行为埋点与曝光跟踪，打通 `AnalyticsPlugin`

- M4：
  - 分析与 A/B 测试、性能计时与曝光追踪的完善
  - 媒体类插件的懒加载与降级策略优化（Gallery/Video）

- M5：
  - 国际化与 A11y 完善（文案/单位格式、ARIA 属性、键盘可达性）
  - 开发者插件模板与文档打磨（子路径导出、按需加载、树摇最佳实践）

**目标与原则**
- 保持与现有 `CardPlugin` HOC/插件管理器兼容，避免破坏现有插件。
- 以“插槽清晰、数据契约明确、性能可控”为核心，扩展新插件。
- 同时满足两类用法：命名导出实现真树摇、复合语法 `<ProductCardNS.* />` 实现按需加载与良好体验。

**架构概览**
- 关键文件：`withPlugins.tsx`、`PluginManager.ts`、`types.ts`、`CardCore.tsx`。
- 插件生命周期：`onMount`、`onUnmount`、`onPropsChange`、`onResize`、`onError` 等。
- 渲染插槽：`renderHeader`、`renderFooter`、`renderOverlay`、`renderBadge`、`renderActions`、`renderContentWrapper`、`renderContainer`。
- 属性变换：`transformProps` 用于在渲染前聚合或修饰 `ProductCard` 的 props。

**插槽与复合组件映射（建议）**
- 头部/标题相关：`Title.tsx`、`Subtitle.tsx` → `renderHeader`（支持标题增强、打标、评分）。
- 价格/优惠相关：`Price.tsx`（存在）/`SavingsBadge.tsx`、`CouponBar.tsx`、`OrderSummaryPanel.tsx` → `renderContentWrapper` 或专用 `renderPriceArea`（建议新增）。
- 行为区：`Actions.tsx`（存在）/`QuantityStepper.tsx`、`OptionPicker.tsx`、`ColorSwatches.tsx` → `renderActions`。
- 信息/装饰：`Badge.tsx`、`BadgeGroup.tsx`、`StockBadge.tsx`、`Tags.tsx`、`Rating.tsx`、`FeatureList.tsx` → `renderBadge` 或 `renderFooter`（根据布局）。
- 促销/导购：`UpsellBundle.tsx` → `renderFooter`（卡片底部推荐或追加购买）。
- 覆盖层：视频/画廊/悬浮交互等 → `renderOverlay`。
- 单位价：`PricePerUnit.tsx` → 与价格区同槽（建议 `renderPriceArea`）。
- 说明：插槽命名建议在 `types.ts` 补充强类型定义，避免歧义；复合组件中预留占位容器便于插件输出（例如在 `Price.tsx` 预留 `price-extensions` 容器）。

**扩展方向与分类**
- 交易与促销：价格计算、阶梯价、优惠券推荐、限时购、组合购、库存提示、运费/税费明细。
- 个性化与导购：用户标签、动态推荐、捆绑销售、评价摘要、问答/FAQ。
- 交互与体验：悬浮动效、点击/选择埋点、A/B 测试插桩、快捷加购区优化、SKU/属性选择器增强。
- 内容与媒体：图片/视频增强、画廊、3D 预览、特性亮点列表、徽章体系。
- 可用性与国际化：可访问性（A11y）提示、文案与单位国际化、本地化价格格式。
- 分析与性能：可见性追踪、性能计时、懒加载策略、错误上报。

**建议插件清单（示例与落地钩子）**
- `PriceCalculatorPlugin`：`transformProps` 合并优惠、满减、阶梯价；对 `OrderSummaryPanel` 提供数据。
- `ComparePricePlugin`：`renderPriceArea` 输出原价/现价对比；`transformProps` 提供 `oldPrice`。
- `CouponRecommendPlugin`：`renderPriceArea` 或 `renderFooter` 提供“可领券”提示；`onClick` 打开 `CouponBar`。
- `InventoryPlugin`：`renderBadge` 输出 `StockBadge`；`onPropsChange` 响应库存状态。
- `ResponsivePlugin`：`renderContainer`、`onResize` 根据容器宽度调整布局（现有插件可复用）。
- `SKUPlugin`：`renderActions` 输出 `OptionPicker`/`ColorSwatches`；`onSelectionChange` 写入 `state.attributes`。
- `QuantityPlugin`：`renderActions` 输出 `QuantityStepper`；`onStateChange` 更新数量。
- `UpsellBundlePlugin`：`renderFooter` 输出 `UpsellBundle`；`onClick` 处理加购组合。
- `ReviewPlugin`：`renderHeader` 或 `renderFooter` 输出 `Rating` 与简评；`onVisibilityChange` 做曝光埋点。
- `BadgePlugin`：`renderBadge` 输出 `Badge`/`BadgeGroup`；`transformProps` 汇总打标文案。
- `PricePerUnitPlugin`：`renderPriceArea` 输出单位价格。
- `A11yPlugin`：在各插槽输出无障碍属性；`onError` 捕获可访问性问题。
- `AnalyticsPlugin`：`onClick`、`onHover`、`onVisibilityChange` 收集事件；`renderOverlay` 可显示调试面板（开发态）。
- `CountdownPlugin`：`renderPriceArea` 或 `renderHeader` 输出倒计时；`onMount` 启动计时器，`onUnmount` 清理。
- `HoverPlugin`/`AnimationPlugin`：`renderOverlay` 或包裹 `renderContentWrapper` 提供动效与悬浮交互。

**接口与数据契约（建议）**
- 插件接口：`CardPluginHooks` 扩展时保持向后兼容；新增插槽以可选属性形式提供。
- 数据读取：统一通过 `useProductCard()` 读取 `data/state/setState`；避免直接操作外部 store。
- 价格相关字段：`price: number`、`oldPrice?: number`、`currency?: string`、`discounts?: Discount[]`（由 `PriceCalculatorPlugin` 维护）。
- 选择器状态：`state.attributes: Record<string, string>`、`state.quantity: number`。
- 插件输出：约定返回 `React.ReactNode | null`，并附加必要的 `aria-*`、`role` 与 `data-testid`。

**打包与性能建议**
- 复合入口：`namespace.tsx` 持续采用 `React.lazy` 按需挂载，保留 `<ProductCardNS.* />` 体验。
- 命名导出：各子组件与插件分别在 `components/*`、`custom-plugins/*` 目录下命名导出，配合 `package.json` `exports` 子路径实现真树摇。
- 按需加载策略：体积较大的媒体/分析类插件默认懒加载；关键电商插件（价格、库存、SKU）随卡片加载。
- 依赖隔离：插件内部尽量避免跨依赖耦合，公共工具放入 `utils` 并最小化体积。

**测试与质量保障**
- 单元测试：对 `transformProps`、生命周期钩子、副作用清理做覆盖；断言插槽输出。
- 组件集成测试：在 `CardCore` 上挂载多个插件，验证插槽优先级与并存行为。
- 性能基线：设定首屏与交互延迟阈值；大插件采用懒加载并有超时降级。
- A11y 检查：标题、按钮、图像、徽章等输出的可访问性属性校验。

**里程碑与优先级（建议）**
- M1（本周）：补齐插槽映射与类型，落地 `renderPriceArea`；对 `Price`、`CouponBar`、`OrderSummaryPanel` 预留容器。
- M2（下周）：交付电商核心插件集（价格计算、优惠券推荐、库存、SKU、数量）。
- M3：导购与个性化（评价摘要、Upsell、用户标签）。
- M4：分析与 A/B 测试、性能计时与曝光追踪。
- M5：国际化与 A11y 完善、开发者插件模板与文档。

**示例用法（注册与渲染）**
- 在 `withPlugins.tsx` 注册：`createPluginManager([PriceCalculatorPlugin(), InventoryPlugin(), SKUPlugin(), QuantityPlugin()])`。
- 插槽输出：`renderPriceArea` 返回包含 `SavingsBadge`、对比价、可领券提示；`renderActions` 返回 `OptionPicker` + `QuantityStepper`；`renderBadge` 返回库存或促销徽章。

**兼容性与迁移**
- 保持现有插件钩子不变；新增插槽以可选方式接入。
- 复合组件增加插槽容器时，默认空渲染不影响旧页面；文档清晰标注使用方式。

如果你认可以上规划，我可以按 M1 里程碑先补齐 `types.ts` 的插槽类型，更新 `Price`/`CouponBar`/`OrderSummaryPanel` 以容纳 `renderPriceArea` 的输出，并提供一套示例插件代码与测试。
