#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import readline from "node:readline/promises";
import * as methodEngine from "../../../src/lib/method-engine.js";

const STATION_SCRIPT_HINTS = {
  "api-product-strategy": {
    resources: "npm run method:resources:strategy",
    canvases: "npm run method:canvases:new-api"
  },
  "api-design": {
    resources: "npm run method -- resources --station api-design --style \"REST\"",
    canvases: "npm run method -- generate-canvases --station api-design --style \"REST\" --output ./specs/canvases"
  }
};

function printUsage() {
  console.log(`Usage:
  node packages/create-apiops/bin/method-cli.js start [--locale <locale>] [--json] [--list] [--answers <yes,no,...>] [--next-action <resources|canvases|exit>]
  node packages/create-apiops/bin/method-cli.js resources --station <station-id> [--locale <locale>] [--style <style>] [--json] [--list] [--step-actions <details,next,...>]
  node packages/create-apiops/bin/method-cli.js generate-canvases [--station <station-id> | --stations <ids> | --preset new-api] [--locale <locale>] [--style <style>] [--output <dir>] [--force] [--json]

Examples:
  node packages/create-apiops/bin/method-cli.js start --locale en
  node packages/create-apiops/bin/method-cli.js start --locale en --answers yes,no,yes --next-action resources
  node packages/create-apiops/bin/method-cli.js resources --station api-product-strategy --locale en
  node packages/create-apiops/bin/method-cli.js generate-canvases --preset new-api --style REST --output ./specs/canvases
`);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function parseArgs(argv) {
  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    return { command: "help", options: {} };
  }

  const [command, ...rest] = argv;
  const options = {};

  for (let index = 0; index < rest.length; index += 1) {
    const current = rest[index];
    if (!current.startsWith("--")) {
      fail(`Unexpected argument: ${current}`);
    }

    const key = current.slice(2);
    if (key === "json" || key === "force" || key === "list") {
      options[key] = true;
      continue;
    }

    const value = rest[index + 1];
    if (!value || value.startsWith("--")) {
      fail(`Missing value for --${key}`);
    }

    options[key] = value;
    index += 1;
  }

  return { command, options };
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function getNextStepHints(stationId) {
  const hints = STATION_SCRIPT_HINTS[stationId];
  if (hints) {
    return hints;
  }

  return {
    resources: `npm run method -- resources --station ${stationId}`,
    canvases: `npm run method -- generate-canvases --station ${stationId} --output ./specs/canvases`
  };
}

function loadCanvasJson(filePath, canvasId, locale) {
  if (fs.existsSync(filePath)) {
    return readJson(filePath);
  }
  return methodEngine.buildCanvasTemplate(canvasId, locale);
}

async function fillCanvasSectionsInteractive(stationId, step, locale, output, rl) {
  const outPath = methodEngine.generateCanvasForStationResource(stationId, step.resourceId, locale, output);
  const canvasJson = loadCanvasJson(outPath, step.canvasId, locale);
  const canvasMetadata = methodEngine.buildCanvasMetadata(step.canvasId, locale);
  const starterFileName = path.basename(outPath);
  const suggestedFileSlug = starterFileName.endsWith(".empty.json")
    ? step.resourceId
    : starterFileName.replace(/\.json$/i, "");
  const requestedFileSlug = await rl.question(`Save filled canvas as file name (${suggestedFileSlug}): `);
  const finalFileSlug = methodEngine.sanitizeFileSlug(requestedFileSlug, suggestedFileSlug);
  const finalPath = path.join(path.dirname(outPath), `${finalFileSlug}.json`);

  console.log("");
  console.log(`Filling ${canvasMetadata.title} section by section.`);
  console.log("Use `|` to create multiple notes in one section. Leave blank to keep existing notes. Type !clear to remove notes in a section.\n");

  for (const section of canvasMetadata.sections) {
    const existingSection = canvasJson.sections.find((entry) => entry.sectionId === section.id);
    const existingNotes = existingSection?.stickyNotes || [];
    console.log(`${section.title}`);
    console.log(section.description);
    if (existingNotes.length > 0) {
      console.log(`Current notes: ${existingNotes.map((note) => note.content).join(" | ")}`);
    }

    const answer = (await rl.question("Notes: ")).trim();
    if (!answer) {
      console.log("");
      continue;
    }

    if (answer === "!clear") {
      existingSection.stickyNotes = [];
      console.log("");
      continue;
    }

    const notes = answer
      .split("|")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((content) => ({
        content,
        size: methodEngine.DEFAULT_NOTE_SIZE,
        color: methodEngine.DEFAULT_NOTE_COLOR
      }));

    existingSection.stickyNotes = notes;
    console.log("");
  }

  fs.writeFileSync(finalPath, `${JSON.stringify(canvasJson, null, 2)}\n`);
  return finalPath;
}

function resolveCanvasExportCommand() {
  const binPath = path.resolve(
    process.cwd(),
    "node_modules",
    ".bin",
    process.platform === "win32" ? "canvascreator-export.cmd" : "canvascreator-export"
  );
  if (fs.existsSync(binPath)) {
    return {
      command: binPath,
      args: []
    };
  }

  const scriptPath = path.resolve(process.cwd(), "node_modules", "canvascreator", "scripts", "export.js");
  if (fs.existsSync(scriptPath)) {
    return {
      command: process.execPath,
      args: [scriptPath]
    };
  }

  return null;
}

function exportCanvasSvgForResource(stationId, step, locale, output) {
  const jsonPath = methodEngine.generateCanvasForStationResource(stationId, step.resourceId, locale, output);
  const exportCommand = resolveCanvasExportCommand();
  if (!exportCommand) {
    return {
      ok: false,
      reason: "CanvasCreator export CLI is not installed in this project yet.",
      jsonPath
    };
  }

  const outputDir = path.dirname(jsonPath);
  const outputFile = path.join(outputDir, `${step.resourceId}.svg`);
  const result = spawnSync(
    exportCommand.command,
    [
      ...exportCommand.args,
      "--input", jsonPath,
      "--format", "svg",
      "--output", outputFile
    ],
    {
      cwd: process.cwd(),
      encoding: "utf8",
      shell: process.platform === "win32"
    }
  );

  if (result.status !== 0) {
    return {
      ok: false,
      reason: result.stderr || result.stdout || "Canvas export failed.",
      jsonPath
    };
  }

  return {
    ok: true,
    jsonPath,
    outputFile
  };
}

function printStartText(data) {
  console.log(`APIOps starting station check (${data.length} core stations)\n`);
  for (const station of data) {
    console.log(`${station.order}. ${station.title} (${station.id})`);
    console.log(`   ${station.description}`);
    if (station.suggestedForNewApi) {
      console.log("   Suggested default for a new API unless later-station criteria are already clearly met.");
    }
    console.log("   Criteria to check:");
    for (const criterion of station.criteria) {
      console.log(`   - ${criterion.label}`);
    }
    console.log("");
  }
}

function printMenuOptions(options) {
  for (const option of options) {
    console.log(`${option.key}. ${option.label}`);
  }
}

async function askMenuChoice(rl, prompt, options, providedChoice) {
  const validKeys = new Set(options.map((option) => option.key));
  if (providedChoice) {
    if (!validKeys.has(providedChoice)) {
      fail(`Unsupported menu choice: ${providedChoice}`);
    }
    console.log(`${prompt} ${providedChoice}`);
    return providedChoice;
  }

  while (true) {
    const answer = (await rl.question(prompt)).trim();
    if (validKeys.has(answer)) {
      return answer;
    }
    console.log(`Choose one of: ${options.map((option) => option.key).join(", ")}`);
  }
}

function printResourceDetails(metadata) {
  console.log("");
  console.log(`${metadata.title} (${metadata.id})`);
  console.log(`Type: ${metadata.category}`);
  console.log(metadata.description);
  if (metadata.steps.length > 0) {
    console.log("How it works:");
    for (const step of metadata.steps) {
      console.log(`- ${step}`);
    }
  }
  if (metadata.tips.length > 0) {
    console.log("Tips:");
    for (const tip of metadata.tips) {
      console.log(`- ${tip}`);
    }
  }
  if (metadata.canvasId) {
    console.log(`Canvas template: ${metadata.canvasId}`);
  }
  if (metadata.snippet) {
    console.log(`Snippet: ${metadata.snippet}`);
  }
}

function printCanvasDetails(metadata) {
  console.log("");
  console.log(`${metadata.title} (${metadata.id})`);
  if (metadata.purpose) {
    console.log(`Purpose: ${metadata.purpose}`);
  }
  if (metadata.howToUse) {
    console.log(`How to use: ${metadata.howToUse}`);
  }
  if (metadata.sections.length > 0) {
    console.log("Sections:");
    for (const section of metadata.sections) {
      console.log(`- ${section.title}: ${section.description}`);
    }
  }
}

async function runInteractiveStart(data, options) {
  const answers = {};
  const providedAnswers = (options.answers || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  const useProvidedAnswers = providedAnswers.length > 0;
  const rl = !useProvidedAnswers
    ? readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    : null;
  let answerIndex = 0;
  let recommendedStation = null;
  let stoppingCriterion = null;

  console.log(`APIOps guided station check (${data.length} core stations)`);
  console.log("Answer each criterion with yes, no, or skip.");
  console.log("The guide stops at the first `no` and recommends that station immediately.\n");

  try {
    for (const station of data) {
      console.log(`${station.order}. ${station.title} (${station.id})`);
      console.log(`   ${station.description}`);

      for (const criterion of station.criteria) {
        let normalized;
        const promptPrefix = `   - ${criterion.label}`;

        if (useProvidedAnswers) {
          const providedAnswer = providedAnswers[answerIndex];
          if (!providedAnswer) {
            fail(`Not enough answers in --answers. Stopped at station ${station.id}, criterion ${criterion.id}.`);
          }
          normalized = methodEngine.normalizeAnswer(providedAnswer);
          if (!normalized) {
            fail(`Unsupported answer in --answers at position ${answerIndex + 1}: ${providedAnswer}`);
          }
          console.log(`${promptPrefix} -> ${providedAnswer}`);
        } else {
          while (!normalized) {
            const answer = await rl.question(`${promptPrefix} (yes/no/skip): `);
            normalized = methodEngine.normalizeAnswer(answer);
            if (!normalized) {
              console.log("Please answer yes, no, or skip.");
            }
          }
        }

        answerIndex += 1;
        answers[criterion.id] = normalized;

        if (normalized === "not-met") {
          recommendedStation = station;
          stoppingCriterion = criterion;
          break;
        }
      }

      console.log("");

      if (recommendedStation) {
        break;
      }
    }
  } finally {
    rl?.close();
  }

  const result = recommendedStation
    ? {
      recommendedStation: {
        id: recommendedStation.id,
        title: recommendedStation.title,
        unmetCriteria: [stoppingCriterion]
      }
    }
    : methodEngine.evaluateStartRecommendation(data, answers);

  console.log("");
  console.log(`Recommended start station: ${result.recommendedStation.title} (${result.recommendedStation.id})`);
  console.log(recommendedStation
    ? "Reason: this is the first station where a required criterion was marked as not met."
    : "Reason: all checked core-station criteria were marked as met.");

  if (result.recommendedStation.unmetCriteria.length > 0) {
    console.log("Criteria still to address here:");
    for (const criterion of result.recommendedStation.unmetCriteria) {
      console.log(`- ${criterion.label}`);
    }
  }

  const actionOptions = [
    { key: "1", label: "Review station resources" },
    { key: "2", label: "Generate empty starter canvases for this station" },
    { key: "3", label: "Exit" }
  ];
  const mappedActions = {
    resources: "1",
    canvases: "2",
    exit: "3"
  };
  const providedAction = options["next-action"] ? mappedActions[options["next-action"]] : null;
  const actionRl = !providedAction
    ? readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    : null;

  console.log("");
  console.log("Next step options:");
  printMenuOptions(actionOptions);

  const actionChoice = await askMenuChoice(actionRl, "Choose next step (1/2/3): ", actionOptions, providedAction);
  actionRl?.close();

  if (actionChoice === "1") {
    await runInteractiveResources({
      station: result.recommendedStation.id,
      locale: options.locale || methodEngine.DEFAULT_LOCALE,
      style: options.style || methodEngine.DEFAULT_STYLE
    });
    return;
  }

  if (actionChoice === "2") {
    const generateResult = methodEngine.generateCanvases({
      station: result.recommendedStation.id,
      locale: options.locale || methodEngine.DEFAULT_LOCALE,
      style: options.style || methodEngine.DEFAULT_STYLE,
      output: methodEngine.DEFAULT_OUTPUT_DIR
    });
    printGeneratedCanvasText(generateResult);
    return;
  }

  const nextHints = getNextStepHints(result.recommendedStation.id);
  console.log("");
  console.log("You can continue later with:");
  console.log(`- ${nextHints.resources}`);
  console.log(`- ${nextHints.canvases}`);
}

function printResourceText(data) {
  console.log(`${data.stationTitle} (${data.stationId})`);
  console.log(`${data.stationDescription}\n`);
  for (const step of data.steps) {
    console.log(`${step.order}. ${step.step}`);
    if (step.missing) {
      console.log(`   Missing resource mapping for ${step.resourceId}`);
      continue;
    }
    console.log(`   Resource: ${step.resourceTitle} (${step.resourceId})`);
    console.log(`   Type: ${step.category}`);
    if (step.canvasId) {
      console.log(`   Canvas template: ${step.canvasId}`);
    }
    if (step.snippet) {
      console.log(`   Snippet: ${step.snippet}`);
    }
    console.log(`   ${step.resourceDescription}`);
  }
}

async function runInteractiveResources(options) {
  const locale = options.locale || methodEngine.DEFAULT_LOCALE;
  const style = methodEngine.normalizeStyle(options.style || methodEngine.DEFAULT_STYLE);
  const output = options.output || methodEngine.DEFAULT_OUTPUT_DIR;
  const data = methodEngine.buildStationResourceData(options.station, locale, style);
  const scriptedActions = (options["step-actions"] || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  let scriptedIndex = 0;
  const useScriptedActions = scriptedActions.length > 0;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(`${data.stationTitle} (${data.stationId})`);
  console.log(`${data.stationDescription}\n`);

  try {
    for (const step of data.steps) {
      console.log(`${step.order}. ${step.step}`);
      if (step.missing) {
        console.log(`Missing resource mapping for ${step.resourceId}\n`);
        continue;
      }

      console.log(`Resource: ${step.resourceTitle} (${step.resourceId})`);
      console.log(`Type: ${step.category}`);

      while (true) {
        const menuOptions = [
          { key: "1", label: "View resource details" },
          ...(step.canvasId ? [{ key: "2", label: "View related canvas details" }] : []),
          ...(step.canvasId ? [{ key: "3", label: "Fill the canvas section by section and save JSON" }] : []),
          ...(step.canvasId ? [{ key: "4", label: "Show CanvasCreator edit URL" }] : []),
          ...(step.canvasId ? [{ key: "5", label: "Export current canvas JSON to SVG" }] : []),
          ...(step.canvasId ? [{ key: "6", label: "Create or show starter canvas JSON" }] : []),
          { key: step.canvasId ? "7" : "2", label: "Continue to next step" },
          { key: step.canvasId ? "8" : "3", label: "Exit" }
        ];

        printMenuOptions(menuOptions);
        const scriptedAction = useScriptedActions ? scriptedActions[scriptedIndex] : null;
        const choice = await askMenuChoice(
          rl,
          `Choose action for step ${step.order}: `,
          menuOptions,
          scriptedAction
        );
        if (useScriptedActions) {
          scriptedIndex += 1;
        }

        if (choice === "1") {
          printResourceDetails(methodEngine.buildResourceMetadata(step.resourceId, locale));
          console.log("");
          continue;
        }

        if (choice === "2" && step.canvasId) {
          printCanvasDetails(methodEngine.buildCanvasMetadata(step.canvasId, locale));
          console.log("");
          continue;
        }

        if (choice === "3" && step.canvasId) {
          const outPath = await fillCanvasSectionsInteractive(data.stationId, step, locale, output, rl);
          console.log(`Saved canvas JSON: ${outPath}`);
          console.log("");
          continue;
        }

        if (choice === "4" && step.canvasId) {
          const outPath = methodEngine.generateCanvasForStationResource(data.stationId, step.resourceId, locale, output);
          console.log("");
          console.log(`CanvasCreator URL: ${methodEngine.getCanvasCreatorUrl(step.canvasId, locale)}`);
          console.log(`Import or edit JSON from: ${outPath}`);
          console.log("After editing in CanvasCreator, export JSON/SVG/PDF/PNG there and copy the files back into this repo.");
          console.log("");
          continue;
        }

        if (choice === "5" && step.canvasId) {
          const exportResult = exportCanvasSvgForResource(data.stationId, step, locale, output);
          console.log("");
          if (exportResult.ok) {
            console.log(`SVG export: ${exportResult.outputFile}`);
            console.log(`Source JSON: ${exportResult.jsonPath}`);
          } else {
            console.log(`SVG export unavailable: ${exportResult.reason}`);
            console.log(`Canvas JSON is still available at: ${exportResult.jsonPath}`);
            console.log(`CanvasCreator URL: ${methodEngine.getCanvasCreatorUrl(step.canvasId, locale)}`);
          }
          console.log("");
          continue;
        }

        if (choice === "6" && step.canvasId) {
          const outPath = methodEngine.generateCanvasForStationResource(data.stationId, step.resourceId, locale, output);
          console.log("");
          console.log(`Starter canvas JSON: ${outPath}`);
          console.log("");
          continue;
        }

        const continueKey = step.canvasId ? "7" : "2";
        const exitKey = step.canvasId ? "8" : "3";

        if (choice === continueKey) {
          console.log("");
          break;
        }

        if (choice === exitKey) {
          console.log("");
          console.log("Stopped resource walkthrough.");
          return;
        }
      }
    }
  } finally {
    rl.close();
  }

  console.log("Reached the end of the station steps.");
}

function printGeneratedCanvasText(result) {
  console.log(`Generated empty canvases in ${result.outputRoot}`);
  if (result.generated.length > 0) {
    console.log("");
    for (const entry of result.generated) {
      console.log(`- ${entry.resourceId} -> ${entry.file}`);
    }
  }

  if (result.skipped.length > 0) {
    console.log("");
    console.log("Skipped existing files:");
    for (const entry of result.skipped) {
      console.log(`- ${entry.resourceId} -> ${entry.file}`);
    }
    console.log("\nUse --force to overwrite existing starter files.");
  }
}

async function main() {
  const { command, options } = parseArgs(process.argv.slice(2));

  if (command === "help") {
    printUsage();
    return;
  }

  if (command === "start") {
    const data = methodEngine.buildStartData(options.locale || methodEngine.DEFAULT_LOCALE);
    if (options.json) {
      console.log(JSON.stringify(data, null, 2));
      return;
    }

    if (options.list || (!process.stdin.isTTY && !options.answers)) {
      printStartText(data);
      return;
    }

    await runInteractiveStart(data, options);
    return;
  }

  if (command === "resources") {
    if (!options.station) {
      fail("resources requires --station <station-id>");
    }

    const data = methodEngine.buildStationResourceData(
      options.station,
      options.locale || methodEngine.DEFAULT_LOCALE,
      methodEngine.normalizeStyle(options.style || methodEngine.DEFAULT_STYLE)
    );
    if (options.json) {
      console.log(JSON.stringify(data, null, 2));
      return;
    }

    if (!options.list && (process.stdin.isTTY || options["step-actions"])) {
      await runInteractiveResources(options);
      return;
    }

    printResourceText(data);
    return;
  }

  if (command === "generate-canvases") {
    const result = methodEngine.generateCanvases(options);
    if (options.json) {
      console.log(JSON.stringify(result, null, 2));
      return;
    }
    printGeneratedCanvasText(result);
    return;
  }

  fail(`Unknown command: ${command}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
