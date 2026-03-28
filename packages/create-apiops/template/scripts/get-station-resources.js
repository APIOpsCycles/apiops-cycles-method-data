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

function printUsage() {
  console.error(
    "Usage: node scripts/get-station-resources.js <station-id> [locale]",
  );
}

const stationId = process.argv[2];
const locale = process.argv[3] || "en";

if (!stationId) {
  printUsage();
  process.exit(1);
}

const stations = readJson(resolveMethodFile("stations.json"));
const labelsPath = resolveMethodFile(locale, "labels.stations.json");
const resourceLabelsPath = resolveMethodFile(locale, "labels.resources.json");
const labels = fs.existsSync(labelsPath) ? readJson(labelsPath) : {};
const resourceLabels = fs.existsSync(resourceLabelsPath)
  ? readJson(resourceLabelsPath)
  : {};
const resources = readJson(resolveMethodFile("resources.json")).resources;

const stationGroups = [
  ...(stations["core-stations"]?.items || []),
  ...(stations["sub-stations"]?.items || []),
];

const station = stationGroups.find((entry) => entry.id === stationId);

if (!station) {
  console.error(`Unknown station id: ${stationId}`);
  process.exit(1);
}

const steps = station.how_it_works || station["how-it-works"] || [];

const output = {
  stationId: station.id,
  locale,
  title: labels[station.title] || station.title,
  description: labels[station.description] || station.description,
  resources: steps
    .filter((step) => step.resource)
    .map((step) => {
      const resource = resources.find((entry) => entry.id === step.resource);
      return {
        resourceId: step.resource,
        step: labels[step.step] || step.step,
        category: resource?.category || "",
        canvasId: resource?.canvas || null,
        title: resource
          ? resourceLabels[resource.title] || resource.title
          : step.resource,
        description: resource
          ? resourceLabels[resource.description] || resource.description
          : "",
      };
    }),
};

console.log(JSON.stringify(output, null, 2));
