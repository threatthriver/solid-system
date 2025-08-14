const express = require('express');
const path = require('path');
const Database = require('../database');
const GitHubWorker = require('../github/worker');
const { exportAsCSV, formatForSlack } = require('../utils/exporter');
const config = require('../config');

const app = express();
const PORT = config.port;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../public')));

// Initialize GitHub worker (will be enabled when token is provided)
let githubWorker = null;
const githubToken = process.env.GITHUB_TOKEN;
if (githubToken) {
  githubWorker = new GitHubWorker(githubToken);
  console.log('GitHub integration enabled');
} else {
  console.log('GitHub integration disabled (no token provided)');
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// API Routes
app.use('/api', require('./routes'));

// Start server
app.listen(PORT, () => {
  console.log(`Solid System server running on port ${PORT}`);
});

module.exports = app;