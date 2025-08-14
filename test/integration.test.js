// test/integration.test.js
const Database = require('../src/database');

console.log('Running integration tests for Solid System...');

// Test the database operations
Database.addSuggestions('test-repo-1', 10, (err, id) => {
  if (err) {
    console.error('Error adding suggestions:', err);
  } else {
    console.log('Successfully added suggestions with ID:', id);
  }
  
  // Test getting metrics
  Database.getMetrics((err, metrics) => {
    if (err) {
      console.error('Error getting metrics:', err);
    } else {
      console.log('Current metrics:', metrics);
      console.log('Integration tests completed successfully!');
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
});