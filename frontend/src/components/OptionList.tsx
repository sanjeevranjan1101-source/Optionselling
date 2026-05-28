import React from 'react'
import { OptionItem, deleteOption } from '../api'

export function OptionList({ items, token, onEdit, onDeleted }: { items: OptionItem[]; token: string; onEdit: (it: any) => void; onDeleted: () => void }) {
  const handleDelete = async (id?: number) => {
    if (!id) return
    if (!confirm('Delete this listing?')) return
    try {
      await deleteOption(token, id)
      onDeleted()
    } catch (err: any) {
      alert(err.message || 'Delete failed')
    }
  }

  return (
    <div>
      {items.length === 0 && <div>No listings yet.</div>}
      <ul>
        {items.map((opt: any) => (
          <li key={opt.id} style={{ marginBottom: '8px' }}>
            <strong>{opt.ticker}</strong> — {opt.strategy} — ${opt.premium} — {opt.expiry}{' '}
            <button onClick={() => onEdit(opt)} style={{ marginLeft: '8px' }}>Edit</button>
            <button onClick={() => handleDelete(opt.id)} style={{ marginLeft: '6px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
