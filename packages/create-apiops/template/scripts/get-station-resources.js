import { DEFAULT_STYLE, buildStationResourceData } from "apiops-cycles-method-data/method-engine";

function printUsage() {
  console.error("Usage: node scripts/get-station-resources.js <station-id> [locale] [style]");
}

const stationId = process.argv[2];
const locale = process.argv[3] || "en";
const style = process.argv[4] || DEFAULT_STYLE;

if (!stationId) {
  printUsage();
  process.exit(1);
}

try {
  const data = buildStationResourceData(stationId, locale, style);
  console.log(JSON.stringify({
    stationId: data.stationId,
    locale,
    style: data.style,
    title: data.stationTitle,
    description: data.stationDescription,
    resources: data.steps.map((step) => ({
      resourceId: step.resourceId,
      step: step.step,
      category: step.category,
      canvasId: step.canvasId,
      title: step.resourceTitle,
      description: step.resourceDescription
    }))
  }, null, 2));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
