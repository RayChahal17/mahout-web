"use client";

import { useState } from "react";
import { Container } from "./Container";
import { GlassCard } from "./GlassCard";
import { Chip } from "./Chip";
import { FrostShield } from "./FrostShield";

const FORGE_GROUPS = [
  ["Health", "Career", "Peace"],
  ["Gentle", "Balanced", "Intense"],
  ["Morning", "Afternoon", "Evening"],
];

const BRAIN_CARDS = [
  {
    id: "voice",
    name: "Voice & boundaries",
    desc: "Tell North Star how to speak, coach, and where the line is.",
    bullets: ["Tone and coaching style", "Hard boundaries", "What it must never do"],
  },
  {
    id: "identity",
    name: "Identity & direction",
    desc: "The person you are building toward and the values that shape that path.",
    bullets: ["Who you're becoming", "Core pillars", "Future direction"],
  },
  {
    id: "mentors",
    name: "Mentors",
    desc: "Advice filtered through people whose judgment you deeply respect.",
    bullets: ["Mentor profiles", "Why they matter", "Lens-based guidance"],
  },
  {
    id: "memories",
    name: "Memories",
    desc: "Summaries and atoms with user-visible control over what stays.",
    bullets: ["Daily summaries", "Memory atoms", "Delete anytime"],
  },
  {
    id: "trends",
    name: "Trends",
    desc: "Patterns over time that make drift, momentum, and recovery visible.",
    bullets: ["Mood trends", "Habit trends", "Behavior shifts"],
  },
  {
    id: "patterns",
    name: "Learned patterns",
    desc: "Signals that begin as learning and only become trusted when confirmed.",
    bullets: ["Candidate patterns", "Confirmed patterns", "Evidence-aware logic"],
  },
];

const MODES_SPEC = [
  {
    id: "work",
    name: "Work Focus",
    doText: "Turn your direction into the cleanest possible next step for today.",
    wont: "No silent commits.",
  },
  {
    id: "solve",
    name: "Problem Solving",
    doText: "Surface options, tradeoffs, and the decision logic behind them.",
    wont: "At most one necessary question.",
  },
  {
    id: "reflect",
    name: "Reflective",
    doText: "Help you notice what happened and what it likely meant.",
    wont: "No logistics unless asked.",
  },
  {
    id: "mentor",
    name: "Mentor",
    doText: "Respond through a chosen mentor lens without becoming fluffy.",
    wont: "No silent commits.",
  },
  {
    id: "motivate",
    name: "Motivator",
    doText: "Restore belief and momentum without turning into generic hype.",
    wont: "No silent commits.",
  },
  {
    id: "creative",
    name: "Creative",
    doText: "Help ideas land before they disappear.",
    wont: "At most one clarifying question.",
  },
  {
    id: "auto",
    name: "Auto",
    doText: "Choose the best posture per message and show that choice visibly.",
    wont: "No hidden mode changes.",
  },
] as const;

const CHAT_STATES: Record<
  (typeof MODES_SPEC)[number]["id"],
  { user: string; response: string; replies: string[]; actionChip?: string }
> = {
  work: {
    user: "What should I focus on today?",
    response:
      "Your highest-leverage move is the homepage hero. Path already has a protected block for it. Start there before smaller tasks dilute the day.",
    replies: ["Start now", "Move the block", "What comes after?"],
    actionChip: "Start 2h block",
  },
  solve: {
    user: "Should I take the offer?",
    response:
      "You are weighing stability against autonomy. If cash pressure is rising, stability matters more. If runway is healthy, autonomy may compound more strongly.",
    replies: ["Lean stability", "Lean autonomy", "Need more data"],
  },
  reflect: {
    user: "I feel scattered.",
    response:
      "Your week shows repeated context switching. The feeling may not be laziness at all. It may be residue from too many open loops and not enough protected depth.",
    replies: ["That fits", "What now?", "Say more"],
  },
  mentor: {
    user: "How would my mentor approach this?",
    response:
      "They would likely simplify the situation first: identify the real constraint, remove vanity complexity, then decide from first principles rather than mood.",
    replies: ["Name the constraint", "Another mentor lens", "Simplify this"],
  },
  motivate: {
    user: "I keep avoiding the hard thing.",
    response:
      "You do not need a perfect day. You need one honest start. Open the file, work for five minutes, and let momentum earn the next five.",
    replies: ["Do 5 min", "Why am I resisting?", "Stay with me"],
    actionChip: "Start 5 minutes",
  },
  creative: {
    user: "I have an idea but it is still vague.",
    response:
      "Capture before you refine. One sentence for the core. Three bullets for the shape. Editing comes after preservation.",
    replies: ["Capture now", "Talk it through", "Save as draft"],
  },
  auto: {
    user: "Help.",
    response:
      "Auto â€¢ Reflective. It looks like this week carried more weight than usual. Do you need clarity first, or a next step strong enough to calm the noise?",
    replies: ["Clarity", "Next step", "Both"],
  },
};

const MEMORY_ATOMS = ["session: 2h deep work", "check: vitamins", "mood: steady", "theme: hero focus"];

const CONTEXT_INCLUDED = ["Brain summary", "Today Path items", "Memory summaries", "Mode boundaries"];
const CONTEXT_EXCLUDED = ["Raw journals", "Raw letters", "Private drafts"];

type ModeId = (typeof MODES_SPEC)[number]["id"];

function SmallButton({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        minHeight: 44,
        padding: "0 16px",
        borderRadius: "var(--mahout_radius_pill)",
        border: active ? "1px solid rgba(156,140,255,0.5)" : "1px solid var(--mahout_outline_soft)",
        background: active ? "rgba(156,140,255,0.14)" : "rgba(255,255,255,0.03)",
        color: "var(--mahout_text_primary)",
        fontWeight: 600,
        fontSize: "var(--text_body_m)",
        boxShadow: active ? "0 0 20px rgba(156,140,255,0.14)" : "none",
        transition: "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {children}
    </button>
  );
}
export function NorthStarSection() {
  const [forgeVisible, setForgeVisible] = useState(false);
  const [activeMode, setActiveMode] = useState<ModeId>("work");
  const [expandedBrain, setExpandedBrain] = useState<string | null>("identity");
  const [atomsVisible, setAtomsVisible] = useState(true);
  const [atomsDeleted, setAtomsDeleted] = useState(false);
  const [patternConfirmed, setPatternConfirmed] = useState(false);
  const [rawJournals, setRawJournals] = useState(false);

  const activeChat = CHAT_STATES[activeMode];
  const activeModeSpec = MODES_SPEC.find((mode) => mode.id === activeMode)!;

  return (
    <section
      id="north-star"
      data-section
      data-scene="north-star"
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse 72% 44% at 50% 12%, rgba(156,140,255,0.16), transparent 58%), radial-gradient(ellipse 54% 30% at 82% 36%, rgba(255,211,138,0.10), transparent 62%)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-8vw",
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
          top: "20%",
          width: "28vw",
          height: "28vw",
          maxWidth: 360,
          maxHeight: 360,
          borderRadius: "50%",
          background: "rgba(255,211,138,0.10)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <FrostShield
          style={{
            maxWidth: 900,
            margin: "0 auto var(--mahout_space_24)",
            padding: "clamp(24px, 4vw, 34px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative" }}>
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
              North Star
            </div>

            <h2
              style={{
                fontFamily: "var(--font_head)",
                fontSize: "var(--text_h2)",
                color: "var(--mahout_text_primary)",
                textAlign: "center",
                lineHeight: "1.08",
                marginBottom: "var(--mahout_space_12)",
                maxWidth: "13ch",
                marginInline: "auto",
              }}
            >
              Intelligence that feels guided, premium, and trustworthy.
            </h2>

            <p
              style={{
                fontSize: "var(--text_body)",
                color: "var(--mahout_text_secondary)",
                textAlign: "center",
                maxWidth: "60ch",
                margin: "0 auto var(--mahout_space_16)",
                lineHeight: "var(--leading_body)",
              }}
            >
              North Star is not just an AI chat surface. It is a guidance layer shaped by your future
              direction, your memory, your patterns, your boundaries, and the way you want help to
              feel.
            </p>

            <p
              style={{
                fontSize: "var(--text_body_m)",
                color: "var(--mahout_text_tertiary)",
                textAlign: "center",
                maxWidth: "56ch",
                margin: "0 auto",
                lineHeight: 1.65,
              }}
            >
              No silent commits. No hidden action changes. Guidance stays visible, user-shaped, and
              grounded in trust.
            </p>
          </div>
        </FrostShield>

        <div
          className="northstar-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--mahout_space_16)",
            marginBottom: "var(--mahout_space_16)",
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
                  Future You Setup
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
                  Three taps, then your guidance layer is forged.
                </h3>

                <p
                  style={{
                    color: "var(--mahout_text_secondary)",
                    fontSize: "var(--text_body)",
                    lineHeight: "var(--leading_body)",
                    marginBottom: "var(--mahout_space_16)",
                  }}
                >
                  Direction, intensity, and timing help form the initial shape of North Star. The
                  system begins with your intent, then evolves through visible memory and behavior.
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "var(--mahout_space_8)",
                    flexWrap: "wrap",
                    marginBottom: "var(--mahout_space_16)",
                  }}
                >
                  <Chip active>Identity-aware</Chip>
                  <Chip>Memory-aware</Chip>
                  <Chip>Boundary-aware</Chip>
                </div>
              </div>

              <div
                onMouseEnter={() => setForgeVisible(true)}
                onMouseLeave={() => setForgeVisible(false)}
                style={{
                  padding: "18px",
                  borderRadius: 24,
                  border: forgeVisible
                    ? "1px solid rgba(156,140,255,0.45)"
                    : "1px solid var(--mahout_outline_soft)",
                  background: forgeVisible
                    ? "linear-gradient(180deg, rgba(156,140,255,0.10), rgba(255,255,255,0.03))"
                    : "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                  transition: "background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                  boxShadow: forgeVisible ? "0 0 24px rgba(156,140,255,0.12)" : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "var(--mahout_space_12)",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginBottom: "var(--mahout_space_16)",
                  }}
                >
                  <div
                    style={{
                      color: "var(--mahout_text_primary)",
                      fontWeight: 600,
                      fontSize: "var(--text_body)",
                    }}
                  >
                    Forging preview
                  </div>

                  <SmallButton active={forgeVisible} onClick={() => setForgeVisible((value) => !value)}>
                    {forgeVisible ? "Reset preview" : "Forge preview"}
                  </SmallButton>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "var(--mahout_space_12)",
                  }}
                >
                  {FORGE_GROUPS.map((row, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: "var(--mahout_space_8)",
                        flexWrap: "wrap",
                      }}
                    >
                      {row.map((item) => (
                        <Chip key={item} active={forgeVisible}>
                          {item}
                        </Chip>
                      ))}
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "var(--mahout_space_16)",
                    paddingTop: "var(--mahout_space_16)",
                    borderTop: "1px solid var(--mahout_outline_soft)",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "var(--mahout_space_12)",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      color: "var(--mahout_text_secondary)",
                      fontSize: "var(--text_body_m)",
                      lineHeight: 1.6,
                    }}
                  >
                    {forgeVisible
                      ? "North Star begins with a visible user-shaped setup, then compounds through lived evidence."
                      : "3 taps. Then North Star is formed around how you want to live, work, and be guided."}
                  </div>

                  <div
                    style={{
                      padding: "10px 14px",
                      borderRadius: "var(--mahout_radius_pill)",
                      border: "1px solid var(--mahout_outline_soft)",
                      background: "rgba(255,255,255,0.04)",
                      color: forgeVisible ? "var(--mahout_accent)" : "var(--mahout_text_tertiary)",
                      fontSize: "var(--text_caption)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {forgeVisible ? "Forged" : "Ready"}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard style={{ height: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--mahout_space_16)",
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
                    marginBottom: "var(--mahout_space_12)",
                  }}
                >
                  Why it feels premium
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
                  Guidance that knows your system without feeling like a black box.
                </h3>

                <p
                  style={{
                    color: "var(--mahout_text_secondary)",
                    fontSize: "var(--text_body)",
                    lineHeight: "var(--leading_body)",
                    margin: 0,
                  }}
                >
                  North Star becomes powerful when memory, patterns, boundaries, and direction all
                  reinforce each other. The user can still see, shape, and remove what matters.
                </p>
              </div>

              <div
                className="northstar-metric-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "var(--mahout_space_12)",
                }}
              >
                {[
                  { value: "1", label: "guidance layer" },
                  { value: "0", label: "silent commits" },
                  { value: "100%", label: "visible intent" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      padding: "16px 18px",
                      borderRadius: 20,
                      border: "1px solid var(--mahout_outline_soft)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font_head)",
                        fontSize: "clamp(24px, 3vw, 34px)",
                        color: "var(--mahout_text_primary)",
                        marginBottom: 4,
                        lineHeight: 1,
                      }}
                    >
                      {item.value}
                    </div>
                    <div
                      style={{
                        color: "var(--mahout_text_secondary)",
                        fontSize: "var(--text_body_m)",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        <section style={{ marginBottom: "var(--mahout_space_16)" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "var(--mahout_space_24)",
            }}
          >
            <div
              style={{
                color: "var(--mahout_accent)",
                fontSize: "var(--text_caption)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "var(--mahout_space_12)",
              }}
            >
              The Brain
            </div>

            <h3
              style={{
                fontFamily: "var(--font_head)",
                fontSize: "var(--text_h2)",
                lineHeight: 1.08,
                color: "var(--mahout_text_primary)",
                marginBottom: "var(--mahout_space_12)",
              }}
            >
              A real intelligence system, not just a chat box.
            </h3>

            <p
              style={{
                color: "var(--mahout_text_secondary)",
                fontSize: "var(--text_body)",
                lineHeight: "var(--leading_body)",
                maxWidth: "58ch",
                margin: "0 auto",
              }}
            >
              Tap a card to expand the specific layer. Each one contributes to how North Star thinks,
              guides, and stays aligned with the user.
            </p>
          </div>

          <div
            className="northstar-brain-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--mahout_space_12)",
            }}
          >
            {BRAIN_CARDS.map((card) => {
              const expanded = expandedBrain === card.id;

              return (
                <GlassCard
                  key={card.id}
                  active={expanded}
                  onClick={() => setExpandedBrain(expanded ? null : card.id)}
                  style={{
                    cursor: "pointer",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--mahout_space_12)",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "var(--mahout_space_12)",
                        alignItems: "start",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            color: expanded ? "var(--mahout_accent)" : "var(--mahout_text_tertiary)",
                            fontSize: "var(--text_caption)",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            marginBottom: 8,
                          }}
                        >
                          Brain layer
                        </div>

                        <div
                          style={{
                            color: "var(--mahout_text_primary)",
                            fontSize: "var(--text_body)",
                            fontWeight: 600,
                            marginBottom: 6,
                          }}
                        >
                          {card.name}
                        </div>
                      </div>

                      <div
                        style={{
                          minWidth: 34,
                          height: 34,
                          borderRadius: "50%",
                          border: "1px solid var(--mahout_outline_soft)",
                          background: expanded ? "rgba(156,140,255,0.12)" : "rgba(255,255,255,0.03)",
                          color: expanded ? "var(--mahout_accent)" : "var(--mahout_text_tertiary)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {expanded ? "âˆ’" : "+"}
                      </div>
                    </div>

                    <p
                      style={{
                        color: "var(--mahout_text_secondary)",
                        fontSize: "var(--text_body_m)",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {card.desc}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "var(--mahout_space_8)",
                      }}
                    >
                      {card.bullets.map((bullet) => (
                        <Chip key={bullet} active={expanded}>
                          {bullet}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </section>

        <div
          className="northstar-lab-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--mahout_space_16)",
            marginBottom: "var(--mahout_space_16)",
          }}
        >
          <GlassCard active>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--mahout_space_24)",
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
                    marginBottom: "var(--mahout_space_12)",
                  }}
                >
                  Memory Lab
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
                  You can see what it knows. You can remove what you do not want remembered.
                </h3>

                <p
                  style={{
                    color: "var(--mahout_text_secondary)",
                    fontSize: "var(--text_body)",
                    lineHeight: "var(--leading_body)",
                    margin: 0,
                  }}
                >
                  Memory starts with summaries and atoms. Patterns begin as learning and only become
                  trusted when the system has evidence or the user confirms them.
                </p>
              </div>

              <div
                style={{
                  padding: "18px",
                  borderRadius: 24,
                  border: "1px solid var(--mahout_outline_soft)",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "var(--mahout_space_16)",
                  }}
                >
                  <div
                    style={{
                      padding: "16px 18px",
                      borderRadius: 18,
                      border: "1px solid var(--mahout_outline_soft)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <div
                      style={{
                        color: "var(--mahout_text_tertiary)",
                        fontSize: "var(--text_caption)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      Daily memory summary
                    </div>

                    <div
                      style={{
                        color: "var(--mahout_text_primary)",
                        fontSize: "var(--text_body)",
                        fontWeight: 600,
                        marginBottom: 8,
                      }}
                    >
                      3 sessions logged Â· 5 check-offs completed Â· mood steady
                    </div>

                    <div
                      style={{
                        color: "var(--mahout_text_secondary)",
                        fontSize: "var(--text_body_m)",
                        lineHeight: 1.6,
                      }}
                    >
                      Key theme: focused on the homepage hero and held momentum through the first half
                      of the day.
                    </div>
                  </div>

                  <div
                    className="northstar-actions-row"
                    style={{
                      display: "flex",
                      gap: "var(--mahout_space_8)",
                      flexWrap: "wrap",
                    }}
                  >
                    <SmallButton active={atomsVisible && !atomsDeleted} onClick={() => setAtomsVisible((value) => !value)}>
                      {atomsVisible ? "Hide atoms" : "Show atoms"}
                    </SmallButton>

                    <SmallButton active={atomsDeleted} onClick={() => setAtomsDeleted(true)}>
                      Delete atoms
                    </SmallButton>

                    <SmallButton active={patternConfirmed} onClick={() => setPatternConfirmed(true)}>
                      Confirm pattern
                    </SmallButton>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "var(--mahout_space_8)",
                      flexWrap: "wrap",
                      opacity: atomsVisible && !atomsDeleted ? 1 : 0.34,
                      transition: "opacity 0.25s ease",
                    }}
                  >
                    {MEMORY_ATOMS.map((item) => (
                      <Chip key={item} active={!atomsDeleted}>
                        {item}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard style={{ height: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--mahout_space_16)",
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
                    marginBottom: "var(--mahout_space_12)",
                  }}
                >
                  Pattern trust
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
                  Learning first. Confirmation when the signal is strong enough.
                </h3>

                <p
                  style={{
                    color: "var(--mahout_text_secondary)",
                    fontSize: "var(--text_body)",
                    lineHeight: "var(--leading_body)",
                    marginBottom: "var(--mahout_space_16)",
                  }}
                >
                  North Star should not act overconfidently. It earns trust by showing candidate
                  patterns first, then promoting them only when they are supported.
                </p>
              </div>

              <div
                style={{
                  padding: "16px 18px",
                  borderRadius: 20,
                  border: patternConfirmed
                    ? "1px solid rgba(156,140,255,0.45)"
                    : "1px solid var(--mahout_outline_soft)",
                  background: patternConfirmed
                    ? "linear-gradient(180deg, rgba(156,140,255,0.10), rgba(255,255,255,0.03))"
                    : "rgba(255,255,255,0.03)",
                }}
              >
                <div
                  style={{
                    color: patternConfirmed ? "var(--mahout_accent)" : "var(--mahout_text_tertiary)",
                    fontSize: "var(--text_caption)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  {patternConfirmed ? "Confirmed pattern" : "Learning pattern"}
                </div>

                <div
                  style={{
                    color: "var(--mahout_text_primary)",
                    fontSize: "var(--text_body)",
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  Lower mood appears after fragmented afternoons and skipped recovery.
                </div>

                <div
                  style={{
                    color: "var(--mahout_text_secondary)",
                    fontSize: "var(--text_body_m)",
                    lineHeight: 1.6,
                  }}
                >
                  {patternConfirmed
                    ? "This signal is now treated as trusted guidance because the user confirmed it."
                    : "This signal is still exploratory and should be treated carefully until it is confirmed."}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        <section style={{ marginBottom: "var(--mahout_space_16)" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "var(--mahout_space_24)",
            }}
          >
            <div
              style={{
                color: "var(--mahout_accent)",
                fontSize: "var(--text_caption)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "var(--mahout_space_12)",
              }}
            >
              Modes
            </div>

            <h3
              style={{
                fontFamily: "var(--font_head)",
                fontSize: "var(--text_h2)",
                lineHeight: 1.08,
                color: "var(--mahout_text_primary)",
                marginBottom: "var(--mahout_space_12)",
              }}
            >
              The tone changes visibly, but trust stays constant.
            </h3>

            <p
              style={{
                color: "var(--mahout_text_secondary)",
                fontSize: "var(--text_body)",
                lineHeight: "var(--leading_body)",
                maxWidth: "58ch",
                margin: "0 auto",
              }}
            >
              Each mode has a defined posture. The user should be able to feel the difference in how
              North Star responds and what it refuses to do.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "var(--mahout_space_8)",
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: "var(--mahout_space_24)",
            }}
          >
            {MODES_SPEC.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setActiveMode(mode.id)}
                style={{
                  minHeight: 44,
                  padding: "0 16px",
                  borderRadius: "var(--mahout_radius_pill)",
                  border:
                    activeMode === mode.id
                      ? "1px solid rgba(156,140,255,0.5)"
                      : "1px solid var(--mahout_outline_soft)",
                  background:
                    activeMode === mode.id ? "rgba(156,140,255,0.14)" : "rgba(255,255,255,0.03)",
                  color: "var(--mahout_text_primary)",
                  fontWeight: 600,
                  fontSize: "var(--text_body_m)",
                  boxShadow: activeMode === mode.id ? "0 0 20px rgba(156,140,255,0.14)" : "none",
                  transition: "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                {mode.name}
              </button>
            ))}
          </div>

          <div
            className="northstar-chat-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--mahout_space_16)",
              alignItems: "stretch",
            }}
          >
            <GlassCard active style={{ height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--mahout_space_16)",
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
                  <div
                    style={{
                      color: "var(--mahout_accent)",
                      fontSize: "var(--text_caption)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Active mode Â· {activeModeSpec.name}
                  </div>

                  <div
                    style={{
                      padding: "10px 14px",
                      borderRadius: "var(--mahout_radius_pill)",
                      border: "1px solid var(--mahout_outline_soft)",
                      background: "rgba(255,255,255,0.04)",
                      color: "var(--mahout_text_secondary)",
                      fontSize: "var(--text_caption)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Trust-first
                  </div>
                </div>

                <div
                  style={{
                    padding: "16px 18px",
                    borderRadius: 20,
                    border: "1px solid var(--mahout_outline_soft)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <div
                    style={{
                      color: "var(--mahout_text_tertiary)",
                      fontSize: "var(--text_caption)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    You
                  </div>
                  <div
                    style={{
                      color: "var(--mahout_text_primary)",
                      fontSize: "var(--text_body)",
                      lineHeight: 1.6,
                    }}
                  >
                    {activeChat.user}
                  </div>
                </div>

                <div
                  style={{
                    padding: "18px",
                    borderRadius: 22,
                    border: "1px solid rgba(156,140,255,0.38)",
                    background:
                      "linear-gradient(180deg, rgba(156,140,255,0.12), rgba(255,255,255,0.03))",
                    boxShadow: "0 0 24px rgba(156,140,255,0.10)",
                  }}
                >
                  <div
                    style={{
                      color: "var(--mahout_text_tertiary)",
                      fontSize: "var(--text_caption)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    North Star
                  </div>

                  <div
                    style={{
                      color: "var(--mahout_text_primary)",
                      fontSize: "var(--text_body)",
                      lineHeight: 1.7,
                    }}
                  >
                    {activeChat.response}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "var(--mahout_space_8)",
                    flexWrap: "wrap",
                  }}
                >
                  {activeChat.replies.map((reply) => (
                    <Chip key={reply}>{reply}</Chip>
                  ))}
                </div>

                {activeChat.actionChip && (
                  <div
                    style={{
                      display: "flex",
                      gap: "var(--mahout_space_8)",
                      flexWrap: "wrap",
                    }}
                  >
                    <Chip active>{activeChat.actionChip}</Chip>
                  </div>
                )}
              </div>
            </GlassCard>

            <GlassCard style={{ height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--mahout_space_16)",
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
                      marginBottom: "var(--mahout_space_12)",
                    }}
                  >
                    Mode contract
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
                    What this mode will do, and what it will not do.
                  </h3>
                </div>

                <div
                  style={{
                    padding: "16px 18px",
                    borderRadius: 20,
                    border: "1px solid var(--mahout_outline_soft)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <div
                    style={{
                      color: "var(--mahout_text_tertiary)",
                      fontSize: "var(--text_caption)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    Will do
                  </div>

                  <div
                    style={{
                      color: "var(--mahout_text_primary)",
                      fontSize: "var(--text_body)",
                      fontWeight: 600,
                      lineHeight: 1.55,
                    }}
                  >
                    {activeModeSpec.doText}
                  </div>
                </div>

                <div
                  style={{
                    padding: "16px 18px",
                    borderRadius: 20,
                    border: "1px solid var(--mahout_outline_soft)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <div
                    style={{
                      color: "var(--mahout_text_tertiary)",
                      fontSize: "var(--text_caption)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    Will not do
                  </div>

                  <div
                    style={{
                      color: "var(--mahout_text_secondary)",
                      fontSize: "var(--text_body)",
                      lineHeight: 1.55,
                    }}
                  >
                    {activeModeSpec.wont}
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        <div id="privacy" data-scene="privacy">
          <div
            style={{
              textAlign: "center",
              marginBottom: "var(--mahout_space_24)",
            }}
          >
            <div
              style={{
                color: "var(--mahout_accent)",
                fontSize: "var(--text_caption)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "var(--mahout_space_12)",
              }}
            >
              Privacy
            </div>

            <h3
              style={{
                fontFamily: "var(--font_head)",
                fontSize: "var(--text_h2)",
                lineHeight: 1.08,
                color: "var(--mahout_text_primary)",
                marginBottom: "var(--mahout_space_12)",
              }}
            >
              Privacy that feels engineered, not merely promised.
            </h3>

            <p
              style={{
                color: "var(--mahout_text_secondary)",
                fontSize: "var(--text_body)",
                lineHeight: "var(--leading_body)",
                maxWidth: "58ch",
                margin: "0 auto",
              }}
            >
              The context pack makes it clear what is included, what stays out by default, and where
              the user remains in control.
            </p>
          </div>

          <div
            className="northstar-privacy-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--mahout_space_16)",
            }}
          >
            <GlassCard active>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "var(--mahout_space_16)",
                }}
              >
                <div
                  className="northstar-context-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "var(--mahout_space_16)",
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
                      Included
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "var(--mahout_space_8)",
                        flexWrap: "wrap",
                      }}
                    >
                      {CONTEXT_INCLUDED.map((item) => (
                        <Chip key={item} active>
                          {item}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "16px 18px",
                      borderRadius: 20,
                      border: "1px solid var(--mahout_outline_soft)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <div
                      style={{
                        color: "var(--mahout_text_tertiary)",
                        fontSize: "var(--text_caption)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      Excluded by default
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "var(--mahout_space_8)",
                        flexWrap: "wrap",
                      }}
                    >
                      {CONTEXT_EXCLUDED.map((item) => (
                        <Chip key={item}>{item}</Chip>
                      ))}
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
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--mahout_space_12)",
                      cursor: "pointer",
                      color: "var(--mahout_text_primary)",
                      fontSize: "var(--text_body_m)",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={rawJournals}
                      onChange={(e) => setRawJournals(e.target.checked)}
                    />
                    <span>Include raw journals</span>
                    {rawJournals && (
                      <span
                        style={{
                          color: "#f87171",
                          fontSize: "var(--text_caption)",
                        }}
                      >
                        Not recommended
                      </span>
                    )}
                  </label>

                  <button
                    type="button"
                    onClick={() => setAtomsDeleted(true)}
                    style={{
                      minHeight: 48,
                      padding: "0 16px",
                      borderRadius: "var(--mahout_radius_button)",
                      border: "1px solid var(--mahout_outline_soft)",
                      background: "rgba(255,255,255,0.03)",
                      color: "var(--mahout_text_secondary)",
                      textAlign: "left",
                      fontSize: "var(--text_body_m)",
                    }}
                  >
                    Delete memory now
                  </button>
                </div>
              </div>
            </GlassCard>

            <GlassCard style={{ height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--mahout_space_16)",
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
                      marginBottom: "var(--mahout_space_12)",
                    }}
                  >
                    Principle
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
                    The user should never wonder what the system is carrying forward.
                  </h3>

                  <p
                    style={{
                      color: "var(--mahout_text_secondary)",
                      fontSize: "var(--text_body)",
                      lineHeight: "var(--leading_body)",
                      margin: 0,
                    }}
                  >
                    Premium trust comes from legibility. Users should be able to understand the context
                    pack, control the memory layer, and know where the limits are.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </Container>

      <style>{`
        @media (min-width: 980px) {
          .northstar-grid {
            grid-template-columns: 1.08fr 0.92fr !important;
          }

          .northstar-metric-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }

          .northstar-brain-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }

          .northstar-lab-grid {
            grid-template-columns: 1.08fr 0.92fr !important;
          }

          .northstar-chat-grid {
            grid-template-columns: 1.06fr 0.94fr !important;
          }

          .northstar-privacy-grid {
            grid-template-columns: 1.06fr 0.94fr !important;
          }

          .northstar-context-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
