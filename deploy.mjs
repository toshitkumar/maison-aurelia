import { execSync } from 'child_process';
import fs from 'fs';

try {
  console.log('1. Building Next.js static export...');
  execSync('npm run build', { stdio: 'inherit' });

  if (!fs.existsSync('out/.nojekyll')) {
    fs.writeFileSync('out/.nojekyll', '');
  }

  console.log('2. Pushing to gh-pages branch on GitHub...');
  execSync('cd out && git add -A && git commit -m "deploy: update live site" && git push origin gh-pages --force', { stdio: 'inherit' });

  console.log('\n✨ Maison Aurélia is live at: https://toshitkumar.github.io/maison-aurelia/\n');
} catch (error) {
  console.error('Deployment failed:', error);
  process.exit(1);
}
