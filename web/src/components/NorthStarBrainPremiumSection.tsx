import { Container } from "./Container";
import { GlassCard } from "./GlassCard";
import { Chip } from "./Chip";
import { FrostShield } from "./FrostShield";
import { ChapterIntroWithHero } from "./ChapterIntroWithHero";
import { CHAPTER_SCREENSHOT_SLIDES } from "./ElementScreenshotCarousel";
import { BrainStoryCarousel } from "./BrainStoryCarousel";
import { MAHOUT_ELEMENT_IMAGES } from "@/lib/mahoutAssets";

type BrainCard = {
  eyebrow: string;
  title: string;
  body: string;
  visual: string;
  status: "owned" | "derived" | "bridge";
};

type EvidenceChip = {
  label: string;
  value: string;
};

const BRAIN_CARDS: BrainCard[] = [
  {
    eyebrow: "User-owned",
    title: "Voice & Boundaries",
    body: "How North Star should speak, coach, encourage, challenge, and what it should avoid.",
    visual: "Voice ring",
    status: "owned",
  },
  {
    eyebrow: "User-owned",
    title: "Identity & Vision",
    body: "The future-self core: pillars, values, long-range direction, and who the user is becoming.",
    visual: "Core crystal",
    status: "owned",
  },
  {
    eyebrow: "User-owned",
    title: "Mentors & Influences",
    body: "Chosen influences shape standards, taste, questions, and Mentor-mode lenses without impersonation.",
    visual: "Guiding lights",
    status: "owned",
  },
  {
    eyebrow: "User-owned",
    title: "Hobbies & Life Texture",
    body: "The interests and rhythms that make the user feel like themselves, not just productive.",
    visual: "Warm constellation",
    status: "owned",
  },
  {
    eyebrow: "User-owned",
    title: "Finances & Constraints",
    body: "Calm direction around money, targets, limits, and life-building decisions without hype.",
    visual: "Calm ledger",
    status: "owned",
  },
  {
    eyebrow: "Bridge",
    title: "Memories",
    body: "Saved context and continuity by day, month, and year, with user-visible control.",
    visual: "Memory cards",
    status: "bridge",
  },
  {
    eyebrow: "AI-derived",
    title: "Learned",
    body: "Candidate insights that should be reviewed before becoming durable truth.",
    visual: "Learning sprout",
    status: "derived",
  },
  {
    eyebrow: "AI-derived",
    title: "Patterns",
    body: "Confirmed recurring signals with evidence underneath, so guidance stays grounded.",
    visual: "Pattern map",
    status: "derived",
  },
  {
    eyebrow: "AI-derived",
    title: "Signals & Trends",
    body: "Short reads from mood, Path behavior, timing, notification response, and momentum.",
    visual: "Signal beams",
    status: "derived",
  },
];

const BRAIN_RECEIPTS: EvidenceChip[] = [
  { label: "Future vision", value: "Life being built" },
  { label: "Goals", value: "Future + Today" },
  { label: "Path", value: "Actions + receipts" },
  { label: "Elephant", value: "Mood context" },
  { label: "Mahout", value: "Reflection" },
  { label: "Memory", value: "Continuity" },
  { label: "Patterns", value: "Evidence-backed" },
  { label: "Reviews", value: "Letters + weekly read" },
];

const EVOLUTION_POINTS = [
  {
    time: "Morning",
    title: "Direction check",
    body: "North Star can begin from the user's future vision, Today Goals, and the strongest current lane.",
  },
  {
    time: "Afternoon",
    title: "Receipt update",
    body: "Actions, timers, checkoffs, mood, and reflection become new evidence for the day.",
  },
  {
    time: "Evening",
    title: "Meaning layer",
    body: "The Brain can connect what happened, what mattered, and what should carry into tomorrow.",
  },
];

const BRAIN_TRUST_LINES = [
  "Owned sections stay user-owned and readable.",
  "Derived intelligence stays evidence-aware, not magical.",
  "Deleted or hidden memory should not return to future guidance.",
];

function StatusPill({ status }: { status: BrainCard["status"] }) {
  const label =
    status === "owned"
      ? "User-owned"
      : status === "derived"
        ? "Derived intelligence"
        : "Continuity bridge";

  const color =
    status === "owned"
      ? "rgba(156,140,255,0.22)"
      : status === "derived"
        ? "rgba(255,211,138,0.16)"
        : "rgba(133,207,188,0.14)";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        width: "fit-content",
        minHeight: 28,
        padding: "6px 10px",
        borderRadius: "var(--mahout_radius_pill)",
        border: "1px solid var(--mahout_outline_soft)",
        background: color,
        color: "var(--mahout_text_secondary)",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.04em",
      }}
    >
      {label}
    </span>
  );
}

function BrainCard({ card, index }: { card: BrainCard; index: number }) {
  return (
    <GlassCard
      active={index === 1 || index === 7}
      className="brain-premium-card"
      style={{
        height: "100%",
        minHeight: 260,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "var(--mahout_space_12)",
            marginBottom: "var(--mahout_space_16)",
          }}
        >
          <StatusPill status={card.status} />
          <div
            aria-hidden="true"
            style={{
              width: 44,
              height: 44,
              borderRadius: "16px",
              border: "1px solid var(--mahout_outline_soft)",
              background:
                card.status === "owned"
                  ? "radial-gradient(circle at 50% 40%, rgba(156,140,255,0.34), rgba(255,255,255,0.04))"
                  : card.status === "derived"
                    ? "radial-gradient(circle at 50% 40%, rgba(255,211,138,0.28), rgba(255,255,255,0.04))"
                    : "radial-gradient(circle at 50% 40%, rgba(133,207,188,0.25), rgba(255,255,255,0.04))",
              boxShadow: "0 0 28px rgba(156,140,255,0.16)",
            }}
          />
        </div>

        <div
          style={{
            fontSize: "var(--text_caption)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--mahout_accent)",
            marginBottom: 10,
          }}
        >
          {card.eyebrow}
        </div>

        <h3
          style={{
            fontFamily: "var(--font_head)",
            fontSize: "clamp(20px, 2vw, 25px)",
            lineHeight: 1.12,
            margin: "0 0 12px",
            color: "var(--mahout_text_primary)",
          }}
        >
          {card.title}
        </h3>

        <p
          style={{
            color: "var(--mahout_text_secondary)",
            lineHeight: "var(--leading_body)",
            margin: 0,
            fontSize: "var(--text_body_m)",
          }}
        >
          {card.body}
        </p>
      </div>

      <div
        data-asset-slot={`brain-${card.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
        style={{
          marginTop: "var(--mahout_space_24)",
          padding: "12px 14px",
          borderRadius: "18px",
          border: "1px dashed rgba(255,255,255,0.14)",
          background: "rgba(255,255,255,0.035)",
          color: "var(--mahout_text_tertiary)",
          fontSize: "var(--text_caption)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--mahout_space_12)",
        }}
      >
        <span>{card.visual}</span>
        <span aria-hidden="true">◇</span>
      </div>
    </GlassCard>
  );
}

export function NorthStarBrainPremiumSection() {
  return (
    <section
      id="brain"
      data-section
      data-scene="north-star-brain"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "0 auto auto 0",
          width: "44vw",
          height: "44vw",
          maxWidth: 560,
          maxHeight: 560,
          borderRadius: "50%",
          background: "rgba(156,140,255,0.14)",
          filter: "blur(120px)",
          transform: "translate(-28%, -18%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-14%",
          bottom: "10%",
          width: "38vw",
          height: "38vw",
          maxWidth: 520,
          maxHeight: 520,
          borderRadius: "50%",
          background: "rgba(255,211,138,0.10)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <ChapterIntroWithHero
          eyebrow="North Star Brain"
          title="The Brain behind your North Star."
          body="North Star is not meant to answer from a blank page. It remembers the user's future vision, goals, actions, moods, reflections, mentors, habits, behaviors, trends, patterns, and receipts, then uses that context to guide with more continuity over time."
          mainImageSrc={MAHOUT_ELEMENT_IMAGES.brain}
          mainImageAlt="North Star Brain constellation of memory, voice, and learned signals"
          assetSlot="brain-overview-screenshot-and-constellation"
          phoneEyebrow="North Star Brain"
          phoneTitle="The Brain behind your North Star."
          slides={CHAPTER_SCREENSHOT_SLIDES.brain}
          carouselAriaLabel="North Star Brain product story"
          imageGlow="mixed"
          stage={<BrainStoryCarousel />}
        >
          {BRAIN_RECEIPTS.slice(0, 4).map((item) => (
            <Chip key={item.label} active>
              {item.label}
            </Chip>
          ))}
        </ChapterIntroWithHero>

        <div
          className="brain-card-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "var(--mahout_space_16)",
            marginTop: "var(--mahout_space_24)",
          }}
        >
          {BRAIN_CARDS.map((card, index) => (
            <BrainCard key={card.title} card={card} index={index} />
          ))}
        </div>

        <FrostShield
          className="brain-evolution-panel"
          style={{
            marginTop: "var(--mahout_space_24)",
            padding: "clamp(22px, 4vw, 38px)",
            borderRadius: "32px",
            border: "1px solid rgba(255,255,255,0.12)",
            background:
              "linear-gradient(135deg, rgba(156,140,255,0.12), rgba(255,255,255,0.035), rgba(255,211,138,0.06))",
          }}
        >
          <div className="brain-evolution-grid">
            <div>
              <div
                style={{
                  color: "var(--mahout_accent)",
                  fontSize: "var(--text_caption)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "var(--mahout_space_12)",
                }}
              >
                Today&apos;s Evolution
              </div>

              <h3
                style={{
                  fontFamily: "var(--font_head)",
                  fontSize: "clamp(26px, 3.2vw, 42px)",
                  lineHeight: 1.05,
                  margin: "0 0 14px",
                  color: "var(--mahout_text_primary)",
                }}
              >
                The day becomes memory in layers.
              </h3>

              <p
                style={{
                  color: "var(--mahout_text_secondary)",
                  lineHeight: "var(--leading_body)",
                  margin: 0,
                  maxWidth: "52ch",
                }}
              >
                The Brain should feel alive without feeling mysterious. Morning direction,
                action receipts, mood context, and reflection all become a cleaner read of what
                the day was building.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gap: "var(--mahout_space_12)",
              }}
            >
              {EVOLUTION_POINTS.map((point, index) => (
                <div
                  key={point.time}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "72px 1fr",
                    gap: "var(--mahout_space_16)",
                    alignItems: "start",
                    padding: "16px",
                    borderRadius: "24px",
                    border: "1px solid var(--mahout_outline_soft)",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: "18px",
                      display: "grid",
                      placeItems: "center",
                      border: "1px solid rgba(156,140,255,0.34)",
                      background:
                        index === 2
                          ? "rgba(255,211,138,0.12)"
                          : "rgba(156,140,255,0.14)",
                      color: "var(--mahout_text_primary)",
                      fontWeight: 700,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div
                      style={{
                        color: "var(--mahout_text_tertiary)",
                        fontSize: "12px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      {point.time}
                    </div>
                    <h4
                      style={{
                        fontSize: "18px",
                        margin: "0 0 6px",
                        color: "var(--mahout_text_primary)",
                      }}
                    >
                      {point.title}
                    </h4>
                    <p
                      style={{
                        color: "var(--mahout_text_secondary)",
                        fontSize: "var(--text_body_m)",
                        lineHeight: 1.55,
                        margin: 0,
                      }}
                    >
                      {point.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FrostShield>

        <div
          className="brain-trust-row"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "var(--mahout_space_12)",
            marginTop: "var(--mahout_space_16)",
          }}
        >
          {BRAIN_TRUST_LINES.map((line) => (
            <div
              key={line}
              style={{
                borderRadius: "20px",
                border: "1px solid var(--mahout_outline_soft)",
                background: "rgba(255,255,255,0.03)",
                padding: "14px 16px",
                color: "var(--mahout_text_secondary)",
                fontSize: "var(--text_body_m)",
                lineHeight: 1.45,
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </Container>

      <style>{`
        .brain-premium-layout {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(360px, 1.08fr);
          gap: clamp(28px, 5vw, 64px);
          align-items: center;
        }

        .brain-evolution-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
          gap: clamp(22px, 4vw, 44px);
          align-items: start;
        }

        @media (max-width: 980px) {
          .brain-premium-layout,
          .brain-evolution-grid {
            grid-template-columns: 1fr !important;
          }

          .brain-card-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 680px) {
          .brain-card-grid,
          .brain-trust-row,
          .brain-receipt-grid {
            grid-template-columns: 1fr !important;
          }

          .brain-premium-copy {
            text-align: left;
          }

          [data-asset-slot="brain-overview-screenshot-and-constellation"] {
            min-height: 440px !important;
          }
        }
      `}</style>
    </section>
  );
}
