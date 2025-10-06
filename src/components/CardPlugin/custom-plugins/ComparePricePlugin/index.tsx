/**
 * ComparePricePlugin - 比价展示插件
 */
import type { CardPlugin, PluginCreator } from "../../plugins/types";
import React from "react";

export interface ComparePricePluginConfig {
  competitors?: Array<{ name: string; price: number; url?: string }>;
  showLowestPrice?: boolean;
}

export const createComparePricePlugin: PluginCreator<any, ComparePricePluginConfig> = (
  config = {}
) => {
  const { competitors = [], showLowestPrice = true } = config;

  const plugin: CardPlugin = {
    name: "ComparePricePlugin",
    version: "1.0.0",
    description: "展示其他平台价格对比",
    priority: 20,
    hooks: {
      renderFooter: () => {
        if (!competitors.length) return null;
        const lowest = showLowestPrice
          ? competitors.reduce((min, c) => (c.price < min.price ? c : min), competitors[0])
          : undefined;
        return (
          <div style={{ padding: 12, borderTop: "1px dashed #eee" }}>
            <div style={{ fontSize: 12, color: "#999", marginBottom: 6 }}>平台价格对比</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 6 }}>
              {competitors.map((c) => (
                <React.Fragment key={c.name}>
                  <div style={{ fontSize: 13, color: "#555" }}>{c.name}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: lowest?.name === c.name ? "#388e3c" : "#333" }}>
                    ¥{c.price}
                  </div>
                </React.Fragment>
              ))}
            </div>
            {lowest && (
              <div style={{ marginTop: 6, fontSize: 12, color: "#388e3c" }}>
                当前最低：{lowest.name}（¥{lowest.price}）
              </div>
            )}
          </div>
        );
      },
    },
    config,
  };

  return plugin;
};