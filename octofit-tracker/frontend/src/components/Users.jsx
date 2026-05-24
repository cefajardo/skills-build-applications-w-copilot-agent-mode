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

export default function Users() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/'
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadUsers() {
      try {
        setError('')
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setUsers(normalizeListPayload(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users')
      }
    }

    loadUsers()
  }, [endpoint])

  return (
    <section>
      <h2>Users</h2>
      <p className="text-muted mb-3">API endpoint: {endpoint}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="list-group">
        {users.map((user) => (
          <article className="list-group-item" key={user._id || user.id || user.email}>
            <h3 className="h6 mb-1">{user.name || user.username || 'User'}</h3>
            <p className="mb-0 text-muted">{user.email || 'No email available'}</p>
          </article>
        ))}
        {!users.length && !error && (
          <p className="list-group-item text-muted mb-0">No users available.</p>
        )}
      </div>
    </section>
  )
}