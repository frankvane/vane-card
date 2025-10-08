import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "vane-card";
import React from "react";

const product = {
  id: "combo-variant-media-01",
  title: "多规格轻量跑鞋",
  description: "轻量缓震，中底弹性良好；多色可选，适合通勤与训练",
  price: 399,
  image:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
  variants: [
    { attributes: { 颜色: "红", 尺码: "41" }, price: 399, stock: 6, sku: "SKU-RED" },
    { attributes: { 颜色: "红", 尺码: "42" }, price: 399, stock: 8, sku: "SKU-RED" },
    { attributes: { 颜色: "蓝", 尺码: "41" }, price: 409, stock: 5, sku: "SKU-BLUE" },
    { attributes: { 颜色: "蓝", 尺码: "42" }, price: 409, stock: 4, sku: "SKU-BLUE" },
    { attributes: { 颜色: "黑", 尺码: "41" }, price: 389, stock: 3, sku: "SKU-BLACK" },
    { attributes: { 颜色: "黑", 尺码: "42" }, price: 389, stock: 2, sku: "SKU-BLACK" },
  ],
};

const attributes: Record<string, string[]> = {
  颜色: ["红", "蓝", "黑"],
  尺码: ["41", "42"],
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

const VariantSelectorMediaComboDemo: React.FC = () => {
  const handleMediaChange = (url: string) => {
    // 可在此处进行埋点或联动展示
    // console.log("主图已切换:", url);
  };

  const getImageForSelected = (selectedSKU: any) => {
    if (!selectedSKU) return undefined;
    const match = colorImages.find((ci) => ci.id === selectedSKU?.sku || ci.id === selectedSKU?.id);
    return match?.url;
  };

  return (
    <DemoPage
      title="组合示例：规格选择 + 主图联动"
      description="通过 VariantSelector 选择规格，VariantMediaSwitcher 跟随变化并支持手动切换。"
    >
      <div className="card" style={{ padding: 12 }}>
        <ProductCard productId={product.id} data={product}>
          <ProductCard.Image style={{ width: "100%", borderRadius: 8 }} />
          <div style={{ padding: 12 }}>
            <ProductCard.Title />
            <ProductCard.Description />

            <ProductCard.Section title="选择规格" />
            <ProductCard.VariantSelector attributes={attributes} />
            <ProductCard.SelectedInfo style={{ marginTop: 8 }} />

            <ProductCard.Section title="主图联动（可手动切换）" />
            <ProductCard.VariantMediaSwitcher
              layout="horizontal"
              thumbnailSize="medium"
              aspectRatio="4 / 3"
              variantImages={colorImages}
              enableManualSwitch
              getImageForSelected={(sku) => getImageForSelected(sku)}
              onMediaChange={handleMediaChange}
            />

            <ProductCard.Section title="价格与库存" />
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ color: "#666", fontSize: 13 }}>当前价格：</span>
              <ProductCard.Price style={{ fontSize: 20, fontWeight: 600 }} />
            </div>
            <ProductCard.Inventory style={{ marginTop: 6 }} />
          </div>
        </ProductCard>
      </div>
    </DemoPage>
  );
};

export default VariantSelectorMediaComboDemo;