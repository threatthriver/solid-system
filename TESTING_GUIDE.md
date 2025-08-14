# Solid System - Testing Guide

This guide will help you test Solid System on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or higher)
- Python (version 3.7 or higher)
- Git

## Step 1: Clone the Repository

```bash
git clone https://github.com/threatthriver/solid-system.git
cd solid-system
```

## Step 2: Install Dependencies

Install Node.js dependencies:
```bash
npm install
```

Install Python dependencies:
```bash
pip install -r requirements.txt
```

## Step 3: Initialize the Database

Initialize the database with sample data:
```bash
npm run init-db
```

You should see output similar to:
```
Initializing Solid System database with sample data...
Connected to the solid-system database.
Added suggestions for frontend-app with ID: 1
Added suggestions for backend-api with ID: 2
...
Final metrics: { suggestionsAccepted: 90, prsAccelerated: 4, hoursSaved: 12 }
Database initialization completed successfully!
```

## Step 4: Start the Server

In one terminal, start the Solid System server:
```bash
npm start
```

You should see:
```
Solid System server running on port 3000
```

## Step 5: Start the Streamlit Dashboard

In another terminal, start the Streamlit dashboard:
```bash
streamlit run src/dashboard/streamlit_app.py
```

Streamlit will provide a URL (typically http://localhost:8501) to access the dashboard.

## Step 6: Access the Dashboards

### HTML Dashboard
Open your browser and navigate to:
http://localhost:3000

You should see:
- AI Suggestions Accepted: A number greater than 0
- PRs Accelerated: A number greater than 0
- Hours Saved: A calculated number based on the formula

### Streamlit Dashboard
Open your browser and navigate to:
http://localhost:8501

You should see:
- A more detailed dashboard with metrics
- Export options
- Ability to add sample data
- Refresh button to update metrics

## Step 7: Test the API

You can also test the API directly using curl:

Get current metrics:
```bash
curl http://localhost:3000/api/metrics
```

Add sample suggestions data:
```bash
curl -X POST http://localhost:3000/api/suggestions \
  -H "Content-Type: application/json" \
  -d '{"repoId": "test-repo", "count": 5}'
```

Add sample PR time data:
```bash
curl -X POST http://localhost:3000/api/pr-times \
  -H "Content-Type: application/json" \
  -d '{"repoId": "test-repo", "prNumber": 101, "timeToMerge": 120, "isAccelerated": true}'
```

Export data as CSV:
```bash
curl http://localhost:3000/api/export/csv
```

## Step 8: Run Tests

To run the test suite:
```bash
npm test
```

To run database-specific tests:
```bash
npm run test-db
```

## Troubleshooting

### Common Issues

1. **Port already in use**: If port 3000 is already in use, you can specify a different port:
   ```bash
   PORT=3001 npm start
   ```

2. **Python dependencies not found**: Make sure you're using the correct Python/pip version:
   ```bash
   python3 -m pip install -r requirements.txt
   ```

3. **Streamlit not found**: Install Streamlit globally:
   ```bash
   pip install streamlit
   ```

4. **Database errors**: Delete the data directory and reinitialize:
   ```bash
   rm -rf data
   npm run init-db
   ```

### Verifying Installation

To verify that everything is working correctly:

1. Check that the server starts without errors
2. Verify that you can access both dashboards
3. Confirm that the API endpoints return data
4. Ensure that the tests pass

## Next Steps

Once you've verified that Solid System is working:

1. Explore the code in the `src/` directory
2. Try adding your own data through the API
3. Experiment with the GitHub integration by setting up a GitHub token
4. Modify the time savings calculations in `src/config/index.js`
5. Contribute improvements by submitting pull requests

## Need Help?

If you encounter any issues:

1. Check the [GitHub Issues](https://github.com/threatthriver/solid-system/issues)
2. Open a new issue with details about your problem
3. Include your operating system, Node.js version, and Python version