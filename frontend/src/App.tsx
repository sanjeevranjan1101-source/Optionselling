import React, { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'
import { OptionList } from './components/OptionList'
import { OptionForm } from './components/OptionForm'
import { getOptions } from './api'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './components/Home'
import { Lessons } from './components/Lessons'
import './styles.css'

function AppContent() {
  const { user, token, logout } = useAuth()
  const [options, setOptions] = useState<any[]>([])
  const [view, setView] = useState<'home' | 'login' | 'register' | 'dashboard' | 'lessons'>('home')
  const [editing, setEditing] = useState<any | null>(null)
  const [showForm, setShowForm] = useState(false)

  const fetchOptions = async () => {
    if (!token) return
    try {
      const data = await getOptions(token)
      setOptions(data)
    } catch (err) {
      console.error('Failed to load options', err)
    }
  }

  useEffect(() => {
    if (token) {
      setView('dashboard')
      fetchOptions()
    }
  }, [token])

  // layout header + pages
  if (!user || !token) {
    return (
      <div>
        <Header view={view} setView={setView} user={user} onLogout={() => {}} />
        {view === 'home' && <Home />}
        {view === 'lessons' && <Lessons />}

        <div className="container" style={{ paddingTop: 12 }}>
          {view === 'login' && <div className="card" style={{ maxWidth: 720 }}><LoginForm /></div>}
          {view === 'register' && <div className="card" style={{ maxWidth: 720 }}><RegisterForm /></div>}
          {(view !== 'login' && view !== 'register') && (
            <div style={{ marginTop: 12 }}>
              <div className="muted">Please login or register to access your dashboard.</div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    )
  }

  const handleEdit = (item: any) => {
    setEditing(item)
    setShowForm(true)
  }

  const handleCreate = () => {
    setEditing(null)
    setShowForm(true)
  }

  const handleSaved = (item: any) => {
    setShowForm(false)
    setEditing(null)
    fetchOptions()
  }

  return (
    <div>
      <Header view={view} setView={setView} user={user} onLogout={logout} />

      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          <div className="dashboard-actions">
            <button className="cta" onClick={handleCreate}>New Listing</button>
          </div>
        </div>

        {showForm && token && (
          <div style={{ marginTop: 16 }} className="card">
            <OptionForm token={token} initial={editing} onSaved={handleSaved} onCancel={() => setShowForm(false)} />
          </div>
        )}

        <h2 style={{ marginTop: 18 }}>Your Option Listings ({options.length})</h2>
        {token && <OptionList items={options} token={token} onEdit={handleEdit} onDeleted={fetchOptions} />}
      </div>

      <Footer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
