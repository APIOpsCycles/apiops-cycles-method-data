import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import * as methodEngine from "../src/lib/method-engine.js";

const expectedPalette = {
  benefit: "#C0EB6A",
  neutral: "#DFDDC5",
  negative: "#FFAFAF",
  task: "#7DC9E7",
  default: "#FFF399"
};

assert.deepEqual(methodEngine.getNoteColorPalette(), expectedPalette);
assert.equal(methodEngine.DEFAULT_NOTE_COLOR, expectedPalette.default);

assert.equal(
  methodEngine.getDefaultNoteColorForSection("customerJourneyCanvas", "journeySteps"),
  expectedPalette.task
);
assert.equal(
  methodEngine.getDefaultNoteColorForSection("customerJourneyCanvas", "gains"),
  expectedPalette.benefit
);
assert.equal(
  methodEngine.getDefaultNoteColorForSection("businessImpactCanvas", "availabilityRisks"),
  expectedPalette.negative
);

assert.deepEqual(
  methodEngine.parseStickyNoteInput("Map the approval workflow", {
    canvasId: "customerJourneyCanvas",
    sectionId: "journeySteps"
  }),
  {
    content: "Map the approval workflow",
    size: methodEngine.DEFAULT_NOTE_SIZE,
    color: expectedPalette.task
  }
);

assert.deepEqual(
  methodEngine.parseStickyNoteInput("[benefit] Faster onboarding", {
    canvasId: "customerJourneyCanvas",
    sectionId: "pains"
  }),
  {
    content: "Faster onboarding",
    size: methodEngine.DEFAULT_NOTE_SIZE,
    color: expectedPalette.benefit
  }
);

assert.deepEqual(
  methodEngine.parseStickyNoteInput("[color=#7dc9e7] Capture order event", {
    canvasId: "eventCanvas",
    sectionId: "processingLogic"
  }),
  {
    content: "Capture order event",
    size: methodEngine.DEFAULT_NOTE_SIZE,
    color: expectedPalette.task
  }
);

assert.throws(
  () => methodEngine.parseStickyNoteInput("[mystery] Unknown tag", {
    canvasId: "domainCanvas",
    sectionId: "coreEntitiesAndBusinessMeaning"
  }),
  /Unknown sticky note tag/
);

const templateDir = path.join(process.cwd(), "src", "data", "canvas", "import-export-templates");
const allowedColors = new Set(Object.values(expectedPalette));

for (const entry of fs.readdirSync(templateDir)) {
  if (!entry.endsWith(".json")) {
    continue;
  }

  const filePath = path.join(templateDir, entry);
  const json = JSON.parse(fs.readFileSync(filePath, "utf8"));

  for (const section of json.sections || []) {
    for (const note of section.stickyNotes || []) {
      assert.ok(
        allowedColors.has(note.color),
        `${entry} contains a sticky note color outside the supported palette: ${note.color}`
      );
    }
  }
}

console.log("Sticky note color palette checks passed.");
