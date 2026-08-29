import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PremiumPageIntro, ProofPanel, SectionShell } from "@/components/PremiumMarketing";

export const metadata: Metadata = {
  title: "Terms of Service | Mahout",
  description: "Terms of Service for Mahout.",
};

export default function TermsPage() {
  return (
    <div className="premium-page">
      <PremiumPageIntro
        eyebrow="Terms"
        title="Terms of Service"
        body="Terms will be provided before launch. For now, use of the waitlist and site materials is subject to standard terms of use."
      />
      <SectionShell tone="quiet" style={{ paddingBottom: 150 }}>
        <Container>
          <ProofPanel style={{ maxWidth: 760, margin: "0 auto" }}>
            <p className="premium-copy" style={{ margin: 0 }}>
              Mahout is in private beta preparation. Product availability, terms, and launch details may change
              before public release.
            </p>
          </ProofPanel>
        </Container>
      </SectionShell>
    </div>
  );
}
