// test/database.test.js
const Database = require('../src/database');

console.log('Testing Solid System database operations...');

// Test adding suggestions
Database.addSuggestions('test-repo-1', 25, (err, id) => {
  if (err) {
    console.error('Error adding suggestions:', err);
  } else {
    console.log('Successfully added suggestions with ID:', id);
  }
});

// Test adding PR time
Database.addPrTime('test-repo-1', 42, 120, true, (err, id) => {
  if (err) {
    console.error('Error adding PR time:', err);
  } else {
    console.log('Successfully added PR time with ID:', id);
  }
});

// Test adding test results
Database.addTestResults('test-repo-1', 95.5, (err, id) => {
  if (err) {
    console.error('Error adding test results:', err);
  } else {
    console.log('Successfully added test results with ID:', id);
  }
});

// Retrieve metrics after a short delay
setTimeout(() => {
  Database.getMetrics((err, metrics) => {
    if (err) {
      console.error('Error getting metrics:', err);
    } else {
      console.log('Current metrics:', metrics);
      console.log('Database tests completed successfully!');
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
}, 1000);