import React from "react";
import { useProductCard } from "../ProductCard";

export type InventoryProps = {
  available?: number; // 可用库存
  threshold?: number; // 低库存阈值
  style?: React.CSSProperties;
  className?: string;
};

export const Inventory: React.FC<InventoryProps> = ({ available, threshold = 5, style, className }) => {
  const { data } = useProductCard();
  const qty = available ?? data?.inventory ?? 0;

  const isLow = qty > 0 && qty <= threshold;
  const text = qty <= 0 ? "已售罄" : isLow ? `仅剩 ${qty} 件` : `库存充足（${qty}）`;
  const color = qty <= 0 ? "#999" : isLow ? "#d0021b" : "#0a7f2e";

  return (
    <div className={className} style={{ color, fontSize: 13, ...style }}>{text}</div>
  );
};