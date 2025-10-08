/**
 * 下图布局示例（内容在上，图片在下）
 * 适合资讯/说明类卡片，上部文字信息，下部大图展示
 */

import {
  CardCore,
  createHoverPlugin,
  withPlugins,
} from "vane-card";

import DemoPage from "../_layout/DemoPage";
import React from "react";

interface CardData {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
}

const BottomImageCard = withPlugins(CardCore, {
  plugins: [createHoverPlugin({ enableShadow: true })],
});

export default function BottomImageLayout() {
  const cards: CardData[] = [
    {
      id: "1",
      title: "夏季出行装备指南",
      subtitle: "精选轻量与防水单品推荐",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900",
    },
    {
      id: "2",
      title: "桌面效率提升方案",
      subtitle: "键鼠、支架与显示器搭配建议",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900",
    },
  ];

  return (
    <DemoPage
      title="下图布局（上文 / 下图）"
      description="内容在上、图片在下，适合说明类/攻略类卡片。"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 16,
        }}
      >
        {cards.map((c) => (
          <BottomImageCard
            key={c.id}
            cardId={c.id}
            data={c}
            containerStyle={{
              background: "#fff",
              borderRadius: 10,
              border: "1px solid #eee",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* 上部：文本区 */}
            <div style={{ padding: 16 }}>
              <h3
                style={{
                  margin: "0 0 6px 0",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#333",
                }}
              >
                {c.title}
              </h3>
              {c.subtitle && (
                <p style={{ margin: 0, color: "#666", fontSize: 13 }}>
                  {c.subtitle}
                </p>
              )}
            </div>

            {/* 下部：图片区 */}
            <div style={{ width: "100%", height: 200 }}>
              <img
                src={c.image}
                alt={c.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="lazy"
              />
            </div>
          </BottomImageCard>
        ))}
      </div>

      <div
        style={{
          marginTop: 40,
          padding: 20,
          background: "#f5f5f5",
          borderRadius: 8,
        }}
      >
        <h2 style={{ marginTop: 0 }}>布局说明</h2>
        <ul style={{ lineHeight: 1.8 }}>
          <li>结构为 column：上部文本、下部大图，信息先于视觉</li>
          <li>适合攻略、专题、活动说明等信息主导的场景</li>
          <li>图片区域建议固定高度，保证卡片对齐</li>
        </ul>
      </div>
    </DemoPage>
  );
}
