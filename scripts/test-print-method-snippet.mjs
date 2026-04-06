import { mkdtempSync, mkdirSync, cpSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { renderSnippet } from "../src/lib/snippet-engine.js";

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
  cpSync(
    resolve(repoRoot, "src", "data", "method", "resources.json"),
    join(fixturePkgRoot, "src", "data", "method", "resources.json")
  );
  cpSync(
    resolve(repoRoot, "src", "snippets", "api-audit-checklist.json"),
    join(fixturePkgRoot, "src", "snippets", "api-audit-checklist.json")
  );
  cpSync(
    resolve(repoRoot, "src", "snippets", "api-style-guide.json"),
    join(fixturePkgRoot, "src", "snippets", "api-style-guide.json")
  );
  cpSync(
    resolve(repoRoot, "src", "snippets", "api-contract-example.yaml"),
    join(fixturePkgRoot, "src", "snippets", "api-contract-example.yaml")
  );

  process.chdir(tempRoot);

  const auditSnippet = renderSnippet("api-audit-checklist", "en", { forceUnicode: true });
  assert(auditSnippet.includes("\"profiles\""), "Expected api-audit-checklist to render the JSON checklist snippet.");
  assert(auditSnippet.includes("\"read-only\""), "Expected api-audit-checklist JSON snippet to include the read-only profile.");
  assert(auditSnippet.includes("\"stages\""), "Expected api-audit-checklist JSON snippet to include lifecycle stages.");
  assert(auditSnippet.includes("\"producedByStation\""), "Expected api-audit-checklist JSON snippet to include station ownership links.");

  const styleSnippet = renderSnippet("api-design-principles", "en", { forceAscii: true });
  assert(styleSnippet.includes("\"guidelines\""), "Expected api-design-principles to render the JSON style snippet.");
  assert(styleSnippet.includes("\"REST-CONTRACT-01\""), "Expected api-design-principles JSON snippet to include guideline ids.");

  const contractSnippet = renderSnippet("contract-first-design", "en");
  assert(contractSnippet.includes("openapi: 3.0.3"), "Expected contract-first-design to render the YAML OpenAPI snippet.");
  assert(contractSnippet.includes("/items:"), "Expected YAML snippet to include sample contract paths.");

  console.log("print-method-snippet regression test passed.");
} finally {
  process.chdir(previousCwd);
  rmSync(tempRoot, { recursive: true, force: true });
}
