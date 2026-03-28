import { mkdtempSync, mkdirSync, cpSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { renderSnippet } from "../packages/create-apiops/template/scripts/print-method-snippet.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, "..");
const tempRoot = mkdtempSync(join(tmpdir(), "print-method-snippet-"));
const fixturePkgRoot = join(tempRoot, "node_modules", "apiops-cycles-method-data");
const previousCwd = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

try {
  mkdirSync(join(fixturePkgRoot, "src", "data", "method"), { recursive: true });
  mkdirSync(join(fixturePkgRoot, "src", "snippets"), { recursive: true });
  cpSync(resolve(repoRoot, "src", "data", "method", "resources.json"), join(fixturePkgRoot, "src", "data", "method", "resources.json"));
  cpSync(resolve(repoRoot, "src", "snippets", "api-audit-checklist.md"), join(fixturePkgRoot, "src", "snippets", "api-audit-checklist.md"));

  process.chdir(tempRoot);

  const unicodeOutput = renderSnippet("api-audit-checklist", "en", { forceUnicode: true });
  assert(unicodeOutput.includes("### ✅ Concept is Ready When..."), "Expected forced Unicode output to keep checklist symbols.");
  assert(unicodeOutput.includes("### 🧪 API Design Prototype is Ready When..."), "Expected forced Unicode output to keep prototype heading.");

  const explicitAsciiOutput = renderSnippet("api-audit-checklist", "en", { forceAscii: true });
  assert(explicitAsciiOutput.includes("### [OK] Concept is Ready When..."), "Expected --ascii output to replace heading symbols.");
  assert(explicitAsciiOutput.includes("| API is based on clear business needs                   | API9:2019            | [X]"), "Expected --ascii output to replace checklist cross marks.");

  process.env.APIOPS_FORCE_WINDOWS = "1";
  process.env.APIOPS_WINDOWS_CODEPAGE = "437";
  const simulatedWindowsOutput = renderSnippet("api-audit-checklist", "en");
  assert(simulatedWindowsOutput.includes("### [OK] Concept is Ready When..."), "Expected Windows non-UTF-8 fallback to use ASCII automatically.");
  assert(simulatedWindowsOutput.includes("### [Prod] API Is Maintainable in Production When..."), "Expected production heading to remain readable in fallback mode.");

  delete process.env.APIOPS_FORCE_WINDOWS;
  delete process.env.APIOPS_WINDOWS_CODEPAGE;
  console.log("print-method-snippet regression test passed.");
} finally {
  delete process.env.APIOPS_FORCE_WINDOWS;
  delete process.env.APIOPS_WINDOWS_CODEPAGE;
  process.chdir(previousCwd);
  rmSync(tempRoot, { recursive: true, force: true });
}
