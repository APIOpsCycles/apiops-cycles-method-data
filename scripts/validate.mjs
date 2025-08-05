import Ajv from 'ajv';
import fs from 'fs/promises';
import path from 'path';

const ajv = new Ajv({ allErrors: true });

async function loadJSON(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

async function validate(schemaPath, files) {
  const schema = await loadJSON(schemaPath);
  const validate = ajv.compile(schema);
  for (const file of files) {
    const data = await loadJSON(file);
    const valid = validate(data);
    if (!valid) {
      console.error(`Validation failed for ${file}`);
      console.error(validate.errors);
      process.exitCode = 1;
    } else {
      console.log(`Validated ${file}`);
    }
  }
}

async function gatherLabelFiles() {
  const base = 'src/data/method';
  const dirs = await fs.readdir(base, { withFileTypes: true });
  const files = [];
  for (const dir of dirs) {
    if (dir.isDirectory()) {
      const subfiles = await fs.readdir(path.join(base, dir.name));
      for (const f of subfiles) {
        if (f.startsWith('labels') && f.endsWith('.json')) {
          files.push(path.join(base, dir.name, f));
        }
      }
    }
  }
  return files;
}

async function gatherTemplateFiles() {
  const dir = 'src/data/canvas/import-export-templates';
  const files = await fs.readdir(dir);
  return files.filter(f => f.endsWith('.json')).map(f => path.join(dir, f));
}

(async () => {
  await validate('schemas/criteria.schema.json', ['src/data/method/criteria.json']);
  await validate('schemas/lines.schema.json', ['src/data/method/lines.json']);
  await validate('schemas/resources.schema.json', ['src/data/method/resources.json']);
  await validate('schemas/station-criteria.schema.json', ['src/data/method/station-criteria.json']);
  await validate('schemas/stations.schema.json', ['src/data/method/stations.json']);
  await validate('schemas/canvasData.schema.json', ['src/data/canvas/canvasData.json']);
  await validate('schemas/canvas-localized.schema.json', ['src/data/canvas/localizedData.json']);
  await validate('schemas/import-export-template.schema.json', await gatherTemplateFiles());
  await validate('schemas/labels.schema.json', await gatherLabelFiles());
})();
