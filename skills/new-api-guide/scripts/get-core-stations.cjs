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

const locale = process.argv[2] || "en";
const stationsPath = resolveMethodFile("stations.json");
const labelsPath = resolveMethodFile(locale, "labels.stations.json");

const stations = readJson(stationsPath);
const labels = fs.existsSync(labelsPath) ? readJson(labelsPath) : {};
const coreStations = (stations["core-stations"] && stations["core-stations"].items) || [];

const output = coreStations
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((station) => ({
    id: station.id,
    order: station.order,
    slug: station.slug,
    title: labels[station.title] || station.title,
    description: labels[station.description] || station.description,
    resources: (station.how_it_works || station["how-it-works"] || []).map((step) => ({
      resource: step.resource,
      step: labels[step.step] || step.step,
    })),
  }));

console.log(JSON.stringify(output, null, 2));
