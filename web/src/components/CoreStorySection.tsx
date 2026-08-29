"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Container } from "./Container";
import { GlassCard } from "./GlassCard";
import { Chip } from "./Chip";
import { FrostShield } from "./FrostShield";
import { PremiumTransparentImage } from "./PremiumTransparentImage";
import { ElementIconBadge } from "./ElementIcon";
import { CORE_STORY_ASSETS } from "@/lib/mahoutAssets";

const ELEMENTS = [
  {
    id: "mountain",
    href: "#element-mountain",
    order: "01",
    name: "Mountain",
    label: "Goals and direction",
    context:
      "Holds Future Goals, Today Goals, and deadlines so the day stays connected to direction.",
    line: "Mountain shows where you are going.",
    assetLabel: "Mountain element art",
    tint: "rgba(255, 211, 138, 0.16)",
    ring: "rgba(255, 211, 138, 0.36)",
    nodes: ["Future Goals", "Today Goals", "Deadlines"],
  },
  {
    id: "path",
    href: "#element-path",
    order: "02",
    name: "Path",
    label: "Actions right now",
    context:
      "Where goals become steps, timers, checkoffs, and receipts — what you are doing now.",
    line: "Path carries the next honest step.",
    assetLabel: "Future asset: path.png",
    tint: "rgba(156, 140, 255, 0.16)",
    ring: "rgba(156, 140, 255, 0.42)",
    nodes: ["Actions", "Timers", "Receipts"],
  },
  {
    id: "elephant",
    href: "#element-elephant",
    order: "03",
    name: "Elephant",
    label: "Emotional weather",
    context:
      "Mood logs and check-ins reveal the emotional weather behind your actions.",
    line: "Your emotions are not noise. They are part of the map.",
    assetLabel: "Elephant element art",
    tint: "rgba(129, 201, 168, 0.14)",
    ring: "rgba(129, 201, 168, 0.34)",
    nodes: ["Mood", "Energy", "Rhythm"],
  },
  {
    id: "mahout",
    href: "#element-mahout",
    order: "04",
    name: "Mahout",
    label: "Reflection and meaning",
    context:
      "A reflective space where journaling turns the day into meaning, not just completion.",
    line: "Some days need to be understood, not pushed harder.",
    assetLabel: "Future asset: mahout-reflection.png",
    tint: "rgba(255, 255, 255, 0.10)",
    ring: "rgba(255, 255, 255, 0.22)",
    nodes: ["Journal", "Meaning", "Insight"],
  },
  {
    id: "north-star",
    href: "#north-star-origin",
    order: "05",
    name: "North Star",
    label: "Ideal future self guidance",
    context:
      "Your ideal future self — shaped by your vision — guiding with memory, patterns, and receipts.",
    line: "Guidance with memory, direction, and receipts.",
    assetLabel: "North Star origin art",
    tint: "rgba(156, 140, 255, 0.22)",
    ring: "rgba(156, 140, 255, 0.55)",
    nodes: ["Guidance", "Memory", "Receipts"],
  },
] as const;

const CONTRASTS = [
  "Task apps track actions.",
  "Habit apps track streaks.",
  "Journals store reflections.",
  "Mood apps track emotions.",
  "Chatbots answer questions.",
  "Mahout connects them.",
];

const LOOP_STEPS = [
  { label: "Future vision", copy: "Your future life names the signal." },
  { label: "North Star forms", copy: "Ideal future self becomes guide." },
  { label: "Mountain gives direction", copy: "Goals keep the day aligned." },
  { label: "Path carries action", copy: "Receipts make progress visible." },
  { label: "Repetition becomes signal", copy: "Habits show what repeats." },
  { label: "Elephant adds context", copy: "Mood explains the weather." },
  { label: "Mahout adds meaning", copy: "Reflection turns data into story." },
  { label: "Brain remembers", copy: "Patterns keep guidance specific." },
  { label: "North Star guides again", copy: "Letters and chat point forward." },
] as const;

function ElementAsset({
  element,
}: {
  element: (typeof ELEMENTS)[number];
}) {
  const imageSrc = CORE_STORY_ASSETS[element.id];

  if (imageSrc) {
    return (
      <div className="core-element-art core-element-art--scene" data-element={element.id}>
        <div aria-hidden="true" className="core-element-art__atmosphere" />
        <div aria-hidden="true" className="core-element-art__halo" />
        <div aria-hidden="true" className="core-element-art__floor" />
        <div className="core-element-art__stage">
          <PremiumTransparentImage
            className="core-element-art__image core-element-art__float"
            src={imageSrc}
            alt={`${element.name} — Mahout element scene`}
            maxHeight={168}
            minHeight={120}
            showGlow={false}
            dropShadow={false}
            unoptimized
            glow={element.id === "mountain" ? "gold" : element.id === "elephant" ? "purple" : "mixed"}
            sizes="(max-width: 900px) 42vw, 240px"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="core-element-art core-element-art--placeholder"
      data-element={element.id}
      aria-label={`${element.name} illustration placeholder`}
    >
      <div
        aria-hidden="true"
        className="core-element-art__placeholder-glow"
        style={{ background: element.tint }}
      />
      <div
        aria-hidden="true"
        className="core-element-art__placeholder-ring"
        style={{ borderColor: element.ring, boxShadow: `0 0 44px ${element.ring}` }}
      />
      <div aria-hidden="true" className="core-element-art__placeholder-dot" />
      <div aria-hidden="true" className="core-element-art__placeholder-shine" />
      <div className="core-element-art__placeholder-label">
        <span>{element.assetLabel}</span>
        <span aria-hidden="true">✦</span>
      </div>
    </div>
  );
}

function ElementCard({
  element,
  index,
}: {
  element: (typeof ELEMENTS)[number];
  index: number;
}) {
  return (
    <a
      href={element.href}
      className="core-element-card-link core-story-reveal"
      style={{ "--reveal-i": index + 2 } as CSSProperties}
      aria-label={`${element.name}: ${element.line}. Open full description.`}
    >
      <GlassCard className="core-element-card" data-element={element.id}>
        <div className="core-element-card__inner">
          <div className="core-element-card__head">
            <div>
              <div className="core-element-card__eyebrow">
                {element.order} · {element.label}
              </div>
              <h3 className="core-element-card__title">{element.name}</h3>
            </div>

            <ElementIconBadge name={element.id} size={36} iconSize={18} />
          </div>

          <ElementAsset element={element} />

          <div className="core-element-card__foot">
            <p className="core-element-card__context">{element.context}</p>
            <p className="core-element-card__line">{element.line}</p>

            <div className="core-element-card__chips">
              {element.nodes.map((node) => (
                <Chip key={node} variant="summary" className="core-element-chip">
                  {node}
                </Chip>
              ))}
            </div>

            <span className="core-element-card__cta">
              View full story
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </GlassCard>
    </a>
  );
}

function LoopRail() {
  return (
    <div className="core-story-loop">
      <GlassCard active className="core-story-loop__card">
        <div aria-hidden="true" className="core-loop-beam" />

        <div className="core-story-loop__inner">
          <div className="core-story-loop__header core-story-reveal" style={{ "--reveal-i": 0 } as CSSProperties}>
            <div className="core-story-loop__eyebrow">The connected loop</div>
            <h3 className="core-story-loop__title">
              The elements are not separate tabs. They are one loop.
            </h3>
            <p className="core-story-loop__lead">
              Vision becomes guidance, action, signal, and memory — then North Star guides again.
            </p>

            <div className="core-story-loop__chain" aria-hidden="true">
              {["Vision", "Direction", "Action", "Signal", "Guidance"].map((item, i) => (
                <span key={item} className="core-story-loop__chain-item">
                  {i > 0 ? <span className="core-story-loop__chain-arrow">→</span> : null}
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="core-loop-grid">
            {LOOP_STEPS.map((step, index) => (
              <div
                key={step.label}
                className={`core-story-loop__step core-story-reveal${index === 1 || index === LOOP_STEPS.length - 1 ? " core-story-loop__step--accent" : ""}`}
                style={{ "--reveal-i": index + 1 } as CSSProperties}
              >
                <div className="core-story-loop__step-head">
                  <span className="core-story-loop__step-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="core-story-loop__step-dot" />
                </div>
                <div className="core-story-loop__step-label">{step.label}</div>
                <p className="core-story-loop__step-copy">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export function CoreStorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const markVisible = () => el.classList.add("is-visible");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            markVisible();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      markVisible();
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="core-story-section"
      aria-label="Mahout core story"
      data-home-anchor="story"
      data-section
      data-scene="story"
    >
      <Container>
        <div className="core-story-stack">
          <div className="core-story-intro">
            <div className="core-story-intro__copy core-story-reveal" style={{ "--reveal-i": 0 } as CSSProperties}>
              <div className="core-story-eyebrow">
                <span aria-hidden="true" className="core-story-eyebrow__dot" />
                Core story
              </div>

              <h2 className="core-story-headline">Five elements. One North Star.</h2>

              <p className="core-story-lead">
                Mahout connects future vision, goals, action, emotion, and guidance into one calm
                system.
              </p>
              <p className="core-story-explore-hint">
                Choose an element to open its full description on this page.
              </p>
            </div>

            <FrostShield className="core-story-contrast core-story-reveal" style={{ "--reveal-i": 1 } as CSSProperties}>
              <p className="core-story-contrast__title">This is not another task app.</p>

              <div className="core-story-contrast__list">
                {CONTRASTS.map((contrast, index) => (
                  <div
                    key={contrast}
                    className={`core-story-contrast__item${index === CONTRASTS.length - 1 ? " core-story-contrast__item--accent" : ""}`}
                  >
                    <span aria-hidden="true" className="core-story-contrast__bullet" />
                    {contrast}
                  </div>
                ))}
              </div>
            </FrostShield>
          </div>

          <div className="core-story-elements-rail">
            <div className="core-story-elements-rail__label core-story-reveal" style={{ "--reveal-i": 1 } as CSSProperties}>
              <span>01–05 · The five elements</span>
              <span className="core-story-elements-rail__hint">Click a card to jump</span>
            </div>
            <div className="core-elements-grid">
              {ELEMENTS.map((element, index) => (
                <ElementCard key={element.id} element={element} index={index} />
              ))}
            </div>
          </div>

          <LoopRail />
        </div>
      </Container>
    </section>
  );
}
