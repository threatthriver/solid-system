// src/utils/exporter.js
const Database = require('../database');

// Export metrics as CSV
function exportAsCSV(callback) {
  const csvRows = [];
  
  // Add header row
  csvRows.push('Metric,Value,Timestamp');
  
  // Get current timestamp
  const timestamp = new Date().toISOString();
  
  // Get metrics from database
  Database.getMetrics((err, metrics) => {
    if (err) {
      callback(err, null);
      return;
    }
    
    // Add metrics to CSV
    csvRows.push(`AI Suggestions Accepted,${metrics.suggestionsAccepted},${timestamp}`);
    csvRows.push(`PRs Accelerated,${metrics.prsAccelerated},${timestamp}`);
    csvRows.push(`Hours Saved,${metrics.hoursSaved},${timestamp}`);
    
    // Join rows with newlines
    const csvString = csvRows.join('\n');
    callback(null, csvString);
  });
}

// Format metrics for Slack
function formatForSlack(metrics) {
  return {
    text: "Solid System Weekly Report",
    attachments: [
      {
        color: "good",
        fields: [
          {
            title: "AI Suggestions Accepted",
            value: metrics.suggestionsAccepted,
            short: true
          },
          {
            title: "PRs Accelerated",
            value: metrics.prsAccelerated,
            short: true
          },
          {
            title: "Hours Saved",
            value: metrics.hoursSaved,
            short: true
          }
        ]
      }
    ]
  };
}

module.exports = {
  exportAsCSV,
  formatForSlack
};