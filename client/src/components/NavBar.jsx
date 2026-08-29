import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const links = useMemo(
    () => [
      { to: "/", label: "Home" },
      { to: "/privacy", label: "Privacy" },
      { to: "/contact", label: "Contact" },
    ],
    []
  );

  return (
    <header className="navWrap">
      <div className="container nav">
        <div className="brand">
          <div className="brandMark" aria-hidden="true" />
          <span className="brandName">Mahout</span>
        </div>

        <nav className="navLinks" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                isActive ? "navLink navLinkActive" : "navLink"
              }
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="navCtas">
          <a className="btn btnGhost" href="#screens">Screens</a>
          <a
            className="btn btnPrimary"
            href="https://play.google.com/"
            target="_blank"
            rel="noreferrer"
          >
            Get the app
          </a>

          <button
            className="hamburger"
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div className="container mobileMenu" role="dialog" aria-label="Menu">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "mobileLink mobileLinkActive" : "mobileLink"
              }
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}

          <div className="mobileCtas">
            <a className="btn btnGhost" href="#screens" onClick={() => setOpen(false)}>
              Screens
            </a>
            <a
              className="btn btnPrimary"
              href="https://play.google.com/"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              Get the app
            </a>
          </div>
        </div>
      )}
    </header>
  );
}