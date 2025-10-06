/**
 * QuantityPlugin - 数量步进器插件
 */
import type { CardPlugin, PluginCreator } from "../../plugins/types";
import React from "react";

export interface QuantityPluginConfig {
  min?: number;
  max?: number; // 若未设置，则自动根据变体库存或整体库存推断
  step?: number;
  renderIn?: "footer" | "overlay";
  useVariantStock?: boolean; // 优先使用选中变体的库存作为上限
}

function getMax(context: any, config: QuantityPluginConfig, min: number): number {
  if (typeof config.max === "number") return Math.max(min, config.max);
  const variant = context.bus?.getData?.("sku.variant") as { stock?: number } | undefined;
  const stockVariant = config.useVariantStock !== false ? variant?.stock : undefined;
  const inventory = (context.data as any)?.inventory as number | undefined;
  const cap = typeof stockVariant === "number" ? stockVariant : typeof inventory === "number" ? inventory : undefined;
  return typeof cap === "number" ? Math.max(min, cap) : 99;
}

const Stepper: React.FC<{
  context: any;
  min: number;
  step: number;
  max: number;
}> = ({ context, min, step, max }) => {
  const q = (context.bus?.getData?.("quantity") as number | undefined) ?? min;
  const setQ = (next: number) => {
    const clamped = Math.min(Math.max(next, min), max);
    context.bus?.setData?.("quantity", clamped);
  };
  const dec = () => setQ(q - step);
  const inc = () => setQ(q + step);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 12, color: "#666" }}>数量</span>
      <button
        onClick={dec}
        disabled={q <= min}
        style={{ padding: "4px 10px", border: "1px solid #ddd", borderRadius: 6, background: "#fff", cursor: q <= min ? "not-allowed" : "pointer" }}
      >
        -
      </button>
      <input
        type="number"
        value={q}
        min={min}
        max={max}
        step={step}
        onChange={(e) => setQ(Number(e.target.value))}
        style={{ width: 56, textAlign: "center", padding: "4px 8px", border: "1px solid #ddd", borderRadius: 6 }}
      />
      <button
        onClick={inc}
        disabled={q >= max}
        style={{ padding: "4px 10px", border: "1px solid #ddd", borderRadius: 6, background: "#fff", cursor: q >= max ? "not-allowed" : "pointer" }}
      >
        +
      </button>
      <span style={{ marginLeft: "auto", fontSize: 12, color: "#999" }}>最大 {max}</span>
    </div>
  );
};

export const createQuantityPlugin: PluginCreator<any, QuantityPluginConfig> = (
  config = {}
) => {
  const { min = 1, step = 1, renderIn = "footer", useVariantStock = true } = config;

  const plugin: CardPlugin = {
    name: "QuantityPlugin",
    version: "1.0.0",
    description: "数量选择步进器（联动库存/变体）",
    priority: 30,
    hooks: {
      onMount: (context) => {
        const initial = Math.max(min, 1);
        context.bus?.setData?.("quantity", initial);
      },
      renderFooter: (context) => {
        if (renderIn !== "footer") return null;
        const max = getMax(context, { ...config, useVariantStock }, min);
        return (
          <div style={{ padding: 12, borderTop: "1px dashed #eee" }}>
            <Stepper context={context} min={min} step={step} max={max} />
          </div>
        );
      },
      renderOverlay: (context) => {
        if (renderIn !== "overlay") return null;
        const max = getMax(context, { ...config, useVariantStock }, min);
        return (
          <div style={{ position: "absolute", bottom: 8, left: 8, right: 8, background: "rgba(255,255,255,0.92)", borderRadius: 8, padding: 8, zIndex: 9 }}>
            <Stepper context={context} min={min} step={step} max={max} />
          </div>
        );
      },
    },
    config,
  };

  return plugin;
};