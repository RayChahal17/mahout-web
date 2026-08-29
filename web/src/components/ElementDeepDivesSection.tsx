import Image from "next/image";
import { Container } from "./Container";
import { FrostShield } from "./FrostShield";
import { GlassCard } from "./GlassCard";
import { Chip } from "./Chip";
import { PremiumTransparentImage } from "./PremiumTransparentImage";
import { MountainStoryCarousel } from "./MountainStoryCarousel";
import { PathStoryCarousel } from "./PathStoryCarousel";
import { ElephantStoryCarousel } from "./ElephantStoryCarousel";
import { MahoutStoryCarousel } from "./MahoutStoryCarousel";
import { ElementIconBadge, type ElementIconName } from "./ElementIcon";
import { ELEMENT_DEEP_DIVE_ASSETS } from "@/lib/mahoutAssets";
import { PathExecutionSurface } from "./PathExecutionSurface";

const ELEMENTS = [
  {
    key: "mountain",
    eyebrow: "Mountain",
    label: "Goals and direction",
    headline: "Mountain shows where you are going.",
    body:
      "Mountain holds Future Goals, Today Goals, deadlines, reviews, and the few lanes that deserve attention today. It keeps the day from becoming a scattered list.",
    memorable: "Mountain is where direction lives.",
    assetSlot: "mountain.png",
    screenshotSlot: "screenshot-mountain-goals.png",
    visualBrief:
      "A serene abstract mountain with glowing lane markers, a small path up the slope, and a North Star above the peak.",
    proof: [
      "Future Goals",
      "Today Goals",
      "A-E priority lanes",
      "Deadlines",
      "Goal reviews",
      "Linked Path actions",
    ],
    demo: [
      { label: "Future goal", value: "Build a steady deep work rhythm" },
      { label: "Today lane", value: "Complete one protected focus block" },
      { label: "Receipt", value: "Path action linked back to direction" },
    ],
    gradient:
      "radial-gradient(circle at 20% 20%, rgba(255,211,138,0.16), transparent 42%), linear-gradient(145deg, rgba(255,255,255,0.08), rgba(156,140,255,0.08))",
  },
  {
    key: "path",
    eyebrow: "Path",
    label: "Actions right now",
    headline: "Path carries the next honest step.",
    body:
      "Path is where goals become action right now. Time-based actions are measured in minutes; check-offs close the day with yes/no proof. Timeline, Today on the Path, and your action library keep execution legible.",
    memorable: "The Path is your daily actions — timed, checked, and linked.",
    assetSlot: "path.png",
    screenshotSlot: "screenshot-path-timer.png",
    visualBrief:
      "A clean glowing path made of stepping stones, timer rings, and checkmarks leading from a mountain toward the viewer.",
    proof: [
      "Actions",
      "Timers",
      "Checkoffs",
      "Reminders",
      "Path sessions",
      "Effort receipts",
    ],
    demo: [
      { label: "Time-based", value: "Read · 30 min goal · Play when it is time" },
      { label: "Check-off", value: "Sleep before 10:15pm · Checked or open" },
      { label: "Linked goal", value: "Read 4 business books · roll-up in real time" },
    ],
    gradient:
      "radial-gradient(circle at 72% 18%, rgba(156,140,255,0.16), transparent 42%), linear-gradient(145deg, rgba(255,255,255,0.07), rgba(89,109,255,0.09))",
  },
  {
    key: "elephant",
    eyebrow: "Elephant",
    label: "Emotional weather",
    headline: "Your emotions are not noise. They are part of the map.",
    body:
      "Elephant helps the user notice what they are carrying. Mood logs and emotional check-ins can hand context to North Star, so difficult feelings receive guidance instead of being left alone.",
    memorable: "Elephant holds the feeling layer.",
    assetSlot: "elephant.png",
    screenshotSlot: "screenshot-elephant-mood.png",
    visualBrief:
      "An elegant minimal elephant silhouette surrounded by moon, cloud, rain, sun, and soft rhythm waves.",
    proof: [
      "Mood logs",
      "Emotional check-ins",
      "Mood trends",
      "Feeling-state context",
      "Personal rhythm",
      "Guidance tone",
    ],
    demo: [
      { label: "Mood", value: "Calm but stretched" },
      { label: "Pattern", value: "Tension rises after fragmented afternoons" },
      { label: "Context", value: "Guidance responds with the right softness" },
    ],
    gradient:
      "radial-gradient(circle at 78% 26%, rgba(255,211,138,0.10), transparent 38%), linear-gradient(145deg, rgba(255,255,255,0.07), rgba(194,126,255,0.08))",
  },
  {
    key: "mahout",
    eyebrow: "Mahout",
    label: "Reflection and meaning",
    headline: "Some days do not need more pressure. They need to be understood.",
    body:
      "Mahout is the reflective space where the user slows down and tells the truth. Journaling and reflection turn the day into meaning, not just completion.",
    memorable: "Mahout is your journal: say it plainly; patterns emerge in the quiet.",
    assetSlot: "mahout-reflection.png",
    screenshotSlot: "screenshot-mahout-reflection.png",
    visualBrief:
      "An open journal with glowing handwritten lines, an inner compass, soft memory fragments, and lavender shadows.",
    proof: [
      "Journal entries",
      "Reflections",
      "Saved insights",
      "Meaning",
      "Identity",
      "Self-understanding",
    ],
    demo: [
      { label: "Reflection", value: "I returned when I made the next step small enough." },
      { label: "Meaning", value: "The day becomes readable, not just measured" },
      { label: "Memory", value: "What matters can be carried forward" },
    ],
    gradient:
      "radial-gradient(circle at 20% 72%, rgba(255,211,138,0.12), transparent 38%), linear-gradient(145deg, rgba(255,255,255,0.07), rgba(156,140,255,0.10))",
  },
] as const;

const ELEMENT_ORDER = ["Mountain", "Path", "Elephant", "Mahout"];

const ELEMENT_ICON_BY_NAME: Record<(typeof ELEMENT_ORDER)[number], ElementIconName> = {
  Mountain: "mountain",
  Path: "path",
  Elephant: "elephant",
  Mahout: "mahout",
};

type ElementDeepDive = (typeof ELEMENTS)[number];

const ELEMENT_SEQUENCE_START = 2;

const SCREENSHOT_RULES = [
  "Use clean demo data only.",
  "Avoid private personal details.",
  "No debug labels or clipped text.",
  "Keep screenshot lighting and crop consistent.",
  "Use placeholders until final images are ready.",
];

function ElementIconPlaceholder({
  label,
  fileName,
  visualBrief,
  imageSrc,
}: {
  label: string;
  fileName: string;
  visualBrief: string;
  imageSrc?: string;
}) {
  if (imageSrc) {
    return (
      <div
        style={{
          position: "relative",
          minHeight: 280,
          borderRadius: 34,
          border: "1px solid var(--mahout_outline_soft)",
          background:
            "radial-gradient(circle at 50% 30%, rgba(156,140,255,0.14), transparent 40%), linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          overflow: "hidden",
        }}
      >
        <PremiumTransparentImage
          src={imageSrc}
          alt={`${label} — transparent Mahout element illustration`}
          maxHeight={380}
          minHeight={260}
          glow={label === "Mountain" ? "gold" : label === "Elephant" ? "purple" : "mixed"}
          sizes="(max-width: 900px) 92vw, 480px"
        />
      </div>
    );
  }

  return (
    <div
      aria-label={`${label} transparent element asset placeholder`}
      style={{
        position: "relative",
        minHeight: 260,
        borderRadius: 34,
        border: "1px solid var(--mahout_outline_soft)",
        background:
          "radial-gradient(circle at 50% 34%, rgba(156,140,255,0.22), transparent 34%), linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025))",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "22px",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "64%",
          aspectRatio: "1",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "inset 0 0 50px rgba(156,140,255,0.08)",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "44%",
          aspectRatio: "1",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,211,138,0.20), rgba(156,140,255,0.20), transparent 72%)",
          filter: "blur(2px)",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "min(180px, 52vw)",
          aspectRatio: "1",
          borderRadius: 42,
          border: "1px dashed rgba(255,255,255,0.26)",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03) 56%, rgba(156,140,255,0.16))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          textAlign: "center",
          padding: 18,
        }}
      >
        <span
          style={{
            color: "var(--mahout_text_primary)",
            fontFamily: "var(--font_head)",
            fontSize: "clamp(20px, 3vw, 28px)",
            lineHeight: 1.05,
          }}
        >
          {label}
        </span>

        <span
          style={{
            color: "var(--mahout_text_tertiary)",
            fontSize: "10px",
            lineHeight: 1.35,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          /public/elements/{fileName}
        </span>
      </div>

      <p
        style={{
          position: "absolute",
          left: 18,
          right: 18,
          bottom: 16,
          color: "var(--mahout_text_tertiary)",
          fontSize: "var(--text_caption)",
          lineHeight: 1.45,
          margin: 0,
          textAlign: "center",
        }}
      >
        {visualBrief}
      </p>
    </div>
  );
}

function PhoneScreenshotPlaceholder({
  label,
  fileName,
}: {
  label: string;
  fileName: string;
}) {
  return (
    <div
      aria-label={`${label} app screenshot placeholder`}
      style={{
        position: "relative",
        width: "min(280px, 100%)",
        margin: "0 auto",
        aspectRatio: "0.52",
        borderRadius: 42,
        padding: 12,
        border: "1px solid rgba(156,140,255,0.38)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025)), rgba(6,8,14,0.72)",
        boxShadow: "0 24px 90px rgba(0,0,0,0.32), 0 0 46px rgba(156,140,255,0.12)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 56,
          height: 5,
          borderRadius: 999,
          margin: "0 auto 12px",
          background: "rgba(255,255,255,0.20)",
        }}
      />

      <div
        style={{
          height: "calc(100% - 17px)",
          borderRadius: 30,
          border: "1px dashed rgba(255,255,255,0.24)",
          background:
            "radial-gradient(circle at 50% 18%, rgba(156,140,255,0.16), transparent 36%), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 18,
        }}
      >
        <div>
          <div
            style={{
              color: "var(--mahout_accent)",
              fontSize: "10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Screenshot slot
          </div>

          <div
            style={{
              color: "var(--mahout_text_primary)",
              fontSize: "15px",
              fontWeight: 800,
              lineHeight: 1.25,
              marginBottom: 10,
            }}
          >
            {label}
          </div>

          <div
            style={{
              color: "var(--mahout_text_tertiary)",
              fontSize: "11px",
              lineHeight: 1.45,
            }}
          >
            Replace this frame with a clean staged app screenshot when assets are ready.
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 8,
          }}
        >
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              style={{
                height: 34,
                borderRadius: 14,
                background:
                  item === 0
                    ? "linear-gradient(90deg, rgba(156,140,255,0.20), rgba(255,211,138,0.13))"
                    : "rgba(255,255,255,0.055)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: -28,
          transform: "translateX(-50%)",
          width: "min(260px, calc(100vw - 80px))",
          padding: "8px 10px",
          borderRadius: "var(--mahout_radius_pill)",
          border: "1px solid var(--mahout_outline_soft)",
          background: "rgba(6,8,14,0.78)",
          color: "var(--mahout_text_tertiary)",
          fontSize: "10px",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        /public/screenshots/{fileName}
      </div>
    </div>
  );
}

function DemoReceipt({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(90px, 0.36fr) 1fr",
        gap: 12,
        padding: "12px 14px",
        borderRadius: 18,
        border: "1px solid var(--mahout_outline_soft)",
        background: "rgba(255,255,255,0.035)",
      }}
    >
      <div
        style={{
          color: "var(--mahout_text_tertiary)",
          fontSize: "var(--text_caption)",
          letterSpacing: "0.07em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "var(--mahout_text_primary)",
          fontSize: "var(--text_body_m)",
          lineHeight: 1.45,
          fontWeight: 600,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ElementProofList({ items }: { items: readonly string[] }) {
  return (
    <div
      className="element-deep-proof-chip-row"
    >
      {items.map((item) => (
        <Chip key={item} variant="summary" className="element-deep-proof-chip">
          {item}
        </Chip>
      ))}
    </div>
  );
}

function ElementReceiptCard({
  order,
  label,
  value,
}: {
  order: string;
  label: string;
  value: string;
}) {
  return (
    <GlassCard
      className="north-star-origin-step-card element-deep-receipt-card"
      style={{
        padding: "18px",
        boxShadow: "var(--shadow_s)",
      }}
    >
      <div className="north-star-origin-step-card__inner">
        <div className="north-star-origin-step-card__badge">{order}</div>
        <div>
          <h3 className="north-star-origin-step-card__title">{label}</h3>
          <p className="north-star-origin-step-card__copy">{value}</p>
        </div>
      </div>
    </GlassCard>
  );
}

function ElementProofSummaryCard({ element }: { element: ElementDeepDive }) {
  return (
    <GlassCard
      active
      className="north-star-origin-proof-card element-deep-support-card"
      style={{
        padding: "clamp(18px, 2.6vw, 28px)",
      }}
    >
      <div className="element-deep-support-stack">
        <div>
          <div className="north-star-origin-eyebrow">{element.label}</div>
          <p className="element-deep-support-lead">{element.memorable}</p>
        </div>

        <ElementProofList items={element.proof} />
      </div>
    </GlassCard>
  );
}

function ElementGroundingCard({ element }: { element: ElementDeepDive }) {
  return (
    <FrostShield
      className="north-star-origin-proof-card north-star-origin-proof-card--quiet element-deep-support-card"
      style={{
        padding: "clamp(18px, 2.4vw, 26px)",
        borderRadius: "var(--mahout_radius_card)",
        border: "1px solid var(--mahout_outline_soft)",
        background: "rgba(255,255,255,0.035)",
      }}
    >
      <div className="element-deep-support-stack">
        <div>
          <div className="north-star-origin-eyebrow">Grounded guidance</div>
          <h3 className="element-deep-support-title">
            {element.eyebrow} gives North Star useful context, not vague inspiration.
          </h3>
        </div>

        <p className="element-deep-support-copy">
          These receipts help guidance connect back to what you named, did, felt, and understood.
        </p>

        <div className="origin-receipts-grid">
          {element.proof.slice(0, 6).map((item) => (
            <div key={item} className="north-star-receipt-row">
              <span aria-hidden="true" className="north-star-receipt-row__dot" />
              <span className="north-star-receipt-row__label">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </FrostShield>
  );
}

function ElementVisualComposition({ element }: { element: ElementDeepDive }) {
  const imageSrc = ELEMENT_DEEP_DIVE_ASSETS[element.key];

  return (
    <div className="element-deep-visual-composed" data-element={element.key}>
      <div className="element-deep-art-panel" aria-label={`${element.eyebrow} origin visual`}>
        <div aria-hidden="true" className="element-deep-art-panel__halo" />
        {imageSrc ? (
          <div className="element-deep-art-image-wrap">
            <Image
            className="element-deep-art-image"
            src={imageSrc}
            alt={`${element.eyebrow} symbolic scene`}
            fill
            priority={element.key === "mountain"}
            sizes="(max-width: 900px) 92vw, 560px"
          />
          </div>
        ) : (
          <div className="element-deep-art-fallback">
            <ElementIconBadge name={element.key} size={76} iconSize={38} />
            <span>{element.eyebrow}</span>
          </div>
        )}
      </div>

      {element.key === "mountain" ? (
        <div className="element-deep-story-stage" aria-label="Mountain product stills">
          <MountainStoryCarousel />
        </div>
      ) : element.key === "path" ? (
        <div className="element-deep-story-stage" aria-label="Path product stills">
          <PathStoryCarousel />
        </div>
      ) : element.key === "elephant" ? (
        <div className="element-deep-story-stage" aria-label="Elephant product stills">
          <ElephantStoryCarousel />
        </div>
      ) : (
        <div className="element-deep-story-stage" aria-label="Mahout product stills">
          <MahoutStoryCarousel />
        </div>
      )}
    </div>
  );
}

function ElementDeepDiveCard({
  element,
  index,
}: {
  element: ElementDeepDive;
  index: number;
}) {
  return (
    <section
      id={`element-${element.key}`}
      className={`element-deep-dive-card element-deep-dive-card--${element.key}`}
    >
      <div className="origin-grid element-deep-origin-grid">
        <div className="north-star-origin-copy element-deep-copy">
          <div>
            <div className="element-deep-section-pill">
              <span aria-hidden="true" />
              {String(index + ELEMENT_SEQUENCE_START).padStart(2, "0")} · {element.eyebrow}
            </div>

            <h3 className="element-deep-headline">{element.headline}</h3>

            <p className="element-deep-body">{element.body}</p>

            <p className="element-deep-body element-deep-body--secondary">
              {element.memorable}
            </p>
          </div>
        </div>

        <ElementVisualComposition element={element} />
      </div>

      <div className="origin-steps north-star-origin-steps element-deep-receipt-grid">
        {element.demo.map((item, itemIndex) => (
          <ElementReceiptCard
            key={`${element.key}-${item.label}`}
            order={String(itemIndex + 1).padStart(2, "0")}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>

      {element.key === "path" ? <PathExecutionSurface /> : null}

      <div className="north-star-origin-support-grid element-deep-support-grid">
        <ElementProofSummaryCard element={element} />
        <ElementGroundingCard element={element} />
      </div>
    </section>
  );
}

function ScreenshotRuleCard({ item }: { item: string }) {
  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 18,
        border: "1px solid var(--mahout_outline_soft)",
        background: "rgba(255,255,255,0.035)",
        color: "var(--mahout_text_secondary)",
        fontSize: "var(--text_body_m)",
        lineHeight: 1.5,
      }}
    >
      {item}
    </div>
  );
}

function ElementNavPills() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 8,
        marginTop: "var(--mahout_space_20)",
      }}
    >
      {ELEMENTS.map((element) => (
        <a
          key={element.key}
          href={`#element-${element.key}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            minHeight: 38,
            padding: "6px 12px 6px 8px",
            borderRadius: "var(--mahout_radius_pill)",
            border: "1px solid var(--mahout_outline_soft)",
            background: "rgba(255,255,255,0.035)",
            color: "var(--mahout_text_secondary)",
            fontSize: "var(--text_body_m)",
            fontWeight: 600,
          }}
        >
          <ElementIconBadge name={element.key} size={28} iconSize={15} />
          {element.eyebrow}
        </a>
      ))}
    </div>
  );
}

function AssetImplementationNote() {
  return (
    <GlassCard
      style={{
        padding: "clamp(22px, 4vw, 30px)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "var(--mahout_space_20)",
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
            Asset handoff
          </div>

          <h3
            style={{
              color: "var(--mahout_text_primary)",
              fontFamily: "var(--font_head)",
              fontSize: "clamp(24px, 3vw, 36px)",
              lineHeight: 1.1,
              margin: "0 0 var(--mahout_space_12)",
            }}
          >
            Leave the visual slots clean until the real screenshots and element images are ready.
          </h3>

          <p
            style={{
              color: "var(--mahout_text_secondary)",
              lineHeight: "var(--leading_body)",
              margin: 0,
              maxWidth: "70ch",
            }}
          >
            These placeholders are intentional. They reserve the exact story positions for the
            future transparent element illustrations and staged Android screenshots without making
            the page look broken while assets are prepared.
          </p>
        </div>

        <div
          className="asset-rule-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--mahout_space_12)",
          }}
        >
          {SCREENSHOT_RULES.map((item) => (
            <ScreenshotRuleCard key={item} item={item} />
          ))}
        </div>

        <div
          style={{
            padding: "18px",
            borderRadius: 22,
            border: "1px solid rgba(255,211,138,0.22)",
            background:
              "linear-gradient(135deg, rgba(255,211,138,0.10), rgba(156,140,255,0.07), rgba(255,255,255,0.025))",
          }}
        >
          <div
            style={{
              color: "var(--mahout_text_primary)",
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            Replacement file map
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 8,
              color: "var(--mahout_text_secondary)",
              fontSize: "var(--text_body_m)",
              lineHeight: 1.5,
            }}
          >
            {ELEMENTS.map((element) => (
              <div key={element.key}>
                <strong style={{ color: "var(--mahout_text_primary)" }}>{element.eyebrow}:</strong>{" "}
                /public/elements/{element.assetSlot} and /public/screenshots/{element.screenshotSlot}
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export function ElementDeepDivesSection() {
  return (
    <section
      id="element-deep-dives"
      data-section
      data-scene="element-deep-dives"
      aria-label="Mountain, Path, Elephant, and Mahout sections"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "4vw",
          top: "8%",
          width: "28vw",
          height: "28vw",
          maxWidth: 340,
          maxHeight: 340,
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
          top: "38%",
          width: "34vw",
          height: "34vw",
          maxWidth: 430,
          maxHeight: 430,
          borderRadius: "50%",
          background: "rgba(255,211,138,0.09)",
          filter: "blur(118px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(36px, 6vw, 72px)",
          }}
        >
          {ELEMENTS.map((element, index) => (
            <ElementDeepDiveCard key={element.key} element={element} index={index} />
          ))}
        </div>
      </Container>

      <style>{`
        .element-order-shell {
          padding: clamp(18px, 3vw, 24px) !important;
        }

        .element-order-strip {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--mahout_space_12);
          align-items: center;
        }

        .element-order-item {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 62px;
          padding: 14px 16px;
          border-radius: 20px;
          border: 1px solid var(--mahout_outline_soft);
          background: rgba(255,255,255,0.035);
        }

        .element-order-item span {
          color: var(--mahout_text_primary);
          font-size: var(--text_body_m);
          font-weight: 800;
          line-height: 1.25;
        }

        .element-deep-dive-card {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          align-items: start;
        }

        .element-deep-origin-grid {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--stack_gap);
          align-items: start;
        }

        .element-deep-copy {
          display: flex;
          flex-direction: column;
          gap: var(--mahout_space_24);
        }

        .element-deep-section-pill {
          display: inline-flex;
          align-items: center;
          gap: var(--mahout_space_8);
          padding: 10px 14px;
          border-radius: var(--mahout_radius_pill);
          border: 1px solid var(--mahout_outline_soft);
          background: rgba(255,255,255,0.04);
          color: var(--mahout_text_secondary);
          font-size: var(--text_caption);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: var(--mahout_space_16);
        }

        .element-deep-section-pill span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--mahout_accent);
          box-shadow: 0 0 18px var(--mahout_accent);
          flex: 0 0 auto;
        }

        .element-deep-headline {
          margin: 0;
          color: var(--mahout_text_primary);
          font-family: var(--font_head);
          font-size: clamp(34px, 5vw, 58px);
          line-height: var(--leading_tight);
          max-width: 13ch;
        }

        .element-deep-body {
          margin: var(--mahout_space_16) 0 0;
          color: var(--mahout_text_secondary);
          font-size: clamp(17px, 1.5vw, 20px);
          line-height: var(--leading_body);
          max-width: 64ch;
        }

        .element-deep-body--secondary {
          margin-top: var(--mahout_space_12);
          font-size: var(--text_body);
        }

        .element-deep-proof-chip-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
        }

        .element-deep-proof-chip {
          min-height: 28px !important;
          padding: 5px 10px !important;
          line-height: 1.25 !important;
          letter-spacing: 0.02em;
        }

        .element-deep-visual-composed {
          position: relative;
          width: 100%;
          min-height: clamp(460px, 50vw, 620px);
          isolation: isolate;
          min-width: 0;
        }

        .element-deep-art-panel {
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

        .element-deep-art-panel::before,
        .element-deep-art-panel::after {
          content: "";
          position: absolute;
          pointer-events: none;
          z-index: 0;
        }

        .element-deep-art-panel::before {
          inset: 0% -4% 4%;
          border-radius: 46% 54% 42% 58%;
          background:
            radial-gradient(ellipse at 50% 42%, rgba(156,140,255,0.22), transparent 62%),
            radial-gradient(ellipse at 38% 70%, rgba(255,211,138,0.08), transparent 58%);
          filter: blur(22px);
          opacity: 0.92;
        }

        .element-deep-art-panel::after {
          left: 0;
          right: 0;
          bottom: 0;
          height: 20%;
          background: linear-gradient(180deg, transparent, rgba(6,8,16,0.62));
          z-index: 3;
        }

        .element-deep-art-panel__halo {
          position: absolute;
          width: min(620px, 88%);
          height: min(620px, 88%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(156,140,255,0.22), transparent 66%);
          filter: blur(18px);
          opacity: 0.78;
          z-index: 0;
        }

        .element-deep-art-image-wrap {
          position: relative;
          z-index: 1;
          width: min(580px, 100%);
          height: clamp(400px, 44vw, 560px);
          min-height: clamp(380px, 40vw, 540px) !important;
          border-radius: 2px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(72,54,160,0.34);
          -webkit-mask-image:
            radial-gradient(ellipse 88% 92% at 50% 48%, #000 72%, rgba(0,0,0,0.76) 86%, transparent 100%),
            linear-gradient(180deg, #000 0%, #000 86%, transparent 100%);
          mask-image:
            radial-gradient(ellipse 88% 92% at 50% 48%, #000 72%, rgba(0,0,0,0.76) 86%, transparent 100%),
            linear-gradient(180deg, #000 0%, #000 86%, transparent 100%);
          -webkit-mask-composite: source-in;
          mask-composite: intersect;
        }

        .element-deep-art-image {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
          opacity: 0.92;
          filter: saturate(1.04) contrast(1.02) !important;
        }

        .element-deep-visual-composed[data-element="mahout"] .element-deep-art-image {
          object-fit: cover !important;
          object-position: center center;
        }

        .element-deep-visual-composed[data-element="mahout"] .element-deep-art-image-wrap {
          transform: scaleX(-1);
        }

        .element-deep-visual-composed[data-element="path"] .element-deep-art-image {
          object-position: center center;
        }

        .element-deep-art-fallback {
          position: relative;
          z-index: 1;
          display: grid;
          place-items: center;
          gap: 14px;
          color: var(--mahout_text_primary);
          font-family: var(--font_head);
          font-size: clamp(26px, 4vw, 42px);
        }

        .element-deep-phone-float {
          position: absolute;
          right: clamp(0px, 1vw, 8px);
          bottom: clamp(2px, 1vw, 12px);
          z-index: 6;
          width: min(280px, 44%);
          filter: drop-shadow(0 28px 56px rgba(8,10,22,0.58));
        }

        .element-deep-phone {
          width: 100% !important;
          max-width: none !important;
        }

        .element-deep-receipt-grid {
          margin-top: clamp(24px, 3vw, 40px);
        }

        .element-deep-dive-card--path .element-deep-support-grid {
          margin-top: var(--mahout_space_8);
        }

        .element-deep-receipt-card {
          background:
            linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.026)),
            rgba(8,10,20,0.42) !important;
          border-color: rgba(255,255,255,0.13) !important;
        }

        .element-deep-support-grid {
          margin-top: var(--mahout_space_12);
        }

        .element-deep-support-grid .origin-receipts-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
        }

        .element-deep-support-stack {
          display: flex;
          flex-direction: column;
          gap: var(--mahout_space_16);
        }

        .element-deep-support-lead {
          margin: 0;
          color: var(--mahout_text_primary);
          font-size: clamp(18px, 1.8vw, 22px);
          line-height: 1.45;
          font-weight: 700;
        }

        .element-deep-support-title {
          margin: 0;
          color: var(--mahout_text_primary);
          font-family: var(--font_head);
          font-size: clamp(22px, 2.4vw, 30px);
          line-height: 1.14;
        }

        .element-deep-support-copy {
          margin: 0;
          color: var(--mahout_text_secondary);
          font-size: var(--text_body_m);
          line-height: var(--leading_relaxed);
        }

        @media (prefers-reduced-motion: no-preference) {
          .element-deep-art-image {
            animation: elementDeepArtFloat 12s ease-in-out infinite;
          }

          .element-deep-phone-float {
            animation: elementDeepPhoneFloat 9s ease-in-out infinite;
          }
        }

        @keyframes elementDeepArtFloat {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, -8px, 0) scale(1.01); }
        }

        @keyframes elementDeepPhoneFloat {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -6px, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .element-deep-art-image,
          .element-deep-phone-float {
            animation: none !important;
            transform: none !important;
          }
        }

        @media (min-width: 920px) {
          .element-deep-origin-grid {
            grid-template-columns: minmax(0, 0.88fr) minmax(440px, 1.12fr) !important;
            gap: clamp(32px, 4vw, 72px) !important;
          }

          .element-order-strip {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }

          .element-deep-receipt-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }

          .element-deep-support-grid .origin-receipts-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 720px) {
          .element-deep-headline {
            max-width: min(20ch, 100%);
            overflow-wrap: break-word;
          }
        }

        @media (max-width: 760px) {
          #element-deep-dives .element-deep-dive-card {
            gap: var(--mahout_space_16) !important;
          }

          .element-deep-visual-composed {
            min-height: auto;
            order: -1;
          }

          .element-deep-art-panel {
            min-height: clamp(330px, 68vw, 460px);
            padding-bottom: 78px;
          }

          .element-deep-art-image-wrap {
            min-height: clamp(300px, 62vw, 420px) !important;
            height: clamp(320px, 64vw, 440px);
          }

          .element-deep-phone-float {
            width: min(220px, 58%);
            right: 12px;
            bottom: 8px;
          }
        }
      `}</style>
    </section>
  );
}

