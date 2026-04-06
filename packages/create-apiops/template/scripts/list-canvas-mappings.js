import { getResources } from "apiops-cycles-method-data/method-engine";

const mappings = getResources()
  .filter((resource) => resource.category === "canvas" && resource.canvas)
  .map((resource) => ({
    resourceId: resource.id,
    canvasId: resource.canvas
  }))
  .sort((left, right) => left.resourceId.localeCompare(right.resourceId));

console.log(JSON.stringify(mappings, null, 2));
