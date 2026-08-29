import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="h2">Page not found</h1>
        <p className="muted">That link doesn’t exist.</p>
        <Link className="btn btnGhost" to="/">Back home</Link>
      </div>
    </div>
  );
}