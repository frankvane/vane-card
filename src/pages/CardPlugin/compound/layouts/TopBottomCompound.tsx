import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "vane-card";
import React from "react";

const productTop = {
  id: "tb-100",
  title: "户外保温水壶",
  description: "双层不锈钢，长效保温保冷，防漏设计",
  price: 129,
  image:
    "https://images.unsplash.com/photo-1549388604-817d15aa0110?q=80&w=800&auto=format&fit=crop",
  badge: "NEW",
  rating: 4.3,
  ratingCount: 210,
  inventory: 40,
};

const productBottom = {
  id: "tb-200",
  title: "蓝牙降噪耳机",
  description: "主动降噪，低延迟，长续航",
  price: 799,
  image:
    "https://picsum.photos/seed/headphones/800/800",
  badge: "HOT",
  rating: 4.6,
  ratingCount: 1890,
  inventory: 18,
};

const TopBottomCompound: React.FC = () => {
  return (
    <DemoPage
      title="上下布局：图片在上/下"
      description="上下堆叠布局：上图下文 / 上文下图。通过复合组件子元素顺序控制布局。"
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* 上图下文 */}
        <div className="card" style={{ padding: 12 }}>
          <ProductCard productId={productTop.id} data={productTop}>
            <ProductCard.Image style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 10, objectFit: "cover" }} />
            <div style={{ padding: 12 }}>
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
          </ProductCard>
        </div>

        {/* 上文下图 */}
        <div className="card" style={{ padding: 12 }}>
          <ProductCard productId={productBottom.id} data={productBottom}>
            <div style={{ padding: 12 }}>
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
            <ProductCard.Image style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 10, objectFit: "cover" }} />
          </ProductCard>
        </div>
      </div>
    </DemoPage>
  );
};

export default TopBottomCompound;
