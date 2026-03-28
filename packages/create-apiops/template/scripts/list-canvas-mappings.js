import fs from "fs";
import path from "path";

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

const resourcesPath = path.resolve(
  process.cwd(),
  "node_modules",
  "apiops-cycles-method-data",
  "src",
  "data",
  "method",
  "resources.json",
);

const resources = readJson(resourcesPath).resources;

const mappings = resources
  .filter((resource) => resource.category === "canvas" && resource.canvas)
  .map((resource) => ({
    resourceId: resource.id,
    canvasId: resource.canvas,
  }))
  .sort((left, right) => left.resourceId.localeCompare(right.resourceId));

console.log(JSON.stringify(mappings, null, 2));
