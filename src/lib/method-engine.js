import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..");

export const DEFAULT_LOCALE = "en";
export const DEFAULT_OUTPUT_DIR = "specs/canvases";
export const DEFAULT_STYLE = "Not sure yet";
export const DEFAULT_NOTE_COLOR = "#FFF399";
export const DEFAULT_NOTE_SIZE = 80;
export const CANVAS_CREATOR_BASE_URL = "https://canvascreator.apiopscycles.com/";
export const NEW_API_STATIONS = ["api-product-strategy", "api-platform-architecture", "api-design"];
export const STYLE_CANVAS_RESOURCES = new Map([
  ["REST", "rest-canvas"],
  ["Event", "event-canvas"],
  ["GraphQL", "graphql-canvas"]
]);
export const SHARED_DESIGN_CANVAS_RESOURCES = new Set([
  "domain-canvas",
  "interaction-canvas"
]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function resolveMethodFile(...parts) {
  return path.join(repoRoot, "src", "data", "method", ...parts);
}

function resolveCanvasFile(...parts) {
  return path.join(repoRoot, "src", "data", "canvas", ...parts);
}

function getLocalizedLabels(locale, category) {
  const preferred = resolveMethodFile(locale, `labels.${category}.json`);
  if (fs.existsSync(preferred)) {
    return readJson(preferred);
  }

  if (locale !== DEFAULT_LOCALE) {
    const fallback = resolveMethodFile(DEFAULT_LOCALE, `labels.${category}.json`);
    if (fs.existsSync(fallback)) {
      return readJson(fallback);
    }
  }

  return {};
}

function getStationSteps(station) {
  return station.how_it_works || station["how-it-works"] || [];
}

export function normalizeStyle(style) {
  const value = String(style || "").trim().toLowerCase();
  const map = {
    rest: "REST",
    event: "Event",
    graphql: "GraphQL",
    "not sure yet": "Not sure yet",
    unsure: "Not sure yet",
    unknown: "Not sure yet"
  };

  return map[value] || style || DEFAULT_STYLE;
}

export function getCoreStations() {
  const stations = readJson(resolveMethodFile("stations.json"));
  return ((stations["core-stations"] && stations["core-stations"].items) || [])
    .slice()
    .sort((left, right) => left.order - right.order);
}

export function getStationCriteriaMap() {
  return readJson(resolveMethodFile("station-criteria.json"));
}

export function getResources() {
  return readJson(resolveMethodFile("resources.json")).resources || [];
}

export function getCanvasData() {
  return readJson(resolveCanvasFile("canvasData.json"));
}

export function getLocalizedCanvasData(locale) {
  const localized = readJson(resolveCanvasFile("localizedData.json"));
  return localized[locale] || localized[DEFAULT_LOCALE] || {};
}

function translate(labelKey, labels) {
  return labels[labelKey] || labelKey;
}

export function buildStartData(locale = DEFAULT_LOCALE) {
  const stations = getCoreStations();
  const stationLabels = getLocalizedLabels(locale, "stations");
  const criteriaLabels = getLocalizedLabels(locale, "criteria");
  const stationCriteriaMap = getStationCriteriaMap();

  return stations.map((station, index) => ({
    id: station.id,
    order: station.order,
    slug: station.slug,
    title: translate(station.title, stationLabels),
    description: translate(station.description, stationLabels),
    suggestedForNewApi: index === 0,
    criteria: (stationCriteriaMap[station.id] || []).map((criterionId) => ({
      id: criterionId,
      label: translate(`criterion.${criterionId}`, criteriaLabels)
    }))
  }));
}

export function buildCriteriaChecklist(startData) {
  const seen = new Set();
  const checklist = [];

  for (const station of startData) {
    for (const criterion of station.criteria) {
      if (seen.has(criterion.id)) {
        continue;
      }
      seen.add(criterion.id);
      checklist.push({
        ...criterion,
        stationIds: startData
          .filter((entry) => entry.criteria.some((item) => item.id === criterion.id))
          .map((entry) => entry.id)
      });
    }
  }

  return checklist;
}

export function normalizeAnswer(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (["y", "yes", "met", "true"].includes(normalized)) {
    return "met";
  }
  if (["n", "no", "not-met", "false"].includes(normalized)) {
    return "not-met";
  }
  if (["skip", "unknown", "unsure", "?"].includes(normalized)) {
    return "unknown";
  }
  return null;
}

export function evaluateStartRecommendation(startData, answers) {
  const stationChecks = startData.map((station) => {
    const unmetCriteria = station.criteria.filter((criterion) => answers[criterion.id] !== "met");
    return {
      id: station.id,
      title: station.title,
      unmetCriteria
    };
  });

  const recommendedStation = stationChecks.find((station) => station.unmetCriteria.length > 0) || stationChecks.at(-1);
  return {
    recommendedStation,
    stationChecks
  };
}

export function buildResourceCatalog(locale = DEFAULT_LOCALE) {
  const resources = getResources();
  const resourceLabels = getLocalizedLabels(locale, "resources");

  return new Map(resources.map((resource) => [
    resource.id,
    {
      ...resource,
      titleText: translate(resource.title, resourceLabels),
      descriptionText: translate(resource.description, resourceLabels)
    }
  ]));
}

export function buildResourceMetadata(resourceId, locale = DEFAULT_LOCALE) {
  const resourceCatalog = buildResourceCatalog(locale);
  const resourceLabels = getLocalizedLabels(locale, "resources");
  const resource = resourceCatalog.get(resourceId);

  if (!resource) {
    throw new Error(`Unknown resource id: ${resourceId}`);
  }

  return {
    id: resource.id,
    title: resource.titleText,
    description: resource.descriptionText,
    category: resource.category || "",
    snippet: resource.snippet || null,
    canvasId: resource.canvas || null,
    steps: ((resource.how_it_works && resource.how_it_works.steps) || []).map((step) => translate(step, resourceLabels)),
    tips: ((resource.how_it_works && resource.how_it_works.tips) || []).map((tip) => translate(tip, resourceLabels))
  };
}

export function buildCanvasMetadata(canvasId, locale = DEFAULT_LOCALE) {
  const canvasData = getCanvasData();
  const localizedCanvasData = getLocalizedCanvasData(locale);
  const canvas = canvasData[canvasId];
  const localized = localizedCanvasData[canvasId] || {};

  if (!canvas) {
    throw new Error(`Unknown canvas id: ${canvasId}`);
  }

  return {
    id: canvasId,
    title: localized.title || canvasId,
    purpose: localized.purpose || "",
    howToUse: localized.howToUse || "",
    sections: canvas.sections.map((section) => ({
      id: section.id,
      title: localized.sections?.[section.id]?.section || section.id,
      description: localized.sections?.[section.id]?.description || ""
    }))
  };
}

export function shouldIncludeResourceForStyle(resourceId, stationId, style) {
  if (stationId !== "api-design") {
    return true;
  }

  if (SHARED_DESIGN_CANVAS_RESOURCES.has(resourceId)) {
    return true;
  }

  if (!STYLE_CANVAS_RESOURCES.has(style)) {
    return !["rest-canvas", "event-canvas", "graphql-canvas"].includes(resourceId);
  }

  const selectedResourceId = STYLE_CANVAS_RESOURCES.get(style);
  if (resourceId === selectedResourceId) {
    return true;
  }

  return !["rest-canvas", "event-canvas", "graphql-canvas"].includes(resourceId);
}

export function buildStationResourceData(stationId, locale = DEFAULT_LOCALE, style = DEFAULT_STYLE) {
  const stations = getCoreStations();
  const resources = getResources();
  const stationLabels = getLocalizedLabels(locale, "stations");
  const resourceLabels = getLocalizedLabels(locale, "resources");
  const station = stations.find((entry) => entry.id === stationId);

  if (!station) {
    throw new Error(`Unknown station id: ${stationId}`);
  }

  const steps = getStationSteps(station)
    .filter((step) => step.resource)
    .filter((step) => shouldIncludeResourceForStyle(step.resource, stationId, style))
    .map((step, index) => {
      const resource = resources.find((entry) => entry.id === step.resource);
      if (!resource) {
        return {
          order: index + 1,
          step: translate(step.step, stationLabels),
          resourceId: step.resource,
          missing: true
        };
      }

      return {
        order: index + 1,
        step: translate(step.step, stationLabels),
        resourceId: resource.id,
        resourceTitle: translate(resource.title, resourceLabels),
        resourceDescription: translate(resource.description, resourceLabels),
        category: resource.category || "",
        canvasId: resource.canvas || null,
        snippet: resource.snippet || null,
        slug: resource.slug
      };
    });

  return {
    stationId: station.id,
    stationTitle: translate(station.title, stationLabels),
    stationDescription: translate(station.description, stationLabels),
    style,
    steps
  };
}

export function toSlug(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function sanitizeFileSlug(value, fallback) {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || fallback;
}

export function buildCanvasTemplate(canvasId, locale = DEFAULT_LOCALE) {
  const canvasData = getCanvasData();
  const template = canvasData[canvasId];

  if (!template) {
    throw new Error(`Unknown canvas id: ${canvasId}`);
  }

  const metadata = {
    ...(template.metadata || {}),
    date: new Date().toISOString()
  };

  return {
    templateId: canvasId,
    locale,
    metadata,
    sections: template.sections.map((section) => ({
      sectionId: section.id,
      stickyNotes: []
    }))
  };
}

export function generateCanvasForStationResource(stationId, resourceId, locale = DEFAULT_LOCALE, output = DEFAULT_OUTPUT_DIR) {
  const resource = getResources().find((entry) => entry.id === resourceId);
  if (!resource || resource.category !== "canvas" || !resource.canvas) {
    throw new Error(`Resource ${resourceId} is not a canvas resource.`);
  }

  const outputRoot = path.resolve(process.cwd(), output);
  const stationDir = path.join(outputRoot, toSlug(stationId));
  const outPath = path.join(stationDir, `${resource.id}.empty.json`);

  if (!fs.existsSync(outPath)) {
    const template = buildCanvasTemplate(resource.canvas, locale);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, `${JSON.stringify(template, null, 2)}\n`);
  }

  return outPath;
}

export function getCanvasCreatorUrl(canvasId, locale = DEFAULT_LOCALE) {
  return `${CANVAS_CREATOR_BASE_URL}?canvas=${encodeURIComponent(canvasId)}&locale=${encodeURIComponent(locale)}`;
}

export function resolveStationIds(options = {}) {
  if (options.station) {
    return [options.station];
  }

  if (options.stations) {
    return options.stations
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  if (!options.preset || options.preset === "new-api") {
    return NEW_API_STATIONS;
  }

  throw new Error(`Unknown preset: ${options.preset}`);
}

export function generateCanvases(options = {}) {
  const locale = options.locale || DEFAULT_LOCALE;
  const style = normalizeStyle(options.style || DEFAULT_STYLE);
  const outputRoot = path.resolve(process.cwd(), options.output || DEFAULT_OUTPUT_DIR);
  const resources = getResources();
  const generated = [];
  const skipped = [];
  const seenResourceIds = new Set();

  for (const stationId of resolveStationIds(options)) {
    const stationResources = buildStationResourceData(stationId, locale, style);
    const canvasResources = stationResources.steps
      .map((step) => resources.find((resource) => resource.id === step.resourceId))
      .filter((resource) => resource && resource.category === "canvas");

    for (const resource of canvasResources) {
      if (seenResourceIds.has(resource.id)) {
        continue;
      }
      seenResourceIds.add(resource.id);

      const template = buildCanvasTemplate(resource.canvas, locale);
      const stationDir = path.join(outputRoot, toSlug(stationId));
      const outPath = path.join(stationDir, `${resource.id}.empty.json`);

      if (fs.existsSync(outPath) && !options.force) {
        skipped.push({
          stationId,
          resourceId: resource.id,
          file: outPath
        });
        continue;
      }

      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, `${JSON.stringify(template, null, 2)}\n`);
      generated.push({
        stationId,
        resourceId: resource.id,
        canvasId: resource.canvas,
        file: outPath
      });
    }
  }

  return {
    locale,
    style,
    outputRoot,
    generated,
    skipped
  };
}
