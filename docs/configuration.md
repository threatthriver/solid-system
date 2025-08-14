# Configuration Guide

This guide explains how to configure Solid System for your environment.

## Environment Variables

Solid System can be configured using environment variables. Create a `.env` file in the root directory of the project to set these variables.

### Required Environment Variables

None of the environment variables are strictly required, but some are needed for specific features.

### Optional Environment Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `PORT` | Port for the web server | `3000` |
| `GITHUB_TOKEN` | GitHub Personal Access Token for repository analysis | `null` |
| `GITHUB_APP_ID` | GitHub App ID for full GitHub App integration | `your-app-id` |
| `GITHUB_PRIVATE_KEY` | Private key for GitHub App | `your-private-key` |
| `GITHUB_CLIENT_ID` | Client ID for GitHub App | `your-client-id` |
| `GITHUB_CLIENT_SECRET` | Client Secret for GitHub App | `your-client-secret` |

## GitHub Integration

To enable GitHub integration for automatic metrics collection:

1. Create a GitHub Personal Access Token:
   - Go to GitHub Settings > Developer Settings > Personal Access Tokens
   - Generate a new token with `repo` permissions

2. Set the token as an environment variable:
   ```bash
   export GITHUB_TOKEN=your_github_token_here
   ```

3. Restart the application

## Database Configuration

The database configuration is handled in `src/config/index.js`. By default, Solid System uses SQLite for simplicity, but you can modify the configuration to use other databases.

### SQLite Configuration

```javascript
database: {
  filename: './data/solid-system.db'
}
```

### PostgreSQL Configuration (Example)

To use PostgreSQL instead of SQLite, you would need to:

1. Install the `pg` package:
   ```bash
   npm install pg
   ```

2. Update the database configuration:
   ```javascript
   database: {
     host: 'localhost',
     port: 5432,
     database: 'solid_system',
     username: 'your_username',
     password: 'your_password'
   }
   ```

3. Update the database implementation in `src/database/index.js` to use PostgreSQL instead of SQLite.

## Time Savings Calculation

The time savings calculation parameters can be adjusted in `src/config/index.js`:

```javascript
timeSaved: {
  perSuggestion: 5, // minutes
  perAcceleratedPR: 30 // minutes
}
```

These values represent the estimated time saved per AI suggestion accepted and per accelerated PR merged.

## Customizing the Heuristics

You can customize the heuristics used to determine if a PR is "accelerated" by modifying the logic in `src/github/worker.js`. By default, a PR is considered accelerated if it's merged in less than 24 hours.