#!/bin/bash

# Docker Deployment Script for Williams Portfolio
# Run this script on your EC2 instance

echo "🐳 Starting Docker deployment of Williams Portfolio..."

# Check Docker installation
echo "✅ Checking Docker installation..."
docker --version
docker-compose --version

# Check for environment variables
echo "🔍 Checking for environment variables..."
if [ -f ".env.local" ]; then
    echo "✅ .env.local file found"
else
    echo "⚠️  No .env.local file found"
    echo "📝 You may need to create .env.local with your environment variables"
    echo "   Example: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, etc."
fi

# Create logs directory
echo "📁 Creating logs directory..."
mkdir -p logs

# Stop and remove existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Remove old images to free up space
echo "🧹 Cleaning up old images..."
docker image prune -f

# Build and start the application
echo "🔨 Building and starting the application..."
docker-compose up --build -d

# Check if the container is running
echo "📊 Checking container status..."
sleep 5
docker-compose ps

# Show logs
echo "📋 Recent logs:"
docker-compose logs --tail=20

echo "✅ Docker deployment completed!"
echo "📊 Check status with: docker-compose ps"
echo "📋 View logs with: docker-compose logs -f"
echo "🔄 Restart with: docker-compose restart"
echo "🛑 Stop with: docker-compose down" 