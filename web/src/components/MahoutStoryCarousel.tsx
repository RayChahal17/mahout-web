"use client";

import { type CSSProperties, useEffect, useState } from "react";

type StorySlide = {
  id: "library" | "heavy" | "light";
  label: string;
  eyebrow: string;
  title: string;
  tone: "night" | "dawn";
};

const SLIDES: StorySlide[] = [
  {
    id: "library",
    label: "Library",
    eyebrow: "Journal library",
    title: "The day becomes searchable memory.",
    tone: "night",
  },
  {
    id: "heavy",
    label: "Companion",
    eyebrow: "Companion",
    title: "A small line meets the moment.",
    tone: "night",
  },
  {
    id: "light",
    label: "Meaning",
    eyebrow: "Meaning",
    title: "Small good days count too.",
    tone: "dawn",
  },
];

const INK = { color: "#1c1914", WebkitTextFillColor: "#1c1914" } as const;

function SlideLibrary() {
  return (
    <article className="mh-still mh-still--shelf">
      <p className="mh-kicker mh-kicker--night">Mahout</p>
      <div className="mh-shelf">
        <article className="mh-slip mh-slip--back">
          <p className="mh-slip__date">3 Jun</p>
          <div className="mh-slip__body" style={INK}>
            It has been a nice few days.
          </div>
        </article>
        <article className="mh-slip mh-slip--mid">
          <p className="mh-slip__date">7 Jun · morning</p>
          <div className="mh-slip__body" style={INK}>
            Today felt light in a way I almost forgot.
          </div>
        </article>
        <article className="mh-slip mh-slip--front">
          <p className="mh-slip__date">7 Jun · night</p>
          <div className="mh-slip__body" style={INK}>
            I watched them become a stranger slowly.
          </div>
        </article>
      </div>
    </article>
  );
}

function SlideHeavy() {
  return (
    <article className="mh-still mh-still--night mh-still--page">
      <p className="mh-kicker mh-kicker--night">Mahout</p>
      <div className="mh-page">
        <p className="mh-page__date">7 June · night</p>
        <div className="mh-page__ink">
          <div className="mh-page__body" style={INK}>
            I watched them become a stranger slowly, and the worst part is I kept recognizing them anyway.
          </div>
          <div className="mh-page__body" style={INK}>
            Tonight I finally admitted that missing someone doesn&apos;t mean they should come back.
          </div>
        </div>
        <footer className="mh-page__companion">
          <span>Companion</span>
          <div className="mh-page__line" style={INK}>
            Missing them is real; your boundary is real too.
          </div>
        </footer>
      </div>
    </article>
  );
}

function SlideLight() {
  return (
    <article className="mh-still mh-still--dawn mh-still--page">
      <i className="mh-dawn" aria-hidden="true" />
      <p className="mh-kicker">Mahout</p>
      <div className="mh-page mh-page--open">
        <p className="mh-page__date">7 June · morning</p>
        <div className="mh-page__ink">
          <div className="mh-page__body" style={INK}>
            Today felt light in a way I almost forgot life could feel. Nothing huge happened, but maybe that is what made it beautiful.
          </div>
          <div className="mh-page__body" style={INK}>
            A calm morning. A small laugh. This quiet feeling that I am slowly becoming okay again.
          </div>
        </div>
        <footer className="mh-page__companion mh-page__companion--soft">
          <span>Companion</span>
          <div className="mh-page__line" style={INK}>
            When happiness sits beside you like that, what did you do differently to notice it.
          </div>
        </footer>
      </div>
    </article>
  );
}

function renderSlide(id: StorySlide["id"]) {
  switch (id) {
    case "library":
      return <SlideLibrary />;
    case "heavy":
      return <SlideHeavy />;
    case "light":
      return <SlideLight />;
    default:
      return null;
  }
}

export function MahoutStoryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = SLIDES[activeIndex] ?? SLIDES[0];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || paused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="mh-story-carousel"
      aria-label="Mahout product story"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mh-story-carousel__stage" data-tone={active.tone} aria-live="polite">
        <div key={active.id} className="mh-story-carousel__pane">
          {renderSlide(active.id)}
        </div>
      </div>

      <div className="mh-story-carousel__caption">
        <p className="mh-story-carousel__eyebrow">{active.eyebrow}</p>
        <p className="mh-story-carousel__title">{active.title}</p>
      </div>

      <div
        className="element-screenshot-carousel__progress mh-story-carousel__progress"
        aria-label="Mahout story progress"
        style={{ "--carousel-count": SLIDES.length } as CSSProperties}
      >
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show ${slide.label}: ${slide.title}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
          >
            <span className={index === activeIndex && !paused ? "is-running" : ""} />
          </button>
        ))}
      </div>
    </div>
  );
}
