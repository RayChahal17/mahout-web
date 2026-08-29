"use client";

import { useMemo, useState } from "react";
import { Container } from "./Container";
import { GlassCard } from "./GlassCard";
import { PremiumTransparentImage } from "./PremiumTransparentImage";
import { ChapterIntroWithHero } from "./ChapterIntroWithHero";
import { CHAPTER_SCREENSHOT_SLIDES } from "./ElementScreenshotCarousel";
import { ModesStoryCarousel } from "./ModesStoryCarousel";
import { MAHOUT_ELEMENT_IMAGES } from "@/lib/mahoutAssets";

const MODES = [
  {
    id: "auto",
    name: "Auto",
    tagline: "North Star chooses the right stance for the moment.",
    use: "Use when the user does not want to pick a mode.",
    symbol: "✦",
    visual: "Adaptive compass",
    prompt: "I do not know what I need. Help me find the right posture.",
    response:
      "Auto reads the moment first. If the user needs clarity, it slows down. If they are ready to move, it turns the signal into one grounded next step.",
    chipOne: "Choose stance",
    chipTwo: "Start gently",
  },
  {
    id: "work",
    name: "Work Focus",
    tagline: "Turns direction into next step, plan, priority, or execution.",
    use: "Use for practical movement and planning.",
    symbol: "→",
    visual: "Target and action beam",
    prompt: "What should I do first today?",
    response:
      "Work Focus does not try to solve the whole life. It finds the next honest block, names the friction, and keeps the plan small enough to start.",
    chipOne: "Pick one lane",
    chipTwo: "Start a block",
  },
  {
    id: "analytic",
    name: "Analytic",
    tagline: "Helps reason, compare, solve, and see tradeoffs.",
    use: "Use for complex choices and pattern analysis.",
    symbol: "◇",
    visual: "Prism and logic nodes",
    prompt: "Help me compare these two paths.",
    response:
      "Analytic mode separates facts, uncertainty, tradeoffs, and consequences. It answers first, then asks only one refinement if needed.",
    chipOne: "Compare options",
    chipTwo: "Find tradeoff",
  },
  {
    id: "reflective",
    name: "Reflective",
    tagline: "Helps slow down and understand the inside of the moment.",
    use: "Use when emotional meaning matters.",
    symbol: "◒",
    visual: "Moon, mirror, calm water",
    prompt: "I feel off, but I cannot explain it.",
    response:
      "Reflective mode helps name what is being carried without turning the moment into a diagnosis or a lecture.",
    chipOne: "Name the feeling",
    chipTwo: "Journal one line",
  },
  {
    id: "motivator",
    name: "Motivator",
    tagline: "Grounded encouragement without hype.",
    use: "Use for momentum without dishonesty.",
    symbol: "△",
    visual: "Warm spark rising from path",
    prompt: "I am avoiding the hard thing again.",
    response:
      "Motivator does not flatter. It returns the user to proof: one small promise, one visible start, one move that restores self-trust.",
    chipOne: "Do five minutes",
    chipTwo: "Shrink the step",
  },
  {
    id: "mentor",
    name: "Mentor",
    tagline: "Guidance through chosen standards, questions, and perspectives.",
    use: "Use for mentor lens guidance without impersonating real people.",
    symbol: "◎",
    visual: "Council lights around a star",
    prompt: "What standard should I hold here?",
    response:
      "Mentor mode uses influences as lenses. It does not impersonate real people. It turns admired standards into questions, frames, and next steps.",
    chipOne: "Use mentor lens",
    chipTwo: "Name the standard",
  },
] as const;

const MODE_GUARDRAILS = [
  "Different lenses, not different bots.",
  "Mentor mode uses standards and perspectives, not impersonation.",
  "One sharp question when clarification matters.",
  "Receipts first; generic advice last.",
] as const;

type ModeId = (typeof MODES)[number]["id"];

function ModeButton({
  mode,
  active,
  onClick,
}: {
  mode: (typeof MODES)[number];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "16px",
        borderRadius: "20px",
        border: active ? "1px solid rgba(255,211,138,0.50)" : "1px solid var(--mahout_outline_soft)",
        background: active ? "rgba(255,211,138,0.10)" : "rgba(255,255,255,0.035)",
        color: "var(--mahout_text_primary)",
        transition: "border-color var(--duration_small), background var(--duration_small), transform var(--duration_small)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "var(--mahout_space_12)",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: 34,
            height: 34,
            borderRadius: "12px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: active ? "rgba(255,211,138,0.16)" : "rgba(156,140,255,0.10)",
            color: active ? "var(--mahout_text_primary)" : "var(--mahout_accent)",
            flex: "0 0 auto",
          }}
        >
          {mode.symbol}
        </span>
        <span>
          <span
            style={{
              display: "block",
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            {mode.name}
          </span>
          <span
            style={{
              display: "block",
              color: "var(--mahout_text_secondary)",
              fontSize: "var(--text_body_m)",
              lineHeight: 1.4,
            }}
          >
            {mode.tagline}
          </span>
        </span>
      </div>
    </button>
  );
}

export function ConversationModesSection() {
  const [activeModeId, setActiveModeId] = useState<ModeId>("mentor");

  const activeMode = useMemo(
    () => MODES.find((mode) => mode.id === activeModeId) ?? MODES[0],
    [activeModeId]
  );

  return (
    <section
      id="conversation-modes"
      data-section
      data-scene="conversation-modes"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-8vw",
          top: "0%",
          width: "38vw",
          height: "38vw",
          maxWidth: 480,
          maxHeight: 480,
          borderRadius: "50%",
          background: "rgba(156,140,255,0.15)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <ChapterIntroWithHero
          eyebrow="North Star modes"
          title="Talk to North Star in the mode your moment needs."
          body="Modes are not separate bots. They are lenses: different ways your North Star can meet a moment while staying grounded in the same future-self direction."
          mainImageSrc={MAHOUT_ELEMENT_IMAGES.modesOrbit}
          mainImageAlt="North Star surrounded by conversation mode lenses"
          assetSlot="modes-orbit"
          phoneEyebrow="Modes"
          phoneTitle="Talk in the mode your moment needs."
          slides={CHAPTER_SCREENSHOT_SLIDES.modes}
          carouselAriaLabel="North Star modes product story"
          imageGlow="mixed"
          stage={<ModesStoryCarousel />}
        >
          {MODE_GUARDRAILS.slice(0, 3).map((guardrail) => (
            <span
              key={guardrail}
              style={{
                padding: "9px 12px",
                borderRadius: "var(--mahout_radius_chip)",
                border: "1px solid var(--mahout_outline_soft)",
                background: "rgba(255,255,255,0.035)",
                color: "var(--mahout_text_secondary)",
                fontSize: "var(--text_body_m)",
              }}
            >
              {guardrail}
            </span>
          ))}
        </ChapterIntroWithHero>

        <div
          className="modes-interaction-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--mahout_space_16)",
            marginTop: "var(--mahout_space_20)",
          }}
        >
          <GlassCard>
            <div
              className="modes-button-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "var(--mahout_space_10)",
              }}
            >
              {MODES.map((mode) => (
                <ModeButton
                  key={mode.id}
                  mode={mode}
                  active={activeMode.id === mode.id}
                  onClick={() => setActiveModeId(mode.id)}
                />
              ))}
            </div>
          </GlassCard>

          <GlassCard active>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--mahout_space_18)",
                minHeight: "100%",
              }}
            >
              <div>
                <div
                  style={{
                    color: "var(--mahout_accent)",
                    fontSize: "var(--text_caption)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "var(--mahout_space_10)",
                  }}
                >
                  {activeMode.name} mode
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font_head)",
                    fontSize: "var(--text_h3)",
                    lineHeight: 1.16,
                    color: "var(--mahout_text_primary)",
                    margin: "0 0 var(--mahout_space_10)",
                  }}
                >
                  {activeMode.visual}
                </h3>

                <p
                  style={{
                    color: "var(--mahout_text_secondary)",
                    lineHeight: "var(--leading_body)",
                    margin: 0,
                  }}
                >
                  {activeMode.use}
                </p>
              </div>

              {activeMode.id === "mentor" ? (
                <div
                  style={{
                    position: "relative",
                    minHeight: 250,
                    borderRadius: "24px",
                    border: "1px solid rgba(156,140,255,0.24)",
                    background:
                      "radial-gradient(circle at 50% 36%, rgba(156,140,255,0.18), transparent 42%), linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.018))",
                    overflow: "hidden",
                  }}
                >
                  <PremiumTransparentImage
                    src={MAHOUT_ELEMENT_IMAGES.mentorGuide}
                    alt="Mentor mode as a calm guide holding a luminous book of standards and perspective."
                    maxHeight={300}
                    minHeight={240}
                    glow="purple"
                    dropShadow={false}
                    sizes="(max-width: 900px) 88vw, 420px"
                  />
                </div>
              ) : null}

              <div
                style={{
                  padding: "16px",
                  borderRadius: "20px",
                  border: "1px solid var(--mahout_outline_soft)",
                  background: "rgba(255,255,255,0.035)",
                }}
              >
                <div
                  style={{
                    color: "var(--mahout_text_tertiary)",
                    fontSize: "var(--text_caption)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "var(--mahout_space_10)",
                  }}
                >
                  User message
                </div>
                <p
                  style={{
                    color: "var(--mahout_text_primary)",
                    margin: 0,
                    lineHeight: "var(--leading_body)",
                  }}
                >
                  {activeMode.prompt}
                </p>
              </div>

              <div
                style={{
                  padding: "16px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,211,138,0.22)",
                  background:
                    "linear-gradient(145deg, rgba(255,211,138,0.08), rgba(156,140,255,0.07))",
                }}
              >
                <div
                  style={{
                    color: "var(--mahout_text_tertiary)",
                    fontSize: "var(--text_caption)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "var(--mahout_space_10)",
                  }}
                >
                  North Star response shape
                </div>
                <p
                  style={{
                    color: "var(--mahout_text_secondary)",
                    margin: 0,
                    lineHeight: "var(--leading_body)",
                  }}
                >
                  {activeMode.response}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--mahout_space_8)",
                }}
              >
                {[activeMode.chipOne, activeMode.chipTwo].map((chip) => (
                  <span
                    key={chip}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "var(--mahout_radius_chip)",
                      border: "1px solid var(--mahout_outline_soft)",
                      background: "rgba(255,255,255,0.04)",
                      color: "var(--mahout_text_secondary)",
                      fontSize: "var(--text_body_m)",
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
}
