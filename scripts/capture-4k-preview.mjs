import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import puppeteer from "puppeteer";

const root = new URL("..", import.meta.url).pathname;
const outDir = join(root, "preview-4k");
const baseUrl = "http://localhost:3000";

const applyCardTilt = async (page, selector, xRatio, yRatio) => {
  await page.evaluate(
    ({ selector, xRatio, yRatio }) => {
      const card = document.querySelector(selector);
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.dispatchEvent(
        new MouseEvent("mousemove", {
          clientX: rect.left + rect.width * xRatio,
          clientY: rect.top + rect.height * yRatio,
          bubbles: true
        })
      );
    },
    { selector, xRatio, yRatio }
  );
};

const browser = await puppeteer.launch({
  headless: true,
  defaultViewport: { width: 3840, height: 2160, deviceScaleFactor: 1 }
});

try {
  await mkdir(outDir, { recursive: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 3840, height: 2160, deviceScaleFactor: 1 });
  await page.goto(baseUrl, { waitUntil: "networkidle0", timeout: 60000 });
  await page.waitForSelector("article");

  await page.screenshot({
    path: join(outDir, "01-arena-full-4k.png"),
    type: "png",
    fullPage: false
  });

  await applyCardTilt(page, "article:nth-of-type(1)", 0.78, 0.32);
  await applyCardTilt(page, "article:nth-of-type(2)", 0.22, 0.68);
  await applyCardTilt(page, "article:nth-of-type(3)", 0.65, 0.45);

  await page.screenshot({
    path: join(outDir, "02-arena-3d-cards-tilt-4k.png"),
    type: "png",
    fullPage: false
  });

  const card = await page.$("article:nth-of-type(1)");
  if (card) {
    const box = await card.boundingBox();
    if (box) {
      await page.screenshot({
        path: join(outDir, "03-arena-3d-card-closeup-4k.png"),
        type: "png",
        clip: {
          x: Math.max(0, box.x - 120),
          y: Math.max(0, box.y - 120),
          width: Math.min(3840, box.width + 240),
          height: Math.min(2160, box.height + 240)
        }
      });
    }
  }

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.35));
  await new Promise((resolve) => setTimeout(resolve, 400));
  await page.screenshot({
    path: join(outDir, "04-arena-scroll-4k.png"),
    type: "png",
    fullPage: false
  });

  await writeFile(
    join(outDir, "README.txt"),
    [
      "Caribbean Popularity Arena — 4K Preview Pack",
      "",
      "01-arena-full-4k.png — Hero arena at 3840x2160",
      "02-arena-3d-cards-tilt-4k.png — 3D card tilt interaction",
      "03-arena-3d-card-closeup-4k.png — 3D card close-up",
      "04-arena-scroll-4k.png — Mid-page arena section",
      "",
      "Live preview: npm run dev → http://localhost:3000"
    ].join("\n")
  );

  console.log(`Saved 4K previews to ${outDir}`);
} finally {
  await browser.close();
}
