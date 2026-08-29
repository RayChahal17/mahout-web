import { ReactNode } from "react";

/**
 * PhoneFrame — mahout_surface_alt + mahout_outline_soft
 * Same radius everywhere, consistent inset padding
 */
export function PhoneFrame({
  children,
  className = "",
  title = "Mahout preview",
  eyebrow = "Screenshot slot",
  variant = "default",
}: {
  children?: ReactNode;
  className?: string;
  title?: string;
  eyebrow?: string;
  /** screenshot = full-bleed app capture, minimal chrome */
  variant?: "default" | "overlay" | "screenshot";
}) {
  const isOverlay = variant === "overlay";
  const isScreenshot = variant === "screenshot";

  return (
    <div
      className={`phone-frame${isScreenshot ? " phone-frame--screenshot" : ""} ${className}`.trim()}
      style={{
        position: "relative",
        transform: "translateZ(0)",
        borderRadius: "var(--mahout_radius_sheet)",
        padding: isScreenshot ? 8 : 10,
        background: isScreenshot
          ? "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05))"
          : isOverlay
            ? "linear-gradient(180deg, rgba(255,255,255,0.11), rgba(255,255,255,0.028))"
            : "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))",
        border: isScreenshot
          ? "1px solid rgba(255,255,255,0.2)"
          : isOverlay
            ? "1px solid rgba(255,255,255,0.16)"
            : "var(--mahout_stroke_1) solid var(--mahout_panel_border)",
        boxShadow: isScreenshot
          ? "0 28px 64px rgba(8,10,22,0.55), 0 0 40px rgba(156,140,255,0.14), inset 0 1px 0 rgba(255,255,255,0.12)"
          : isOverlay
            ? "0 22px 58px rgba(0,0,0,0.34), 0 0 34px rgba(156,140,255,0.10), inset 0 1px 0 rgba(255,255,255,0.08)"
            : "var(--shadow_l), var(--shadow_glow_purple)",
        overflow: "hidden",
        maxWidth: isScreenshot ? 392 : 320,
        aspectRatio: isScreenshot ? "900 / 1460" : "9 / 19.5",
        backdropFilter: isOverlay || isScreenshot ? "blur(12px) saturate(1.08)" : undefined,
        WebkitBackdropFilter: isOverlay || isScreenshot ? "blur(12px) saturate(1.08)" : undefined,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(40% 25% at 25% 10%, rgba(255,255,255,0.14), transparent 60%)",
          opacity: isOverlay ? 0.5 : 0.9,
        }}
      />
      <div
        className={isScreenshot ? "phone-frame__screen phone-frame__screen--screenshot" : "phone-frame__screen"}
        style={{
          height: "100%",
          borderRadius: "calc(var(--mahout_radius_sheet) - 10px)",
          padding: isScreenshot ? "4px 3px 6px" : "var(--mahout_space_24) var(--mahout_space_16)",
          background: isScreenshot
            ? "linear-gradient(180deg, rgba(246,244,252,0.58), rgba(235,232,248,0.44))"
            : isOverlay
              ? "linear-gradient(180deg, rgba(7,9,18,0.72), rgba(17,19,32,0.58)), radial-gradient(circle at 80% 0%, rgba(156,140,255,0.18), transparent 45%)"
              : "linear-gradient(180deg, rgba(7,9,18,0.98), rgba(17,19,32,0.96)), radial-gradient(circle at 80% 0%, rgba(156,140,255,0.28), transparent 45%)",
          border: isScreenshot
            ? "1px solid rgba(255,255,255,0.35)"
            : isOverlay
              ? "1px solid rgba(255,255,255,0.11)"
              : "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: isScreenshot ? "stretch" : "center",
          justifyContent: isScreenshot ? "flex-start" : "center",
          color: "var(--mahout_text_secondary)",
          fontSize: "var(--text_caption)",
        }}
      >
        {!isScreenshot ? (
        <div
          aria-hidden="true"
          style={{
            width: 72,
            height: 6,
            borderRadius: 99,
            background: isOverlay ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.10)",
            border: isOverlay ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.10)",
            marginBottom: "var(--mahout_space_12)",
          }}
        />
        ) : null}
        {children || (
          <>
            <div style={{ alignSelf: "stretch", marginBottom: "var(--mahout_space_16)" }}>
              <div
                style={{
                  color: "var(--mahout_text_tertiary)",
                  fontSize: 10,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  marginBottom: "var(--mahout_space_8)",
                }}
              >
                {eyebrow}
              </div>
              <strong
                style={{
                  display: "block",
                  color: "var(--mahout_text_primary)",
                  fontFamily: "var(--font_head)",
                  fontSize: 24,
                  lineHeight: 1.08,
                  textAlign: "left",
                }}
              >
                {title}
              </strong>
            </div>
            <div style={{ width: "100%", display: "grid", gap: 12, marginTop: "auto" }}>
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  style={{
                    padding: 14,
                    borderRadius: 18,
                    background: isOverlay
                      ? item === 0
                        ? "rgba(156,140,255,0.12)"
                        : "rgba(255,255,255,0.035)"
                      : item === 0 ? "rgba(156,140,255,0.16)" : "rgba(255,255,255,0.055)",
                    border: isOverlay ? "1px solid rgba(255,255,255,0.08)" : "1px solid var(--mahout_outline_soft)",
                  }}
                >
                  <div className="premium-skeleton-line" style={{ width: item === 2 ? "54%" : "76%", marginBottom: 10 }} />
                  <div className="premium-skeleton-line" style={{ width: item === 1 ? "48%" : "62%", opacity: 0.55 }} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
