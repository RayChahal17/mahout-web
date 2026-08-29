import { type CSSProperties, type ReactNode } from "react";

/**
 * Chip — mahout_chips.xml + bg_chip_premium
 * Pill radius, quiet fill, hairline stroke
 */
export function Chip({
  children,
  active,
  variant = "default",
  className = "",
}: {
  children: ReactNode;
  active?: boolean;
  variant?: "default" | "summary" | "date";
  className?: string;
}) {
  const baseStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    minHeight: "var(--chip_min_height)",
    padding: "6px var(--chip_padding_h)",
    borderRadius: "var(--mahout_radius_chip)",
    fontSize: "var(--text_caption)",
    fontWeight: 500,
    transition: "border-color var(--duration_micro), box-shadow var(--duration_micro), transform var(--duration_micro)",
  };

  const variantStyle: CSSProperties =
    variant === "date"
      ? {
          background: "var(--mahout_gold_10)",
          borderWidth: 0,
          borderStyle: "solid",
          borderColor: "transparent",
          color: "var(--mahout_text_primary)",
        }
      : variant === "summary"
        ? {
            background: "var(--onboarding_habit_card_glass)",
            borderWidth: "var(--mahout_stroke_1)",
            borderStyle: "solid",
            borderColor: "var(--mahout_outline_soft)",
            color: "var(--mahout_text_secondary)",
          }
        : {
            background: "linear-gradient(180deg, var(--mahout_surface), var(--mahout_surface_alt))",
            borderWidth: "var(--mahout_stroke_1)",
            borderStyle: "solid",
            borderColor: "var(--mahout_outline_soft)",
            color: "var(--chip_text)",
          };

  return (
    <span
      className={`chip ${active ? "chip-active" : ""} ${className}`}
      style={{
        ...baseStyle,
        ...variantStyle,
        ...(active && {
          borderColor: "var(--mahout_accent)",
          boxShadow: "0 0 16px var(--mahout_premium_accent_2)",
        }),
      }}
    >
      {children}
    </span>
  );
}
