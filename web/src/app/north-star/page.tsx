import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PLAY_STORE_URL } from "@/lib/siteLinks";
import {
  PremiumPageIntro,
  ProductMock,
  ProofPanel,
  SectionHeader,
  SectionShell,
  SignalRow,
} from "@/components/PremiumMarketing";

export const metadata: Metadata = {
  title: "North Star - Future You, built as a system | Mahout",
  description:
    "North Star is your ideal future self, grounded in goals, actions, moods, reflection, memory, and receipts.",
};

const MODES = ["Auto", "Analytic", "Reflective", "Motivator", "Mentor", "Work Focus"];
const RECEIPTS = ["Future vision", "Goals", "Actions", "Moods", "Reflections", "Patterns", "Memory"];

export default function NorthStarPage() {
  return (
    <div className="premium-page">
      <PremiumPageIntro
        eyebrow="North Star"
        title="Future-you, built as a system."
        body="North Star is not a generic chatbot. It is the user's ideal future self shaped by future vision, then grounded by real receipts over time."
        ctaHref={PLAY_STORE_URL}
        ctaLabel="Get Mahout on Google Play"
        ctaExternal
      />

      <SectionShell tone="quiet">
        <Container>
          <div className="premium-grid-2" style={{ alignItems: "center", gap: "clamp(28px, 5vw, 72px)" }}>
            <div>
              <SectionHeader
                eyebrow="Not a blank prompt"
                title="AI writes the words. Mahout grounds what is true."
                body="North Star becomes useful because it reads direction, action receipts, mood context, reflections, and memory. It does not invent a life out of thin air."
              />
              <SignalRow items={RECEIPTS} />
            </div>
            <ProductMock
              eyebrow="Guidance"
              title="What does future-you know about today?"
              rows={["Your direction", "Your receipts", "One next move"]}
            />
          </div>
        </Container>
      </SectionShell>

      <SectionShell>
        <Container>
          <SectionHeader
            eyebrow="Modes"
            title="The same memory can speak through different lenses."
            body="Auto, analytic, reflective, motivator, mentor, and work-focus modes change the guidance style while staying connected to the user's context."
            align="center"
          />
          <div className="premium-grid-3">
            {MODES.map((mode) => (
              <ProofPanel key={mode}>
                <h2 style={{ fontFamily: "var(--font_head)", fontSize: "var(--text_h3)", marginBottom: 10 }}>
                  {mode}
                </h2>
                <p className="premium-copy" style={{ margin: 0 }}>
                  A calm guidance lens that matches the moment without losing continuity.
                </p>
              </ProofPanel>
            ))}
          </div>
        </Container>
      </SectionShell>
    </div>
  );
}
