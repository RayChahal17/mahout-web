import Image from "next/image";

type GlowTone = "purple" | "gold" | "mixed";

type PremiumTransparentImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  glow?: GlowTone;
  maxHeight?: number;
  minHeight?: number;
  sizes?: string;
  className?: string;
  showGlow?: boolean;
  dropShadow?: boolean;
  unoptimized?: boolean;
  intrinsicWidth?: number;
  intrinsicHeight?: number;
  imageWidth?: number;
  imageHeight?: number;
};

const GLOW_STYLES: Record<GlowTone, { primary: string; secondary: string }> = {
  purple: {
    primary: "rgba(156,140,255,0.22)",
    secondary: "rgba(156,140,255,0.08)",
  },
  gold: {
    primary: "rgba(255,211,138,0.20)",
    secondary: "rgba(255,211,138,0.08)",
  },
  mixed: {
    primary: "rgba(156,140,255,0.18)",
    secondary: "rgba(255,211,138,0.12)",
  },
};

export function PremiumTransparentImage({
  src,
  alt,
  priority = false,
  glow = "mixed",
  maxHeight = 520,
  minHeight = 220,
  sizes = "(max-width: 900px) 92vw, 560px",
  className,
  showGlow = true,
  dropShadow = true,
  unoptimized = false,
  intrinsicWidth = 1024,
  intrinsicHeight = 1024,
  imageWidth,
  imageHeight,
}: PremiumTransparentImageProps) {
  const tones = GLOW_STYLES[glow];

  return (
    <div
      className={className ? `premium-transparent-image ${className}` : "premium-transparent-image"}
      style={{
        position: "relative",
        width: "100%",
        minHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: showGlow ? "clamp(8px, 2vw, 18px)" : 0,
      }}
    >
      {showGlow ? (
        <>
          <div
            aria-hidden="true"
            className="premium-transparent-image__glow"
            style={{
              position: "absolute",
              inset: "8% 12%",
              borderRadius: "50%",
              background: `radial-gradient(circle at 50% 42%, ${tones.primary}, transparent 68%)`,
              filter: "blur(28px)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "18% 20%",
              borderRadius: "50%",
              background: `radial-gradient(circle at 50% 60%, ${tones.secondary}, transparent 72%)`,
              filter: "blur(18px)",
              pointerEvents: "none",
            }}
          />
        </>
      ) : null}

      <Image
        src={src}
        alt={alt}
        width={intrinsicWidth}
        height={intrinsicHeight}
        priority={priority}
        unoptimized={unoptimized}
        sizes={sizes}
        style={{
          position: "relative",
          zIndex: 1,
          objectFit: "contain",
          ...(imageWidth && imageHeight
            ? {
                width: imageWidth,
                height: imageHeight,
                maxWidth: imageWidth,
                maxHeight: imageHeight,
              }
            : {
                width: "100%",
                height: "auto",
                maxHeight,
              }),
          filter: dropShadow ? "drop-shadow(0 24px 48px rgba(0, 0, 0, 0.35))" : undefined,
        }}
      />
    </div>
  );
}
