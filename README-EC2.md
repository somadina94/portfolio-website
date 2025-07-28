# Deploying Williams Portfolio on EC2 with PM2

This guide will help you deploy your Next.js portfolio application on an EC2 instance using PM2 for process management.

## Prerequisites

- An EC2 instance running Ubuntu (recommended: t2.micro or larger)
- SSH access to your EC2 instance
- A domain name (optional, for production)

## Step 1: Connect to Your EC2 Instance

```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

## Step 2: Clone Your Repository

```bash
# Navigate to home directory
cd ~

# Clone your repository
git clone https://github.com/yourusername/williams.git
cd williams
```

## Step 3: Run the Deployment Script

```bash
# Make the script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

## Step 4: Configure Environment Variables (if needed)

If your app requires environment variables, create a `.env.local` file:

```bash
nano .env.local
```

Add your environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# Add other environment variables as needed
```

## Step 5: Configure Nginx (Optional but Recommended)

Install and configure Nginx as a reverse proxy:

```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/williams
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com; # Replace with your domain

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/williams /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 6: Configure Security Groups

Make sure your EC2 security group allows:

- Port 22 (SSH)
- Port 80 (HTTP)
- Port 443 (HTTPS) - if using SSL
- Port 3000 (optional, for direct access)

## PM2 Management Commands

### Check Application Status

```bash
pm2 status
```

### View Logs

```bash
# All logs
pm2 logs

# Specific app logs
pm2 logs williams-portfolio

# Real-time logs
pm2 logs --lines 100 --follow
```

### Restart Application

```bash
pm2 restart williams-portfolio
```

### Stop Application

```bash
pm2 stop williams-portfolio
```

### Delete Application from PM2

```bash
pm2 delete williams-portfolio
```

### Monitor Resources

```bash
pm2 monit
```

## Updating Your Application

When you need to update your application:

```bash
# Pull latest changes
git pull origin main

# Install dependencies (if changed)
npm install

# Build the application
npm run build

# Restart PM2
pm2 restart williams-portfolio
```

## Troubleshooting

### Check if the app is running

```bash
pm2 status
curl http://localhost:3000
```

### Check logs for errors

```bash
pm2 logs williams-portfolio --lines 50
```

### Check system resources

```bash
htop
df -h
free -h
```

### Restart PM2 completely

```bash
pm2 kill
pm2 start ecosystem.config.js --env production
pm2 save
```

## SSL Certificate (Optional)

For production, consider setting up SSL with Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

## Monitoring and Maintenance

- Set up log rotation for PM2 logs
- Monitor disk space and memory usage
- Set up automated backups
- Configure monitoring alerts

## File Structure After Deployment

```
/home/ubuntu/williams/
├── app/
├── components/
├── logs/
│   ├── err.log
│   ├── out.log
│   └── combined.log
├── ecosystem.config.js
├── deploy.sh
├── package.json
└── .next/
```

Your application should now be running on `http://your-ec2-public-ip` or `http://your-domain.com`!
