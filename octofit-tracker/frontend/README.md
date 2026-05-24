# OctoFit Tracker Frontend

This presentation tier uses React 19, Vite, Bootstrap, and react-router-dom.

## Environment variables

Define `VITE_CODESPACE_NAME` for GitHub Codespaces API access.

Example `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, the UI targets API endpoints like:

- `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
- `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
- `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
- `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
- `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`

If `VITE_CODESPACE_NAME` is unset, the frontend safely falls back to:

- `http://localhost:8000/api/...`

This prevents invalid URLs such as `https://undefined-8000.app.github.dev/...`.
