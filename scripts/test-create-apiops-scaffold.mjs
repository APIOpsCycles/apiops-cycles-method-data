import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { mkdtempSync, readFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, "..");
const cliPath = resolve(repoRoot, "packages/create-apiops/bin/create-apiops-project.js");

const tempRoot = mkdtempSync(join(tmpdir(), "create-apiops-test-"));
const projectName = "ci-apiops-project";
const projectDir = join(tempRoot, projectName);
let localTarball = null;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

try {
  execFileSync(
    "node",
    [
      cliPath,
      "--yes",
      "--name", projectName,
      "--locale", "en",
      "--style", "REST"
    ],
    { cwd: tempRoot, stdio: "inherit" }
  );

  const packageJsonPath = join(projectDir, "package.json");
  const openApiPath = join(projectDir, "specs", "openapi", "api.yaml");
  const readmePath = join(projectDir, "README.md");

  assert(existsSync(packageJsonPath), "Expected scaffolded package.json file.");
  assert(existsSync(openApiPath), "Expected scaffolded OpenAPI file.");
  assert(existsSync(readmePath), "Expected scaffolded README file.");

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
  assert(pkg.name === projectName, "Scaffolded package name was not set correctly.");
  assert(pkg.scripts?.["method:stations"], "Expected method:stations script in scaffolded package.");
  assert(pkg.scripts?.["method:resource:audit"], "Expected method:resource:audit script in scaffolded package.");
  assert(pkg.scripts?.["method:canvas:rest"], "Expected method:canvas:rest script for REST style.");

  const packJson = execFileSync("npm", ["pack", "--json"], { cwd: repoRoot, encoding: "utf8" });
  localTarball = JSON.parse(packJson)[0]?.filename;
  assert(localTarball, "Failed to create local apiops-cycles-method-data tarball for integration test.");

  execFileSync("npm", ["install", resolve(repoRoot, localTarball)], {
    cwd: projectDir,
    stdio: "inherit",
    shell: true
  });

  execFileSync("npm", ["run", "method:stations"], {
    cwd: projectDir,
    stdio: "inherit",
    shell: true
  });

  console.log("create-apiops scaffold integration test passed.");
} finally {
  if (localTarball) {
    rmSync(resolve(repoRoot, localTarball), { force: true });
  }
  rmSync(tempRoot, { recursive: true, force: true });
}
