module.exports = {
  apps: [
    {
      name: 'tamkinly-nextjs',
      script: 'node',
      args: '.next/standalone/server.js',
      cwd: '/var/www/tamkinly',
      instances: 1,
      exec_mode: 'fork',
      
      // Memory management for 1GB RAM server
      max_memory_restart: '400M',
      node_args: '--max-old-space-size=384',
      
      // Auto restart
      watch: false,
      ignore_watch: ['node_modules', '.next', 'logs'],
      
      // Environment variables
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        HOSTNAME: '0.0.0.0',
      },
      
      // Logging
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      
      // Restart on crash
      exp_backoff_restart_delay: 100,
      max_restarts: 10,
      restart_delay: 3000,
      
      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 10000,
      wait_ready: true,
    },
  ],
};
