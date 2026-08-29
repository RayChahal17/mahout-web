import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PremiumPageIntro, ProofPanel, SectionHeader, SectionShell } from "@/components/PremiumMarketing";

export const metadata: Metadata = {
  title: "Privacy - Memory is yours to control | Mahout",
  description:
    "Mahout is built around visible user control, local-first posture, memory controls, and clear safety boundaries.",
};

const PRIVACY_POINTS = [
  {
    title: "Local-first stance",
    body:
      "Mahout prioritizes storing your data locally on your device. No account is required to use core features.",
  },
  {
    title: "Memory controls",
    body:
      "You can view what Mahout has learned about you. When you delete something, it should stop being used.",
  },
  {
    title: "What we store",
    body:
      "Waitlist signups store only what you provide. App usage data should be opt-in and limited to operational needs.",
  },
  {
    title: "Safety boundaries",
    body:
      "Mahout is not a substitute for medical or mental health advice and does not claim therapeutic or clinical support.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="premium-page">
      <PremiumPageIntro
        eyebrow="Privacy"
        title="Memory should feel visible and controllable."
        body="Mahout's premium posture is not magic memory. It is clear context, user control, and calm boundaries."
      />

      <SectionShell tone="quiet" style={{ paddingBottom: 150 }}>
        <Container>
          <SectionHeader
            eyebrow="Policy summary"
            title="Trust-first by design."
            body="This page keeps the privacy posture clear without adding unsupported claims."
            align="center"
          />
          <div className="premium-grid-2">
            {PRIVACY_POINTS.map((point) => (
              <ProofPanel key={point.title}>
                <h2 style={{ fontFamily: "var(--font_head)", fontSize: "var(--text_h3)", marginBottom: 10 }}>
                  {point.title}
                </h2>
                <p className="premium-copy" style={{ margin: 0 }}>{point.body}</p>
              </ProofPanel>
            ))}
          </div>
          <p className="premium-copy" style={{ marginTop: "var(--mahout_space_32)" }}>
            Questions? Email <a className="premium-link" href="mailto:hello@mahout.app">hello@mahout.app</a>.
          </p>
        </Container>
      </SectionShell>
    </div>
  );
}
