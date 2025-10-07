import React from "react";
import { ProductCard } from "../../../components/CardPlugin/compound";

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
      "https://images.unsplash.com/photo-1547586696-31e01c84e446?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "SKU-BLUE",
    label: "蓝色",
    url:
      "https://images.unsplash.com/photo-1528701800489-20be3c2ea237?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "SKU-BLACK",
    label: "黑色",
    url:
      "https://images.unsplash.com/photo-1519741497674-6117f5e584b9?q=80&w=800&auto=format&fit=crop",
  },
];

export default function VariantMediaSwitcherDemo() {
  // 模拟规格选择，仅用于演示主图跟随逻辑
  const [selectedSKU, setSelectedSKU] = React.useState<any | null>(null);

  const getImageForSelected = React.useCallback((sku: any) => {
    if (!sku) return undefined;
    // 如果 sku.id 与我们示例的 variantImages id 匹配，则返回对应主图
    const m = colorImages.find(v => v.id === sku?.sku || v.id === sku?.id);
    return m?.url;
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>VariantMediaSwitcher 示例</h2>
      <p style={{ color: "#666", marginBottom: 24 }}>
        点击下方颜色按钮可模拟规格变更，主图将跟随变化；也可以直接点击缩略图进行手动切换。
      </p>

      <div style={{ display: "grid", gap: 24 }}>
        {/* 示例 1：横向布局，允许手动切换 */}
        <ProductCard data={demoProduct} state={{ selectedSKU }}>
          <ProductCard.Section title="横向布局">
            <ProductCard.VariantMediaSwitcher
              layout="horizontal"
              thumbnailSize="medium"
              aspectRatio="4 / 3"
              variantImages={colorImages}
              enableManualSwitch
              getImageForSelected={(sku) => getImageForSelected(sku)}
            />

            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              {colorImages.map(ci => (
                <button
                  key={ci.id}
                  type="button"
                  onClick={() => setSelectedSKU({ sku: ci.id })}
                  style={{
                    padding: "6px 12px",
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    background: selectedSKU?.sku === ci.id ? "#eef" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  选择 {ci.label}
                </button>
              ))}
            </div>
          </ProductCard.Section>
        </ProductCard>

        {/* 示例 2：纵向布局，禁止手动切换，仅跟随规格 */}
        <ProductCard data={demoProduct} state={{ selectedSKU }}>
          <ProductCard.Section title="纵向布局（仅跟随规格）">
            <ProductCard.VariantMediaSwitcher
              layout="vertical"
              thumbnailSize="small"
              aspectRatio="1 / 1"
              variantImages={colorImages}
              enableManualSwitch={false}
              getImageForSelected={(sku) => getImageForSelected(sku)}
            />

            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              {colorImages.map(ci => (
                <button
                  key={ci.id}
                  type="button"
                  onClick={() => setSelectedSKU({ sku: ci.id })}
                  style={{
                    padding: "6px 12px",
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    background: selectedSKU?.sku === ci.id ? "#eef" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  选择 {ci.label}
                </button>
              ))}
            </div>
          </ProductCard.Section>
        </ProductCard>
      </div>
    </div>
  );
}