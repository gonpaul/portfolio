module.exports = {
  apps: [{
    name: 'portfolio',
    script: 'npm',
    args: 'start',
    cwd: '/home/portfolio',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 9010
    },
    error_file: '/home/portfolio/logs/err.log',
    out_file: '/home/portfolio/logs/out.log',
    log_file: '/home/portfolio/logs/combined.log',
    time: true
  }]
};