# Using this template

This repo is a scaffold, not a working connector. Delete this file once you're done instantiating it.

## 1. Pick your values

| Token | Example | Where it's used |
|---|---|---|
| `__CONNECTOR_ID__` | `dpuse-connector-foo` | repo name, package name, config.json id, build output filenames |
| `__CONNECTOR_LABEL__` | `Foo` | config.json label, README title |
| `__CONNECTOR_DESCRIPTION__` | `Provides access to Foo for ...` | package.json + config.json description, README intro |
| `__CATEGORY_ID__` | `application` \| `fileStore` \| `database` | config.json categoryId |
| `__AUTH_METHOD_ID__` | `none` \| `oAuth2` \| ... | config.json implementations.default.authMethodId |
| `__VENDOR_ACCOUNT_URL__` | `https://foo.com/login` | config.json |
| `__VENDOR_DOCUMENTATION_URL__` | `https://foo.com/docs` | config.json |
| `__VENDOR_HOME_URL__` | `https://foo.com/` | config.json |
| `__ICON_SVG__` / `__ICON_DARK_SVG__` | inline `<svg>...</svg>` | config.json light/dark icon |

## 2. Replace tokens

From the repo root:

```bash
grep -rl '__CONNECTOR_ID__\|__CONNECTOR_LABEL__\|__CONNECTOR_DESCRIPTION__\|__CATEGORY_ID__\|__AUTH_METHOD_ID__\|__VENDOR_ACCOUNT_URL__\|__VENDOR_DOCUMENTATION_URL__\|__VENDOR_HOME_URL__' --exclude-dir=node_modules --exclude-dir=.git -Z | xargs -0 sed -i '' \
  -e 's/__CONNECTOR_ID__/dpuse-connector-foo/g' \
  -e 's/__CONNECTOR_LABEL__/Foo/g' \
  -e 's/__CONNECTOR_DESCRIPTION__/Provides access to Foo./g' \
  -e 's/__CATEGORY_ID__/application/g' \
  -e 's/__AUTH_METHOD_ID__/none/g'
```

`__VENDOR_ACCOUNT_URL__`, `__VENDOR_DOCUMENTATION_URL__`, `__VENDOR_HOME_URL__`, `__ICON_SVG__`, `__ICON_DARK_SVG__` are best hand-edited directly in `config.json` since URLs contain `/` and SVGs contain characters that don't sed cleanly.

## 3. Pick your action set

`src/index.ts` and `config.json`'s `actionNames` currently implement the **Source connector** shape (read-only: audit, find, stream, list, preview, retrieve — see `dpuse-connector-dropbox` as the closest real reference). If you're building a **database connector** instead, swap in `createObject`, `dropObject`, `getRecord`, `upsertRecords`, `removeRecords` in place of `auditObjectContent`/`getReadableStream` (see `dpuse-connector-dexie-js` for the reference shape), and update `actionNames` in `config.json` to match.

## 4. Rename the repo directory and finish setup

```bash
npm install
npm run check   # validates config.json against package.json etc.
npm run lint
npm test
```

Then update `bugs.url` / `repository.url` in `package.json` if you cloned this into a differently-named GitHub repo, and delete this file.

## What's intentionally left out

- **No Rust/WASM.** One sibling connector (`dpuse-connector-file-store-emulator`) has an unfinished Rust/wasm-bindgen experiment; it isn't a pattern worth propagating.
- **No domain fixture data or connector-specific dependencies** — add whatever tool packages (`@dpuse/dpuse-tool-*`) your connector actually needs.
- **No `scripts/` contents** — `tsconfig.scripts.json` is wired up for one-off maintenance scripts if you need them later, but ships empty.
