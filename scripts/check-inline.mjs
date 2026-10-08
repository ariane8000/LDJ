import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = await readFile(path.join(projectRoot, "src", "index.html"), "utf8");
const inlineScripts = Array.from(html.matchAll(/<script>([\s\S]*?)<\/script>/g));

assert.equal(inlineScripts.length, 1, "Expected one inline app script.");
new vm.Script(inlineScripts[0][1], { filename: "src/index.html" });

for (const localAsset of [
  "./assets/app.css",
  "./assets/fontawesome.min.css",
  "./assets/intro-animation.js",
  "./assets/lottie.min.js",
  "./assets/mobile-config.js",
  "./assets/native-bridge.js"
]) {
  assert.ok(html.includes(localAsset), `Missing local asset reference: ${localAsset}`);
}

assert.doesNotMatch(
  html,
  /https:\/\/(?:cdn\.tailwindcss\.com|cdnjs\.cloudflare\.com|fonts\.googleapis\.com)/,
  "Runtime UI assets must not depend on third-party CDNs."
);

const lottie = JSON.parse(
  await readFile(path.join(projectRoot, "src", "EDGE", "Untitled file.json"), "utf8")
);
assert.equal(typeof lottie.v, "string", "The bundled intro must be a Lottie animation.");
assert.ok(lottie.layers.length > 0, "The Lottie intro animation must contain a layer.");

console.log("Inline JavaScript and bundled asset checks passed.");
