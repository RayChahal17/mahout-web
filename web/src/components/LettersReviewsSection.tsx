import { Container } from "./Container";
import { GlassCard } from "./GlassCard";
import { ChapterIntroWithHero } from "./ChapterIntroWithHero";
import { CHAPTER_SCREENSHOT_SLIDES } from "./ElementScreenshotCarousel";
import { LettersStoryCarousel } from "./LettersStoryCarousel";
import { MAHOUT_ELEMENT_IMAGES } from "@/lib/mahoutAssets";

const RITUALS = [
  {
    label: "Morning Letter",
    title: "Begin with direction.",
    body:
      "A calm start that reads the strongest recent signals and turns them into one grounded focus for the day.",
    proof: "Future goals, Today Goals, recent actions, moods, reflection, and memory can all become context.",
    visualLabel: "Sunrise letter placeholder",
  },
  {
    label: "Evening Letter",
    title: "Close the loop honestly.",
    body:
      "A softer night read that helps the user understand what happened, what mattered, and what should not be forgotten.",
    proof: "Receipts become meaning: what was chosen, avoided, carried, completed, and repeated.",
    visualLabel: "Moonlight letter placeholder",
  },
  {
    label: "Weekly Review",
    title: "Connect the receipts.",
    body:
      "A wider review that looks across goals, actions, moods, reflections, habits, behaviors, trends, and patterns.",
    proof: "The week becomes a story the user can act on, not a pile of disconnected logs.",
    visualLabel: "Seven-day review placeholder",
  },
] as const;

const RECEIPT_SIGNALS = [
  "strongest 2–4 signals",
  "one clear next move",
  "goals and actions",
  "moods and reflections",
  "habits and behaviors",
  "patterns with evidence",
] as const;

const WEEK_ARC = [
  { day: "Mon", signal: "Direction", state: "One lane named" },
  { day: "Tue", signal: "Action", state: "Deep work receipt" },
  { day: "Wed", signal: "Weather", state: "Calm but stretched" },
  { day: "Thu", signal: "Friction", state: "Afternoon drift" },
  { day: "Fri", signal: "Recovery", state: "Returned smaller" },
  { day: "Sat", signal: "Meaning", state: "Reflection saved" },
  { day: "Sun", signal: "Review", state: "Next week shaped" },
] as const;

function ReceiptSignalPill({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: "9px 12px",
        borderRadius: "var(--mahout_radius_pill)",
        border: "1px solid var(--mahout_outline_soft)",
        background: "rgba(255,255,255,0.035)",
        color: "var(--mahout_text_secondary)",
        fontSize: "var(--text_body_m)",
        lineHeight: 1.25,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  );
}

export function LettersReviewsSection() {
  return (
    <section
      id="letters-reviews"
      data-section
      data-scene="letters-reviews"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10vw",
          top: "4%",
          width: "36vw",
          height: "36vw",
          maxWidth: 460,
          maxHeight: 460,
          borderRadius: "50%",
          background: "rgba(255,211,138,0.10)",
          filter: "blur(110px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-8vw",
          bottom: "2%",
          width: "34vw",
          height: "34vw",
          maxWidth: 440,
          maxHeight: 440,
          borderRadius: "50%",
          background: "rgba(156,140,255,0.16)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <ChapterIntroWithHero
          eyebrow="Letters and reviews"
          title="Letters from your receipts."
          body="Mahout is not trying to send generic motivation. Morning letters, evening letters, and weekly reviews are meant to feel like your future self writing from what actually happened."
          mainImageSrc={MAHOUT_ELEMENT_IMAGES.letters}
          mainImageAlt="Morning, evening, and weekly letters grounded in receipts"
          assetSlot="letters.png"
          phoneEyebrow="Letters"
          phoneTitle="Letters from your receipts."
          slides={CHAPTER_SCREENSHOT_SLIDES.letters}
          carouselAriaLabel="Letters and reviews product story"
          imageGlow="gold"
          stage={<LettersStoryCarousel />}
        >
          {RECEIPT_SIGNALS.slice(0, 4).map((signal) => (
            <ReceiptSignalPill key={signal} label={signal} />
          ))}
        </ChapterIntroWithHero>

        <div
          className="rituals-card-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--mahout_space_16)",
          }}
        >
          {RITUALS.map((ritual) => (
            <GlassCard key={ritual.label} style={{ height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--mahout_space_18)",
                  height: "100%",
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
                    {ritual.label}
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
                    {ritual.title}
                  </h3>

                  <p
                    style={{
                      color: "var(--mahout_text_secondary)",
                      fontSize: "var(--text_body)",
                      lineHeight: "var(--leading_body)",
                      margin: "0 0 var(--mahout_space_12)",
                    }}
                  >
                    {ritual.body}
                  </p>

                  <p
                    style={{
                      color: "var(--mahout_text_tertiary)",
                      fontSize: "var(--text_body_m)",
                      lineHeight: "var(--leading_body)",
                      margin: 0,
                    }}
                  >
                    {ritual.proof}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard
          style={{
            marginTop: "var(--mahout_space_16)",
            padding: "var(--mahout_space_20)",
          }}
        >
          <div
            className="weekly-arc-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--mahout_space_12)",
              alignItems: "stretch",
            }}
          >
            {WEEK_ARC.map((day, index) => (
              <div
                key={day.day}
                style={{
                  padding: "14px",
                  borderRadius: "18px",
                  border: "1px solid var(--mahout_outline_soft)",
                  background:
                    index === WEEK_ARC.length - 1
                      ? "rgba(255,211,138,0.10)"
                      : "rgba(255,255,255,0.035)",
                }}
              >
                <div
                  style={{
                    color: "var(--mahout_text_tertiary)",
                    fontSize: "var(--text_caption)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  {day.day}
                </div>
                <div
                  style={{
                    color: "var(--mahout_text_primary)",
                    fontWeight: 650,
                    marginBottom: 4,
                  }}
                >
                  {day.signal}
                </div>
                <div
                  style={{
                    color: "var(--mahout_text_secondary)",
                    fontSize: "var(--text_body_m)",
                    lineHeight: 1.35,
                  }}
                >
                  {day.state}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </Container>
    </section>
  );
}
