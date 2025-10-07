import React from "react";
import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "../../../../components/CardPlugin";

const product = {
  id: "ui-title-desc-01",
  title: "夏季纯棉短袖 T 恤",
  description: "舒适亲肤，透气不闷，夏季出行优选",
  price: 99,
  image:
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop",
  brand: "VANE",
  tags: ["热卖", "夏季", "纯棉"],
  features: ["100% 纯棉", "透气快干", "不易变形"],
};

const TitleDescriptionDemo: React.FC = () => {
  return (
    <DemoPage
      title="UI 展示：标题 + 描述 + 标签/品牌"
      description="聚焦静态展示组件：Title/Description/Tags/Brand/FeatureList/Price 等，作为基础信息区。"
    >
      <div className="card" style={{ padding: 12 }}>
        <ProductCard productId={product.id} data={product}>
          <ProductCard.Image style={{ width: "100%", borderRadius: 8 }} />

          <div style={{ padding: 12 }}>
            <ProductCard.Title />
            <ProductCard.Description />
            <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
              <ProductCard.Tags />
              <ProductCard.Brand />
            </div>

            <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
              <ProductCard.FeatureList />
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ color: "#666", fontSize: 13 }}>到手价：</span>
                <ProductCard.Price style={{ fontSize: 20, fontWeight: 600 }} />
              </div>
            </div>
          </div>
        </ProductCard>
      </div>
    </DemoPage>
  );
};

export default TitleDescriptionDemo;