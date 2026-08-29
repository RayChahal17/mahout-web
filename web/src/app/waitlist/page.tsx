"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { WaitlistForm } from "@/components/WaitlistForm";
import { PremiumEyebrow, ProductMock, ProofPanel, SectionShell } from "@/components/PremiumMarketing";

export default function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="premium-page">
      <SectionShell tone="gold" style={{ minHeight: "72vh", display: "flex", alignItems: "center", paddingBottom: 150 }}>
        <Container>
          <ProofPanel active style={{ maxWidth: 980, margin: "0 auto" }}>
            <div className="premium-grid-2" style={{ alignItems: "center", gap: "clamp(28px, 5vw, 64px)" }}>
              <div>
                <PremiumEyebrow>Private beta</PremiumEyebrow>
                <h1
                  style={{
                    fontFamily: "var(--font_head)",
                    fontSize: "var(--text_h1)",
                    lineHeight: "var(--leading_tight)",
                    letterSpacing: "-0.06em",
                    margin: "var(--mahout_space_24) 0 var(--mahout_space_16)",
                  }}
                >
                  Form your North Star.
                </h1>
                <p className="premium-copy" style={{ fontSize: "var(--text_body)" }}>
                  Join the early list for the premium product experience: future vision, Path execution,
                  Brain memory, and North Star guidance.
                </p>
                {submitted && (
                  <p style={{ color: "var(--mahout_gold)", fontWeight: 700 }}>
                    You're in. We'll reach out as access opens.
                  </p>
                )}
              </div>
              {submitted ? (
                <ProductMock
                  eyebrow="Access requested"
                  title="Your place is saved."
                  rows={["Private beta", "North Star preview", "Launch updates"]}
                />
              ) : (
                <WaitlistForm onSuccess={() => setSubmitted(true)} />
              )}
            </div>
          </ProofPanel>
        </Container>
      </SectionShell>
    </div>
  );
}
