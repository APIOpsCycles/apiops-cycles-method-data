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

const expectedRepoFiles = [
  "skills/new-api-guide/SKILL.md",
  "skills/new-api-guide/scripts/get-core-stations.cjs",
  "skills/new-api-guide/scripts/get-canvas-metadata.cjs",
  "skills/new-api-guide/scripts/get-resource-metadata.cjs",
  "skills/new-api-guide/scripts/get-station-criteria.cjs"
];

for (const file of expectedRepoFiles) {
  try {
    readFileSync(file, "utf8");
  } catch {
    console.error(`Missing repository file: ${file}`);
    process.exit(1);
  }
}

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
if (!Array.isArray(packageJson.files) || !packageJson.files.includes("skills")) {
  console.error('Root package.json must include "skills" in files for npm packaging.');
  process.exit(1);
}

const npmCommand = resolveNpmCommand();
const packJson = execFileSync(
  npmCommand.command,
  [...npmCommand.args, "pack", "--dry-run", "--json", "--cache", npmCacheDir],
  { encoding: "utf8" }
);
const packEntries = JSON.parse(packJson);
const packedFiles = new Set((packEntries[0]?.files || []).map((entry) => entry.path));

for (const file of expectedRepoFiles) {
  if (!packedFiles.has(file)) {
    console.error(`Missing packed file: ${file}`);
    process.exit(1);
  }
}

console.log("Packaging skill-path check passed.");
