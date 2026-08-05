---
name: localized-text-editing
description: Safely edit APIOps method and canvas labels containing localized or accented text without introducing mojibake, replacement characters, or Windows shell encoding damage. Use when changing src/data localized JSON, station labels, resource labels, canvas text, translated method content, or any non-ASCII method wording.
---

# Localized Text Editing

Use this skill when editing APIOps method or canvas text that may contain non-ASCII characters, translated strings, smart punctuation, or locale-specific labels.

## Rules

- Treat `src/data/**/*.json` as UTF-8.
- Avoid PowerShell heredocs and ad hoc shell text replacement for localized strings.
- Prefer `apply_patch` for small exact edits when the target text is visible and uncorrupted.
- For scripted edits, use Node with `readFileSync(file, "utf8")` and `writeFileSync(file, textOrJson)`.
- When inserting non-ASCII text from a script, use Unicode escapes or preserve the exact existing value and replace only ASCII substrings.
- Never rewrite whole localized files just to change a few translated strings unless the script is byte-safe and the diff is inspected.

## Safe Workflow

1. Inspect the current value with Node, not PowerShell text rendering, when encoding matters.
2. Make the smallest edit that solves the content issue.
3. Scan for known corruption patterns:

```powershell
node -e "const fs=require('fs'),path=require('path');function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{const p=path.join(d,e.name);return e.isDirectory()?walk(p):[p]})}const pats=['Snum','snum','cumprems','n?o'];for(const f of walk('src/data').filter(f=>f.endsWith('.json'))){const s=fs.readFileSync(f,'utf8');for(const p of pats)if(s.includes(p))console.log(f+': '+p)}"
```

4. Run `npm.cmd test` on Windows.
5. Review `git diff` for accidental `?`, mojibake, line-ending-only churn, and unrelated localized file rewrites.

## Failure Patterns

Treat these as likely corruption unless there is a clear, intentional reason:

- `U+FFFD` replacement character
- `U+00C3` or `U+00C2` mojibake leads
- `U+00E2` followed by punctuation fragments from smart quotes or dashes
- accent replacement like `n?o`, `prontid?o`, `integra??es`
- known project typos: `Snum`, `snum`, `cumprems`

## Recovery

If an edit introduces many `?` characters or mojibake:

1. Restore the affected file from the index or HEAD if those changes were yours.
2. Reapply only the intended content changes using `apply_patch` or ASCII-only substring replacements.
3. Rerun `npm.cmd test`.
