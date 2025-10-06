/**
 * 背景图布局示例（图片为背景，内容覆盖其上）
 * 适合海报/活动卡片：背景大图 + 前景渐变遮罩 + 文字与按钮
 */

import {
  CardCore,
  createHoverPlugin,
  withPlugins,
} from "../../../components/CardPlugin";

import DemoPage from "../_layout/DemoPage";
import React from "react";

const Card = withPlugins(CardCore, {
  plugins: [createHoverPlugin({ enableShadow: true })],
});

export default function BackgroundImageLayout() {
  const bg =
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1500";

  return (
    <DemoPage
      title="背景图布局（覆盖内容）"
      description="使用背景图+渐变遮罩提升可读性，适合活动海报/品牌展示。"
    >
      <Card
        cardId="bg-hero"
        data={{}}
        containerStyle={{
          position: "relative",
          borderRadius: 12,
          overflow: "hidden",
          minHeight: 280,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 渐变遮罩 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.2) 100%)",
          }}
        />

        {/* 前景内容 */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            color: "#fff",
            padding: "36px 40px",
            maxWidth: 560,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 34, fontWeight: 800 }}>
            夏日清凉季
          </h2>
          <p style={{ margin: "12px 0 20px", fontSize: 16, opacity: 0.92 }}>
            全场耳机/音箱/穿戴低至 8 折，先到先得，售完即止。
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              style={{
                padding: "12px 28px",
                background: "#ffeb3b",
                color: "#333",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              立即抢购
            </button>
            <button
              style={{
                padding: "12px 28px",
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              活动详情
            </button>
          </div>
        </div>
      </Card>

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
          <li>图片作为背景，使用 CSS 背景属性控制填充方式</li>
          <li>叠加渐变遮罩，保证文字对比度和可读性</li>
          <li>前景内容采用较大字号和高对比色，突出行动按钮</li>
        </ul>
      </div>
    </DemoPage>
  );
}
