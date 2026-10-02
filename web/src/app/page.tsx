import { Container } from "@/components/Container";
import { GlassCard } from "@/components/GlassCard";
import { HeroSection } from "@/components/HeroSection";
import { JourneyOrbitSection } from "@/components/JourneyOrbitSection";
import { NorthStarOriginSection } from "@/components/NorthStarOriginSection";
import { ConnectedLoopSection } from "@/components/ConnectedLoopSection";
import { ElementDeepDivesSection } from "@/components/ElementDeepDivesSection";
import { HabitsSection } from "@/components/HabitsSection";
import { NorthStarBrainPremiumSection } from "@/components/NorthStarBrainPremiumSection";
import { HabitsBehaviorsSignalsSection } from "@/components/HabitsBehaviorsSignalsSection";
import { LettersReviewsSection } from "@/components/LettersReviewsSection";
import { ConversationModesSection } from "@/components/ConversationModesSection";
import { EonexLockup } from "@/components/EonexBrand";
import { PlayStoreLink } from "@/components/PlayStoreLink";
import { LenisProvider } from "@/components/LenisProvider";
import { FaqSection } from "@/components/FaqSection";

const PILLAR_ITEMS = [
  {
    eyebrow: "Direction",
    title: "Mountain shows where you are going.",
    body: "Future Goals, Today Goals, deadlines, and reviews keep the day connected to the life the user is building.",
  },
  {
    eyebrow: "Execution",
    title: "Path shows what you are doing now.",
    body: "Actions, timers, checkoffs, reminders, sessions, and receipts make intention visible and usable.",
  },
  {
    eyebrow: "Memory",
    title: "Brain keeps guidance from becoming generic.",
    body: "Goals, actions, moods, reflections, habits, behaviors, trends, patterns, and receipts become continuity.",
  },
];

const TRUST_SIGNALS = [
  "Trust-first by design",
  "Built around receipts, not vibes",
  "No silent commits",
  "Memory should be visible and controllable",
  "Privacy that feels engineered",
];

export default function Home() {
  return (
    <LenisProvider>
      <div className="premium-page">
        <HeroSection />
        <JourneyOrbitSection />
        <NorthStarOriginSection />
        <ElementDeepDivesSection />
        <ConnectedLoopSection />
        <HabitsSection />
        <NorthStarBrainPremiumSection />
        <HabitsBehaviorsSignalsSection />
        <LettersReviewsSection />
        <ConversationModesSection />

        <section id="why" data-section>
          <Container>
            <div style={{ maxWidth: 820, margin: "0 auto var(--mahout_space_40)", textAlign: "center" }}>
              <div
                style={{
                  display: "inline-flex",
                  padding: "10px 14px",
                  borderRadius: "var(--mahout_radius_pill)",
                  border: "1px solid var(--mahout_outline_soft)",
                  background: "rgba(255,255,255,0.04)",
                  color: "var(--mahout_text_secondary)",
                  fontSize: "var(--text_caption)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "var(--mahout_space_16)",
                }}
              >
                Why Mahout
              </div>
              <h2
                style={{
                  fontFamily: "var(--font_head)",
                  fontSize: "var(--text_h2)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.04em",
                  marginBottom: "var(--mahout_space_12)",
                }}
              >
                Five elements. One North Star. A living system for becoming who you said you wanted to be.
              </h2>
              <p style={{ color: "var(--mahout_text_secondary)", fontSize: "var(--text_body)", lineHeight: "var(--leading_body)" }}>
                The website reference is the spine: Mahout is not a task app, habit tracker,
                journal, mood tracker, or chatbot. Mahout connects them into one calm life system.
              </p>
            </div>

            <div className="home-proof-grid premium-grid-3">
              {PILLAR_ITEMS.map((item) => (
                <GlassCard key={item.title} active style={{ height: "100%" }}>
                  <div
                    style={{
                      color: "var(--mahout_accent)",
                      fontSize: "var(--text_caption)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "var(--mahout_space_12)",
                    }}
                  >
                    {item.eyebrow}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font_head)",
                      fontSize: "var(--text_h3)",
                      lineHeight: 1.15,
                      marginBottom: "var(--mahout_space_12)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: "var(--mahout_text_secondary)", lineHeight: "var(--leading_body)", margin: 0 }}>
                    {item.body}
                  </p>
                </GlassCard>
              ))}
            </div>
          </Container>
        </section>

        <section id="privacy" data-section style={{ paddingTop: 0 }}>
          <Container>
            <GlassCard active>
              <div className="premium-grid-2" style={{ alignItems: "center" }}>
                <div>
                  <div
                    style={{
                      color: "var(--mahout_text_tertiary)",
                      fontSize: "var(--text_caption)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "var(--mahout_space_12)",
                    }}
                  >
                    Trust posture
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font_head)",
                      fontSize: "var(--text_h2)",
                      lineHeight: 1.1,
                      marginBottom: "var(--mahout_space_12)",
                    }}
                  >
                    Calm intelligence should feel controllable.
                  </h2>
                  <p style={{ color: "var(--mahout_text_secondary)", lineHeight: "var(--leading_body)" }}>
                    Premium does not mean more noise. It means stronger hierarchy, clearer proof,
                    real user control, and guidance grounded by receipts. Memory should stay visible,
                    removable, and clear about what it carries forward.
                  </p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--mahout_space_8)" }}>
                  {TRUST_SIGNALS.map((signal) => (
                    <span
                      key={signal}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "var(--mahout_radius_pill)",
                        border: "1px solid var(--mahout_outline_soft)",
                        background: "rgba(255,255,255,0.04)",
                        color: "var(--mahout_text_secondary)",
                        fontSize: "var(--text_caption)",
                      }}
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </Container>
        </section>

        <FaqSection />

        <section id="get-mahout" data-section style={{ paddingBottom: 150 }}>
          <Container>
            <GlassCard active style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
              <div
                style={{
                  color: "var(--mahout_text_tertiary)",
                  fontSize: "var(--text_caption)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "var(--mahout_space_12)",
                }}
              >
                Available now
              </div>
              <h2
                style={{
                  fontFamily: "var(--font_head)",
                  fontSize: "var(--text_h2)",
                  marginBottom: "var(--mahout_space_12)",
                }}
              >
                Get Mahout.
              </h2>
              <p
                style={{
                  color: "var(--mahout_text_secondary)",
                  marginBottom: "var(--mahout_space_24)",
                }}
              >
                On Google Play for Android.
              </p>
              <PlayStoreLink
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "var(--mahout_btn_height)",
                  padding: "0 18px",
                  borderRadius: "var(--mahout_radius_button)",
                  background: "var(--mahout_accent)",
                  color: "var(--mahout_on_accent)",
                  fontWeight: 600,
                  fontSize: "var(--text_body)",
                  boxShadow: "var(--shadow_m), 0 0 24px var(--mahout_premium_accent_2)",
                }}
              >
                Get Mahout on Google Play
              </PlayStoreLink>
              <div>
                <EonexLockup />
              </div>
            </GlassCard>
          </Container>
        </section>
      </div>
    </LenisProvider>
  );
}
