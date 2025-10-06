/**
 * 网格紧凑布局示例
 * 多列小卡片，适合快速浏览和密集展示
 */

import {
  CardCore,
  createHoverPlugin,
  createImagePlugin,
  withPlugins,
} from "../../../components/CardPlugin";

import DemoPage from "../_layout/DemoPage";
import React from "react";

interface ProductData {
  id: string;
  name: string;
  price: number;
  image: string;
}

const GridCard = withPlugins(CardCore, {
  plugins: [
    createImagePlugin({ lazyLoad: true }),
    createHoverPlugin({ enableShadow: true }),
  ],
});

export default function GridLayout() {
  const products: ProductData[] = [
    {
      id: "1",
      name: "专业运动耳机",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    },
    {
      id: "2",
      name: "智能手环",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
    },
    {
      id: "3",
      name: "无线充电器",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400",
    },
    {
      id: "4",
      name: "蓝牙音箱",
      price: 599,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    },
    {
      id: "5",
      name: "智能手表",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    },
    {
      id: "6",
      name: "无线鼠标",
      price: 159,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    },
    {
      id: "7",
      name: "机械键盘",
      price: 599,
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    },
    {
      id: "8",
      name: "显示器",
      price: 1899,
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
    },
  ];

  return (
    <DemoPage
      title="网格紧凑布局"
      description="多列小卡片布局，适合快速浏览和密集展示商品"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "12px",
        }}
      >
        {products.map((product) => (
          <GridCard
            key={product.id}
            cardId={product.id}
            data={product}
            containerStyle={{
              background: "#fff",
              borderRadius: "6px",
              overflow: "hidden",
              border: "1px solid #f0f0f0",
            }}
          >
            <div style={{ padding: "8px" }}>
              <h4
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#333",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {product.name}
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#e53935",
                }}
              >
                ¥{product.price}
              </p>
            </div>
          </GridCard>
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
          <li>商品快速浏览</li>
          <li>分类商品墙</li>
          <li>相关推荐区域</li>
          <li>搭配商品展示</li>
        </ul>

        <h3>布局特点</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>单个卡片尺寸较小，信息密度高</li>
          <li>自动填充网格，充分利用空间</li>
          <li>最小宽度 160px，保证内容可读性</li>
          <li>间距紧凑（12px），视觉统一</li>
        </ul>

        <h3>设计要点</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>标题使用省略号防止换行</li>
          <li>只展示最核心信息：图片、名称、价格</li>
          <li>悬停时有阴影效果，提供反馈</li>
          <li>适合移动端和桌面端响应式展示</li>
        </ul>

        <h3>使用建议</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>建议一行展示 4-6 个卡片</li>
          <li>商品名称控制在 10 字以内</li>
          <li>图片保持 1:1 比例，视觉整齐</li>
          <li>可配合分页或无限滚动使用</li>
        </ul>
      </div>
    </DemoPage>
  );
}
