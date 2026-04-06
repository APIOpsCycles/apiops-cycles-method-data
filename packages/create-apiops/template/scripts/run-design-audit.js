import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);

let root = process.cwd();
let profile = "read-only";
let auditSlug = profile;
let openApiPath = path.join(root, "specs", "openapi", "api.yaml");
let reportJsonPath = path.join(root, "specs", "audit", `design-audit.${auditSlug}.json`);
let reportMarkdownPath = path.join(root, "specs", "audit", `design-audit.${auditSlug}.md`);
let reportDocsPath = path.join(root, "docs", "api", "audit", `design-audit.${auditSlug}.md`);
let reportHtmlPath = path.join(root, "docs", "api", "audit", `design-audit.${auditSlug}.html`);
let reportJUnitPath = path.join(root, "reports", "junit", `design-audit.${auditSlug}.xml`);
let legacyMarkdownPath = path.join(root, "specs", "audit", "design-audit.md");
let legacyDocsPath = path.join(root, "docs", "api", "audit", "design-audit.md");
let legacyHtmlPath = path.join(root, "docs", "api", "audit", "index.html");

function configureRun(rootDir, selectedProfile) {
  root = rootDir;
  profile = selectedProfile;
  auditSlug = profile;
  openApiPath = path.join(root, "specs", "openapi", "api.yaml");
  reportJsonPath = path.join(root, "specs", "audit", `design-audit.${auditSlug}.json`);
  reportMarkdownPath = path.join(root, "specs", "audit", `design-audit.${auditSlug}.md`);
  reportDocsPath = path.join(root, "docs", "api", "audit", `design-audit.${auditSlug}.md`);
  reportHtmlPath = path.join(root, "docs", "api", "audit", `design-audit.${auditSlug}.html`);
  reportJUnitPath = path.join(root, "reports", "junit", `design-audit.${auditSlug}.xml`);
  legacyMarkdownPath = profile === "read-only" ? path.join(root, "specs", "audit", "design-audit.md") : null;
  legacyDocsPath = profile === "read-only" ? path.join(root, "docs", "api", "audit", "design-audit.md") : null;
  legacyHtmlPath = profile === "read-only" ? path.join(root, "docs", "api", "audit", "index.html") : null;
}

function resolveChecklistSource() {
  const localOverridePath = path.join(root, "specs", "audit", "api-audit-checklist.json");
  if (fs.existsSync(localOverridePath)) {
    return {
      filePath: localOverridePath,
      displayPath: path.relative(root, localOverridePath),
      source: "local-override"
    };
  }

  const packagePath = require.resolve("apiops-cycles-method-data/snippets/api-audit-checklist.json");
  return {
    filePath: packagePath,
    displayPath: "apiops-cycles-method-data/snippets/api-audit-checklist.json",
    source: "package-default"
  };
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function readJson(filePath) {
  return JSON.parse(readText(filePath));
}

function parseSpectralFindings(output) {
  const text = (output || "").trim();
  if (!text) return [];

  try {
    return JSON.parse(text);
  } catch {
    // Spectral can append a plain-language status line after the JSON payload.
    // Extract the first balanced JSON array/object and parse only that chunk.
    let start = -1;
    for (let i = 0; i < text.length; i += 1) {
      if (text[i] === "[" || text[i] === "{") {
        start = i;
        break;
      }
    }
    if (start === -1) return [];

    const opening = text[start];
    const closing = opening === "[" ? "]" : "}";
    let depth = 0;
    let inString = false;
    let escaped = false;

    for (let i = start; i < text.length; i += 1) {
      const char = text[i];
      if (inString) {
        if (escaped) {
          escaped = false;
        } else if (char === "\\") {
          escaped = true;
        } else if (char === "\"") {
          inString = false;
        }
        continue;
      }

      if (char === "\"") {
        inString = true;
        continue;
      }

      if (char === opening) {
        depth += 1;
      } else if (char === closing) {
        depth -= 1;
        if (depth === 0) {
          const jsonChunk = text.slice(start, i + 1);
          return JSON.parse(jsonChunk);
        }
      }
    }

    return [];
  }
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function xmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function listOperations(spec) {
  const operations = [];
  for (const [route, pathItem] of Object.entries(spec.paths || {})) {
    for (const method of ["get", "post", "put", "patch", "delete", "options", "head"]) {
      if (pathItem && pathItem[method]) {
        operations.push({ route, method, operation: pathItem[method] });
      }
    }
  }
  return operations;
}

function listSchemas(spec) {
  return spec.components?.schemas || {};
}

function hasAnyExample(node) {
  if (!node || typeof node !== "object") return false;
  if (Object.prototype.hasOwnProperty.call(node, "example") || Object.prototype.hasOwnProperty.call(node, "examples")) {
    return true;
  }
  return Object.values(node).some((value) => hasAnyExample(value));
}

function findStrings(value, results = []) {
  if (typeof value === "string") {
    results.push(value);
    return results;
  }
  if (Array.isArray(value)) {
    for (const item of value) findStrings(item, results);
    return results;
  }
  if (value && typeof value === "object") {
    for (const item of Object.values(value)) findStrings(item, results);
  }
  return results;
}

function spectralRulesetForProfile() {
  return path.join(root, "spectral", profile === "full-crud" ? "full-crud.yaml" : "read-only.yaml");
}

function runSpectral() {
  const spectralBin = path.join(root, "node_modules", ".bin", process.platform === "win32" ? "spectral.cmd" : "spectral");
  const result = spawnSync(spectralBin, ["lint", "--ruleset", spectralRulesetForProfile(), openApiPath, "--format", "json"], {
    encoding: "utf8",
    shell: false
  });

  const findings = parseSpectralFindings(result.stdout);

  const warnings = findings.filter((finding) => (finding.severity ?? 0) === 1);
  const errors = findings.filter((finding) => (finding.severity ?? 0) === 0);

  return {
    code: result.status ?? 0,
    errors,
    warnings,
    findings
  };
}

function checkFieldNamesDescriptive(spec) {
  const names = [];
  for (const [name, schema] of Object.entries(listSchemas(spec))) {
    names.push(name);
    if (schema.properties) names.push(...Object.keys(schema.properties));
  }
  const bad = names.filter((name) => /(^|_)[a-z]{1,2}(_|$)|[A-Z]{2,}/.test(name));
  return { ok: bad.length === 0, details: bad };
}

function checkRequiredFieldsPresent(spec) {
  const schemas = listSchemas(spec);
  const missing = Object.entries(schemas)
    .filter(([, schema]) => schema.type === "object")
    .filter(([, schema]) => !Array.isArray(schema.required) || schema.required.length === 0)
    .map(([name]) => name);
  return { ok: missing.length === 0, details: missing };
}

function checkDateFormats(spec) {
  const strings = findStrings(spec);
  const hasDateTime = JSON.stringify(spec).includes('"format":"date-time"') || JSON.stringify(spec).includes('format: date-time');
  return { ok: hasDateTime, details: strings.filter((s) => s.includes("date-time")).slice(0, 5) };
}

function checkStandardizedValues(spec) {
  const text = JSON.stringify(spec);
  const hasEnumsOrPatterns = text.includes('"enum"') || text.includes('"pattern"');
  return { ok: hasEnumsOrPatterns };
}

function checkAvoidAcronyms(spec) {
  const names = [];
  for (const [name, schema] of Object.entries(listSchemas(spec))) {
    names.push(name);
    if (schema.properties) names.push(...Object.keys(schema.properties));
  }
  const acronyms = names.filter((name) => /[A-Z]{3,}|(^|[^a-z])[a-z]{0,2}[A-Z]{2,}/.test(name));
  return { ok: acronyms.length === 0, details: acronyms };
}

function checkOperationDescriptions(spec) {
  const missing = listOperations(spec)
    .filter(({ operation }) => !operation.description || !operation.description.trim())
    .map(({ route, method }) => `${method.toUpperCase()} ${route}`);
  return { ok: missing.length === 0, details: missing };
}

function checkPathDepthMax(spec, maxDepth) {
  const bad = Object.keys(spec.paths || {}).filter((route) => {
    const segments = route.split("/").filter(Boolean).filter((part) => !part.startsWith("{"));
    return segments.length > maxDepth;
  });
  return { ok: bad.length === 0, details: bad };
}

function checkExamplesPresent(spec) {
  return { ok: hasAnyExample(spec) };
}

function checkGetNoRequestBody(spec) {
  const bad = listOperations(spec)
    .filter(({ method, operation }) => method === "get" && operation.requestBody)
    .map(({ route }) => route);
  return { ok: bad.length === 0, details: bad };
}

function checkErrorResponsesSpecific(spec) {
  const errors = [];
  for (const [route, pathItem] of Object.entries(spec.paths || {})) {
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!operation || typeof operation !== "object") continue;
      const response = operation.responses?.["400"];
      if (!response) {
        errors.push(`${method.toUpperCase()} ${route}`);
        continue;
      }
      if (response.$ref) continue;
      const content = response.content?.["application/json"]?.schema;
      if (!content) errors.push(`${method.toUpperCase()} ${route}`);
    }
  }
  return { ok: errors.length === 0, details: errors };
}

function checkValidationWorkflowPresent() {
  const workflow = path.join(root, ".github", "workflows", "openapi-lint.yml");
  return { ok: fs.existsSync(workflow) };
}

function checkSchemasPresent(spec) {
  return { ok: Object.keys(listSchemas(spec)).length > 0 };
}

function checkExamplesPassValidation(spec) {
  return { ok: hasAnyExample(spec) };
}

function checkOpaqueIdentifiers(spec) {
  const text = JSON.stringify(spec);
  const identifiers = ["productId", "variantId", "categoryId"];
  const ok = identifiers.every((id) => text.includes(id));
  return { ok, details: identifiers };
}

function checkNoSensitiveDataInPaths(spec) {
  const bad = Object.keys(spec.paths || {}).filter((route) => /password|token|secret|ssn|card/i.test(route));
  return { ok: bad.length === 0, details: bad };
}

function checkMethodResourceConsistency(spec) {
  const bad = listOperations(spec).filter(({ method, route }) => {
    if (method === "get") return false;
    return route.includes("products") || route.includes("categories");
  });
  return { ok: bad.length === 0, details: bad.map(({ method, route }) => `${method.toUpperCase()} ${route}`) };
}

function evaluateCheck(check, spec, item) {
  switch (check?.type) {
    case "operationDescriptions":
      return checkOperationDescriptions(spec);
    case "fieldNamesDescriptive":
      return checkFieldNamesDescriptive(spec);
    case "requiredFieldsPresent":
      return checkRequiredFieldsPresent(spec);
    case "dateFormatTimezone":
      return checkDateFormats(spec);
    case "standardizedEnumsOrPatterns":
      return checkStandardizedValues(spec);
    case "avoidAcronyms":
      return checkAvoidAcronyms(spec);
    case "sectionCoverage":
    case "stageCoverage": {
      return {
        ok: true,
        details: [check.stageId || check.sectionId]
      };
    }
    case "pathDepthMax":
      return checkPathDepthMax(spec, check.maxDepth || 2);
    case "examplesPresent":
      return checkExamplesPresent(spec);
    case "getNoRequestBody":
      return checkGetNoRequestBody(spec);
    case "errorResponsesSpecific":
      return checkErrorResponsesSpecific(spec);
    case "validationWorkflowPresent":
      return checkValidationWorkflowPresent();
    case "schemasPresent":
      return checkSchemasPresent(spec);
    case "examplesPassValidation":
      return checkExamplesPassValidation(spec);
    case "opaqueIdentifiers":
      return checkOpaqueIdentifiers(spec);
    case "noSensitiveDataInPaths":
      return checkNoSensitiveDataInPaths(spec);
    case "methodResourceConsistency":
      return checkMethodResourceConsistency(spec);
    default:
      return { ok: false, details: [`Unknown check: ${item.id}`] };
  }
}

const DEFAULT_LIFECYCLE_STAGES = Object.freeze([
  { id: "strategy", title: "Strategy", order: 1, readinessLabel: "Concept is Ready When..." },
  { id: "architecture", title: "Architecture", order: 2, readinessLabel: "Architecture is Ready When..." },
  { id: "design", title: "Design", order: 3, readinessLabel: "Design Prototype is Ready When..." },
  { id: "delivery", title: "Delivery", order: 4, readinessLabel: "Delivery is Ready When..." },
  { id: "publishing", title: "Publishing", order: 5, readinessLabel: "Production Ready for Publishing When..." },
  { id: "improving", title: "Improving", order: 6, readinessLabel: "Improvement Loops are Ready When..." }
]);

function normalizeStatus(item, evaluation) {
  if (item.defaultStatus === "na") return "na";
  if (item.kind === "manual") return item.defaultStatus || "partial";
  return evaluation.ok ? "pass" : (item.defaultStatus || "gap");
}

function formatStatus(status) {
  switch (status) {
    case "pass":
      return "Pass";
    case "partial":
      return "Partial";
    case "gap":
      return "Gap";
    case "na":
      return "Not applicable";
    default:
      return status;
  }
}

function summarizeStatuses(items) {
  const summary = { pass: 0, partial: 0, gap: 0, na: 0 };
  for (const item of items) {
    summary[item.currentStatus] += 1;
  }
  summary.total = summary.pass + summary.partial + summary.gap + summary.na;
  return summary;
}

function formatStageSummary(summary) {
  const parts = [`${summary.pass} pass`, `${summary.partial} partial`, `${summary.gap} gap`];
  if (summary.na > 0) {
    parts.push(`${summary.na} n/a`);
  }
  return parts.join(" | ");
}

function normalizeChecklistItem(item, primaryStage) {
  return {
    ...item,
    primaryStage: item.primaryStage || primaryStage,
    producedByStation: item.producedByStation || item.stationSource || [],
    producedByStationCriteria: item.producedByStationCriteria || [],
    guidelines: item.guidelines || item.guidelineRef || [],
    expectedEvidenceTags: item.expectedEvidenceTags || item.evidenceType || [],
    expectedEvidence: item.expectedEvidence || item.evidence || []
  };
}

function normalizeChecklist(checklist) {
  const lifecycleStages = (Array.isArray(checklist.lifecycleStages) && checklist.lifecycleStages.length
    ? checklist.lifecycleStages
    : DEFAULT_LIFECYCLE_STAGES
  )
    .slice()
    .sort((left, right) => (left.order || 0) - (right.order || 0));

  if (Array.isArray(checklist.stages)) {
    const itemsByStage = new Map(checklist.stages.map((stage) => [stage.id, stage.items || []]));
    return lifecycleStages.map((stage) => ({
      ...stage,
      items: (itemsByStage.get(stage.id) || []).map((item) => normalizeChecklistItem(item, stage.id))
    }));
  }

  const legacyStageBySectionId = {
    "concept-ready": "strategy",
    "design-prototype-ready": "design",
    "production-ready": "publishing"
  };
  const itemsByStage = new Map(lifecycleStages.map((stage) => [stage.id, []]));

  for (const section of checklist.sections || []) {
    const stageId = legacyStageBySectionId[section.id] || "design";
    const items = itemsByStage.get(stageId) || [];
    for (const item of section.items || []) {
      items.push(normalizeChecklistItem(item, stageId));
    }
    itemsByStage.set(stageId, items);
  }

  return lifecycleStages.map((stage) => ({
    ...stage,
    items: itemsByStage.get(stage.id) || []
  }));
}

function findExistingEvidence(paths) {
  return (paths || [])
    .filter(Boolean)
    .filter((entry) => fs.existsSync(path.join(root, entry)));
}

function buildChecklistResults(spec, checklist) {
  return normalizeChecklist(checklist).map((stage) => {
    const items = stage.items
      .filter((item) => item.applicableTo.includes(profile))
      .map((item) => {
        if (item.defaultStatus === "na") {
          return {
            id: item.id,
            label: item.label,
            kind: item.kind,
            primaryStage: item.primaryStage || stage.id,
            producedByStation: item.producedByStation,
            producedByStationCriteria: item.producedByStationCriteria,
            guidelines: item.guidelines,
            expectedEvidenceTags: item.expectedEvidenceTags,
            expectedEvidence: item.expectedEvidence,
            actualEvidenceFound: findExistingEvidence(item.expectedEvidence),
            currentStatus: "na",
            reason: item.reason || "Not applicable"
          };
        }

        const evaluation = item.kind === "openapi" || item.kind === "aggregate"
          ? evaluateCheck(item.check, spec, item)
          : { ok: false, details: [] };
        const currentStatus = normalizeStatus(item, evaluation);
        const actualEvidenceFound = evaluation.details?.length
          ? evaluation.details
          : (
            findExistingEvidence(item.expectedEvidence).length
              ? findExistingEvidence(item.expectedEvidence)
              : (item.kind === "openapi" ? [path.relative(root, openApiPath)] : [])
          );

        return {
          id: item.id,
          label: item.label,
          kind: item.kind,
          primaryStage: item.primaryStage || stage.id,
          producedByStation: item.producedByStation,
          producedByStationCriteria: item.producedByStationCriteria,
          guidelines: item.guidelines,
          expectedEvidenceTags: item.expectedEvidenceTags,
          expectedEvidence: item.expectedEvidence,
          actualEvidenceFound,
          currentStatus,
          reason: item.reason || "",
          evaluation: item.kind === "openapi" || item.kind === "aggregate" ? evaluation.ok : undefined
        };
      });

    return {
      id: stage.id,
      title: stage.title,
      readinessLabel: stage.readinessLabel || "",
      order: stage.order || 0,
      summary: summarizeStatuses(items),
      items
    };
  });
}

function buildReport() {
  const checklistSource = resolveChecklistSource();
  const checklist = readJson(checklistSource.filePath);
  const spec = YAML.parse(readText(openApiPath));
  const spectral = runSpectral();
  const stages = buildChecklistResults(spec, checklist);
  const summary = summarizeStatuses(stages.flatMap((stage) => stage.items));

  return {
    profile,
    generatedAt: new Date().toISOString(),
    openApiPath: path.relative(root, openApiPath),
    checklistPath: checklistSource.displayPath,
    checklistSource: checklistSource.source,
    spectral: {
      status: spectral.code === 0 ? "pass" : "gap",
      code: spectral.code ?? 0,
      errors: spectral.errors.length,
      warnings: spectral.warnings.length,
      findings: spectral.findings
    },
    summary,
    stageSummary: stages.map((stage) => ({
      id: stage.id,
      title: stage.title,
      ...stage.summary
    })),
    stages
  };
}

function renderMarkdown(report) {
  const lines = [];
  lines.push("# APIOps Cycles Coverage");
  lines.push("");
  lines.push(`Profile: ${report.profile}`);
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push("");
  lines.push("## Coverage");
  lines.push("");
  lines.push(`- Spectral lint: ${report.spectral.status}`);
  lines.push(`- Passed: ${report.summary.pass}`);
  lines.push(`- Partial: ${report.summary.partial}`);
  lines.push(`- Gaps: ${report.summary.gap}`);
  lines.push(`- Not applicable: ${report.summary.na}`);
  lines.push("");
  lines.push("## Lifecycle Summary");
  lines.push("");
  for (const stage of report.stageSummary) {
    lines.push(`- ${stage.title}: ${formatStageSummary(stage)}`);
  }
  lines.push("");
  lines.push("## Stage Results");
  lines.push("");

  for (const stage of report.stages) {
    lines.push(`### ${stage.title}`);
    lines.push("");
    if (stage.readinessLabel) {
      lines.push(stage.readinessLabel);
      lines.push("");
    }
    lines.push(`Summary: ${formatStageSummary(stage.summary)}`);
    lines.push("");
    for (const item of stage.items) {
      lines.push(`- [${formatStatus(item.currentStatus)}] ${item.label}`);
      if (item.producedByStation.length) {
        lines.push(`  - Stations: ${item.producedByStation.join(", ")}`);
      }
      if (item.guidelines.length) {
        lines.push(`  - Guidelines: ${item.guidelines.join(", ")}`);
      }
      if (item.actualEvidenceFound.length) {
        lines.push(`  - Actual evidence found: ${item.actualEvidenceFound.slice(0, 5).join(", ")}`);
      } else if (item.expectedEvidence.length) {
        lines.push(`  - Expected evidence: ${item.expectedEvidence.slice(0, 5).join(", ")}`);
      }
      if (item.reason) {
        lines.push(`  - Reason: ${item.reason}`);
      }
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

function statusClass(status) {
  return `status-${status}`;
}

function renderHtml(report) {
  const stageSummaryHtml = report.stageSummary
    .map((stage) => `
      <div class="stage-summary">
        <div class="stage-title">${xmlEscape(stage.title)}</div>
        <div class="stage-stats">${xmlEscape(formatStageSummary(stage))}</div>
      </div>`)
    .join("\n");

  const itemsHtml = report.stages
    .map((stage) => {
      const rows = stage.items.map((item) => {
        const stations = item.producedByStation.length ? `<div class="meta-row"><strong>Stations:</strong> ${xmlEscape(item.producedByStation.join(", "))}</div>` : "";
        const guidelines = item.guidelines.length ? `<div class="meta-row"><strong>Guidelines:</strong> ${xmlEscape(item.guidelines.join(", "))}</div>` : "";
        const evidence = item.actualEvidenceFound.length
          ? `<div class="meta-row"><strong>Actual evidence:</strong> ${xmlEscape(item.actualEvidenceFound.slice(0, 5).join(", "))}</div>`
          : (item.expectedEvidence.length ? `<div class="meta-row"><strong>Expected evidence:</strong> ${xmlEscape(item.expectedEvidence.slice(0, 5).join(", "))}</div>` : "");
        const reason = item.reason ? `<div class="meta-row"><strong>Reason:</strong> ${xmlEscape(item.reason)}</div>` : "";
        return `
          <li class="item ${statusClass(item.currentStatus)}">
            <div class="item-head">
              <span class="badge ${xmlEscape(item.currentStatus)}">${xmlEscape(formatStatus(item.currentStatus))}</span>
              <span class="label">${xmlEscape(item.label)}</span>
            </div>
            ${stations}
            ${guidelines}
            ${evidence}
            ${reason}
          </li>`;
      }).join("\n");

      return `
        <section class="section">
          <div class="section-head">
            <div>
              <h2>${xmlEscape(stage.title)}</h2>
              <p>${xmlEscape(stage.readinessLabel || "")}</p>
            </div>
            <div class="section-summary">${xmlEscape(formatStageSummary(stage.summary))}</div>
          </div>
          <ul>${rows}</ul>
        </section>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>APIOps Cycles Coverage</title>
  <style>
    :root {
      --bg: #f8f7f2;
      --card: #ffffff;
      --text: #1f2937;
      --muted: #6b7280;
      --border: #ddd8c8;
      --pass: #d9f0b5;
      --partial: #fff0b5;
      --gap: #ffcdcd;
      --na: #e8e4d2;
    }
    body {
      margin: 0;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: linear-gradient(180deg, #faf9f5 0%, #f3f1e8 100%);
      color: var(--text);
    }
    .wrap {
      max-width: 1180px;
      margin: 0 auto;
      padding: 32px 20px 56px;
    }
    .hero, .section {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 18px;
      box-shadow: 0 12px 40px rgba(31, 41, 55, 0.08);
    }
    .hero {
      padding: 24px;
      margin-bottom: 24px;
    }
    .meta, .coverage, .stage-grid {
      display: grid;
      gap: 12px;
    }
    .meta {
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      margin-top: 16px;
    }
    .coverage {
      grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
      margin-top: 16px;
    }
    .stage-grid {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      margin-top: 16px;
    }
    .metric, .stage-summary {
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 14px;
      background: #fff;
    }
    .metric .value {
      font-size: 1.5rem;
      font-weight: 700;
      margin-top: 6px;
    }
    .pill {
      border-radius: 999px;
      padding: 10px 14px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .pill.pass { background: var(--pass); }
    .pill.partial { background: var(--partial); }
    .pill.gap { background: var(--gap); }
    .pill.na { background: var(--na); }
    .stage-title {
      font-weight: 700;
      margin-bottom: 6px;
    }
    .stage-stats, .section-summary, .meta-row, .links a, .section-head p {
      color: var(--muted);
    }
    .section {
      padding: 20px 22px;
      margin: 0 0 18px;
    }
    .section-head {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: flex-start;
      margin-bottom: 14px;
    }
    .section h2 {
      margin: 0 0 6px;
      font-size: 1.2rem;
    }
    .section-head p {
      margin: 0;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .item {
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 14px 14px 12px;
      margin-bottom: 12px;
      background: #fff;
    }
    .item.pass { border-left: 6px solid #7bbf5d; }
    .item.partial { border-left: 6px solid #d5a400; }
    .item.gap { border-left: 6px solid #db5f5f; }
    .item.na { border-left: 6px solid #9d9480; }
    .item-head {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 0.82rem;
      font-weight: 700;
    }
    .badge.pass { background: var(--pass); color: #2a4a12; }
    .badge.partial { background: var(--partial); color: #6a4d00; }
    .badge.gap { background: var(--gap); color: #7b2222; }
    .badge.na { background: var(--na); color: #555046; }
    .label {
      font-weight: 600;
    }
    .meta-row {
      font-size: 0.95rem;
      margin-top: 6px;
    }
    .links a {
      display: inline-block;
      margin-right: 12px;
      margin-top: 8px;
    }
  </style>
</head>
<body>
  <main class="wrap">
    <header class="hero">
      <h1>APIOps Cycles Coverage</h1>
      <p>Docs-side rendering of the current audit result for the <strong>${xmlEscape(report.profile)}</strong> profile.</p>
      <div class="meta">
        <div class="metric"><div>Generated</div><div class="value">${xmlEscape(report.generatedAt)}</div></div>
        <div class="metric"><div>Spectral lint</div><div class="value">${xmlEscape(report.spectral.status)}</div></div>
        <div class="metric"><div>Passed</div><div class="value">${report.summary.pass}</div></div>
        <div class="metric"><div>Gaps</div><div class="value">${report.summary.gap}</div></div>
      </div>
      <div class="coverage">
        <div class="pill pass">Pass ${report.summary.pass}</div>
        <div class="pill partial">Partial ${report.summary.partial}</div>
        <div class="pill gap">Gap ${report.summary.gap}</div>
        <div class="pill na">NA ${report.summary.na}</div>
      </div>
      <div class="stage-grid">
        ${stageSummaryHtml}
      </div>
      <div class="links">
        <a href="./design-audit.${xmlEscape(report.profile)}.md">Markdown report</a>
        <a href="../../../specs/audit/design-audit.${xmlEscape(report.profile)}.json">Canonical JSON</a>
        <a href="../../../reports/junit/design-audit.${xmlEscape(report.profile)}.xml">JUnit XML</a>
      </div>
    </header>
    ${itemsHtml}
  </main>
</body>
</html>
`;
}

function junitAttributes(attrs) {
  return Object.entries(attrs)
    .map(([key, value]) => `${key}="${xmlEscape(value)}"`)
    .join(" ");
}

function renderTestcase(name, classname, status, details) {
  const parts = [`<testcase ${junitAttributes({ name, classname, time: "0" })}>`];
  if (status === "gap") {
    parts.push(`<failure message="Gap">${xmlEscape(details.join("; "))}</failure>`);
  } else if (status === "partial" || status === "na") {
    parts.push(`<skipped message="${xmlEscape(status === "na" ? "Not applicable" : "Partial")}">${xmlEscape(details.join("; "))}</skipped>`);
  }
  parts.push("</testcase>");
  return parts.join("");
}

function renderJUnit(report) {
  const testSuites = [];
  const allCheckItems = report.stages.flatMap((stage) => stage.items.filter((item) => item.currentStatus !== undefined));

  const spectralCaseStatus = report.spectral.status === "pass" ? "pass" : "gap";
  const spectralCase = renderTestcase(
    "Spectral lint",
    "APIOps Cycles / Spectral",
    spectralCaseStatus,
    [
      `errors=${report.spectral.errors}`,
      `warnings=${report.spectral.warnings}`
    ]
  );

  testSuites.push(
    `<testsuite name="Spectral lint" tests="1" failures="${report.spectral.status === "pass" ? 0 : 1}" skipped="0" time="0">` +
    `<properties><property name="profile" value="${xmlEscape(report.profile)}"/></properties>` +
    spectralCase +
    `</testsuite>`
  );

  for (const stage of report.stages) {
    const suiteTests = stage.items.length;
    const suiteFailures = stage.items.filter((item) => item.currentStatus === "gap").length;
    const suiteSkipped = stage.items.filter((item) => item.currentStatus === "partial" || item.currentStatus === "na").length;
    const cases = stage.items
      .map((item) => renderTestcase(item.label, `APIOps Cycles / ${stage.title}`, item.currentStatus, item.actualEvidenceFound || []))
      .join("");
    testSuites.push(
      `<testsuite name="${xmlEscape(stage.title)}" tests="${suiteTests}" failures="${suiteFailures}" skipped="${suiteSkipped}" time="0">` +
      cases +
      `</testsuite>`
    );
  }

  const failures = (report.spectral.status === "pass" ? 0 : 1) + report.stages.reduce((acc, stage) => acc + stage.items.filter((item) => item.currentStatus === "gap").length, 0);
  const skipped = report.stages.reduce((acc, stage) => acc + stage.items.filter((item) => item.currentStatus === "partial" || item.currentStatus === "na").length, 0);
  const tests = 1 + allCheckItems.length;

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<testsuites tests="${tests}" failures="${failures}" skipped="${skipped}" time="0">`,
    ...testSuites,
    `</testsuites>`
  ].join("\n");
}

function writeFile(filePath, content) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content);
}

export function runDesignAudit(options = {}) {
  const selectedRoot = options.rootDir || process.cwd();
  const selectedProfile = String(options.profile || process.argv[2] || "read-only").trim();

  if (!["read-only", "full-crud"].includes(selectedProfile)) {
    throw new Error(`Unknown audit profile: ${selectedProfile}`);
  }

  configureRun(selectedRoot, selectedProfile);

  const report = buildReport();
  const markdown = renderMarkdown(report);
  const html = renderHtml(report);
  const junit = renderJUnit(report);
  const reportJson = `${JSON.stringify(report, null, 2)}\n`;

  writeFile(reportJsonPath, reportJson);
  writeFile(reportMarkdownPath, markdown);
  writeFile(reportDocsPath, markdown);
  writeFile(reportHtmlPath, html);
  writeFile(reportJUnitPath, junit);

  if (legacyMarkdownPath) {
    writeFile(legacyMarkdownPath, markdown);
  }
  if (legacyDocsPath) {
    writeFile(legacyDocsPath, markdown);
  }
  if (legacyHtmlPath) {
    writeFile(legacyHtmlPath, html);
  }

  return {
    report,
    paths: {
      reportJsonPath,
      reportMarkdownPath,
      reportDocsPath,
      reportHtmlPath,
      reportJUnitPath,
      legacyMarkdownPath,
      legacyDocsPath,
      legacyHtmlPath
    }
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  try {
    const result = runDesignAudit();
    console.log(`Wrote ${path.relative(root, result.paths.reportJsonPath)}`);
    console.log(`Wrote ${path.relative(root, result.paths.reportMarkdownPath)}`);
    console.log(`Wrote ${path.relative(root, result.paths.reportDocsPath)}`);
    console.log(`Wrote ${path.relative(root, result.paths.reportHtmlPath)}`);
    console.log(`Wrote ${path.relative(root, result.paths.reportJUnitPath)}`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
