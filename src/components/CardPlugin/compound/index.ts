import type React from "react";
import { ProductCard as ProductCardMain } from "./ProductCard";
import { Image } from "./components/Image";
import { Badge } from "./components/Badge";
import { Title } from "./components/Title";
import { Price } from "./components/Price";
import { Description } from "./components/Description";
import { Actions } from "./components/Actions";
import { Section } from "./components/Section";
import { Rating } from "./components/Rating";
import { Inventory } from "./components/Inventory";

// 为复合组件定义带静态子组件的类型，解决 TS 下的 "FC<ProductCardProps> 上不存在属性 Image" 问题
export type ProductCardCompound = React.FC<import("./ProductCard").ProductCardProps> & {
  Image: typeof Image;
  Badge: typeof Badge;
  Title: typeof Title;
  Price: typeof Price;
  Description: typeof Description;
  Actions: typeof Actions;
  Section: typeof Section;
  Rating: typeof Rating;
  Inventory: typeof Inventory;
};

// 构建并导出带静态子组件的复合组件实例
export const ProductCard: ProductCardCompound = ProductCardMain as unknown as ProductCardCompound;
(ProductCard as any).Image = Image;
(ProductCard as any).Badge = Badge;
(ProductCard as any).Title = Title;
(ProductCard as any).Price = Price;
(ProductCard as any).Description = Description;
(ProductCard as any).Actions = Actions;
(ProductCard as any).Section = Section;
(ProductCard as any).Rating = Rating;
(ProductCard as any).Inventory = Inventory;

// 类型导出
export type { ProductCardProps, ProductCardContextValue, ProductCardState } from "./ProductCard";
export type { ImageProps } from "./components/Image";
export type { BadgeProps } from "./components/Badge";
export type { TitleProps } from "./components/Title";
export type { PriceProps } from "./components/Price";
export type { DescriptionProps } from "./components/Description";
export type { ActionsProps } from "./components/Actions";
export type { SectionProps } from "./components/Section";
export type { RatingProps } from "./components/Rating";
export type { InventoryProps } from "./components/Inventory";