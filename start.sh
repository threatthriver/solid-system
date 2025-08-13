#!/bin/bash

# DevAccel-Meter Start Script

echo "Starting DevAccel-Meter..."

# Start the Node.js server in the background
echo "Starting Node.js server..."
node server.js &

# Give the server a moment to start
sleep 3

# Start the Streamlit app
echo "Starting Streamlit dashboard..."
streamlit run streamlit_app.py

# When Streamlit is closed, kill the Node.js server
kill %1