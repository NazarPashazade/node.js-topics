module.exports = {
  apps: [
    {
      name: "demo app",
      script: "app.js",
      watch: true,
      instances: "max",
      cron_restart: "*/1 * * * *",
    },
  ],
};
