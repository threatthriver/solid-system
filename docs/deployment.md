# Deployment Guide

This guide explains how to deploy Solid System in various environments.

## Prerequisites

Before deploying Solid System, ensure you have the following installed:
- Node.js (version 14 or higher)
- Python (version 3.7 or higher)
- pip (Python package installer)

## Local Development Deployment

For local development and testing:

1. Clone the repository:
   ```bash
   git clone https://github.com/threatthriver/solid-system.git
   cd solid-system
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Initialize the database with sample data (optional):
   ```bash
   npm run init-db
   ```

5. Start the application:
   ```bash
   npm start
   ```

6. Access the dashboards:
   - Simple HTML Dashboard: http://localhost:3000
   - Streamlit Dashboard: http://localhost:8501 (run separately with `streamlit run src/dashboard/streamlit_app.py`)

## Production Deployment

For production deployment, consider the following recommendations:

### Database

While SQLite works for development, consider using a more robust database solution for production:

1. **PostgreSQL**: More suitable for production environments
2. **MySQL**: Another reliable option
3. **Cloud Database Services**: AWS RDS, Google Cloud SQL, etc.

To switch from SQLite to PostgreSQL:

1. Install the PostgreSQL driver:
   ```bash
   npm install pg
   ```

2. Update the database configuration in `src/config/index.js`

3. Modify the database implementation in `src/database/index.js`

### Environment Configuration

Set appropriate environment variables for production:

```bash
export NODE_ENV=production
export PORT=8080
export GITHUB_TOKEN=your_production_github_token
```

### Process Management

Use a process manager to keep the application running:

1. **PM2** (Recommended):
   ```bash
   npm install -g pm2
   pm2 start src/server/index.js --name solid-system
   ```

2. **Systemd** (Linux):
   Create a systemd service file at `/etc/systemd/system/solid-system.service`:
   ```ini
   [Unit]
   Description=Solid System
   After=network.target

   [Service]
   Type=simple
   User=your-user
   WorkingDirectory=/path/to/solid-system
   ExecStart=/usr/bin/node src/server/index.js
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

### Reverse Proxy

Use a reverse proxy like Nginx or Apache for:

1. SSL termination
2. Load balancing
3. Static file serving
4. Request buffering

Example Nginx configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Docker Deployment

Create a Dockerfile for containerized deployment:

```dockerfile
# Dockerfile
FROM node:18

# Install Python and pip
RUN apt-get update && apt-get install -y python3 python3-pip

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy application code
COPY . .

# Install Python dependencies
RUN pip3 install -r requirements.txt

# Create data directory
RUN mkdir -p data

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

Build and run the Docker container:

```bash
docker build -t solid-system .
docker run -p 3000:3000 solid-system
```

## Cloud Deployment

### Heroku

1. Create a Heroku account and install the Heroku CLI
2. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
3. Set environment variables:
   ```bash
   heroku config:set GITHUB_TOKEN=your_token_here
   ```
4. Deploy the application:
   ```bash
   git push heroku main
   ```

### AWS

1. Use AWS Elastic Beanstalk for a simple deployment
2. Or use EC2 instances with the production deployment steps above
3. Consider using AWS RDS for the database

### Google Cloud Platform

1. Use Google Cloud Run for containerized deployment
2. Or use Compute Engine instances with the production deployment steps above
3. Consider using Cloud SQL for the database

## Monitoring and Logging

For production deployments, implement monitoring and logging:

1. **Application Logging**: Use Winston or similar logging libraries
2. **Error Tracking**: Integrate with Sentry or similar services
3. **Performance Monitoring**: Use tools like New Relic or DataDog
4. **Health Checks**: Implement health check endpoints

## Backup and Recovery

Implement a backup strategy for your database:

1. **Automated Backups**: Schedule regular database backups
2. **Backup Storage**: Store backups in a secure, redundant location
3. **Recovery Procedures**: Document and test recovery procedures
4. **Disaster Recovery**: Plan for disaster recovery scenarios

## Security Considerations

1. **Environment Variables**: Never commit secrets to version control
2. **Input Validation**: Validate all API inputs
3. **Authentication**: Implement proper authentication for sensitive endpoints
4. **Rate Limiting**: Implement rate limiting to prevent abuse
5. **HTTPS**: Always use HTTPS in production