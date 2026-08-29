"use client";

import { useRef, useEffect, useState } from "react";
import { Container } from "./Container";
import { PhoneFrame } from "./PhoneFrame";

const CHAPTERS = [
  {
    id: "elephant",
    title: "Where are you right now?",
    promise: "Your state isn't noise. It's the starting point.",
    bullets: [
      "2-second mood check-in",
      "Optional intensity / note",
      "Starts the guidance loop instantly",
    ],
    thread: "When Elephant speaks, North Star listens.",
  },
  {
    id: "north-star",
    title: "Future You opens the door.",
    promise: "Not a chatbot—an inner guide with receipts.",
    bullets: [
      "Responds in the right tone (calm vs action)",
      "Offers one doorway: comfort, reflection, or one brick",
      "Suggests only what fits your moment",
    ],
    thread: "North Star turns feeling into a next step.",
  },
  {
    id: "mahout",
    title: "Give the day words.",
    promise: "Reflection becomes clarity, not rumination.",
    bullets: [
      "Free journaling + prompts",
      "3-line templates for hard moments",
      "Optional voice journaling",
    ],
    thread: "When you name it, you can move with it.",
  },
  {
    id: "path",
    title: "Move one brick.",
    promise: "Progress becomes real because it leaves receipts.",
    bullets: [
      "Timer → automatic session receipts",
      "Day map shows your real life, not guesses",
      "Manual log when needed",
    ],
    thread: "Your time becomes visible.",
  },
  {
    id: "aim",
    title: "That brick belonged to something.",
    promise: "Effort connects back to meaning.",
    bullets: [
      "Chief Aim anchors everything",
      "Goals show proof-based progress",
      "No fake percentages—only receipts",
    ],
    thread: "Meaning turns effort into direction.",
  },
];

export function StoryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chapters = el.querySelectorAll("[data-chapter]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-chapter"));
            setActiveChapter(idx);
          }
        }
      },
      { threshold: 0.3, rootMargin: "-20% 0px" }
    );

    chapters.forEach((ch) => observer.observe(ch));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          .story-chapter-grid { grid-template-columns: 1fr 1fr !important; }
          .story-chapter-grid > div:first-child { order: 1; }
          .story-chapter-grid > div:last-child { order: 2; }
        }
      `}</style>
      <div ref={containerRef}>
        {CHAPTERS.map((ch, idx) => (
        <section
          key={ch.id}
          data-chapter={idx}
          style={{
            padding: "var(--space-16) 0",
            minHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Container>
            <div
              className="story-chapter-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "var(--space-10)",
                alignItems: "center",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-headline)",
                    fontSize: "var(--text-3xl)",
                    color: "var(--lavenderDeep)",
                    marginBottom: "var(--space-2)",
                    letterSpacing: "var(--tracking-tight)",
                  }}
                >
                  {ch.title}
                </h2>
                <p
                  style={{
                    fontSize: "var(--text-lg)",
                    color: "var(--inkSoft)",
                    marginBottom: "var(--space-6)",
                    lineHeight: "var(--leading-relaxed)",
                  }}
                >
                  {ch.promise}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-3)",
                  }}
                >
                  {ch.bullets.map((b) => (
                    <li
                      key={b}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-3)",
                        fontSize: "var(--text-base)",
                        color: "var(--ink)",
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "var(--lavenderPrimary)",
                        }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
                <p
                  style={{
                    marginTop: "var(--space-6)",
                    fontSize: "var(--text-sm)",
                    color: "var(--muted)",
                    fontStyle: "italic",
                  }}
                >
                  {ch.thread}
                </p>
              </div>
              <div
                style={{
                  opacity: activeChapter === idx ? 1 : 0.4,
                  transition: "opacity var(--duration-slow) var(--ease-calm)",
                }}
              >
                <PhoneFrame />
              </div>
            </div>
          </Container>
        </section>
        ))}
      </div>
    </>
  );
}
