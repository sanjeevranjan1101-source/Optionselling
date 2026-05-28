import React, { useState, useEffect } from 'react'
import { OptionItem, createOption, updateOption } from '../api'

export function OptionForm({ token, initial, onSaved, onCancel }: { token: string; initial?: OptionItem; onSaved: (item: any) => void; onCancel?: () => void }) {
  const [ticker, setTicker] = useState(initial?.ticker || '')
  const [strategy, setStrategy] = useState(initial?.strategy || '')
  const [premium, setPremium] = useState(initial?.premium?.toString() || '')
  const [expiry, setExpiry] = useState(initial?.expiry || '')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTicker(initial?.ticker || '')
    setStrategy(initial?.strategy || '')
    setPremium(initial?.premium?.toString() || '')
    setExpiry(initial?.expiry || '')
  }, [initial])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data: OptionItem = { ticker, strategy, premium: parseFloat(premium), expiry }
      let saved
      if (initial?.id) {
        saved = await updateOption(token, initial.id as number, data)
      } else {
        saved = await createOption(token, data)
      }
      onSaved(saved)
    } catch (err: any) {
      alert(err.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '480px' }}>
      <input placeholder="Ticker" value={ticker} onChange={e => setTicker(e.target.value)} required />
      <input placeholder="Strategy" value={strategy} onChange={e => setStrategy(e.target.value)} required />
      <input placeholder="Premium" type="number" step="0.0001" value={premium} onChange={e => setPremium(e.target.value)} required />
      <input placeholder="Expiry (YYYY-MM-DD)" value={expiry} onChange={e => setExpiry(e.target.value)} required />
      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}
