import { ReactNode } from "react";

/**
 * Solid card — mahout_surface + mahout_stroke
 * For non-glass panels (proof tiles, trust blocks)
 */
export function Card({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        padding: "var(--mahout_space_24)",
        borderRadius: "var(--mahout_radius_card)",
        background: "var(--mahout_surface)",
        border: "var(--mahout_stroke_1) solid var(--mahout_stroke)",
        boxShadow: "var(--shadow_m)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
