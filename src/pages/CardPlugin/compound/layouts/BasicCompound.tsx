import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "vane-card";
import React from "react";

const mockProductA = {
  id: "p-1001",
  title: "轻跑透气运动鞋",
  subtitle: "轻量缓震｜透气网面",
  description: "柔软舒适，适合长跑与日常穿着",
  price: 349,
  oldPrice: 399,
  image:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
  badge: "热卖",
  brand: "Vane",
  tags: ["轻量", "透气", "缓震"],
  shippingInfo: "全国包邮，48小时内发货",
  warranty: "一年质保，七天无理由退换",
  rating: 4.6,
  ratingCount: 1287,
  inventory: 3,
  // 新增用于展示的数据
  features: ["轻量鞋身", "缓震中底", "透气网面"],
  specs: { 材质: "网面+EVA", 鞋底: "橡胶", 产地: "中国" },
  sku: "SKU-SPORT-1001",
  badges: ["热卖", "限时折扣", "正品保障"],
  weight: 0.35, // kg，用于单价显示
  colors: ["#1e90ff", "#ff4757", "#2ed573"],
  sizes: ["38", "39", "40", "41", "42"],
  // 变体数组：每个组合具备独立的 price/oldPrice/stock/sku，可被选择器与子组件联动
  variants: [
    // 为现有变体增加“材质/特性”默认值，以保证选择器与 SKU 匹配
    { sku: "SKU-SPORT-1001-B-38", options: { 颜色: "蓝", 尺码: "38", 材质: "网面", 特性: "轻量鞋身" }, price: 349, oldPrice: 399, stock: 2 },
    { sku: "SKU-SPORT-1001-B-39", options: { 颜色: "蓝", 尺码: "39", 材质: "网面", 特性: "轻量鞋身" }, price: 349, oldPrice: 399, stock: 1 },
    { sku: "SKU-SPORT-1001-B-40", options: { 颜色: "蓝", 尺码: "40", 材质: "网面", 特性: "轻量鞋身" }, price: 359, oldPrice: 399, stock: 0 },
    { sku: "SKU-SPORT-1001-R-38", options: { 颜色: "红", 尺码: "38", 材质: "网面", 特性: "轻量鞋身" }, price: 339, oldPrice: 399, stock: 5 },
    { sku: "SKU-SPORT-1001-R-39", options: { 颜色: "红", 尺码: "39", 材质: "网面", 特性: "轻量鞋身" }, price: 339, oldPrice: 399, stock: 3 },
    { sku: "SKU-SPORT-1001-R-40", options: { 颜色: "红", 尺码: "40", 材质: "网面", 特性: "轻量鞋身" }, price: 349, oldPrice: 399, stock: 1 },
    { sku: "SKU-SPORT-1001-G-38", options: { 颜色: "绿", 尺码: "38", 材质: "网面", 特性: "轻量鞋身" }, price: 329, oldPrice: 399, stock: 0 },
    { sku: "SKU-SPORT-1001-G-39", options: { 颜色: "绿", 尺码: "39", 材质: "网面", 特性: "轻量鞋身" }, price: 329, oldPrice: 399, stock: 4 },
    { sku: "SKU-SPORT-1001-G-40", options: { 颜色: "绿", 尺码: "40", 材质: "网面", 特性: "轻量鞋身" }, price: 339, oldPrice: 399, stock: 2 },
    // 新增少量不同“材质/特性”的变体，用于演示变体维度扩展
    { sku: "SKU-SPORT-1001-B-38-LEATHER-CUSH", options: { 颜色: "蓝", 尺码: "38", 材质: "皮革", 特性: "缓震中底" }, price: 379, oldPrice: 399, stock: 3 },
    { sku: "SKU-SPORT-1001-R-39-FABRIC-BREATH", options: { 颜色: "红", 尺码: "39", 材质: "织物", 特性: "透气网面" }, price: 349, oldPrice: 399, stock: 2 },
  ],
};

const BasicCompound: React.FC = () => {
  return (
    <DemoPage
      title="基础：复合组件"
      description="使用 ProductCard.* 子组件直接构建卡片结构，无插件。"
    >
      <div className="card" style={{ padding: 16, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <ProductCard productId={mockProductA.id} data={mockProductA}>
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16 }}>
            <ProductCard.Image style={{ width: 280, height: 280, borderRadius: 12, objectFit: "cover" }} />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ProductCard.Badge />
                <ProductCard.Title />
              </div>
              <ProductCard.Subtitle style={{ color: "#666" }} />
              <ProductCard.Description style={{ marginTop: 8, color: "#444" }} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 10 }}>
                <ProductCard.FeatureList />
                <ProductCard.SpecsTable />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                <ProductCard.SKUCode />
                <ProductCard.BadgeGroup />
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 10 }}>
                <ProductCard.Price />
                <ProductCard.OldPrice />
                <ProductCard.Discount />
              </div>
              <ProductCard.PricePerUnit unitLabel="元/公斤" />

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
                <ProductCard.Tags />
                <ProductCard.Brand />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <ProductCard.Shipping />
                <ProductCard.Warranty />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <ProductCard.Rating />
                <ProductCard.Inventory />
              </div>

              <ProductCard.Section title="选择属性" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {/* 统一属性键名与变体一致，让选择影响 SKU 匹配 */}
                <ProductCard.ColorSwatches
                  attributeName="颜色"
                  colors={[
                    { name: "蓝", hex: "#1e90ff" },
                    { name: "红", hex: "#ff4757" },
                    { name: "绿", hex: "#2ed573" },
                  ]}
                />
                <ProductCard.SizeSelector attributeName="尺码" sizes={["38", "39", "40"]} />
                {/* 将 features/specs 加入 SKU 维度：示例用“特性/材质” */}
                <ProductCard.OptionPicker name="特性" options={["轻量鞋身", "缓震中底", "透气网面"]} />
                <ProductCard.OptionPicker name="材质" options={["网面", "皮革", "织物"]} />
                {/* 若希望自动推导所有属性集，可继续保留 VariantSelector */}
                <ProductCard.VariantSelector />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
                <span style={{ color: "#666", fontSize: 13 }}>数量：</span>
                {/* 不传 available：由 QuantityStepper 自动从 data.inventory 或选中变体推断 */}
                <ProductCard.QuantityStepper />
              </div>

              <div style={{ marginTop: 12 }}>
                <ProductCard.SelectedInfo />
              </div>

              <ProductCard.Divider />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
                <ProductCard.Actions />
              </div>
            </div>
          </div>
        </ProductCard>
      </div>
    </DemoPage>
  );
};

export default BasicCompound;
