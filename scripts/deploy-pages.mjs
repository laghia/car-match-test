import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

function run(command) {
  execSync(command, { stdio: 'inherit' });
}

function runOutput(command) {
  return execSync(command, { encoding: 'utf-8' }).trim();
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
      runOutput(`"${candidate}" --version`);
      return candidate;
    } catch {
      // try next location
    }
  }

  return null;
}

function remoteExists(name) {
  const remotes = runOutput('git remote');
  return remotes.split('\n').includes(name);
}

function getGitHubRepo(remote) {
  const remoteUrl = runOutput(`git remote get-url ${remote}`);
  const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/]+?)(?:\.git)?$/);
  return match ? `${match[1]}/${match[2]}` : null;
}

function configureGitHubPages(gh, repo, branch, outDir) {
  runOutput(
    `"${gh}" api repos/${repo}/pages -X PUT -f build_type=legacy -f 'source[branch]=${branch}' -f 'source[path]=/${outDir}'`,
  );
  runOutput(`"${gh}" api repos/${repo}/pages/builds -X POST`);
  console.log(`GitHub Pages configured to deploy from /${outDir} on ${branch}.`);
}

const config = JSON.parse(readFileSync('pages.config.json', 'utf-8'));
const remote = process.env.PAGES_REMOTE || config.remote || 'origin';
const branch = process.env.PAGES_BRANCH || config.branch || 'main';
const outDir = config.outDir || 'docs';

console.log('Building GitHub Pages site...');
run('npm run build:pages');

console.log(`Staging ./${outDir}/...`);
run(`git add ${outDir}`);

const changes = runOutput(`git status --porcelain -- ${outDir}`);
if (changes) {
  console.log('Committing deploy...');
  run('git commit -m "Deploy GitHub Pages site"');
} else {
  console.log('No changes in build output.');
}

if (!remoteExists(remote)) {
  console.error(
    `\nRemote "${remote}" is not configured.\n` +
      `Run npm run setup:github first.\n`,
  );
  process.exit(1);
}

console.log(`Pushing to ${remote}/${branch}...`);
run(`git push ${remote} ${branch}`);

const gh = getGh();
const repo = getGitHubRepo(remote);
if (gh && repo) {
  try {
    configureGitHubPages(gh, repo, branch, outDir);
  } catch {
    console.log(`Set GitHub Pages manually: branch ${branch}, folder /${outDir}.`);
  }
}

console.log('\nDeploy complete.');
