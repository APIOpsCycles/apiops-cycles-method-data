import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";

const npmCacheDir = resolve(".npm-pack-cache");

function resolveNpmCommand() {
  const nodeBinDir = dirname(process.execPath);
  const candidates = [
    resolve(nodeBinDir, "node_modules", "npm", "bin", "npm-cli.js"),
    resolve(nodeBinDir, "..", "lib", "node_modules", "npm", "bin", "npm-cli.js")
  ];

  const npmCliPath = candidates.find((candidate) => existsSync(candidate));
  if (npmCliPath) {
    return {
      command: process.execPath,
      args: [npmCliPath]
    };
  }

  return {
    command: process.platform === "win32" ? "npm.cmd" : "npm",
    args: []
  };
}

function getPackedFileSet(packArgs) {
  const npmCommand = resolveNpmCommand();
  const packResult = JSON.parse(
    execFileSync(npmCommand.command, [...npmCommand.args, ...packArgs, "--cache", npmCacheDir], {
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
    "bin/method-cli.js",
    "skills/new-api-guide/SKILL.md",
    "packages/create-apiops/bin/create-apiops-project.js",
    "packages/create-apiops/template/AGENTS.md",
    "src/lib/method-engine.js",
    "src/lib/snippet-engine.js",
    "src/schemas/stations.schema.json",
    "src/data/canvas/canvasData.json",
    "src/data/canvas/localizedData.json"
  ],
  "root"
);

for (const target of Object.values(pkg.exports || {})) {
  const normalized = target.replace(/^\.\//, "");
  if (normalized.includes("*")) {
    continue;
  }
  if (!rootFiles.has(normalized)) {
    console.error(`[root] Export target missing from tarball: ${target}`);
    process.exit(1);
  }
}

assertHasFiles(
  rootFiles,
  [
    "src/snippets/api-audit-checklist.json",
    "src/snippets/api-style-guide.json",
    "src/snippets/api-contract-example.yaml"
  ],
  "root"
);

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
    "template/package.json",
    "template/specs/openapi/api.yaml"
  ],
  "create-apiops"
);

console.log("Root and create-apiops package content inspection passed.");
