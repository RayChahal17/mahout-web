"use client";

import { ReactNode } from "react";

/**
 * Premium glass card — North Star user glass template
 * bg_north_star_user_glass.xml + inner highlight
 */
export function GlassCard({
  children,
  className = "",
  active,
  style,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  active?: boolean;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`glass-card ${active ? "glass-card-active" : ""} ${className}`}
      style={{
        padding: "var(--mahout_space_24)",
        borderRadius: "var(--mahout_radius_card)",
        background: "var(--glass_ns_gradient)",
        border: "var(--mahout_stroke_1) solid var(--glass_ns_stroke)",
        backdropFilter: "blur(20px) saturate(1.18)",
        WebkitBackdropFilter: "blur(20px) saturate(1.18)",
        boxShadow: "var(--shadow_l)",
        position: "relative",
        overflow: "hidden",
        transition: "transform var(--duration_small), border-color var(--duration_small), box-shadow var(--duration_small)",
        ...(active && {
          borderColor: "var(--mahout_outline_gold)",
          boxShadow: "var(--shadow_xl), var(--shadow_glow_purple), var(--shadow_glow_gold)",
        }),
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--glass_inner_highlight)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}
