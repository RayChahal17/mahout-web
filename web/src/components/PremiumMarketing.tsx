import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { Container } from "./Container";

type Align = "left" | "center";
type Tone = "default" | "hero" | "quiet" | "gold";

export function SectionShell({
  id,
  children,
  tone = "default",
  className = "",
  style,
}: {
  id?: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
  style?: React.CSSProperties;
}) {
  const toneBackgrounds: Record<Tone, string> = {
    default: "transparent",
    hero:
      "radial-gradient(760px 420px at 70% 18%, rgba(156,140,255,0.18), transparent 68%)",
    quiet:
      "linear-gradient(180deg, rgba(255,255,255,0.018), rgba(255,255,255,0.04), rgba(255,255,255,0.018))",
    gold:
      "radial-gradient(720px 420px at 50% 10%, rgba(255,211,138,0.12), transparent 64%)",
  };

  return (
    <section
      id={id}
      data-section
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        background: toneBackgrounds[tone],
        ...style,
      }}
    >
      {children}
    </section>
  );
}

export function PremiumEyebrow({
  children,
  dot = true,
  style,
}: {
  children: ReactNode;
  dot?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "9px 13px",
        borderRadius: "var(--mahout_radius_pill)",
        border: "1px solid var(--mahout_outline_soft)",
        background: "rgba(255,255,255,0.045)",
        color: "var(--mahout_text_secondary)",
        fontSize: "var(--text_caption)",
        letterSpacing: "0.11em",
        textTransform: "uppercase",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
        ...style,
      }}
    >
      {dot && (
        <span
          aria-hidden="true"
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--mahout_accent)",
            boxShadow: "0 0 18px var(--mahout_accent)",
          }}
        />
      )}
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
  maxWidth = 760,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  align?: Align;
  maxWidth?: number;
}) {
  return (
    <div
      style={{
        maxWidth,
        margin: align === "center" ? "0 auto var(--mahout_space_40)" : "0 0 var(--mahout_space_40)",
        textAlign: align,
      }}
    >
      {eyebrow && <PremiumEyebrow style={{ marginBottom: "var(--mahout_space_16)" }}>{eyebrow}</PremiumEyebrow>}
      <h2
        style={{
          fontFamily: "var(--font_head)",
          fontSize: "var(--text_h2)",
          lineHeight: "1.08",
          letterSpacing: "-0.045em",
          color: "var(--mahout_text_primary)",
          marginBottom: body ? "var(--mahout_space_16)" : 0,
        }}
      >
        {title}
      </h2>
      {body && (
        <p
          style={{
            margin: align === "center" ? "0 auto" : 0,
            maxWidth: "64ch",
            color: "var(--mahout_text_secondary)",
            fontSize: "var(--text_body)",
            lineHeight: "var(--leading_body)",
          }}
        >
          {body}
        </p>
      )}
    </div>
  );
}

export function ProofPanel({
  children,
  label,
  active = false,
  style,
  className = "",
}: {
  children: ReactNode;
  label?: string;
  active?: boolean;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`premium-panel ${className}`.trim()}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(22px, 3vw, 34px)",
        borderRadius: "var(--mahout_radius_sheet)",
        border: `1px solid ${active ? "var(--mahout_outline_gold)" : "var(--mahout_panel_border)"}`,
        background: "var(--mahout_panel_gradient)",
        boxShadow: active
          ? "var(--shadow_xl), var(--shadow_glow_purple), var(--shadow_glow_gold)"
          : "var(--shadow_m)",
        ...style,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(520px 220px at 20% 0%, rgba(255,255,255,0.11), transparent 62%), radial-gradient(420px 260px at 90% 12%, rgba(156,140,255,0.16), transparent 64%)",
          pointerEvents: "none",
        }}
      />
      {label && (
        <div
          style={{
            position: "relative",
            zIndex: 1,
            color: "var(--mahout_text_tertiary)",
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "var(--mahout_space_16)",
          }}
        >
          {label}
        </div>
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

export function AssetStage({
  src,
  alt,
  label,
  title,
  body,
  priority = false,
  aspectRatio = "1 / 1",
}: {
  src?: string;
  alt: string;
  label?: string;
  title: string;
  body?: string;
  priority?: boolean;
  aspectRatio?: string;
}) {
  return (
    <ProofPanel label={label} style={{ minHeight: 320, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          position: "relative",
          aspectRatio,
          minHeight: 220,
          display: "grid",
          placeItems: "center",
          marginBottom: "var(--mahout_space_18)",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "8%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 48%, rgba(156,140,255,0.24), transparent 64%), radial-gradient(circle at 56% 42%, rgba(255,211,138,0.15), transparent 68%)",
            filter: "blur(26px)",
          }}
        />
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={1600}
            priority={priority}
            sizes="(max-width: 900px) 90vw, 520px"
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxHeight: 420,
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 34px 70px rgba(0,0,0,0.48))",
            }}
          />
        ) : (
          <div
            aria-label={alt}
            role="img"
            style={{
              position: "relative",
              zIndex: 1,
              width: "min(78%, 360px)",
              aspectRatio: "1 / 1",
              borderRadius: "42%",
              border: "1px solid var(--mahout_outline_soft)",
              background:
                "linear-gradient(145deg, rgba(156,140,255,0.2), rgba(255,255,255,0.05)), radial-gradient(circle at 50% 42%, rgba(255,211,138,0.18), transparent 60%)",
              display: "grid",
              placeItems: "center",
              color: "var(--mahout_text_secondary)",
              textAlign: "center",
              padding: "var(--mahout_space_24)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), var(--shadow_glow_purple)",
            }}
          >
            <span style={{ fontSize: "var(--text_caption)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Art slot
            </span>
          </div>
        )}
      </div>
      <h3
        style={{
          fontFamily: "var(--font_head)",
          fontSize: "var(--text_h3)",
          color: "var(--mahout_text_primary)",
          lineHeight: 1.12,
          marginBottom: body ? "var(--mahout_space_8)" : 0,
        }}
      >
        {title}
      </h3>
      {body && <p className="premium-copy" style={{ margin: 0 }}>{body}</p>}
    </ProofPanel>
  );
}

export function SignalRow({ items }: { items: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--mahout_space_8)" }}>
      {items.map((item) => (
        <span
          key={item}
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: 34,
            padding: "0 12px",
            borderRadius: "var(--mahout_radius_pill)",
            border: "1px solid var(--mahout_outline_soft)",
            background: "rgba(255,255,255,0.04)",
            color: "var(--mahout_text_secondary)",
            fontSize: "var(--text_caption)",
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function ProductMock({
  title,
  eyebrow = "Product proof slot",
  rows = ["Direction check", "One honest action", "Receipt saved"],
}: {
  title: string;
  eyebrow?: string;
  rows?: string[];
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 360,
        margin: "0 auto",
        borderRadius: 34,
        padding: 12,
        background: "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.05))",
        border: "1px solid var(--mahout_outline_soft)",
        boxShadow: "var(--shadow_l), var(--shadow_glow_purple)",
      }}
    >
      <div
        style={{
          minHeight: 520,
          borderRadius: 26,
          padding: "22px 18px",
          background:
            "linear-gradient(180deg, rgba(8,10,18,0.96), rgba(18,20,34,0.94)), radial-gradient(circle at 70% 0%, rgba(156,140,255,0.28), transparent 45%)",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--mahout_space_16)",
        }}
      >
        <div
          style={{
            width: 68,
            height: 6,
            borderRadius: 999,
            background: "rgba(255,255,255,0.16)",
            alignSelf: "center",
            marginBottom: "var(--mahout_space_8)",
          }}
        />
        <div style={{ color: "var(--mahout_text_tertiary)", fontSize: 10, letterSpacing: "0.13em", textTransform: "uppercase" }}>
          {eyebrow}
        </div>
        <h3 style={{ fontFamily: "var(--font_head)", lineHeight: 1.1, fontSize: 28, margin: 0 }}>{title}</h3>
        <div style={{ display: "grid", gap: 12, marginTop: "auto" }}>
          {rows.map((row, index) => (
            <div
              key={row}
              style={{
                padding: 14,
                borderRadius: 18,
                background: index === 0 ? "rgba(156,140,255,0.16)" : "rgba(255,255,255,0.055)",
                border: "1px solid var(--mahout_outline_soft)",
              }}
            >
              <div className="premium-skeleton-line" style={{ width: index === 2 ? "58%" : "74%", marginBottom: 10 }} />
              <div style={{ color: "var(--mahout_text_secondary)", fontSize: "var(--text_caption)" }}>{row}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PremiumPageIntro({
  eyebrow,
  title,
  body,
  ctaHref = "/",
  ctaLabel = "Back to home",
  ctaExternal = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  ctaHref?: string;
  ctaLabel?: string;
  ctaExternal?: boolean;
}) {
  return (
    <SectionShell tone="hero" style={{ paddingTop: "clamp(72px, 10vh, 130px)" }}>
      <Container>
        <ProofPanel active style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <PremiumEyebrow>{eyebrow}</PremiumEyebrow>
          <h1
            style={{
              fontFamily: "var(--font_head)",
              fontSize: "var(--text_h1)",
              lineHeight: "var(--leading_tight)",
              letterSpacing: "-0.055em",
              margin: "var(--mahout_space_16) auto",
              maxWidth: "11ch",
            }}
          >
            {title}
          </h1>
          <p className="premium-copy" style={{ maxWidth: "62ch", margin: "0 auto var(--mahout_space_24)" }}>
            {body}
          </p>
          {ctaExternal ? (
            <a className="premium-link" href={ctaHref} target="_blank" rel="noopener noreferrer">
              {ctaLabel}
            </a>
          ) : (
            <Link className="premium-link" href={ctaHref}>
              {ctaLabel}
            </Link>
          )}
        </ProofPanel>
      </Container>
    </SectionShell>
  );
}
