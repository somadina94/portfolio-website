#!/bin/bash

# Fix Docker Setup Script for EC2
# Run this script to fix Docker and docker-compose issues

echo "🔧 Fixing Docker setup..."

# Install docker-compose
echo "📥 Installing docker-compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
echo "🔧 Adding user to docker group..."
sudo usermod -aG docker $USER

# Start Docker service
echo "🚀 Starting Docker service..."
sudo systemctl start docker
sudo systemctl enable docker

echo "✅ Docker setup fixed!"
echo ""
echo "⚠️  IMPORTANT: You need to either:"
echo "   1. Log out and log back in, OR"
echo "   2. Run: newgrp docker"
echo ""
echo "Then run: ./deploy-docker.sh" 