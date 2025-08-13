const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Ensure the database file exists
const dbPath = path.join(__dirname, 'devaccel.db');
const dbExists = fs.existsSync(dbPath);

// Initialize the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the devaccel database.');
  }
});

// Create tables if they don't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS suggestions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    repo_id TEXT NOT NULL,
    suggestion_count INTEGER DEFAULT 0,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS pr_times (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    repo_id TEXT NOT NULL,
    pr_number INTEGER NOT NULL,
    time_to_merge INTEGER, -- in minutes
    is_accelerated BOOLEAN DEFAULT FALSE,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS test_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    repo_id TEXT NOT NULL,
    test_pass_rate REAL, -- percentage
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Functions to interact with the database
const Database = {
  // Add accepted suggestions
  addSuggestions: (repoId, count, callback) => {
    const stmt = db.prepare('INSERT INTO suggestions (repo_id, suggestion_count) VALUES (?, ?)');
    stmt.run(repoId, count, function(err) {
      if (err) {
        console.error('Error inserting suggestions:', err.message);
        callback(err);
      } else {
        callback(null, this.lastID);
      }
    });
    stmt.finalize();
  },
  
  // Add PR time metrics
  addPrTime: (repoId, prNumber, timeToMerge, isAccelerated, callback) => {
    const stmt = db.prepare('INSERT INTO pr_times (repo_id, pr_number, time_to_merge, is_accelerated) VALUES (?, ?, ?, ?)');
    stmt.run(repoId, prNumber, timeToMerge, isAccelerated ? 1 : 0, function(err) {
      if (err) {
        console.error('Error inserting PR time:', err.message);
        callback(err);
      } else {
        callback(null, this.lastID);
      }
    });
    stmt.finalize();
  },
  
  // Add test results
  addTestResults: (repoId, passRate, callback) => {
    const stmt = db.prepare('INSERT INTO test_results (repo_id, test_pass_rate) VALUES (?, ?)');
    stmt.run(repoId, passRate, function(err) {
      if (err) {
        console.error('Error inserting test results:', err.message);
        callback(err);
      } else {
        callback(null, this.lastID);
      }
    });
    stmt.finalize();
  },
  
  // Get metrics for dashboard
  getMetrics: (callback) => {
    const metrics = {
      suggestionsAccepted: 0,
      prsAccelerated: 0,
      hoursSaved: 0
    };
    
    // Get total suggestions
    db.get('SELECT SUM(suggestion_count) as total FROM suggestions', (err, row) => {
      if (err) {
        console.error('Error fetching suggestions:', err.message);
        return callback(err);
      }
      
      if (row && row.total) {
        metrics.suggestionsAccepted = row.total;
        // Estimate 5 minutes saved per suggestion
        metrics.hoursSaved = Math.round((row.total * 5) / 60);
      }
      
      // Get accelerated PRs
      db.get('SELECT COUNT(*) as count FROM pr_times WHERE is_accelerated = 1', (err, row) => {
        if (err) {
          console.error('Error fetching accelerated PRs:', err.message);
          return callback(err);
        }
        
        if (row) {
          metrics.prsAccelerated = row.count;
          // Add 30 minutes saved per accelerated PR
          metrics.hoursSaved += Math.round((row.count * 30) / 60);
        }
        
        callback(null, metrics);
      });
    });
  },
  
  // Close the database connection
  close: (callback) => {
    db.close(callback);
  }
};

module.exports = Database;