import {
  ProductCard,
  createPriceCalculatorPlugin,
  createQuantityPlugin,
  createSKUPlugin,
} from "vane-card";

import DemoPage from "../../_layout/DemoPage";
import React from "react";

const productData = {
  id: "savings-badge-demo",
  title: "无线蓝牙耳机",
  description: "高品质音效，长续航，舒适佩戴",
  price: 199,
  oldPrice: 299,
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
  inventory: 30,
  sku: "EARPHONE-001",
  defaultAttrs: { 颜色: "黑色", 版本: "标准版" },
};

const attributes = [
  { name: "颜色", options: ["黑色", "白色", "蓝色"] },
  { name: "版本", options: ["标准版", "专业版"] },
];

const variants = [
  { sku: "EP-BLK-STD", attrs: { 颜色: "黑色", 版本: "标准版" }, price: 199, oldPrice: 299, stock: 15 },
  { sku: "EP-WHT-STD", attrs: { 颜色: "白色", 版本: "标准版" }, price: 199, oldPrice: 299, stock: 12 },
  { sku: "EP-BLU-STD", attrs: { 颜色: "蓝色", 版本: "标准版" }, price: 209, oldPrice: 319, stock: 8 },
  { sku: "EP-BLK-PRO", attrs: { 颜色: "黑色", 版本: "专业版" }, price: 299, oldPrice: 399, stock: 10 },
  { sku: "EP-WHT-PRO", attrs: { 颜色: "白色", 版本: "专业版" }, price: 299, oldPrice: 399, stock: 6 },
  { sku: "EP-BLU-PRO", attrs: { 颜色: "蓝色", 版本: "专业版" }, price: 319, oldPrice: 429, stock: 4 },
];

const SavingsBadgeDemo: React.FC = () => {
  return (
    <DemoPage
      title="节省金额徽章 - SavingsBadge"
      description="展示节省金额徽章组件，支持多种样式、尺寸和显示模式。"
    >
      <div style={{ display: "grid", gap: 24 }}>
        {/* 基础示例 */}
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>基础示例</h3>
          <ProductCard
            productId={productData.id}
            data={productData}
            plugins={[
              createSKUPlugin({ attributes, variants, renderIn: "footer" }),
              createQuantityPlugin({ renderIn: "footer", min: 1, max: 5 }),
              createPriceCalculatorPlugin({ showOriginalPrice: true, currency: "CNY" }),
            ]}
          >
            <ProductCard.Image style={{ width: "100%", aspectRatio: "4 / 3", borderRadius: 8 }} />
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <ProductCard.Title style={{ fontSize: 18, fontWeight: 600 }} />
                <ProductCard.SavingsBadge />
              </div>
              <ProductCard.Description style={{ color: "#666", marginBottom: 12 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <ProductCard.Price style={{ fontSize: 20, fontWeight: 700, color: "#d0021b" }} />
                <ProductCard.OldPrice style={{ fontSize: 16, color: "#999" }} />
              </div>
            </div>
          </ProductCard>
        </div>

        {/* 样式变体 */}
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>样式变体</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {/* Pill 样式 */}
            <div style={{ textAlign: "center" }}>
              <ProductCard productId="demo-pill" data={productData}>
                <ProductCard.SavingsBadge badgeStyle="pill" size="medium" />
              </ProductCard>
              <p style={{ margin: "8px 0 0 0", fontSize: 12, color: "#666" }}>Pill 样式</p>
            </div>

            {/* Rounded 样式 */}
            <div style={{ textAlign: "center" }}>
              <ProductCard productId="demo-rounded" data={productData}>
                <ProductCard.SavingsBadge badgeStyle="rounded" size="medium" />
              </ProductCard>
              <p style={{ margin: "8px 0 0 0", fontSize: 12, color: "#666" }}>Rounded 样式</p>
            </div>

            {/* Square 样式 */}
            <div style={{ textAlign: "center" }}>
              <ProductCard productId="demo-square" data={productData}>
                <ProductCard.SavingsBadge badgeStyle="square" size="medium" />
              </ProductCard>
              <p style={{ margin: "8px 0 0 0", fontSize: 12, color: "#666" }}>Square 样式</p>
            </div>
          </div>
        </div>

        {/* 尺寸变体 */}
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>尺寸变体</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, color: "#666" }}>小号:</span>
              <ProductCard productId="demo-small" data={productData}>
                <ProductCard.SavingsBadge size="small" />
              </ProductCard>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, color: "#666" }}>中号:</span>
              <ProductCard productId="demo-medium" data={productData}>
                <ProductCard.SavingsBadge size="medium" />
              </ProductCard>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, color: "#666" }}>大号:</span>
              <ProductCard productId="demo-large" data={productData}>
                <ProductCard.SavingsBadge size="large" />
              </ProductCard>
            </div>
          </div>
        </div>

        {/* 显示模式 */}
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>显示模式</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, color: "#666" }}>仅金额:</span>
              <ProductCard productId="demo-amount" data={productData}>
                <ProductCard.SavingsBadge showAmount={true} showPercentage={false} />
              </ProductCard>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, color: "#666" }}>仅百分比:</span>
              <ProductCard productId="demo-percentage" data={productData}>
                <ProductCard.SavingsBadge showAmount={false} showPercentage={true} />
              </ProductCard>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, color: "#666" }}>金额+百分比:</span>
              <ProductCard productId="demo-both" data={productData}>
                <ProductCard.SavingsBadge showAmount={true} showPercentage={true} />
              </ProductCard>
            </div>
          </div>
        </div>

        {/* 自定义颜色 */}
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>自定义颜色</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <ProductCard productId="demo-red" data={productData}>
              <ProductCard.SavingsBadge backgroundColor="#d0021b" color="#fff" />
            </ProductCard>
            <ProductCard productId="demo-green" data={productData}>
              <ProductCard.SavingsBadge backgroundColor="#0a7f2e" color="#fff" />
            </ProductCard>
            <ProductCard productId="demo-blue" data={productData}>
              <ProductCard.SavingsBadge backgroundColor="#1976d2" color="#fff" />
            </ProductCard>
            <ProductCard productId="demo-orange" data={productData}>
              <ProductCard.SavingsBadge backgroundColor="#ff9800" color="#fff" />
            </ProductCard>
          </div>
        </div>

        {/* 数量联动示例 */}
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>数量联动示例</h3>
          <ProductCard
            productId="quantity-demo"
            data={productData}
            plugins={[
              createQuantityPlugin({ min: 1, max: 10, renderIn: "footer" }),
              createPriceCalculatorPlugin({ showTotalPrice: true }),
            ]}
          >
            <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 16, fontWeight: 600 }}>数量变化时节省金额自动更新</span>
                <ProductCard.SavingsBadge />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <ProductCard.Price style={{ fontSize: 18, fontWeight: 700, color: "#d0021b" }} />
                <ProductCard.OldPrice style={{ fontSize: 14, color: "#999" }} />
              </div>
            </div>
          </ProductCard>
        </div>
      </div>

      {/* 功能说明 */}
      <div style={{ marginTop: 32, padding: 20, background: "#f8f9fa", borderRadius: 8 }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>
          SavingsBadge 功能特性
        </h3>
        <ul style={{ margin: 0, paddingLeft: 20, color: "#666", lineHeight: 1.6 }}>
          <li><strong>自动计算：</strong>根据原价和现价自动计算节省金额和百分比</li>
          <li><strong>数量联动：</strong>支持数量变化时自动更新总节省金额</li>
          <li><strong>多种样式：</strong>支持 pill、rounded、square 三种边框样式</li>
          <li><strong>尺寸选择：</strong>提供 small、medium、large 三种尺寸</li>
          <li><strong>显示模式：</strong>可选择显示金额、百分比或两者</li>
          <li><strong>自定义颜色：</strong>支持自定义背景色和文字颜色</li>
          <li><strong>最小阈值：</strong>支持设置最小节省金额，低于阈值不显示</li>
          <li><strong>工具提示：</strong>鼠标悬停显示详细的价格对比信息</li>
        </ul>
      </div>
    </DemoPage>
  );
};

export default SavingsBadgeDemo;