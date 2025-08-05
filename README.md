# APIOps Cycles Method

This repository contains the source for the APIOps Cycles method, including resources such as canvases. It can be used for multiple purposes, such as the method website (https://www.apiopscycles.com/), which is generated from these files, and the Canvas Creator tool that allows creating, importing and exporting the canvases, and provides a UI. (https://canvascreator.apiopscycles.com/). 

## License

All content in this repository is provided under Apache 2 license for programmable use, the content and the design of the canvases is under the CC BY-SA 4.0 license unless noted otherwise.
APIOps and APIOps Cycles are trademarks owned by Osaango Oy (https://www.osaango.com). Permission is given to use them in connection with the method, for community purposes. Contact Osaango for partnerships, or sponsoring to support the method development. See method website for current partners (https://www.apiopscycles.com/)


## Repository structure

```
├── src/
│   ├── assets/             # APIOps Cycles logos and other core assets which you might need in your tooling or product
│   ├── data/method/        # The Method JSON files (structure, relationship, and guideline content)
│   ├── data/method/canvas/ # The Canvases included in the method as JSON files (also used by tools like Canvas Creator)
│   ├── snippets/           # Raw markdown files used for long content for resource docs (only essential extensions for the json files)
├── scripts/                # Utility scripts
└── package.json
```

## Requirements

You can use the JSON files as is and download a .zip file or clone the repository. You can also install them using `npm install apiops-cycles-method-data`.

The module exposes top-level exports so you can import the data files directly, for example:

```js
import stations from "apiops-cycles-method-data/method/stations.json";
import canvasData from "apiops-cycles-method-data/canvasData";
```

Validate the files locally with:

```bash
npm test
``` 

- **Node.js 22** or newer
- npm

Install dependencies once with:

```bash
npm install
```

## Contributing

### Reporting issues or requesting features

If you spot a problem in the documentation or have an idea for new content, please open an issue in this repository. Include links to the relevant page or JSON file and describe the change you would like to see.

### Editing or adding content

The main method files (instructions, guidelines, method structure) is located in the the JSON files at `src/data/method/`. These base files (`lines.json`, `stations.json`, `resources.json`, `criteria.json` and `station-criteria.json`) are not localized and live at the root of the folder. Textual values in them reference label keys. English labels are in `src/data/method/en-US` and translations are provided in `labels.lines.json`, `labels.stations.json`, `labels.resources.json` and `labels.criteria.json` under each locale folder. Some longer or more complex resource pages like the API Audit Checklist also use markdown snippets `src/snippets/` linked to the `resources.json`. Do not use any frontmatter in the snippet files. Any supported markdown markup is ok. See references from [Starlight markdown reference](https://starlight.astro.build/guides/authoring-content/) and [Extended markdown reference](https://www.markdownguide.org/extended-syntax/).

Each station links to specific entry criteria followed by the next core station's criteria as exit criteria.`criteria.json`, `station-criteria.json` and `labels.criteria.json` 

#### Editing existing content of Method pages (metrolines, core- and substations, resources). 
1. Go to `src/data/method/en` and edit the content in English (English is considered the master langauge, and for the translations to work for other languages, it must always be the first to be edited). 
2. Validate that your changes work by running the schema validations (`npm test`)
3. Follow the translation guide if you are able to translate the content to other languages manually or automatically.
4. Commit your code and make a pull request.
5. If you were not able to create the translations of your changes to all languages, create an issue for in the repository for the translations.

#### Translating the language manually or with automated services (new or existing languages with new or changed content)

There are some pure markdown pages in the repository, and they can be translated "normally" and stored to the correct folders e.g. for Finnish language this would be `src/content/fi` .

Content under `src/snippets/` and `src/assets/resource/` can be localized by placing translated files inside a locale folder. For example a Finnish snippet would live at `src/snippets/fi/your-snippet.md` and an image at `src/assets/resource/fi/your-image.svg`. The generation script automatically uses these locale-specific files when building pages.

**These steps below are to translate any content under the "Method":**

Create/Edit the translaton files and put them in to the `src/data/method/` with correct language subfolder manually, or...

Install json-autotranslate with `npm install json-autotranslate`. It is not included as a dev-dependency at all, because most people would never need it and it's installing over 200+ dependencies.

1. Create a copy of the `src/data/method/` folder as `.json-autotranslate-cache` (in the root of the project). The cache is not under version control.
2. Create a new folder under the `src/data/locale` (this is a temporary folder, not versioned ) using the 2-letter ISO-code for the new language you are about to translate, e.g. `src/data/locale/fi` if creating translations for Finnish language.
3. Make sure the target language folder is *empty*, e.g. `src/data/locale/fi`. The folder really needs to be empty, even if there are already translations done for this language.
4. Copy the English files you want to translate (`labels.lines.json`, `labels.stations.json`, `labels.resources.json`, `labels.criteria.json`) from `src/data/method/en` to `src/data/locale/en` folder.
5. Make sure you have installed the dependencies for the project with `npm install`. 
6. For testing that the plugin works (or for actually doing manual translations), run the json-autotranslate in manual-mode `npx json-autotranslate -i src/data/locales --type key-based -s manual` and it will request you to provide translations to any new or changed (in the English version) language strings. 
7. For automatic translations: if you have an API key for any of the automated services, you can  use the commands below. 

    While working with JSON translations, the translation cache `.json-autotranslate-cache` is important to keep in sync because it helps making sure that nothing that has been already automatically been translated with the json-autotranslate plugin (https://github.com/leolabs/json-autotranslate) will be translated again. This is important for the quota / costs of using good quality automated translations.

    Command line for running the json-autotranslate in this project using Deepl.com free API account.
    ```
    npx json-autotranslate -i src/data/locales --type key-based -s deepl-free -c [Your Deepl free API key here],,
    ```
    And the same if you are using Azure Translator services
    ```
    npx json-autotranslate -i src/data/locales --type key-based -s azure -c [Your Azure Translator service API key here],[Azure region here like this: northeurope]
    ```
8. Check that the translations are done. There should now be `.json` files in the target language folder, in our example: `src/data/locale/fi`. 
9. If the translated files look ok, go to the translation cache folder `.json-autotranslate-cache` and look for the folder in the target language, i.e. `.json-autotranslate-cache/fi`. 
 - (Explanation: For some strange reason the plugin writes the contents in different (nested) format in the source folder (i.e. `locales`) than what it can actually read during the next translation round. The flat format it uses in the cache is perfect for it and also the most efficient for our page generation scripts).
10. These files are in the correct flat format for our page generation scripts, so copy these files and paste them to `src/data/method/` folder for the target language, in this case `src/data/method/fi`
11. Validate that your changes work with `npm test`
12. Commit your code and make a pull request. 
13. After your pull request has been merged, remember to pull changes so that your local branch is deleted, too. (Make sure you don't leave locally any old files under `.json-autotranslate-cache`.)

If you are planning to use automated translation services: Note that there are some languages that are supported by some of the translation services with local varieties. Check the documentation (https://github.com/leolabs/json-autotranslate) of supported automated translation services and how to see which languages they support. 
