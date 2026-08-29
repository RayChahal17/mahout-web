"use client";

import { Container } from "./Container";
import { GlassCard } from "./GlassCard";
import { Chip } from "./Chip";
import { FrostShield } from "./FrostShield";
import { NorthStarStoryCarousel } from "./NorthStarStoryCarousel";
import { PremiumTransparentImage } from "./PremiumTransparentImage";
import { MAHOUT_ELEMENT_IMAGES } from "@/lib/mahoutAssets";

const ORIGIN_STEPS = [
  {
    order: "01",
    title: "Name the life you are building.",
    copy: "Start with the work, health, relationships, freedom, identity, peace, and impact that matter.",
  },
  {
    order: "02",
    title: "Shape your ideal future self.",
    copy: "Mahout turns that future vision into North Star — your ideal future self in motion.",
  },
  {
    order: "03",
    title: "Let North Star guide today.",
    copy: "North Star becomes more useful as it connects to goals, actions, moods, reflection, memory, and patterns.",
  },
] as const;

const VISION_TAGS = [
  "Meaningful work",
  "Strong health",
  "Financial steadiness",
  "Presence at home",
  "Calm focus",
] as const;

const RECEIPT_LINES = [
  "Life you name",
  "Mountain goals",
  "Path receipts",
  "Elephant mood",
  "Mahout reflection",
  "Brain memory",
] as const;

function NorthStarFutureSelfVisual() {
  return (
    <div className="north-star-origin-visual-stack">
      <div
        className="north-star-origin-visual-composed"
        aria-label="North Star origin story"
      >
        <div className="north-star-future-visual">
          <div aria-hidden="true" className="north-star-future-visual__halo" />
          <div aria-hidden="true" className="north-star-future-visual__star-glow" />
          <PremiumTransparentImage
            className="north-star-future-image"
            src={MAHOUT_ELEMENT_IMAGES.northStarFutureSelf}
            alt="A present self reaches toward a luminous ideal future self formed from a glowing path and star field."
            maxHeight={560}
            minHeight={400}
            showGlow={false}
            dropShadow={false}
            unoptimized
            sizes="(max-width: 900px) 92vw, 560px"
          />
          <div className="north-star-origin-callout north-star-origin-callout--present">
            Present you
          </div>
          <div className="north-star-origin-callout north-star-origin-callout--future">
            Ideal future self
          </div>
        </div>

        <div
          className="north-star-origin-story-stage"
          aria-label="North Star product stills"
        >
          <NorthStarStoryCarousel />
        </div>
      </div>
    </div>
  );
}

function DemoVisionCard() {
  return (
    <GlassCard
      active
      className="north-star-origin-proof-card"
      style={{
        padding: "clamp(18px, 2.6vw, 28px)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--mahout_space_16)",
        }}
      >
        <div>
          <div className="north-star-origin-eyebrow">
            The life you name
          </div>
          <p
            style={{
              margin: 0,
              color: "var(--mahout_text_primary)",
              fontSize: "clamp(18px, 1.8vw, 22px)",
              lineHeight: 1.45,
              fontWeight: 700,
            }}
          >
            Build a calm, focused, financially stable life with meaningful work, strong
            health, and presence at home.
          </p>
        </div>

        <div className="north-star-origin-chip-row">
          {VISION_TAGS.map((tag) => (
            <Chip key={tag} variant="summary" className="north-star-origin-vision-chip">
              {tag}
            </Chip>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

function ReceiptGroundingCard() {
  return (
    <FrostShield
      className="north-star-origin-proof-card north-star-origin-proof-card--quiet"
      style={{
        padding: "clamp(18px, 2.4vw, 26px)",
        borderRadius: "var(--mahout_radius_card)",
        border: "1px solid var(--mahout_outline_soft)",
        background: "rgba(255,255,255,0.035)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--mahout_space_16)",
        }}
      >
        <div>
          <div className="north-star-origin-eyebrow">
            Grounded guidance
          </div>
          <h3
            style={{
              margin: 0,
              color: "var(--mahout_text_primary)",
              fontFamily: "var(--font_head)",
              fontSize: "clamp(22px, 2.4vw, 30px)",
              lineHeight: 1.14,
            }}
          >
            North Star is grounded in the life you name and the receipts you build.
          </h3>
        </div>

        <p
          style={{
            margin: 0,
            color: "var(--mahout_text_secondary)",
            fontSize: "var(--text_body_m)",
            lineHeight: "var(--leading_relaxed)",
          }}
        >
          It becomes more useful because it can connect to goals, actions, moods,
          reflection, memory, and patterns — not because it magically knows everything.
        </p>

        <div className="origin-receipts-grid">
          {RECEIPT_LINES.map((line) => (
            <div key={line} className="north-star-receipt-row">
              <span aria-hidden="true" className="north-star-receipt-row__dot" />
              <span className="north-star-receipt-row__label">{line}</span>
            </div>
          ))}
        </div>
      </div>
    </FrostShield>
  );
}

export function NorthStarOriginSection() {
  return (
    <section
      id="north-star-origin"
      className="north-star-origin-section"
      aria-label="How North Star forms"
      data-section
      data-scene="north-star-origin"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-12%",
          top: "12%",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "rgba(156,140,255,0.13)",
          filter: "blur(110px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-14%",
          bottom: "10%",
          width: 460,
          height: 460,
          borderRadius: "50%",
          background: "rgba(255,211,138,0.09)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <div
          className="origin-grid"
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--stack_gap)",
            alignItems: "center",
          }}
        >
          <div
            className="north-star-origin-copy"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--mahout_space_24)",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "var(--mahout_space_8)",
                  padding: "10px 14px",
                  borderRadius: "var(--mahout_radius_pill)",
                  border: "1px solid var(--mahout_outline_soft)",
                  background: "rgba(255,255,255,0.04)",
                  color: "var(--mahout_text_secondary)",
                  fontSize: "var(--text_caption)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "var(--mahout_space_16)",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--mahout_accent)",
                    boxShadow: "0 0 18px var(--mahout_accent)",
                  }}
                />
                01 · North Star
              </div>

              <h2
                style={{
                  margin: 0,
                  color: "var(--mahout_text_primary)",
                  fontFamily: "var(--font_head)",
                  fontSize: "clamp(34px, 5vw, 58px)",
                  lineHeight: "var(--leading_tight)",
                  maxWidth: "13ch",
                }}
              >
                Start with the life you are building.
              </h2>

              <p
                style={{
                  margin: "var(--mahout_space_16) 0 0",
                  color: "var(--mahout_text_secondary)",
                  fontSize: "clamp(17px, 1.5vw, 20px)",
                  lineHeight: "var(--leading_body)",
                  maxWidth: "64ch",
                }}
              >
                Your North Star begins with your future life. Mahout helps you name
                the version of life where the important things worked out — the work,
                health, relationships, freedom, identity, peace, and impact that matter.
              </p>

              <p
                style={{
                  margin: "var(--mahout_space_12) 0 0",
                  color: "var(--mahout_text_secondary)",
                  fontSize: "var(--text_body)",
                  lineHeight: "var(--leading_body)",
                  maxWidth: "64ch",
                }}
              >
                From that vision, North Star becomes the ideal future version of you:
                a guide for present-day choices, not a pressure machine.
              </p>
            </div>
          </div>

          <NorthStarFutureSelfVisual />
        </div>

        <div className="origin-steps north-star-origin-steps">
          {ORIGIN_STEPS.map((step) => (
            <GlassCard
              key={step.order}
              className="north-star-origin-step-card"
              style={{
                padding: "18px",
                boxShadow: "var(--shadow_s)",
              }}
            >
              <div className="north-star-origin-step-card__inner">
                <div className="north-star-origin-step-card__badge">{step.order}</div>
                <div>
                  <h3 className="north-star-origin-step-card__title">{step.title}</h3>
                  <p className="north-star-origin-step-card__copy">{step.copy}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="north-star-origin-support-grid">
          <DemoVisionCard />
          <ReceiptGroundingCard />
        </div>
      </Container>
    </section>
  );
}

