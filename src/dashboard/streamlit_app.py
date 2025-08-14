import streamlit as st
import requests
import pandas as pd
import plotly.express as px
import time

# Set page config
st.set_page_config(
    page_title="Solid System Dashboard",
    page_icon="🚀",
    layout="wide"
)

# Title and description
st.title("🚀 Solid System Dashboard")
st.markdown("Measure the Impact of AI Coding Tools on Developer Productivity")

# Server URL (assuming it's running locally)
SERVER_URL = "http://localhost:3000"

# Function to get metrics from the Node.js server
def get_metrics():
    try:
        response = requests.get(f"{SERVER_URL}/api/metrics")
        if response.status_code == 200:
            return response.json()
        else:
            st.error(f"Error fetching metrics: {response.status_code}")
            return None
    except requests.exceptions.RequestException as e:
        st.error(f"Error connecting to server: {e}")
        return None

# Function to add sample data
def add_sample_data():
    try:
        # Add sample suggestions data
        suggestions_data = {
            "repoId": "sample-repo-1",
            "count": 15
        }
        response = requests.post(f"{SERVER_URL}/api/suggestions", json=suggestions_data)
        
        # Add sample PR data
        pr_data = {
            "repoId": "sample-repo-1",
            "prNumber": 101,
            "timeToMerge": 120,
            "isAccelerated": True
        }
        response2 = requests.post(f"{SERVER_URL}/api/pr-times", json=pr_data)
        
        return True
    except requests.exceptions.RequestException as e:
        st.error(f"Error adding sample data: {e}")
        return False

# Create columns for metrics
col1, col2, col3 = st.columns(3)

# Initialize session state for metrics
if 'metrics' not in st.session_state:
    st.session_state.metrics = {
        "suggestionsAccepted": 0,
        "prsAccelerated": 0,
        "hoursSaved": 0
    }

# Refresh metrics button
if st.button("Refresh Metrics"):
    with st.spinner("Fetching metrics..."):
        metrics = get_metrics()
        if metrics:
            st.session_state.metrics = metrics
            st.success("Metrics updated!")

# Display metrics
with col1:
    st.metric(
        label="AI Suggestions Accepted",
        value=f"{st.session_state.metrics['suggestionsAccepted']:,}",
        delta="5 min/suggestion"
    )

with col2:
    st.metric(
        label="PRs Accelerated",
        value=st.session_state.metrics['prsAccelerated'],
        delta="30 min/PR"
    )

with col3:
    st.metric(
        label="Hours Saved",
        value=f"{st.session_state.metrics['hoursSaved']:,}",
        delta="Estimated time saved"
    )

# Add sample data section
st.subheader("Add Sample Data")
if st.button("Add Sample Data"):
    with st.spinner("Adding sample data..."):
        if add_sample_data():
            st.success("Sample data added! Click 'Refresh Metrics' to see updated values.")
        else:
            st.error("Failed to add sample data.")

# Explanation of calculations
st.subheader("How Time Savings Are Calculated")
st.markdown("""
- **AI Suggestions**: Each accepted suggestion = 5 minutes saved
- **Accelerated PRs**: Each PR merged in <24 hours = 30 minutes saved
- **Total Hours Saved**: (Suggestions × 5 + Accelerated PRs × 30) / 60
""")

# Export options
st.subheader("Export Data")
col1, col2 = st.columns(2)

with col1:
    if st.button("Export as CSV"):
        try:
            response = requests.get(f"{SERVER_URL}/api/export/csv")
            if response.status_code == 200:
                st.download_button(
                    label="Download CSV",
                    data=response.content,
                    file_name="solid-system-data.csv",
                    mime="text/csv"
                )
            else:
                st.error("Failed to export data")
        except requests.exceptions.RequestException as e:
            st.error(f"Error exporting data: {e}")

with col2:
    if st.button("Get Slack Format"):
        try:
            response = requests.get(f"{SERVER_URL}/api/export/slack")
            if response.status_code == 200:
                slack_data = response.json()
                st.json(slack_data)
            else:
                st.error("Failed to get Slack format")
        except requests.exceptions.RequestException as e:
            st.error(f"Error getting Slack format: {e}")

# About section
st.sidebar.header("About Solid System")
st.sidebar.markdown("""
Solid System tracks the impact of AI coding tools on developer productivity.

**Key Metrics:**
- AI Suggestions Accepted
- PRs Accelerated
- Hours Saved

For more information, visit our [GitHub repository](https://github.com/threatthriver/solid-system).
""")

# Instructions
st.sidebar.header("Instructions")
st.sidebar.markdown("""
1. Start the Node.js server:
   ```
   npm start
   ```

2. Run this Streamlit app:
   ```
   streamlit run src/dashboard/streamlit_app.py
   ```

3. View metrics and add sample data as needed.
""")