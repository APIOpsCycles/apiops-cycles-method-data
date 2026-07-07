import { DEFAULT_CYCLE_ID, buildStartData } from "apiops-cycles-method-data/method-engine";

function printUsage() {
  console.error("Usage: node scripts/get-core-stations.js [locale] [cycle]");
}

const locale = process.argv[2] || "en";
const cycle = process.argv[3] || DEFAULT_CYCLE_ID;

if (process.argv.length > 4) {
  printUsage();
  process.exit(1);
}

try {
  console.log(JSON.stringify(buildStartData(locale, cycle), null, 2));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
