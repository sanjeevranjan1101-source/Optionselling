export type OptionItem = {
  id?: number
  ticker: string
  strategy: string
  premium: number
  expiry: string
}

export async function getOptions(token: string | null) {
  const res = await fetch('/api/options', {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  })
  if (!res.ok) throw new Error('Failed to fetch options')
  return res.json()
}

export async function createOption(token: string, data: OptionItem) {
  const res = await fetch('/api/options', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to create option')
  return res.json()
}

export async function updateOption(token: string, id: number, data: OptionItem) {
  const res = await fetch(`/api/options/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update option')
  return res.json()
}

export async function deleteOption(token: string, id: number) {
  const res = await fetch(`/api/options/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to delete option')
  return res.json()
}
