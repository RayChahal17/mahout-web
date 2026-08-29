"use client";

import { type CSSProperties, useEffect, useState } from "react";

type StorySlide = {
  id: "memory" | "voice" | "learned" | "trend";
  label: string;
  eyebrow: string;
  title: string;
  tone: "night" | "dawn";
};

const SLIDES: StorySlide[] = [
  {
    id: "memory",
    label: "Memory",
    eyebrow: "Brain overview",
    title: "The system shows what it remembers.",
    tone: "night",
  },
  {
    id: "voice",
    label: "Voice",
    eyebrow: "Voice and boundaries",
    title: "Guidance keeps the user's shape.",
    tone: "night",
  },
  {
    id: "learned",
    label: "Learned",
    eyebrow: "Learned signal",
    title: "Candidate insight before durable truth.",
    tone: "night",
  },
  {
    id: "trend",
    label: "Trend",
    eyebrow: "Trends",
    title: "Movement becomes guidance context.",
    tone: "dawn",
  },
];

const INK = { color: "#1c1914", WebkitTextFillColor: "#1c1914" } as const;

function SlideMemory() {
  return (
    <article className="br-still br-still--night br-still--hold">
      <i className="br-veil" aria-hidden="true" />
      <p className="br-kicker br-kicker--night">Brain</p>
      <p className="br-hold__lead">What it holds</p>
      <ol className="br-nodes">
        <li>
          <i aria-hidden="true" />
          <span>Vision</span>
          The life you named.
        </li>
        <li>
          <i aria-hidden="true" />
          <span>Tuesday</span>
          The day that closed.
        </li>
        <li>
          <i aria-hidden="true" />
          <span>Tonight</span>
          One line it can use.
        </li>
      </ol>
    </article>
  );
}

function SlideVoice() {
  return (
    <article className="br-still br-still--night br-still--return">
      <p className="br-kicker br-kicker--night">Brain</p>
      <div className="br-return">
        <article className="br-slip br-slip--speak">
          <p className="br-slip__stamp">Speak</p>
          <div className="br-slip__body" style={INK}>
            Calm. Specific. No hustle.
          </div>
        </article>
        <div className="br-thread" aria-hidden="true">
          <i />
          <span>and</span>
          <i />
        </div>
        <article className="br-slip br-slip--hold-line">
          <p className="br-slip__stamp">Hold</p>
          <div className="br-slip__body" style={INK}>
            Do not pretend this is therapy.
          </div>
        </article>
      </div>
    </article>
  );
}

function SlideLearned() {
  return (
    <article className="br-still br-still--night br-still--candidate">
      <p className="br-kicker br-kicker--night">Brain</p>
      <div className="br-candidate">
        <p className="br-candidate__stamp">Not yet</p>
        <div className="br-candidate__body" style={INK}>
          Afternoons get heavier after a fragmented morning.
        </div>
        <p className="br-candidate__evidence">Four days of evidence</p>
      </div>
    </article>
  );
}

function SlideTrend() {
  return (
    <article className="br-still br-still--dawn br-still--move">
      <i className="br-dawn" aria-hidden="true" />
      <p className="br-kicker">Brain</p>
      <div className="br-move">
        <p className="br-move__label">This week</p>
        <h3>Easing</h3>
        <p className="br-move__name">Mood</p>
        <i className="br-horizon" aria-hidden="true" />
        <p className="br-move__note">North Star can use this.</p>
      </div>
    </article>
  );
}

function renderSlide(id: StorySlide["id"]) {
  switch (id) {
    case "memory":
      return <SlideMemory />;
    case "voice":
      return <SlideVoice />;
    case "learned":
      return <SlideLearned />;
    case "trend":
      return <SlideTrend />;
    default:
      return null;
  }
}

export function BrainStoryCarousel() {
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
      className="br-story-carousel"
      aria-label="North Star Brain product story"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="br-story-carousel__stage" data-tone={active.tone} aria-live="polite">
        <div key={active.id} className="br-story-carousel__pane">
          {renderSlide(active.id)}
        </div>
      </div>

      <div className="br-story-carousel__caption">
        <p className="br-story-carousel__eyebrow">{active.eyebrow}</p>
        <p className="br-story-carousel__title">{active.title}</p>
      </div>

      <div
        className="element-screenshot-carousel__progress br-story-carousel__progress"
        aria-label="North Star Brain story progress"
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
