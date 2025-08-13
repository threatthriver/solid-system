#!/bin/bash

# DevAccel-Meter Demo Script

echo "🚀 DevAccel-Meter Demo Script"
echo "============================"
echo ""

# Check if required tools are installed
echo "Checking prerequisites..."

if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

if ! command -v python3 &> /dev/null
then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

echo "✅ All prerequisites are installed"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install > /dev/null 2>&1
pip install -r requirements.txt > /dev/null 2>&1
echo "✅ Dependencies installed"
echo ""

# Initialize database with sample data
echo "Initializing database with sample data..."
npm run init-db > /dev/null 2>&1
echo "✅ Database initialized"
echo ""

# Start the server in the background
echo "Starting DevAccel-Meter server..."
node server.js > server.log 2>&1 &
SERVER_PID=$!
sleep 3

# Check if server started successfully
if ps -p $SERVER_PID > /dev/null
then
    echo "✅ Server started successfully (PID: $SERVER_PID)"
else
    echo "❌ Failed to start server"
    exit 1
fi

echo ""
echo "=========================================="
echo "DevAccel-Meter is now running!"
echo ""
echo "🔹 Simple Dashboard: http://localhost:3000"
echo "🔹 Streamlit Dashboard: http://localhost:8501"
echo ""
echo "To stop the demo, press Ctrl+C"
echo "=========================================="
echo ""

# Wait for user to stop the demo
trap "kill $SERVER_PID; echo 'Demo stopped'; exit" INT
wait $SERVER_PID