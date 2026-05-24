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

export default function Teams() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/'
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTeams() {
      try {
        setError('')
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setTeams(normalizeListPayload(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load teams')
      }
    }

    loadTeams()
  }, [endpoint])

  return (
    <section>
      <h2>Teams</h2>
      <p className="text-muted mb-3">API endpoint: {endpoint}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {teams.map((team) => (
          <li className="list-group-item d-flex justify-content-between" key={team._id || team.id || team.name}>
            <span>{team.name || 'Team'}</span>
            <span className="text-muted">{team.members?.length ?? team.memberCount ?? 0} members</span>
          </li>
        ))}
        {!teams.length && !error && (
          <li className="list-group-item text-muted">No teams available.</li>
        )}
      </ul>
    </section>
  )
}