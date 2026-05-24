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

export default function Workouts() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setError('')
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setWorkouts(normalizeListPayload(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load workouts')
      }
    }

    loadWorkouts()
  }, [endpoint])

  return (
    <section>
      <h2>Workouts</h2>
      <p className="text-muted mb-3">API endpoint: {endpoint}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6" key={workout._id || workout.id || workout.name}>
            <article className="card h-100">
              <div className="card-body">
                <h3 className="h6 card-title">{workout.name || 'Workout'}</h3>
                <p className="card-text mb-0 text-muted">
                  {workout.description || workout.type || 'No description available'}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
      {!workouts.length && !error && (
        <p className="text-muted mt-3 mb-0">No workouts available.</p>
      )}
    </section>
  )
}