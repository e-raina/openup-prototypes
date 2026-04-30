import { chromium } from "playwright";

const VIEWPORT = { width: 402, height: 852 };
const BASE = "http://localhost:5173/ai-guide-loading";
const ENDPOINT_BASE = "https://mcp.figma.com/mcp/capture";

// args: pairs of "captureId" "urlSuffix" passed in via process.argv
// e.g., node mobile-capture.mjs <id1> "?v=C2&freeze=0" <id2> "?v=C2&freeze=1"
const pairs = [];
for (let i = 2; i < process.argv.length; i += 2) {
  pairs.push({ id: process.argv[i], suffix: process.argv[i + 1] });
}

if (pairs.length === 0) {
  console.error("Usage: node mobile-capture.mjs <captureId> <urlSuffix> [...]");
  process.exit(1);
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2 });

for (const { id, suffix } of pairs) {
  const page = await context.newPage();
  const endpoint = `${ENDPOINT_BASE}/${id}/submit`;
  const hash = `#figmacapture=${id}&figmaendpoint=${encodeURIComponent(endpoint)}&figmadelay=1500`;
  const url = `${BASE}${suffix}${hash}`;
  console.log(`-> ${id}  ${suffix}`);

  // Wait for the figma capture script to finish POSTing to its endpoint
  const submitPromise = page.waitForResponse(
    (resp) => resp.url().includes(`/capture/${id}/submit`),
    { timeout: 60000 }
  );

  await page.goto(url, { waitUntil: "load" });
  const dim = await page.evaluate(() => ({
    iw: window.innerWidth, ih: window.innerHeight,
  }));
  console.log(`   viewport ${dim.iw}x${dim.ih}, waiting for submit POST...`);

  try {
    const resp = await submitPromise;
    console.log(`   ✓ submit ${resp.status()}`);
  } catch (e) {
    console.log(`   ✗ submit timeout: ${e.message}`);
  }
  // Tail buffer for server processing
  await page.waitForTimeout(1500);
  await page.close();
}

await browser.close();
console.log("done");
