import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

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

export function toAscii(text) {
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

export function getActiveWindowsCodePage() {
  const override = process.env.APIOPS_WINDOWS_CODEPAGE;
  if (override) {
    return Number.parseInt(override, 10);
  }

  const result = spawnSync(
    process.env.ComSpec || "cmd.exe",
    ["/d", "/s", "/c", "chcp"],
    {
      encoding: "utf8",
      windowsHide: true,
    },
  );

  const output = `${result.stdout || ""}\n${result.stderr || ""}`;
  const match = output.match(/(\d{3,5})/);
  return match ? Number.parseInt(match[1], 10) : null;
}

export function shouldUseAsciiFallback(forceAscii, forceUnicode) {
  if (forceAscii) {
    return true;
  }

  if (forceUnicode) {
    return false;
  }

  const isWindows = process.platform === "win32" || process.env.APIOPS_FORCE_WINDOWS === "1";
  if (!isWindows) {
    return false;
  }

  const codePage = getActiveWindowsCodePage();
  return codePage !== null && codePage !== 65001;
}

function printUsage() {
  console.error(
    "Usage: node scripts/print-method-snippet.js <resource-id> [locale] [--ascii] [--unicode]",
  );
}

export function renderSnippet(resourceId, locale = "en", options = {}) {
  const resources = readJson(resolveMethodFile("resources.json")).resources;
  const resource = resources.find((entry) => entry.id === resourceId);

  if (!resource) {
    throw new Error(`Unknown resource id: ${resourceId}`);
  }

  if (!resource.snippet) {
    throw new Error(`Resource ${resourceId} does not define a snippet`);
  }

  const snippetPath = resolveSnippetPath(resource.snippet, locale);
  if (!fs.existsSync(snippetPath)) {
    throw new Error(`Snippet not found: ${snippetPath}`);
  }

  let content = fs.readFileSync(snippetPath, "utf8");
  if (shouldUseAsciiFallback(options.forceAscii, options.forceUnicode)) {
    content = toAscii(content);
  }

  return content;
}

function main() {
  const args = process.argv.slice(2);
  const forceAscii = args.includes("--ascii");
  const forceUnicode = args.includes("--unicode");
  const positional = args.filter((arg) => arg !== "--ascii" && arg !== "--unicode");
  const resourceId = positional[0];
  const locale = positional[1] || "en";

  if (!resourceId) {
    printUsage();
    process.exit(1);
  }

  try {
    const content = renderSnippet(resourceId, locale, { forceAscii, forceUnicode });
    process.stdout.write(content, "utf8");
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
