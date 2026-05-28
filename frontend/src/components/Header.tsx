import React from 'react'

export function Header({ view, setView, user, onLogout }: any) {
  return (
    <header className="container site-header">
      <div className="brand">
        <div className="logo">OS</div>
        <div>
          <p className="brand-title">Options School</p>
          <p className="brand-subtitle">Learn options selling — basic to advanced</p>
        </div>
      </div>

      <nav className="nav">
        <button className={view === 'home' ? 'active' : ''} onClick={() => setView('home')}>Home</button>
        <button className={view === 'lessons' ? 'active' : ''} onClick={() => setView('lessons')}>Lessons</button>
        {user ? (
          <>
            <button className={view === 'dashboard' ? 'active' : ''} onClick={() => setView('dashboard')}>Dashboard</button>
            <button className="button secondary" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button className={view === 'login' ? 'active' : ''} onClick={() => setView('login')}>Login</button>
        )}
      </nav>
    </header>
  )
}
