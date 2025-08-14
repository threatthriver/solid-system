# Solid System

A solid system for measuring AI coding tool impact on developer productivity

[![GitHub stars](https://img.shields.io/github/stars/threatthriver/solid-system?style=social)](https://github.com/threatthriver/solid-system/stargazers)

Solid System is a comprehensive platform that measures the impact of AI coding tools (like GitHub Copilot or Cursor) on developer productivity. It tracks metrics such as the number of AI suggestions accepted, test pass rates, and PR review times, presenting "hours saved" estimates in detailed reports.

## Why Solid System?

As AI coding tools become increasingly prevalent in development workflows, teams need a reliable way to measure their actual impact on productivity. Solid System provides the metrics and insights needed to:

- Quantify time savings from AI assistance
- Justify investment in AI coding tools
- Optimize development workflows
- Demonstrate ROI to stakeholders

## Features

- **AI Suggestion Tracking**: Monitor how many code suggestions from AI tools are accepted by developers
- **PR Time Metrics**: Measure the time from PR creation to merge, comparing AI-assisted PRs to historical baselines
- **Time Savings Calculation**: Generate reports summarizing "hours saved" based on predefined heuristics
- **Multiple Dashboard Options**: Choose between a simple HTML dashboard or a rich Streamlit visualization
- **Data Export**: Export metrics as CSV or integrate with Slack for team visibility
- **GitHub Integration**: Automatically analyze repositories for AI-assisted development patterns

## Quick Demo

Run the complete demo with one command:

```bash
npm run demo
```

This will:
1. Install all dependencies
2. Initialize the database with sample data
3. Start the server
4. Provide links to both dashboards

## Manual Setup

1. **Install dependencies:**
   ```bash
   npm install
   pip install -r requirements.txt
   ```

2. **Initialize database with sample data:**
   ```bash
   npm run init-db
   ```

3. **Start the application:**
   ```bash
   npm run start-all
   ```
   Or start components separately:
   ```bash
   # Terminal 1
   npm start
   
   # Terminal 2
   streamlit run src/dashboard/streamlit_app.py
   ```

## Project Structure

```
solid-system/
├── src/                   # Source code
│   ├── server/            # Express server and API routes
│   ├── database/          # Database operations
│   ├── github/            # GitHub integration
│   ├── utils/             # Utility functions
│   ├── config/            # Configuration files
│   └── dashboard/         # Streamlit dashboard
├── public/                # Static files for web dashboard
├── test/                  # Test files
├── scripts/               # Utility scripts
├── data/                  # Database files (created on first run)
├── package.json           # Node.js dependencies and scripts
├── requirements.txt       # Python dependencies
├── README.md              # This file
└── LICENSE                # MIT License
```

## Tech Stack

- **Backend**: Node.js with Express for REST API
- **Data Storage**: SQLite for lightweight, file-based storage
- **GitHub Integration**: @octokit/rest library for GitHub API access
- **Frontend/Dashboard**: 
  - Minimal web UI (HTML/CSS/JS) for simple reports
  - Streamlit dashboard for rich data visualization
- **Database**: SQLite with a well-defined schema for metrics storage

## API Endpoints

### GET /api/metrics
Retrieve current metrics for the dashboard.

### POST /api/suggestions
Add AI suggestions data.

Body:
```json
{
  "repoId": "repository-identifier",
  "count": 10
}
```

### POST /api/pr-times
Add PR time metrics.

Body:
```json
{
  "repoId": "repository-identifier",
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
  "owner": "github-username",
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

These values can be adjusted in `src/config/index.js`.

## Configuration

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

## Development

To run in development mode with auto-reload:

```bash
npm run dev
```

To run tests:

```bash
npm test
```

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests if applicable
5. Submit a pull request

Check out our [good first issues](https://github.com/threatthriver/solid-system/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) to get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape Solid System
- Inspired by the need for better metrics in AI-assisted development