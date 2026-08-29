import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("bad status");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="page">
      <div className="container contact">
        <h1 className="h2">Contact</h1>
        <p className="muted">
          Want feedback, press, or partnerships? Send a message.
        </p>

        <div className="contactGrid">
          <form className="card form" onSubmit={onSubmit}>
            <label className="label">
              Name
              <input
                className="input"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Your name"
                autoComplete="name"
              />
            </label>

            <label className="label">
              Email
              <input
                className="input"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="you@email.com"
                autoComplete="email"
              />
            </label>

            <label className="label">
              Message
              <textarea
                className="input textarea"
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                placeholder="How can we help?"
                rows={6}
              />
            </label>

            <button className="btn btnPrimary" disabled={status === "sending"} type="submit">
              {status === "sending" ? "Sending..." : "Send message"}
            </button>

            {status === "sent" && <p className="success">Sent. I’ll get back to you.</p>}
            {status === "error" && (
              <p className="error">
                Couldn’t send right now. Email us at{" "}
                <a className="link" href="mailto:you@domain.com">you@domain.com</a>.
              </p>
            )}
          </form>

          <div className="card">
            <h2 className="h3">Direct email</h2>
            <p className="muted">
              <a className="link" href="mailto:you@domain.com">you@domain.com</a>
            </p>

            <div className="divider" />

            <h2 className="h3">Links</h2>
            <p className="muted">
              <a className="link" href="https://play.google.com/" target="_blank" rel="noreferrer">
                Google Play
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}