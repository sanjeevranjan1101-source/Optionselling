import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export function LoginForm() {
  const { login, isLoading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
    } catch (err) {
      // Error is already set in context
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-panel">
      <h2>Login</h2>
      <div className="form-field">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          className="input"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div className="form-field">
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      {error && <div style={{ color: 'tomato', fontSize: '12px' }}>{error}</div>}
      <button className="button primary" type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
