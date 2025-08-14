// src/github/worker.js
const Database = require('../database');
const GitHubIntegration = require('./index');
const config = require('../config');

class MetricsWorker {
  constructor(githubToken) {
    this.github = new GitHubIntegration(githubToken);
  }

  // Analyze a repository for AI-assisted development metrics
  async analyzeRepository(owner, repo) {
    try {
      console.log(`Analyzing repository: ${owner}/${repo}`);
      
      // Get repository info
      const repository = await this.github.getRepository(owner, repo);
      const repoId = repository.id.toString();
      
      // Get pull requests
      const pullRequests = await this.github.getPullRequests(owner, repo);
      
      let suggestionsCount = 0;
      let acceleratedPRs = 0;
      
      // Analyze each PR
      for (const pr of pullRequests) {
        // Get commits for this PR
        const commits = await this.github.getPRCommits(owner, repo, pr.number);
        
        // Count AI-assisted commits
        const aiCommits = commits.filter(commit => 
          this.github.isAIAssistedCommit(commit)
        );
        
        // Add to suggestions count (estimating 10 suggestions per AI-assisted commit)
        suggestionsCount += aiCommits.length * 10;
        
        // Calculate time to merge
        const timeToMerge = this.github.calculateTimeToMerge(pr);
        
        if (timeToMerge !== null) {
          // Determine if this PR was accelerated (merged in less than 24 hours)
          const isAccelerated = timeToMerge < (24 * 60); // 24 hours in minutes
          
          if (isAccelerated) {
            acceleratedPRs++;
          }
          
          // Store PR time data
          Database.addPrTime(
            repoId, 
            pr.number, 
            timeToMerge, 
            isAccelerated, 
            (err) => {
              if (err) {
                console.error('Error storing PR data:', err);
              }
            }
          );
        }
      }
      
      // Store suggestions data
      if (suggestionsCount > 0) {
        Database.addSuggestions(repoId, suggestionsCount, (err) => {
          if (err) {
            console.error('Error storing suggestions data:', err);
          } else {
            console.log(`Added ${suggestionsCount} suggestions for ${owner}/${repo}`);
          }
        });
      }
      
      console.log(`Analysis complete for ${owner}/${repo}:`);
      console.log(`- AI suggestions: ${suggestionsCount}`);
      console.log(`- Accelerated PRs: ${acceleratedPRs}`);
      
      return {
        suggestionsCount,
        acceleratedPRs
      };
    } catch (error) {
      console.error(`Error analyzing repository ${owner}/${repo}:`, error);
      throw error;
    }
  }
  
  // Run analysis on a schedule
  startScheduledAnalysis(owner, repo, intervalMinutes = 60) {
    console.log(`Starting scheduled analysis for ${owner}/${repo} every ${intervalMinutes} minutes`);
    
    // Run immediately
    this.analyzeRepository(owner, repo);
    
    // Schedule recurring analysis
    setInterval(() => {
      this.analyzeRepository(owner, repo);
    }, intervalMinutes * 60 * 1000);
  }
}

module.exports = MetricsWorker;