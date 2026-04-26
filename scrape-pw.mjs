import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.fashcycle.com/', { waitUntil: 'networkidle' });
  
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(img => {
      let label = img.alt || '';
      let parent = img.parentElement;
      while (parent && !label && parent !== document.body) {
        label = parent.innerText.split('\n')[0].trim();
        parent = parent.parentElement;
      }
      return { src: img.src, label: label.substring(0, 50) };
    });
  });
  
  const filtered = images.filter(img => !img.src.includes('svg'));
  fs.writeFileSync('images.json', JSON.stringify(filtered, null, 2));
  console.log("Saved to images.json");
  await browser.close();
})();
