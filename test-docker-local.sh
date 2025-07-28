#!/bin/bash

# Local Docker Testing Script for Williams Portfolio
# Run this script in your IDE to test Docker locally

echo "🐳 Starting local Docker test of Williams Portfolio..."

# Check Docker installation
echo "✅ Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

docker --version
docker-compose --version

# Check for environment variables
echo "🔍 Checking for environment variables..."
if [ -f ".env.local" ]; then
    echo "✅ .env.local file found"
else
    echo "⚠️  No .env.local file found"
    echo "📝 Creating a sample .env.local file for testing..."
    cat > .env.local << EOF
# Sample environment variables for local testing
# Replace these with your actual values
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
EOF
    echo "✅ Created sample .env.local file"
fi

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.dev.yml down 2>/dev/null || true

# Remove old images to free up space
echo "🧹 Cleaning up old images..."
docker image prune -f

# Build and start the development container
echo "🔨 Building and starting development container..."
docker-compose -f docker-compose.dev.yml up --build -d

# Wait for the container to start
echo "⏳ Waiting for container to start..."
sleep 10

# Check if the container is running
echo "📊 Checking container status..."
docker-compose -f docker-compose.dev.yml ps

# Test if the app is responding
echo "🧪 Testing application..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Application is running successfully!"
    echo "🌐 Open http://localhost:3000 in your browser"
else
    echo "⚠️  Application might still be starting up..."
    echo "📋 Check logs with: docker-compose -f docker-compose.dev.yml logs -f"
fi

echo ""
echo "🎉 Local Docker test completed!"
echo ""
echo "📊 Useful commands:"
echo "   Check status: docker-compose -f docker-compose.dev.yml ps"
echo "   View logs: docker-compose -f docker-compose.dev.yml logs -f"
echo "   Stop container: docker-compose -f docker-compose.dev.yml down"
echo "   Restart: docker-compose -f docker-compose.dev.yml restart"
echo ""
echo "🌐 Your app should be available at: http://localhost:3000" 