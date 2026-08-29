"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Container } from "./Container";

const SECTION_ITEMS = [
  { id: "story", label: "Story" },
  { id: "element-path", label: "Path" },
  { id: "habits", label: "Habits" },
  { id: "north-star", label: "North Star" },
];

const ROUTE_ITEMS = [{ href: "/privacy", label: "Privacy" }];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const getSectionHref = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);

  return (
    <header
      className="nav-header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        padding: "var(--mahout_space_12) 0 0",
      }}
    >
      <Container>
        <div
          style={{
            borderRadius: 24,
            border: "1px solid var(--mahout_outline_soft)",
            background: scrolled ? "rgba(8,10,18,0.82)" : "rgba(8,10,18,0.52)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow: scrolled ? "var(--shadow_l)" : "none",
            transition: "background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
            overflow: "hidden",
          }}
        >
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              gap: "var(--mahout_space_12)",
            }}
            aria-label="Primary"
          >
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                textDecoration: "none",
                color: "var(--mahout_text_primary)",
                fontWeight: 700,
                fontFamily: "var(--font_head)",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, var(--mahout_accent), rgba(255,211,138,0.82))",
                  boxShadow: "0 0 24px var(--mahout_premium_accent_2)",
                  flexShrink: 0,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                <span style={{ color: "var(--mahout_text_primary)", lineHeight: 1.05 }}>Mahout</span>
                <span
                  style={{
                    color: "var(--mahout_text_tertiary)",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    lineHeight: 1.2,
                  }}
                >
                  calm system
                </span>
              </div>
            </Link>

            <div
              className="nav-desktop"
              style={{
                display: "none",
                alignItems: "center",
                gap: "var(--mahout_space_8)",
              }}
            >
              {SECTION_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={getSectionHref(item.id)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "var(--mahout_radius_pill)",
                    color: "var(--mahout_text_secondary)",
                    fontSize: "var(--text_body_m)",
                    fontWeight: 500,
                    border: "1px solid transparent",
                    transition: "color 0.2s ease, border-color 0.2s ease, background 0.2s ease",
                  }}
                >
                  {item.label}
                </Link>
              ))}

              {ROUTE_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "var(--mahout_radius_pill)",
                    color: "var(--mahout_text_secondary)",
                    fontSize: "var(--text_body_m)",
                    fontWeight: 500,
                    border: pathname === item.href ? "1px solid var(--mahout_outline_soft)" : "1px solid transparent",
                    background: pathname === item.href ? "rgba(255,255,255,0.04)" : "transparent",
                    transition: "color 0.2s ease, border-color 0.2s ease, background 0.2s ease",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div
              className="nav-actions"
              style={{
                display: "none",
                alignItems: "center",
                gap: "var(--mahout_space_12)",
              }}
            >
              <span
                style={{
                  padding: "10px 12px",
                  borderRadius: "var(--mahout_radius_pill)",
                  border: "1px solid var(--mahout_outline_soft)",
                  background: "rgba(255,255,255,0.03)",
                  color: "var(--mahout_text_secondary)",
                  fontSize: "var(--text_caption)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Private beta
              </span>

              <Link
                href="/waitlist"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "var(--mahout_btn_height)",
                  padding: "0 18px",
                  borderRadius: "var(--mahout_radius_button)",
                  background: "var(--mahout_accent)",
                  color: "var(--mahout_on_accent)",
                  fontWeight: 600,
                  fontSize: "var(--text_body)",
                  boxShadow: "var(--shadow_m), 0 0 24px var(--mahout_premium_accent_2)",
                }}
              >
                Form my North Star
              </Link>
            </div>

            <button
              type="button"
              className="nav-mobile-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              style={{
                display: "inline-flex",
                flexDirection: "column",
                gap: 4,
                width: 46,
                height: 46,
                borderRadius: "var(--mahout_radius_pill)",
                border: "1px solid var(--mahout_outline_soft)",
                background: "rgba(255,255,255,0.05)",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 18,
                  height: 2,
                  borderRadius: 999,
                  background: "var(--mahout_text_primary)",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 18,
                  height: 2,
                  borderRadius: 999,
                  background: "var(--mahout_text_primary)",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 18,
                  height: 2,
                  borderRadius: 999,
                  background: "var(--mahout_text_primary)",
                }}
              />
            </button>
          </nav>

          {open && (
            <div
              role="dialog"
              aria-label="Menu"
              style={{
                padding: "0 16px 16px",
                borderTop: "1px solid var(--mahout_outline_soft)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--mahout_space_8)",
              }}
            >
              {SECTION_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={getSectionHref(item.id)}
                  onClick={() => setOpen(false)}
                  style={{
                    padding: "14px 14px",
                    borderRadius: "var(--mahout_radius_button)",
                    color: "var(--mahout_text_primary)",
                    fontWeight: 500,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--mahout_outline_soft)",
                  }}
                >
                  {item.label}
                </Link>
              ))}

              {ROUTE_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{
                    padding: "14px 14px",
                    borderRadius: "var(--mahout_radius_button)",
                    color: "var(--mahout_text_primary)",
                    fontWeight: 500,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--mahout_outline_soft)",
                  }}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/waitlist"
                onClick={() => setOpen(false)}
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "var(--mahout_btn_height)",
                  marginTop: "var(--mahout_space_8)",
                  borderRadius: "var(--mahout_radius_button)",
                  background: "var(--mahout_accent)",
                  color: "var(--mahout_on_accent)",
                  fontWeight: 600,
                  boxShadow: "var(--shadow_m), 0 0 24px var(--mahout_premium_accent_2)",
                }}
              >
                Form my North Star
              </Link>
            </div>
          )}
        </div>
      </Container>

      <style>{`
        @media (min-width: 980px) {
          .nav-desktop { display: flex !important; }
          .nav-actions { display: flex !important; }
          .nav-mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
