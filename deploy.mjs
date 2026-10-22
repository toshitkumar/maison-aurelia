import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

try {
  console.log('1. Building Next.js static export...');
  execSync('npm run build', { stdio: 'inherit' });

  const outDir = path.resolve('out');
  const nojekyll = path.join(outDir, '.nojekyll');
  if (!fs.existsSync(nojekyll)) {
    fs.writeFileSync(nojekyll, '');
  }

  console.log('2. Pushing to gh-pages branch on GitHub...');
  execSync('git init', { cwd: outDir, stdio: 'inherit' });
  execSync('git config user.name "Toshit Kumar"', { cwd: outDir, stdio: 'inherit' });
  execSync('git config user.email "toshitkumar@users.noreply.github.com"', { cwd: outDir, stdio: 'inherit' });
  execSync('git branch -M gh-pages', { cwd: outDir, stdio: 'inherit' });
  execSync('git add -A', { cwd: outDir, stdio: 'inherit' });
  execSync('git commit -m "Deploy Maison Aurelia with BrandMotion exploded jewellery experience"', { cwd: outDir, stdio: 'inherit' });

  try {
    execSync('git remote add origin https://github.com/toshitkumar/maison-aurelia.git', { cwd: outDir, stdio: 'pipe' });
  } catch {}

  execSync('git push origin gh-pages --force', { cwd: outDir, stdio: 'inherit' });

  console.log('\n✨ Maison Aurélia is live at: https://toshitkumar.github.io/maison-aurelia/\n');
} catch (error) {
  console.error('Deployment failed:', error);
  process.exit(1);
}
