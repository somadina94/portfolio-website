#!/bin/bash

# EC2 Deployment Script for Williams Portfolio
# Run this script on your EC2 instance

echo "🚀 Starting deployment of Williams Portfolio..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Check Node.js installation
echo "✅ Node.js is already installed"
node --version
npm --version

# Check PM2 installation
echo "✅ PM2 is already installed"
pm2 --version

# Create logs directory
echo "📁 Creating logs directory..."
mkdir -p logs

# Check for environment variables
echo "🔍 Checking for environment variables..."
if [ -f ".env" ]; then
    echo "✅ .env file found"
    echo "📤 Exporting environment variables..."
    export $(cat .env | xargs)
    echo "✅ Environment variables exported"
elif [ -f ".env.local" ]; then
    echo "✅ .env.local file found, copying to .env..."
    cp .env.local .env
    echo "📤 Exporting environment variables..."
    export $(cat .env | xargs)
    echo "✅ Environment variables exported"
else
    echo "⚠️  No .env or .env.local file found"
    echo "📝 You may need to create .env with your environment variables"
    echo "   Example: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, etc."
    exit 1
fi

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

# Build the application
echo "🔨 Building the application..."
npm run build

# Start the application with PM2
echo "🚀 Starting application with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# Setup PM2 to start on system boot
echo "⚙️ Setting up PM2 startup script..."
pm2 startup

echo "✅ Deployment completed!"
echo "📊 Check PM2 status with: pm2 status"
echo "📋 View logs with: pm2 logs"
echo "🔄 Restart with: pm2 restart williams-portfolio" 