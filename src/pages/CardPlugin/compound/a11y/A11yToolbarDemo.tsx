import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from  "../../../../components/CardPlugin";
import React from "react";

const demoProduct = {
  id: "P-6001",
  title: "简约阅读台灯",
  image:
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
  price: 15900,
  oldPrice: 19900,
  inventory: 120,
};

export default function A11yToolbarDemo() {
  return (
    <DemoPage
      title="A11yToolbar 可访问性工具栏示例"
      description="通过五项辅助功能开关提升阅读体验：大字号、高对比度、链接下划线、可见焦点、减少动画。"
      sourceKey="compound/a11y/A11yToolbarDemo"
    >
      <div style={{ padding: 24 }}>
        <ProductCard productId={demoProduct.id} data={demoProduct}>
          <ProductCard.Section title="辅助功能">
            <div style={{ display: "grid", gap: 16 }}>
              <ProductCard.A11yToolbar />

              <div>
                <ProductCard.Title />
                <ProductCard.Description>
                  柔和光线呵护双眼，支持多档亮度调节，适合夜读与办公。点击链接了解
                  <a href="#" onClick={(e) => e.preventDefault()}>更多细节</a>。
                </ProductCard.Description>
              </div>
            </div>
          </ProductCard.Section>
        </ProductCard>
      </div>
    </DemoPage>
  );
}