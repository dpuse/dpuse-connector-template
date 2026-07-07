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

## 3. Pick your action set

`src/index.ts` and `config.json`'s `actionNames` currently implement the **Source connector** shape (read-only: audit, find, stream, list, preview, retrieve — see `dpuse-connector-dropbox` as the closest real reference). If you're building a **database connector** instead, swap in `createObject`, `dropObject`, `getRecord`, `upsertRecords`, `removeRecords` in place of `auditObjectContent`/`getReadableStream` (see `dpuse-connector-dexie-js` for the reference shape), and update `actionNames` in `config.json` to match.

Update `tests/index.test.ts`'s expected `config.id` to match your new id.

## 4. Verify and finish

```bash
npm install
npm run check   # validates config.json against package.json etc.
npm run lint
npm test
```

Then delete this file.

## What's intentionally left out

- **No Rust/WASM.** One sibling connector (`dpuse-connector-file-store-emulator`) has an unfinished Rust/wasm-bindgen experiment; it isn't a pattern worth propagating.
- **No domain fixture data or connector-specific dependencies** — add whatever tool packages your connector actually needs.
- **No `scripts/` contents** — `tsconfig.scripts.json` is wired up for one-off maintenance scripts if you need them later, but ships empty.
