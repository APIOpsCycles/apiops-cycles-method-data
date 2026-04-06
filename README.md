## Create a new APIOps project (CLI)

```bash
npm create apiops@latest
```

This command runs the `create-apiops` initializer package and generates a starter APIOps project template in your current directory. This is useful for a scaffolded proces (with or without AI) to create or review requirements for new APIs or improve existing APIs. 

This scaffolded project uses the CLI and/or the method-engine library (useful for AI or applications) provided by the main package. They guide the design and development using the APIOps Cycles method and canvases. 

# APIOps Cycles Method

This repository contains the source for the APIOps Cycles method, including resources such as canvases. It is used as the canonical source for multiple tools, including the method website at <https://www.apiopscycles.com/> and Canvas Creator at <https://canvascreator.apiopscycles.com/>.

## License

All content in this repository is provided under the Apache 2.0 license for programmable use. The content and design of the canvases is under the CC BY-SA 4.0 license unless noted otherwise.

APIOps and APIOps Cycles are trademarks owned by Osaango Oy (<https://www.osaango.com>). Permission is given to use them in connection with the method for community purposes. Contact Osaango for partnerships or sponsorships to support the method development. See the method website for current partners: <https://www.apiopscycles.com/>.

## Repository structure

```text
src/
  assets/        # APIOps Cycles logos and other core assets
  lib/           # Shared reusable helpers such as method-engine and snippet-engine
  data/method/   # Method JSON files for structure, relationships, and labels
  data/canvas/   # Canvas JSON files used by the method and tooling
  snippets/      # Canonical snippet assets referenced by resources.json
scripts/         # Repository validation and maintenance scripts
skills/          # AI skills that help use the method to design APIs
packages/
  create-apiops/ # Scaffolding package used by `npm create apiops@latest`
package.json
```

## Integrating the method into tools and developer workflows

You can use the JSON files directly by downloading a `.zip` file or cloning the repository. You can also install the package with `npm install apiops-cycles-method-data`, or create a new API design and development project with `npm create apiops@latest`.

The module exposes top-level exports so you can import the data files and shared helpers directly:

```js
import stations from "apiops-cycles-method-data/method/stations.json";
import canvasData from "apiops-cycles-method-data/canvasData.json";
import {
  buildStartData,
  buildStationResourceData,
  generateCanvases
} from "apiops-cycles-method-data/method-engine";
import { renderSnippet } from "apiops-cycles-method-data/snippet-engine";
```

The `method-engine` export is intended for reusable APIOps workflow logic. It gives CLIs, AI agents, apps, and APIs the same station recommendation, resource lookup, and canvas generation behavior without reimplementing the method rules.

The `snippet-engine` export resolves canonical resource snippets, including locale-aware snippet lookup and terminal-safe ASCII fallback when needed.

The method also includes reusable stakeholder data:

- `src/data/method/stakeholders.json` defines the shared stakeholder catalog
- `src/data/method/station-stakeholders.json` maps each station to weighted stakeholder participation
- `src/data/method/<locale>/labels.stakeholders.json` stores localized stakeholder titles, descriptions, and involvement labels

Stakeholder involvement uses three lightweight levels:

- `lead`
- `core`
- `consulted`

This keeps APIOps Cycles explicitly cross-functional, including business, security, compliance, support, and consumer voices in architecture and design work where relevant.

Sticky note authoring should use the shared palette exposed by the method engine:

- `benefit`: `#C0EB6A`
- `neutral`: `#DFDDC5`
- `negative`: `#FFAFAF`
- `task`: `#7DC9E7`
- `default`: `#FFF399`

Prefer section-appropriate defaults when the intent is obvious from the canvas structure.
If a note does not fit a clear intent yet, use the generic default rather than guessing.
When using the interactive CLI, explicit note tags such as `[benefit]`, `[task]`, or `[color=#7DC9E7]` are the supported way to override the section default.

Validate the files locally with:

```bash
npm test
```

Requirements:

- Node.js 22 or newer
- npm

Install dependencies once with:

```bash
npm install
```

## Contributing

### Reporting issues or requesting features

If you spot a problem in the documentation or have an idea for new content, open an issue in this repository. Include links to the relevant page or JSON file and describe the change you would like to see.

### Editing or adding content

The main method content files are located under `src/data/method/`. These base files (`lines.json`, `stations.json`, `resources.json`, `criteria.json`, `station-criteria.json`, `stakeholders.json`, and `station-stakeholders.json`) are not localized and live at the root of the folder. Textual values in them reference label keys. English labels are in `src/data/method/en`, and translations are provided in locale folders through `labels.lines.json`, `labels.stations.json`, `labels.resources.json`, `labels.criteria.json`, and `labels.stakeholders.json`.

Some longer or more complex resources also use canonical snippet assets under `src/snippets/` linked from `resources.json`. Those snippets are now primarily structured JSON or YAML files, with Markdown kept only where a resource genuinely needs prose content.

Each station links to specific entry criteria followed by the next core station's criteria as exit criteria. Stakeholder participation is modeled separately through `stakeholders.json`, `station-stakeholders.json`, and `labels.stakeholders.json`.

#### Editing existing method pages

1. Go to `src/data/method/en` and edit the content in English. English is the master language and must be edited first.
2. Validate your changes by running `npm test`.
3. Follow the translation guide if you can translate the content to other languages manually or automatically.
4. Update all supported locales before considering the change complete. This includes criteria wording and stakeholder labels when those are touched.
5. Commit your code and make a pull request.
6. If you were not able to create translations for all languages, create an issue in the repository for the missing translations.

#### Translating manually or with automated services

There are some pure Markdown pages in the repository, and they can be translated normally and stored in the correct folders, for example `src/content/fi`.

Content under `src/snippets/` and `src/assets/resource/` can be localized by placing translated files inside a locale folder. For example a Finnish snippet would live at `src/snippets/fi/your-snippet.json`, `src/snippets/fi/your-snippet.yaml`, or `src/snippets/fi/your-snippet.md` depending on the canonical snippet type, and an image at `src/assets/resource/fi/your-image.svg`. The generation and helper tooling automatically use these locale-specific files when resolving snippets.

These steps below are for translating any content under the method:

Create or edit the translation files and put them into `src/data/method/` with the correct language subfolder manually, or use `json-autotranslate`.

Install `json-autotranslate` with:

```bash
npm install json-autotranslate
```

It is not included as a dev dependency because most contributors will never need it and it installs a large dependency tree.

1. Create a copy of the `src/data/method/` folder as `.json-autotranslate-cache` in the project root. The cache is not under version control.
2. Create a new folder under `src/data/locale` using the 2-letter ISO code for the new language, for example `src/data/locale/fi`.
3. Make sure the target language folder is empty, even if there are already translations for that language elsewhere.
4. Copy the English files you want to translate (`labels.lines.json`, `labels.stations.json`, `labels.resources.json`, `labels.criteria.json`) from `src/data/method/en` to `src/data/locale/en`.
5. Make sure you have installed project dependencies with `npm install`.
6. To test the plugin or do manual translations, run:

```bash
npx json-autotranslate -i src/data/locales --type key-based -s manual
```

7. For automated translations, use the service-specific commands supported by the plugin. Keep `.json-autotranslate-cache` in sync so already-translated strings are not translated again unnecessarily.
8. Check that translated `.json` files were created in the target language folder under `src/data/locale/<lang>`.
9. If the translated files look correct, inspect the cache folder `.json-autotranslate-cache/<lang>`.
10. Copy the flat-format files from the cache into `src/data/method/<lang>`.
11. Validate that your changes work with `npm test`.
12. Commit your code and make a pull request.
13. After your pull request is merged, clean up any old local cache files.

If you plan to use automated translation services, note that some services support language variants differently. Check the `json-autotranslate` documentation for current language support and service behavior: <https://github.com/leolabs/json-autotranslate>.
