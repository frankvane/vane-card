import React, { useMemo } from "react";

import DemoPage from "../_layout/DemoPage";
import { ProductCard } from "vane-card";
import { WaterfallCore } from "vane-waterfall";

interface WaterfallItem {
  id: number;
  title: string;
  image: string;
  price: number;
  desc: string;
  height: number;
}

export default function BasicDemo() {
  // 生成瀑布流数据（与卡片结合：图片/价格/文案）
  const items = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      title: `瀑布卡片 ${i + 1}`,
      image: `https://picsum.photos/seed/wf-${i + 1}/800/600`,
      price: Math.floor(Math.random() * 1000) + 99,
      desc: "结合 vane-card 在瀑布流中展示商品卡片",
       height: Math.floor(Math.random() * 200) + 150,
    }));
  }, []);

  return (
    <DemoPage
      title="vane-card 结合 vane-waterfall"
      description="在瀑布流中渲染 ProductCard 卡片（图片/标题/价格/文案）。"
    >
      <div
        style={{
          height: "600px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <WaterfallCore
          items={items}
          columns={3}
          gap={16}
          renderItem={(item: WaterfallItem) => (
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <ProductCard
                productId={`wf-${item.id}`}
                data={{ id: `wf-${item.id}`, title: item.title, image: item.image, price: item.price, description: item.desc }}
              >
                <ProductCard.Image style={{ width: "100%", height: item.height, objectFit: "cover" }} />
                <div style={{ padding: 12 }}>
                  <ProductCard.Title />
                  <ProductCard.Description lines={2} style={{ color: "#666", marginTop: 6 }} />
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 8 }}>
                    <ProductCard.Price />
                  </div>
                </div>
              </ProductCard>
            </div>
          )}
          keyExtractor={(item: WaterfallItem) => item.id}
          containerStyle={{
            height: "100%",
            background: "#f5f5f5",
            padding: "16px",
          }}
        />
      </div>
    </DemoPage>
  );
}