#!/bin/bash

# DevAccel-Meter Installation Script

echo "Installing DevAccel-Meter..."

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    echo "# GitHub Personal Access Token (optional)" > .env
    echo "# GITHUB_TOKEN=your_github_token_here" >> .env
    echo "" >> .env
    echo "# Server Port (optional, defaults to 3000)" >> .env
    echo "# PORT=3000" >> .env
fi

echo "Installation complete!"
echo ""
echo "To start the application:"
echo "  npm start"
echo ""
echo "To start the application in development mode:"
echo "  npm run dev"
echo ""
echo "For GitHub integration, add your GitHub token to the .env file"