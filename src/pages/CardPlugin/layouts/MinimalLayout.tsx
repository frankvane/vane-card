/**
 * 极简布局示例
 * 只有图片和标题的极简设计，适合分类导航
 */

import {
  CardCore,
  createHoverPlugin,
  createImagePlugin,
  withPlugins,
} from "../../../components/CardPlugin";

import DemoPage from "../_layout/DemoPage";
import React from "react";

interface CategoryData {
  id: string;
  name: string;
  image: string;
  count?: number;
}

const MinimalCard = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({ lazyLoad: true }),
    createHoverPlugin({ enableScale: true }),
  ],
});

export default function MinimalLayout() {
  const categories: CategoryData[] = [
    {
      id: "1",
      name: "耳机音响",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      count: 234,
    },
    {
      id: "2",
      name: "智能穿戴",
      image:
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
      count: 156,
    },
    {
      id: "3",
      name: "充电配件",
      image:
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400",
      count: 89,
    },
    {
      id: "4",
      name: "蓝牙音箱",
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
      count: 78,
    },
    {
      id: "5",
      name: "智能手表",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      count: 123,
    },
    {
      id: "6",
      name: "电脑外设",
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
      count: 201,
    },
  ];

  return (
    <DemoPage
      title="极简布局"
      description="只有图片和标题的极简设计，适合分类导航、图标墙"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        {categories.map((category) => (
          <MinimalCard
            key={category.id}
            cardId={category.id}
            data={category}
            containerStyle={{
              background: "#fff",
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                padding: "12px",
                textAlign: "center",
              }}
            >
              <h4
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                {category.name}
              </h4>
              {category.count && (
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    color: "#999",
                  }}
                >
                  {category.count} 件商品
                </p>
              )}
            </div>
          </MinimalCard>
        ))}
      </div>

      {/* 说明文档 */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>布局说明</h2>
        <h3>适用场景</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>商品分类导航</li>
          <li>品牌墙展示</li>
          <li>专题入口</li>
          <li>快速选择界面</li>
        </ul>

        <h3>布局特点</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>信息极简，只保留核心内容</li>
          <li>图片为主，文字为辅</li>
          <li>悬停时有缩放效果，增强交互</li>
          <li>适合第一级导航或入口展示</li>
        </ul>

        <h3>设计要点</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>图片建议使用清晰、代表性强的素材</li>
          <li>标题简短，通常 2-6 个字</li>
          <li>可选添加副标题（如商品数量）</li>
          <li>整体布局干净，降低认知负担</li>
        </ul>

        <h3>交互建议</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>点击跳转到对应分类页面</li>
          <li>支持拖拽排序（管理后台）</li>
          <li>悬停时显示更多信息（可选）</li>
          <li>配合骨架屏提升加载体验</li>
        </ul>
      </div>
    </DemoPage>
  );
}
