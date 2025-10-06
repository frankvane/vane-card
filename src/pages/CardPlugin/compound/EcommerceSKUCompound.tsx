import {
  ProductCard,
  createComparePricePlugin,
  createCouponPlugin,
  createCouponRecommendPlugin,
  createInventoryPlugin,
  createOrderSummaryPlugin,
  createPriceCalculatorPlugin,
  createSKUPlugin,
  createUserTagPlugin,
  createQuantityPlugin,
} from "../../../components/CardPlugin";

import DemoPage from "../_layout/DemoPage";
import React from "react";

const productData = {
  id: "eco-sku-01",
  title: "功能性运动外套",
  description: "轻盈防风，弹力面料，适合户外运动与通勤",
  price: 499,
  originalPrice: 599,
  image:
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
  inventory: 20,
  defaultAttrs: { 颜色: "黑", 尺码: "M" },
};

const attributes = [
  { name: "颜色", options: ["黑", "白", "蓝"] },
  { name: "尺码", options: ["M", "L"] },
];

const variants = [
  { sku: "JKT-BLK-M", attrs: { 颜色: "黑", 尺码: "M" }, price: 499, stock: 8, image: productData.image },
  { sku: "JKT-BLK-L", attrs: { 颜色: "黑", 尺码: "L" }, price: 499, stock: 6 },
  { sku: "JKT-WHT-M", attrs: { 颜色: "白", 尺码: "M" }, price: 489, stock: 4 },
  { sku: "JKT-WHT-L", attrs: { 颜色: "白", 尺码: "L" }, price: 489, stock: 2 },
  { sku: "JKT-BLU-M", attrs: { 颜色: "蓝", 尺码: "M" }, price: 519, stock: 0 },
  { sku: "JKT-BLU-L", attrs: { 颜色: "蓝", 尺码: "L" }, price: 519, stock: 0 },
];

const competitors = [
  { name: "平台A", price: 529 },
  { name: "平台B", price: 518 },
  { name: "平台C", price: 549 },
];

const coupons = [
  { code: "NEW10", discount: 10 },
  { code: "SPORT20", discount: 20 },
];

const userTags = [
  { label: "VIP", color: "#ffd54f" },
  { label: "收藏夹精选", color: "#80deea" },
  { label: "限时折扣", color: "#ffab91" },
];

const EcommerceSKUCompound: React.FC = () => {
  return (
    <DemoPage
      title="电商增强：SKU 选择 + 价格/比价/优惠/标签"
      description="通过 SKU 插件联动价格与库存，并展示比价、优惠券选择与用户标签覆盖。"
    >
      <div className="card" style={{ padding: 12 }}>
        <ProductCard
          productId={productData.id}
          data={productData}
          plugins={[
            createUserTagPlugin({ tags: userTags }),
            createInventoryPlugin({ lowStockThreshold: 5, showOverlayWhenSoldOut: true }),
            createSKUPlugin({ attributes, variants, renderIn: "footer" }),
            // 数量联动：变更规格时重置为可售范围，最大值降低时自动回退
            createQuantityPlugin({ renderIn: "footer", min: 1, resetOnVariantChange: true, clampOnMaxDecrease: true }),
            // 价格联动：展示总价；并在底部显示订单摘要（单价×数量−优惠券 等）
            createPriceCalculatorPlugin({ showOriginalPrice: true, currency: "CNY", showTotalPrice: true }),
            createOrderSummaryPlugin({ showBreakdown: true, showTax: false, showShipping: false, placement: "footer" }),
            // 比价增强：按价格升序、低于当前价高亮、设置高亮阈值
            createComparePricePlugin({ competitors, sortBy: "price", sortOrder: "asc", highlightLowerThanOurPrice: true, priceDiffHighlightThreshold: 10 }),
            // 优惠券：智能推荐最佳券，并保留手动选择能力
            createCouponRecommendPlugin({ coupons, autoApplyBest: true, currency: "CNY" }),
            createCouponPlugin({ coupons }),
          ]}
        >
          <ProductCard.Image style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 8 }} />
          <div style={{ padding: 12 }}>
            <ProductCard.Title />
            <ProductCard.Description />
            <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
              <ProductCard.Tags />
              <ProductCard.Brand />
            </div>
          </div>
          {/* Footer 由插件渲染：SKU 选择、价格计算、比价与优惠券 */}
        </ProductCard>
      </div>
    </DemoPage>
  );
};

export default EcommerceSKUCompound;