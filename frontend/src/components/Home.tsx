import React from 'react'

export function Home() {
  return (
    <div className="container">
      <section className="hero">
        <div className="hero-copy">
          <h1>Options selling education — practical, structured, professional.</h1>
          <p>
            Master income-focused option strategies from the fundamentals to advanced portfolio techniques.
            Build confidence with real-world examples, trade rules, risk controls, and position management.
          </p>
          <div className="button-group">
            <button className="button primary cta">Start Learning</button>
            <button className="button secondary">View Curriculum</button>
          </div>
        </div>

        <div className="hero-card">
          <h3>What you'll learn</h3>
          <ul className="muted">
            <li>Options mechanics: calls, puts, Greeks, and pricing drivers</li>
            <li>Income strategies: covered calls, cash-secured puts, and credit spreads</li>
            <li>Advanced trade design: condors, iron butterflies, and multi-leg management</li>
            <li>Risk-first discipline: sizing, exits, adjustment plans, and journaling</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>Why Options School?</h2>
        </div>
        <p className="section-text">
          Designed for serious traders, this curriculum walks you through the option selling lifecycle:
          idea selection, trade construction, premium capture, and disciplined risk management.
          Lessons are organized so you can begin at the basics and progress into complex income strategies.
        </p>

        <div className="cards-row">
          <div className="feature-card">
            <h3>Clear foundations</h3>
            <p className="muted">Learn the language of options with payoff diagrams, volatility concepts, and the Greeks.</p>
          </div>
          <div className="feature-card">
            <h3>Income-focused strategies</h3>
            <p className="muted">Cover calls, sell puts, and structure defined-risk spreads with confidence.</p>
          </div>
          <div className="feature-card">
            <h3>Professional trade rules</h3>
            <p className="muted">Apply risk controls, defined exits, and portfolio sizing best practices.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>Core curriculum</h2>
        </div>
        <div className="grid">
          <div className="topic-card">
            <div className="lesson-title">Foundation</div>
            <p className="muted">Calls, puts, payoff diagrams, option pricing, and the mechanics of premium.</p>
          </div>
          <div className="topic-card">
            <div className="lesson-title">Income strategies</div>
            <p className="muted">Covered calls, cash-secured puts, credit spreads, and defined-risk trades.</p>
          </div>
          <div className="topic-card">
            <div className="lesson-title">Trade management</div>
            <p className="muted">Adjustment planning, risk limits, rollouts, and discipline for consistent results.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="stat-grid">
          <div className="stat-card">
            <strong>3 learning levels</strong>
            <div className="muted">Basic, intermediate, and advanced options selling.</div>
          </div>
          <div className="stat-card">
            <strong>15+ lessons</strong>
            <div className="muted">Structured modules with practical examples and step-by-step guidance.</div>
          </div>
          <div className="stat-card">
            <strong>Real-world focus</strong>
            <div className="muted">Trade-ready frameworks, risk controls, and repeatable decision criteria.</div>
          </div>
        </div>
      </section>
    </div>
  )
}
