import fs from "fs";
import path from "path";

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function resolveMethodFile(...parts) {
  return path.resolve(
    process.cwd(),
    "node_modules",
    "apiops-cycles-method-data",
    "src",
    "data",
    "method",
    ...parts,
  );
}

function resolveSnippetPath(snippet, locale) {
  const base = path.resolve(
    process.cwd(),
    "node_modules",
    "apiops-cycles-method-data",
    "src",
    "snippets",
  );
  const localized = path.join(base, locale, snippet);
  return fs.existsSync(localized) ? localized : path.join(base, snippet);
}

function toAscii(text) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\uFEFF/g, "")
    .replace(/✅/g, "[OK]")
    .replace(/❌/g, "[X]")
    .replace(/➖/g, "[-]")
    .replace(/🧪/g, "[Test]")
    .replace(/🚀/g, "[Prod]")
    .replace(/[–—]/g, "-");
}

function printUsage() {
  console.error(
    "Usage: node scripts/print-method-snippet.js <resource-id> [locale] [--ascii]",
  );
}

const args = process.argv.slice(2);
const ascii = args.includes("--ascii");
const positional = args.filter((arg) => arg !== "--ascii");
const resourceId = positional[0];
const locale = positional[1] || "en";

if (!resourceId) {
  printUsage();
  process.exit(1);
}

const resources = readJson(resolveMethodFile("resources.json")).resources;
const resource = resources.find((entry) => entry.id === resourceId);

if (!resource) {
  console.error(`Unknown resource id: ${resourceId}`);
  process.exit(1);
}

if (!resource.snippet) {
  console.error(`Resource ${resourceId} does not define a snippet`);
  process.exit(1);
}

const snippetPath = resolveSnippetPath(resource.snippet, locale);

if (!fs.existsSync(snippetPath)) {
  console.error(`Snippet not found: ${snippetPath}`);
  process.exit(1);
}

let content = fs.readFileSync(snippetPath, "utf8");

if (ascii) {
  content = toAscii(content);
}

process.stdout.write(content);
