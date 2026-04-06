import { buildCanvasMetadata, buildResourceMetadata, normalizeResourceId } from "apiops-cycles-method-data/method-engine";

function printUsage() {
  console.error("Usage: node scripts/get-method-canvas-metadata.js <resource-id-or-canvas-id> [locale]");
}

const inputId = process.argv[2];
const locale = process.argv[3] || "en";

if (!inputId) {
  printUsage();
  process.exit(1);
}

try {
  const normalizedInputId = normalizeResourceId(inputId);
  let resourceId = null;
  let canvasId = normalizedInputId;

  try {
    const resource = buildResourceMetadata(normalizedInputId, locale);
    resourceId = resource.id;
    if (resource.canvasId) {
      canvasId = resource.canvasId;
    }
  } catch {
    // Treat the input directly as a canvas id when it is not a known resource id.
  }

  const metadata = buildCanvasMetadata(canvasId, locale);
  console.log(JSON.stringify({
    requestedId: inputId,
    resourceId,
    canvasId: metadata.id,
    locale,
    title: metadata.title,
    purpose: metadata.purpose,
    howToUse: metadata.howToUse,
    sections: metadata.sections.map((section) => ({
      id: section.id,
      title: section.title,
      description: section.description
    }))
  }, null, 2));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
