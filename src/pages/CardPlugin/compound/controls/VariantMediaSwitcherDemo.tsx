import { ProductCard, createSKUPlugin } from "../../../../components/CardPlugin";

import DemoPage from "../../_layout/DemoPage";
import React from "react";

const demoProduct = {
  id: "P-1001",
  title: "多规格运动鞋",
  image:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
  price: 49900,
  oldPrice: 69900,
  inventory: 42,
};

const colorImages = [
  {
    id: "SKU-RED",
    label: "红色",
    url:
      "https://picsum.photos/seed/SKU-RED/800/600",
  },
  {
    id: "SKU-BLUE",
    label: "蓝色",
    url:
      "https://picsum.photos/seed/SKU-BLUE/800/600",
  },
  {
    id: "SKU-BLACK",
    label: "黑色",
    url:
      "https://picsum.photos/seed/SKU-BLACK/800/600",
  },
];

export default function VariantMediaSwitcherDemo() {
  // 修正为 SKUPlugin 期望的数据结构：attributes 为数组，variants 使用 attrs 键
  const attributes = [
    { name: "颜色", options: ["红色", "蓝色", "黑色"] },
  ];
  const variants = [
    { sku: "SKU-RED", attrs: { 颜色: "红色" }, image: colorImages[0].url },
    { sku: "SKU-BLUE", attrs: { 颜色: "蓝色" }, image: colorImages[1].url },
    { sku: "SKU-BLACK", attrs: { 颜色: "黑色" }, image: colorImages[2].url },
  ];

  return (
    <DemoPage
      title="VariantMediaSwitcher 示例"
      description="点击下方颜色按钮可模拟规格变更，主图将跟随变化；也可以直接点击缩略图进行手动切换。"
      sourceKey="compound/controls/VariantMediaSwitcherDemo"
    >
      <div style={{ padding: 24 }}>
        <div style={{ display: "grid", gap: 24 }}>
          {/* 示例 1：横向布局，允许手动切换 */}
          <ProductCard productId={demoProduct.id} data={demoProduct} plugins={[createSKUPlugin({ attributes, variants })]}>
            <ProductCard.Section title="横向布局">
              <ProductCard.VariantMediaSwitcher
                layout="horizontal"
                thumbnailSize="medium"
                aspectRatio="4 / 3"
                variantImages={colorImages}
                enableManualSwitch
              />
              {/* 使用 VariantSelector 选择颜色，SKU 插件将 selectedSKU 写入上下文 */}
              <div style={{ marginTop: 12 }}>
                {/* VariantSelector 支持 Record<string, string[]> 结构，保持原用法 */}
                <ProductCard.VariantSelector attributes={{ 颜色: ["红色", "蓝色", "黑色"] }} />
              </div>
            </ProductCard.Section>
          </ProductCard>

          {/* 示例 2：纵向布局，禁止手动切换，仅跟随规格 */}
          <ProductCard productId={demoProduct.id} data={demoProduct} plugins={[createSKUPlugin({ attributes, variants })]}>
            <ProductCard.Section title="纵向布局（支持手动切换）">
              <ProductCard.VariantMediaSwitcher
                layout="vertical"
                thumbnailSize="small"
                aspectRatio="1 / 1"
                variantImages={colorImages}
                enableManualSwitch
              />
              <div style={{ marginTop: 12 }}>
                <ProductCard.VariantSelector attributes={{ 颜色: ["红色", "蓝色", "黑色"] }} />
              </div>
            </ProductCard.Section>
          </ProductCard>
        </div>
      </div>
    </DemoPage>
  );
}