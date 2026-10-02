import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PremiumPageIntro, ProofPanel, SectionShell } from "@/components/PremiumMarketing";
import { EONEX_URL, PLAY_STORE_URL } from "@/lib/siteLinks";

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
        body="Mahout is available on Google Play. Use of this site is subject to these terms."
      />
      <SectionShell tone="quiet" style={{ paddingBottom: 150 }}>
        <Container>
          <ProofPanel style={{ maxWidth: 760, margin: "0 auto" }}>
            <p className="premium-copy" style={{ margin: 0 }}>
              Mahout is a product of{" "}
              <a className="premium-link" href={EONEX_URL} target="_blank" rel="noopener noreferrer">
                Eonex Technologies
              </a>
              , available on Android through{" "}
              <a className="premium-link" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                Google Play
              </a>
              . Questions about these terms can go to hello@mahout.app.
            </p>
          </ProofPanel>
        </Container>
      </SectionShell>
    </div>
  );
}
