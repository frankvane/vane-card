/**
 * 插槽示例：Gallery + Video（头部画廊与视频预览）
 */

import {
  CardCore,
  createActionsPlugin,
  createGalleryPlugin,
  createHoverPlugin,
  createStatePlugin,
  withPlugins,
} from "vane-card";

import DemoPage from "../_layout/DemoPage";
import React from "react";

interface ProductData {
  id: string;
  name: string;
  price: number;
  images?: string[];
  image?: string;
  video?: string;
  poster?: string;
}

const ProductCard = withPlugins(CardCore, {
  plugins: [
    // 使用 Gallery 插件统一处理图片/视频头部区域
    createGalleryPlugin({
      autoplay: false,
      showIndicators: true,
      showThumbnails: true,
      enableZoom: true,
      // 将视频插入到第 2 个位置（1 开始）
      videoIndex: 2,
    }),
    createHoverPlugin({ enableShadow: true, enableScale: true }),
    createStatePlugin({ enableCart: true, enableWishlist: true }),
    createActionsPlugin({ showCartButton: true, showWishlistButton: true }),
  ],
});

export default function GalleryVideoSlots() {
  const products: ProductData[] = [
    {
      id: "gv1",
      name: "旗舰耳机（含视频）",
      price: 1299,
      images: [
        "https://picsum.photos/id/1060/800/600",
        "https://picsum.photos/id/1059/800/600",
        "https://picsum.photos/id/1058/800/600",
      ],
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: "https://picsum.photos/id/1060/800/600",
    },
    {
      id: "gv2",
      name: "轻薄相机（无视频）",
      price: 2599,
      images: [
        "https://picsum.photos/id/1015/800/600",
        "https://picsum.photos/id/1016/800/600",
      ],
    },
  ];

  return (
    <DemoPage
      title="插槽示例：Gallery + Video"
      description="通过 Gallery 插件管理图片与视频，支持缩略图、指示器与点击播放。"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
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
              <div style={{ marginTop: 8, fontSize: 18, fontWeight: 800, color: "#e53935" }}>
                ¥{p.price}
              </div>
            </div>
          </ProductCard>
        ))}
      </div>
    </DemoPage>
  );
}