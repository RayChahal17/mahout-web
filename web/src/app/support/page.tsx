import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EonexLockup } from "@/components/EonexBrand";
import { PlayStoreLink } from "@/components/PlayStoreLink";
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
        body="Questions about Mahout can come through the same calm channel."
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
            <p style={{ margin: "var(--mahout_space_16) 0 0" }}>
              <PlayStoreLink className="premium-link">Get Mahout on Google Play</PlayStoreLink>
            </p>
            <EonexLockup />
          </ProofPanel>
        </Container>
      </SectionShell>
    </div>
  );
}
