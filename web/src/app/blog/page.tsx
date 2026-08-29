import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PremiumPageIntro, ProofPanel, SectionHeader, SectionShell } from "@/components/PremiumMarketing";

export const metadata: Metadata = {
  title: "Blog | Mahout",
  description: "Philosophy, guides, and insights from the Mahout team.",
};

const TOPICS = [
  "Building consistency without motivation",
  "Why habit trackers fail when emotions spike",
  "Future-self guidance with receipts",
  "Local-first privacy for memory systems",
];

export default function BlogPage() {
  return (
    <div className="premium-page">
      <PremiumPageIntro
        eyebrow="Blog"
        title="The Mahout field notes."
        body="Pillar posts and practical guides will live here as the product opens up."
      />
      <SectionShell tone="quiet" style={{ paddingBottom: 150 }}>
        <Container>
          <SectionHeader
            eyebrow="Coming soon"
            title="Planned essays"
            body="The blog should feel like the same premium system: calm, specific, and grounded."
            align="center"
          />
          <div className="premium-grid-2">
            {TOPICS.map((topic) => (
              <ProofPanel key={topic}>
                <h2 style={{ fontFamily: "var(--font_head)", fontSize: "var(--text_h3)", margin: 0 }}>{topic}</h2>
              </ProofPanel>
            ))}
          </div>
        </Container>
      </SectionShell>
    </div>
  );
}
