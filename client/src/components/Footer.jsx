import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footerInner">
        <div className="footerLeft">
          <div className="brand small">
            <div className="brandMark" aria-hidden="true" />
            <span className="brandName">Mahout</span>
          </div>
          <p className="muted">
            Built for consistency. Designed for momentum.
          </p>
        </div>

        <div className="footerRight">
          <Link className="footerLink" to="/privacy">Privacy</Link>
          <Link className="footerLink" to="/contact">Contact</Link>
          <a className="footerLink" href="https://play.google.com/" target="_blank" rel="noreferrer">
            Google Play
          </a>
        </div>
      </div>

      <div className="container footerBottom">
        <span className="muted">© {year} Mahout. All rights reserved.</span>
      </div>
    </footer>
  );
}