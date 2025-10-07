import React from "react";
import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "../../../../components/CardPlugin";

const product = {
  id: "a11y-actions-01",
  title: "轻巧无线耳机",
  description: "降噪与通话优化，佩戴舒适，续航稳定",
  price: 499,
  image:
    "https://images.unsplash.com/photo-1518444029140-d4e9d1e3e0b7?q=80&w=1000&auto=format&fit=crop",
  inventory: 26,
};

const ActionsDemo: React.FC = () => {
  return (
    <DemoPage
      title="操作区 - Actions"
      description="展示复合组件的操作区：加入购物车/心愿单等操作入口，可独立工作或与插件协作。"
      sourceKey="compound/a11y/ActionsDemo"
    >
      <div className="card" style={{ padding: 16 }}>
        <ProductCard productId={product.id} data={product}>
          <ProductCard.Image style={{ width: "100%", aspectRatio: "4 / 3", borderRadius: 8 }} />
          <div style={{ padding: 16 }}>
            <ProductCard.Title />
            <ProductCard.Description style={{ color: "#666" }} />

            <ProductCard.Section title="操作区">
              <div style={{ display: "grid", gap: 8 }}>
                {/* 复合组件内置的 Actions，读写 ProductCard 上下文的 cart/wishlist 状态 */}
                <ProductCard.Actions />

                {/* 可与其他展示组件一并使用，观察状态不冲突 */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 13, color: "#666" }}>当前价格：</span>
                  <ProductCard.Price style={{ fontSize: 20, fontWeight: 600 }} />
                </div>
                <ProductCard.Inventory />
              </div>
            </ProductCard.Section>
          </div>
        </ProductCard>
      </div>

      <div style={{ marginTop: 32, padding: 20, background: "#f8f9fa", borderRadius: 8 }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#333" }}>Actions 功能说明</h3>
        <ul style={{ margin: 0, paddingLeft: 20, color: "#666", lineHeight: 1.6 }}>
          <li>读写 `ProductCard` 上下文中的购物车与心愿单状态</li>
          <li>与插件区协作：可同时启用 `ActionsPlugin` 渲染复杂操作按钮</li>
          <li>与价格、库存等展示组件组合，演示常见购买流程</li>
        </ul>
      </div>
    </DemoPage>
  );
};

export default ActionsDemo;