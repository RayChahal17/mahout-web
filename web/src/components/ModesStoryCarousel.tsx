"use client";

import { type CSSProperties, useEffect, useState } from "react";

type StorySlide = {
  id: "auto" | "focus" | "reflective" | "mentor";
  label: string;
  eyebrow: string;
  title: string;
  tone: "night" | "dawn";
};

const SLIDES: StorySlide[] = [
  {
    id: "auto",
    label: "Auto",
    eyebrow: "Auto mode",
    title: "The system chooses a visible stance.",
    tone: "night",
  },
  {
    id: "focus",
    label: "Work Focus",
    eyebrow: "Work Focus",
    title: "Direction becomes one grounded move.",
    tone: "dawn",
  },
  {
    id: "reflective",
    label: "Reflective",
    eyebrow: "Reflective",
    title: "Some moments need meaning first.",
    tone: "night",
  },
  {
    id: "mentor",
    label: "Mentor",
    eyebrow: "Mentor",
    title: "Chosen standards shape the question.",
    tone: "night",
  },
];

const INK = { color: "#1c1914", WebkitTextFillColor: "#1c1914" } as const;

function SlideAuto() {
  return (
    <article className="md-still md-still--night md-still--stance">
      <i className="md-veil" aria-hidden="true" />
      <p className="md-kicker md-kicker--night">Modes</p>
      <div className="md-stance">
        <ul className="md-passed" aria-hidden="true">
          <li>Clarity</li>
          <li>Move</li>
        </ul>
        <div className="md-chosen">
          <i className="md-chosen__mark" aria-hidden="true" />
          <p className="md-stance__lead">
            Work
            <br />
            Focus
          </p>
        </div>
        <p className="md-stance__name">The moment asked for this.</p>
      </div>
      <p className="md-close">Chosen, not guessed.</p>
    </article>
  );
}

function SlideFocus() {
  return (
    <article className="md-still md-still--dawn md-still--move">
      <i className="md-dawn" aria-hidden="true" />
      <p className="md-kicker">Modes</p>
      <div className="md-move">
        <p className="md-move__label">Work Focus</p>
        <h3>One block</h3>
        <div className="md-blocks" aria-hidden="true">
          <i />
          <i />
          <i className="is-now" />
        </div>
        <p className="md-blocks__now" aria-hidden="true">
          Now
        </p>
        <p className="md-move__note">
          The next honest block.
          <br />
          Small enough to start.
        </p>
      </div>
    </article>
  );
}

function SlideReflective() {
  return (
    <article className="md-still md-still--night md-still--slow">
      <i className="md-rule" aria-hidden="true" />
      <i className="md-moon" aria-hidden="true" />
      <p className="md-kicker md-kicker--night">Modes</p>
      <div className="md-slow">
        <p className="md-slow__lead">Slower</p>
        <p className="md-slow__name">Meaning first.</p>
      </div>
      <div className="md-prompt">
        <p className="md-prompt__stamp">Reflective</p>
        <div className="md-prompt__body" style={INK}>
          Name what is being carried.
        </div>
      </div>
      <p className="md-close">Not therapy. Not comfort fog.</p>
    </article>
  );
}

function SlideMentor() {
  return (
    <article className="md-still md-still--night md-still--lens">
      <p className="md-kicker md-kicker--night">Modes</p>
      <div className="md-folio">
        <span className="md-folio__ghost" aria-hidden="true">
          ?
        </span>
        <b className="md-folio__seal" aria-hidden="true">
          Lens
        </b>
        <p className="md-folio__stamp">Mentor</p>
        <p className="md-folio__from">The standard you named</p>
        <div className="md-folio__body" style={INK}>
          What would that standard do with this afternoon.
        </div>
        <p className="md-folio__close">A lens. Not a voice.</p>
      </div>
    </article>
  );
}

function renderSlide(id: StorySlide["id"]) {
  switch (id) {
    case "auto":
      return <SlideAuto />;
    case "focus":
      return <SlideFocus />;
    case "reflective":
      return <SlideReflective />;
    case "mentor":
      return <SlideMentor />;
    default:
      return null;
  }
}

export function ModesStoryCarousel() {
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
      className="md-story-carousel"
      aria-label="North Star modes product story"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="md-story-carousel__stage" data-tone={active.tone} aria-live="polite">
        <div key={active.id} className="md-story-carousel__pane">
          {renderSlide(active.id)}
        </div>
      </div>

      <div className="md-story-carousel__caption">
        <p className="md-story-carousel__eyebrow">{active.eyebrow}</p>
        <p className="md-story-carousel__title">{active.title}</p>
      </div>

      <div
        className="element-screenshot-carousel__progress md-story-carousel__progress"
        aria-label="North Star modes story progress"
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
