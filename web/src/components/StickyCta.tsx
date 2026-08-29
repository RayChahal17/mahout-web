import Link from "next/link";

export function StickyCta() {
  return (
    <div
      className="sticky-cta"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        padding: "var(--mahout_space_12)",
        background: "rgba(11,16,32,0.95)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid var(--mahout_outline_soft)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Link
        href="/waitlist"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "14px 24px",
          borderRadius: "var(--mahout_radius_button)",
          background: "var(--mahout_accent)",
          color: "var(--mahout_on_accent)",
          fontWeight: 600,
          fontSize: "var(--text_body)",
          boxShadow: "var(--shadow_m), 0 0 24px var(--mahout_premium_accent_2)",
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
      >
        Form my North Star
      </Link>
    </div>
  );
}
