import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..");

export const DEFAULT_LOCALE = "en";
export const DEFAULT_OUTPUT_DIR = "specs/canvases";
export const DEFAULT_STYLE = "Not sure yet";
export const DEFAULT_NOTE_SIZE = 80;
export const NOTE_COLOR_PALETTE = Object.freeze({
  benefit: "#C0EB6A",
  neutral: "#DFDDC5",
  negative: "#FFAFAF",
  task: "#7DC9E7",
  default: "#FFF399"
});
export const DEFAULT_NOTE_INTENT = "default";
export const DEFAULT_NOTE_COLOR = NOTE_COLOR_PALETTE.default;
export const CANVAS_CREATOR_BASE_URL = "https://canvascreator.apiopscycles.com/";
export const LIFECYCLE_STAGES = Object.freeze([
  { id: "strategy", title: "Strategy", order: 1 },
  { id: "architecture", title: "Architecture", order: 2 },
  { id: "design", title: "Design", order: 3 },
  { id: "delivery", title: "Delivery", order: 4 },
  { id: "publishing", title: "Publishing", order: 5 },
  { id: "improving", title: "Improving", order: 6 }
]);
export const NEW_API_STATIONS = ["api-product-strategy", "api-platform-architecture", "api-design"];
export const NOTE_INTENT_ALIASES = new Map([
  ["benefit", "benefit"],
  ["benefits", "benefit"],
  ["gain", "benefit"],
  ["gains", "benefit"],
  ["positive", "benefit"],
  ["new", "benefit"],
  ["neutral", "neutral"],
  ["technical", "neutral"],
  ["tech", "neutral"],
  ["negative", "negative"],
  ["neg", "negative"],
  ["con", "negative"],
  ["cons", "negative"],
  ["risk", "negative"],
  ["risks", "negative"],
  ["pain", "negative"],
  ["pains", "negative"],
  ["task", "task"],
  ["tasks", "task"],
  ["journey", "task"],
  ["step", "task"],
  ["steps", "task"],
  ["default", "default"],
  ["generic", "default"]
]);
export const CANVAS_SECTION_NOTE_INTENTS = Object.freeze({
  apiBusinessModelCanvas: {
    keyPartners: "neutral",
    keyActivities: "task",
    keyResources: "neutral",
    apiValueProposition: "benefit",
    developerRelations: "neutral",
    channels: "task",
    apiConsumerSegments: "neutral",
    costs: "negative",
    benefits: "benefit"
  },
  apiValuePropositionCanvas: {
    tasks: "task",
    gainEnablingFeatures: "benefit",
    painRelievingFeatures: "benefit",
    apiProducts: "neutral"
  },
  capabilityValuePropositionCanvas: {
    consumerTasks: "task",
    gainEnablingCapabilities: "benefit",
    painRelievingCapabilities: "benefit",
    reusableCapabilities: "neutral"
  },
  capabilityBusinessModelCanvas: {
    keyPartners: "neutral",
    keyActivities: "task",
    keyResources: "neutral",
    capabilityValueProposition: "benefit",
    consumerEngagement: "neutral",
    channels: "task",
    capabilityConsumerSegments: "neutral",
    costs: "negative",
    benefits: "benefit"
  },
  consumerExperienceRequirementsCanvas: {
    consumerGoals: "benefit",
    availabilityAndTimeliness: "neutral",
    volumeAndPerformance: "neutral",
    dataQualityAndConsistency: "neutral",
    securityPrivacyAndCompliance: "negative",
    onboardingAndAccess: "task",
    changeAndVersioning: "negative",
    observabilityAndSupport: "task",
    recoveryAndContinuity: "task",
    architectureImplications: "neutral"
  },
  businessImpactCanvas: {
    availabilityRisks: "negative",
    securityRisks: "negative",
    dataRisks: "negative",
    mitigateAvailabilityRisks: "task",
    mitigateSecurityRisks: "task",
    mitigateDataRisks: "task"
  },
  capacityCanvas: {
    currentBusinessVolumes: "neutral",
    futureConsumptionTrends: "neutral",
    peakLoadAndAvailabilityRequirements: "neutral",
    cachingStrategies: "task",
    rateLimitingStrategies: "task",
    scalingStrategies: "task"
  },
  customerJourneyCanvas: {
    customerDiscoversNeed: "neutral",
    persona: "neutral",
    pains: "negative",
    journeySteps: "task",
    customerNeedIsResolved: "benefit",
    gains: "benefit",
    inputsOutputs: "neutral",
    interactionProcessingRules: "neutral"
  },
  domainCanvas: {
    selectedCustomerJourneySteps: "task",
    coreEntitiesAndBusinessMeaning: "neutral",
    attributesAndBusinessImportance: "neutral",
    relationshipsBetweenEntities: "neutral",
    businessComplianceAndIntegrityRules: "neutral",
    securityAndPrivacyConsiderations: "negative"
  },
  eventCanvas: {
    userTaskTrigger: "task",
    inputEventPayload: "neutral",
    processingLogic: "neutral",
    outputEventResult: "benefit"
  },
  interactionCanvas: {
    crudInteractions: "task",
    crudInputOutputModels: "neutral",
    crudProcessingValidation: "neutral",
    queryDrivenInteractions: "task",
    queryDrivenInputOutputModels: "neutral",
    queryDrivenProcessingValidation: "neutral",
    commandDrivenInteractions: "task",
    commandDrivenInputOutputModels: "neutral",
    commandDrivenProcessingValidation: "neutral",
    eventDrivenInteractions: "task",
    eventDrivenInputOutputModels: "neutral",
    eventDrivenProcessingValidation: "neutral"
  },
  locationsCanvas: {
    locationGroups: "neutral",
    locationGroupCharacteristics: "neutral",
    locations: "neutral",
    locationCharacteristics: "neutral",
    locationDistances: "negative",
    locationDistanceCharacteristics: "neutral",
    locationEndpoints: "neutral",
    locationEndpointCharacteristics: "neutral"
  },
  restCanvas: {
    apiResources: "neutral",
    apiResourceModel: "neutral",
    apiVerbs: "task",
    apiVerbExample: "task"
  },
  graphqlCanvas: {
    apiName: "default",
    consumerGoals: "benefit",
    keyTypes: "neutral",
    relationships: "neutral",
    queries: "task",
    mutations: "task",
    subscriptions: "task",
    authorizationRules: "negative",
    consumerConstraints: "negative",
    openQuestions: "default"
  }
});
export const LEGACY_CANVAS_RESOURCE_ALIASES = new Map([
  ["domain-canvas", "domainCanvas"],
  ["api-business-model-canvas", "apiBusinessModelCanvas"],
  ["api-value-proposition-canvas", "apiValuePropositionCanvas"],
  ["business-impact-canvas", "businessImpactCanvas"],
  ["capacity-canvas", "capacityCanvas"],
  ["customer-journey-canvas", "customerJourneyCanvas"],
  ["event-canvas", "eventCanvas"],
  ["graphql-canvas", "graphqlCanvas"],
  ["interaction-canvas", "interactionCanvas"],
  ["location-canvas", "locationsCanvas"],
  ["rest-canvas", "restCanvas"]
]);
export const STYLE_CANVAS_RESOURCES = new Map([
  ["REST", "restCanvas"],
  ["Event", "eventCanvas"],
  ["GraphQL", "graphqlCanvas"]
]);
export const SHARED_DESIGN_CANVAS_RESOURCES = new Set([
  "domainCanvas",
  "interactionCanvas"
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
  const fallback = resolveMethodFile(DEFAULT_LOCALE, `labels.${category}.json`);
  const preferred = resolveMethodFile(locale, `labels.${category}.json`);
  const fallbackLabels = fs.existsSync(fallback) ? readJson(fallback) : {};
  if (locale === DEFAULT_LOCALE) {
    return fallbackLabels;
  }

  const preferredLabels = fs.existsSync(preferred) ? readJson(preferred) : {};
  return {
    ...fallbackLabels,
    ...preferredLabels
  };
}

function getStationSteps(station) {
  return station.how_it_works || station["how-it-works"] || [];
}

function isHexColor(value) {
  return /^#[0-9A-F]{6}$/i.test(String(value || "").trim());
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

export function getStations() {
  const stations = readJson(resolveMethodFile("stations.json"));
  return Object.values(stations)
    .flatMap((group) => group.items || [])
    .slice()
    .sort((left, right) => left.order - right.order);
}

export function getLifecycleStages() {
  return LIFECYCLE_STAGES.slice();
}

export function getSupportedMethodLocales() {
  if (!fs.existsSync(resolveMethodFile())) {
    return [DEFAULT_LOCALE];
  }

  const locales = fs.readdirSync(resolveMethodFile(), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((locale) => fs.existsSync(resolveMethodFile(locale, "labels.stations.json")));

  if (!locales.includes(DEFAULT_LOCALE)) {
    locales.unshift(DEFAULT_LOCALE);
  }

  return locales
    .slice()
    .sort((left, right) => {
      if (left === DEFAULT_LOCALE) {
        return -1;
      }
      if (right === DEFAULT_LOCALE) {
        return 1;
      }
      return left.localeCompare(right);
    });
}

export function getStationCriteriaMap() {
  return readJson(resolveMethodFile("station-criteria.json"));
}

export function getIntegrationExtension() {
  return readJson(resolveMethodFile("integration-extension.json"));
}

export function getStakeholders() {
  return readJson(resolveMethodFile("stakeholders.json")).stakeholders || [];
}

export function getStationStakeholderMap() {
  return readJson(resolveMethodFile("station-stakeholders.json"));
}

export function getResources() {
  return readJson(resolveMethodFile("resources.json")).resources || [];
}

export function getLines() {
  return readJson(resolveMethodFile("lines.json")).lines?.items || [];
}

export function normalizeResourceId(resourceId) {
  const normalized = String(resourceId || "").trim();
  return LEGACY_CANVAS_RESOURCE_ALIASES.get(normalized) || normalized;
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

export function buildStakeholderCatalog(locale = DEFAULT_LOCALE) {
  const stakeholderLabels = getLocalizedLabels(locale, "stakeholders");
  return new Map(getStakeholders().map((stakeholder) => [
    stakeholder.id,
    {
      id: stakeholder.id,
      title: translate(stakeholder.title, stakeholderLabels),
      description: translate(stakeholder.description, stakeholderLabels)
    }
  ]));
}

export function buildStationStakeholderData(stationId, locale = DEFAULT_LOCALE) {
  const stakeholderCatalog = buildStakeholderCatalog(locale);
  const stakeholderLabels = getLocalizedLabels(locale, "stakeholders");
  const stationStakeholderMap = getStationStakeholderMap();
  const entries = stationStakeholderMap[stationId];

  if (!entries) {
    throw new Error(`Unknown station stakeholder mapping: ${stationId}`);
  }

  return entries.map((entry) => {
    const stakeholder = stakeholderCatalog.get(entry.stakeholder);
    if (!stakeholder) {
      throw new Error(`Unknown stakeholder id: ${entry.stakeholder}`);
    }

    return {
      ...stakeholder,
      involvement: entry.involvement,
      involvementLabel: translate(`stakeholder.involvement.${entry.involvement}`, stakeholderLabels)
    };
  });
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
    stakeholders: buildStationStakeholderData(station.id, locale),
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

export function normalizeNoteIntent(intent) {
  const normalized = String(intent || "").trim().toLowerCase();
  return NOTE_INTENT_ALIASES.get(normalized) || null;
}

export function getNoteColorPalette() {
  return { ...NOTE_COLOR_PALETTE };
}

export function getDefaultNoteIntentForSection(canvasId, sectionId) {
  return CANVAS_SECTION_NOTE_INTENTS[canvasId]?.[sectionId] || DEFAULT_NOTE_INTENT;
}

export function getDefaultNoteColorForSection(canvasId, sectionId) {
  return NOTE_COLOR_PALETTE[getDefaultNoteIntentForSection(canvasId, sectionId)] || DEFAULT_NOTE_COLOR;
}

export function resolveNoteColor(value, fallbackIntent = DEFAULT_NOTE_INTENT) {
  const raw = String(value || "").trim();
  if (!raw) {
    return NOTE_COLOR_PALETTE[fallbackIntent] || DEFAULT_NOTE_COLOR;
  }

  if (isHexColor(raw)) {
    return raw.toUpperCase();
  }

  const normalizedIntent = normalizeNoteIntent(raw);
  if (normalizedIntent) {
    return NOTE_COLOR_PALETTE[normalizedIntent];
  }

  throw new Error(`Unknown note color or intent: ${value}`);
}

export function buildStickyNote(content, options = {}) {
  const noteContent = String(content || "").trim();
  if (!noteContent) {
    throw new Error("Sticky note content cannot be empty.");
  }

  const fallbackIntent = getDefaultNoteIntentForSection(options.canvasId, options.sectionId);
  const intent = normalizeNoteIntent(options.intent) || fallbackIntent;
  const color = options.color
    ? resolveNoteColor(options.color, intent)
    : NOTE_COLOR_PALETTE[intent] || DEFAULT_NOTE_COLOR;

  return {
    content: noteContent,
    size: options.size || DEFAULT_NOTE_SIZE,
    color
  };
}

export function parseStickyNoteInput(raw, options = {}) {
  const input = String(raw || "").trim();
  if (!input) {
    throw new Error("Sticky note input cannot be empty.");
  }

  let remainder = input;
  let explicitIntent = null;
  let explicitColor = null;
  let match = remainder.match(/^\[(.+?)\]\s*/);

  while (match) {
    const token = match[1].trim();
    const colorMatch = token.match(/^color\s*=\s*(#?[0-9A-Fa-f]{6})$/);
    if (colorMatch) {
      const hex = colorMatch[1].startsWith("#") ? colorMatch[1] : `#${colorMatch[1]}`;
      explicitColor = resolveNoteColor(hex, options.defaultIntent);
    } else {
      const intent = normalizeNoteIntent(token);
      if (!intent) {
        throw new Error(`Unknown sticky note tag: ${token}`);
      }
      explicitIntent = intent;
    }

    remainder = remainder.slice(match[0].length).trim();
    match = remainder.match(/^\[(.+?)\]\s*/);
  }

  return buildStickyNote(remainder, {
    ...options,
    intent: explicitIntent || options.intent,
    color: explicitColor || options.color
  });
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
  const normalizedResourceId = normalizeResourceId(resourceId);
  const resource = resourceCatalog.get(normalizedResourceId);

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
      description: localized.sections?.[section.id]?.description || "",
      defaultNoteIntent: getDefaultNoteIntentForSection(canvasId, section.id),
      defaultNoteColor: getDefaultNoteColorForSection(canvasId, section.id)
    }))
  };
}

export function shouldIncludeResourceForStyle(resourceId, stationId, style) {
  const normalizedResourceId = normalizeResourceId(resourceId);
  if (stationId !== "api-design") {
    return true;
  }

  if (SHARED_DESIGN_CANVAS_RESOURCES.has(normalizedResourceId)) {
    return true;
  }

  if (!STYLE_CANVAS_RESOURCES.has(style)) {
    return !["restCanvas", "eventCanvas", "graphqlCanvas"].includes(normalizedResourceId);
  }

  const selectedResourceId = STYLE_CANVAS_RESOURCES.get(style);
  if (normalizedResourceId === selectedResourceId) {
    return true;
  }

  return !["restCanvas", "eventCanvas", "graphqlCanvas"].includes(normalizedResourceId);
}

export function buildStationResourceData(stationId, locale = DEFAULT_LOCALE, style = DEFAULT_STYLE) {
  const stations = getStations();
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
      const normalizedResourceId = normalizeResourceId(step.resource);
      const resource = resources.find((entry) => entry.id === normalizedResourceId);
      if (!resource) {
        return {
          order: index + 1,
          step: translate(step.step, stationLabels),
          resourceId: normalizedResourceId,
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
    stakeholders: buildStationStakeholderData(station.id, locale),
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
  const normalizedResourceId = normalizeResourceId(resourceId);
  const resource = getResources().find((entry) => entry.id === normalizedResourceId);
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

function formatMarkdownCell(value) {
  return String(value || "")
    .replace(/\r?\n/g, " ")
    .trim();
}

function formatGuidanceList(values) {
  return values
    .map((value) => formatMarkdownCell(value).replace(/[.;:]+$/g, ""))
    .filter(Boolean)
    .join("; ");
}

function isPlaceholderExampleNote(content) {
  const normalized = String(content || "").trim().replace(/\s+/g, " ");
  return !normalized ||
    /^placeholder$/i.test(normalized) ||
    /^double-click on text to edit\. click and select color$/i.test(normalized);
}

function formatExampleNotes(notes) {
  return (notes || [])
    .map((note) => String(note.content || "").trim())
    .filter((content) => !isPlaceholderExampleNote(content))
    .join("; ");
}

function formatExampleAnswer(value) {
  const text = formatMarkdownCell(value);
  return text ? `_Example: ${text}_` : "";
}

function renderConfluencePasteTableRow(values) {
  return `| ${values.map((value) => formatMarkdownCell(value)).join(" | ")} |`;
}

function renderConfluenceWikiHeaderRow(values) {
  return `|| ${values.map((value) => formatMarkdownCell(value)).join(" || ")} ||`;
}

function renderConfluenceWikiRow(values) {
  return `| ${values.map((value) => formatMarkdownCell(value)).join(" | ")} |`;
}

function buildStationCanvasGroups(canvasRows) {
  const groups = [];
  const groupsByStation = new Map();

  for (const row of canvasRows) {
    const stationKey = row.stationTitle || "Requirements";
    let group = groupsByStation.get(stationKey);
    if (!group) {
      group = {
        stationTitle: stationKey,
        stationDescription: row.stationDescription || "",
        stationWhyItMatters: row.stationWhyItMatters || "",
        canvasRows: []
      };
      groupsByStation.set(stationKey, group);
      groups.push(group);
    }

    group.canvasRows.push(row);
  }

  return groups;
}

function findCanvasResource(canvasId) {
  return getResources().find((resource) => resource.canvas === canvasId) || null;
}

function findCanvasStationContext(canvasId, resourceId, stationPath, stationOverlays) {
  const overlay = stationOverlays.find((entry) => {
    const reuse = entry.reuse || [];
    const alternatives = entry.alternativeResources || [];
    return reuse.includes(canvasId) ||
      reuse.includes(resourceId) ||
      alternatives.includes(canvasId) ||
      alternatives.includes(resourceId);
  });

  if (!overlay) {
    return null;
  }

  return stationPath.find((station) => station.id === overlay.station) || null;
}

function getDocumentCanvasStationContext(canvasId, resourceId, extension, stationPath) {
  const explicitStationId = extension.documentCanvasStations?.[canvasId] || extension.documentCanvasStations?.[resourceId];
  if (explicitStationId) {
    return stationPath.find((station) => station.id === explicitStationId) || null;
  }

  return findCanvasStationContext(canvasId, resourceId, stationPath, extension.stationOverlays || []);
}

function findStationInstruction(stationId, resourceId, locale) {
  if (!stationId || !resourceId) {
    return "";
  }

  const stationLabels = getLocalizedLabels(locale, "stations");
  const station = getStations().find((entry) => entry.id === stationId);
  const step = getStationSteps(station || {}).find((entry) => normalizeResourceId(entry.resource) === resourceId);
  return step ? translate(step.step, stationLabels) : "";
}

function normalizeDocumentText(value) {
  return String(value || "");
}

function getCanvasExampleAnswers(canvasId) {
  const templatesDir = resolveCanvasFile("import-export-templates");
  if (!fs.existsSync(templatesDir)) {
    return new Map();
  }

  const examplesBySection = new Map();
  const files = fs.readdirSync(templatesDir)
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => path.join(templatesDir, fileName));

  for (const filePath of files) {
    const template = readJson(filePath);
    if (template.templateId !== canvasId) {
      continue;
    }

    for (const section of template.sections || []) {
      const exampleAnswer = formatExampleNotes(section.stickyNotes);
      if (!exampleAnswer) {
        continue;
      }

      const existing = examplesBySection.get(section.sectionId);
      examplesBySection.set(
        section.sectionId,
        existing ? `${existing}; ${exampleAnswer}` : exampleAnswer
      );
    }
  }

  return examplesBySection;
}

export function buildIntegrationDesignDocumentData(options = {}) {
  const locale = options.locale || DEFAULT_LOCALE;
  const extension = getIntegrationExtension();
  const lineLabels = getLocalizedLabels(locale, "lines");
  const stationLabels = getLocalizedLabels(locale, "stations");
  const realLine = getLines().find((line) => line.id === extension.line.id) || extension.line;
  const stations = new Map(getStations().map((station) => [station.id, station]));
  const integrationCriteriaByStation = new Map();

  for (const criterion of extension.criteria || []) {
    for (const stationId of criterion.appliesTo || []) {
      const criteria = integrationCriteriaByStation.get(stationId) || [];
      criteria.push(criterion);
      integrationCriteriaByStation.set(stationId, criteria);
    }
  }

  const stationPath = (realLine.stations || []).map((stationId) => {
    const station = stations.get(stationId);
    if (!station) {
      throw new Error(`Unknown integration extension station: ${stationId}`);
    }

    return {
      id: station.id,
      title: translate(station.title, stationLabels),
      description: translate(station.description, stationLabels),
      whyItMatters: translate(station.why_it_matters, stationLabels),
      criteria: (integrationCriteriaByStation.get(station.id) || []).map((criterion) => criterion.description)
    };
  });

  const canvasRows = (extension.documentCanvasOrder || []).map((canvasId) => {
    const canvas = buildCanvasMetadata(canvasId, locale);
    const resource = findCanvasResource(canvasId);
    const resourceMetadata = resource ? buildResourceMetadata(resource.id, locale) : null;
    const stationContext = getDocumentCanvasStationContext(canvasId, resource?.id, extension, stationPath);
    const formatText = normalizeDocumentText;
    const exampleAnswers = getCanvasExampleAnswers(canvasId);
    const questions = canvas.sections.map((section) => ({
      sectionId: section.id,
      section: formatText(section.title),
      question: formatText(section.description || section.title),
      exampleAnswer: exampleAnswers.get(section.id) || ""
    }));
    const steps = (resourceMetadata?.steps || []).slice(0, 3).map((step) => formatText(step));
    const tips = (resourceMetadata?.tips || []).slice(0, 1).map((tip) => formatText(tip));
    const stationInstruction = findStationInstruction(stationContext?.id, resource?.id, locale);

    return {
      canvasId,
      title: canvas.title,
      purpose: formatText(canvas.purpose),
      howToUse: formatText(canvas.howToUse),
      resourceId: resource?.id || "",
      resourceDescription: formatText(resourceMetadata?.description || ""),
      stationTitle: stationContext?.title || "",
      stationDescription: stationContext?.description || "",
      stationWhyItMatters: stationContext?.whyItMatters || "",
      stationInstruction: stationInstruction ? formatText(stationInstruction) : "",
      steps,
      tips,
      hasExampleAnswers: questions.some((question) => question.exampleAnswer),
      canvasCreatorUrl: getCanvasCreatorUrl(canvasId, locale),
      questions
    };
  });

  return {
    title: options.title || "Integration Design Requirements",
    locale,
    extensionId: extension.id,
    line: {
      ...realLine,
      title: translate(realLine.title, lineLabels),
      description: translate(realLine.description, lineLabels)
    },
    stationPath,
    canvasRows,
    criteria: extension.criteria || [],
    architectureDecisionOptions: extension.architectureDecisionOptions || []
  };
}

export function renderIntegrationDesignMarkdown(options = {}) {
  const data = buildIntegrationDesignDocumentData(options);
  const lines = [];

  lines.push("Use this page to gather technology-agnostic integration requirements before deciding whether the solution should be an API, event, file exchange, stream, data product, direct integration, or a hybrid pattern.");
  lines.push("");
  lines.push("Intent & fit needs");
  lines.push("Purpose: Quickly capture the integration's job-to-be-done and key context.");
  lines.push("");
  lines.push(renderConfluencePasteTableRow(["Field", "Value"]));
  lines.push(renderConfluencePasteTableRow(["Integration / capability name", ""]));
  lines.push(renderConfluencePasteTableRow(["Job to be done", "What business outcome must be achieved?"]));
  lines.push(renderConfluencePasteTableRow(["Producer / source systems", ""]));
  lines.push(renderConfluencePasteTableRow(["Consumer / target systems", ""]));
  lines.push(renderConfluencePasteTableRow(["Core business nouns", "Order, Product, Customer..."]));
  lines.push(renderConfluencePasteTableRow(["Trigger / event", "What initiates the process?"]));
  lines.push(renderConfluencePasteTableRow(["Non-functional drivers", "Latency, availability, privacy, regulatory, volume, recovery"]));
  lines.push(renderConfluencePasteTableRow(["Scope / out of scope", ""]));
  lines.push(renderConfluencePasteTableRow(["Decision status", "Requirements gathering"]));
  lines.push("");

  lines.push("Method path");
  lines.push("");
  lines.push(`Line: ${formatMarkdownCell(data.line.title)}`);
  lines.push(`Path: ${data.stationPath.map((station) => formatMarkdownCell(station.title)).join(" -> ")}`);
  lines.push("");

  lines.push("Text sources");
  lines.push("Integration document canvas order and station grouping: src/data/method/integration-extension.json");
  lines.push("Integration line and station descriptions: src/data/method/lines.json, src/data/method/stations.json, and src/data/method/<locale>/labels.*.json");
  lines.push("Canvas title, purpose, and questions: src/data/canvas/localizedData.json");
  lines.push("Station descriptions and instructions: src/data/method/stations.json and src/data/method/<locale>/labels.stations.json");
  lines.push("Example answers, when available: src/data/canvas/import-export-templates/*.json");
  lines.push("");

  lines.push("Business flow visualization");
  lines.push("Add a simple process outline or Mermaid diagram showing producer, consumer, trigger, data movement, and key decision points.");
  lines.push("");

  lines.push("Requirements");
  lines.push("");
  for (const group of buildStationCanvasGroups(data.canvasRows)) {
    lines.push(group.stationTitle);
    if (group.stationDescription) {
      lines.push(`Station description: ${formatMarkdownCell(group.stationDescription)}`);
    }
    if (group.stationWhyItMatters) {
      lines.push(`Why it matters: ${formatMarkdownCell(group.stationWhyItMatters)}`);
    }
    lines.push("");

    for (const row of group.canvasRows) {
      lines.push(row.title);
      lines.push(`CanvasCreator: ${row.canvasCreatorUrl}`);
      lines.push(`Purpose: ${formatMarkdownCell(row.purpose)}`);
      if (row.stationInstruction) {
        lines.push(`Station instruction: ${formatMarkdownCell(row.stationInstruction)}`);
      }
      lines.push("");
      lines.push(renderConfluencePasteTableRow(["Topic", "Question", "Answer / evidence / owner"]));
      for (const question of row.questions) {
        lines.push(renderConfluencePasteTableRow([question.section, question.question, formatExampleAnswer(question.exampleAnswer)]));
      }
      lines.push("");
    }
  }

  lines.push("Integration pattern decision");
  lines.push("");
  lines.push(renderConfluencePasteTableRow(["Primary pattern", "Fallback pattern", "Justification"]));
  lines.push(renderConfluencePasteTableRow(["API / Event / File exchange / Stream / Data product / Direct integration / Hybrid", "", ""]));
  lines.push("");

  lines.push("Reusable capability analysis");
  lines.push("Conduct after requirements are defined.");
  lines.push("");
  lines.push(renderConfluencePasteTableRow(["Candidate", "Type", "Business fit", "Shape match", "Timing fit", "Gaps / comments"]));
  lines.push(renderConfluencePasteTableRow(["", "API / Event / Data product / File / Stream / Existing service", "", "", "", ""]));
  lines.push("Classification: Reuse as-is / Reuse with interface / Extend / None");
  lines.push("Reasoning: ");
  lines.push("");

  lines.push("Pattern option notes");
  lines.push("");
  lines.push(renderConfluencePasteTableRow(["Candidate pattern", "Use when", "Fit / concerns", "Decision"]));
  for (const option of data.architectureDecisionOptions) {
    lines.push(renderConfluencePasteTableRow([option.title, option.useWhen, "", ""]));
  }
  lines.push("");

  lines.push("Architecture diagram");
  lines.push("Insert a high-level diagram aligned with the target architecture.");
  lines.push("");

  lines.push("Architecture decision record (ADR)");
  lines.push("Title: [Describe capability]");
  lines.push("Status: Proposed / Approved");
  lines.push("Context:");
  lines.push("- Key business requirements");
  lines.push("- Technical constraints");
  lines.push("- Expected volumes / performance");
  lines.push("Decision:");
  lines.push("- Chosen integration pattern and why");
  lines.push("- Reuse, if any, chosen and why");
  lines.push("Alternatives considered:");
  lines.push("- Rejected approaches and reasons");
  lines.push("Consequences:");
  lines.push("- Pros, cons, risks, mitigations");
  lines.push("Follow-up actions:");
  lines.push("- Register APIs, event topics, data products, file contracts, governance checks, or support model updates");
  lines.push("");

  return `${lines.join("\n")}\n`;
}

export function renderIntegrationDesignConfluenceWiki(options = {}) {
  const data = buildIntegrationDesignDocumentData(options);
  const lines = [];

  lines.push("Use this page to gather technology-agnostic integration requirements before deciding whether the solution should be an API, event, file exchange, stream, data product, direct integration, or a hybrid pattern.");
  lines.push("");
  lines.push("h2. Intent & fit needs");
  lines.push("");
  lines.push("Purpose: Quickly capture the integration's job-to-be-done and key context.");
  lines.push("");
  lines.push(renderConfluenceWikiHeaderRow(["Field", "Value"]));
  lines.push(renderConfluenceWikiRow(["Integration / capability name", ""]));
  lines.push(renderConfluenceWikiRow(["Job to be done", "What business outcome must be achieved?"]));
  lines.push(renderConfluenceWikiRow(["Producer / source systems", ""]));
  lines.push(renderConfluenceWikiRow(["Consumer / target systems", ""]));
  lines.push(renderConfluenceWikiRow(["Core business nouns", "Order, Product, Customer..."]));
  lines.push(renderConfluenceWikiRow(["Trigger / event", "What initiates the process?"]));
  lines.push(renderConfluenceWikiRow(["Non-functional drivers", "Latency, availability, privacy, regulatory, volume, recovery"]));
  lines.push(renderConfluenceWikiRow(["Scope / out of scope", ""]));
  lines.push(renderConfluenceWikiRow(["Decision status", "Requirements gathering"]));
  lines.push("");

  lines.push("h2. Method path");
  lines.push("");
  lines.push(`Line: ${formatMarkdownCell(data.line.title)}`);
  lines.push(`Path: ${data.stationPath.map((station) => formatMarkdownCell(station.title)).join(" -> ")}`);
  lines.push("");

  lines.push("h2. Text sources");
  lines.push("");
  lines.push("* Integration document canvas order and station grouping: src/data/method/integration-extension.json");
  lines.push("* Integration line and station descriptions: src/data/method/lines.json, src/data/method/stations.json, and src/data/method/<locale>/labels.*.json");
  lines.push("* Canvas title, purpose, and questions: src/data/canvas/localizedData.json");
  lines.push("* Station descriptions and instructions: src/data/method/stations.json and src/data/method/<locale>/labels.stations.json");
  lines.push("* Example answers, when available: src/data/canvas/import-export-templates/*.json");
  lines.push("");

  lines.push("h2. Business flow visualization");
  lines.push("");
  lines.push("Add a simple process outline or Mermaid diagram showing producer, consumer, trigger, data movement, and key decision points.");
  lines.push("");

  lines.push("h2. Requirements");
  lines.push("");
  for (const group of buildStationCanvasGroups(data.canvasRows)) {
    lines.push(`h3. ${group.stationTitle}`);
    if (group.stationDescription) {
      lines.push(`Station description: ${formatMarkdownCell(group.stationDescription)}`);
    }
    if (group.stationWhyItMatters) {
      lines.push(`Why it matters: ${formatMarkdownCell(group.stationWhyItMatters)}`);
    }
    lines.push("");

    for (const row of group.canvasRows) {
      lines.push(`h4. ${row.title}`);
      lines.push(`CanvasCreator: ${row.canvasCreatorUrl}`);
      lines.push(`Purpose: ${formatMarkdownCell(row.purpose)}`);
      if (row.stationInstruction) {
        lines.push(`Station instruction: ${formatMarkdownCell(row.stationInstruction)}`);
      }
      lines.push("");
      lines.push(renderConfluenceWikiHeaderRow(["Topic", "Question", "Answer / evidence / owner"]));
      for (const question of row.questions) {
        lines.push(renderConfluenceWikiRow([question.section, question.question, formatExampleAnswer(question.exampleAnswer)]));
      }
      lines.push("");
    }
  }

  lines.push("h2. Integration pattern decision");
  lines.push("");
  lines.push(renderConfluenceWikiHeaderRow(["Primary pattern", "Fallback pattern", "Justification"]));
  lines.push(renderConfluenceWikiRow(["API / Event / File exchange / Stream / Data product / Direct integration / Hybrid", "", ""]));
  lines.push("");

  lines.push("h2. Reusable capability analysis");
  lines.push("");
  lines.push("Conduct after requirements are defined.");
  lines.push("");
  lines.push(renderConfluenceWikiHeaderRow(["Candidate", "Type", "Business fit", "Shape match", "Timing fit", "Gaps / comments"]));
  lines.push(renderConfluenceWikiRow(["", "API / Event / Data product / File / Stream / Existing service", "", "", "", ""]));
  lines.push("");
  lines.push("Classification: Reuse as-is / Reuse with interface / Extend / None");
  lines.push("Reasoning: ");
  lines.push("");

  lines.push("h2. Pattern option notes");
  lines.push("");
  lines.push(renderConfluenceWikiHeaderRow(["Candidate pattern", "Use when", "Fit / concerns", "Decision"]));
  for (const option of data.architectureDecisionOptions) {
    lines.push(renderConfluenceWikiRow([option.title, option.useWhen, "", ""]));
  }
  lines.push("");

  lines.push("h2. Architecture diagram");
  lines.push("");
  lines.push("Insert a high-level diagram aligned with the target architecture.");
  lines.push("");

  lines.push("h2. Architecture decision record (ADR)");
  lines.push("");
  lines.push("Title: [Describe capability]");
  lines.push("Status: Proposed / Approved");
  lines.push("");
  lines.push("Context:");
  lines.push("* Key business requirements");
  lines.push("* Technical constraints");
  lines.push("* Expected volumes / performance");
  lines.push("");
  lines.push("Decision:");
  lines.push("* Chosen integration pattern and why");
  lines.push("* Reuse, if any, chosen and why");
  lines.push("");
  lines.push("Alternatives considered:");
  lines.push("* Rejected approaches and reasons");
  lines.push("");
  lines.push("Consequences:");
  lines.push("* Pros, cons, risks, mitigations");
  lines.push("");
  lines.push("Follow-up actions:");
  lines.push("* Register APIs, event topics, data products, file contracts, governance checks, or support model updates");
  lines.push("");

  return `${lines.join("\n")}\n`;
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
