"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Container } from "./Container";
import { PhoneFrame } from "./PhoneFrame";
import { Chip } from "./Chip";
import { FrostShield } from "./FrostShield";
import { GlassCard } from "./GlassCard";

const WELCOME = {
  badge: "Chapter 2 - Core story",
  title: "Five elements. One North Star.",
  intro:
    "Mahout is not just a task app, habit tracker, journal, mood tracker, or chatbot. It starts with future vision, forms a North Star, and connects the whole person into one calm system.",
};
const CHAPTERS = [
  {
    id: "north-star",
    num: "01",
    name: "North Star",
    sub: "Ideal future self guidance",
    headline: "Future vision becomes North Star, your ideal future self guide.",
    body:
      "This guidance layer is shaped by your real pattern loop over time, not by generic chatbot responses.",
    chips: ["Future vision", "Guidance", "Context over time"],
    insight: "North Star guides from identity and lived context.",
    hue: "268deg",
  },
  {
    id: "mountain",
    num: "02",
    name: "Mountain",
    sub: "Goals and direction",
    headline: "Mountain holds your goals and direction.",
    body:
      "Direction stays visible so choices become clearer and today's effort does not drift.",
    chips: ["Goals", "Direction", "Priorities"],
    insight: "Visible direction reduces internal noise.",
    hue: "256deg",
  },
  {
    id: "path",
    num: "03",
    name: "Path",
    sub: "Actions and receipts",
    headline: "Path turns direction into actions right now.",
    body:
      "Actions, timers, checkoffs, and receipts keep execution legible and repeatable.",
    chips: ["Actions", "Timers", "Checkoffs", "Receipts"],
    insight: "Readable execution makes consistency easier.",
    hue: "240deg",
  },
  {
    id: "elephant",
    num: "04",
    name: "Elephant",
    sub: "Emotional weather",
    headline: "Elephant adds emotional context.",
    body:
      "Mood signals and patterns are surfaced early so behavior becomes understandable and steerable.",
    chips: ["Emotional weather", "Trends", "Triggers"],
    insight: "Emotional context explains behavior that checklists miss.",
    hue: "296deg",
  },
  {
    id: "mahout",
    num: "05",
    name: "Mahout",
    sub: "Reflection and meaning",
    headline: "Mahout adds reflection and meaning to the loop.",
    body:
      "Reflection connects Mountain, Path, and Elephant. Brain remembers the loop, and North Star guides with more context over time.",
    chips: ["Reflection", "Meaning", "Brain memory"],
    insight: "Reflection converts activity into learnable direction.",
    hue: "278deg",
  },
] as const;

function ScreenShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "var(--mahout_space_16)",
        alignItems: "stretch",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
        }}
      >
        <span
          style={{
            alignSelf: "flex-start",
            padding: "7px 10px",
            borderRadius: "var(--mahout_radius_pill)",
            border: "1px solid var(--mahout_outline_soft)",
            background: "rgba(255,255,255,0.04)",
            color: "var(--mahout_text_tertiary)",
            fontSize: "10px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </span>

        <div
          style={{
            color: "var(--mahout_text_primary)",
            fontWeight: 700,
            fontSize: "15px",
            lineHeight: 1.25,
            textAlign: "left",
          }}
        >
          {title}
        </div>
      </div>

      {children}
    </div>
  );
}

function AssetCard({
  label,
  fileName,
  children,
}: {
  label: string;
  fileName: string;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 190,
        borderRadius: 22,
        overflow: "hidden",
        border: "1px solid var(--mahout_outline_soft)",
        background: "rgba(255,255,255,0.04)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(6,8,14,0.10), rgba(6,8,14,0.16) 45%, rgba(6,8,14,0.78) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 12,
          borderRadius: 16,
          border: "1px dashed rgba(255,255,255,0.24)",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02) 55%, rgba(156,140,255,0.16))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          padding: "14px 12px",
        }}
      >
        <span
          style={{
            color: "var(--mahout_text_primary)",
            fontSize: "12px",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          {label}
        </span>
        <span
          style={{
            color: "var(--mahout_text_tertiary)",
            fontSize: "10px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          slot: /story/{fileName}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          left: 12,
          right: 12,
          bottom: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {children}
      </div>
    </div>
  );
}
function MiniStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        padding: "12px 12px 10px",
        borderRadius: 18,
        border: accent ? "1px solid rgba(156,140,255,0.5)" : "1px solid var(--mahout_outline_soft)",
        background: accent ? "rgba(156,140,255,0.12)" : "rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          color: "var(--mahout_text_tertiary)",
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 6,
          textAlign: "left",
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: "var(--mahout_text_primary)",
          fontSize: "14px",
          fontWeight: 600,
          lineHeight: 1.3,
          textAlign: "left",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ProgressRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 7,
          fontSize: "11px",
        }}
      >
        <span style={{ color: "var(--mahout_text_secondary)" }}>{label}</span>
        <span style={{ color: "var(--mahout_text_tertiary)" }}>{value}%</span>
      </div>

      <div
        style={{
          width: "100%",
          height: 9,
          borderRadius: 999,
          background: "rgba(255,255,255,0.07)",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            borderRadius: 999,
            background: "linear-gradient(90deg, rgba(156,140,255,0.92), rgba(255,211,138,0.88))",
          }}
        />
      </div>
    </div>
  );
}

function ChapterPhoneScene({ id }: { id: string }) {
  if (id === "mahout") {
    return (
      <ScreenShell eyebrow="Reflection" title="Evening review">
        <AssetCard label="Mahout reflection layer" fileName="mahout-reflection.png">
          <div
            style={{
              color: "var(--mahout_text_primary)",
              fontSize: "13px",
              fontWeight: 600,
              lineHeight: 1.45,
            }}
          >
            Reflection connects action and emotion into meaning.
          </div>
        </AssetCard>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%" }}>
          <MiniStat label="Clarity" value="High" accent />
          <MiniStat label="Drift detected" value="2 moments" />
        </div>
      </ScreenShell>
    );
  }

  if (id === "mountain") {
    return (
      <ScreenShell eyebrow="Direction" title="Future You Setup">
        <AssetCard label="Mountain goals and direction" fileName="mountain.png">
          <div
            style={{
              color: "var(--mahout_text_primary)",
              fontSize: "13px",
              fontWeight: 600,
              lineHeight: 1.45,
            }}
          >
            Build a life with strong health, focused craft, peace, and quiet excellence.
          </div>
        </AssetCard>

        <ProgressRow label="Health alignment" value={84} />
        <ProgressRow label="Career alignment" value={76} />
        <ProgressRow label="Peace alignment" value={69} />
      </ScreenShell>
    );
  }

  if (id === "elephant") {
    return (
      <ScreenShell eyebrow="Signals" title="Emotional pattern view">
        <AssetCard label="Elephant emotional weather" fileName="elephant.png">
          <div
            style={{
              display: "flex",
              gap: 6,
              alignItems: "flex-end",
              height: 46,
            }}
          >
            {[30, 44, 36, 54, 48, 24, 40].map((height, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  height,
                  borderRadius: 999,
                  background:
                    index === 5
                      ? "linear-gradient(180deg, rgba(255,138,138,0.95), rgba(255,138,138,0.58))"
                      : "linear-gradient(180deg, rgba(156,140,255,0.95), rgba(255,211,138,0.78))",
                  boxShadow:
                    index === 5 ? "0 0 14px rgba(255,138,138,0.28)" : "0 0 14px rgba(156,140,255,0.18)",
                }}
              />
            ))}
          </div>
        </AssetCard>

        <div
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 18,
            border: "1px solid var(--mahout_outline_soft)",
            background: "rgba(255,255,255,0.03)",
            textAlign: "left",
          }}
        >
          <div
            style={{
              color: "var(--mahout_text_primary)",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            Trigger pattern noticed
          </div>
          <div
            style={{
              color: "var(--mahout_text_secondary)",
              fontSize: "12px",
              lineHeight: 1.55,
            }}
          >
            Lower mood appears after fragmented afternoons and skipped recovery time.
          </div>
        </div>
      </ScreenShell>
    );
  }

  if (id === "path") {
    return (
      <ScreenShell eyebrow="Execution" title="Today view">
        <AssetCard label="Path actions and checkoffs" fileName="path.png">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {[
              { time: "07:00", label: "Morning routine", done: true },
              { time: "09:00", label: "Deep work block", done: true },
              { time: "15:00", label: "Admin sweep", done: false },
            ].map((item) => (
              <div
                key={item.time}
                style={{
                  display: "grid",
                  gridTemplateColumns: "52px 1fr auto",
                  gap: 8,
                  alignItems: "center",
                  padding: "8px 10px",
                  borderRadius: 14,
                  background: "rgba(6,8,14,0.40)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                <span
                  style={{
                    color: "var(--mahout_text_tertiary)",
                    fontSize: "10px",
                  }}
                >
                  {item.time}
                </span>
                <span
                  style={{
                    color: "var(--mahout_text_primary)",
                    fontSize: "12px",
                    textAlign: "left",
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: item.done ? "var(--mahout_accent)" : "transparent",
                    boxShadow: item.done ? "0 0 14px var(--mahout_premium_accent_2)" : "none",
                  }}
                />
              </div>
            ))}
          </div>
        </AssetCard>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell eyebrow="Guidance" title="North Star mode">
      <AssetCard label="North Star guidance layer" fileName="north-star.png">
        <div
          style={{
            color: "var(--mahout_text_primary)",
            fontSize: "13px",
            fontWeight: 600,
            lineHeight: 1.45,
            marginBottom: 8,
          }}
        >
          Brain memory noticed overload after fragmented afternoons. Protect one high-impact action
          tomorrow instead of trying to fix five.
        </div>
        <div
          style={{
            color: "var(--mahout_text_secondary)",
            fontSize: "12px",
            lineHeight: 1.55,
          }}
        >
          Trust-first guidance with visible user control.
        </div>
      </AssetCard>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%" }}>
        <MiniStat label="Mode" value="Reflective" accent />
        <MiniStat label="Memory" value="User controlled" />
      </div>
    </ScreenShell>
  );
}

export function PinnedScrollytelling() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 900);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const root = rootRef.current;
    if (!root) return;

    const onScroll = () => {
      const rect = root.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;
      if (scrollHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollHeight));
      const idx = Math.min(CHAPTERS.length - 1, Math.floor(progress * CHAPTERS.length));
      setActive(idx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [isDesktop]);

  const ch = CHAPTERS[active];
  const progressPct = Math.round(((active + 1) / CHAPTERS.length) * 100);

  return (
    <div
      ref={rootRef}
      data-section
      style={{
        position: "relative",
        height: isDesktop ? `${CHAPTERS.length * 100}vh` : "auto",
      }}
    >
      <div
        className="story-pin"
        style={{
          position: isDesktop ? "sticky" : "relative",
          top: 0,
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: `linear-gradient(180deg, hsl(${ch.hue} 22% 7%), rgba(6,8,14,0.98) 62%, rgba(6,8,14,1) 100%)`,
          transition: "background 0.55s ease",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.16,
            pointerEvents: "none",
          }}
        >
          <Image
            src={active === 1 || active === 4 ? "/story/mountain.png" : "/story/mahout_scene.png"}
            alt=""
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: active === 1 ? "center center" : "center",
              filter: "blur(18px) saturate(1.05)",
              transform: "scale(1.08)",
            }}
            priority={false}
          />
        </div>

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-12vw",
            top: "10%",
            width: "34vw",
            height: "34vw",
            maxWidth: 480,
            maxHeight: 480,
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
            bottom: "4%",
            width: "28vw",
            height: "28vw",
            maxWidth: 380,
            maxHeight: 380,
            borderRadius: "50%",
            background: "rgba(255,211,138,0.11)",
            filter: "blur(100px)",
            pointerEvents: "none",
          }}
        />

        <Container>
          <div
            className="story-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--mahout_space_24)",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative", zIndex: 1 }}>
              <FrostShield
                style={{
                  padding: "clamp(22px, 3vw, 30px)",
                  overflow: "hidden",
                }}
              >
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
                  {WELCOME.badge}
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font_head)",
                    fontSize: "var(--text_h2)",
                    lineHeight: "1.08",
                    color: "var(--mahout_text_primary)",
                    marginBottom: "var(--mahout_space_12)",
                    maxWidth: "12ch",
                  }}
                >
                  {WELCOME.title}
                </h2>

                <p
                  style={{
                    fontSize: "var(--text_body)",
                    color: "var(--mahout_text_secondary)",
                    lineHeight: "var(--leading_body)",
                    maxWidth: "60ch",
                    marginBottom: "var(--mahout_space_24)",
                  }}
                >
                  {WELCOME.intro}
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "var(--mahout_space_12)",
                    marginBottom: "var(--mahout_space_24)",
                  }}
                >
                  {CHAPTERS.map((item, index) => {
                    const isActive = active === index;

                    return (
                      <div
                        key={item.id}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto 1fr",
                          gap: "var(--mahout_space_12)",
                          alignItems: "start",
                          padding: "14px 14px",
                          borderRadius: 20,
                          border: isActive
                            ? "1px solid rgba(156,140,255,0.48)"
                            : "1px solid var(--mahout_outline_soft)",
                          background: isActive ? "rgba(156,140,255,0.10)" : "rgba(255,255,255,0.03)",
                          boxShadow: isActive ? "0 0 24px rgba(156,140,255,0.16)" : "none",
                          transition:
                            "background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
                          transform: isActive ? "translateY(-1px)" : "none",
                        }}
                      >
                        <div
                          style={{
                            minWidth: 48,
                            height: 34,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "var(--mahout_radius_pill)",
                            border: "1px solid var(--mahout_outline_soft)",
                            background: isActive ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                            color: isActive ? "var(--mahout_text_primary)" : "var(--mahout_text_tertiary)",
                            fontSize: "var(--text_caption)",
                            fontWeight: 700,
                          }}
                        >
                          {item.num}
                        </div>

                        <div>
                          <div
                            style={{
                              color: "var(--mahout_text_primary)",
                              fontSize: "var(--text_body)",
                              fontWeight: 600,
                              marginBottom: 4,
                            }}
                          >
                            {item.name}
                            <span
                              style={{
                                color: "var(--mahout_text_tertiary)",
                                fontWeight: 500,
                              }}
                            >
                              {" "}
                              · {item.sub}
                            </span>
                          </div>

                          <div
                            style={{
                              color: "var(--mahout_text_secondary)",
                              fontSize: "var(--text_body_m)",
                              lineHeight: 1.55,
                            }}
                          >
                            {item.insight}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <GlassCard active>
                  <div
                    style={{
                      color: "var(--mahout_accent)",
                      fontSize: "var(--text_caption)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: "var(--mahout_space_12)",
                    }}
                  >
                    {ch.num} · {ch.name}
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font_head)",
                      fontSize: "var(--text_h3)",
                      lineHeight: 1.14,
                      color: "var(--mahout_text_primary)",
                      marginBottom: "var(--mahout_space_12)",
                    }}
                  >
                    {ch.headline}
                  </h3>

                  <p
                    style={{
                      color: "var(--mahout_text_secondary)",
                      fontSize: "var(--text_body)",
                      lineHeight: "var(--leading_body)",
                      marginBottom: "var(--mahout_space_16)",
                    }}
                  >
                    {ch.body}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "var(--mahout_space_8)",
                      flexWrap: "wrap",
                      marginBottom: "var(--mahout_space_16)",
                    }}
                  >
                    {ch.chips.map((chip) => (
                      <Chip key={chip} active>
                        {chip}
                      </Chip>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: "var(--mahout_space_12)",
                      alignItems: "center",
                      paddingTop: "var(--mahout_space_16)",
                      borderTop: "1px solid var(--mahout_outline_soft)",
                    }}
                  >
                    <div
                      style={{
                        color: "var(--mahout_text_tertiary)",
                        fontSize: "var(--text_body_m)",
                      }}
                    >
                      Scroll through the five-part system and watch the visual tone change with the
                      chapter.
                    </div>

                    <div
                      style={{
                        color: "var(--mahout_text_primary)",
                        fontSize: "var(--text_caption)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {progressPct}% viewed
                    </div>
                  </div>
                </GlassCard>
              </FrostShield>
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                className="story-phone-wrap"
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 420,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: "-10% -8%",
                    background:
                      "radial-gradient(circle at center, rgba(156,140,255,0.22), transparent 55%)",
                    pointerEvents: "none",
                  }}
                />

                <div
                  className="story-phone-float"
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "var(--mahout_space_16)",
                  }}
                >
                  <PhoneFrame className="story-phone-frame">
                    <ChapterPhoneScene id={ch.id} />
                  </PhoneFrame>

                  <div style={{ width: "min(100%, 360px)" }}>
                    <GlassCard style={{ padding: "18px 18px" }}>
                      <div
                        style={{
                          color: "var(--mahout_text_primary)",
                          fontWeight: 600,
                          marginBottom: 8,
                        }}
                      >
                        Premium story layer
                      </div>
                      <div
                        style={{
                          color: "var(--mahout_text_secondary)",
                          fontSize: "var(--text_body_m)",
                          lineHeight: 1.6,
                        }}
                      >
                        Intentional visual slots keep the story premium now and make future asset
                        replacement fast and clean.
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <style>{`
          .story-phone-wrap::before {
            content: "";
            position: absolute;
            inset: 8% 14%;
            border-radius: 32px;
            border: 1px solid rgba(255,255,255,0.08);
            background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
            filter: blur(0.2px);
            pointer-events: none;
          }

          .story-phone-float {
            animation: storyFloat 7s ease-in-out infinite;
          }

          .story-phone-frame {
            width: min(100%, 320px);
          }

          @keyframes storyFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-7px); }
          }

          @media (min-width: 980px) {
            .story-grid {
              grid-template-columns: 1.04fr 0.96fr !important;
              gap: 32px !important;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .story-phone-float {
              animation: none !important;
            }
          }
        `}</style>
      </div>

      <div className="story-mobile" style={{ display: "none" }}>
        <Container>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--mahout_space_16)",
            }}
          >
            <FrostShield
              style={{
                padding: "22px",
                marginBottom: "var(--mahout_space_8)",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
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
                {WELCOME.badge}
              </div>

              <h2
                style={{
                  fontFamily: "var(--font_head)",
                  fontSize: "var(--text_h2)",
                  lineHeight: 1.1,
                  color: "var(--mahout_text_primary)",
                  marginBottom: "var(--mahout_space_12)",
                }}
              >
                {WELCOME.title}
              </h2>

              <p
                style={{
                  color: "var(--mahout_text_secondary)",
                  lineHeight: "var(--leading_body)",
                  margin: 0,
                }}
              >
                {WELCOME.intro}
              </p>
            </FrostShield>

            {CHAPTERS.map((chapter) => (
              <GlassCard key={chapter.id} active={chapter.id === "north-star"}>
                <div
                  style={{
                    color: "var(--mahout_accent)",
                    fontSize: "var(--text_caption)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "var(--mahout_space_12)",
                  }}
                >
                  {chapter.num} · {chapter.name}
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font_head)",
                    fontSize: "var(--text_h3)",
                    lineHeight: 1.16,
                    color: "var(--mahout_text_primary)",
                    marginBottom: "var(--mahout_space_12)",
                  }}
                >
                  {chapter.headline}
                </h3>

                <p
                  style={{
                    color: "var(--mahout_text_secondary)",
                    fontSize: "var(--text_body)",
                    lineHeight: "var(--leading_body)",
                    marginBottom: "var(--mahout_space_16)",
                  }}
                >
                  {chapter.body}
                </p>

                <div
                  style={{
                    marginBottom: "var(--mahout_space_16)",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "min(100%, 280px)" }}>
                    <PhoneFrame>
                      <ChapterPhoneScene id={chapter.id} />
                    </PhoneFrame>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "var(--mahout_space_8)",
                    flexWrap: "wrap",
                  }}
                >
                  {chapter.chips.map((chip) => (
                    <Chip key={chip}>{chip}</Chip>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </div>

      <style>{`
        @media (max-width: 899px) {
          .story-mobile {
            display: block !important;
          }
        }

        @media (max-width: 899px) {
          .story-pin {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}



