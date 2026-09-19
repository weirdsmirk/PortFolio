import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = process.cwd();
const publicDirectory = resolve(root, "public");
const sourceDirectories = [resolve(root, "src")];
const sourceFiles = [resolve(root, "index.html")];
const assetPattern = /["'`]\/(?:[^"'`\\]|\\.)+?\.(?:avif|gif|jpe?g|mp3|mp4|pdf|png|svg|webp)["'`]/gi;

function collectSourceFiles(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) collectSourceFiles(path);
    if (entry.isFile() && /\.[cm]?[jt]sx?$/.test(entry.name)) sourceFiles.push(path);
  }
}

sourceDirectories.forEach(collectSourceFiles);

const assets = new Set();
for (const sourceFile of sourceFiles) {
  const contents = readFileSync(sourceFile, "utf8");
  for (const match of contents.matchAll(assetPattern)) {
    assets.add(match[0].slice(1, -1));
  }
}

assert.ok(assets.size > 0, "No static asset references were found.");

for (const asset of assets) {
  const assetPath = resolve(publicDirectory, `.${decodeURIComponent(asset)}`);
  assert.ok(
    relative(publicDirectory, assetPath) && !relative(publicDirectory, assetPath).startsWith(".."),
    `Static asset escapes public/: ${asset}`,
  );
  assert.ok(existsSync(assetPath), `Missing static asset: ${asset}`);
}

console.log(`Verified ${assets.size} static asset references.`);
