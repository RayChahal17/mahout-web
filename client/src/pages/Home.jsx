const FEATURES = [
  { title: "Clarity", body: "Turn goals into a simple daily plan you’ll actually follow." },
  { title: "Momentum", body: "Build streaks with lightweight tracking and reminders." },
  { title: "Focus", body: "Keep the next step obvious—less thinking, more doing." },
  { title: "Consistency", body: "Small actions compound when the system is frictionless." },
  { title: "Reflection", body: "See what’s working and adjust without starting over." },
  { title: "Designed to feel premium", body: "Fast, minimal, and calm—no clutter." },
];

const TESTIMONIALS = [
  { quote: "The first app that made my plan feel obvious.", name: "Early user" },
  { quote: "Clean, fast, and surprisingly motivating.", name: "Beta tester" },
];

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div className="container heroGrid">
          <div className="heroLeft">
            <p className="pill">Mahout • Habit + Goal System</p>
            <h1 className="h1">
              Build unstoppable momentum with a calm, focused system.
            </h1>
            <p className="lead">
              Mahout helps you break big goals into daily steps, track consistency,
              and stay locked in—without the noise.
            </p>

            <div className="heroCtas">
              <a className="btn btnPrimary" href="https://play.google.com/" target="_blank" rel="noreferrer">
                Get the app
              </a>
              <a className="btn btnGhost" href="#features">
                See features
              </a>
            </div>

            <div className="heroStats">
              <div className="stat">
                <div className="statNum">Fast</div>
                <div className="statLabel">lightweight UX</div>
              </div>
              <div className="stat">
                <div className="statNum">Clear</div>
                <div className="statLabel">daily steps</div>
              </div>
              <div className="stat">
                <div className="statNum">Calm</div>
                <div className="statLabel">premium feel</div>
              </div>
            </div>
          </div>

          <div className="heroRight">
            <div className="deviceCard">
              <div className="deviceTop">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
              <div className="deviceScreen">
                <div className="mockTitle">Today</div>
                <div className="mockItem" />
                <div className="mockItem" />
                <div className="mockItem" />
                <div className="mockDivider" />
                <div className="mockTitle">This Week</div>
                <div className="mockItem" />
                <div className="mockItem" />
              </div>
            </div>

            <p className="muted smallNote">
              Replace this mock with your real screenshots in <code>src/assets</code>.
            </p>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="container">
          <h2 className="h2">Everything you need to stay consistent</h2>
          <p className="muted">
            Built for focus. Designed to keep your next step simple.
          </p>

          <div className="grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="card">
                <h3 className="h3">{f.title}</h3>
                <p className="muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="screens" className="section sectionAlt">
        <div className="container">
          <div className="sectionHead">
            <div>
              <h2 className="h2">Screenshots</h2>
              <p className="muted">Drop images into <code>src/assets</code> and swap these placeholders.</p>
            </div>
            <a className="btn btnGhost" href="https://play.google.com/" target="_blank" rel="noreferrer">
              View on Play
            </a>
          </div>

          <div className="shots">
            <div className="shot" aria-label="Screenshot placeholder 1" />
            <div className="shot" aria-label="Screenshot placeholder 2" />
            <div className="shot" aria-label="Screenshot placeholder 3" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h2">People like the vibe</h2>
          <div className="grid gridTwo">
            {TESTIMONIALS.map((t) => (
              <div key={t.quote} className="card">
                <p className="quote">“{t.quote}”</p>
                <p className="muted">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container ctaInner">
          <div>
            <h2 className="h2">Ready to build momentum?</h2>
            <p className="muted">Download Mahout and start with one small step today.</p>
          </div>
          <div className="ctaButtons">
            <a className="btn btnPrimary" href="https://play.google.com/" target="_blank" rel="noreferrer">
              Get the app
            </a>
            <a className="btn btnGhost" href="/contact">
              Contact
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}