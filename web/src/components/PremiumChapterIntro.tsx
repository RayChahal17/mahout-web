"use client";

import { type ReactNode, useEffect, useState } from "react";
import { FrostShield } from "./FrostShield";

export type PremiumChapterSlide = {
  eyebrow: string;
  title: string;
  body: string;
  chips: readonly string[];
};

export function PremiumChapterIntro({
  eyebrow,
  title,
  body,
  slides,
  children,
  ariaLabel,
}: {
  eyebrow: string;
  title: string;
  body: string;
  slides: readonly PremiumChapterSlide[];
  children?: ReactNode;
  ariaLabel: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || paused || slides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5800);

    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  return (
    <div className="premium-chapter-intro">
      <div className="premium-chapter-intro__copy">
        <div className="premium-chapter-eyebrow">
          <span aria-hidden="true" className="premium-chapter-eyebrow__dot" />
          {eyebrow}
        </div>

        <h2>{title}</h2>
        <p>{body}</p>

        {children ? <div className="premium-chapter-intro__actions">{children}</div> : null}
      </div>

      <FrostShield
        className="premium-chapter-deck"
        aria-label={ariaLabel}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="premium-chapter-deck__ambient" aria-hidden="true" />
        <div className="premium-chapter-deck__topline">
          <span>Screenshot story</span>
          <span>{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        </div>

        <div className="premium-chapter-deck__screen" aria-live="polite">
          <div key={`${activeSlide.eyebrow}-${activeSlide.title}`} className="premium-chapter-deck__slide">
            <div className="premium-chapter-deck__eyebrow">{activeSlide.eyebrow}</div>
            <h3>{activeSlide.title}</h3>
            <p>{activeSlide.body}</p>

            <div className="premium-chapter-deck__chips">
              {activeSlide.chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="premium-chapter-deck__mock" aria-hidden="true">
          <div className="premium-chapter-deck__mock-bar" />
          <div className="premium-chapter-deck__mock-card premium-chapter-deck__mock-card--active" />
          <div className="premium-chapter-deck__mock-card" />
          <div className="premium-chapter-deck__mock-card premium-chapter-deck__mock-card--short" />
        </div>

        <div className="premium-chapter-deck__progress" aria-label="Screenshot deck progress">
          {slides.map((slide, index) => (
            <button
              key={`${slide.eyebrow}-${slide.title}`}
              type="button"
              aria-label={`Show ${slide.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
            >
              <span className={index === activeIndex && !paused ? "is-running" : ""} />
            </button>
          ))}
        </div>
      </FrostShield>

      <style>{`
        .premium-chapter-intro {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(18px, 4vw, 46px);
          align-items: stretch;
          margin: 0 0 clamp(28px, 5vw, 54px);
          padding: clamp(18px, 3vw, 30px);
          border-radius: clamp(26px, 4vw, 38px);
          border: 1px solid rgba(255,255,255,0.08);
          background:
            radial-gradient(ellipse 58% 68% at 8% 36%, rgba(156,140,255,0.11), transparent 64%),
            radial-gradient(ellipse 42% 54% at 94% 22%, rgba(255,211,138,0.07), transparent 58%),
            linear-gradient(180deg, rgba(255,255,255,0.042), rgba(255,255,255,0.014));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.07),
            0 26px 70px -52px rgba(0,0,0,0.72);
        }

        .premium-chapter-intro::after {
          content: "";
          position: absolute;
          left: clamp(18px, 3vw, 30px);
          right: clamp(18px, 3vw, 30px);
          bottom: -1px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(156,140,255,0.34), rgba(255,211,138,0.18), transparent);
          pointer-events: none;
        }

        .premium-chapter-intro__copy {
          position: relative;
          z-index: 1;
          align-self: center;
        }

        .premium-chapter-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: var(--mahout_space_8);
          padding: 10px 14px;
          border-radius: var(--mahout_radius_pill);
          border: 1px solid var(--mahout_outline_soft);
          background: rgba(255,255,255,0.04);
          color: var(--mahout_text_secondary);
          font-size: var(--text_caption);
          line-height: 1.2;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: var(--mahout_space_16);
        }

        .premium-chapter-eyebrow__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--mahout_accent);
          box-shadow: 0 0 18px var(--mahout_accent);
        }

        .premium-chapter-intro h2 {
          margin: 0;
          max-width: 13ch;
          color: var(--mahout_text_primary);
          font-family: var(--font_head);
          font-size: clamp(34px, 5vw, 60px);
          line-height: var(--leading_tight);
          letter-spacing: -0.035em;
        }

        .premium-chapter-intro__copy > p {
          margin: var(--mahout_space_16) 0 0;
          max-width: 54ch;
          color: var(--mahout_text_secondary);
          font-size: clamp(17px, 1.45vw, 20px);
          line-height: var(--leading_body);
        }

        .premium-chapter-intro__actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--mahout_space_8);
          margin-top: var(--mahout_space_20);
        }

        .premium-chapter-deck {
          position: relative;
          z-index: 1;
          min-height: 330px;
          padding: clamp(18px, 3vw, 24px) !important;
          overflow: hidden;
          border-radius: 28px !important;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.022)),
            rgba(8,10,20,0.52) !important;
          border-color: rgba(255,255,255,0.13) !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.10),
            0 24px 72px -42px rgba(0,0,0,0.72) !important;
        }

        .premium-chapter-deck__ambient {
          position: absolute;
          inset: -28% -18% auto;
          height: 72%;
          pointer-events: none;
          background:
            radial-gradient(circle at 28% 32%, rgba(156,140,255,0.26), transparent 44%),
            radial-gradient(circle at 76% 30%, rgba(255,211,138,0.13), transparent 42%);
          filter: blur(18px);
          opacity: 0.86;
        }

        .premium-chapter-deck__topline {
          position: relative;
          display: flex;
          justify-content: space-between;
          gap: var(--mahout_space_12);
          color: var(--mahout_text_tertiary);
          font-size: var(--text_caption);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: var(--mahout_space_18);
        }

        .premium-chapter-deck__screen {
          position: relative;
          min-height: 144px;
        }

        .premium-chapter-deck__slide {
          animation: premiumChapterSlideIn 720ms ease both;
        }

        .premium-chapter-deck__eyebrow {
          color: var(--mahout_accent);
          font-size: var(--text_caption);
          letter-spacing: 0.09em;
          text-transform: uppercase;
          margin-bottom: var(--mahout_space_10);
        }

        .premium-chapter-deck h3 {
          margin: 0;
          max-width: 16ch;
          color: var(--mahout_text_primary);
          font-family: var(--font_head);
          font-size: clamp(25px, 3vw, 36px);
          line-height: 1.08;
        }

        .premium-chapter-deck p {
          margin: var(--mahout_space_12) 0 0;
          max-width: 48ch;
          color: var(--mahout_text_secondary);
          font-size: var(--text_body_m);
          line-height: var(--leading_body);
        }

        .premium-chapter-deck__chips {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: var(--mahout_space_16);
        }

        .premium-chapter-deck__chips span {
          min-height: 26px;
          display: inline-flex;
          align-items: center;
          padding: 5px 9px;
          border-radius: var(--mahout_radius_pill);
          border: 1px solid rgba(255,255,255,0.11);
          background: rgba(255,255,255,0.045);
          color: var(--mahout_text_secondary);
          font-size: var(--text_caption);
          line-height: 1.1;
        }

        .premium-chapter-deck__mock {
          position: relative;
          display: grid;
          gap: 10px;
          margin-top: var(--mahout_space_20);
          padding: 14px;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            radial-gradient(ellipse 72% 100% at 50% 0%, rgba(156,140,255,0.11), transparent 62%),
            rgba(255,255,255,0.026);
        }

        .premium-chapter-deck__mock-bar,
        .premium-chapter-deck__mock-card {
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
        }

        .premium-chapter-deck__mock-bar {
          width: 38%;
          height: 8px;
        }

        .premium-chapter-deck__mock-card {
          height: 38px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.07);
        }

        .premium-chapter-deck__mock-card--active {
          background: linear-gradient(90deg, rgba(156,140,255,0.22), rgba(255,211,138,0.11));
        }

        .premium-chapter-deck__mock-card--short {
          width: 68%;
        }

        .premium-chapter-deck__progress {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 6px;
          margin-top: var(--mahout_space_16);
        }

        .premium-chapter-deck__progress button {
          appearance: none;
          border: 0;
          padding: 0;
          height: 4px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          overflow: hidden;
          cursor: pointer;
        }

        .premium-chapter-deck__progress button span {
          display: block;
          width: 0%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, rgba(156,140,255,0.95), rgba(255,211,138,0.74));
        }

        .premium-chapter-deck__progress button[aria-current="true"] span {
          width: 100%;
        }

        .premium-chapter-deck__progress button span.is-running {
          animation: premiumChapterProgress 5800ms linear both;
        }

        @keyframes premiumChapterSlideIn {
          from { opacity: 0; transform: translateY(10px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        @keyframes premiumChapterProgress {
          from { width: 0%; }
          to { width: 100%; }
        }

        @media (min-width: 920px) {
          .premium-chapter-intro {
            grid-template-columns: minmax(0, 0.92fr) minmax(360px, 0.72fr);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .premium-chapter-deck__slide,
          .premium-chapter-deck__progress button span.is-running {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
