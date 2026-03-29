import { mkdtempSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import * as methodEngine from "../src/lib/method-engine.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, "..");
const methodCliPath = resolve(repoRoot, "packages/create-apiops/bin/method-cli.js");
const scaffoldCliPath = resolve(repoRoot, "packages/create-apiops/bin/create-apiops-project.js");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const tempRoot = mkdtempSync(join(tmpdir(), "method-cli-test-"));

try {
  const exportProjectDir = join(tempRoot, "missing-canvascreator");
  mkdirSync(exportProjectDir, { recursive: true });

  const exportOutput = execFileSync(
    process.execPath,
    [
      methodCliPath,
      "resources",
      "--station", "api-product-strategy",
      "--locale", "en",
      "--output", "./specs/canvases",
      "--step-actions", "5,8"
    ],
    {
      cwd: exportProjectDir,
      encoding: "utf8"
    }
  );

  assert(
    exportOutput.includes("SVG export unavailable: SVG export requires CanvasCreator export support, which is not installed in this project."),
    "Expected a friendly missing-install SVG export message."
  );
  assert(
    exportOutput.includes("Run `npm install` to install project dependencies, or `npm install canvascreator` to add CanvasCreator manually."),
    "Expected SVG export help text when CanvasCreator is missing."
  );
  assert(
    !exportOutput.includes("is not recognized as an internal or external command"),
    "Did not expect raw Windows shell errors in SVG export output."
  );

  const supportedLocales = methodEngine.getSupportedMethodLocales();
  assert(
    JSON.stringify(supportedLocales) === JSON.stringify(["en", "de", "fi", "fr", "pt"]),
    "Expected supported method locales to match the locale folders."
  );

  const finnishStartData = methodEngine.buildStartData("fi");
  const startOutputFi = execFileSync(
    process.execPath,
    [
      methodCliPath,
      "start",
      "--locale", "fi",
      "--answers", "no",
      "--next-action", "exit"
    ],
    {
      cwd: repoRoot,
      encoding: "utf8"
    }
  );

  assert(
    startOutputFi.includes(`Recommended start station: ${finnishStartData[0].title} (${finnishStartData[0].id})`),
    "Expected `start --locale fi` to use Finnish output."
  );
  assert(
    !startOutputFi.includes("Default method language:"),
    "Did not expect the locale prompt when --locale is explicitly provided."
  );

  const startListOutput = execFileSync(
    process.execPath,
    [
      methodCliPath,
      "start",
      "--default-locale", "fi",
      "--list"
    ],
    {
      cwd: repoRoot,
      encoding: "utf8"
    }
  );

  assert(
    startListOutput.includes(finnishStartData[0].title),
    "Expected non-interactive start output to use the default locale."
  );
  assert(
    !startListOutput.includes("Default method language:"),
    "Did not expect the locale prompt in list mode."
  );

  const methodCliSource = readFileSync(methodCliPath, "utf8");
  const scaffoldCliSource = readFileSync(scaffoldCliPath, "utf8");
  assert(
    !methodCliSource.includes("shell: process.platform === \"win32\""),
    "Expected method CLI export execution to avoid shell-based Windows spawning."
  );
  assert(
    !scaffoldCliSource.includes("shell: true"),
    "Expected scaffold CLI to avoid shell:true child process execution."
  );

  console.log("method CLI regression test passed.");
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}
