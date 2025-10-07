import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "../../../../components/CardPlugin";
import React from "react";

const demoProduct = {
  id: "P-4001",
  title: "便携折叠桌",
  image:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
  price: 18900,
  oldPrice: 23900,
  inventory: 50,
};

export default function ReturnPolicyDemo() {
  return (
    <DemoPage
      title="ReturnPolicy 退换政策示例"
      description="展示退换货窗口期、支持情况、免邮退货、整新费与简要条款。"
      sourceKey="compound/logistics/ReturnPolicyDemo"
    >
      <div style={{ padding: 24 }}>
        <ProductCard productId={demoProduct.id} data={demoProduct}>
          <ProductCard.Section title="政策与条款">
            <div style={{ display: "grid", gap: 16 }}>
              <ProductCard.ReturnPolicy
                windowDays={7}
                allowReturn
                allowExchange
                freeReturnWithinDays={3}
                restockingFeePercent={5}
                conditions={[
                  "商品需保持完好，不影响二次销售",
                  "赠品需完整退回，否则按价扣除",
                  "人为损坏或使用痕迹明显不支持退换",
                ]}
                contact="400-123-4567（工作日 9:00-18:00）"
                theme="default"
                onViewPolicy={() => alert("打开完整政策页面或弹窗")}
              />

              <ProductCard.ReturnPolicy
                windowDays={15}
                allowReturn
                allowExchange={false}
                conditions={["定制商品仅支持质量问题退货"]}
                theme="warning"
                compact
              />
            </div>
          </ProductCard.Section>
        </ProductCard>
      </div>
    </DemoPage>
  );
}