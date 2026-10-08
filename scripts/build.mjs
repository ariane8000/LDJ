import { execFileSync } from "node:child_process";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(projectRoot, "src");
const outputRoot = path.join(projectRoot, "www");
const assetsRoot = path.join(outputRoot, "assets");
const nodeModules = path.join(projectRoot, "node_modules");
const fontAwesomeRoot = path.join(nodeModules, "@fortawesome", "fontawesome-free");

await rm(outputRoot, { recursive: true, force: true });
await mkdir(assetsRoot, { recursive: true });
await mkdir(path.join(outputRoot, "EDGE"), { recursive: true });

const html = await readFile(path.join(sourceRoot, "index.html"), "utf8");
await writeFile(path.join(outputRoot, "index.html"), html);
await cp(
  path.join(sourceRoot, "mobile-config.js"),
  path.join(assetsRoot, "mobile-config.js")
);
await cp(
  path.join(sourceRoot, "EDGE", "Untitled file.json"),
  path.join(outputRoot, "EDGE", "Untitled file.json")
);
const introAnimation = await readFile(path.join(sourceRoot, "EDGE", "Untitled file.json"), "utf8");
await writeFile(
  path.join(assetsRoot, "intro-animation.js"),
  `window.LottieAnimationData = ${JSON.stringify(JSON.parse(introAnimation))};\n`
);
await cp(
  path.join(nodeModules, "lottie-web", "build", "player", "lottie.min.js"),
  path.join(assetsRoot, "lottie.min.js")
);
await cp(
  path.join(fontAwesomeRoot, "css", "all.min.css"),
  path.join(assetsRoot, "fontawesome.min.css")
);
await cp(
  path.join(fontAwesomeRoot, "webfonts"),
  path.join(outputRoot, "webfonts"),
  { recursive: true }
);

execFileSync(
  process.execPath,
  [
    path.join(nodeModules, "@tailwindcss", "cli", "dist", "index.mjs"),
    "-i",
    path.join(sourceRoot, "styles.css"),
    "-o",
    path.join(assetsRoot, "app.css"),
    "--minify"
  ],
  { cwd: projectRoot, stdio: "inherit" }
);

await build({
  entryPoints: [path.join(sourceRoot, "native-bridge.js")],
  outfile: path.join(assetsRoot, "native-bridge.js"),
  bundle: true,
  platform: "browser",
  format: "iife",
  target: ["es2020"],
  minify: true
});

console.log("Built local web assets in www/.");
