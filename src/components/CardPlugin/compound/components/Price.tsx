import React from "react";
import { useProductCard } from "../ProductCard";

export type PriceProps = {
  value?: number | string;
  currency?: string;
  style?: React.CSSProperties;
  className?: string;
};

export const Price: React.FC<PriceProps> = ({ value, currency = "¥", style, className }) => {
  const { data, state } = useProductCard();

  // 选中变体价格优先：支持 variants 数组（含 price/oldPrice）
  const getActiveVariant = (): any | undefined => {
    const attrs = state.attributes || {};
    const variants: any[] | undefined = (data?.variants && Array.isArray(data.variants)) ? data.variants : undefined;
    if (!variants || !Object.keys(attrs).length) return undefined;
    return variants.find((v) => {
      const opts = (v.options || v.attributes) || {};
      return Object.keys(attrs).every((k) => String(opts[k]) === String((attrs as any)[k]));
    });
  };

  const active = getActiveVariant();
  const v = value ?? (active?.price ?? data?.price);
  if (v == null) return null;
  return <div style={style} className={className}>{currency}{v}</div>;
};