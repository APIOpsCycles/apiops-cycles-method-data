import { buildResourceMetadata, normalizeResourceId } from "apiops-cycles-method-data/method-engine";

function printUsage() {
  console.error("Usage: node scripts/get-resource-metadata.js <resource-id> [locale]");
}

const inputId = process.argv[2];
const locale = process.argv[3] || "en";

if (!inputId) {
  printUsage();
  process.exit(1);
}

try {
  const metadata = buildResourceMetadata(normalizeResourceId(inputId), locale);
  console.log(JSON.stringify(metadata, null, 2));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
