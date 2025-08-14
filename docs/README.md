# Solid System Documentation

Welcome to the Solid System documentation. This directory contains detailed documentation for various aspects of the system.

## Table of Contents

- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Configuration Guide](#configuration-guide)
- [Deployment Guide](#deployment-guide)
- [Contributing Guide](#contributing-guide)

## API Documentation

### GET /api/metrics
Retrieve current metrics for the dashboard.

Response:
```json
{
  "suggestionsAccepted": 42,
  "prsAccelerated": 5,
  "hoursSaved": 6
}
```

### POST /api/suggestions
Add AI suggestions data.

Body:
```json
{
  "repoId": "123456",
  "count": 10
}
```

### POST /api/pr-times
Add PR time metrics.

Body:
```json
{
  "repoId": "123456",
  "prNumber": 42,
  "timeToMerge": 120,
  "isAccelerated": true
}
```

### POST /api/analyze-repo
Trigger analysis of a GitHub repository (requires GitHub integration).

Body:
```json
{
  "owner": "username",
  "repo": "repository-name"
}
```

### GET /api/export/csv
Export current metrics as CSV.

### GET /api/export/slack
Get current metrics formatted for Slack.

## Database Schema

### Suggestions Table
- `id`: Primary key
- `repo_id`: Repository identifier
- `suggestion_count`: Number of AI suggestions accepted
- `timestamp`: When the data was recorded

### PR Times Table
- `id`: Primary key
- `repo_id`: Repository identifier
- `pr_number`: Pull request number
- `time_to_merge`: Time to merge in minutes
- `is_accelerated`: Whether the PR was merged faster than average
- `timestamp`: When the data was recorded

### Test Results Table
- `id`: Primary key
- `repo_id`: Repository identifier
- `test_pass_rate`: Percentage of tests that passed
- `timestamp`: When the data was recorded

## Configuration Guide

Create a `.env` file in the root directory to configure the application:

```env
# GitHub Personal Access Token (for repository analysis)
GITHUB_TOKEN=your_github_token_here

# Server Port (defaults to 3000)
PORT=3000

# GitHub App configuration (for full GitHub App integration)
GITHUB_APP_ID=your_app_id
GITHUB_PRIVATE_KEY=your_private_key
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

## Deployment Guide

Solid System can be deployed in several ways:

### Local Development
1. Clone the repository
2. Run `npm install`
3. Run `pip install -r requirements.txt`
4. Run `npm run init-db`
5. Run `npm start`

### Production Deployment
For production deployment, consider:
1. Using a production database (PostgreSQL recommended)
2. Setting up proper environment variables
3. Using a process manager like PM2 for the Node.js server
4. Deploying the Streamlit dashboard separately or using a cloud provider

### Docker Deployment
A Dockerfile can be created for containerized deployment:

```dockerfile
# Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN pip install -r requirements.txt

EXPOSE 3000

CMD ["npm", "start"]
```

## Contributing Guide

We welcome contributions to Solid System! Here's how you can help:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests if applicable
5. Submit a pull request

Please ensure your code follows the existing style and includes appropriate documentation.