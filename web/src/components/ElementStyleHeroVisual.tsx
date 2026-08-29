"use client";

import Image from "next/image";
import { type ReactNode } from "react";
import {
  ElementScreenshotCarousel,
  type ScreenshotCarouselSlide,
} from "./ElementScreenshotCarousel";
import { PhoneFrame } from "./PhoneFrame";

/**
 * Same art + overlay stack as ElementDeepDivesSection.
 * Use inside ChapterIntroWithHero via heroVisual.
 * Pass `stage` for composed stills; otherwise a phone screenshot carousel.
 */
export function ElementStyleHeroVisual({
  imageSrc,
  imageAlt,
  assetSlot,
  dataElement,
  phoneEyebrow = "Preview",
  phoneTitle = "Product story",
  slides,
  carouselAriaLabel,
  stage,
  priority,
}: {
  imageSrc: string;
  imageAlt: string;
  assetSlot?: string;
  dataElement: string;
  phoneEyebrow?: string;
  phoneTitle?: string;
  slides?: readonly ScreenshotCarouselSlide[];
  carouselAriaLabel: string;
  stage?: ReactNode;
  priority?: boolean;
}) {
  return (
    <div
      className="element-deep-visual-composed element-style-hero-visual"
      data-element={dataElement}
      aria-label={imageAlt}
      data-asset-slot={assetSlot}
    >
      <div className="element-deep-art-panel">
        <div aria-hidden="true" className="element-deep-art-panel__halo" />
        <div className="element-deep-art-image-wrap">
          <Image
            className="element-deep-art-image"
            src={imageSrc}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 900px) 92vw, 560px"
            unoptimized
          />
        </div>
      </div>

      {stage ? (
        <div className="element-deep-story-stage" aria-label={carouselAriaLabel}>
          {stage}
        </div>
      ) : slides ? (
        <div className="element-deep-phone-float" aria-label={carouselAriaLabel}>
          <PhoneFrame
            className="element-deep-phone"
            eyebrow={phoneEyebrow}
            title={phoneTitle}
            variant="overlay"
          >
            <ElementScreenshotCarousel ariaLabel={carouselAriaLabel} slides={slides} />
          </PhoneFrame>
        </div>
      ) : null}
    </div>
  );
}
