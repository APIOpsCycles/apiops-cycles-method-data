import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import {
  mkdtempSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  rmSync,
  chmodSync
} from "node:fs";
import { tmpdir } from "node:os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, "..");
const starterContractPath = resolve(repoRoot, "src/snippets/api-contract-example.yaml");
const canonicalChecklistPath = resolve(repoRoot, "src/snippets/api-audit-checklist.json");
const tempYamlModulePath = join(repoRoot, "node_modules", "yaml");
const keepResults = process.argv.includes("--keep-results");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function writeText(filePath, content) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, content);
}

const tempRoot = mkdtempSync(join(tmpdir(), "run-design-audit-test-"));

try {
  if (!existsSync(tempYamlModulePath)) {
    writeText(join(tempYamlModulePath, "package.json"), JSON.stringify({
      name: "yaml",
      type: "module",
      exports: "./index.js"
    }, null, 2));
    writeText(join(tempYamlModulePath, "index.js"), `const parsedExampleContract = {
  openapi: "3.0.3",
  info: {
    title: "Sample Catalog API",
    version: "1.0.0",
    description: "Starter example for a read-only APIOps Cycles API."
  },
  servers: [
    { url: "/v1", description: "Versioned API base path" }
  ],
  tags: [
    { name: "catalog", description: "Browse and search catalog items" }
  ],
  paths: {
    "/items": {
      get: {
        tags: ["catalog"],
        summary: "List catalog items",
        description: "Returns a paginated list of public catalog items.",
        operationId: "listItems",
        parameters: [
          { $ref: "#/components/parameters/searchTerm" },
          { $ref: "#/components/parameters/categoryId" },
          { $ref: "#/components/parameters/page" },
          { $ref: "#/components/parameters/pageSize" }
        ],
        responses: {
          "200": {
            description: "Item list",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ItemListResponse" },
                examples: {
                  default: {
                    value: {
                      data: [{ itemId: "item-123", slug: "blue-widget", name: "Blue Widget", status: "published" }],
                      page: { number: 1, size: 20, totalItems: 1 }
                    }
                  }
                }
              }
            }
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "429": { $ref: "#/components/responses/TooManyRequests" }
        }
      }
    },
    "/items/{itemId}": {
      get: {
        tags: ["catalog"],
        summary: "Get item by id",
        description: "Returns a single public catalog item by opaque identifier.",
        operationId: "getItemById",
        parameters: [{ $ref: "#/components/parameters/itemId" }],
        responses: {
          "200": {
            description: "Item details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ItemDetail" }
              }
            }
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" }
        }
      }
    },
    "/items/by-slug/{slug}": {
      get: {
        tags: ["catalog"],
        summary: "Get item by slug",
        description: "Returns a single item by public slug.",
        operationId: "getItemBySlug",
        parameters: [{ $ref: "#/components/parameters/slug" }],
        responses: {
          "200": {
            description: "Item details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ItemDetail" }
              }
            }
          },
          "404": { $ref: "#/components/responses/NotFound" }
        }
      }
    },
    "/categories/{categoryId}/items": {
      get: {
        tags: ["catalog"],
        summary: "List items in category",
        description: "Returns public items in a category.",
        operationId: "listItemsByCategory",
        parameters: [{ $ref: "#/components/parameters/categoryId" }],
        responses: {
          "200": {
            description: "Category item list",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ItemListResponse" }
              }
            }
          },
          "404": { $ref: "#/components/responses/NotFound" }
        }
      }
    }
  },
  components: {
    parameters: {
      itemId: { name: "itemId", in: "path", required: true, schema: { type: "string", pattern: "^[a-z0-9][a-z0-9-]{1,63}$" }, example: "item-123" },
      slug: { name: "slug", in: "path", required: true, schema: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" }, example: "blue-widget" },
      categoryId: { name: "categoryId", in: "path", required: true, schema: { type: "string", pattern: "^[a-z0-9][a-z0-9-]{1,63}$" }, example: "home-goods" },
      searchTerm: { name: "searchTerm", in: "query", required: false, schema: { type: "string", minLength: 1 }, example: "widget" },
      page: { name: "page", in: "query", required: false, schema: { type: "integer", minimum: 1, default: 1 } },
      pageSize: { name: "pageSize", in: "query", required: false, schema: { type: "integer", minimum: 1, maximum: 100, default: 20 } }
    },
    responses: {
      BadRequest: {
        description: "Validation failed",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
            examples: {
              default: { value: { code: "BAD_REQUEST", message: "Invalid request" } }
            }
          }
        }
      },
      NotFound: {
        description: "Resource not found",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" }
          }
        }
      },
      TooManyRequests: {
        description: "Rate limit exceeded",
        headers: {
          "Retry-After": {
            schema: { type: "integer" },
            description: "Seconds until the next allowed request."
          }
        },
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" }
          }
        }
      }
    },
    schemas: {
      ItemListResponse: {
        type: "object",
        required: ["data", "page"],
        properties: {
          data: { type: "array", items: { $ref: "#/components/schemas/ItemSummary" } },
          page: { $ref: "#/components/schemas/Page" }
        }
      },
      ItemSummary: {
        type: "object",
        required: ["itemId", "slug", "name", "status"],
        properties: {
          itemId: { type: "string" },
          slug: { type: "string" },
          name: { type: "string" },
          status: { type: "string", enum: ["published", "hidden"] }
        }
      },
      ItemDetail: {
        allOf: [
          { $ref: "#/components/schemas/ItemSummary" },
          {
            type: "object",
            properties: {
              description: { type: "string" },
              categories: { type: "array", items: { type: "string" } },
              variants: { type: "array", items: { $ref: "#/components/schemas/Variant" } }
            }
          }
        ]
      },
      Variant: {
        type: "object",
        required: ["variantId", "sku", "price", "inventory"],
        properties: {
          variantId: { type: "string" },
          sku: { type: "string" },
          price: { $ref: "#/components/schemas/Price" },
          inventory: { $ref: "#/components/schemas/Inventory" }
        }
      },
      Price: {
        type: "object",
        required: ["amount", "currency"],
        properties: {
          amount: { type: "number", format: "decimal" },
          currency: { type: "string", example: "EUR" }
        }
      },
      Inventory: {
        type: "object",
        required: ["available"],
        properties: {
          available: { type: "integer", minimum: 0 },
          reserved: { type: "integer", minimum: 0 },
          source: { type: "string" }
        }
      },
      Page: {
        type: "object",
        required: ["number", "size", "totalItems"],
        properties: {
          number: { type: "integer" },
          size: { type: "integer" },
          totalItems: { type: "integer" }
        }
      },
      ErrorResponse: {
        type: "object",
        required: ["code", "message"],
        properties: {
          code: { type: "string" },
          message: { type: "string" }
        }
      }
    }
  }
};

export default {
  parse(source) {
    if (!String(source).includes("Sample Catalog API")) {
      throw new Error("yaml test stub only supports api-contract-example.yaml");
    }
    return parsedExampleContract;
  }
};
`);
  }

  const { runDesignAudit } = await import("../packages/create-apiops/template/scripts/run-design-audit.js");

  const projectDir = join(tempRoot, "audit-fixture-project");
  const openApiPath = join(projectDir, "specs", "openapi", "api.yaml");
  const localChecklistPath = join(projectDir, "specs", "audit", "api-audit-checklist.json");
  const spectralBinDir = join(projectDir, "node_modules", ".bin");
  const spectralCmdPath = join(spectralBinDir, "spectral.cmd");
  const spectralShPath = join(spectralBinDir, "spectral");

  writeText(openApiPath, readFileSync(starterContractPath, "utf8"));
  writeText(localChecklistPath, readFileSync(canonicalChecklistPath, "utf8"));
  writeText(spectralCmdPath, "@echo []\r\n");
  writeText(spectralShPath, "#!/bin/sh\nprintf '[]'\n");
  chmodSync(spectralShPath, 0o755);

  const { report, paths } = runDesignAudit({
    rootDir: projectDir,
    profile: "read-only"
  });

  for (const reportPath of [
    paths.reportJsonPath,
    paths.reportMarkdownPath,
    paths.reportDocsPath,
    paths.reportHtmlPath,
    paths.reportJUnitPath
  ]) {
    assert(existsSync(reportPath), `Expected generated audit artifact: ${reportPath}`);
  }

  assert(report.profile === "read-only", "Expected read-only audit profile in JSON report.");
  assert(Array.isArray(report.stages), "Expected lifecycle stage results in JSON report.");
  assert(Array.isArray(report.stageSummary), "Expected lifecycle stage summary in JSON report.");
  assert(report.stages.some((stage) => stage.id === "strategy"), "Expected strategy stage in JSON report.");
  assert(report.stages.some((stage) => stage.id === "design"), "Expected design stage in JSON report.");
  assert(
    report.stages.flatMap((stage) => stage.items || []).some((item) => Array.isArray(item.producedByStation)),
    "Expected audit items to include producedByStation."
  );
  assert(
    report.stages.flatMap((stage) => stage.items || []).some((item) => Array.isArray(item.actualEvidenceFound)),
    "Expected audit items to include actualEvidenceFound."
  );

  const markdown = readFileSync(paths.reportMarkdownPath, "utf8");
  assert(markdown.includes("## Lifecycle Summary"), "Expected markdown report to include lifecycle summary.");
  assert(markdown.includes("### Strategy"), "Expected markdown report to include strategy stage.");

  const html = readFileSync(paths.reportHtmlPath, "utf8");
  assert(html.includes("stage-summary"), "Expected HTML report to include stage summary cards.");
  assert(html.includes("Strategy"), "Expected HTML report to include strategy stage title.");

  const junit = readFileSync(paths.reportJUnitPath, "utf8");
  assert(junit.includes('testsuite name="Strategy"'), "Expected JUnit report to include strategy testsuite.");

  if (keepResults) {
    console.log(`Preserved audit fixture at ${projectDir}`);
    console.log(`Inspect JSON report at ${paths.reportJsonPath}`);
    console.log(`Inspect HTML report at ${paths.reportHtmlPath}`);
  }

  console.log("run-design-audit regression test passed.");
} finally {
  rmSync(tempYamlModulePath, { recursive: true, force: true });
  if (!keepResults) {
    rmSync(tempRoot, { recursive: true, force: true });
  }
}
