"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
  style,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

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
  };

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    background:
      "linear-gradient(135deg, var(--mahout_gold) 0%, #EDE7FF 38%, var(--mahout_accent) 100%)",
    color: "var(--mahout_on_accent)",
    border: "1px solid rgba(255,255,255,0.28)",
    boxShadow: "var(--shadow_l), 0 0 34px rgba(169,156,255,0.34), inset 0 1px 0 rgba(255,255,255,0.42)",
  };

  const secondaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: "rgba(255,255,255,0.055)",
    color: "var(--mahout_text_primary)",
    border: "var(--mahout_stroke_1) solid var(--mahout_outline_soft)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
  };

  const external = /^https?:\/\//.test(href);
  const shared = {
    ref,
    href,
    className: `magnetic-btn mahout-btn mahout-btn-${variant} ${className}`.trim(),
    style: {
      ...(variant === "primary" ? primaryStyle : secondaryStyle),
      ...style,
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: "transform 0.15s ease-out, box-shadow 0.15s",
    },
    onMouseMove: handleMouse,
    onMouseLeave: handleMouseLeave,
  };

  if (external) {
    return (
      <a {...shared} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return <Link {...shared}>{children}</Link>;
}
