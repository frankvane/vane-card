import type { CardPlugin, CardPluginContext } from "../../plugins";

export const createAnalyticsPlugin = (): CardPlugin => ({
  name: "AnalyticsPlugin",
  version: "1.0.0",
  description: "点击与购物车统计",
  priority: 50,
  hooks: {
    onClick: (context: CardPluginContext, event: React.MouseEvent) => {
      console.log(`[Analytics] click`, {
        cardId: context.cardId,
        position: { x: event.clientX, y: event.clientY },
      });
    },
    onCartChange: (context: CardPluginContext, added: boolean) => {
      console.log(`[Analytics] cart`, {
        cardId: context.cardId,
        action: added ? "add" : "remove",
      });
    },
  },
});
