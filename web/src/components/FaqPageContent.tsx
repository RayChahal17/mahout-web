"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "./Container";
import { FaqAccordion } from "./FaqAccordion";
import {
  ALL_FAQ_ITEMS,
  FEATURED_FAQ_ITEMS,
  MAHOUT_FAQ_CATEGORIES,
  type MahoutFaqCategory,
} from "@/lib/mahoutFaq";

const TRUST_PILLARS = [
  "No silent commits",
  "Receipts over vibes",
  "Memory you control",
  "North Star ≠ chatbot",
] as const;

const CATEGORY_ACCENTS: Record<string, "gold" | "purple" | "sage" | "neutral"> = {
  "what-mahout-is": "gold",
  "north-star-trust": "purple",
  "five-elements": "purple",
  "habits-letters-modes": "sage",
  "free-pro-credits": "gold",
  "privacy-launch": "neutral",
};

function FaqCategoryBlock({
  category,
  index,
}: {
  category: MahoutFaqCategory;
  index: number;
}) {
  const accent = CATEGORY_ACCENTS[category.id] ?? "neutral";

  return (
    <section
      id={category.id}
      className="faq-page-category"
      data-faq-category={category.id}
      aria-labelledby={`faq-cat-${category.id}`}
    >
      <div className={`faq-page-category__shell faq-page-category__shell--${accent}`}>
        <header className="faq-page-category__header">
          <div className="faq-page-category__index">{String(index + 1).padStart(2, "0")}</div>
          <div>
            <h2 id={`faq-cat-${category.id}`} className="faq-page-category__title">
              {category.title}
            </h2>
            {category.description ? (
              <p className="faq-page-category__description">{category.description}</p>
            ) : null}
          </div>
          <span className="faq-page-category__count">
            {category.items.length} {category.items.length === 1 ? "answer" : "answers"}
          </span>
        </header>

        <FaqAccordion
          items={category.items}
          variant="page"
          allowMultiple
          defaultOpenId={index === 0 ? category.items[0]?.id : undefined}
        />
      </div>
    </section>
  );
}

export function FaqPageContent() {
  const [activeCategory, setActiveCategory] = useState(MAHOUT_FAQ_CATEGORIES[0]?.id ?? "");

  useEffect(() => {
    const sections = MAHOUT_FAQ_CATEGORIES.map((category) =>
      document.getElementById(category.id)
    ).filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveCategory(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -58% 0px", threshold: [0, 0.2, 0.45, 0.7] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="faq-page premium-page">
      <div aria-hidden="true" className="faq-page__ambient faq-page__ambient--left" />
      <div aria-hidden="true" className="faq-page__ambient faq-page__ambient--right" />

      <section className="faq-page-hero" data-section>
        <Container>
          <div className="faq-page-hero__shell">
            <Link href="/#faq" className="faq-page-back">
              <span aria-hidden="true" className="faq-page-back__icon">
                ←
              </span>
              <span>Homepage highlights</span>
            </Link>

            <div className="faq-page-hero__badge">
              <span aria-hidden="true" className="faq-page-hero__badge-dot" />
              FAQ · Mahout
            </div>

            <h1 className="faq-page-hero__title">Clarity before you trust a life system.</h1>

            <p className="faq-page-hero__lead">
              Product truth, trust posture, and how the five-element loop fits together — without
              hype, hidden commits, or vague AI promises.
            </p>

            <div className="faq-page-hero__stats" aria-label="FAQ scope">
              <div className="faq-page-stat">
                <span className="faq-page-stat__value">{ALL_FAQ_ITEMS.length}</span>
                <span className="faq-page-stat__label">Answers</span>
              </div>
              <div className="faq-page-stat">
                <span className="faq-page-stat__value">{MAHOUT_FAQ_CATEGORIES.length}</span>
                <span className="faq-page-stat__label">Chapters</span>
              </div>
              <div className="faq-page-stat">
                <span className="faq-page-stat__value">5</span>
                <span className="faq-page-stat__label">Elements</span>
              </div>
            </div>

            <div className="faq-page-hero__pillars" aria-label="Trust pillars">
              {TRUST_PILLARS.map((pillar) => (
                <span key={pillar} className="faq-page-pillar">
                  {pillar}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="faq-page-featured" data-section>
        <Container>
          <div className="faq-page-featured__header">
            <span className="faq-page-featured__eyebrow">Start here</span>
            <h2 className="faq-page-featured__title">The four questions people ask first.</h2>
            <p className="faq-page-featured__copy">
              These are the same highlights on the homepage — expanded with the full library below.
            </p>
          </div>

          <div className="faq-page-featured__grid">
            {FEATURED_FAQ_ITEMS.map((item, index) => (
              <article
                key={item.id}
                className={`faq-page-featured-card${index === 0 ? " faq-page-featured-card--lead" : ""}`}
              >
                <div className="faq-page-featured-card__top">
                  <span className="faq-page-featured-card__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="faq-page-featured-card__tag">Essential</span>
                </div>
                <h3 className="faq-page-featured-card__question">{item.question}</h3>
                <p className="faq-page-featured-card__answer">{item.answer}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="faq-page-body" data-section>
        <Container>
          <div className="faq-page-body__layout">
            <aside className="faq-page-toc" aria-label="FAQ chapters">
              <div className="faq-page-toc__sticky">
                <p className="faq-page-toc__label">Chapters</p>
                <nav className="faq-page-toc__nav">
                  {MAHOUT_FAQ_CATEGORIES.map((category, index) => (
                    <a
                      key={category.id}
                      href={`#${category.id}`}
                      className={`faq-page-toc__link${
                        activeCategory === category.id ? " is-active" : ""
                      }`}
                      aria-current={activeCategory === category.id ? "true" : undefined}
                    >
                      <span className="faq-page-toc__index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="faq-page-toc__text">{category.title}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="faq-page-chapters">
              <div className="faq-page-chapters__intro">
                <h2 className="faq-page-chapters__title">Full library</h2>
                <p className="faq-page-chapters__copy">
                  Open any chapter. Answers stay grounded in how Mahout actually works — not
                  marketing filler.
                </p>
              </div>

              {MAHOUT_FAQ_CATEGORIES.map((category, index) => (
                <FaqCategoryBlock key={category.id} category={category} index={index} />
              ))}

              <div className="faq-page-cta">
                <div className="faq-page-cta__glow" aria-hidden="true" />
                <div className="faq-page-cta__content">
                  <span className="faq-page-cta__eyebrow">Still unsure?</span>
                  <h2 className="faq-page-cta__title">Read the policy. Reach out calmly.</h2>
                  <p className="faq-page-cta__copy">
                    Privacy, terms, and launch support live on their own pages so this FAQ can
                    stay focused on product clarity.
                  </p>
                  <div className="faq-page-cta__links">
                    <Link href="/privacy" className="faq-page-cta__link">
                      Privacy
                    </Link>
                    <Link href="/terms" className="faq-page-cta__link">
                      Terms
                    </Link>
                    <Link href="/support" className="faq-page-cta__link">
                      Support
                    </Link>
                    <Link href="/waitlist" className="faq-page-cta__link faq-page-cta__link--primary">
                      Join waitlist
                    </Link>
                  </div>
                  <p className="faq-page-cta__email">
                    Or email{" "}
                    <a href="mailto:hello@mahout.app" className="faq-page-cta__mailto">
                      hello@mahout.app
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
