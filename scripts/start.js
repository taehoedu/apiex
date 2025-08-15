// scripts/start.js
const { execSync } = require("child_process");

const isWindows = process.platform === "win32";
const profile = isWindows ? "local" : "dev";

execSync(`yarn env-cmd -f .env.${profile} react-scripts start`, {
  stdio: "inherit",
  shell: true
});
