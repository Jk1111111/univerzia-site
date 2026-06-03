module.exports = {
  apps: [
    {
      name: "univerzia-site",
      cwd: "./frontend",
      script: "node_modules/.bin/next",
      args: "start",
      env: {
        PORT: 3001,
        NODE_ENV: "production",
      },
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      error_file: "/var/log/pm2/univerzia-site-error.log",
      out_file: "/var/log/pm2/univerzia-site-out.log",
      merge_logs: true,
    },
  ],
};
