import type { Metadata } from "next";
import { Container } from "@/components/Container";
import {
  PremiumPageIntro,
  ProductMock,
  ProofPanel,
  SectionHeader,
  SectionShell,
} from "@/components/PremiumMarketing";

export const metadata: Metadata = {
  title: "How Mahout works - The 5-element system | Mahout",
  description:
    "See how Mahout turns future vision, goals, actions, emotions, reflection, memory, and guidance into one calm loop.",
};

const STEPS = [
  "Vision becomes North Star",
  "Mountain turns vision into direction",
  "Path turns direction into action",
  "Elephant adds emotional weather",
  "Mahout turns reflection into meaning",
  "Brain remembers useful context",
  "North Star guides again",
];

export default function HowItWorksPage() {
  return (
    <div className="premium-page">
      <PremiumPageIntro
        eyebrow="How it works"
        title="Five elements. One living loop."
        body="Mahout is easiest to understand as a loop: future vision, direction, action, emotion, reflection, memory, and guidance reinforcing each other."
        ctaHref="/#connected-loop"
        ctaLabel="See the homepage loop"
      />

      <SectionShell tone="quiet">
        <Container>
          <SectionHeader
            eyebrow="Loop"
            title="Your real life, finally making sense."
            body="The site now presents the loop as one premium system instead of separate app features."
            align="center"
          />
          <div className="premium-grid-2" style={{ alignItems: "center", gap: "clamp(28px, 5vw, 72px)" }}>
            <div style={{ display: "grid", gap: "var(--mahout_space_12)" }}>
              {STEPS.map((step, index) => (
                <ProofPanel key={step}>
                  <div style={{ display: "grid", gridTemplateColumns: "44px 1fr", alignItems: "center", gap: 14 }}>
                    <span style={{ color: "var(--mahout_accent)", fontWeight: 700 }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong>{step}</strong>
                  </div>
                </ProofPanel>
              ))}
            </div>
            <ProductMock
              eyebrow="System loop"
              title="Direction, action, reflection, memory."
              rows={["Today lane", "Receipt saved", "Guidance updates"]}
            />
          </div>
        </Container>
      </SectionShell>
    </div>
  );
}
