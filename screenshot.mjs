import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const outputDir = join(__dirname, 'temporary screenshots');
mkdirSync(outputDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });

// Disable scroll-reveal so all sections are fully visible in screenshots
await page.addStyleTag({
  content: `.reveal { opacity: 1 !important; transform: none !important; transition: none !important; }`
});

// Helper: scroll to element then screenshot it
async function screenshotSection(selector, filename) {
  const element = await page.$(selector);
  if (!element) {
    console.log(`  ✗ ${filename} — "${selector}" not found`);
    return;
  }
  await element.scrollIntoView();
  await new Promise(r => setTimeout(r, 350));
  await element.screenshot({ path: join(outputDir, filename) });
  console.log(`  ✔ ${filename}`);
}

console.log('\n  Taking screenshots...\n');

// Full page (desktop)
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: join(outputDir, 'full-desktop.png'), fullPage: true });
console.log('  ✔ full-desktop.png');

// 01 — Viewport / above the fold
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 200));
await page.screenshot({ path: join(outputDir, 'screenshot-01-viewport.png') });
console.log('  ✔ screenshot-01-viewport.png');

// 02–10 — Individual sections
const sections = [
  ['section.hero',          'screenshot-02-hero.png'],
  ['section.events',        'screenshot-03-events.png'],
  ['section.about',         'screenshot-04-about.png'],
  ['section.products',      'screenshot-05-products.png'],
  ['section.how',           'screenshot-06-how-it-works.png'],
  ['section.testimonials',  'screenshot-07-testimonials.png'],
  ['section.cta',           'screenshot-08-cta.png'],
  ['.contact-strip',        'screenshot-09-contact.png'],
  ['footer.footer',         'screenshot-10-footer.png'],
];

for (const [selector, filename] of sections) {
  await screenshotSection(selector, filename);
}

// Full page (mobile)
await page.setViewport({ width: 390, height: 844, isMobile: true });
await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });
await page.addStyleTag({
  content: `.reveal { opacity: 1 !important; transform: none !important; transition: none !important; }`
});
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: join(outputDir, 'full-mobile.png'), fullPage: true });
console.log('  ✔ full-mobile.png');

await browser.close();
console.log(`\n  Done! All screenshots saved to "temporary screenshots/"\n`);
