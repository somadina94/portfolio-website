module.exports = {
  apps: [
    {
      name: "williams-portfolio",
      script: "npm",
      args: "start",
      cwd: "/jahbyte", // Updated to match your EC2 directory
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      // Load environment variables from .env.local if it exists
      env_file: ".env.local",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
    },
  ],
};
