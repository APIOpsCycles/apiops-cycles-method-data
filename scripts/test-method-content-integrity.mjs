import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

const stationsJson = readJson("src/data/method/stations.json");
const linesJson = readJson("src/data/method/lines.json");
const resourcesJson = readJson("src/data/method/resources.json");
const criteriaJson = readJson("src/data/method/criteria.json");
const stakeholdersJson = readJson("src/data/method/stakeholders.json");
const stationCriteriaJson = readJson("src/data/method/station-criteria.json");
const canvasDataJson = readJson("src/data/canvas/canvasData.json");
const localizedCanvasDataJson = readJson("src/data/canvas/localizedData.json");
const knownResourceIds = new Set((resourcesJson.resources || []).map((resource) => resource.id));
const stationGroups = [
  ...(stationsJson["core-stations"]?.items || []).map((station) => ({ ...station, group: "core-stations" })),
  ...(stationsJson["sub-stations"]?.items || []).map((station) => ({ ...station, group: "sub-stations" }))
];
const knownStationIds = new Set(stationGroups.map((station) => station.id));
const knownCanvasIds = new Set(Object.keys(canvasDataJson));
const localeDirs = readdirSync("src/data/method", { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
const findings = [];
const lifecycleStages = new Set(["strategy", "architecture", "design", "delivery", "publishing", "improving"]);

function collectMatchingStringValues(node, pattern, results = new Set()) {
  if (typeof node === "string") {
    if (pattern.test(node)) {
      results.add(node);
    }
    return results;
  }

  if (Array.isArray(node)) {
    for (const item of node) {
      collectMatchingStringValues(item, pattern, results);
    }
    return results;
  }

  if (node && typeof node === "object") {
    for (const value of Object.values(node)) {
      collectMatchingStringValues(value, pattern, results);
    }
  }

  return results;
}

function validateLabelFile(locale, filename, expectedKeys, allowedExtras = []) {
  const filePath = path.join("src", "data", "method", locale, filename);
  const labels = readJson(filePath);
  const actualKeys = new Set(Object.keys(labels));
  const allowedExtrasSet = new Set(allowedExtras);

  for (const expectedKey of expectedKeys) {
    if (!actualKeys.has(expectedKey)) {
      findings.push(`Locale ${locale} is missing label "${expectedKey}" in ${filename}.`);
    }
  }

  for (const actualKey of actualKeys) {
    if (!expectedKeys.has(actualKey) && !allowedExtrasSet.has(actualKey)) {
      findings.push(`Locale ${locale} has unused label "${actualKey}" in ${filename}.`);
    }
  }
}

for (const station of stationGroups) {
  const steps = station.how_it_works || station["how-it-works"] || [];
  const seenStepKeys = new Map();
  const seenResources = new Map();

  for (const [index, step] of steps.entries()) {
    const stepKey = String(step?.step || "").trim();
    const resourceId = String(step?.resource || "").trim();

    if (!stepKey) {
      findings.push(`Station ${station.id} has an empty step value at index ${index}.`);
    } else if (seenStepKeys.has(stepKey)) {
      findings.push(
        `Station ${station.id} contains duplicate step key "${stepKey}" at indexes ${seenStepKeys.get(stepKey)} and ${index}.`
      );
    } else {
      seenStepKeys.set(stepKey, index);
    }

    if (!resourceId) {
      continue;
    }

    if (seenResources.has(resourceId)) {
      findings.push(
        `Station ${station.id} contains duplicate resource reference "${resourceId}" at indexes ${seenResources.get(resourceId)} and ${index}.`
      );
    } else {
      seenResources.set(resourceId, index);
    }

    if (!knownResourceIds.has(resourceId)) {
      findings.push(
        `Station ${station.id} references unknown resource "${resourceId}" at index ${index}.`
      );
    }
  }

  if (station.group === "core-stations") {
    if (!lifecycleStages.has(station.lifecycleStage)) {
      findings.push(`Core station ${station.id} is missing a valid lifecycleStage.`);
    }

    const expectedCriteria = stationCriteriaJson[station.id] || [];
    const actualCriteria = station.stationCriteria || [];
    if (JSON.stringify(actualCriteria) !== JSON.stringify(expectedCriteria)) {
      findings.push(`Core station ${station.id} stationCriteria does not match station-criteria.json.`);
    }

    if (!Array.isArray(station.expectedEvidenceTags) || station.expectedEvidenceTags.length === 0) {
      findings.push(`Core station ${station.id} must define expectedEvidenceTags.`);
    }
  }
}

for (const line of linesJson.lines?.items || []) {
  const seenStations = new Map();

  for (const [index, stationId] of (line.stations || []).entries()) {
    if (seenStations.has(stationId)) {
      findings.push(
        `Line ${line.id} contains duplicate station "${stationId}" at indexes ${seenStations.get(stationId)} and ${index}.`
      );
    } else {
      seenStations.set(stationId, index);
    }

    if (!knownStationIds.has(stationId)) {
      findings.push(`Line ${line.id} references unknown station "${stationId}" at index ${index}.`);
    }
  }
}

const stationsUsedInLines = new Set(
  (linesJson.lines?.items || []).flatMap((line) => line.stations || [])
);
for (const station of stationGroups) {
  if (!stationsUsedInLines.has(station.id)) {
    findings.push(`Station ${station.id} does not belong to any line.`);
  }
}

for (const resource of resourcesJson.resources || []) {
  if (resource.category === "canvas") {
    if (!resource.canvas) {
      findings.push(`Canvas resource ${resource.id} is missing its canvas id.`);
    } else if (!knownCanvasIds.has(resource.canvas)) {
      findings.push(`Canvas resource ${resource.id} references unknown canvas "${resource.canvas}".`);
    }
  }

  if (resource.snippet) {
    const snippetPath = path.join("src", "snippets", resource.snippet);
    if (!existsSync(snippetPath)) {
      findings.push(`Resource ${resource.id} references missing snippet "${resource.snippet}".`);
    }
  }
}

const expectedStationLabels = collectMatchingStringValues(stationsJson, /^(group|station)\./);
const expectedLineLabels = collectMatchingStringValues(linesJson, /^(lines|line)\./);
const expectedResourceLabels = collectMatchingStringValues(resourcesJson, /^resource\./);
const expectedCriteriaLabels = new Set(criteriaJson.map((criterion) => `criterion.${criterion.id}`));
const expectedStakeholderLabels = collectMatchingStringValues(stakeholdersJson, /^stakeholder\./);

for (const locale of localeDirs) {
  validateLabelFile(locale, "labels.stations.json", expectedStationLabels);
  validateLabelFile(locale, "labels.lines.json", expectedLineLabels);
  validateLabelFile(locale, "labels.resources.json", expectedResourceLabels);
  validateLabelFile(locale, "labels.criteria.json", expectedCriteriaLabels, ["entry_criteria", "exit_criteria"]);
  validateLabelFile(
    locale,
    "labels.stakeholders.json",
    expectedStakeholderLabels,
    [
      "stakeholder.involvement.lead",
      "stakeholder.involvement.core",
      "stakeholder.involvement.consulted"
    ]
  );
}

for (const locale of Object.keys(localizedCanvasDataJson)) {
  const localizedCanvases = localizedCanvasDataJson[locale] || {};

  for (const [canvasId, canvas] of Object.entries(canvasDataJson)) {
    const localizedCanvas = localizedCanvases[canvasId];
    if (!localizedCanvas) {
      findings.push(`Locale ${locale} is missing canvas localization for "${canvasId}".`);
      continue;
    }

    if (!String(localizedCanvas.title || "").trim()) {
      findings.push(`Locale ${locale} is missing canvas title for "${canvasId}".`);
    }
    if (!String(localizedCanvas.purpose || "").trim()) {
      findings.push(`Locale ${locale} is missing canvas purpose for "${canvasId}".`);
    }
    if (!String(localizedCanvas.howToUse || "").trim()) {
      findings.push(`Locale ${locale} is missing canvas howToUse for "${canvasId}".`);
    }

    for (const section of canvas.sections || []) {
      const localizedSection = localizedCanvas.sections?.[section.id];
      if (!localizedSection) {
        findings.push(`Locale ${locale} is missing section localization for "${canvasId}.${section.id}".`);
        continue;
      }

      if (!String(localizedSection.section || "").trim()) {
        findings.push(`Locale ${locale} is missing section title for "${canvasId}.${section.id}".`);
      }
      if (!String(localizedSection.description || "").trim()) {
        findings.push(`Locale ${locale} is missing section description for "${canvasId}.${section.id}".`);
      }
    }
  }
}

if (findings.length > 0) {
  console.error("Method content validation failed:");
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  process.exit(1);
}

console.log("Method content validation passed.");
