"use client";

import { type ReactNode } from "react";
import {
  ElementScreenshotCarousel,
  type ScreenshotCarouselSlide,
} from "./ElementScreenshotCarousel";
import { PhoneFrame } from "./PhoneFrame";
import { PremiumTransparentImage } from "./PremiumTransparentImage";

export function ChapterScreenshotHero({
  mainImageSrc,
  mainImageAlt,
  secondaryImageSrc,
  secondaryImageAlt,
  assetSlot,
  phoneEyebrow,
  phoneTitle,
  slides,
  carouselAriaLabel,
  glow = "mixed",
  secondaryGlow = "gold",
  stage,
}: {
  mainImageSrc: string;
  mainImageAlt: string;
  secondaryImageSrc?: string;
  secondaryImageAlt?: string;
  assetSlot?: string;
  phoneEyebrow: string;
  phoneTitle: string;
  slides: readonly ScreenshotCarouselSlide[];
  carouselAriaLabel: string;
  glow?: "purple" | "gold" | "mixed";
  secondaryGlow?: "purple" | "gold" | "mixed";
  stage?: ReactNode;
}) {
  const isDualArt = Boolean(secondaryImageSrc && secondaryImageAlt);

  return (
    <div className="chapter-hero-visual-stack">
      <div
        className={`chapter-hero-visual-composed${isDualArt ? " chapter-hero-visual-composed--dual" : ""}`}
        aria-label={mainImageAlt}
        data-asset-slot={assetSlot}
      >
        <div className="chapter-hero-art-panel">
          <div aria-hidden="true" className="chapter-hero-art-panel__halo" />
          <div className="chapter-hero-art-image-wrap">
            <PremiumTransparentImage
              className="chapter-hero-art-image"
              src={mainImageSrc}
              alt={mainImageAlt}
              maxHeight={560}
              minHeight={400}
              showGlow={false}
              dropShadow={false}
              unoptimized
              sizes="(max-width: 900px) 92vw, 560px"
              glow={glow}
            />
          </div>
        </div>

        {isDualArt ? (
          <div
            className="chapter-hero-secondary-float"
            aria-label={secondaryImageAlt}
          >
            <div className="chapter-hero-secondary-art-wrap">
              <PremiumTransparentImage
                className="chapter-hero-secondary-art"
                src={secondaryImageSrc!}
                alt={secondaryImageAlt!}
                maxHeight={320}
                minHeight={220}
                showGlow={false}
                dropShadow={false}
                unoptimized
                sizes="(max-width: 900px) 42vw, 260px"
                glow={secondaryGlow}
              />
            </div>
          </div>
        ) : null}

        {stage ? (
          <div className="chapter-hero-story-stage" aria-label={carouselAriaLabel}>
            {stage}
          </div>
        ) : (
          <div className="chapter-hero-phone-float" aria-label={carouselAriaLabel}>
            <PhoneFrame
              className="chapter-hero-phone"
              eyebrow={phoneEyebrow}
              title={phoneTitle}
              variant="overlay"
            >
              <ElementScreenshotCarousel
                ariaLabel={carouselAriaLabel}
                slides={slides}
              />
            </PhoneFrame>
          </div>
        )}
      </div>
    </div>
  );
}
