import React from "react";
import { useProductCard } from "../ProductCard";

export type SKUCodeProps = {
  code?: string;
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
};

export const SKUCode: React.FC<SKUCodeProps> = ({ code, prefix = "SKU", className, style }) => {
  const { data } = useProductCard();
  const final = code ?? data?.sku;
  if (!final) return null;
  return <div className={className} style={{ color: "#777", fontSize: 12, ...style }}>{prefix}：{final}</div>;
};