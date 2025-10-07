import React from "react";
import DemoPage from "../_layout/DemoPage";
import {
  ProductCard,
  createQuantityPlugin,
} from "../../../components/CardPlugin";

const productData = {
  id: "coupon-bar-demo",
  title: "便携蓝牙音箱",
  description: "立体声，小巧便携，支持防水",
  price: 299,
  oldPrice: 399,
  image:
    "https://images.unsplash.com/photo-1545454675-3531c012ea89?q=80&w=800&auto=format&fit=crop",
  inventory: 20,
  sku: "SPEAKER-001",
};

const coupons = [
  {
    id: "c1",
    title: "满200减20",
    description: "单笔订单满200元立减20元",
    discount: 20,
    discountType: "amount" as const,
    minAmount: 200,
    expiry: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    isApplied: false,
  },
  {
    id: "c2",
    title: "9折优惠",
    description: "限时全场九折，部分商品除外",
    discount: 9,
    discountType: "percentage" as const,
    minAmount: 0,
    code: "SALE10",
    expiry: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
    isApplied: false,
  },
  {
    id: "c3",
    title: "满500减80",
    description: "购物满500可立减80元",
    discount: 80,
    discountType: "amount" as const,
    minAmount: 500,
    expiry: new Date(Date.now() + 10 * 24 * 3600 * 1000).toISOString(),
    isApplied: false,
  },
];

const CouponBarDemo: React.FC = () => {
  return (
    <DemoPage
      title="优惠信息条 - CouponBar"
      description="展示优惠券信息与促销活动，支持横向/纵向布局、展示优惠码及过期时间。"
    >
      <div style={{ display: "grid", gap: 24 }}>
        {/* 基础示例 */}
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>
            基础示例（随数量联动）
          </h3>
          <ProductCard
            productId={productData.id}
            data={productData}
            plugins={[createQuantityPlugin({ renderIn: "footer", min: 1, max: 5 })]}
          >
            <ProductCard.Image style={{ width: "100%", aspectRatio: "4 / 3", borderRadius: 8 }} />
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <ProductCard.Title style={{ fontSize: 18, fontWeight: 600 }} />
                <ProductCard.Price style={{ fontSize: 20, fontWeight: 700, color: "#d0021b" }} />
                <ProductCard.OldPrice style={{ fontSize: 16, color: "#999" }} />
              </div>
              <ProductCard.Description style={{ color: "#666", marginBottom: 12 }} />
              <ProductCard.CouponBar coupons={coupons} showExpiry showCode maxVisible={3} />
            </div>
          </ProductCard>
        </div>

        {/* 布局变体 */}
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>布局变体</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            <div style={{ padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
              <h4 style={{ margin: 0, fontSize: 14 }}>横向布局</h4>
              <ProductCard productId="coupon-horizontal" data={productData}>
                <ProductCard.CouponBar coupons={coupons} layout="horizontal" />
              </ProductCard>
            </div>
            <div style={{ padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
              <h4 style={{ margin: 0, fontSize: 14 }}>纵向布局</h4>
              <ProductCard productId="coupon-vertical" data={productData}>
                <ProductCard.CouponBar coupons={coupons} layout="vertical" />
              </ProductCard>
            </div>
          </div>
        </div>

        {/* 主题与尺寸 */}
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>主题与尺寸</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <ProductCard productId="coupon-primary" data={productData}>
              <ProductCard.CouponBar coupons={coupons} theme="primary" size="small" />
            </ProductCard>
            <ProductCard productId="coupon-success" data={productData}>
              <ProductCard.CouponBar coupons={coupons} theme="success" size="medium" />
            </ProductCard>
            <ProductCard productId="coupon-warning" data={productData}>
              <ProductCard.CouponBar coupons={coupons} theme="warning" size="large" />
            </ProductCard>
          </div>
        </div>

        {/* 可用性与更多提示 */}
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>可用性与更多提示</h3>
          <ProductCard productId="coupon-more" data={productData}>
            <ProductCard.CouponBar coupons={[...coupons, { id: "c4", title: "满800减120", discount: 120, discountType: "amount", minAmount: 800 }]} />
          </ProductCard>
        </div>
      </div>

      {/* 功能说明 */}
      <div style={{ marginTop: 32, padding: 20, background: "#f8f9fa", borderRadius: 8 }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>CouponBar 功能特性</h3>
        <ul style={{ margin: 0, paddingLeft: 20, color: "#666", lineHeight: 1.6 }}>
          <li>根据商品价格与数量，自动判定优惠券可用性</li>
          <li>支持横向与纵向布局，适配不同页面结构</li>
          <li>支持显示优惠码与过期时间，信息更完整</li>
          <li>提供主题与尺寸选项，易于风格化定制</li>
          <li>点击优惠券可展开详情，显示使用条件与说明</li>
        </ul>
      </div>
    </DemoPage>
  );
};

export default CouponBarDemo;