# DevAccel-Meter Documentation

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Application**
   ```bash
   npm start
   ```

3. **Access the Dashboard**
   Open your browser to http://localhost:3000

## GitHub Integration Setup

To enable GitHub integration for automatic metrics collection:

1. Create a GitHub Personal Access Token:
   - Go to GitHub Settings > Developer Settings > Personal Access Tokens
   - Generate a new token with `repo` permissions

2. Set the token as an environment variable:
   ```bash
   export GITHUB_TOKEN=your_github_token_here
   ```

3. Restart the application

## API Endpoints

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

## Data Model

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

## Time Savings Calculation

The application estimates time savings using these heuristics:
- Each AI suggestion accepted = 5 minutes saved
- Each accelerated PR (merged in <24 hours) = 30 minutes saved

These values can be adjusted in `config.js`.