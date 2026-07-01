# create-apiops

Scaffold a new APIOps project with method guidance, API design artifacts, OpenAPI linting, and APIOps Cycles audit scaffolding.

## Usage

Interactive scaffold:

```bash
npm create apiops@latest
```

Named project scaffold:

```bash
npm create apiops@latest report-conversion-apiops
```

Non-interactive scaffold:

```bash
npm create apiops@latest -- --name report-conversion-apiops --locale en --style REST --yes
```

Skip dependency installation:

```bash
npm create apiops@latest -- report-conversion-apiops --locale en --style REST --yes --no-install
```

## npm create argument forwarding

When using `npm create`, pass initializer flags after the `--` separator. Flags before the separator are handled by npm itself and may not reach `create-apiops`.

The first positional argument is treated as the project name, so these are equivalent:

```bash
npm create apiops@latest report-conversion-apiops
npm create apiops@latest -- --name report-conversion-apiops
```

## Help

```bash
npm create apiops@latest -- --help
```

You can also run the initializer directly:

```bash
npx create-apiops@latest --help
```

## Options

- `--name <name>` or the first positional argument sets the project directory and package name.
- `--locale <locale>` sets the default method locale. Default: `en`.
- `--style <style>` sets the API style focus: `REST`, `Event`, `GraphQL`, or `"Not sure yet"`. Default: `REST`.
- `--yes`, `-y` accepts defaults for omitted options and runs without prompts. Use it in non-interactive shells when any prompt answer is omitted.
- `--no-install` skips dependency installation and starter canvas generation.
- `--version`, `-v` prints the initializer version.
- `--help`, `-h` prints usage without starting prompts.
