const contactEmail = "founder@orpheusnarration.com";

export default function Home() {
  return (
    <main className="site-shell">
      <section className="hero" aria-labelledby="hero-title">
        <nav className="nav" aria-label="Primary">
          <a className="brand" href="/">
            Orpheus Narration
          </a>
          <a className="nav-link" href={`mailto:${contactEmail}`}>
            Contact
          </a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Founder-led product in development</p>
            <h1 id="hero-title">
              Stable long-form narration for educational explainers.
            </h1>
            <p className="lede">
              Orpheus is being built for creators who need one-submit narration
              that can handle longer scripts without manual chunking.
            </p>
            <div className="actions" aria-label="Contact options">
              <a className="button primary" href={`mailto:${contactEmail}`}>
                Email founder
              </a>
              <a className="button secondary" href="#status">
                Current status
              </a>
            </div>
          </div>

          <div className="signal-panel" aria-label="Development status summary">
            <div className="timeline">
              <div>
                <span className="dot complete" aria-hidden="true" />
                <p className="label">Domain</p>
                <p className="value">orpheusnarration.com</p>
              </div>
              <div>
                <span className="dot active" aria-hidden="true" />
                <p className="label">Provider rights</p>
                <p className="value">Supplier confirmation in progress</p>
              </div>
              <div>
                <span className="dot pending" aria-hidden="true" />
                <p className="label">Public access</p>
                <p className="value">Not yet self-serve</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="status" className="status-band" aria-labelledby="status-title">
        <div>
          <p className="section-kicker">Current status</p>
          <h2 id="status-title">Commercial rights before catalog exposure.</h2>
        </div>
        <div className="status-copy">
          <p>
            We are evaluating provider rights and commercial terms before
            exposing platform voices to users.
          </p>
          <p>
            The first product promise is stable long-form educational narration;
            public pricing, voice catalog access, and self-serve generation will
            follow only after the provider and usage boundaries are cleared.
          </p>
        </div>
      </section>

      <footer className="footer">
        <span>Orpheus Narration</span>
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      </footer>
    </main>
  );
}
