import React from "react";
import { useProductCard } from "../ProductCard";

export type DescriptionProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export const Description: React.FC<DescriptionProps> = ({ children, style, className }) => {
  const { data } = useProductCard();
  const final = children ?? data?.description;
  return <p style={style} className={className}>{final}</p>;
};