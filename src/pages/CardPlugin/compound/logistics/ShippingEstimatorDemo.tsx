import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "vane-card";
import React from "react";

const demoProduct = {
  id: "P-2001",
  title: "户外保温杯（含重量信息）",
  image:
    "https://images.unsplash.com/photo-1520975664667-56dc8c0a3d71?q=80&w=1200&auto=format&fit=crop",
  price: 12900,
  oldPrice: 15900,
  inventory: 120,
  unitWeight: 0.42, // 每件 0.42 kg
};

const regions = [
  { code: "LOCAL", name: "本地/同城", baseFee: 6, extraPerKg: 2, etaDays: 1 },
  { code: "DOMESTIC", name: "国内其他", baseFee: 12, extraPerKg: 3, etaDays: 2 },
  { code: "REMOTE", name: "偏远地区", baseFee: 20, extraPerKg: 4, etaDays: 4 },
];

const methods = [
  { code: "ECONOMY", name: "经济快递", multiplier: 1, etaOffset: 0 },
  { code: "EXPRESS", name: "加急快递", multiplier: 1.5, etaOffset: -1 },
  { code: "HEAVY", name: "重货专线", multiplier: 1.2, etaOffset: 1 },
];

export default function ShippingEstimatorDemo() {
  const [estimate, setEstimate] = React.useState<any>(null);

  return (
    <DemoPage
      title="ShippingEstimator 配送费估算示例"
      description="根据配送区域与方式估算运费与到达时间，支持与商品数量联动（重量=单位重量×数量）。"
      sourceKey="compound/logistics/ShippingEstimatorDemo"
    >
      <div style={{ padding: 24 }}>
        <ProductCard productId={demoProduct.id} data={demoProduct}>
          <ProductCard.Section title="选择区域与方式">
            <div style={{ display: "grid", gap: 16 }}>
              <ProductCard.QuantityStepper min={1} max={10} />

              <ProductCard.ShippingEstimator
                regions={regions}
                methods={methods}
                defaultRegionCode="DOMESTIC"
                defaultMethodCode="EXPRESS"
                weightFromData
                onEstimateChange={(res) => setEstimate(res)}
              />

              {estimate && (
                <div style={{ fontSize: 14, color: "#333" }}>
                  当前估算：费用 ¥{estimate.fee.toFixed(2)}，预计 {estimate.etaDays} 天到达。
                </div>
              )}
            </div>
          </ProductCard.Section>
        </ProductCard>

        <div style={{ marginTop: 24 }}>
          <h3>说明</h3>
          <ul>
            <li>基础运费：由区域决定；超重（&gt;1kg）按每公斤附加。</li>
            <li>方式系数：不同方式会对费用和天数进行系数与偏移调整。</li>
            <li>与数量联动：变更数量会重新计算重量与运费。</li>
          </ul>
        </div>
      </div>
    </DemoPage>
  );
}