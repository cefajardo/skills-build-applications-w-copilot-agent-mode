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

export default function Activities() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadActivities() {
      try {
        setError('')
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setActivities(normalizeListPayload(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activities')
      }
    }

    loadActivities()
  }, [endpoint])

  return (
    <section>
      <h2>Activities</h2>
      <p className="text-muted mb-3">API endpoint: {endpoint}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {activities.map((activity) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={activity._id || activity.id || activity.name}
          >
            <span>{activity.name || activity.title || 'Activity'}</span>
            <span className="text-muted">{activity.duration || activity.type || '-'}</span>
          </li>
        ))}
        {!activities.length && !error && (
          <li className="list-group-item text-muted">No activities available.</li>
        )}
      </ul>
    </section>
  )
}