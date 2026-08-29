export default function Privacy() {
  return (
    <div className="page">
      <div className="container legal">
        <h1 className="h2">Privacy Policy</h1>
        <p className="muted">
          This is a starter template. Update it to match Mahout’s real data practices before publishing.
        </p>

        <h2 className="h3">What we collect</h2>
        <ul className="list">
          <li>Account info (if you add sign-in): email, name</li>
          <li>App usage data (analytics, crash reports)</li>
          <li>Content you enter (goals, tasks, notes)</li>
        </ul>

        <h2 className="h3">How we use data</h2>
        <ul className="list">
          <li>Provide core app functionality</li>
          <li>Improve performance and reliability</li>
          <li>Support and communication</li>
        </ul>

        <h2 className="h3">Third parties</h2>
        <p className="muted">
          List services like Firebase/Firestore, Crashlytics, Analytics, etc., if used.
        </p>

        <h2 className="h3">Contact</h2>
        <p className="muted">
          Email: <a className="link" href="mailto:you@domain.com">you@domain.com</a>
        </p>

        <p className="muted smallNote">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}