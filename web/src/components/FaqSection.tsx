import Link from "next/link";
import { Container } from "./Container";
import { GlassCard } from "./GlassCard";
import { FEATURED_FAQ_ITEMS } from "@/lib/mahoutFaq";

export function FaqSection() {
  return (
    <section id="faq" data-section data-scene="faq" className="faq-home-section">
      <Container>
        <div className="faq-home-header">
          <div className="faq-home-eyebrow">
            <span aria-hidden="true" className="faq-home-eyebrow__dot" />
            Trust and clarity
          </div>
          <h2 className="faq-home-title">Questions people ask before they trust a life system.</h2>
          <p className="faq-home-lead">
            Mahout is not trying to replace every app on your phone. It connects direction, action,
            reflection, memory, and guidance — with receipts, visible control, and no silent commits.
          </p>
        </div>

        <div className="faq-home-grid">
          {FEATURED_FAQ_ITEMS.map((item, index) => (
            <GlassCard key={item.id} active={index === 0} className="faq-home-card">
              <h3 className="faq-home-card__question">{item.question}</h3>
              <p className="faq-home-card__answer">{item.answer}</p>
            </GlassCard>
          ))}
        </div>

        <div className="faq-home-footer">
          <p className="faq-home-footer__copy">
            Pricing, North Star Credits, memory control, modes, letters, habits, and launch details
            live on the full FAQ page.
          </p>
          <Link href="/faq" className="faq-home-read-more">
            Read more
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>

      <style>{`
        .faq-home-section {
          position: relative;
        }

        .faq-home-header {
          max-width: 720px;
          margin: 0 auto clamp(28px, 5vw, 48px);
          text-align: center;
        }

        .faq-home-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: var(--mahout_space_8);
          padding: 10px 14px;
          border-radius: var(--mahout_radius_pill);
          border: 1px solid var(--mahout_outline_soft);
          background: rgba(255,255,255,0.04);
          color: var(--mahout_text_secondary);
          font-size: var(--text_caption);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: var(--mahout_space_16);
        }

        .faq-home-eyebrow__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--mahout_accent);
          box-shadow: 0 0 18px var(--mahout_accent);
        }

        .faq-home-title {
          margin: 0;
          font-family: var(--font_head);
          font-size: clamp(30px, 4.6vw, 52px);
          line-height: var(--leading_tight);
          letter-spacing: -0.04em;
          color: var(--mahout_text_primary);
        }

        .faq-home-lead {
          margin: var(--mahout_space_16) auto 0;
          max-width: 58ch;
          color: var(--mahout_text_secondary);
          font-size: clamp(17px, 1.45vw, 20px);
          line-height: var(--leading_body);
        }

        .faq-home-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--mahout_space_16);
          max-width: 980px;
          margin: 0 auto;
        }

        .faq-home-card {
          height: 100%;
        }

        .faq-home-card__question {
          margin: 0 0 var(--mahout_space_12);
          font-family: var(--font_head);
          font-size: clamp(18px, 2vw, 22px);
          line-height: 1.15;
          color: var(--mahout_text_primary);
        }

        .faq-home-card__answer {
          margin: 0;
          color: var(--mahout_text_secondary);
          font-size: var(--text_body_m);
          line-height: var(--leading_body);
        }

        .faq-home-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--mahout_space_16);
          margin-top: clamp(28px, 5vw, 44px);
          text-align: center;
        }

        .faq-home-footer__copy {
          margin: 0;
          max-width: 52ch;
          color: var(--mahout_text_tertiary);
          font-size: var(--text_body_m);
          line-height: var(--leading_body);
        }

        .faq-home-read-more {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 46px;
          padding: 0 20px;
          border-radius: var(--mahout_radius_pill);
          border: 1px solid rgba(255,211,138,0.42);
          background: linear-gradient(180deg, rgba(255,211,138,0.14), rgba(255,255,255,0.04));
          color: var(--mahout_text_primary);
          font-size: var(--text_body_m);
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 16px 40px -28px rgba(255,211,138,0.55);
          transition: border-color var(--duration_small), transform var(--duration_small);
        }

        .faq-home-read-more:hover {
          border-color: rgba(255,211,138,0.62);
          transform: translateY(-1px);
        }

        .faq-home-read-more:focus-visible {
          outline: 2px solid rgba(156,140,255,0.55);
          outline-offset: 3px;
        }

        @media (min-width: 720px) {
          .faq-home-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
}
