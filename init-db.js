// init-db.js
const Database = require('./database');

console.log('Initializing DevAccel-Meter database with sample data...');

// Sample data to insert
const sampleSuggestions = [
  ['frontend-app', 42],
  ['backend-api', 28],
  ['mobile-app', 15],
  ['docs-site', 5]
];

const samplePrTimes = [
  ['frontend-app', 101, 120, true],
  ['frontend-app', 102, 45, true],
  ['backend-api', 201, 180, false],
  ['backend-api', 202, 30, true],
  ['mobile-app', 301, 90, true],
  ['docs-site', 401, 240, false]
];

const sampleTestResults = [
  ['frontend-app', 92.5],
  ['backend-api', 88.0],
  ['mobile-app', 95.5],
  ['docs-site', 100.0]
];

// Insert sample suggestions
sampleSuggestions.forEach(([repoId, count], index) => {
  setTimeout(() => {
    Database.addSuggestions(repoId, count, (err, id) => {
      if (err) {
        console.error(`Error adding suggestions for ${repoId}:`, err);
      } else {
        console.log(`Added suggestions for ${repoId} with ID: ${id}`);
      }
    });
  }, index * 100); // Stagger the inserts
});

// Insert sample PR times
samplePrTimes.forEach(([repoId, prNumber, timeToMerge, isAccelerated], index) => {
  setTimeout(() => {
    Database.addPrTime(repoId, prNumber, timeToMerge, isAccelerated, (err, id) => {
      if (err) {
        console.error(`Error adding PR time for ${repoId}:`, err);
      } else {
        console.log(`Added PR time for ${repoId} with ID: ${id}`);
      }
    });
  }, (sampleSuggestions.length + index) * 100); // Stagger after suggestions
});

// Insert sample test results
sampleTestResults.forEach(([repoId, passRate], index) => {
  setTimeout(() => {
    Database.addTestResults(repoId, passRate, (err, id) => {
      if (err) {
        console.error(`Error adding test results for ${repoId}:`, err);
      } else {
        console.log(`Added test results for ${repoId} with ID: ${id}`);
      }
    });
  }, (sampleSuggestions.length + samplePrTimes.length + index) * 100); // Stagger after PR times
});

// Check metrics after all inserts
setTimeout(() => {
  Database.getMetrics((err, metrics) => {
    if (err) {
      console.error('Error getting metrics:', err);
    } else {
      console.log('Final metrics:', metrics);
      console.log('Database initialization completed successfully!');
    }
    
    // Close the database connection
    Database.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      } else {
        console.log('Database connection closed.');
      }
    });
  });
}, (sampleSuggestions.length + samplePrTimes.length + sampleTestResults.length) * 100 + 1000);