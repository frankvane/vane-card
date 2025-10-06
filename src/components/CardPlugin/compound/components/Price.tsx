import React from "react";
import { useProductCard } from "../ProductCard";

export type PriceProps = {
  value?: number | string;
  currency?: string;
  style?: React.CSSProperties;
  className?: string;
};

export const Price: React.FC<PriceProps> = ({ value, currency = "¥", style, className }) => {
  const { data } = useProductCard();
  const v = value ?? data?.price;
  if (v == null) return null;
  return <div style={style} className={className}>{currency}{v}</div>;
};