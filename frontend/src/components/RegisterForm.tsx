import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export function RegisterForm() {
  const { register, isLoading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    try {
      await register(email, password)
    } catch (err) {
      // Error is already set in context
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-panel">
      <h2>Register</h2>
      <div className="form-field">
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
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
        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div className="form-field">
        <label htmlFor="register-confirm-password">Confirm Password</label>
        <input
          id="register-confirm-password"
          className="input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      {error && <div style={{ color: 'tomato', fontSize: '12px' }}>{error}</div>}
      <button className="button primary" type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  )
}
