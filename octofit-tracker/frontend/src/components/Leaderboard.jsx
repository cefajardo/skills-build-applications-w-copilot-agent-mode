import { useEffect, useState } from 'react'

function normalizeListPayload(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  return []
}

export default function Leaderboard() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/'
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setError('')
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setEntries(normalizeListPayload(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leaderboard')
      }
    }

    loadLeaderboard()
  }, [endpoint])

  return (
    <section>
      <h2>Leaderboard</h2>
      <p className="text-muted mb-3">API endpoint: {endpoint}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li className="list-group-item d-flex justify-content-between" key={entry._id || entry.id || entry.userId}>
            <span>{entry.username || entry.user || 'Player'}</span>
            <strong>{entry.score ?? entry.points ?? 0}</strong>
          </li>
        ))}
        {!entries.length && !error && (
          <li className="list-group-item text-muted">No leaderboard entries available.</li>
        )}
      </ol>
    </section>
  )
}