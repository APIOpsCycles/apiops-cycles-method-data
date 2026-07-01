import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { mkdtempSync, readFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { execFileSync, spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, "..");
const cliPath = resolve(repoRoot, "packages/create-apiops/bin/create-apiops-project.js");
const installedMethodCliPath = join("node_modules", "apiops-cycles-method-data", "bin", "method-cli.js");
const npmCacheDir = resolve(repoRoot, ".npm-pack-cache");

function resolveNpmCommand() {
  const nodeBinDir = dirname(process.execPath);
  const candidates = [
    resolve(nodeBinDir, "node_modules", "npm", "bin", "npm-cli.js"),
    resolve(nodeBinDir, "..", "lib", "node_modules", "npm", "bin", "npm-cli.js")
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return {
        command: process.execPath,
        args: [candidate]
      };
    }
  }

  return {
    command: process.platform === "win32" ? "npm.cmd" : "npm",
    args: []
  };
}

const tempRoot = mkdtempSync(join(tmpdir(), "create-apiops-test-"));
const projectName = "ci-apiops-project";
const projectDir = join(tempRoot, projectName);
let localTarball = null;
const npmCommand = resolveNpmCommand();
const runInstallIntegration = process.argv.includes("--install-integration");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function runStep(label, command, args, options = {}) {
  const timeout = options.timeout ?? 180000;
  console.log(`\n[create-apiops test] ${label}`);
  try {
    return execFileSync(command, args, {
      timeout,
      ...options
    });
  } catch (error) {
    if (error.code === "ETIMEDOUT") {
      const commandLine = [command, ...args].join(" ");
      throw new Error(`[create-apiops test] ${label} timed out after ${timeout} ms.\nCommand: ${commandLine}`);
    }
    throw error;
  }
}

try {
  const helpOutput = execFileSync(
    "node",
    [cliPath, "--help"],
    { cwd: tempRoot, encoding: "utf8" }
  );
  assert(helpOutput.includes("Usage:"), "Expected create-apiops --help to print usage.");
  assert(
    helpOutput.includes("npm create apiops@latest -- --name my-api"),
    "Expected help output to document npm-create flag forwarding."
  );
  assert(
    !existsSync(join(tempRoot, "my-api-project")),
    "Expected create-apiops --help to exit without creating the default project."
  );

  const nonInteractivePrompt = spawnSync(
    "node",
    [cliPath, "needs-prompt-answers"],
    { cwd: tempRoot, encoding: "utf8" }
  );
  assert(
    nonInteractivePrompt.status === 1,
    "Expected omitted answers in a non-interactive shell to fail clearly instead of waiting for prompts."
  );
  assert(
    nonInteractivePrompt.stderr.includes("cannot prompt"),
    "Expected non-interactive prompt failure to explain the prompt problem."
  );
  assert(
    nonInteractivePrompt.stderr.includes("--yes"),
    "Expected non-interactive prompt failure to recommend --yes."
  );

  const positionalProjectName = "positional-apiops-project";
  const positionalProjectDir = join(tempRoot, positionalProjectName);
  execFileSync(
    "node",
    [
      cliPath,
      positionalProjectName,
      "--yes",
      "--no-install"
    ],
    { cwd: tempRoot, stdio: "inherit" }
  );

  const positionalPkg = JSON.parse(readFileSync(join(positionalProjectDir, "package.json"), "utf8"));
  assert(
    positionalPkg.name === positionalProjectName,
    "Expected first positional argument to set the scaffolded project name."
  );

  execFileSync(
    "node",
    [
      cliPath,
      "--yes",
      "--no-install",
      "--name", projectName,
      "--locale", "en",
      "--style", "REST"
    ],
    { cwd: tempRoot, stdio: "inherit" }
  );

  const packageJsonPath = join(projectDir, "package.json");
  const openApiPath = join(projectDir, "specs", "openapi", "api.yaml");
  const readmePath = join(projectDir, "README.md");
  const localAuditChecklistPath = join(projectDir, "specs", "audit", "api-audit-checklist.json");
  const localStyleGuidePath = join(projectDir, "specs", "style", "api-style-guide.json");

  assert(existsSync(packageJsonPath), "Expected scaffolded package.json file.");
  assert(existsSync(openApiPath), "Expected scaffolded OpenAPI file.");
  assert(existsSync(readmePath), "Expected scaffolded README file.");
  assert(!existsSync(localAuditChecklistPath), "Did not expect a scaffolded local audit checklist copy.");
  assert(!existsSync(localStyleGuidePath), "Did not expect a scaffolded local style guide copy.");

  const expectedStarterFiles = [
    join(projectDir, "specs", "canvases"),
    join(projectDir, "specs", "audit", "README.md"),
    join(projectDir, "specs", "openapi", "api.yaml"),
    join(projectDir, "docs", "api", "strategy", ".gitkeep"),
    join(projectDir, "AGENTS.md")
  ];
  for (const starterPath of expectedStarterFiles) {
    assert(existsSync(starterPath), `Expected starter path: ${starterPath}`);
  }

  const pkg = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  const openApiContent = readFileSync(openApiPath, "utf8");
  assert(pkg.name === projectName, "Scaffolded package name was not set correctly.");
  assert(pkg.scripts?.method, "Expected generic method script in scaffolded package.");
  assert(pkg.scripts?.["method:start"], "Expected method:start script in scaffolded package.");
  assert(
    pkg.scripts["method:start"].includes("--default-locale en"),
    "Expected method:start to pass the project default locale without forcing the runtime locale."
  );
  assert(pkg.scripts?.["method:resources:strategy"], "Expected method:resources:strategy script in scaffolded package.");
  assert(pkg.scripts?.["method:canvases:new-api"], "Expected method:canvases:new-api script in scaffolded package.");
  assert(pkg.scripts?.["method:stations"], "Expected method:stations script in scaffolded package.");
  assert(pkg.scripts?.["method:resource:audit"], "Expected method:resource:audit script in scaffolded package.");
  assert(pkg.scripts?.["method:canvas:rest"], "Expected method:canvas:rest script for REST style.");
  assert(
    openApiContent.includes("title: Sample Catalog API"),
    "Expected scaffolded OpenAPI file to be copied from the canonical starter contract."
  );
  assert(
    openApiContent.includes("openapi: 3.0.3"),
    "Expected scaffolded OpenAPI file to contain the canonical OpenAPI snippet content."
  );

  if (!runInstallIntegration) {
    console.log("create-apiops scaffold fast test passed.");
    console.log("Install-heavy generated project integration was skipped. Run `npm run test:create-apiops:integration` to include npm install and generated project commands.");
  } else {

  const packJson = runStep(
    "Packing apiops-cycles-method-data for generated-project install",
    npmCommand.command,
    [...npmCommand.args, "pack", "--json", "--cache", npmCacheDir],
    { cwd: repoRoot, encoding: "utf8" }
  );
  localTarball = JSON.parse(packJson)[0]?.filename;
  assert(localTarball, "Failed to create local apiops-cycles-method-data tarball for integration test.");

  runStep(
    "Installing local package tarball into generated project",
    npmCommand.command,
    [...npmCommand.args, "install", resolve(repoRoot, localTarball), "--cache", npmCacheDir],
    {
      cwd: projectDir,
      stdio: "inherit"
    }
  );

  const engineImportOutput = runStep(
    "Checking generated project method-engine import",
    process.execPath,
    [
      "--input-type=module",
      "-e",
      "import { buildStartData } from 'apiops-cycles-method-data/method-engine'; const stations = buildStartData('en'); console.log(stations[0]?.id ?? '');"
    ],
    {
      cwd: projectDir,
      encoding: "utf8"
    }
  ).trim();
  assert(
    engineImportOutput === "api-product-strategy",
    "Expected installed package to expose the reusable method-engine export."
  );

  runStep("Running generated project method:stations", npmCommand.command, [...npmCommand.args, "run", "method:stations", "--cache", npmCacheDir], {
    cwd: projectDir,
    stdio: "inherit"
  });

  runStep("Running generated project method:start", npmCommand.command, [...npmCommand.args, "run", "method:start", "--cache", npmCacheDir], {
    cwd: projectDir,
    stdio: "inherit"
  });

  const guidedAnswers = Array.from({ length: 21 }, () => "no").join(",");
  const guidedStartOutput = runStep(
    "Checking generated project guided start flow",
    process.execPath,
    [
      join(projectDir, installedMethodCliPath),
      "start",
      "--locale", "en",
      "--answers", guidedAnswers,
      "--next-action", "exit"
    ],
    {
      cwd: projectDir,
      encoding: "utf8"
    }
  );
  assert(
    guidedStartOutput.includes("Recommended start station: API Product Strategy - Turn APIs Into Strategic Products (api-product-strategy)"),
    "Expected guided start flow to recommend API Product Strategy when all answers are no."
  );
  assert(
    guidedStartOutput.includes("Next step options:"),
    "Expected guided start flow to show interactive next-step options."
  );

  const interactiveResourcesOutput = runStep(
    "Checking generated project interactive resources flow",
    process.execPath,
    [
      join(projectDir, installedMethodCliPath),
      "resources",
      "--station", "api-product-strategy",
      "--locale", "en",
      "--step-actions", "2,6,7,7,7,7"
    ],
    {
      cwd: projectDir,
      encoding: "utf8"
    }
  );
  assert(
    interactiveResourcesOutput.includes("Starter canvas JSON:"),
    "Expected interactive resources flow to create or show starter canvas JSON."
  );

  runStep("Running generated project method:resources:strategy", npmCommand.command, [...npmCommand.args, "run", "method:resources:strategy", "--cache", npmCacheDir], {
    cwd: projectDir,
    stdio: "inherit"
  });

  runStep("Running generated project method:canvases:new-api", npmCommand.command, [...npmCommand.args, "run", "method:canvases:new-api", "--cache", npmCacheDir], {
    cwd: projectDir,
    stdio: "inherit"
  });

  const expectedGeneratedCanvases = [
    join(projectDir, "specs", "canvases", "api-product-strategy", "customerJourneyCanvas.empty.json"),
    join(projectDir, "specs", "canvases", "api-product-strategy", "domainCanvas.empty.json"),
    join(projectDir, "specs", "canvases", "api-product-strategy", "apiValuePropositionCanvas.empty.json"),
    join(projectDir, "specs", "canvases", "api-product-strategy", "apiBusinessModelCanvas.empty.json"),
    join(projectDir, "specs", "canvases", "api-platform-architecture", "businessImpactCanvas.empty.json"),
    join(projectDir, "specs", "canvases", "api-platform-architecture", "locationsCanvas.empty.json"),
    join(projectDir, "specs", "canvases", "api-platform-architecture", "capacityCanvas.empty.json"),
    join(projectDir, "specs", "canvases", "api-design", "interactionCanvas.empty.json"),
    join(projectDir, "specs", "canvases", "api-design", "restCanvas.empty.json")
  ];

  for (const canvasPath of expectedGeneratedCanvases) {
    assert(existsSync(canvasPath), `Expected generated starter canvas: ${canvasPath}`);
  }

  console.log("create-apiops scaffold integration test passed.");
  }
} finally {
  if (localTarball) {
    rmSync(resolve(repoRoot, localTarball), { force: true });
  }
  rmSync(tempRoot, { recursive: true, force: true });
}
