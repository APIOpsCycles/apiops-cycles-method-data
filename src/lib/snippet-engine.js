import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { DEFAULT_LOCALE, buildResourceMetadata } from "./method-engine.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..");

export function resolveSnippetPath(snippet, locale = DEFAULT_LOCALE) {
  const base = path.join(repoRoot, "src", "snippets");
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
      windowsHide: true
    }
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

export function renderSnippet(resourceId, locale = DEFAULT_LOCALE, options = {}) {
  const resource = buildResourceMetadata(resourceId, locale);

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

function printUsage() {
  console.error("Usage: node src/lib/snippet-engine.js <resource-id> [locale] [--ascii] [--unicode]");
}

export function main(argv = process.argv.slice(2)) {
  const forceAscii = argv.includes("--ascii");
  const forceUnicode = argv.includes("--unicode");
  const positional = argv.filter((arg) => arg !== "--ascii" && arg !== "--unicode");
  const resourceId = positional[0];
  const locale = positional[1] || DEFAULT_LOCALE;

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

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  main();
}
