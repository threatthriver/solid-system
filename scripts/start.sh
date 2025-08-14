#!/bin/bash

# Solid System Start Script

echo "Starting Solid System..."

# Start the Node.js server in the background
echo "Starting Node.js server..."
node src/server/index.js &

# Give the server a moment to start
sleep 3

# Start the Streamlit app
echo "Starting Streamlit dashboard..."
streamlit run src/dashboard/streamlit_app.py

# When Streamlit is closed, kill the Node.js server
kill %1