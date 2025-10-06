/**
 * 双列对称布局示例（50/50）
 * 左右对称两列，支持并排展示两类信息/两张图
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

export default function TwoColumnLayout() {
  const left =
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=900";
  const right =
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900";

  return (
    <DemoPage
      title="双列对称布局（50/50）"
      description="左右两列对称，适合对比展示或并列内容。"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        <Card
          cardId="two-left"
          data={{}}
          containerStyle={{
            borderRadius: 10,
            overflow: "hidden",
            background: "#fff",
            border: "1px solid #eee",
          }}
        >
          <img
            src={left}
            alt="left"
            style={{ width: "100%", height: 220, objectFit: "cover" }}
          />
          <div style={{ padding: 16 }}>
            <h3 style={{ margin: 0 }}>左侧内容块</h3>
            <p style={{ margin: "8px 0 0", color: "#666" }}>
              可放置图文、参数、卖点等。
            </p>
          </div>
        </Card>

        <Card
          cardId="two-right"
          data={{}}
          containerStyle={{
            borderRadius: 10,
            overflow: "hidden",
            background: "#fff",
            border: "1px solid #eee",
          }}
        >
          <img
            src={right}
            alt="right"
            style={{ width: "100%", height: 220, objectFit: "cover" }}
          />
          <div style={{ padding: 16 }}>
            <h3 style={{ margin: 0 }}>右侧内容块</h3>
            <p style={{ margin: "8px 0 0", color: "#666" }}>
              适合对比、并列展示两类内容。
            </p>
          </div>
        </Card>
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
          <li>50/50 两列对称，借助 CSS Grid 快速实现</li>
          <li>移动端可改为单列（示例保持桌面尺寸）</li>
          <li>适合对比展示、专题页模块化拼装</li>
        </ul>
      </div>
    </DemoPage>
  );
}
