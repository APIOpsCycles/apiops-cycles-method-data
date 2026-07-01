import { mkdtempSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import * as methodEngine from "../src/lib/method-engine.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, "..");
const methodCliPath = resolve(repoRoot, "bin/method-cli.js");
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

  const documentOutputPath = join(tempRoot, "integration-design.confluence");
  const documentOutput = execFileSync(
    process.execPath,
    [
      methodCliPath,
      "document",
      "--extension", "integration-design",
      "--format", "confluence-wiki",
      "--locale", "en",
      "--title", "New Integration Requirements",
      "--output", documentOutputPath
    ],
    {
      cwd: repoRoot,
      encoding: "utf8"
    }
  );
  const generatedDocument = readFileSync(documentOutputPath, "utf8");
  assert(
    documentOutput.includes("confluence-wiki document:"),
    "Expected document command to report the generated Confluence wiki file."
  );
  assert(
    generatedDocument.includes("Use this page to gather technology-agnostic integration requirements"),
    "Expected generated document purpose text."
  );
  assert(
    generatedDocument.includes("h2. Intent & fit needs"),
    "Expected generated document to start with integration intent and fit needs."
  );
  assert(
    generatedDocument.includes("| Job to be done | What business outcome must be achieved? |"),
    "Expected generated document to capture job-to-be-done context."
  );
  assert(
    generatedDocument.includes("h2. Business flow visualization"),
    "Expected generated document to include a flow visualization placeholder."
  );
  assert(
    !generatedDocument.includes("<br>"),
    "Expected generated document to avoid HTML line breaks for Confluence paste."
  );
  assert(
    !generatedDocument.includes("|---|"),
    "Expected generated document to avoid Markdown separator rows for Confluence paste."
  );
  assert(
    generatedDocument.includes("Capability Value Proposition Canvas"),
    "Expected generated document to include the capability value canvas."
  );
  assert(
    generatedDocument.includes("Consumer Experience Requirements Canvas"),
    "Expected generated document to include consumer experience requirements."
  );
  assert(
    generatedDocument.includes("h2. Requirements"),
    "Expected generated document to include Confluence wiki headings."
  );
  assert(
    !generatedDocument.includes("|| Why / how || Method data ||"),
    "Did not expect method guidance to be rendered as a separate table."
  );
  assert(
    generatedDocument.includes("h3. Integration Capability Strategy"),
    "Expected generated document to group canvases under their station."
  );
  assert(
    generatedDocument.indexOf("h3. Integration Capability Strategy") === generatedDocument.lastIndexOf("h3. Integration Capability Strategy"),
    "Expected station guidance to be shown once for canvases in the same station."
  );
  assert(
    generatedDocument.includes("h3. Integration Consumer and Producer Experience"),
    "Expected consumer experience canvases to be grouped under their station."
  );
  assert(
    generatedDocument.includes("h3. Integration Architecture Decision"),
    "Expected architecture canvases to be grouped under their station."
  );
  assert(
    generatedDocument.includes("h4. Capability Value Proposition Canvas"),
    "Expected generated document to render canvases below station headings."
  );
  assert(
    generatedDocument.includes("h2. Text sources"),
    "Expected generated document to explain where text comes from."
  );
  assert(
    generatedDocument.includes("Purpose: What customer, partner, or consumer journey is the capability intended to support?"),
    "Expected reused canvas text to be generalized in localizedData.json."
  );
  assert(
    !generatedDocument.includes("|| Question || Example answer || Answer / evidence / owner ||"),
    "Did not expect example answers to use a separate table column."
  );
  assert(
    generatedDocument.includes("|| Topic || Question || Answer / evidence / owner ||"),
    "Expected generated document to include both section topic and detailed question columns."
  );
  assert(
    generatedDocument.includes("| Customer Discovers Need | How does the customer recognize their need or problem? | _Example: Need to find the right product_ |"),
    "Expected generated document to include section label, question, and italic example answer."
  );
  assert(
    !generatedDocument.includes("Canvas how-to-use:"),
    "Did not expect verbose canvas how-to-use text in the concise document."
  );
  assert(
    generatedDocument.includes("Station description: Frame the integration need as a reusable business or ecosystem capability before choosing the implementation style."),
    "Expected integration station description text to come from labels.stations.json."
  );
  assert(
    generatedDocument.includes("Station instruction: Map the customer or partner journey that creates the integration need"),
    "Expected integration station instruction text to come from labels.stations.json."
  );
  assert(
    !generatedDocument.includes("Resource guidance:"),
    "Did not expect verbose resource guidance text in the concise document."
  );
  assert(
    generatedDocument.includes("Purpose: Which reusable capability would create value for consumers without deciding yet whether it should be delivered as an API, event, file, stream, data product, or another integration style?"),
    "Expected generated document to preserve technology choices in capability canvas guidance."
  );
  assert(
    !generatedDocument.includes("Work on it by:"),
    "Did not expect verbose resource steps in the concise document."
  );
  assert(
    generatedDocument.includes("h2. Integration pattern decision"),
    "Expected generated document to include integration pattern decision section."
  );
  assert(
    generatedDocument.includes("h2. Reusable capability analysis"),
    "Expected generated document to include reusable capability analysis section."
  );
  assert(
    generatedDocument.includes("h2. Architecture decision record (ADR)"),
    "Expected generated document to include ADR section."
  );
  assert(
    generatedDocument.includes("|| Candidate pattern || Use when || Fit / concerns || Decision ||"),
    "Expected generated document to include pattern option notes table."
  );
  assert(
    generatedDocument.includes("CanvasCreator: https://canvascreator.apiopscycles.com/?canvas=consumerExperienceRequirementsCanvas&locale=en"),
    "Expected generated document to include plain CanvasCreator URLs."
  );
  const markdownDocument = execFileSync(
    process.execPath,
    [
      methodCliPath,
      "document",
      "--extension", "integration-design",
      "--format", "markdown",
      "--locale", "en"
    ],
    {
      cwd: repoRoot,
      encoding: "utf8"
    }
  );
  assert(
    markdownDocument.includes("| Candidate pattern | Use when | Fit / concerns | Decision |"),
    "Expected markdown document format to remain available."
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
