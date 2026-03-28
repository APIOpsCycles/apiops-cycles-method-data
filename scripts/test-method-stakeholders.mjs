import assert from "node:assert/strict";
import * as methodEngine from "../src/lib/method-engine.js";

const stations = methodEngine.getStations();
const stationIds = new Set(stations.map((station) => station.id));
const stakeholderIds = new Set(methodEngine.getStakeholders().map((stakeholder) => stakeholder.id));
const stationStakeholderMap = methodEngine.getStationStakeholderMap();

for (const station of stations) {
  const entries = stationStakeholderMap[station.id];
  assert.ok(entries, `Missing stakeholder mapping for ${station.id}.`);
  assert.ok(entries.length > 0, `Expected at least one stakeholder mapping for ${station.id}.`);

  const seenStakeholders = new Set();
  const leads = entries.filter((entry) => entry.involvement === "lead");
  const cores = entries.filter((entry) => entry.involvement === "core");

  assert.equal(leads.length, 1, `Expected exactly one lead for ${station.id}.`);
  assert.ok(cores.length > 0, `Expected at least one core stakeholder for ${station.id}.`);

  for (const entry of entries) {
    assert.ok(stakeholderIds.has(entry.stakeholder), `Unknown stakeholder ${entry.stakeholder} in ${station.id}.`);
    assert.ok(!seenStakeholders.has(entry.stakeholder), `Duplicate stakeholder ${entry.stakeholder} in ${station.id}.`);
    seenStakeholders.add(entry.stakeholder);
  }

  const localizedStakeholders = methodEngine.buildStationStakeholderData(station.id, "fi");
  assert.equal(localizedStakeholders.length, entries.length, `Localized stakeholder count mismatch for ${station.id}.`);
  assert.ok(localizedStakeholders.every((entry) => entry.title && entry.description && entry.involvementLabel), `Incomplete localized stakeholder data for ${station.id}.`);
}

for (const stationId of Object.keys(stationStakeholderMap)) {
  assert.ok(stationIds.has(stationId), `Stakeholder mapping references unknown station ${stationId}.`);
}

const startData = methodEngine.buildStartData("en");
assert.ok(startData.every((station) => Array.isArray(station.stakeholders) && station.stakeholders.length > 0), "Expected stakeholders in start data.");

const designData = methodEngine.buildStationResourceData("api-design", "en");
assert.ok(Array.isArray(designData.stakeholders) && designData.stakeholders.length > 0, "Expected stakeholders in station resource data.");
assert.ok(designData.stakeholders.some((entry) => entry.id === "security-specialist"), "Expected api-design to include security-specialist.");
assert.ok(designData.stakeholders.some((entry) => entry.id === "compliance-legal-specialist"), "Expected api-design to include compliance-legal-specialist.");
assert.ok(designData.stakeholders.some((entry) => entry.id === "business-owner"), "Expected api-design to include business-owner.");

const architectureData = methodEngine.buildStationResourceData("api-platform-architecture", "en");
assert.ok(architectureData.stakeholders.some((entry) => entry.id === "security-specialist"), "Expected api-platform-architecture to include security-specialist.");
assert.ok(architectureData.stakeholders.some((entry) => entry.id === "compliance-legal-specialist"), "Expected api-platform-architecture to include compliance-legal-specialist.");

const fallbackStakeholders = methodEngine.buildStationStakeholderData("api-product-strategy", "sv");
assert.ok(fallbackStakeholders.some((entry) => entry.involvementLabel === "Lead"), "Expected missing locale fallback to English stakeholder labels.");

console.log("Method stakeholder regression test passed.");
