import DemoPage from "../../_layout/DemoPage";
import { ProductCard } from "../../../../components/CardPlugin";
import React from "react";

const demoProduct = {
  id: "P-3001",
  title: "城市通勤背包",
  image:
    "https://images.unsplash.com/photo-1520974723455-1a04357b8cca?q=80&w=1200&auto=format&fit=crop",
  price: 29900,
  oldPrice: 39900,
  inventory: 80,
  unitWeight: 0.95,
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

export default function DeliveryTimelineDemo() {
  const [estimate, setEstimate] = React.useState<any>(null);

  return (
    <DemoPage
      title="DeliveryTimeline 配送时间线示例"
      description="与配送费估算联动展示预计送达阶段与日期范围，支持跳过周末。"
      sourceKey="compound/logistics/DeliveryTimelineDemo"
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

              {!!estimate && (
                <ProductCard.DeliveryTimeline
                  etaDays={estimate.etaDays}
                  weekendSkip
                  showDates
                  steps={[
                    { key: "process", name: "下单处理" },
                    { key: "dispatch", name: "仓库发货" },
                    { key: "transit", name: "运输中" },
                    { key: "deliver", name: "派送/签收" },
                  ]}
                />
              )}
            </div>
          </ProductCard.Section>
        </ProductCard>

        <div style={{ marginTop: 24 }}>
          <h3>说明</h3>
          <ul>
            <li>时间线根据总 ETA 自动分配到各阶段，支持自定义步骤与耗时。</li>
            <li>启用跳过周末后，日期累加会排除周六日。</li>
            <li>与数量联动：数量变化影响重量、ETA，从而影响时间线。</li>
          </ul>
        </div>
      </div>
    </DemoPage>
  );
}