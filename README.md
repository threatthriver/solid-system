# Solid System

A solid system for measuring AI coding tool impact on developer productivity

[![GitHub stars](https://img.shields.io/github/stars/threatthriver/solid-system?style=social)](https://github.com/threatthriver/solid-system/stargazers)
[![License](https://img.shields.io/github/license/threatthriver/solid-system)](https://github.com/threatthriver/solid-system/blob/main/LICENSE)

Solid System is a comprehensive platform that measures the impact of AI coding tools (like GitHub Copilot or Cursor) on developer productivity. It tracks metrics such as the number of AI suggestions accepted, test pass rates, and PR review times, presenting "hours saved" estimates in detailed reports.

## Why Solid System?

As AI coding tools become increasingly prevalent in development workflows, teams need a reliable way to measure their actual impact on productivity. Solid System provides the metrics and insights needed to:

- Quantify time savings from AI assistance
- Justify investment in AI coding tools
- Optimize development workflows
- Demonstrate ROI to stakeholders

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

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- Python (version 3.7 or higher)
- pip (Python package installer)

### Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/threatthriver/solid-system.git
   cd solid-system
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize the database with sample data:**
   ```bash
   npm run init-db
   ```

5. **Start the application:**
   ```bash
   npm start
   ```

6. **Access the dashboards:**
   - Simple HTML Dashboard: http://localhost:3000
   - Streamlit Dashboard: Run separately with `streamlit run src/dashboard/streamlit_app.py`

## Usage

### Starting the Server

To start the Solid System server:

```bash
npm start
```

The server will start on port 3000 by default (http://localhost:3000).

### Starting the Streamlit Dashboard

To start the Streamlit dashboard:

```bash
streamlit run src/dashboard/streamlit_app.py
```

The Streamlit dashboard will start on port 8501 by default (http://localhost:8501).

### Running Both Components Together

To start both the server and Streamlit dashboard:

```bash
npm run start-all
```

### Adding Sample Data

To initialize the database with sample data:

```bash
npm run init-db
```

### Running Tests

To run the test suite:

```bash
npm test
```

## Features

- **AI Suggestion Tracking**: Monitor how many code suggestions from AI tools are accepted by developers
- **PR Time Metrics**: Measure the time from PR creation to merge, comparing AI-assisted PRs to historical baselines
- **Time Savings Calculation**: Generate reports summarizing "hours saved" based on predefined heuristics
- **Multiple Dashboard Options**: Choose between a simple HTML dashboard or a rich Streamlit visualization
- **Data Export**: Export metrics as CSV or integrate with Slack for team visibility
- **GitHub Integration**: Automatically analyze repositories for AI-assisted development patterns

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

Check out our [issues](https://github.com/threatthriver/solid-system/issues) to get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you need help with Solid System, you can:

1. Check the existing [issues](https://github.com/threatthriver/solid-system/issues) on GitHub
2. Open a [new issue](https://github.com/threatthriver/solid-system/issues/new) if you don't find an existing one
3. Contact the maintainers directly