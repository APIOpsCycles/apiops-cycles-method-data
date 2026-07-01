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
    help: false,
    version: false,
    yes: false,
    name: undefined,
    locale: undefined,
    style: undefined,
    install: undefined,
    errors: []
  };

  const readValue = (arg, key, index) => {
    const equalIndex = arg.indexOf("=");
    if (equalIndex !== -1) {
      const value = arg.slice(equalIndex + 1);
      if (!value) {
        args.errors.push(`Missing value for ${arg.slice(0, equalIndex)}.`);
      }
      return { value, nextIndex: index };
    }

    const value = argv[index + 1];
    if (!value || value.startsWith("--")) {
      args.errors.push(`Missing value for --${key}.`);
      return { value: undefined, nextIndex: index };
    }
    return { value, nextIndex: index + 1 };
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--help" || arg === "-h") {
      args.help = true;
      continue;
    }
    if (arg === "--version" || arg === "-v") {
      args.version = true;
      continue;
    }
    if (arg === "--yes" || arg === "-y") {
      args.yes = true;
      continue;
    }
    if (arg === "--no-install") {
      args.install = false;
      continue;
    }
    if (arg === "--name" || arg.startsWith("--name=")) {
      const result = readValue(arg, "name", i);
      args.name = result.value;
      i = result.nextIndex;
      continue;
    }
    if (arg === "--locale" || arg.startsWith("--locale=")) {
      const result = readValue(arg, "locale", i);
      args.locale = result.value;
      i = result.nextIndex;
      continue;
    }
    if (arg === "--style" || arg.startsWith("--style=")) {
      const result = readValue(arg, "style", i);
      args.style = result.value;
      i = result.nextIndex;
      continue;
    }
    if (arg.startsWith("-")) {
      args.errors.push(`Unknown option: ${arg}`);
      continue;
    }
    if (!args.name) {
      args.name = arg;
      continue;
    }
    if (args.name !== arg) {
      args.errors.push(`Unexpected positional argument: ${arg}`);
      continue;
    }
  }

  return args;
}

function getPackageVersion() {
  const packageJsonPath = path.resolve(__dirname, "..", "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  return packageJson.version;
}

function printHelp() {
  console.log(`create-apiops ${getPackageVersion()}

Scaffold a new APIOps project with method guidance, API design artifacts,
OpenAPI linting, and APIOps Cycles audit scaffolding.

Usage:
  create-apiops [project-name] [options]
  npm create apiops@latest -- [project-name] [options]

Options:
  --name <name>        Project directory and package name. Same as project-name.
  --locale <locale>    Default locale for generated method commands. Default: ${DEFAULTS.locale}
  --style <style>      API style focus: REST, Event, GraphQL, or "Not sure yet". Default: ${DEFAULTS.style}
  --yes, -y            Accept defaults for omitted options and run without prompts.
                      Use this in non-interactive shells when any prompt answer is omitted.
  --no-install         Skip npm install and starter canvas generation.
  --version, -v        Show the create-apiops version.
  --help, -h           Show this help.

Examples:
  npm create apiops@latest
  npm create apiops@latest my-api
  npm create apiops@latest -- --name my-api --locale en --style REST --yes
  npm create apiops@latest -- my-api --locale en --style REST --yes --no-install
`);
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

function hasCompleteNonInteractiveConfig(args) {
  return args.name && args.locale && args.style && args.install !== undefined;
}

async function getScaffoldConfig() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (args.version) {
    console.log(getPackageVersion());
    process.exit(0);
  }

  if (args.errors.length > 0) {
    console.error(args.errors.join("\n"));
    console.error("\nRun `create-apiops --help` for usage.");
    process.exit(1);
  }

  const initial = {
    projectName: args.name || DEFAULTS.name,
    locale: args.locale || DEFAULTS.locale,
    apiStyle: normalizeStyle(args.style || DEFAULTS.style),
    installNow: args.install === undefined ? DEFAULTS.install : args.install
  };

  if (args.yes || hasCompleteNonInteractiveConfig(args)) {
    return initial;
  }

  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    console.error("create-apiops cannot prompt because stdin or stdout is not interactive.");
    console.error("Pass --yes to accept defaults for omitted options. To skip --yes, pass --name, --locale, --style, and --no-install.");
    console.error("Example: npm create apiops@latest -- --name my-api --locale en --style REST --yes");
    process.exit(1);
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
  replaceInFile(path.join(targetDir, "package.json"), replacements);
  replaceInFile(path.join(targetDir, "specs", "openapi", "api.yaml"), replacements);

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
        "./node_modules/apiops-cycles-method-data/bin/method-cli.js",
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
