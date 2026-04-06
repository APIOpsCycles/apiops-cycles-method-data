import { buildStartData } from "apiops-cycles-method-data/method-engine";

function printUsage() {
  console.error("Usage: node scripts/get-core-stations.js [locale]");
}

const locale = process.argv[2] || "en";

if (process.argv.length > 3) {
  printUsage();
  process.exit(1);
}

try {
  console.log(JSON.stringify(buildStartData(locale), null, 2));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
