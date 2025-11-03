#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

async function pathExists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const outputArg = process.argv[2];
  const outputDir = path.resolve(repoRoot, outputArg ?? "build/icon-catalog");
  const iconsDir = path.join(repoRoot, "icons");

  if (!(await pathExists(iconsDir))) {
    throw new Error(`Expected icons directory at ${iconsDir}`);
  }

  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });

  const icons = (await fs.readdir(iconsDir)).filter((name) =>
    name.toLowerCase().endsWith(".svg")
  );
  icons.sort((a, b) => a.localeCompare(b));

  const iconsTarget = path.join(outputDir, "icons");
  await fs.mkdir(iconsTarget, { recursive: true });
  await fs.cp(iconsDir, iconsTarget, { recursive: true });

  const rows = icons
    .map((iconName) => {
      const alt = iconName
        .replaceAll("-", " ")
        .replaceAll("_", " ")
        .replace(/\.svg$/i, "");
      return `        <figure class="icon">
          <img src="./icons/${iconName}" alt="${alt}" />
          <figcaption>${iconName}</figcaption>
        </figure>`;
    })
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>ChecKMarK DevTools Icon Catalog (Node build)</title>
    <style>
      :root {
        color-scheme: light dark;
        font-family: "Jura", system-ui, sans-serif;
      }
      body {
        margin: 0 auto;
        padding: 1.5rem;
        max-width: 1100px;
        line-height: 1.6;
      }
      header {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 2rem;
      }
      h1 {
        margin: 0;
        font-size: clamp(2.5rem, 5vw, 4rem);
      }
      .meta {
        color: #6b7280;
        font-size: 0.95rem;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 1.5rem;
      }
      figure {
        margin: 0;
        padding: 1rem;
        border-radius: 14px;
        border: 1px solid rgba(148, 163, 184, 0.25);
        backdrop-filter: blur(6px);
        box-shadow: 0 12px 20px rgba(15, 23, 42, 0.08);
        background: linear-gradient(145deg, rgba(255,255,255,0.85), rgba(226,232,240,0.6));
      }
      img {
        width: 48px;
        height: 48px;
        display: block;
        margin: 0 auto 0.75rem;
      }
      figcaption {
        text-align: center;
        font-size: 0.9rem;
        word-break: break-all;
        color: #111827;
      }
      footer {
        margin-top: 3rem;
        font-size: 0.85rem;
        color: #6b7280;
      }
      a {
        color: #2563eb;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>CheckMarK Icon Catalog</h1>
      <p class="meta">Generated with Node.js from the <code>icons/</code> folder.</p>
      <p class="meta">Each icon is copied into this bundle so the page remains self-contained.</p>
    </header>
    <main class="grid">
${rows}
    </main>
    <footer>
      <p>Source code: <a href="https://github.com/anchildress1/checkmark-icons">anchildress1/checkmark-icons</a></p>
      <p>This variation demonstrates a Node-powered static export.</p>
    </footer>
  </body>
</html>`;

  await fs.writeFile(path.join(outputDir, "index.html"), html, "utf8");
}

try {
  await main();
} catch (error) {
  console.error(error);
  process.exit(1);
}
