/**
 * vane-card 库入口文件
 * 用于 npm 包发布时的导出
 */
// ==================== CardPlugin 组件导出 ====================
export { CardCore } from "./components/CardPlugin";
export type { CardCoreProps, CardCoreRef } from "./components/CardPlugin";

// ==================== CardPlugin 插件系统导出 ====================
export type {
  CardPlugin,
  PluginManager as CardPluginManager,
  PluginBus as CardPluginBus,
  CardPluginContext,
  CardPluginHooks,
  PluginCreator as CardPluginCreator,
  WithPluginsConfig as CardWithPluginsConfig,
  CardState,
  CardSize,
} from "./components/CardPlugin/plugins";

export {
  createPluginBus as createCardPluginBus,
  createPluginManager as createCardPluginManager,
  withPlugins as withCardPlugins,
} from "./components/CardPlugin/plugins";

// ==================== CardPlugin 自定义插件导出 ====================
export * from "./components/CardPlugin/custom-plugins";
