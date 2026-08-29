import { Container } from "./Container";
import { FrostShield } from "./FrostShield";
import { GlassCard } from "./GlassCard";

const NOTIFICATION_TYPES = [
  {
    label: "Today lanes",
    title: "2 lanes still open",
    body: "Mahout brings the actual day back into view instead of sending vague reminders.",
    rows: [
      { state: "done", text: "Write daily goals" },
      { state: "open", text: "Read 10 pages" },
      { state: "open", text: "Send project estimate" },
    ],
    actions: ["Open Today", "Start one"],
    family: "Daily operating surface",
  },
  {
    label: "Evening close",
    title: "Close today cleanly",
    body: "Finish one, or leave an honest note. The point is closure without shame.",
    rows: [
      { state: "done", text: "Completed goal" },
      { state: "open", text: "Open goal" },
      { state: "note", text: "Leave evening note" },
    ],
    actions: ["Close loop", "Write note"],
    family: "Evening review",
  },
  {
    label: "Future Goal deadline",
    title: "Launch portfolio reaches its date today",
    body: "Specific goal names make reminders useful. The user sees the real thing that needs attention.",
    rows: [
      { state: "open", text: "Open goal" },
      { state: "note", text: "Adjust date" },
      { state: "open", text: "Add next receipt" },
    ],
    actions: ["Open goal", "Adjust"],
    family: "Goal deadline",
  },
  {
    label: "Habit nudge",
    title: "Reading window is open",
    body: "Habit notifications use Path reminder context so repeated actions can become consistency signals.",
    rows: [
      { state: "open", text: "Read 10 pages" },
      { state: "note", text: "Best window: evening" },
      { state: "open", text: "Protect first 10 minutes" },
    ],
    actions: ["Start now", "Snooze"],
    family: "Path reminder",
  },
] as const;

const PREMIUM_LANGUAGE = [
  "specific",
  "operational",
  "calm",
  "receipt-grounded",
  "one next move",
  "no shame",
  "not generic",
] as const;

const SYSTEM_VALUES = [
  {
    title: "A notification should know what it is holding.",
    body:
      "Mahout notifications are not random pings. They carry the current lane, the open goal, the evening close, or the real habit window.",
  },
  {
    title: "The action surface stays curated.",
    body:
      "Each notification should give the user one or two useful moves, not a pile of generic actions that break the calm.",
  },
  {
    title: "The tone protects trust.",
    body:
      "Mahout can remind without shaming. It should feel like a small operating surface, not an alarm trying to win attention.",
  },
] as const;

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </div>
  );
}

function NotificationRow({ state, text }: { state: string; text: string }) {
  const symbol = state === "done" ? "✓" : state === "note" ? "•" : "○";
  const color =
    state === "done"
      ? "var(--mahout_accent)"
      : state === "note"
        ? "var(--mahout_text_tertiary)"
        : "var(--mahout_text_secondary)";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--mahout_space_8)",
        color,
        fontSize: "var(--text_body_m)",
        lineHeight: 1.35,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--mahout_outline_soft)",
          background: "rgba(255,255,255,0.035)",
          fontSize: 12,
          flex: "0 0 auto",
        }}
      >
        {symbol}
      </span>
      <span>{text}</span>
    </div>
  );
}

function NotificationMock({
  item,
  featured,
}: {
  item: (typeof NOTIFICATION_TYPES)[number];
  featured?: boolean;
}) {
  return (
    <div
      aria-label={`${item.label} notification placeholder`}
      role="img"
      style={{
        borderRadius: "28px",
        border: featured ? "1px solid rgba(255,211,138,0.42)" : "1px solid var(--mahout_outline_soft)",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.035))",
        boxShadow: featured
          ? "var(--shadow_m), 0 0 42px rgba(255,211,138,0.10)"
          : "var(--shadow_m)",
        padding: "18px",
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
            "radial-gradient(circle at 18% 12%, rgba(156,140,255,0.14), transparent 34%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "var(--mahout_space_12)",
            marginBottom: "var(--mahout_space_12)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--mahout_space_10)",
              minWidth: 0,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: 34,
                height: 34,
                borderRadius: 12,
                background:
                  "radial-gradient(circle, rgba(255,211,138,0.28), rgba(156,140,255,0.16))",
                border: "1px solid rgba(255,255,255,0.10)",
                flex: "0 0 auto",
              }}
            />
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  color: "var(--mahout_text_primary)",
                  fontWeight: 700,
                  fontSize: "var(--text_body)",
                  lineHeight: 1.2,
                }}
              >
                Mahout
              </div>
              <div
                style={{
                  color: "var(--mahout_text_tertiary)",
                  fontSize: "var(--text_caption)",
                  lineHeight: 1.2,
                }}
              >
                {item.family}
              </div>
            </div>
          </div>

          <div
            style={{
              color: "var(--mahout_text_tertiary)",
              fontSize: "var(--text_caption)",
              whiteSpace: "nowrap",
            }}
          >
            now
          </div>
        </div>

        <div
          style={{
            color: "var(--mahout_text_tertiary)",
            fontSize: "var(--text_caption)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "var(--mahout_space_8)",
          }}
        >
          {item.label}
        </div>

        <h3
          style={{
            color: "var(--mahout_text_primary)",
            fontSize: featured ? "var(--text_h3)" : "var(--text_body)",
            lineHeight: 1.18,
            margin: "0 0 var(--mahout_space_10)",
            fontFamily: featured ? "var(--font_head)" : undefined,
          }}
        >
          {item.title}
        </h3>

        <p
          style={{
            color: "var(--mahout_text_secondary)",
            fontSize: "var(--text_body_m)",
            lineHeight: "var(--leading_body)",
            margin: "0 0 var(--mahout_space_14)",
          }}
        >
          {item.body}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--mahout_space_8)",
            padding: "12px",
            borderRadius: "18px",
            background: "rgba(8,6,18,0.24)",
            border: "1px solid rgba(255,255,255,0.07)",
            marginBottom: "var(--mahout_space_14)",
          }}
        >
          {item.rows.map((row) => (
            <NotificationRow key={row.text} state={row.state} text={row.text} />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--mahout_space_8)",
          }}
        >
          {item.actions.map((action) => (
            <span
              key={action}
              style={{
                padding: "9px 12px",
                borderRadius: "var(--mahout_radius_chip)",
                border: "1px solid var(--mahout_outline_soft)",
                background: "rgba(255,255,255,0.04)",
                color: "var(--mahout_text_secondary)",
                fontSize: "var(--text_body_m)",
              }}
            >
              {action}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NotificationsOperatingSurfaceSection() {
  const featured = NOTIFICATION_TYPES[0];
  const secondary = NOTIFICATION_TYPES.slice(1);

  return (
    <section
      id="notifications"
      data-section
      data-scene="notifications"
      aria-labelledby="notifications-title"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-8vw",
          top: "8%",
          width: "34vw",
          height: "34vw",
          maxWidth: 440,
          maxHeight: 440,
          borderRadius: "50%",
          background: "rgba(156,140,255,0.13)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-8vw",
          bottom: "0%",
          width: "34vw",
          height: "34vw",
          maxWidth: 430,
          maxHeight: 430,
          borderRadius: "50%",
          background: "rgba(255,211,138,0.10)",
          filter: "blur(115px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <FrostShield
          style={{
            padding: "clamp(24px, 4vw, 38px)",
            position: "relative",
            overflow: "hidden",
            marginBottom: "var(--mahout_space_20)",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
              pointerEvents: "none",
            }}
          />

          <div
            className="notifications-hero-grid"
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--mahout_space_24)",
              alignItems: "center",
            }}
          >
            <div>
              <SectionBadge>Notifications</SectionBadge>

              <h2
                id="notifications-title"
                style={{
                  fontFamily: "var(--font_head)",
                  fontSize: "var(--text_h2)",
                  lineHeight: "1.08",
                  color: "var(--mahout_text_primary)",
                  margin: "0 0 var(--mahout_space_14)",
                  maxWidth: "13ch",
                }}
              >
                Reminders that know what your day is holding.
              </h2>

              <p
                style={{
                  color: "var(--mahout_text_secondary)",
                  fontSize: "var(--text_body)",
                  lineHeight: "var(--leading_body)",
                  maxWidth: "64ch",
                  margin: "0 0 var(--mahout_space_18)",
                }}
              >
                Mahout notifications should feel like tiny operating surfaces — specific enough to
                be useful, calm enough to trust, and grounded in the user&apos;s actual lanes,
                deadlines, actions, and receipts.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--mahout_space_8)",
                }}
              >
                {PREMIUM_LANGUAGE.map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: "9px 12px",
                      borderRadius: "var(--mahout_radius_chip)",
                      border: "1px solid var(--mahout_outline_soft)",
                      background: "rgba(255,255,255,0.035)",
                      color: "var(--mahout_text_secondary)",
                      fontSize: "var(--text_body_m)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <NotificationMock item={featured} featured />
          </div>
        </FrostShield>

        <div
          className="notifications-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--mahout_space_16)",
          }}
        >
          {secondary.map((item) => (
            <NotificationMock key={item.label} item={item} />
          ))}
        </div>

        <div
          className="notification-values-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--mahout_space_16)",
            marginTop: "var(--mahout_space_16)",
          }}
        >
          {SYSTEM_VALUES.map((value) => (
            <GlassCard key={value.title}>
              <h3
                style={{
                  fontFamily: "var(--font_head)",
                  fontSize: "var(--text_h3)",
                  lineHeight: 1.16,
                  color: "var(--mahout_text_primary)",
                  margin: "0 0 var(--mahout_space_10)",
                }}
              >
                {value.title}
              </h3>
              <p
                style={{
                  color: "var(--mahout_text_secondary)",
                  lineHeight: "var(--leading_body)",
                  margin: 0,
                }}
              >
                {value.body}
              </p>
            </GlassCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
