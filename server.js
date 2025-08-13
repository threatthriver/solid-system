const express = require('express');
const path = require('path');
const Database = require('./database');
const MetricsWorker = require('./worker');
const DataExporter = require('./exporter');
const config = require('./config');
const app = express();
const PORT = config.port;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Initialize GitHub worker (will be enabled when token is provided)
let githubWorker = null;
const githubToken = process.env.GITHUB_TOKEN;
if (githubToken) {
  githubWorker = new MetricsWorker(githubToken);
  console.log('GitHub integration enabled');
} else {
  console.log('GitHub integration disabled (no token provided)');
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/metrics', (req, res) => {
  Database.getMetrics((err, metrics) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch metrics' });
    } else {
      res.json(metrics);
    }
  });
});

// API endpoint to add suggestions data
app.post('/api/suggestions', (req, res) => {
  const { repoId, count } = req.body;
  if (!repoId || count === undefined) {
    return res.status(400).json({ error: 'repoId and count are required' });
  }
  
  Database.addSuggestions(repoId, count, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add suggestions data' });
    } else {
      res.json({ success: true });
    }
  });
});

// API endpoint to add PR time data
app.post('/api/pr-times', (req, res) => {
  const { repoId, prNumber, timeToMerge, isAccelerated } = req.body;
  if (!repoId || !prNumber || timeToMerge === undefined) {
    return res.status(400).json({ error: 'repoId, prNumber, and timeToMerge are required' });
  }
  
  Database.addPrTime(repoId, prNumber, timeToMerge, isAccelerated, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add PR time data' });
    } else {
      res.json({ success: true });
    }
  });
});

// API endpoint to trigger GitHub repository analysis
app.post('/api/analyze-repo', async (req, res) => {
  if (!githubWorker) {
    return res.status(500).json({ error: 'GitHub integration is not enabled' });
  }
  
  const { owner, repo } = req.body;
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }
  
  try {
    const result = await githubWorker.analyzeRepository(owner, repo);
    res.json({
      success: true,
      result
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze repository', details: error.message });
  }
});

// API endpoint to export data as CSV
app.get('/api/export/csv', (req, res) => {
  DataExporter.exportAsCSV((err, csvString) => {
    if (err) {
      res.status(500).json({ error: 'Failed to export data as CSV' });
      return;
    }
    
    res.header('Content-Type', 'text/csv');
    res.attachment('devaccel-meter-data.csv');
    res.send(csvString);
  });
});

// API endpoint to get formatted data for Slack
app.get('/api/export/slack', (req, res) => {
  Database.getMetrics((err, metrics) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch metrics' });
      return;
    }
    
    const slackFormat = DataExporter.formatForSlack(metrics);
    res.json(slackFormat);
  });
});

app.listen(PORT, () => {
  console.log(`DevAccel-Meter server running on port ${PORT}`);
});