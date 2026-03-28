import fs from "fs";
import path from "path";

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function resolveMethodData(...parts) {
  return path.resolve(
    process.cwd(),
    "node_modules",
    "apiops-cycles-method-data",
    "src",
    "data",
    ...parts,
  );
}

function printUsage() {
  console.error(
    "Usage: node scripts/get-method-canvas-metadata.js <resource-id-or-canvas-id> [locale]",
  );
}

const inputId = process.argv[2];
const locale = process.argv[3] || "en";

if (!inputId) {
  printUsage();
  process.exit(1);
}

const resources = readJson(resolveMethodData("method", "resources.json")).resources;
const canvasData = readJson(resolveMethodData("canvas", "canvasData.json"));
const localizedData = readJson(resolveMethodData("canvas", "localizedData.json"));
const legacyAliases = new Map([
  ["domain-canvas", "domainCanvas"],
  ["api-business-model-canvas", "apiBusinessModelCanvas"],
  ["api-value-proposition-canvas", "apiValuePropositionCanvas"],
  ["business-impact-canvas", "businessImpactCanvas"],
  ["capacity-canvas", "capacityCanvas"],
  ["customer-journey-canvas", "customerJourneyCanvas"],
  ["event-canvas", "eventCanvas"],
  ["graphql-canvas", "graphqlCanvas"],
  ["interaction-canvas", "interactionCanvas"],
  ["location-canvas", "locationsCanvas"],
  ["rest-canvas", "restCanvas"],
]);

const normalizedInputId = legacyAliases.get(inputId) || inputId;
const resource = resources.find((entry) => entry.id === normalizedInputId);
const canvasId = resource && resource.canvas ? resource.canvas : normalizedInputId;
const base = canvasData[canvasId];
const localized = (localizedData[locale] && localizedData[locale][canvasId]) || null;

if (!base) {
  console.error(`Unknown canvas or resource id: ${inputId}`);
  process.exit(1);
}

const output = {
  requestedId: inputId,
  resourceId: resource ? resource.id : null,
  canvasId,
  locale,
  title: localized && localized.title,
  purpose: localized && localized.purpose,
  howToUse: localized && localized.howToUse,
  sections: base.sections.map((section) => ({
    id: section.id,
    title:
      localized && localized.sections && localized.sections[section.id]
        ? localized.sections[section.id].section
        : section.id,
    description:
      localized && localized.sections && localized.sections[section.id]
        ? localized.sections[section.id].description
        : "",
  })),
};

console.log(JSON.stringify(output, null, 2));
