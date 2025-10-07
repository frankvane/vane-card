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

// 配送估算示例数据
const regions = [
  { code: "CN-NORTH", name: "华北地区", baseFee: 1200, extraPerKg: 200, etaDays: 2 },
  { code: "CN-EAST", name: "华东地区", baseFee: 1000, extraPerKg: 150, etaDays: 2 },
  { code: "CN-SOUTH", name: "华南地区", baseFee: 1300, extraPerKg: 200, etaDays: 3 },
  { code: "INTL", name: "国际配送", baseFee: 4800, extraPerKg: 800, etaDays: 7 },
];

const methods = [
  { code: "standard", name: "标准快递", multiplier: 1, etaOffset: 0 },
  { code: "express", name: "加急快递", multiplier: 1.4, etaOffset: -1 },
  { code: "eco", name: "经济物流", multiplier: 0.8, etaOffset: +2 },
];

// 搭配购示例数据（单位分）
const bundles = [
  {
    id: "bundle-1",
    title: "外套 + 防水喷雾",
    items: [
      { id: "jkt", title: "功能性运动外套", price: 49900, image: productData.image },
      { id: "spray", title: "防水喷雾 200ml", price: 5900 },
    ],
    bundlePrice: 52800,
  },
  {
    id: "bundle-2",
    title: "外套 + 清洁剂 + 刷子",
    items: [
      { id: "jkt", title: "功能性运动外套", price: 49900, image: productData.image },
      { id: "clean", title: "泡沫清洁剂", price: 3900 },
      { id: "brush", title: "软毛刷", price: 2900 },
    ],
    savingsPercent: 12,
  },
];

const EcommerceSKUCompound: React.FC = () => {
  const [etaDays, setEtaDays] = React.useState<number | null>(null);
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
          {/* 规格联动主图（支持手动切换缩略图） */}
          <ProductCard.VariantMediaSwitcher layout="vertical" thumbnailSize="small" aspectRatio="1 / 1" showBorder enableManualSwitch />
          <div style={{ padding: 12 }}>
            <ProductCard.Title />
            <ProductCard.Description />
            <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
              <ProductCard.Tags />
              <ProductCard.Brand />
            </div>

            {/* 基础信息区 */}
            <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
              <ProductCard.Inventory />
              <ProductCard.SKUCode />
            </div>

            {/* 配送估算与时间线联动 */}
            <ProductCard.Section title="配送与到达时间" />
            <div style={{ display: "grid", gap: 12 }}>
              <ProductCard.ShippingEstimator
                regions={regions}
                methods={methods}
                weightFromData
                unitWeightKgFallback={0.5}
                showBreakdown
                onEstimateChange={(r) => setEtaDays(r.etaDays)}
              />
              <ProductCard.DeliveryTimeline etaDays={etaDays ?? 5} skipWeekends showDateRange />
            </div>

            {/* 退换政策 */}
            <ProductCard.Section title="售后与退换" />
            <ProductCard.ReturnPolicy
              windowDays={30}
              allowReturn
              allowExchange
              freeReturnWithinDays={7}
              restockingFeePercent={0}
              contactInfo="客服热线：400-123-4567"
              policyLink="#"
            />

            {/* 搭配购 */}
            <ProductCard.Section title="搭配购推荐" />
            <ProductCard.UpsellBundle bundles={bundles} onAddBundle={(b) => console.log("选择搭配购", b)} />

            {/* 可访问性工具栏 */}
            <ProductCard.Section title="可访问性设置" />
            <ProductCard.A11yToolbar />
          </div>
          {/* Footer 由插件渲染：SKU 选择、价格计算、比价与优惠券 */}
        </ProductCard>
      </div>
    </DemoPage>
  );
};

export default EcommerceSKUCompound;