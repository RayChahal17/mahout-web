import { type ReactNode, type ReactElement } from "react";
import { ChapterScreenshotHero } from "./ChapterScreenshotHero";
import type { ScreenshotCarouselSlide } from "./ElementScreenshotCarousel";

export function ChapterIntroWithHero({
  eyebrow,
  title,
  body,
  children,
  mainImageSrc,
  mainImageAlt,
  secondaryImageSrc,
  secondaryImageAlt,
  assetSlot,
  phoneEyebrow,
  phoneTitle,
  slides,
  carouselAriaLabel,
  imageGlow = "mixed",
  secondaryImageGlow = "gold",
  heroVisual,
  stage,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children?: ReactNode;
  mainImageSrc?: string;
  mainImageAlt?: string;
  secondaryImageSrc?: string;
  secondaryImageAlt?: string;
  assetSlot?: string;
  phoneEyebrow: string;
  phoneTitle: string;
  slides: readonly ScreenshotCarouselSlide[];
  carouselAriaLabel: string;
  imageGlow?: "purple" | "gold" | "mixed";
  secondaryImageGlow?: "purple" | "gold" | "mixed";
  /** Replaces default chapter screenshot hero when a section needs custom art. */
  heroVisual?: ReactElement;
  stage?: ReactNode;
}) {
  return (
    <div className="chapter-intro-with-hero">
      <div className="chapter-intro-with-hero__copy">
        <div className="premium-chapter-eyebrow">
          <span aria-hidden="true" className="premium-chapter-eyebrow__dot" />
          {eyebrow}
        </div>

        <h2>{title}</h2>
        <p>{body}</p>

        {children ? <div className="premium-chapter-intro__actions">{children}</div> : null}
      </div>

      {heroVisual ?? (
        <ChapterScreenshotHero
          mainImageSrc={mainImageSrc ?? ""}
          mainImageAlt={mainImageAlt ?? ""}
          secondaryImageSrc={secondaryImageSrc}
          secondaryImageAlt={secondaryImageAlt}
          assetSlot={assetSlot}
          phoneEyebrow={phoneEyebrow}
          phoneTitle={phoneTitle}
          slides={slides}
          carouselAriaLabel={carouselAriaLabel}
          glow={imageGlow}
          secondaryGlow={secondaryImageGlow}
          stage={stage}
        />
      )}

      <style>{`
        .chapter-intro-with-hero {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(18px, 4vw, 46px);
          align-items: stretch;
          margin: 0 0 clamp(28px, 5vw, 54px);
          padding: clamp(18px, 3vw, 30px);
          border-radius: clamp(26px, 4vw, 38px);
          border: 1px solid rgba(255,255,255,0.08);
          background:
            radial-gradient(ellipse 58% 68% at 8% 36%, rgba(156,140,255,0.11), transparent 64%),
            radial-gradient(ellipse 42% 54% at 94% 22%, rgba(255,211,138,0.07), transparent 58%),
            linear-gradient(180deg, rgba(255,255,255,0.042), rgba(255,255,255,0.014));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.07),
            0 26px 70px -52px rgba(0,0,0,0.72);
        }

        .chapter-intro-with-hero::after {
          content: "";
          position: absolute;
          left: clamp(18px, 3vw, 30px);
          right: clamp(18px, 3vw, 30px);
          bottom: -1px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(156,140,255,0.34), rgba(255,211,138,0.18), transparent);
          pointer-events: none;
        }

        .chapter-intro-with-hero__copy {
          position: relative;
          z-index: 1;
          align-self: center;
        }

        .chapter-intro-with-hero .premium-chapter-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: var(--mahout_space_8);
          padding: 10px 14px;
          border-radius: var(--mahout_radius_pill);
          border: 1px solid var(--mahout_outline_soft);
          background: rgba(255,255,255,0.04);
          color: var(--mahout_text_secondary);
          font-size: var(--text_caption);
          line-height: 1.2;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: var(--mahout_space_16);
        }

        .chapter-intro-with-hero .premium-chapter-eyebrow__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--mahout_accent);
          box-shadow: 0 0 18px var(--mahout_accent);
        }

        .chapter-intro-with-hero .premium-chapter-intro__actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--mahout_space_8);
          margin-top: var(--mahout_space_20);
        }

        .chapter-intro-with-hero h2 {
          margin: 0;
          max-width: 13ch;
          color: var(--mahout_text_primary);
          font-family: var(--font_head);
          font-size: clamp(34px, 5vw, 60px);
          line-height: var(--leading_tight);
          letter-spacing: -0.035em;
        }

        .chapter-intro-with-hero__copy > p {
          margin: var(--mahout_space_16) 0 0;
          max-width: 54ch;
          color: var(--mahout_text_secondary);
          font-size: clamp(17px, 1.45vw, 20px);
          line-height: var(--leading_body);
        }

        .chapter-hero-visual-stack {
          position: relative;
          min-width: 0;
          z-index: 1;
        }

        .chapter-hero-visual-composed {
          position: relative;
          width: 100%;
          min-height: clamp(460px, 50vw, 620px);
          isolation: isolate;
        }

        .chapter-hero-art-panel {
          position: relative;
          min-height: clamp(400px, 42vw, 540px);
          padding-bottom: clamp(100px, 14vw, 168px);
          display: flex;
          align-items: center;
          justify-content: center;
          isolation: isolate;
          margin-top: clamp(-24px, -2vw, 0px);
          overflow: visible;
        }

        .chapter-hero-art-panel::before,
        .chapter-hero-art-panel::after {
          content: "";
          position: absolute;
          pointer-events: none;
          z-index: 0;
        }

        .chapter-hero-art-panel::before {
          inset: 0% -4% 4%;
          border-radius: 46% 54% 42% 58%;
          background:
            radial-gradient(ellipse at 50% 42%, rgba(156,140,255,0.22), transparent 62%),
            radial-gradient(ellipse at 38% 70%, rgba(255,211,138,0.08), transparent 58%);
          filter: blur(22px);
          opacity: 0.92;
        }

        .chapter-hero-art-panel::after {
          left: 0;
          right: 0;
          bottom: 0;
          height: 20%;
          background: linear-gradient(180deg, transparent, rgba(6,8,16,0.62));
          z-index: 3;
        }

        .chapter-hero-art-panel__halo {
          position: absolute;
          width: min(620px, 88%);
          height: min(620px, 88%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(156,140,255,0.22), transparent 66%);
          filter: blur(18px);
          opacity: 0.78;
          z-index: 0;
        }

        .chapter-hero-art-image-wrap {
          position: relative;
          z-index: 1;
          width: min(580px, 100%);
          height: clamp(400px, 44vw, 560px);
          min-height: clamp(380px, 40vw, 540px) !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chapter-hero-art-image-wrap .premium-transparent-image,
        .chapter-hero-art-image-wrap .chapter-hero-art-image {
          width: 100%;
          min-height: inherit;
        }

        .chapter-hero-phone-float {
          position: absolute;
          right: clamp(0px, 1vw, 8px);
          bottom: clamp(2px, 1vw, 12px);
          z-index: 6;
          width: min(280px, 44%);
          filter: drop-shadow(0 28px 56px rgba(8,10,22,0.58));
        }

        .chapter-hero-phone {
          width: 100% !important;
          max-width: none !important;
        }

        .chapter-hero-visual-composed--dual .chapter-hero-art-panel::before {
          background:
            radial-gradient(ellipse at 42% 38%, rgba(156,140,255,0.24), transparent 62%),
            radial-gradient(ellipse at 72% 68%, rgba(255,211,138,0.12), transparent 58%);
        }

        .chapter-hero-secondary-float {
          position: absolute;
          left: clamp(-4px, 0vw, 12px);
          bottom: clamp(48px, 10vw, 96px);
          z-index: 5;
          width: min(240px, 38%);
          filter: drop-shadow(0 24px 48px rgba(8, 10, 22, 0.52));
        }

        .chapter-hero-secondary-art-wrap {
          position: relative;
          width: 100%;
          min-height: clamp(200px, 28vw, 280px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chapter-hero-secondary-art-wrap .premium-transparent-image,
        .chapter-hero-secondary-art-wrap .chapter-hero-secondary-art {
          width: 100%;
          min-height: inherit;
        }

        @media (min-width: 980px) {
          .chapter-intro-with-hero {
            grid-template-columns: minmax(0, 0.88fr) minmax(440px, 1.12fr);
            gap: clamp(32px, 4vw, 72px);
            align-items: center;
          }
        }

        @media (max-width: 720px) {
          .chapter-intro-with-hero h2 {
            max-width: min(20ch, 100%);
            overflow-wrap: break-word;
          }
        }

        @media (max-width: 979px) {
          .chapter-hero-visual-stack {
            order: -1;
          }

          .chapter-hero-visual-composed {
            min-height: auto;
          }

          .chapter-hero-art-panel {
            min-height: clamp(340px, 68vw, 480px);
            padding-bottom: clamp(72px, 18vw, 120px);
          }

          .chapter-hero-art-image-wrap {
            min-height: clamp(320px, 64vw, 440px) !important;
            height: auto;
          }

          .chapter-hero-secondary-float {
            width: min(200px, 44%);
            left: 8px;
            bottom: clamp(64px, 16vw, 108px);
          }
        }
      `}</style>
    </div>
  );
}
