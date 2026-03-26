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

function resolveSnippetPath(snippet, locale) {
  const base = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "src",
    "snippets",
  );
  const localized = path.join(base, locale, snippet);
  return fs.existsSync(localized) ? localized : path.join(base, snippet);
}

const resourceId = process.argv[2];
const locale = process.argv[3] || "en";

if (!resourceId) {
  console.error("Usage: node skills/new-api-guide/scripts/get-resource-metadata.cjs <resource-id> [locale]");
  process.exit(1);
}

const resources = readJson(resolveMethodFile("resources.json")).resources;
const labels = readJson(resolveMethodFile(locale, "labels.resources.json"));
const resource = resources.find((entry) => entry.id === resourceId);

if (!resource) {
  console.error(`Unknown resource id: ${resourceId}`);
  process.exit(1);
}

const output = {
  id: resource.id,
  category: resource.category || "",
  title: labels[resource.title] || resource.title,
  description: labels[resource.description] || resource.description,
  snippet: resource.snippet || null,
  snippetPath: resource.snippet ? resolveSnippetPath(resource.snippet, locale) : null,
  steps: ((resource.how_it_works && resource.how_it_works.steps) || []).map((step) => (
    labels[step] || step
  )),
  tips: ((resource.how_it_works && resource.how_it_works.tips) || []).map((tip) => (
    labels[tip] || tip
  )),
};

console.log(JSON.stringify(output, null, 2));
