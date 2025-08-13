// config.js
module.exports = {
  // Default port for the server
  port: process.env.PORT || 3000,
  
  // Default hours saved calculations
  // These can be adjusted based on your team's experience
  timeSaved: {
    perSuggestion: 5, // minutes
    perAcceleratedPR: 30 // minutes
  },
  
  // GitHub App configuration
  github: {
    // These will need to be set as environment variables in production
    appId: process.env.GITHUB_APP_ID || 'your-app-id',
    privateKey: process.env.GITHUB_PRIVATE_KEY || 'your-private-key',
    clientId: process.env.GITHUB_CLIENT_ID || 'your-client-id',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'your-client-secret'
  },
  
  // Database file location
  database: {
    filename: './devaccel.db'
  }
};