import {
  ProductCard,
  createSKUPlugin,
  createQuantityPlugin,
  createPriceCalculatorPlugin,
} from "../../../components/CardPlugin";

import DemoPage from "../_layout/DemoPage";
import React, { useState } from "react";
import type { OrderSummary } from "../../../components/CardPlugin";

const productData = {
  id: "order-summary-demo",
  title: "智能手机保护壳",
  description: "高品质TPU材质，全包边设计，有效保护手机",
  price: 39.9,
  oldPrice: 59.9,
  image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=800&auto=format&fit=crop",
  inventory: 50,
  sku: "CASE-001",
  defaultAttrs: { 颜色: "透明", 型号: "iPhone 15" },
};

const attributes = [
  { name: "颜色", options: ["透明", "黑色", "蓝色", "粉色"] },
  { name: "型号", options: ["iPhone 15", "iPhone 15 Pro", "iPhone 14", "iPhone 14 Pro"] },
];

const variants = [
  { sku: "CASE-CLR-15", attrs: { 颜色: "透明", 型号: "iPhone 15" }, price: 39.9, stock: 15 },
  { sku: "CASE-BLK-15", attrs: { 颜色: "黑色", 型号: "iPhone 15" }, price: 39.9, stock: 12 },
  { sku: "CASE-BLU-15", attrs: { 颜色: "蓝色", 型号: "iPhone 15" }, price: 42.9, stock: 8 },
  { sku: "CASE-PNK-15", attrs: { 颜色: "粉色", 型号: "iPhone 15" }, price: 42.9, stock: 6 },
  { sku: "CASE-CLR-15P", attrs: { 颜色: "透明", 型号: "iPhone 15 Pro" }, price: 44.9, stock: 10 },
  { sku: "CASE-BLK-15P", attrs: { 颜色: "黑色", 型号: "iPhone 15 Pro" }, price: 44.9, stock: 8 },
  { sku: "CASE-CLR-14", attrs: { 颜色: "透明", 型号: "iPhone 14" }, price: 35.9, stock: 20 },
  { sku: "CASE-BLK-14", attrs: { 颜色: "黑色", 型号: "iPhone 14" }, price: 35.9, stock: 18 },
];

const OrderSummaryDemo: React.FC = () => {
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);

  return (
    <DemoPage
      title="订单明细面板 - OrderSummaryPanel"
      description="展示订单明细面板组件，包含小计、税费、配送费、优惠等信息的计算和展示。"
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>
        {/* 左侧：商品卡片 */}
        <div className="card" style={{ padding: 16 }}>
          <ProductCard
            productId={productData.id}
            data={productData}
            plugins={[
              createSKUPlugin({ 
                attributes, 
                variants, 
                renderIn: "footer",
                onVariantChange: (variant) => {
                  console.log("规格变更:", variant);
                }
              }),
              createQuantityPlugin({ 
                renderIn: "footer", 
                min: 1, 
                max: 10,
                resetOnVariantChange: true,
                onQuantityChange: (quantity) => {
                  console.log("数量变更:", quantity);
                }
              }),
              createPriceCalculatorPlugin({ 
                showOriginalPrice: true, 
                currency: "CNY", 
                showTotalPrice: true 
              }),
            ]}
          >
            <ProductCard.Image style={{ width: "100%", aspectRatio: "4 / 3", borderRadius: 8 }} />
            <div style={{ padding: 16 }}>
              <ProductCard.Title style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }} />
              <ProductCard.Description style={{ color: "#666", marginBottom: 12 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <ProductCard.Price style={{ fontSize: 20, fontWeight: 700, color: "#d0021b" }} />
                <ProductCard.OldPrice style={{ fontSize: 16, color: "#999" }} />
                <ProductCard.Discount style={{ fontSize: 14, color: "#0a7f2e" }} />
              </div>
              <ProductCard.SKUCode style={{ marginBottom: 8 }} />
              <ProductCard.Inventory />
            </div>
            {/* Footer 由插件渲染：SKU 选择、数量选择 */}
          </ProductCard>
        </div>

        {/* 右侧：订单明细面板 */}
        <div style={{ position: "sticky", top: 20 }}>
          <ProductCard
            productId={productData.id}
            data={productData}
            plugins={[
              createSKUPlugin({ attributes, variants }),
              createQuantityPlugin({ min: 1, max: 10 }),
            ]}
          >
            <ProductCard.OrderSummaryPanel
              showTax={true}
              showShipping={true}
              showDiscount={true}
              taxRate={0.06}
              shippingFee={8}
              freeShippingThreshold={99}
              currency="¥"
              onOrderChange={setOrderSummary}
              style={{ marginBottom: 16 }}
            />
          </ProductCard>

          {/* 订单信息展示 */}
          {orderSummary && (
            <div
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: 8,
                padding: 16,
                background: "#f8f9fa",
              }}
            >
              <h4 style={{ margin: "0 0 12px 0", fontSize: 14, color: "#333" }}>
                订单数据 (JSON)
              </h4>
              <pre
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "#666",
                  background: "#fff",
                  padding: 12,
                  borderRadius: 6,
                  border: "1px solid #eee",
                  overflow: "auto",
                  maxHeight: 200,
                }}
              >
                {JSON.stringify(orderSummary, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* 功能说明 */}
      <div style={{ marginTop: 32, padding: 20, background: "#f8f9fa", borderRadius: 8 }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>
          OrderSummaryPanel 功能特性
        </h3>
        <ul style={{ margin: 0, paddingLeft: 20, color: "#666", lineHeight: 1.6 }}>
          <li><strong>动态计算：</strong>根据商品价格、数量、税率等自动计算订单总额</li>
          <li><strong>优惠展示：</strong>显示原价与现价的差额作为优惠金额</li>
          <li><strong>税费计算：</strong>支持自定义税率，可选择是否显示税费</li>
          <li><strong>配送费用：</strong>支持免邮门槛设置，达到门槛自动免邮</li>
          <li><strong>实时更新：</strong>商品规格或数量变更时，订单明细实时更新</li>
          <li><strong>数据回调：</strong>通过 onOrderChange 回调获取完整的订单数据</li>
          <li><strong>样式定制：</strong>支持自定义样式和货币符号</li>
        </ul>
      </div>
    </DemoPage>
  );
};

export default OrderSummaryDemo;