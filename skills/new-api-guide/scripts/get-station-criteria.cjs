#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function resolveMethodFile(...parts) {
  return path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "src",
    "data",
    "method",
    ...parts,
  );
}

const stationId = process.argv[2];
const locale = process.argv[3] || "en";

if (!stationId) {
  console.error("Usage: node skills/new-api-guide/scripts/get-station-criteria.cjs <station-id> [locale]");
  process.exit(1);
}

const criteriaPath = resolveMethodFile("station-criteria.json");
const labelsPath = resolveMethodFile(locale, "labels.criteria.json");

const criteria = readJson(criteriaPath);
const labels = fs.existsSync(labelsPath) ? readJson(labelsPath) : {};
const stationCriteria = criteria[stationId];

if (!stationCriteria) {
  console.error(`Unknown station id: ${stationId}`);
  process.exit(1);
}

const output = {
  stationId,
  criteria: stationCriteria.map((criterionId) => ({
    id: criterionId,
    label: labels[`criterion.${criterionId}`] || criterionId,
  })),
};

console.log(JSON.stringify(output, null, 2));
