#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function resolveCanvasFile(fileName) {
  return path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "src",
    "data",
    "canvas",
    fileName,
  );
}

const canvasId = process.argv[2];
const locale = process.argv[3] || "en";

if (!canvasId) {
  console.error("Usage: node skills/new-api-guide/scripts/get-canvas-metadata.cjs <canvas-id> [locale]");
  process.exit(1);
}

const canvasData = readJson(resolveCanvasFile("canvasData.json"));
const localizedData = readJson(resolveCanvasFile("localizedData.json"));

const base = canvasData[canvasId];
const localized = (localizedData[locale] && localizedData[locale][canvasId]) || null;

if (!base) {
  console.error(`Unknown canvas id: ${canvasId}`);
  process.exit(1);
}

const output = {
  id: canvasId,
  locale,
  title: localized && localized.title,
  purpose: localized && localized.purpose,
  howToUse: localized && localized.howToUse,
  sections: base.sections.map((section) => ({
    id: section.id,
    title: localized && localized.sections && localized.sections[section.id]
      ? localized.sections[section.id].section
      : section.id,
    description: localized && localized.sections && localized.sections[section.id]
      ? localized.sections[section.id].description
      : "",
  })),
};

console.log(JSON.stringify(output, null, 2));
