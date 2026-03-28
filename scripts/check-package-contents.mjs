import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";

const npmCliPath = resolve(dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js");
const npmCacheDir = resolve(".npm-pack-cache");

function getPackedFileSet(packArgs) {
  const packResult = JSON.parse(
    execFileSync(process.execPath, [npmCliPath, ...packArgs, "--cache", npmCacheDir], {
      encoding: "utf8"
    })
  );
  const files = packResult[0]?.files || [];
  return new Set(files.map((entry) => entry.path));
}

function assertHasFiles(fileSet, requiredFiles, label) {
  for (const file of requiredFiles) {
    if (!fileSet.has(file)) {
      console.error(`[${label}] Missing expected packaged file: ${file}`);
      process.exit(1);
    }
  }
}

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
if (!Array.isArray(pkg.files) || !pkg.files.includes("src/schemas/")) {
  console.error('package.json files must include "src/schemas/".');
  process.exit(1);
}

const rootFiles = getPackedFileSet(["pack", "--dry-run", "--json"]);
assertHasFiles(
  rootFiles,
  [
    "AGENTS.md",
    "skills/new-api-guide/SKILL.md",
    "packages/create-apiops/bin/create-apiops-project.js",
    "packages/create-apiops/template/AGENTS.md",
    "src/lib/method-engine.js",
    "src/schemas/stations.schema.json",
    "src/data/canvas/canvasData.json",
    "src/data/canvas/localizedData.json"
  ],
  "root"
);

for (const target of Object.values(pkg.exports || {})) {
  const normalized = target.replace(/^\.\//, "");
  if (!rootFiles.has(normalized)) {
    console.error(`[root] Export target missing from tarball: ${target}`);
    process.exit(1);
  }
}

const createApiopsFiles = getPackedFileSet([
  "pack",
  "--dry-run",
  "--json",
  "--workspace",
  "packages/create-apiops"
]);
assertHasFiles(
  createApiopsFiles,
  [
    "bin/create-apiops-project.js",
    "bin/method-cli.js",
    "bin/check-node-version.js",
    "template/AGENTS.md",
    "template/README.md",
    "template/package.json"
  ],
  "create-apiops"
);

console.log("Root and create-apiops package content inspection passed.");
