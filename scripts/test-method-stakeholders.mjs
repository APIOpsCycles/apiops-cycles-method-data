import assert from "node:assert/strict";
import * as methodEngine from "../src/lib/method-engine.js";

const stations = methodEngine.getStations();
const stationIds = new Set(stations.map((station) => station.id));
const stakeholderIds = new Set(methodEngine.getStakeholders().map((stakeholder) => stakeholder.id));
const resourceIds = new Set(methodEngine.getResources().map((resource) => resource.id));
const stationStakeholders = methodEngine.getStationStakeholderMap();
const stationStakeholdersByCycle = stationStakeholders.stationStakeholdersByCycle || {
  [methodEngine.DEFAULT_CYCLE_ID]: stationStakeholders
};

for (const cycle of methodEngine.getCycles()) {
  const stationStakeholderMap = methodEngine.getStationStakeholderMapForCycle(cycle.id);
  const cycleStationIds = new Set(cycle.stations || []);

  assert.deepEqual(
    stationStakeholderMap,
    stationStakeholdersByCycle[cycle.id],
    `Expected direct cycle stakeholder mapping for ${cycle.id}.`
  );

  for (const stationId of cycleStationIds) {
    const entries = stationStakeholderMap[stationId];
    assert.ok(entries, `Missing stakeholder mapping for ${cycle.id}/${stationId}.`);
    assert.ok(entries.length > 0, `Expected at least one stakeholder mapping for ${cycle.id}/${stationId}.`);

    const seenStakeholders = new Set();
    const leads = entries.filter((entry) => entry.involvement === "lead");
    const cores = entries.filter((entry) => entry.involvement === "core");

    assert.equal(leads.length, 1, `Expected exactly one lead for ${cycle.id}/${stationId}.`);
    assert.ok(cores.length > 0, `Expected at least one core stakeholder for ${cycle.id}/${stationId}.`);

    for (const entry of entries) {
      assert.ok(stakeholderIds.has(entry.stakeholder), `Unknown stakeholder ${entry.stakeholder} in ${cycle.id}/${stationId}.`);
      assert.ok(!seenStakeholders.has(entry.stakeholder), `Duplicate stakeholder ${entry.stakeholder} in ${cycle.id}/${stationId}.`);
      seenStakeholders.add(entry.stakeholder);

      for (const responsibility of entry.responsibilities || []) {
        assert.ok(
          resourceIds.has(responsibility.resource),
          `Unknown responsibility resource ${responsibility.resource} in ${cycle.id}/${stationId}.`
        );
      }
    }

    const localizedStakeholders = methodEngine.buildStationStakeholderData(stationId, "fi", cycle.id);
    assert.equal(localizedStakeholders.length, entries.length, `Localized stakeholder count mismatch for ${cycle.id}/${stationId}.`);
    assert.ok(
      localizedStakeholders.every((entry) => entry.title && entry.description && entry.involvementLabel && Array.isArray(entry.responsibilities)),
      `Incomplete localized stakeholder data for ${cycle.id}/${stationId}.`
    );
  }

  for (const stationId of Object.keys(stationStakeholderMap)) {
    assert.ok(stationIds.has(stationId), `Stakeholder mapping references unknown station ${stationId}.`);
    assert.ok(cycleStationIds.has(stationId), `Stakeholder mapping for ${cycle.id} references station outside the cycle: ${stationId}.`);
  }
}

const startData = methodEngine.buildStartData("en", methodEngine.DEFAULT_CYCLE_ID);
assert.ok(startData.every((station) => station.cycleId === methodEngine.DEFAULT_CYCLE_ID), "Expected cycle id in start data.");
assert.ok(startData.every((station) => Array.isArray(station.stakeholders) && station.stakeholders.length > 0), "Expected stakeholders in start data.");

const designData = methodEngine.buildStationResourceData("api-design", "en", methodEngine.DEFAULT_STYLE, methodEngine.DEFAULT_CYCLE_ID);
assert.equal(designData.cycleId, methodEngine.DEFAULT_CYCLE_ID, "Expected cycle id in station resource data.");
assert.ok(Array.isArray(designData.stakeholders) && designData.stakeholders.length > 0, "Expected stakeholders in station resource data.");
assert.ok(designData.stakeholders.some((entry) => entry.id === "security-specialist"), "Expected api-design to include security-specialist.");
assert.ok(designData.stakeholders.some((entry) => entry.id === "compliance-specialist"), "Expected api-design to include compliance-specialist.");
assert.ok(designData.stakeholders.some((entry) => entry.id === "business-owner"), "Expected api-design to include business-owner.");

const architectureData = methodEngine.buildStationResourceData("api-platform-architecture", "en", methodEngine.DEFAULT_STYLE, methodEngine.DEFAULT_CYCLE_ID);
assert.ok(architectureData.stakeholders.some((entry) => entry.id === "security-specialist"), "Expected api-platform-architecture to include security-specialist.");
assert.ok(architectureData.stakeholders.some((entry) => entry.id === "compliance-specialist"), "Expected api-platform-architecture to include compliance-specialist.");

const capabilityStrategyData = methodEngine.buildStationResourceData("api-product-strategy", "en", methodEngine.DEFAULT_STYLE, "capability-productization-cycle");
assert.ok(
  capabilityStrategyData.steps.some((entry) => entry.resourceId === "capabilityValuePropositionCanvas"),
  "Expected capability cycle strategy resources to use capability value proposition canvas."
);
assert.ok(
  capabilityStrategyData.stakeholders.some((entry) => entry.id === "capability-owner" && entry.involvement === "lead"),
  "Expected capability cycle strategy lead to be capability-owner."
);

const fallbackStakeholders = methodEngine.buildStationStakeholderData("api-product-strategy", "sv", methodEngine.DEFAULT_CYCLE_ID);
assert.ok(fallbackStakeholders.some((entry) => entry.involvementLabel === "Lead"), "Expected missing locale fallback to English stakeholder labels.");

console.log("Method stakeholder regression test passed.");
