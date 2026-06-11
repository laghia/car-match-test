import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

function run(command, inherit = false) {
  const result = execSync(command, {
    encoding: 'utf-8',
    stdio: inherit ? 'inherit' : 'pipe',
  });

  return typeof result === 'string' ? result.trim() : '';
}

function getGh() {
  const candidates = [
    process.env.GH_BIN,
    'gh',
    '/tmp/gh-install/gh_2.94.0_macOS_arm64/bin/gh',
    '/opt/homebrew/bin/gh',
    '/usr/local/bin/gh',
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      run(`"${candidate}" --version`);
      return candidate;
    } catch {
      // try next location
    }
  }

  throw new Error('GitHub CLI (gh) not found. Install it with: brew install gh');
}

function remoteExists(name) {
  return run('git remote').split('\n').filter(Boolean).includes(name);
}

const gh = getGh();
const config = JSON.parse(readFileSync('pages.config.json', 'utf-8'));
const remote = config.remote || 'github';
const repoName = config.base.replace(/^\/|\/$/g, '');

try {
  run(`"${gh}" auth status`);
} catch {
  console.error('GitHub CLI is not authenticated.');
  console.error(`Run: ${gh} auth login --hostname github.com --git-protocol https --web`);
  process.exit(1);
}

run(`"${gh}" auth setup-git`, true);

if (remoteExists(remote)) {
  const owner = run(`"${gh}" api user -q .login`);
  const httpsUrl = `https://github.com/${owner}/${repoName}.git`;
  run(`git remote set-url ${remote} ${httpsUrl}`);
  console.log(`Remote "${remote}" is already configured:`);
  console.log(run(`git remote get-url ${remote}`));
  process.exit(0);
}

console.log(`Creating public GitHub repo "${repoName}"...`);
run(
  `"${gh}" repo create ${repoName} --public --source=. --remote=${remote} --description "RACV Car Match user testing prototype"`,
  true,
);

const owner = run(`"${gh}" api user -q .login`);
run(`git remote set-url ${remote} https://github.com/${owner}/${repoName}.git`);

const outDir = config.outDir || 'docs';
const branch = config.branch || 'main';
run(
  `"${gh}" api repos/${owner}/${repoName}/pages -X PUT -f build_type=legacy -f 'source[branch]=${branch}' -f 'source[path]=/${outDir}'`,
);

console.log('\nGitHub repo created and remote added.');
console.log(`GitHub Pages configured to deploy from /${outDir}.`);
console.log('Next: npm run deploy');
