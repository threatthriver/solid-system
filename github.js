// github.js
const { Octokit } = require("@octokit/rest");

class GitHubIntegration {
  constructor(token) {
    this.octokit = new Octokit({ auth: token });
  }

  // Get pull requests for a repository
  async getPullRequests(owner, repo, state = 'all') {
    try {
      const { data } = await this.octokit.pulls.list({
        owner,
        repo,
        state,
        per_page: 100
      });
      return data;
    } catch (error) {
      console.error('Error fetching pull requests:', error);
      throw error;
    }
  }

  // Get commits for a pull request
  async getPRCommits(owner, repo, pullNumber) {
    try {
      const { data } = await this.octokit.pulls.listCommits({
        owner,
        repo,
        pull_number: pullNumber
      });
      return data;
    } catch (error) {
      console.error('Error fetching PR commits:', error);
      throw error;
    }
  }

  // Get repository information
  async getRepository(owner, repo) {
    try {
      const { data } = await this.octokit.repos.get({
        owner,
        repo
      });
      return data;
    } catch (error) {
      console.error('Error fetching repository:', error);
      throw error;
    }
  }

  // Detect AI-assisted commits by looking for specific patterns
  isAIAssistedCommit(commit) {
    // Look for common AI tool signatures in commit messages
    const aiPatterns = [
      /copilot/i,
      /ai generated/i,
      /ai-assisted/i,
      /cursor/i,
      /chatgpt/i,
      /openai/i
    ];
    
    const message = commit.commit.message;
    return aiPatterns.some(pattern => pattern.test(message));
  }

  // Calculate time to merge for a PR
  calculateTimeToMerge(pr) {
    if (!pr.merged_at) return null;
    
    const created = new Date(pr.created_at);
    const merged = new Date(pr.merged_at);
    const diffInMinutes = (merged - created) / (1000 * 60);
    return Math.round(diffInMinutes);
  }
}

module.exports = GitHubIntegration;