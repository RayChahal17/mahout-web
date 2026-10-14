"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "./Container";
import { PlayMark } from "./PlayMark";
import { PlayStoreLink } from "./PlayStoreLink";
import { PremiumTransparentImage } from "./PremiumTransparentImage";
import { ElementIconBadge, type ElementIconName } from "./ElementIcon";
import { MAHOUT_ELEMENT_IMAGES } from "@/lib/mahoutAssets";

const ELEMENT_CHIPS: Array<{
  name: string;
  detail: string;
  icon: ElementIconName;
}> = [
  { name: "North Star", detail: "Future-self guidance", icon: "north-star" },
  { name: "Mountain", detail: "Goals and direction", icon: "mountain" },
  { name: "Path", detail: "Next honest step", icon: "path" },
  { name: "Elephant", detail: "Emotional weather", icon: "elephant" },
  { name: "Mahout", detail: "Reflection into meaning", icon: "mahout" },
];

/** Points on the hero artwork, as fractions of the image itself. */
const ART_POINTS = {
  "north-star": { x: 0.56, y: 0.15 },
  mountain: { x: 0.54, y: 0.25 },
  path: { x: 0.63, y: 0.56 },
  mahout: { x: 0.405, y: 0.51 },
  elephant: { x: 0.42, y: 0.66 },
} as const;

function alignmentPercent(token: string) {
  if (token === "center") return 0.5;
  if (token === "left" || token === "top") return 0;
  if (token === "right" || token === "bottom") return 1;
  if (token.endsWith("%")) return Number.parseFloat(token) / 100;
  return 0.5;
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const media = window.matchMedia("(max-width: 979px)");

    const align = () => {
      const img = hero.querySelector<HTMLImageElement>(".hero-story-image img");
      const legend = hero.querySelector<HTMLElement>(".hero-element-legend");
      if (!img || !legend) return;

      const targets = legend.querySelectorAll<HTMLElement>(".hero-element-target");
      if (!media.matches || !img.naturalWidth || !img.naturalHeight) {
        targets.forEach((target) => {
          target.style.left = "";
          target.style.top = "";
        });
        return;
      }

      const frame = img.getBoundingClientRect();
      const legendBox = legend.getBoundingClientRect();
      if (frame.width < 1 || legendBox.width < 1) return;

      const [posXToken, posYToken] = getComputedStyle(img).objectPosition.split(/\s+/);
      const posX = alignmentPercent(posXToken ?? "center");
      const posY = alignmentPercent(posYToken ?? posXToken ?? "center");
      const scale = Math.max(frame.width / img.naturalWidth, frame.height / img.naturalHeight);
      const renderedW = img.naturalWidth * scale;
      const renderedH = img.naturalHeight * scale;
      const offsetX = frame.left + (frame.width - renderedW) * posX;
      const offsetY = frame.top + (frame.height - renderedH) * posY;

      (Object.keys(ART_POINTS) as Array<keyof typeof ART_POINTS>).forEach((key) => {
        const point = ART_POINTS[key];
        const screenX = offsetX + point.x * renderedW;
        const screenY = offsetY + point.y * renderedH;
        const x = ((screenX - legendBox.left) / legendBox.width) * 100;
        const y = ((screenY - legendBox.top) / legendBox.height) * 100;

        const target = legend.querySelector<HTMLElement>(`.hero-element-target--${key}`);
        if (target) {
          target.style.left = `${x}%`;
          target.style.top = `${y}%`;
        }

        const chip = legend.querySelector<HTMLElement>(`.hero-element-legend-chip--${key}`);
        const line = legend.querySelector<SVGLineElement>(
          `.hero-element-annotation-lines__phone [data-for="${key}"]`,
        );
        if (!chip || !line) return;

        const chipBox = chip.getBoundingClientRect();
        const fromRight = chipBox.left + chipBox.width / 2 > legendBox.left + legendBox.width / 2;
        const startX = (fromRight ? chipBox.left : chipBox.right) + (fromRight ? 1 : -1);
        const edge = 8;
        const startY =
          key === "mahout"
            ? chipBox.top + chipBox.height * 0.62
            : Math.min(chipBox.bottom - edge, Math.max(chipBox.top + edge, screenY));
        line.setAttribute("x1", String(((startX - legendBox.left) / legendBox.width) * 100));
        line.setAttribute("y1", String(((startY - legendBox.top) / legendBox.height) * 100));
        line.setAttribute("x2", String(x));
        line.setAttribute("y2", String(y));
      });
    };

    align();
    const observer = new ResizeObserver(align);
    observer.observe(hero);
    imgLoad();
    media.addEventListener("change", align);
    window.addEventListener("resize", align);

    function imgLoad() {
      const img = hero?.querySelector<HTMLImageElement>(".hero-story-image img");
      if (!img || img.complete) return;
      img.addEventListener("load", align, { once: true });
    }

    return () => {
      observer.disconnect();
      media.removeEventListener("change", align);
      window.removeEventListener("resize", align);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero-section"
      data-section
      data-scene="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-8vw",
          top: "-6vh",
          width: "42vw",
          height: "42vw",
          maxWidth: 520,
          maxHeight: 520,
          borderRadius: "50%",
          background: "rgba(156,140,255,0.16)",
          filter: "blur(110px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-4vw",
          top: "10%",
          width: "30vw",
          height: "30vw",
          maxWidth: 420,
          maxHeight: 420,
          borderRadius: "50%",
          background: "rgba(255,211,138,0.12)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <div className="hero-grid">
          <div className="hero-copy-panel">
            <div className="hero-copy-stack">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow__dot" aria-hidden="true" />
                The calm AI life operating system
              </div>

              <h1 className="hero-h1">
                Build the life you
                <br />
                <em>keep imagining.</em>
              </h1>

              <p className="hero-sub">
                Guided by Future You — not a generic chatbot.
              </p>

              <div className="hero-ctas">
                <PlayStoreLink className="hero-play-btn">
                  <PlayMark />
                  Get it on Google Play
                </PlayStoreLink>
                <a className="hero-see-link" href="#story">
                  See the system
                </a>
              </div>

            </div>
          </div>

          <div className="hero-phone hero-orbit-stage">
            <div
              className="hero-asset-stage"
              aria-label="Mahout journey illustration"
            >
              <PremiumTransparentImage
                className="hero-visual-image hero-story-image"
                src={MAHOUT_ELEMENT_IMAGES.heroMahoutJourney}
                alt="A rider on an elephant follows a glowing mountain path toward the North Star."
                priority
                showGlow={false}
                dropShadow={false}
                unoptimized
                maxHeight={720}
                minHeight={0}
                sizes="(max-width: 980px) 94vw, 860px"
              />

              <div className="hero-element-legend" aria-label="Mahout five elements">
                <svg
                  className="hero-element-annotation-lines"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <g className="hero-element-annotation-lines__desktop">
                    <line className="hero-element-annotation-line" x1="76" y1="13" x2="55" y2="10" />
                    <line className="hero-element-annotation-line" x1="80" y1="32" x2="55" y2="29" />
                    <line className="hero-element-annotation-line" x1="80" y1="61" x2="61" y2="55" />
                    <line className="hero-element-annotation-line" x1="25" y1="75" x2="42" y2="74" />
                    <line className="hero-element-annotation-line" x1="25" y1="49" x2="42" y2="48" />
                  </g>
                  <g className="hero-element-annotation-lines__phone">
                    <line className="hero-element-annotation-line" data-for="north-star" x1="63" y1="26" x2="51" y2="13" />
                    <line className="hero-element-annotation-line" data-for="mountain" x1="63" y1="43" x2="56" y2="25" />
                    <line className="hero-element-annotation-line" data-for="path" x1="64" y1="64" x2="60" y2="57" />
                    <line className="hero-element-annotation-line" data-for="mahout" x1="36" y1="38" x2="34" y2="52" />
                    <line className="hero-element-annotation-line" data-for="elephant" x1="34" y1="80" x2="30" y2="70" />
                  </g>
                </svg>

                <div className="hero-element-target hero-element-target--north-star" aria-hidden="true" />
                <div className="hero-element-target hero-element-target--mountain" aria-hidden="true" />
                <div className="hero-element-target hero-element-target--path" aria-hidden="true" />
                <div className="hero-element-target hero-element-target--elephant" aria-hidden="true" />
                <div className="hero-element-target hero-element-target--mahout" aria-hidden="true" />

                {ELEMENT_CHIPS.map((element) => (
                  <div
                    key={element.name}
                    className={`hero-element-legend-chip hero-element-legend-chip--${element.icon}`}
                  >
                    <ElementIconBadge name={element.icon} size={32} iconSize={16} />
                    <div>
                      <div className="hero-element-legend-chip__name">{element.name}</div>
                      <div className="hero-element-legend-chip__detail">{element.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
