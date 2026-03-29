#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templateDir = path.resolve(__dirname, "..", "template");

const DEFAULTS = {
  name: "my-api-project",
  locale: "en",
  style: "REST",
  install: true
};

function parseArgs(argv) {
  const args = {
    yes: false,
    name: undefined,
    locale: undefined,
    style: undefined,
    install: undefined
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--yes") {
      args.yes = true;
      continue;
    }
    if (arg === "--no-install") {
      args.install = false;
      continue;
    }
    if (arg === "--name") {
      args.name = argv[i + 1];
      i += 1;
      continue;
    }
    if (arg === "--locale") {
      args.locale = argv[i + 1];
      i += 1;
      continue;
    }
    if (arg === "--style") {
      args.style = argv[i + 1];
      i += 1;
      continue;
    }
  }

  return args;
}

function normalizeStyle(style) {
  const value = String(style || "").trim().toLowerCase();
  const map = {
    rest: "REST",
    event: "Event",
    graphql: "GraphQL",
    "not sure yet": "Not sure yet"
  };
  return map[value] || style;
}

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

function resolveNpmCommand() {
  const npmCliPath = path.resolve(path.dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js");
  if (fs.existsSync(npmCliPath)) {
    return {
      command: process.execPath,
      args: [npmCliPath]
    };
  }

  return {
    command: process.platform === "win32" ? "npm.cmd" : "npm",
    args: []
  };
}

function runCommand(command, args, options = {}) {
  return spawnSync(command, args, {
    shell: false,
    ...options
  });
}

function getScripts(locale, apiStyle) {
  const base = {
    "method": "node ./node_modules/apiops-cycles-method-data/packages/create-apiops/bin/method-cli.js",
    "method:start": `node ./node_modules/apiops-cycles-method-data/packages/create-apiops/bin/method-cli.js start --default-locale ${locale}`,
    "method:resources:strategy": `node ./node_modules/apiops-cycles-method-data/packages/create-apiops/bin/method-cli.js resources --station api-product-strategy --locale ${locale}`,
    "method:canvases:new-api": `node ./node_modules/apiops-cycles-method-data/packages/create-apiops/bin/method-cli.js generate-canvases --preset new-api --style "${apiStyle}" --locale ${locale} --output ./specs/canvases`,
    "method:stations": `node ./node_modules/apiops-cycles-method-data/skills/new-api-guide/scripts/get-core-stations.cjs ${locale}`,
    "method:resource:audit": `node ./node_modules/apiops-cycles-method-data/skills/new-api-guide/scripts/get-resource-metadata.cjs api-audit-checklist ${locale}`
  };

  if (apiStyle === "REST" || apiStyle === "Not sure yet") {
    base["method:canvas:rest"] =
      `node ./node_modules/apiops-cycles-method-data/skills/new-api-guide/scripts/get-canvas-metadata.cjs restCanvas ${locale}`;
  }
  if (apiStyle === "Event" || apiStyle === "Not sure yet") {
    base["method:canvas:event"] =
      `node ./node_modules/apiops-cycles-method-data/skills/new-api-guide/scripts/get-canvas-metadata.cjs eventCanvas ${locale}`;
  }
  if (apiStyle === "GraphQL" || apiStyle === "Not sure yet") {
    base["method:canvas:graphql"] =
      `node ./node_modules/apiops-cycles-method-data/skills/new-api-guide/scripts/get-canvas-metadata.cjs graphqlCanvas ${locale}`;
  }

  return base;
}

function hasMissingFlagValue(args) {
  return ["name", "locale", "style"].some((key) => args[key] === undefined && process.argv.includes(`--${key}`));
}

async function getScaffoldConfig() {
  const args = parseArgs(process.argv.slice(2));

  if (hasMissingFlagValue(args)) {
    console.error("Missing value for one of --name, --locale, or --style.");
    process.exit(1);
  }

  const initial = {
    projectName: args.name || DEFAULTS.name,
    locale: args.locale || DEFAULTS.locale,
    apiStyle: normalizeStyle(args.style || DEFAULTS.style),
    installNow: args.install === undefined ? DEFAULTS.install : args.install
  };

  if (args.yes || (args.name && args.locale && args.style && args.install !== undefined)) {
    return initial;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const projectName = args.name || await ask(rl, "Project name", initial.projectName);
  const locale = args.locale || await ask(rl, "Default locale", initial.locale);
  const apiStyle = normalizeStyle(args.style || await ask(rl, "API style focus [REST/Event/GraphQL/Not sure yet]", initial.apiStyle));
  const installAnswer = args.install === undefined
    ? await ask(rl, "Install dependencies now? [yes/no]", initial.installNow ? "yes" : "no")
    : (args.install ? "yes" : "no");
  rl.close();

  return {
    projectName,
    locale,
    apiStyle,
    installNow: installAnswer.toLowerCase() === "yes"
  };
}

async function main() {
  const { projectName, locale, apiStyle, installNow } = await getScaffoldConfig();

  const targetDir = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(targetDir)) {
    console.error(`Target already exists: ${targetDir}`);
    process.exit(1);
  }

  copyDir(templateDir, targetDir);

  const replacements = {
    "__PROJECT_NAME__": projectName,
    "__LOCALE__": locale,
    "__API_TITLE__": projectName.replace(/[-_]/g, " "),
    "__API_STYLE__": apiStyle
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

  if (installNow) {
    const npmCommand = resolveNpmCommand();
    const result = runCommand(npmCommand.command, [...npmCommand.args, "install"], {
      cwd: targetDir,
      stdio: "inherit"
    });
    if (result.status !== 0) {
      console.error("npm install failed");
      process.exit(result.status || 1);
    }

    const canvasInit = runCommand(
      process.execPath,
      [
        "./node_modules/apiops-cycles-method-data/packages/create-apiops/bin/method-cli.js",
        "generate-canvases",
        "--preset", "new-api",
        "--style", apiStyle,
        "--locale", locale,
        "--output", "./specs/canvases"
      ],
      {
        cwd: targetDir,
        stdio: "inherit"
      }
    );

    if (canvasInit.status !== 0) {
      console.error("Starter canvas generation failed");
      process.exit(canvasInit.status || 1);
    }
  } else {
    console.log("\nStarter canvases were not generated yet.");
    console.log("Run `npm install` first, then `npm run method:canvases:new-api`.");
  }

  console.log("\nNext steps:");
  console.log(`  cd ${projectName}`);
  console.log("  npm run method:start");
  console.log("  npm run method:resources:strategy");
  console.log("  npm run method:canvases:new-api");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
