# Using this template

This repo is registered as a GitHub template repository (Settings → Template repository). It ships as a valid, buildable, passing-lint connector — every file works as-is under the name `dpuse-connector-template`. Delete this file once you're done renaming it into your new connector.

## 1. Generate a new repo from this template

```bash
gh repo create dpuse/dpuse-connector-<name> --public --template dpuse/dpuse-connector-template
git clone https://github.com/dpuse/dpuse-connector-<name>.git
cd dpuse-connector-<name>
```

(Or use the green "Use this template" button on the GitHub repo page.)

## 2. Rename `dpuse-connector-template` to your connector's id

The literal string `dpuse-connector-template` appears in `package.json` (name, bugs.url, repository.url, module/exports filenames), `config.json` (id), `README.md`, and `SECURITY.md`. Replace it everywhere:

```bash
grep -rl 'dpuse-connector-template' --exclude-dir=node_modules --exclude-dir=.git -Z . | xargs -0 sed -i '' 's/dpuse-connector-template/dpuse-connector-<name>/g'
```

Then update, by hand, in `config.json`:

- `label.en` — display name (currently `"Connector Template"`)
- `description.en` — currently the placeholder template blurb; write the real one
- `categoryId` — one of `"application"`, `"curatedDataset"`, `"database"`, `"fileStore"` (currently `"fileStore"`)
- `implementations.default.authMethodId` — one of `"apiKey"`, `"disabled"`, `"oAuth2"`, `"none"` (currently `"none"`)
- `vendorAccountURL` / `vendorDocumentationURL` / `vendorHomeURL` — currently `null`; fill in if there's a third-party vendor
- `icon` / `iconDark` — currently a generic placeholder glyph; replace with the vendor's real icon

And in `package.json`, update `description` and `dependencies` (add whatever `@dpuse/dpuse-tool-*` packages your connector actually needs).

## 3. Add the actions your connector implements

`src/index.ts` starts with no actions, and `config.json`'s `actionNames` is empty to match, so the app offers nothing
until an action works. Add each action as you implement it, and list it in `actionNames`. Never list an action whose
body is a placeholder: the app reads the list to decide what to offer.

Follow the sibling connector closest to yours:

- A **file store** (its items are files): `dpuse-connector-file-store-emulator`.
- A **table source** (a database or application whose items are tables): `dpuse-connector-dexie-js`.
- An **API endpoint**: `dpuse-connector-dbnomics`.
- A **store** that data views load into: `dpuse-connector-sqlite-wasm`.

`tests/index.test.ts` checks that `config.json` lists exactly the actions the class implements, and that `config.id` is
the package name without its scope. Extend it as actions are added, following the sibling's tests.

## 4. Verify and finish

```bash
npm install
npm run check   # validates config.json against package.json etc.
npm run lint
npm test
```

Then delete this file, along with the "Using this as a template?" note at the top of `README.md`.

## What's intentionally left out

- **No Rust/WASM.** One sibling connector (`dpuse-connector-file-store-emulator`) has an unfinished Rust/wasm-bindgen experiment; it isn't a pattern worth propagating.
- **No domain fixture data or connector-specific dependencies** — add whatever tool packages your connector actually needs.
- **No `scripts/` contents** — `tsconfig.scripts.json` is wired up for one-off maintenance scripts if you need them later, but ships empty.
