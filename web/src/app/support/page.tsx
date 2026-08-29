import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PremiumPageIntro, ProofPanel, SectionShell } from "@/components/PremiumMarketing";

export const metadata: Metadata = {
  title: "Support | Mahout",
  description: "Get support for Mahout.",
};

export default function SupportPage() {
  return (
    <div className="premium-page">
      <PremiumPageIntro
        eyebrow="Support"
        title="Need help with Mahout?"
        body="Questions, access requests, and launch support can route through the same calm channel."
      />
      <SectionShell tone="quiet" style={{ paddingBottom: 150 }}>
        <Container>
          <ProofPanel style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font_head)", fontSize: "var(--text_h3)", marginBottom: 12 }}>
              Contact
            </h2>
            <p className="premium-copy" style={{ margin: 0 }}>
              Email <a className="premium-link" href="mailto:hello@mahout.app">hello@mahout.app</a> and we will help from there.
            </p>
          </ProofPanel>
        </Container>
      </SectionShell>
    </div>
  );
}
