const fs = require('fs');
const path = require('path');

if (!fs.existsSync('.git')) {
  process.exit(0);
}

const from = path.join('.githooks', 'commit-msg');
const toDir = path.join('.git', 'hooks');
const to = path.join(toDir, 'commit-msg');

fs.mkdirSync(toDir, { recursive: true });
fs.copyFileSync(from, to);
fs.chmodSync(to, 0o755);
