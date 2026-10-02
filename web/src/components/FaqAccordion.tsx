"use client";

import { useId, useState, type CSSProperties } from "react";
import type { MahoutFaqItem } from "@/lib/mahoutFaq";

export function FaqAccordion({
  items,
  defaultOpenId,
  allowMultiple = false,
  variant = "default",
}: {
  items: readonly MahoutFaqItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  variant?: "default" | "page";
}) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(defaultOpenId ? [defaultOpenId] : [])
  );

  const toggle = (id: string) => {
    setOpenIds((current) => {
      if (allowMultiple) {
        const next = new Set(current);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      }
      if (current.has(id)) {
        return new Set<string>();
      }
      return new Set([id]);
    });
  };

  const rootClass =
    variant === "page" ? "faq-accordion faq-accordion--page" : "faq-accordion";

  return (
    <div className={rootClass}>
      {items.map((item, index) => {
        const isOpen = openIds.has(item.id);
        const panelId = `${baseId}-${item.id}`;
        const triggerId = `${panelId}-trigger`;

        return (
          <article
            key={item.id}
            className={`faq-accordion__item${isOpen ? " is-open" : ""}${
              item.featured ? " faq-accordion__item--featured" : ""
            }`}
            style={{ "--faq-i": index } as CSSProperties}
          >
            <h3 className="faq-accordion__heading">
              <button
                id={triggerId}
                type="button"
                className="faq-accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span className="faq-accordion__question">{item.question}</span>
                <span className="faq-accordion__icon" aria-hidden="true">
                  <span className="faq-accordion__icon-bar" />
                  <span className="faq-accordion__icon-bar faq-accordion__icon-bar--vertical" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`faq-accordion__panel-wrap${isOpen ? " is-open" : ""}`}
            >
              <div className="faq-accordion__panel">
                <p className="faq-accordion__answer">{item.answer}</p>
                {item.answerHref && item.answerHrefLabel ? (
                  <p className="faq-accordion__answer" style={{ marginTop: 12 }}>
                    <a
                      className="premium-link"
                      href={item.answerHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.answerHrefLabel}
                    </a>
                  </p>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
