import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..");

export const DEFAULT_LOCALE = "en";
export const DEFAULT_OUTPUT_DIR = "specs/canvases";
export const DEFAULT_STYLE = "Not sure yet";
export const DEFAULT_CYCLE_ID = "api-productization-cycle";
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

export function resolveStationCriteria(stationCriteriaMap, stationId, cycleId = DEFAULT_CYCLE_ID) {
  if (Array.isArray(stationCriteriaMap?.[stationId])) {
    return stationCriteriaMap[stationId];
  }

  return stationCriteriaMap?.byCycle?.[cycleId]?.[stationId]
    || stationCriteriaMap?.default?.[stationId]
    || [];
}

export function getCriteria() {
  return readJson(resolveMethodFile("criteria.json"));
}

export function getStakeholders() {
  return readJson(resolveMethodFile("stakeholders.json")).stakeholders || [];
}

export function getStationStakeholderMap() {
  return readJson(resolveMethodFile("station-stakeholders.json"));
}

export function getStationStakeholderMapForCycle(cycleId = DEFAULT_CYCLE_ID) {
  const stationStakeholderMap = getStationStakeholderMap();
  if (stationStakeholderMap.stationStakeholdersByCycle) {
    const cycle = resolveCycle(cycleId);
    const entries = stationStakeholderMap.stationStakeholdersByCycle[cycle.id];
    if (!entries) {
      throw new Error(`Unknown station stakeholder cycle mapping: ${cycle.id}`);
    }
    return entries;
  }

  return stationStakeholderMap;
}

export function getResources() {
  return readJson(resolveMethodFile("resources.json")).resources || [];
}

export function getLines() {
  return readJson(resolveMethodFile("lines.json")).lines?.items || [];
}

export function getCycles() {
  return readJson(resolveMethodFile("cycles.json")).cycles?.items || [];
}

export function getCycle(cycleId) {
  const normalizedCycleId = String(cycleId || "").trim();
  const cycle = getCycles().find((entry) => entry.id === normalizedCycleId || entry.slug === normalizedCycleId);
  if (!cycle) {
    throw new Error(`Unknown cycle: ${cycleId}`);
  }
  return cycle;
}

export function resolveCycle(cycleId = DEFAULT_CYCLE_ID) {
  return getCycle(cycleId || DEFAULT_CYCLE_ID);
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

function translateFromLabelSets(labelKey, ...labelSets) {
  for (const labels of labelSets) {
    if (labels[labelKey]) {
      return labels[labelKey];
    }
  }
  return labelKey;
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

export function buildStationStakeholderData(stationId, locale = DEFAULT_LOCALE, cycleId = DEFAULT_CYCLE_ID) {
  const stakeholderCatalog = buildStakeholderCatalog(locale);
  const stakeholderLabels = getLocalizedLabels(locale, "stakeholders");
  const stationStakeholderMap = getStationStakeholderMapForCycle(cycleId);
  const entries = stationStakeholderMap[stationId];

  if (!entries) {
    throw new Error(`Unknown station stakeholder mapping: ${stationId} in ${cycleId || DEFAULT_CYCLE_ID}`);
  }

  return entries.map((entry) => {
    const stakeholder = stakeholderCatalog.get(entry.stakeholder);
    if (!stakeholder) {
      throw new Error(`Unknown stakeholder id: ${entry.stakeholder}`);
    }

    return {
      ...stakeholder,
      involvement: entry.involvement,
      involvementLabel: translate(`stakeholder.involvement.${entry.involvement}`, stakeholderLabels),
      responsibilities: entry.responsibilities || []
    };
  });
}

export function buildStartData(locale = DEFAULT_LOCALE, cycleId = DEFAULT_CYCLE_ID) {
  const cycle = resolveCycle(cycleId);
  const stationById = new Map(getCoreStations().map((station) => [station.id, station]));
  const stations = (cycle.stations || [])
    .map((stationId) => stationById.get(stationId))
    .filter(Boolean);
  const stationLabels = getLocalizedLabels(locale, "stations");
  const cycleLabels = getLocalizedLabels(locale, "cycles");
  const criteriaLabels = getLocalizedLabels(locale, "criteria");
  const stationCriteriaMap = getStationCriteriaMap();

  return stations.map((station, index) => ({
    id: station.id,
    order: station.order,
    slug: station.slug,
    cycleId: cycle.id,
    title: cycle.stationLabels?.[station.id]
      ? translateFromLabelSets(cycle.stationLabels[station.id], stationLabels, cycleLabels)
      : translate(station.title, stationLabels),
    description: cycle.stationDescriptions?.[station.id]
      ? translateFromLabelSets(cycle.stationDescriptions[station.id], stationLabels, cycleLabels)
      : translate(station.description, stationLabels),
    suggestedForNewApi: index === 0,
    stakeholders: buildStationStakeholderData(station.id, locale, cycle.id),
    criteria: resolveStationCriteria(stationCriteriaMap, station.id, cycle.id).map((criterionId) => ({
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

function getCycleStepLabelKey(cycleId, stationId, index) {
  const baseKey = `cycle.${cycleId}.station.${stationId}.how_it_works`;
  return index === 0 ? baseKey : `${baseKey}.${index}`;
}

function buildStationResourceSteps(station, stationId, cycle, style, resources, stationLabels, cycleLabels, resourceLabels) {
  const stationSteps = getStationSteps(station);
  const stationStepsByResource = new Map(
    stationSteps
      .filter((step) => step.resource)
      .map((step) => [normalizeResourceId(step.resource), step])
  );
  const resourceIds = cycle.recommendedResources?.[stationId] || stationSteps.map((step) => step.resource).filter(Boolean);

  return resourceIds
    .filter((resourceId) => shouldIncludeResourceForStyle(resourceId, stationId, style))
    .map((resourceId, index) => {
      const normalizedResourceId = normalizeResourceId(resourceId);
      const resource = resources.find((entry) => entry.id === normalizedResourceId);
      const stationStep = stationStepsByResource.get(normalizedResourceId);
      const resourceTitle = resource ? translate(resource.title, resourceLabels) : normalizedResourceId;
      const cycleStepLabelKey = getCycleStepLabelKey(cycle.id, stationId, index);
      const hasCycleStepLabel = cycleLabels[cycleStepLabelKey] || stationLabels[cycleStepLabelKey];
      const stepText = hasCycleStepLabel
        ? translateFromLabelSets(cycleStepLabelKey, cycleLabels, stationLabels)
        : (stationStep
          ? translate(stationStep.step, stationLabels)
          : `Use ${resourceTitle}.`);

      if (!resource) {
        return {
          order: index + 1,
          step: stepText,
          resourceId: normalizedResourceId,
          missing: true
        };
      }

      return {
        order: index + 1,
        step: stepText,
        resourceId: resource.id,
        resourceTitle,
        resourceDescription: translate(resource.description, resourceLabels),
        category: resource.category || "",
        canvasId: resource.canvas || null,
        snippet: resource.snippet || null,
        slug: resource.slug
      };
    });
}

export function buildStationResourceData(stationId, locale = DEFAULT_LOCALE, style = DEFAULT_STYLE, cycleId = DEFAULT_CYCLE_ID) {
  const stations = getStations();
  const resources = getResources();
  const stationLabels = getLocalizedLabels(locale, "stations");
  const cycleLabels = getLocalizedLabels(locale, "cycles");
  const resourceLabels = getLocalizedLabels(locale, "resources");
  const cycle = resolveCycle(cycleId);
  const station = stations.find((entry) => entry.id === stationId);

  if (!station) {
    throw new Error(`Unknown station id: ${stationId}`);
  }

  if (!(cycle.stations || []).includes(stationId)) {
    throw new Error(`Station ${stationId} is not part of cycle ${cycle.id}`);
  }

  const steps = buildStationResourceSteps(station, stationId, cycle, style, resources, stationLabels, cycleLabels, resourceLabels);

  return {
    stationId: station.id,
    cycleId: cycle.id,
    stationTitle: cycle.stationLabels?.[station.id]
      ? translateFromLabelSets(cycle.stationLabels[station.id], stationLabels, cycleLabels)
      : translate(station.title, stationLabels),
    stationDescription: cycle.stationDescriptions?.[station.id]
      ? translateFromLabelSets(cycle.stationDescriptions[station.id], stationLabels, cycleLabels)
      : translate(station.description, stationLabels),
    stakeholders: buildStationStakeholderData(station.id, locale, cycle.id),
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

function buildCriteriaMetadata(criteriaIds, locale) {
  const criteriaLabels = getLocalizedLabels(locale, "criteria");
  const criteriaById = new Map(getCriteria().map((criterion) => [criterion.id, criterion]));
  return (criteriaIds || [])
    .map((criterionId) => {
      const criterion = criteriaById.get(criterionId);
      return criterion ? {
        id: criterion.id,
        title: translate(`criterion.${criterion.id}`, criteriaLabels),
        description: criterion.description
      } : null;
    })
    .filter(Boolean);
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
    const cycle = resolveCycle(options.cycle || DEFAULT_CYCLE_ID);
    return NEW_API_STATIONS.filter((stationId) => (cycle.stations || []).includes(stationId));
  }

  throw new Error(`Unknown preset: ${options.preset}`);
}

export function generateCanvases(options = {}) {
  const locale = options.locale || DEFAULT_LOCALE;
  const style = normalizeStyle(options.style || DEFAULT_STYLE);
  const cycle = resolveCycle(options.cycle || DEFAULT_CYCLE_ID);
  const outputRoot = path.resolve(process.cwd(), options.output || DEFAULT_OUTPUT_DIR);
  const resources = getResources();
  const generated = [];
  const skipped = [];
  const seenResourceIds = new Set();

  for (const stationId of resolveStationIds(options)) {
    const stationResources = buildStationResourceData(stationId, locale, style, cycle.id);
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
    cycleId: cycle.id,
    outputRoot,
    generated,
    skipped
  };
}
