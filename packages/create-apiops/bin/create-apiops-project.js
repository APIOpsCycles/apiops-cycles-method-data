#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templateDir = path.resolve(__dirname, "..", "template");

function ask(rl, question, fallback = "") {
  return new Promise((resolve) => {
    rl.question(
      fallback ? `${question} (${fallback}): ` : `${question}: `,
      (answer) => resolve(answer.trim() || fallback),
    );
  });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, "utf8");
  for (const [from, to] of Object.entries(replacements)) {
    content = content.replaceAll(from, to);
  }
  fs.writeFileSync(filePath, content);
}

function getScripts(locale, apiStyle) {
  const base = {
    "method:stations": `node ./node_modules/apiops-cycles-method-data/.agents/skills/new-api-guide/scripts/get-core-stations.cjs ${locale}`,
    "method:resource:audit": `node ./node_modules/apiops-cycles-method-data/.agents/skills/new-api-guide/scripts/get-resource-metadata.cjs api-audit-checklist ${locale}`
  };

  if (apiStyle === "REST" || apiStyle === "Not sure yet") {
    base["method:canvas:rest"] =
      `node ./node_modules/apiops-cycles-method-data/.agents/skills/new-api-guide/scripts/get-canvas-metadata.cjs restCanvas ${locale}`;
  }
  if (apiStyle === "Event" || apiStyle === "Not sure yet") {
    base["method:canvas:event"] =
      `node ./node_modules/apiops-cycles-method-data/.agents/skills/new-api-guide/scripts/get-canvas-metadata.cjs eventCanvas ${locale}`;
  }
  if (apiStyle === "GraphQL" || apiStyle === "Not sure yet") {
    base["method:canvas:graphql"] =
      `node ./node_modules/apiops-cycles-method-data/.agents/skills/new-api-guide/scripts/get-canvas-metadata.cjs graphqlCanvas ${locale}`;
  }

  return base;
}

function createStarterCanvas(targetDir, locale = "en", canvasId = "domainCanvas") {
  const canvasDataPath = path.join(
    targetDir,
    "node_modules",
    "apiops-cycles-method-data",
    "canvasData.json"
  );

  if (!fs.existsSync(canvasDataPath)) {
    return;
  }

  const canvasData = JSON.parse(fs.readFileSync(canvasDataPath, "utf8"));
  const canvas = canvasData[canvasId];

  if (!canvas) {
    return;
  }

  const starter = {
    templateId: canvasId,
    locale,
    metadata: {
      source: "APIOps Cycles method",
      license: "CC-BY-SA 4.0",
      authors: ["Project team"],
      website: "www.apiopscycles.com",
      date: new Date().toISOString()
    },
    sections: canvas.sections.map((section) => ({
      sectionId: section.id,
      stickyNotes: [
        {
          content: "Placeholder",
          size: 80,
          color: "#FFF399"
        }
      ]
    }))
  };

  const outPath = path.join(targetDir, "specs", "canvases", "example.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(starter, null, 2)}\n`);
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const projectName = await ask(rl, "Project name", "my-api-project");
  const locale = await ask(rl, "Default locale", "en");
  const apiStyle = await ask(rl, "API style focus [REST/Event/GraphQL/Not sure yet]", "REST");
  const installNow = await ask(rl, "Install dependencies now? [yes/no]", "yes");
  rl.close();

  const targetDir = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(targetDir)) {
    console.error(`Target already exists: ${targetDir}`);
    process.exit(1);
  }

  copyDir(templateDir, targetDir);

  const replacements = {
    "__PROJECT_NAME__": projectName,
    "__LOCALE__": locale,
    "__API_TITLE__": projectName.replace(/[-_]/g, " ")
  };

  replaceInFile(path.join(targetDir, "README.md"), replacements);
  replaceInFile(path.join(targetDir, "specs", "openapi", "api.yaml"), replacements);

  const packageJsonPath = path.join(targetDir, "package.json");
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  pkg.name = projectName;
  pkg.scripts = {
    ...pkg.scripts,
    ...getScripts(locale, apiStyle)
  };
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`);

  console.log(`Created ${projectName}`);

  if (installNow.toLowerCase() === "yes") {
    const result = spawnSync("npm", ["install"], {
      cwd: targetDir,
      stdio: "inherit",
      shell: true
    });
    if (result.status !== 0) {
      console.error("npm install failed");
      process.exit(result.status || 1);
    }

    createStarterCanvas(targetDir, locale, "domainCanvas");
  } else {
    console.log("\nStarter canvas was not generated yet.");
    console.log("Run `npm install` first, then regenerate it with the scaffolder or a helper command.");
  }

  console.log("\nNext steps:");
  console.log(`  cd ${projectName}`);
  console.log("  npm run method:stations");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
