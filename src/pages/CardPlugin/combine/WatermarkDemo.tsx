import { LazyLoadImageCore, createWatermarkPlugin, withPlugins } from "vane-lazy-image";
import { ProductCard } from "vane-card";
import DemoPage from "../_layout/DemoPage";
import React from "react";

const LazyImage = withPlugins(LazyLoadImageCore as any, [
  createWatermarkPlugin({
    text: "VANE",
    position: "bottom-right",
    opacity: 0.6,
  }),
]);

export default function WatermarkDemo() {
  const product = {
    id: "card-lazy-watermark",
    title: "示例商品：水印懒加载图",
    description: "结合 vane-card 与 vane-lazy-image 水印插件",
    price: 199,
    image: "https://picsum.photos/seed/watermark-demo/800/600",
  };

  return (
    <DemoPage
      title="vane-card 结合 vane-lazy-image（水印）"
      description="在卡片的媒体区域使用带水印的懒加载图片，并配合标题/价格等卡片信息。"
    >
      <div className="card" style={{ padding: 16, maxWidth: 860, margin: "0 auto" }}>
        <ProductCard productId={product.id} data={product}>
          <div style={{ display: "grid", gridTemplateColumns: "480px 1fr", gap: 16 }}>
            {/* 左侧：媒体区使用 LazyImage + 水印 */}
            <ProductCard.Section title="媒体">
              <div style={{ width: "100%", aspectRatio: "4 / 3", borderRadius: 12, overflow: "hidden" }}>
                <LazyImage
                  src={product.image}
                  loading="lazy"
                  containerStyle={{ width: "100%", height: "100%" }}
                  imageStyle={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </ProductCard.Section>

            {/* 右侧：卡片文本与价格信息 */}
            <div>
              <ProductCard.Title />
              <ProductCard.Description lines={2} style={{ color: "#555", marginTop: 6 }} />

              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 10 }}>
                <ProductCard.Price />
              </div>

              <div style={{ marginTop: 12 }}>
                <ProductCard.Actions />
              </div>
            </div>
          </div>
        </ProductCard>
      </div>
    </DemoPage>
  );
}