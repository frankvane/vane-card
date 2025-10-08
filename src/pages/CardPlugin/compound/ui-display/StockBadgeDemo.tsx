import {
  ProductCard,
  createInventoryPlugin,
  createQuantityPlugin,
  createSKUPlugin,
} from "vane-card";

import DemoPage from "../../_layout/DemoPage";
import React from "react";

const productData = {
  id: "stock-badge-demo",
  title: "智能手表",
  description: "多功能运动手表，健康监测，长续航",
  price: 899,
  oldPrice: 1299,
  image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
  inventory: 5, // 低库存示例
  sku: "WATCH-001",
  defaultAttrs: { 颜色: "黑色", 尺寸: "42mm" },
};

const attributes = [
  { name: "颜色", options: ["黑色", "白色", "蓝色"] },
  { name: "尺寸", options: ["38mm", "42mm", "46mm"] },
];

const variants = [
  { sku: "WATCH-BLK-38", attrs: { 颜色: "黑色", 尺寸: "38mm" }, price: 899, stock: 0 }, // 缺货
  { sku: "WATCH-BLK-42", attrs: { 颜色: "黑色", 尺寸: "42mm" }, price: 899, stock: 5 }, // 低库存
  { sku: "WATCH-BLK-46", attrs: { 颜色: "黑色", 尺寸: "46mm" }, price: 999, stock: 25 }, // 正常库存
  { sku: "WATCH-WHT-38", attrs: { 颜色: "白色", 尺寸: "38mm" }, price: 899, stock: 3 }, // 低库存
  { sku: "WATCH-WHT-42", attrs: { 颜色: "白色", 尺寸: "42mm" }, price: 899, stock: 15 }, // 正常库存
  { sku: "WATCH-WHT-46", attrs: { 颜色: "白色", 尺寸: "46mm" }, price: 999, stock: 8 }, // 低库存
  { sku: "WATCH-BLU-38", attrs: { 颜色: "蓝色", 尺寸: "38mm" }, price: 899, stock: 20 }, // 正常库存
  { sku: "WATCH-BLU-42", attrs: { 颜色: "蓝色", 尺寸: "42mm" }, price: 899, stock: 1 }, // 低库存
  { sku: "WATCH-BLU-46", attrs: { 颜色: "蓝色", 尺寸: "46mm" }, price: 999, stock: 0 }, // 缺货
];

const StockBadgeDemo: React.FC = () => {
  return (
    <DemoPage
      title="库存提示徽章 - StockBadge"
      description="展示库存状态徽章组件，支持多种样式、尺寸和显示模式。"
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
              createInventoryPlugin({}),
            ]}
          >
            <ProductCard.Image style={{ width: "100%", aspectRatio: "4 / 3", borderRadius: 8 }} />
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <ProductCard.Title style={{ fontSize: 18, fontWeight: 600 }} />
                <ProductCard.StockBadge />
              </div>
              <ProductCard.Description style={{ color: "#666", marginBottom: 12 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <ProductCard.Price style={{ fontSize: 20, fontWeight: 700, color: "#d0021b" }} />
                <ProductCard.OldPrice style={{ fontSize: 16, color: "#999" }} />
              </div>
              <div style={{ marginTop: 12, fontSize: 14, color: "#666" }}>
                选择不同规格查看库存状态变化
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
              <ProductCard productId="demo-pill" data={{ ...productData, inventory: 3 }}>
                <ProductCard.StockBadge badgeStyle="pill" size="medium" />
              </ProductCard>
              <p style={{ margin: "8px 0 0 0", fontSize: 12, color: "#666" }}>Pill 样式</p>
            </div>

            {/* Rounded 样式 */}
            <div style={{ textAlign: "center" }}>
              <ProductCard productId="demo-rounded" data={{ ...productData, inventory: 3 }}>
                <ProductCard.StockBadge badgeStyle="rounded" size="medium" />
              </ProductCard>
              <p style={{ margin: "8px 0 0 0", fontSize: 12, color: "#666" }}>Rounded 样式</p>
            </div>

            {/* Square 样式 */}
            <div style={{ textAlign: "center" }}>
              <ProductCard productId="demo-square" data={{ ...productData, inventory: 3 }}>
                <ProductCard.StockBadge badgeStyle="square" size="medium" />
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
              <ProductCard productId="demo-small" data={{ ...productData, inventory: 3 }}>
                <ProductCard.StockBadge size="small" />
              </ProductCard>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, color: "#666" }}>中号:</span>
              <ProductCard productId="demo-medium" data={{ ...productData, inventory: 3 }}>
                <ProductCard.StockBadge size="medium" />
              </ProductCard>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, color: "#666" }}>大号:</span>
              <ProductCard productId="demo-large" data={{ ...productData, inventory: 3 }}>
                <ProductCard.StockBadge size="large" />
              </ProductCard>
            </div>
          </div>
        </div>

        {/* 库存状态示例 */}
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>库存状态示例</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {/* 缺货 */}
            <div style={{ textAlign: "center", padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
              <ProductCard productId="demo-out-of-stock" data={{ ...productData, inventory: 0 }}>
                <ProductCard.StockBadge showQuantity={true} />
              </ProductCard>
              <p style={{ margin: "8px 0 0 0", fontSize: 12, color: "#666" }}>缺货状态</p>
            </div>

            {/* 低库存 */}
            <div style={{ textAlign: "center", padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
              <ProductCard productId="demo-low-stock" data={{ ...productData, inventory: 3 }}>
                <ProductCard.StockBadge showQuantity={true} lowStockThreshold={5} />
              </ProductCard>
              <p style={{ margin: "8px 0 0 0", fontSize: 12, color: "#666" }}>低库存状态</p>
            </div>

            {/* 正常库存 */}
            <div style={{ textAlign: "center", padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
              <ProductCard productId="demo-in-stock" data={{ ...productData, inventory: 50 }}>
                <ProductCard.StockBadge showQuantity={true} />
              </ProductCard>
              <p style={{ margin: "8px 0 0 0", fontSize: 12, color: "#666" }}>正常库存</p>
            </div>
          </div>
        </div>

        {/* 显示模式 */}
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>显示模式</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, color: "#666" }}>不显示数量:</span>
              <ProductCard productId="demo-no-quantity" data={{ ...productData, inventory: 3 }}>
                <ProductCard.StockBadge showQuantity={false} />
              </ProductCard>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, color: "#666" }}>显示数量:</span>
              <ProductCard productId="demo-with-quantity" data={{ ...productData, inventory: 3 }}>
                <ProductCard.StockBadge showQuantity={true} />
              </ProductCard>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, color: "#666" }}>库存充足时隐藏:</span>
              <ProductCard productId="demo-hide-when-in-stock" data={{ ...productData, inventory: 50 }}>
                <ProductCard.StockBadge hideWhenInStock={true} />
              </ProductCard>
              <span style={{ fontSize: 12, color: "#999" }}>(不显示)</span>
            </div>
          </div>
        </div>

        {/* 自定义颜色方案 */}
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>自定义颜色方案</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, color: "#666" }}>成功色:</span>
              <ProductCard productId="demo-success" data={{ ...productData, inventory: 50 }}>
                <ProductCard.StockBadge colorScheme="success" />
              </ProductCard>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, color: "#666" }}>警告色:</span>
              <ProductCard productId="demo-warning" data={{ ...productData, inventory: 3 }}>
                <ProductCard.StockBadge colorScheme="warning" />
              </ProductCard>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, color: "#666" }}>危险色:</span>
              <ProductCard productId="demo-danger" data={{ ...productData, inventory: 0 }}>
                <ProductCard.StockBadge colorScheme="danger" />
              </ProductCard>
            </div>
          </div>
        </div>

        {/* 自定义文本 */}
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>自定义文本</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <ProductCard productId="demo-custom-text-1" data={{ ...productData, inventory: 0 }}>
              <ProductCard.StockBadge
                outOfStockText="售罄"
                lowStockText="仅剩少量"
                inStockText="有货"
              />
            </ProductCard>
            <ProductCard productId="demo-custom-text-2" data={{ ...productData, inventory: 3 }}>
              <ProductCard.StockBadge
                outOfStockText="售罄"
                lowStockText="仅剩少量"
                inStockText="有货"
                showQuantity={true}
              />
            </ProductCard>
            <ProductCard productId="demo-custom-text-3" data={{ ...productData, inventory: 50 }}>
              <ProductCard.StockBadge
                outOfStockText="售罄"
                lowStockText="仅剩少量"
                inStockText="有货"
              />
            </ProductCard>
          </div>
        </div>

        {/* 自定义阈值 */}
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>自定义低库存阈值</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, color: "#666" }}>阈值=5 (库存8):</span>
              <ProductCard productId="demo-threshold-1" data={{ ...productData, inventory: 8 }}>
                <ProductCard.StockBadge lowStockThreshold={5} showQuantity={true} />
              </ProductCard>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, color: "#666" }}>阈值=10 (库存8):</span>
              <ProductCard productId="demo-threshold-2" data={{ ...productData, inventory: 8 }}>
                <ProductCard.StockBadge lowStockThreshold={10} showQuantity={true} />
              </ProductCard>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, color: "#666" }}>阈值=20 (库存8):</span>
              <ProductCard productId="demo-threshold-3" data={{ ...productData, inventory: 8 }}>
                <ProductCard.StockBadge lowStockThreshold={20} showQuantity={true} />
              </ProductCard>
            </div>
          </div>
        </div>
      </div>

      {/* 功能说明 */}
      <div style={{ marginTop: 32, padding: 20, background: "#f8f9fa", borderRadius: 8 }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>
          StockBadge 功能特性
        </h3>
        <ul style={{ margin: 0, paddingLeft: 20, color: "#666", lineHeight: 1.6 }}>
          <li><strong>智能状态识别：</strong>自动根据库存数量判断缺货、低库存、正常库存状态</li>
          <li><strong>SKU 联动：</strong>支持 SKU 切换时自动更新对应规格的库存状态</li>
          <li><strong>多种样式：</strong>支持 pill、rounded、square 三种边框样式</li>
          <li><strong>尺寸选择：</strong>提供 small、medium、large 三种尺寸</li>
          <li><strong>颜色方案：</strong>支持自动颜色或指定颜色方案（success、warning、danger）</li>
          <li><strong>显示控制：</strong>可选择是否显示具体库存数量，库存充足时是否隐藏</li>
          <li><strong>自定义文本：</strong>支持自定义缺货、低库存、有库存的显示文本</li>
          <li><strong>阈值设置：</strong>支持自定义低库存阈值，灵活控制库存警告</li>
          <li><strong>工具提示：</strong>鼠标悬停显示当前库存数量详情</li>
        </ul>
      </div>
    </DemoPage>
  );
};

export default StockBadgeDemo;