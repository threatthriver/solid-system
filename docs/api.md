# API Documentation

This document provides detailed information about the Solid System API endpoints.

## Base URL

All API endpoints are relative to the base URL: `http://localhost:3000/api`

## Authentication

Most endpoints do not require authentication. However, the `/api/analyze-repo` endpoint requires a GitHub token to be set in the environment variables.

## Endpoints

### GET /metrics

Retrieve current metrics for the dashboard.

**Response:**
```json
{
  "suggestionsAccepted": 42,
  "prsAccelerated": 5,
  "hoursSaved": 6
}
```

**Response Fields:**
- `suggestionsAccepted`: Number of AI suggestions accepted
- `prsAccelerated`: Number of PRs merged faster than average
- `hoursSaved`: Estimated time saved in hours

### POST /suggestions

Add AI suggestions data.

**Request Body:**
```json
{
  "repoId": "repository-identifier",
  "count": 10
}
```

**Request Fields:**
- `repoId`: String identifier for the repository
- `count`: Number of suggestions accepted

**Response:**
```json
{
  "success": true
}
```

### POST /pr-times

Add PR time metrics.

**Request Body:**
```json
{
  "repoId": "repository-identifier",
  "prNumber": 42,
  "timeToMerge": 120,
  "isAccelerated": true
}
```

**Request Fields:**
- `repoId`: String identifier for the repository
- `prNumber`: Pull request number
- `timeToMerge`: Time to merge in minutes
- `isAccelerated`: Boolean indicating if PR was merged faster than average

**Response:**
```json
{
  "success": true
}
```

### POST /analyze-repo

Trigger analysis of a GitHub repository (requires GitHub integration).

**Request Body:**
```json
{
  "owner": "github-username",
  "repo": "repository-name"
}
```

**Request Fields:**
- `owner`: GitHub username or organization name
- `repo`: Repository name

**Response:**
```json
{
  "success": true,
  "result": {
    "suggestionsCount": 25,
    "acceleratedPRs": 3
  }
}
```

### GET /export/csv

Export current metrics as CSV.

**Response:**
```
Metric,Value,Timestamp
AI Suggestions Accepted,42,2023-01-01T00:00:00.000Z
PRs Accelerated,5,2023-01-01T00:00:00.000Z
Hours Saved,6,2023-01-01T00:00:00.000Z
```

### GET /export/slack

Get current metrics formatted for Slack.

**Response:**
```json
{
  "text": "Solid System Weekly Report",
  "attachments": [
    {
      "color": "good",
      "fields": [
        {
          "title": "AI Suggestions Accepted",
          "value": 42,
          "short": true
        },
        {
          "title": "PRs Accelerated",
          "value": 5,
          "short": true
        },
        {
          "title": "Hours Saved",
          "value": 6,
          "short": true
        }
      ]
    }
  ]
}
```