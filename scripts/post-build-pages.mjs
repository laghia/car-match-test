import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const { outDir } = JSON.parse(readFileSync('pages.config.json', 'utf-8'));

copyFileSync(join(outDir, 'index.html'), join(outDir, '404.html'));
writeFileSync(join(outDir, '.nojekyll'), '\n');

console.log(`GitHub Pages build ready in ./${outDir}/`);
