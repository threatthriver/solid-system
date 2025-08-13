# DevAccel-Meter Demo Script

This script demonstrates how to use DevAccel-Meter with sample data.

## Prerequisites

1. Node.js installed
2. Python 3.7+ installed
3. Streamlit installed (`pip install streamlit`)

## Running the Demo

1. Start the server:
   ```bash
   npm start
   ```

2. In another terminal, add sample data:
   ```bash
   curl -X POST http://localhost:3000/api/suggestions -H "Content-Type: application/json" -d '{"repoId": "demo-repo-1", "count": 25}'
   
   curl -X POST http://localhost:3000/api/pr-times -H "Content-Type: application/json" -d '{"repoId": "demo-repo-1", "prNumber": 42, "timeToMerge": 120, "isAccelerated": true}'
   ```

3. Run the Streamlit dashboard:
   ```bash
   streamlit run streamlit_app.py
   ```

## Expected Results

After running the demo, you should see:

- 25 AI suggestions accepted
- 1 accelerated PR
- 3 hours saved (25 suggestions × 5 min = 125 min + 1 PR × 30 min = 30 min = 155 min = ~3 hours)

The dashboard will show these metrics in an easy-to-read format with visualizations.