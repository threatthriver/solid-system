const express = require('express');
const Database = require('../database');
const GitHubWorker = require('../github/worker');
const { exportAsCSV, formatForSlack } = require('../utils/exporter');

// Initialize GitHub worker (will be enabled when token is provided)
let githubWorker = null;
const githubToken = process.env.GITHUB_TOKEN;
if (githubToken) {
  githubWorker = new GitHubWorker(githubToken);
}

const router = express.Router();

// GET /api/metrics - Retrieve current metrics for the dashboard
router.get('/metrics', (req, res) => {
  Database.getMetrics((err, metrics) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch metrics' });
    } else {
      res.json(metrics);
    }
  });
});

// POST /api/suggestions - Add AI suggestions data
router.post('/suggestions', (req, res) => {
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

// POST /api/pr-times - Add PR time metrics
router.post('/pr-times', (req, res) => {
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

// POST /api/analyze-repo - Trigger GitHub repository analysis
router.post('/analyze-repo', async (req, res) => {
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

// GET /api/export/csv - Export data as CSV
router.get('/export/csv', (req, res) => {
  exportAsCSV((err, csvString) => {
    if (err) {
      res.status(500).json({ error: 'Failed to export data as CSV' });
      return;
    }
    
    res.header('Content-Type', 'text/csv');
    res.attachment('solid-system-data.csv');
    res.send(csvString);
  });
});

// GET /api/export/slack - Get formatted data for Slack
router.get('/export/slack', (req, res) => {
  Database.getMetrics((err, metrics) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch metrics' });
      return;
    }
    
    const slackFormat = formatForSlack(metrics);
    res.json(slackFormat);
  });
});

module.exports = router;