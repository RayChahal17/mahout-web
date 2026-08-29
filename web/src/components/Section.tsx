import type { CSSProperties, ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
  "data-section": dataSection,
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  "data-section"?: string;
  variant?: "default" | "wash" | "north-star";
}) {
  const variantStyles: Record<"default" | "wash" | "north-star", CSSProperties> = {
    default: {},
    wash: {
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.018), rgba(156,140,255,0.07), rgba(255,255,255,0.018))",
      borderTop: "1px solid var(--mahout_outline_soft)",
      borderBottom: "1px solid var(--mahout_outline_soft)",
    },
    "north-star": {
      background:
        "radial-gradient(760px 420px at 50% 12%, rgba(255,211,138,0.12), transparent 64%), radial-gradient(620px 360px at 70% 30%, rgba(156,140,255,0.14), transparent 66%)",
      borderTop: "1px solid var(--mahout_outline_gold)",
    },
  };

  return (
    <section
      id={id}
      data-section={dataSection}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "var(--section_py) 0",
        ...variantStyles[variant],
      }}
    >
      {children}
    </section>
  );
}
