import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EonexLockup } from "@/components/EonexBrand";
import { PlayStoreLink } from "@/components/PlayStoreLink";
import { PremiumEyebrow, ProofPanel, SectionShell } from "@/components/PremiumMarketing";

export const metadata: Metadata = {
  title: "Get Mahout | Mahout",
  description: "Mahout is on Google Play for Android.",
};

export default function WaitlistPage() {
  return (
    <div className="premium-page">
      <SectionShell
        tone="hero"
        style={{ minHeight: "72vh", display: "flex", alignItems: "center", paddingBottom: 150 }}
      >
        <Container>
          <ProofPanel active style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <PremiumEyebrow>On Google Play</PremiumEyebrow>
            <h1
              style={{
                fontFamily: "var(--font_head)",
                fontSize: "var(--text_h1)",
                lineHeight: "var(--leading_tight)",
                letterSpacing: "-0.06em",
                margin: "var(--mahout_space_24) 0 var(--mahout_space_16)",
              }}
            >
              Mahout is on Google Play.
            </h1>
            <p className="premium-copy" style={{ fontSize: "var(--text_body)", marginBottom: "var(--mahout_space_24)" }}>
              Available now for Android. Five elements, one North Star.
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
          </ProofPanel>
        </Container>
      </SectionShell>
    </div>
  );
}
