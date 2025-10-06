import React from "react";
import { useProductCard } from "../ProductCard";

export type VariantSelectorProps = {
  attributes?: Record<string, string[]>; // { color: ["红","蓝"], size: ["M","L"] }
  className?: string;
  style?: React.CSSProperties;
};

export const VariantSelector: React.FC<VariantSelectorProps> = ({ attributes, className, style }) => {
  const { data, state, setState } = useProductCard();
  const attrs: Record<string, string[]> = attributes ?? data?.variants ?? {};
  const keys = Object.keys(attrs);
  if (!keys.length) return null;

  const onSelect = (name: string, val: string) => {
    setState((s) => ({
      ...s,
      attributes: { ...(s.attributes ?? {}), [name]: val },
    }));
  };

  return (
    <div className={className} style={{ display: "grid", gap: 10, ...style }}>
      {keys.map((name) => {
        const options = attrs[name] ?? [];
        const selected = state.attributes?.[name];
        return (
          <div key={name}>
            <div style={{ marginBottom: 6, color: "#666", fontSize: 12 }}>{name}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => onSelect(name, opt)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 6,
                    border: selected === opt ? "2px solid #007aff" : "1px solid #ddd",
                    background: selected === opt ? "#e6f0ff" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};