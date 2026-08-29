"use client";

import { useRef, useEffect, useState } from "react";
import { Container } from "./Container";
import { Chip } from "./Chip";
import { GlassCard } from "./GlassCard";
import { ChapterIntroWithHero } from "./ChapterIntroWithHero";
import { CHAPTER_SCREENSHOT_SLIDES } from "./ElementScreenshotCarousel";
import { ElementStyleHeroVisual } from "./ElementStyleHeroVisual";
import { HabitsStoryCarousel } from "./HabitsStoryCarousel";
import { MAHOUT_ELEMENT_IMAGES } from "@/lib/mahoutAssets";

const MILESTONES = [
  { day: 7, label: "Consistency" },
  { day: 14, label: "Stability" },
  { day: 21, label: "Habit", highlight: true },
  { day: 30, label: "Momentum" },
  { day: 66, label: "Behavior", highlight: true },
];

const PATTERN_CARDS = [
  {
    title: "Best block",
    value: "07:00–09:00",
    body: "Your strongest consistency window becomes visible instead of being left to memory.",
  },
  {
    title: "Comeback speed",
    value: "1 day",
    body: "Missed days stop turning into lost weeks when recovery becomes part of the system.",
  },
  {
    title: "Identity signal",
    value: "Rising",
    body: "Repeated proof compounds into self-trust, which is what makes the behavior feel real.",
  },
];

const RECEIPTS = [
  { label: "Morning routine", streak: "21 days", status: "Habit formed", accent: true },
  { label: "Reading", streak: "14 days", status: "Stability building" },
  { label: "Night journal", streak: "7 days", status: "Consistency started" },
];

export function HabitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [fillProgress, setFillProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = Math.max(0, Math.min(1, entry.intersectionRatio * 1.3));
          setFillProgress(ratio);
        });
      },
      { threshold: [0, 0.2, 0.35, 0.5, 0.7, 0.85, 1] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const circumference = 2 * Math.PI * 90;
  const displayDay = Math.round(fillProgress * 66);
  const activeMilestone =
    MILESTONES.filter((item) => displayDay >= item.day).slice(-1)[0] ?? MILESTONES[0];

  return (
    <section
      ref={sectionRef}
      id="habits"
      data-section
      data-scene="habits"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-7vw",
          top: "10%",
          width: "34vw",
          height: "34vw",
          maxWidth: 430,
          maxHeight: 430,
          borderRadius: "50%",
          background: "rgba(156,140,255,0.14)",
          filter: "blur(110px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-6vw",
          bottom: "8%",
          width: "28vw",
          height: "28vw",
          maxWidth: 340,
          maxHeight: 340,
          borderRadius: "50%",
          background: "rgba(255,211,138,0.10)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <ChapterIntroWithHero
          eyebrow="Habits"
          title="Turn repetition into identity."
          body="Path gives you daily proof. Habits turns that proof into consistency, streaks, comeback signals, and long-range behavior change that actually feels durable."
          phoneEyebrow="Habits"
          phoneTitle="Turn repetition into identity."
          slides={CHAPTER_SCREENSHOT_SLIDES.habits}
          carouselAriaLabel="Habits product story"
          heroVisual={
            <ElementStyleHeroVisual
              imageSrc={MAHOUT_ELEMENT_IMAGES.habitsSignals}
              imageAlt="21-day habit and 66-day behavior signals on a shared path of proof"
              assetSlot="habits-signals.png"
              dataElement="habits"
              carouselAriaLabel="Habits product story"
              stage={<HabitsStoryCarousel />}
              priority
            />
          }
        >
          <Chip active>Streaks</Chip>
          <Chip>Identity</Chip>
          <Chip>Consistency</Chip>
          <Chip>Comeback logic</Chip>
        </ChapterIntroWithHero>

        <div
          className="habits-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--mahout_space_16)",
            alignItems: "stretch",
          }}
        >
          <GlassCard active style={{ overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--mahout_space_24)",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "var(--mahout_space_12)",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "var(--mahout_text_tertiary)",
                      fontSize: "var(--text_caption)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    Progression arc
                  </div>

                  <div
                    style={{
                      color: "var(--mahout_text_primary)",
                      fontSize: "var(--text_h3)",
                      fontFamily: "var(--font_head)",
                      lineHeight: 1.1,
                    }}
                  >
                    From effort to behavior
                  </div>
                </div>

                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "var(--mahout_radius_pill)",
                    border: "1px solid var(--mahout_outline_soft)",
                    background: "rgba(255,255,255,0.04)",
                    color: "var(--mahout_text_secondary)",
                    fontSize: "var(--text_body_m)",
                  }}
                >
                  Active milestone:{" "}
                  <span style={{ color: "var(--mahout_text_primary)", fontWeight: 600 }}>
                    {activeMilestone.label}
                  </span>
                </div>
              </div>

              <div
                className="habits-ring-layout"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "var(--mahout_space_24)",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: 250,
                      height: 250,
                    }}
                  >
                    <svg
                      viewBox="0 0 250 250"
                      style={{
                        width: "100%",
                        height: "100%",
                        transform: "rotate(-90deg)",
                        overflow: "visible",
                      }}
                    >
                      <circle
                        cx="125"
                        cy="125"
                        r="90"
                        fill="none"
                        stroke="rgba(255,255,255,0.10)"
                        strokeWidth="10"
                      />
                      <circle
                        cx="125"
                        cy="125"
                        r="90"
                        fill="none"
                        stroke="url(#habitsGradient)"
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference * (1 - fillProgress)}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 0.8s ease" }}
                      />
                      <defs>
                        <linearGradient id="habitsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgba(156,140,255,0.96)" />
                          <stop offset="100%" stopColor="rgba(255,211,138,0.90)" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {MILESTONES.map((milestone, index) => {
                      const angle = -130 + (index / (MILESTONES.length - 1)) * 260;
                      const rad = (angle * Math.PI) / 180;
                      const x = 125 + 102 * Math.cos(rad);
                      const y = 125 + 102 * Math.sin(rad);
                      const reached = displayDay >= milestone.day;

                      return (
                        <div
                          key={milestone.day}
                          style={{
                            position: "absolute",
                            left: x - 28,
                            top: y - 18,
                            width: 56,
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              margin: "0 auto 6px",
                              background: reached ? "var(--mahout_accent)" : "rgba(255,255,255,0.18)",
                              boxShadow: reached ? "0 0 16px var(--mahout_premium_accent_2)" : "none",
                            }}
                          />
                          <div
                            style={{
                              fontSize: "var(--text_caption)",
                              color: reached
                                ? "var(--mahout_text_primary)"
                                : milestone.highlight
                                  ? "var(--mahout_accent)"
                                  : "var(--mahout_text_tertiary)",
                              fontWeight: reached || milestone.highlight ? 700 : 500,
                              lineHeight: 1.15,
                            }}
                          >
                            {milestone.day}
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: "var(--mahout_text_tertiary)",
                              lineHeight: 1.1,
                              marginTop: 3,
                            }}
                          >
                            {milestone.label}
                          </div>
                        </div>
                      );
                    })}

                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          width: 136,
                          height: 136,
                          borderRadius: "50%",
                          border: "1px solid var(--mahout_outline_soft)",
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",
                          boxShadow: "0 0 40px rgba(156,140,255,0.10)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          textAlign: "center",
                          padding: 12,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "var(--font_head)",
                            fontSize: "clamp(34px, 4vw, 44px)",
                            lineHeight: 1,
                            color: "var(--mahout_text_primary)",
                            marginBottom: 6,
                          }}
                        >
                          {displayDay}
                        </div>
                        <div
                          style={{
                            fontSize: "var(--text_caption)",
                            color: "var(--mahout_text_secondary)",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                          }}
                        >
                          days repeated
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--mahout_space_12)",
                  }}
                >
                  <div
                    style={{
                      padding: "16px 18px",
                      borderRadius: 20,
                      border: "1px solid rgba(156,140,255,0.42)",
                      background: "linear-gradient(180deg, rgba(156,140,255,0.10), rgba(255,255,255,0.03))",
                    }}
                  >
                    <div
                      style={{
                        color: "var(--mahout_accent)",
                        fontSize: "var(--text_caption)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      Core idea
                    </div>
                    <div
                      style={{
                        color: "var(--mahout_text_primary)",
                        fontSize: "var(--text_body)",
                        fontWeight: 600,
                        marginBottom: 6,
                        lineHeight: 1.4,
                      }}
                    >
                      Habits are not just tracked. They are earned through repeated proof.
                    </div>
                    <div
                      style={{
                        color: "var(--mahout_text_secondary)",
                        fontSize: "var(--text_body_m)",
                        lineHeight: 1.6,
                      }}
                    >
                      21 days starts to feel like a habit. 66 days starts to feel like behavior. The
                      system makes that progression visible.
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "var(--mahout_space_12)",
                    }}
                  >
                    {RECEIPTS.map((item) => (
                      <div
                        key={item.label}
                        style={{
                          padding: "14px 16px",
                          borderRadius: 18,
                          border: item.accent
                            ? "1px solid rgba(156,140,255,0.40)"
                            : "1px solid var(--mahout_outline_soft)",
                          background: item.accent
                            ? "rgba(156,140,255,0.10)"
                            : "rgba(255,255,255,0.03)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "var(--mahout_space_12)",
                            alignItems: "center",
                            marginBottom: 6,
                          }}
                        >
                          <div
                            style={{
                              color: "var(--mahout_text_primary)",
                              fontSize: "var(--text_body)",
                              fontWeight: 600,
                            }}
                          >
                            {item.label}
                          </div>

                          <div
                            style={{
                              color: item.accent ? "var(--mahout_accent)" : "var(--mahout_text_secondary)",
                              fontSize: "var(--text_body_m)",
                              fontWeight: 600,
                            }}
                          >
                            {item.streak}
                          </div>
                        </div>

                        <div
                          style={{
                            color: "var(--mahout_text_secondary)",
                            fontSize: "var(--text_body_m)",
                            lineHeight: 1.5,
                          }}
                        >
                          {item.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--mahout_space_16)",
            }}
          >
            {PATTERN_CARDS.map((card, index) => (
              <GlassCard key={card.title} active={index === 0}>
                <div
                  style={{
                    color: index === 0 ? "var(--mahout_accent)" : "var(--mahout_text_tertiary)",
                    fontSize: "var(--text_caption)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "var(--mahout_space_12)",
                  }}
                >
                  {card.title}
                </div>

                <div
                  style={{
                    fontFamily: "var(--font_head)",
                    fontSize: "var(--text_h3)",
                    color: "var(--mahout_text_primary)",
                    lineHeight: 1.12,
                    marginBottom: "var(--mahout_space_12)",
                  }}
                >
                  {card.value}
                </div>

                <p
                  style={{
                    color: "var(--mahout_text_secondary)",
                    fontSize: "var(--text_body_m)",
                    lineHeight: "var(--leading_body)",
                    margin: 0,
                  }}
                >
                  {card.body}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        @media (min-width: 980px) {
          .habits-grid {
            grid-template-columns: 1.08fr 0.92fr !important;
          }

          .habits-ring-layout {
            grid-template-columns: 0.95fr 1.05fr !important;
          }
        }
      `}</style>
    </section>
  );
}
