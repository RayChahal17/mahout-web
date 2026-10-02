import Link from "next/link";
import { Container } from "./Container";
import { EonexEmblem } from "./EonexBrand";
import { PlayStoreLink } from "./PlayStoreLink";
import { EONEX_URL } from "@/lib/siteLinks";

const PRODUCT_LINKS = [
  { href: "/#story", label: "Story" },
  { href: "/#element-path", label: "Path" },
  { href: "/#habits", label: "Habits" },
  { href: "/#north-star", label: "North Star" },
];

const COMPANY_LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/support", label: "Support" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

function EonexLink({
  children,
  marked = false,
}: {
  children: React.ReactNode;
  marked?: boolean;
}) {
  return (
    <a
      href={EONEX_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Eonex Technologies, opens in a new tab"
      className={marked ? "eonex-credit-link eonex-credit-link--mark" : "eonex-credit-link"}
    >
      {children}
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="site-footer"
      style={{
        position: "relative",
        borderTop: "1px solid var(--mahout_outline_soft)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0)) , rgba(6,8,14,0.92)",
      }}
    >
      <Container>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--mahout_space_24)",
            padding: "clamp(36px, 5vw, 56px) 0",
          }}
        >
          <div style={{ maxWidth: 420 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                marginBottom: "var(--mahout_space_16)",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, var(--mahout_accent), rgba(255,211,138,0.82))",
                  boxShadow: "0 0 24px var(--mahout_premium_accent_2)",
                }}
              />
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontFamily: "var(--font_head)",
                    color: "var(--mahout_text_primary)",
                    lineHeight: 1.05,
                  }}
                >
                  Mahout
                </div>
                <div
                  style={{
                    color: "var(--mahout_text_tertiary)",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  premium personal operating system
                </div>
              </div>
            </div>

            <p
              style={{
                color: "var(--mahout_text_secondary)",
                lineHeight: "var(--leading_body)",
                margin: 0,
              }}
            >
              Five elements, one calm system. Mahout helps people build direction, execute clearly,
              notice patterns, and stay aligned with the future they actually want.
            </p>

            <p
              style={{
                margin: "var(--mahout_space_16) 0 0",
                color: "var(--mahout_text_tertiary)",
                fontSize: "var(--text_caption)",
                letterSpacing: "0.04em",
                lineHeight: "var(--leading_body)",
              }}
            >
              <EonexLink marked>
                <span className="eonex-credit-row">
                  <EonexEmblem />
                  <span>A product of Eonex Technologies</span>
                </span>
              </EonexLink>
            </p>
          </div>

          <div>
            <h3
              style={{
                fontFamily: "var(--font_head)",
                fontSize: "var(--text_body)",
                color: "var(--mahout_text_primary)",
                marginBottom: "var(--mahout_space_12)",
              }}
            >
              Product
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--mahout_space_8)" }}>
              {PRODUCT_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    color: "var(--mahout_text_secondary)",
                    fontSize: "var(--text_body_m)",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3
              style={{
                fontFamily: "var(--font_head)",
                fontSize: "var(--text_body)",
                color: "var(--mahout_text_primary)",
                marginBottom: "var(--mahout_space_12)",
              }}
            >
              Company
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--mahout_space_8)",
                marginBottom: "var(--mahout_space_16)",
              }}
            >
              <PlayStoreLink
                style={{
                  color: "var(--mahout_text_secondary)",
                  fontSize: "var(--text_body_m)",
                }}
              >
                Get the app
              </PlayStoreLink>
              {COMPANY_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    color: "var(--mahout_text_secondary)",
                    fontSize: "var(--text_body_m)",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--mahout_space_8)" }}>
              {LEGAL_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    color: "var(--mahout_text_tertiary)",
                    fontSize: "var(--text_body_m)",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "0 0 28px",
            borderTop: "1px solid var(--mahout_outline_soft)",
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--mahout_space_12)",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "var(--mahout_text_tertiary)",
              fontSize: "var(--text_caption)",
            }}
          >
            © {year} <EonexLink>Eonex Technologies</EonexLink>. Mahout is a product of{" "}
            <EonexLink>Eonex</EonexLink>.
          </span>

          <span
            style={{
              color: "var(--mahout_text_tertiary)",
              fontSize: "var(--text_caption)",
            }}
          >
            Built for people building a future they can respect.
          </span>
        </div>
      </Container>

      <style>{`
        .eonex-credit-link {
          color: var(--mahout_text_tertiary);
          text-decoration: underline;
          text-underline-offset: 0.12em;
          transition: color 0.2s ease;
        }

        .eonex-credit-link--mark {
          text-decoration: none;
        }

        .eonex-credit-row {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .eonex-credit-row span {
          text-decoration: underline;
          text-underline-offset: 0.12em;
        }

        .eonex-credit-link:hover {
          color: var(--mahout_text_secondary);
        }

        @media (max-width: 720px) {
          .site-footer {
            padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px));
          }
        }

        @media (min-width: 900px) {
          .footer-grid {
            grid-template-columns: 1.2fr 0.7fr 0.7fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
