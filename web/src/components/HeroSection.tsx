"use client";

import { Container } from "./Container";
import { MagneticButton } from "./MagneticButton";
import { PremiumTransparentImage } from "./PremiumTransparentImage";
import { ElementIconBadge, type ElementIconName } from "./ElementIcon";
import { MAHOUT_ELEMENT_IMAGES } from "@/lib/mahoutAssets";
import { PLAY_STORE_URL } from "@/lib/siteLinks";

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

export function HeroSection() {
  return (
    <section
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
                <MagneticButton href={PLAY_STORE_URL}>Get Mahout on Google Play</MagneticButton>

                <MagneticButton href="#story" variant="secondary">
                  See the system
                </MagneticButton>
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
                  <line className="hero-element-annotation-line" x1="76" y1="13" x2="55" y2="10" />
                  <line className="hero-element-annotation-line" x1="80" y1="32" x2="55" y2="29" />
                  <line className="hero-element-annotation-line" x1="80" y1="61" x2="61" y2="55" />
                  <line className="hero-element-annotation-line" x1="25" y1="75" x2="42" y2="74" />
                  <line className="hero-element-annotation-line" x1="25" y1="49" x2="42" y2="48" />
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
