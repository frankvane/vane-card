/**
 * 插槽示例：Responsive（响应式布局与样式联动）
 */

import React from "react";
import DemoPage from "../_layout/DemoPage";
import {
  CardCore,
  withPlugins,
  createImagePlugin,
  createHoverPlugin,
  createResponsivePlugin,
} from "../../../components/CardPlugin";

interface ProductData {
  id: string;
  name: string;
  image: string;
  description?: string;
}

const ProductCard = withPlugins(CardCore, {
  plugins: [
    createResponsivePlugin({
      breakpoints: { mobile: 480, tablet: 900, desktop: 1200 },
      layouts: { mobile: "vertical", tablet: "horizontal", desktop: "horizontal" },
      containerStyles: {
        mobile: { boxShadow: "none" },
        tablet: { boxShadow: "0 4px 10px rgba(0,0,0,0.06)" },
        desktop: { boxShadow: "0 6px 18px rgba(0,0,0,0.1)" },
      },
    }),
    createImagePlugin({ lazyLoad: true }),
    createHoverPlugin({ enableShadow: true }),
  ],
});

export default function ResponsiveSlots() {
  const products: ProductData[] = [
    {
      id: "rs1",
      name: "时尚运动鞋",
      image: "https://picsum.photos/id/21/600/600",
      description: "透气轻盈，中底缓震，适合日常与轻运动。",
    },
    {
      id: "rs2",
      name: "极简背包",
      image: "https://picsum.photos/id/1062/600/600",
      description: "防泼水面料，合理分隔，适合通勤与旅行。",
    },
  ];

  return (
    <DemoPage
      title="插槽示例：Responsive"
      description="通过 Responsive 插件根据宽度切换布局与容器样式。"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 20,
        }}
      >
        {products.map((p) => (
          <ProductCard
            key={p.id}
            cardId={p.id}
            data={p}
            containerStyle={{
              background: "#fff",
              borderRadius: 8,
              border: "1px solid #eee",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16 }}>{p.name}</h3>
              {p.description && (
                <p style={{ marginTop: 8, fontSize: 13, color: "#666", lineHeight: 1.5 }}>
                  {p.description}
                </p>
              )}
            </div>
          </ProductCard>
        ))}
      </div>
    </DemoPage>
  );
}