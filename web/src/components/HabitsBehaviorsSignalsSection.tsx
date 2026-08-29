import { type ReactNode } from "react";
import { Container } from "./Container";
import { GlassCard } from "./GlassCard";
import { Chip } from "./Chip";
import { FrostShield } from "./FrostShield";
import { PremiumChapterIntro, type PremiumChapterSlide } from "./PremiumChapterIntro";

type SignalCard = {
  title: string;
  eyebrow: string;
  body: string;
  visualLabel: string;
  points: string[];
};

type BehaviorCard = {
  label: string;
  description: string;
};

const SIGNAL_CARDS: SignalCard[] = [
  {
    eyebrow: "21 successes",
    title: "Habits show what you repeat.",
    body: "A repeated Path action can begin to look like a Habit after 21 consistent successes.",
    visualLabel: "21-day ring",
    points: ["Path-backed reps", "Streak and consistency", "Progress without fake completion"],
  },
  {
    eyebrow: "66 successes",
    title: "Behaviors show what repetition is becoming.",
    body: "Longer consistency can reveal deeper behavior: windows, friction, risk, rhythm, and recovery.",
    visualLabel: "66-day arc",
    points: ["Best window", "Consistency style", "Recovery pattern"],
  },
  {
    eyebrow: "Movement",
    title: "Trends show what is changing.",
    body: "Mood, Path behavior, and notification response can become short weekly reads grounded in logs.",
    visualLabel: "Trend lanes",
    points: ["Mood trend", "Path behavior", "Reminder response"],
  },
  {
    eyebrow: "Evidence",
    title: "Patterns show what keeps returning.",
    body: "Saved patterns should carry evidence, category, and context so North Star can use them responsibly.",
    visualLabel: "Pattern map",
    points: ["Rhythm", "Friction", "State links"],
  },
];

const SIGNAL_SCREENSHOTS: PremiumChapterSlide[] = [
  {
    eyebrow: "Habit view",
    title: "A repeated action becomes a habit signal.",
    body: "The system shows what repeats without pretending every streak is a personality change.",
    chips: ["21 successes", "Streak", "Path"],
  },
  {
    eyebrow: "Behavior card",
    title: "Longer consistency becomes a usable read.",
    body: "Behavior cards summarize windows, friction, and recovery patterns with humility.",
    chips: ["66 successes", "Window", "Recovery"],
  },
  {
    eyebrow: "Trend lane",
    title: "Movement gets separated from noise.",
    body: "Mood, action, and reminder response can become short reads that North Star can use.",
    chips: ["Mood", "Timing", "Movement"],
  },
  {
    eyebrow: "Pattern library",
    title: "What keeps returning gets evidence.",
    body: "Saved patterns carry category and proof so guidance stays grounded.",
    chips: ["Pattern", "Evidence", "Context"],
  },
];

const BEHAVIOR_TYPES: BehaviorCard[] = [
  {
    label: "Best Window",
    description: "When follow-through tends to happen with the least friction.",
  },
  {
    label: "Low Follow-Through Window",
    description: "When reminders or actions often fail to land cleanly.",
  },
  {
    label: "Consistency Style",
    description: "Whether the user is a stepper, sprinter, resetter, or boom-bust mover.",
  },
  {
    label: "At-Risk Warning",
    description: "A signal that the user may be about to break a streak or drift from a lane.",
  },
  {
    label: "Weekday Pattern",
    description: "The recurring difference between Mondays, weekends, or specific day blocks.",
  },
  {
    label: "Reminder Sensitivity",
    description: "Whether a nudge helps, annoys, or needs a softer window.",
  },
  {
    label: "General Pattern",
    description: "A repeated behavior that does not fit the smaller buckets yet but deserves attention.",
  },
];

const SIGNAL_FLOW = [
  {
    label: "Path action",
    body: "The user starts, checks off, logs, or completes the next honest step.",
  },
  {
    label: "Receipt",
    body: "The system sees time, completion, timing, and context instead of just intention.",
  },
  {
    label: "Habit",
    body: "Repeated success becomes a visible consistency signal after 21 wins.",
  },
  {
    label: "Behavior",
    body: "Longer repetition can reveal how the user follows through after 66 wins.",
  },
  {
    label: "Trend",
    body: "Movement across days and weeks becomes easier to see.",
  },
  {
    label: "Pattern",
    body: "Recurring evidence becomes guidance North Star can responsibly use.",
  },
];

const PATTERN_CATEGORIES = [
  "Rhythm",
  "Style",
  "Friction",
  "Recovery",
  "Stacking",
  "Goals",
  "State Links",
  "Preferences",
  "Pillars",
];

function roundCoord(value: number): number {
  return Math.round(value * 100) / 100;
}

function RingVisual({ kind }: { kind: "habit" | "behavior" }) {
  const count = kind === "habit" ? 21 : 66;
  const highlightEvery = kind === "habit" ? 3 : 6;
  const items = Array.from({ length: count }, (_, index) => index);

  return (
    <div
      aria-hidden="true"
      data-asset-slot={kind === "habit" ? "habit-21-ring" : "behavior-66-arc"}
      style={{
        position: "relative",
        minHeight: kind === "habit" ? 210 : 230,
        borderRadius: "28px",
        border: "1px dashed rgba(255,255,255,0.14)",
        background:
          kind === "habit"
            ? "radial-gradient(circle at 50% 50%, rgba(156,140,255,0.20), rgba(255,255,255,0.025) 58%)"
            : "radial-gradient(circle at 50% 50%, rgba(255,211,138,0.15), rgba(255,255,255,0.025) 58%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: kind === "habit" ? "32px" : "26px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.09)",
        }}
      />

      {items.map((item) => {
        const angle = (item / count) * Math.PI * 2 - Math.PI / 2;
        const radius = kind === "habit" ? 78 : 86;
        const x = roundCoord(Math.cos(angle) * radius);
        const y = roundCoord(Math.sin(angle) * radius);
        const isHighlight = item % highlightEvery === 0 || item === count - 1;
        const dotSize = isHighlight ? "9px" : "5px";

        return (
          <span
            key={item}
            style={{
              position: "absolute",
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              width: dotSize,
              height: dotSize,
              borderRadius: "50%",
              background:
                kind === "habit"
                  ? isHighlight
                    ? "rgba(156,140,255,0.95)"
                    : "rgba(156,140,255,0.34)"
                  : isHighlight
                    ? "rgba(255,211,138,0.95)"
                    : "rgba(255,211,138,0.28)",
              boxShadow: isHighlight
                ? kind === "habit"
                  ? "0 0 18px rgba(156,140,255,0.62)"
                  : "0 0 18px rgba(255,211,138,0.42)"
                : "none",
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          padding: "var(--mahout_space_24)",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font_head)",
              fontSize: kind === "habit" ? 54 : 58,
              lineHeight: 0.92,
              color: "var(--mahout_text_primary)",
              letterSpacing: "-0.08em",
            }}
          >
            {kind === "habit" ? "21" : "66"}
          </div>
          <div
            style={{
              color: "var(--mahout_text_secondary)",
              fontSize: "var(--text_caption)",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              marginTop: 8,
            }}
          >
            {kind === "habit" ? "Habit signal" : "Behavior signal"}
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalWell({
  slot,
  stamp,
  children,
}: {
  slot: string;
  stamp: string;
  children: ReactNode;
}) {
  return (
    <div className="signal-well" data-asset-slot={slot}>
      <i className="signal-well__veil" aria-hidden="true" />
      {children}
      <span className="signal-well__stamp">{stamp}</span>
    </div>
  );
}

function TrendLanesVisual() {
  return (
    <SignalWell slot="trends-line-visual" stamp="Trend lanes">
      <svg className="signal-well__svg" viewBox="0 0 420 220" aria-hidden="true">
        <defs>
          <linearGradient id="sg-lane-mood" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(169,156,255,0.18)" />
            <stop offset="0.45" stopColor="rgba(196,184,255,0.95)" />
            <stop offset="1" stopColor="rgba(251,248,240,0.88)" />
          </linearGradient>
          <linearGradient id="sg-lane-path" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(169,156,255,0.08)" />
            <stop offset="0.5" stopColor="rgba(169,156,255,0.48)" />
            <stop offset="1" stopColor="rgba(196,184,255,0.62)" />
          </linearGradient>
          <linearGradient id="sg-lane-nudge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(169,156,255,0.08)" />
            <stop offset="1" stopColor="rgba(196,184,255,0.4)" />
          </linearGradient>
          <filter id="sg-lane-glow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[58, 98, 138, 178].map((y) => (
          <path
            key={y}
            d={`M28 ${y} H392`}
            fill="none"
            stroke="rgba(232,226,248,0.06)"
            strokeWidth="1"
          />
        ))}

        <path
          d="M28 176 C 96 172, 168 166, 248 174 C 312 180, 356 168, 396 170"
          fill="none"
          stroke="url(#sg-lane-nudge)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M28 158 C 86 152, 132 160, 186 146 C 248 130, 304 142, 396 128"
          fill="none"
          stroke="url(#sg-lane-path)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M28 142 C 78 118, 108 86, 158 78 C 214 68, 248 108, 298 72 C 336 48, 368 54, 396 38"
          fill="none"
          stroke="url(#sg-lane-mood)"
          strokeWidth="2.4"
          strokeLinecap="round"
          filter="url(#sg-lane-glow)"
        />

        {[
          [28, 142, 3.2, 0.45],
          [158, 78, 4.6, 0.8],
          [298, 72, 4.2, 0.72],
          [396, 38, 5.2, 1],
        ].map(([x, y, r, glow]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={Number(r) + 5} fill={`rgba(196,184,255,${0.08 * Number(glow)})`} />
            <circle cx={x} cy={y} r={Number(r) + 2.2} fill="none" stroke="rgba(196,184,255,0.42)" strokeWidth="1" />
            <circle cx={x} cy={y} r={r} fill="#fbf8f0" />
          </g>
        ))}

        {[
          [186, 146, 3.1],
          [396, 128, 3.4],
        ].map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="rgba(196,184,255,0.7)" />
        ))}
      </svg>
    </SignalWell>
  );
}

function PatternMapVisual() {
  const nodes = [
    { x: 74, y: 74, r: 6.2, tone: "mid" },
    { x: 156, y: 36, r: 4.1, tone: "quiet" },
    { x: 328, y: 58, r: 5.8, tone: "mid" },
    { x: 248, y: 104, r: 3.3, tone: "quiet" },
    { x: 188, y: 176, r: 7.6, tone: "return" },
    { x: 92, y: 146, r: 4.7, tone: "quiet" },
    { x: 352, y: 148, r: 4.4, tone: "quiet" },
  ] as const;

  const threads: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 0],
    [0, 3],
    [2, 6],
    [6, 4],
    [1, 3],
  ];

  return (
    <SignalWell slot="patterns-map-visual" stamp="Pattern map">
      <svg className="signal-well__svg" viewBox="0 0 420 220" aria-hidden="true">
        <defs>
          <radialGradient id="sg-star-core" cx="38%" cy="32%" r="70%">
            <stop offset="0" stopColor="#fbf8f0" />
            <stop offset="1" stopColor="#c4b8ff" />
          </radialGradient>
          <filter id="sg-star-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {threads.map(([a, b]) => {
          const from = nodes[a];
          const to = nodes[b];
          const returning = from.tone === "return" || to.tone === "return";
          const far = from.tone === "quiet" && to.tone === "quiet";
          return (
            <path
              key={`${a}-${b}`}
              d={`M${from.x} ${from.y} L${to.x} ${to.y}`}
              fill="none"
              stroke={
                returning
                  ? "rgba(196,184,255,0.5)"
                  : far
                    ? "rgba(196,184,255,0.1)"
                    : "rgba(196,184,255,0.2)"
              }
              strokeWidth={returning ? 1.2 : 0.9}
            />
          );
        })}

        {nodes.map((node) => (
          <g key={`${node.x}-${node.y}`} className={node.tone === "return" ? "signal-star--return" : undefined}>
            {node.tone === "return" ? (
              <>
                <circle cx={node.x} cy={node.y} r={18} fill="rgba(196,184,255,0.08)" />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={11.5}
                  fill="none"
                  stroke="rgba(196,184,255,0.46)"
                  strokeWidth="1"
                />
              </>
            ) : null}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill={node.tone === "quiet" ? "rgba(196,184,255,0.55)" : "url(#sg-star-core)"}
              filter={node.tone !== "quiet" ? "url(#sg-star-glow)" : undefined}
            />
          </g>
        ))}
      </svg>
    </SignalWell>
  );
}

function SignalCardView({ card, index }: { card: SignalCard; index: number }) {
  return (
    <GlassCard
      active={index === 0 || index === 1}
      className="signals-premium-card"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "var(--mahout_space_18)",
        minHeight: 430,
      }}
    >
      <div>
        <div
          style={{
            color: index === 1 ? "rgba(255,211,138,0.88)" : "var(--mahout_accent)",
            fontSize: "var(--text_caption)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "var(--mahout_space_12)",
          }}
        >
          {card.eyebrow}
        </div>

        <h3
          style={{
            fontFamily: "var(--font_head)",
            fontSize: "clamp(24px, 2.6vw, 34px)",
            lineHeight: 1.04,
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
          }}
        >
          {card.body}
        </p>
      </div>

      {index === 0 ? (
        <RingVisual kind="habit" />
      ) : index === 1 ? (
        <RingVisual kind="behavior" />
      ) : index === 2 ? (
        <TrendLanesVisual />
      ) : (
        <PatternMapVisual />
      )}

      <div
        style={{
          display: "grid",
          gap: "10px",
        }}
      >
        {card.points.map((point, pointIndex) => {
          const laneDot =
            index === 2
              ? ["rgba(251,248,240,0.95)", "rgba(196,184,255,0.7)", "rgba(196,184,255,0.32)"][pointIndex]
              : null;

          return (
          <div
            key={point}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "var(--mahout_text_secondary)",
              fontSize: "var(--text_body_m)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background:
                  laneDot ??
                  (index === 1 ? "rgba(255,211,138,0.85)" : "var(--mahout_accent)"),
                boxShadow:
                  index === 1
                    ? "0 0 14px rgba(255,211,138,0.38)"
                    : "0 0 14px rgba(156,140,255,0.44)",
                flex: "0 0 auto",
              }}
            />
            {point}
          </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

export function HabitsBehaviorsSignalsSection() {
  return (
    <section
      id="signals"
      data-section
      data-scene="habits-behaviors-trends-patterns"
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
          top: "6%",
          width: "36vw",
          height: "36vw",
          maxWidth: 500,
          maxHeight: 500,
          borderRadius: "50%",
          background: "rgba(156,140,255,0.13)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <PremiumChapterIntro
          eyebrow="Habits · Behaviors · Trends · Patterns"
          title="Path does more than track actions."
          body="Repeated action can become habit. Longer consistency can reveal behavior. Trends show movement. Patterns show what keeps returning. North Star uses those signals to guide with context instead of generic motivation."
          slides={SIGNAL_SCREENSHOTS}
          ariaLabel="Habits behaviors trends and patterns screenshot story"
        >
          <Chip active>Habits</Chip>
          <Chip>Behaviors</Chip>
          <Chip>Trends</Chip>
          <Chip>Patterns</Chip>
        </PremiumChapterIntro>

        <div
          className="signals-card-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "var(--mahout_space_16)",
          }}
        >
          {SIGNAL_CARDS.map((card, index) => (
            <SignalCardView key={card.title} card={card} index={index} />
          ))}
        </div>

        <FrostShield
          style={{
            marginTop: "var(--mahout_space_24)",
            padding: "clamp(22px, 4vw, 38px)",
            borderRadius: "32px",
            border: "1px solid rgba(255,255,255,0.12)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(156,140,255,0.09), rgba(255,211,138,0.05))",
          }}
        >
          <div className="signal-flow-grid">
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
                Signal flow
              </div>

              <h3
                style={{
                  fontFamily: "var(--font_head)",
                  fontSize: "clamp(26px, 3.3vw, 44px)",
                  lineHeight: 1.04,
                  margin: "0 0 14px",
                  color: "var(--mahout_text_primary)",
                }}
              >
                From one action to a better read of your life.
              </h3>

              <p
                style={{
                  color: "var(--mahout_text_secondary)",
                  lineHeight: "var(--leading_body)",
                  margin: 0,
                  maxWidth: "52ch",
                }}
              >
                Mahout should not make fake percentages about life progress. It should
                show honest receipts, consistency windows, and evidence-backed signals the
                user can recognize.
              </p>
            </div>

            <div
              className="signal-flow-steps"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "var(--mahout_space_12)",
              }}
            >
              {SIGNAL_FLOW.map((step, index) => (
                <div
                  key={step.label}
                  style={{
                    borderRadius: "22px",
                    border: "1px solid var(--mahout_outline_soft)",
                    background: "rgba(255,255,255,0.04)",
                    padding: "16px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      right: -18,
                      top: -18,
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background:
                        index >= 3
                          ? "rgba(255,211,138,0.10)"
                          : "rgba(156,140,255,0.12)",
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--mahout_space_12)",
                      marginBottom: "var(--mahout_space_8)",
                    }}
                  >
                    <span
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "11px",
                        display: "grid",
                        placeItems: "center",
                        border: "1px solid rgba(255,255,255,0.12)",
                        background:
                          index >= 3
                            ? "rgba(255,211,138,0.11)"
                            : "rgba(156,140,255,0.13)",
                        color: "var(--mahout_text_primary)",
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      {index + 1}
                    </span>
                    <h4
                      style={{
                        margin: 0,
                        color: "var(--mahout_text_primary)",
                        fontSize: "16px",
                      }}
                    >
                      {step.label}
                    </h4>
                  </div>
                  <p
                    style={{
                      position: "relative",
                      color: "var(--mahout_text_secondary)",
                      fontSize: "var(--text_body_m)",
                      lineHeight: 1.52,
                      margin: 0,
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FrostShield>

        <div
          className="behavior-pattern-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
            gap: "var(--mahout_space_16)",
            marginTop: "var(--mahout_space_16)",
            alignItems: "stretch",
          }}
        >
          <GlassCard active style={{ height: "100%" }}>
            <div
              style={{
                color: "rgba(255,211,138,0.88)",
                fontSize: "var(--text_caption)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "var(--mahout_space_12)",
              }}
            >
              Behavior cards
            </div>
            <h3
              style={{
                fontFamily: "var(--font_head)",
                fontSize: "clamp(24px, 3vw, 38px)",
                lineHeight: 1.05,
                margin: "0 0 14px",
                color: "var(--mahout_text_primary)",
              }}
            >
              Behaviors turn repetition into a usable read.
            </h3>
            <p
              style={{
                color: "var(--mahout_text_secondary)",
                lineHeight: "var(--leading_body)",
                margin: "0 0 var(--mahout_space_24)",
              }}
            >
              These are not personality labels. They are humble, evidence-backed reads from
              repeated actions, timing, reminders, and follow-through.
            </p>

            <div style={{ display: "grid", gap: "var(--mahout_space_8)" }}>
              {BEHAVIOR_TYPES.map((item) => (
                <div
                  key={item.label}
                  style={{
                    borderRadius: "18px",
                    border: "1px solid var(--mahout_outline_soft)",
                    background: "rgba(255,255,255,0.035)",
                    padding: "14px",
                  }}
                >
                  <div
                    style={{
                      color: "var(--mahout_text_primary)",
                      fontWeight: 700,
                      marginBottom: 5,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      color: "var(--mahout_text_secondary)",
                      fontSize: "var(--text_body_m)",
                      lineHeight: 1.45,
                    }}
                  >
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard style={{ height: "100%" }}>
            <div
              style={{
                color: "var(--mahout_accent)",
                fontSize: "var(--text_caption)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "var(--mahout_space_12)",
              }}
            >
              Pattern library
            </div>

            <h3
              style={{
                fontFamily: "var(--font_head)",
                fontSize: "clamp(24px, 3vw, 38px)",
                lineHeight: 1.05,
                margin: "0 0 14px",
                color: "var(--mahout_text_primary)",
              }}
            >
              Patterns stay grounded by category and evidence.
            </h3>

            <p
              style={{
                color: "var(--mahout_text_secondary)",
                lineHeight: "var(--leading_body)",
                margin: "0 0 var(--mahout_space_24)",
              }}
            >
              When something keeps returning, Mahout can save it as a pattern with evidence
              underneath. North Star can then guide from what is actually happening, not just
              from what sounds motivational.
            </p>

            <div
              data-asset-slot="pattern-library-screenshot"
              style={{
                borderRadius: "28px",
                border: "1px dashed rgba(255,255,255,0.14)",
                background:
                  "radial-gradient(circle at 30% 20%, rgba(156,140,255,0.18), transparent 36%), linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02))",
                padding: "var(--mahout_space_24)",
                minHeight: 300,
                marginBottom: "var(--mahout_space_24)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: "10px",
                }}
              >
                {PATTERN_CATEGORIES.map((category, index) => (
                  <div
                    key={category}
                    style={{
                      minHeight: 70,
                      borderRadius: "18px",
                      border: "1px solid rgba(255,255,255,0.10)",
                      background:
                        index % 3 === 0
                          ? "rgba(156,140,255,0.10)"
                          : index % 3 === 1
                            ? "rgba(255,211,138,0.08)"
                            : "rgba(255,255,255,0.035)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: "10px",
                      color: "var(--mahout_text_secondary)",
                      fontSize: "var(--text_body_m)",
                      fontWeight: 600,
                    }}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: "16px",
                borderRadius: "22px",
                border: "1px solid var(--mahout_outline_soft)",
                background: "rgba(255,255,255,0.035)",
              }}
            >
              <div
                style={{
                  color: "var(--mahout_text_primary)",
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                Example signal
              </div>
              <p
                style={{
                  color: "var(--mahout_text_secondary)",
                  fontSize: "var(--text_body_m)",
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                &ldquo;You follow through better when the day starts with one clear lane instead of a
                full list.&rdquo;
              </p>
            </div>
          </GlassCard>
        </div>
      </Container>

      <style>{`
        .signal-well {
          position: relative;
          min-height: 236px;
          overflow: hidden;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background:
            radial-gradient(ellipse at 22% 8%, rgba(169, 156, 255, 0.18), transparent 42%),
            radial-gradient(ellipse at 82% 92%, rgba(156, 140, 255, 0.1), transparent 48%),
            linear-gradient(180deg, #161428 0%, #0b0a12 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .signal-well__veil {
          position: absolute;
          inset: 18% 10% auto;
          height: 46%;
          border-radius: 50%;
          background: radial-gradient(ellipse at 50% 40%, rgba(196, 184, 255, 0.14), transparent 68%);
          pointer-events: none;
        }

        .signal-well__svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .signal-well__stamp {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 2;
          padding: 7px 11px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(9, 10, 18, 0.62);
          color: rgba(232, 226, 248, 0.72);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .signal-star--return {
          transform-origin: 188px 176px;
        }

        @media (prefers-reduced-motion: no-preference) {
          .signal-star--return {
            animation: signalStarBreath 5.6s ease-in-out infinite;
          }
        }

        @keyframes signalStarBreath {
          0%, 100% { opacity: 0.88; }
          50% { opacity: 1; }
        }

        .signal-flow-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
          gap: clamp(22px, 4vw, 44px);
          align-items: start;
        }

        @media (max-width: 980px) {
          .signals-card-grid,
          .signal-flow-grid,
          .behavior-pattern-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 680px) {
          .signal-flow-steps {
            grid-template-columns: 1fr !important;
          }

          [data-asset-slot="pattern-library-screenshot"] > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
