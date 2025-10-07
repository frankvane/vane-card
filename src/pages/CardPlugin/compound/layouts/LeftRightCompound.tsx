import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "../../../../components/CardPlugin";
import React from "react";

const productLeft = {
  id: "lr-100",
  title: "轻便休闲运动鞋",
  description: "透气网面与轻量鞋底，适合通勤与慢跑",
  price: 289,
  image:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
  badge: "热卖",
  rating: 4.5,
  ratingCount: 920,
  inventory: 12,
};

const productRight = {
  id: "lr-200",
  title: "城市旅行背包",
  description: "多仓位设计，减重肩带，防泼水材质",
  price: 599,
  image:
    "https://picsum.photos/seed/backpack/800/800",
  badge: "甄选",
  rating: 4.7,
  ratingCount: 312,
  inventory: 7,
};

const LeftRightCompound: React.FC = () => {
  return (
    <DemoPage
      title="左右布局：图片 + 内容"
      description="左右分栏布局：左图右文 / 右图左文。通过组合子组件控制布局与结构。"
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* 左图右文 */}
        <div className="card" style={{ padding: 12 }}>
          <ProductCard productId={productLeft.id} data={productLeft}>
            <div style={{ display: "flex", alignItems: "stretch", gap: 12 }}>
              <div style={{ flex: "0 0 220px" }}>
                <ProductCard.Image style={{ width: 220, height: 220, borderRadius: 10, objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1, padding: 12 }}>
                <ProductCard.Badge />
                <ProductCard.Title />
                <ProductCard.Price />
                <ProductCard.Description />
                <ProductCard.Rating />
                <ProductCard.Inventory />
                <div style={{ marginTop: 8 }}>
                  <ProductCard.Actions />
                </div>
              </div>
            </div>
          </ProductCard>
        </div>

        {/* 右图左文 */}
        <div className="card" style={{ padding: 12 }}>
          <ProductCard productId={productRight.id} data={productRight}>
            <div style={{ display: "flex", alignItems: "stretch", gap: 12 }}>
              <div style={{ flex: 1, padding: 12 }}>
                <ProductCard.Badge />
                <ProductCard.Title />
                <ProductCard.Price />
                <ProductCard.Description />
                <ProductCard.Rating />
                <ProductCard.Inventory />
                <div style={{ marginTop: 8 }}>
                  <ProductCard.Actions />
                </div>
              </div>
              <div style={{ flex: "0 0 220px" }}>
                <ProductCard.Image style={{ width: 220, height: 220, borderRadius: 10, objectFit: "cover" }} />
              </div>
            </div>
          </ProductCard>
        </div>
      </div>
    </DemoPage>
  );
};

export default LeftRightCompound;
