import Link from "next/link";
import { ReactNode } from "react";

/**
 * Button — mahout_buttons.xml
 * Primary: mahout_accent, on_accent
 * Secondary: surface + stroke
 * No all-caps
 */
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  style,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  style?: React.CSSProperties;
}) {
  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "var(--mahout_btn_height)",
    padding: "0 var(--mahout_btn_padding_h)",
    borderRadius: "var(--mahout_radius_button)",
    fontWeight: 600,
    fontSize: "var(--text_body)",
    textTransform: "none",
    transition: "transform var(--duration_small), box-shadow var(--duration_small)",
  };

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: "var(--mahout_accent)",
    color: "var(--mahout_on_accent)",
    border: "none",
    boxShadow: "var(--shadow_m), 0 0 20px rgba(156,140,255,0.2)",
  };

  const secondaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: "var(--mahout_surface)",
    color: "var(--mahout_text_primary)",
    border: "var(--mahout_stroke_1) solid var(--mahout_outline_soft)",
  };

  return (
    <Link
      href={href}
      className={`mahout-btn mahout-btn-${variant} ${className}`.trim()}
      style={variant === "primary" ? primaryStyle : secondaryStyle}
    >
      {children}
    </Link>
  );
}
