// Renders resume.html to public/ShantanuVichare.pdf with the Chromium Playwright already installs.
// Tagged PDF so the text layer carries reading order and headings for parsers and screen readers.
import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";

const source = new URL("./resume.html", import.meta.url);
const out = fileURLToPath(new URL("../public/ShantanuVichare.pdf", import.meta.url));

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(source.href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true, tagged: true });
await browser.close();
console.log(`Wrote ${out}`);
