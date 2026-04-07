#!/usr/bin/env node
import { main } from "../packages/create-apiops/bin/method-cli.js";

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
