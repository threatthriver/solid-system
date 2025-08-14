// test/index.js
const Database = require('../src/database');

console.log('Testing Solid System components...');

// Test database functions
console.log('Testing database operations...');

// Add some test data
Database.addSuggestions('test-repo-1', 25, (err) => {
  if (err) {
    console.error('Error adding suggestions:', err);
  } else {
    console.log('Successfully added suggestions');
  }
});

Database.addPrTime('test-repo-1', 42, 120, true, (err) => {
  if (err) {
    console.error('Error adding PR time:', err);
  } else {
    console.log('Successfully added PR time');
  }
});

// Retrieve metrics
setTimeout(() => {
  Database.getMetrics((err, metrics) => {
    if (err) {
      console.error('Error getting metrics:', err);
    } else {
      console.log('Current metrics:', metrics);
      console.log('Test completed successfully!');
    }
  });
}, 1000);