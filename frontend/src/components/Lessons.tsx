import React from 'react'

const lessons = [
  { id: 1, title: 'Options 101: Calls and Puts', level: 'Basic', summary: 'Learn the mechanics, payoff diagrams, and how option premium works.' },
  { id: 2, title: 'Covered Calls', level: 'Intermediate', summary: 'Generate recurring premium while managing stock exposure.' },
  { id: 3, title: 'Cash-Secured Puts', level: 'Intermediate', summary: 'Use cash-backed puts to acquire stock at a discount.' },
  { id: 4, title: 'Vertical Credit Spreads', level: 'Advanced', summary: 'Build defined-risk spreads for income and directional edges.' },
  { id: 5, title: 'Iron Condors', level: 'Advanced', summary: 'Structure range-bound trades with premium and defined risk.' },
  { id: 6, title: 'Trade Management', level: 'Advanced', summary: 'Plan entries, exits, adjustments, and what to do when markets move.' },
]

export function Lessons() {
  return (
    <div className="container">
      <div className="section-heading">
        <h2>Curriculum overview</h2>
      </div>
      <p className="section-text">
        A complete learning path with segmented lessons for each stage of options selling. Pick the topics
        that fit your current skill level and advance on your schedule.
      </p>
      <div className="grid" style={{ marginTop: 20 }}>
        {lessons.map((lesson) => (
          <div className="topic-card" key={lesson.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
              <div>
                <div className="lesson-title">{lesson.title}</div>
                <p className="muted">{lesson.summary}</p>
              </div>
              <div className="muted" style={{ fontSize: 12, minWidth: 72, textAlign: 'right' }}>{lesson.level}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
