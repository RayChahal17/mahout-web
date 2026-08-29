"use client";

import { type CSSProperties, useEffect, useState } from "react";

type StorySlide = {
  id: "mission" | "choose" | "home" | "future" | "today" | "path";
  label: string;
  eyebrow: string;
  title: string;
};

const SLIDES: StorySlide[] = [
  {
    id: "mission",
    label: "Mission",
    eyebrow: "Mission",
    title: "The direction — and what you give for it.",
  },
  {
    id: "choose",
    label: "Daily choose",
    eyebrow: "Today",
    title: "I still choose this direction.",
  },
  {
    id: "home",
    label: "Home widgets",
    eyebrow: "Widgets",
    title: "Today and Mission, where you can see them.",
  },
  {
    id: "future",
    label: "Future Goals",
    eyebrow: "Future Goals",
    title: "Long-range direction stays visible.",
  },
  {
    id: "today",
    label: "Today lanes",
    eyebrow: "Today Goals",
    title: "Five clean priorities, each with a Path.",
  },
  {
    id: "path",
    label: "Linked Path",
    eyebrow: "Linked Path",
    title: "A goal inherits its next honest step.",
  },
];

const LANES = [
  {
    mark: "A",
    title: "Protect one deep-work block",
    path: "Coding · 3–5 hours",
    stat: "5h 20m",
    tone: "lead",
  },
  {
    mark: "B",
    title: "Read the next two chapters",
    path: "Read a few pages",
    stat: "",
    tone: "next",
  },
  {
    mark: "C",
    title: "If time: send the estimates",
    path: "",
    stat: "",
    tone: "quiet",
  },
] as const;

const WIDGET_GOALS = [
  { mark: "A", title: "Protect one deep-work block" },
  { mark: "B", title: "Read the next two chapters" },
  { mark: "C", title: "If time: send the estimates" },
] as const;

function PathMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 17c3-1.2 4.2-4.5 7-6.2 2.6-1.6 5.2-.6 7 1.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="5" cy="17" r="1.6" fill="currentColor" />
      <circle cx="12" cy="10.6" r="1.6" fill="currentColor" />
      <circle cx="19" cy="12.2" r="1.6" fill="currentColor" />
    </svg>
  );
}

function PalmMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8.2 11.2V6.8a1.3 1.3 0 0 1 2.6 0v3.7M10.8 10.2V5.9a1.3 1.3 0 1 1 2.6 0v4.6M13.4 10.6V7.2a1.3 1.3 0 1 1 2.6 0v5.1M16 12.2V9.4a1.3 1.3 0 1 1 2.5.4c0 .4-.1.8-.2 1.2l-1.4 4.6A4.2 4.2 0 0 1 12.8 18H11a4.4 4.4 0 0 1-4.3-3.4L6 12.2a1.4 1.4 0 0 1 2.2-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PathChip({ label }: { label: string }) {
  return (
    <span className="mt-path-chip">
      <PathMark />
      {label}
    </span>
  );
}

function SlideMission() {
  return (
    <article className="mt-still mt-still--vow">
      <header className="mt-vow-chrome">
        <p>Mountain</p>
        <span>Mission</span>
      </header>
      <div className="mt-vow">
        <p className="mt-vow__from">My Mission</p>
        <p className="mt-vow__lead">Become a successful businessman.</p>
        <p className="mt-vow__body">
          This is the direction I have chosen for my life. Over the decade ahead, I intend to build a real company — especially in the product I am making. Not a wish. A business that holds.
        </p>
        <p className="mt-vow__body">
          For this, I choose to give the work: one protected block, every day I can. The hours that compound. The craft before the noise.
        </p>
        <p className="mt-vow__body">
          I also choose a body that can carry that work — strong, athletic, reliable. For this, I choose to give an hour of training, and the reps I promised.
        </p>
        <p className="mt-vow__sign">
          I know what I want, and I know what I have chosen to give in return.
        </p>
      </div>
    </article>
  );
}

function SlideChoose() {
  return (
    <article className="mt-still mt-still--sheet">
      <p className="mt-still-kicker">Today</p>
      <h3 className="mt-still-heading">I still choose this direction.</h3>
      <p className="mt-still-lead">Morning and night, return to the businessman you chose to become.</p>
      <ul className="mt-still-rituals">
        <li className="mt-still-ritual is-done">
          <span className="mt-still-ritual__icon">
            <PalmMark />
          </span>
          <span>
            <strong>Morning</strong>
            <em>Pledged · 12:49 PM</em>
          </span>
        </li>
        <li className="mt-still-ritual">
          <span className="mt-still-ritual__icon">
            <PalmMark />
          </span>
          <span>
            <strong>Evening</strong>
            <em>Reaffirm tonight</em>
          </span>
        </li>
      </ul>
    </article>
  );
}

function SlideHome() {
  return (
    <article className="mt-still mt-still--home">
      <div className="mt-widget">
        <div className="mt-widget__head">
          <span>Today</span>
        </div>
        <ul className="mt-widget-goals">
          {WIDGET_GOALS.map((goal) => (
            <li key={goal.mark}>
              <span className="mt-widget-goals__mark">{goal.mark}</span>
              <span>{goal.title}</span>
              <i aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-widget">
        <div className="mt-widget__head">
          <span>My Mission</span>
        </div>
        <p className="mt-widget__title">Become a successful businessman.</p>
        <div className="mt-widget-rituals">
          <span>
            <PalmMark />
            Pledge this morning
          </span>
          <span>
            <PalmMark />
            Reaffirm tonight
          </span>
        </div>
      </div>
    </article>
  );
}

function SlideFuture() {
  return (
    <article className="mt-still">
      <header className="mt-still-chrome">
        <div>
          <p className="mt-still-chrome__title">Mountain</p>
          <p className="mt-still-chrome__sub">Your goals and direction</p>
        </div>
        <span className="mt-still-chrome__tab">Future</span>
      </header>

      <div className="mt-still-aim">
        <h3>Become a successful businessman.</h3>
        <p>Build the product. Give the hours. Let the years compound.</p>
        <span className="mt-still-pill">Target: years</span>
      </div>

      <div className="mt-still-proof">
        <i className="mt-still-proof__orb" aria-hidden="true" />
        <p>6/7 active days · 28h 20m this week</p>
      </div>

      <div className="mt-still-card">
        <span className="mt-still-card__kicker">Future goal</span>
        <p className="mt-still-card__title">Read 2 business books</p>
        <PathChip label="Read a few pages" />
        <div className="mt-still-card__foot">
          <span>Jul 7 · 28 days</span>
          <span className="mt-still-chip">On pace</span>
        </div>
        <span className="mt-still-bar" aria-hidden="true">
          <i />
        </span>
      </div>
    </article>
  );
}

function SlideToday() {
  return (
    <article className="mt-still">
      <header className="mt-still-chrome">
        <div>
          <p className="mt-still-chrome__title">Today Goals</p>
          <p className="mt-still-chrome__sub">Five clean priorities are enough</p>
        </div>
        <span className="mt-still-chrome__tab">Today</span>
      </header>

      <p className="mt-still-section">Priority lanes</p>

      <ul className="mt-still-lanes">
        {LANES.map((lane) => (
          <li key={lane.mark} className={`mt-still-lane mt-still-lane--${lane.tone}`}>
            <span className="mt-still-lane__mark">{lane.mark}</span>
            <span className="mt-still-lane__copy">
              <span className="mt-still-lane__title">{lane.title}</span>
              {lane.path ? <PathChip label={lane.path} /> : <span className="mt-still-lane__meta">No Path yet</span>}
            </span>
            {lane.stat ? <span className="mt-still-lane__stat">{lane.stat}</span> : null}
          </li>
        ))}
      </ul>
    </article>
  );
}

function SlidePath() {
  return (
    <article className="mt-still mt-still--sheet">
      <p className="mt-still-kicker">Goal to Path</p>
      <div className="mt-still-bridge">
        <div className="mt-still-bridge__card">
          <span>Mountain</span>
          <p>Read 2 business books</p>
          <em>Future goal · Jul 7</em>
        </div>
        <span className="mt-still-bridge__join" aria-hidden="true">
          becomes
        </span>
        <div className="mt-still-bridge__card mt-still-bridge__card--path">
          <span>Path</span>
          <p>Read a few pages</p>
          <em>Today · the next honest step</em>
        </div>
      </div>
    </article>
  );
}

function renderSlide(id: StorySlide["id"]) {
  switch (id) {
    case "mission":
      return <SlideMission />;
    case "choose":
      return <SlideChoose />;
    case "home":
      return <SlideHome />;
    case "future":
      return <SlideFuture />;
    case "today":
      return <SlideToday />;
    case "path":
      return <SlidePath />;
    default:
      return null;
  }
}

export function MountainStoryCarousel() {
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
      className="mt-story-carousel"
      aria-label="Mountain product story"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mt-story-carousel__stage" data-tone={active.id === "home" || active.id === "mission" ? "night" : "light"} aria-live="polite">
        <div key={active.id} className="mt-story-carousel__pane">
          {renderSlide(active.id)}
        </div>
      </div>

      <div className="mt-story-carousel__caption">
        <p className="mt-story-carousel__eyebrow">{active.eyebrow}</p>
        <p className="mt-story-carousel__title">{active.title}</p>
      </div>

      <div
        className="element-screenshot-carousel__progress mt-story-carousel__progress"
        aria-label="Mountain story progress"
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
