# Contributing to JDM

Thanks for helping improve `jdm_javascript_dom_manipulator`. Production apps
depend on this library, so the bar is stability first, features second.

## Golden rule: backwards compatibility is non-negotiable

The public API and observable behavior **must** be preserved across minor and
patch releases. A "fix" that changes what existing callers observe is a
breaking change, not a fix. When in doubt, add behind an opt-in flag (see
`Jdm.warnDuplicateNames`) instead of changing the default.

## Getting started

```bash
npm ci
npm test            # watch mode
npm run test:run    # single run
npm run test:e2e    # Playwright (chromium/firefox/webkit)
```

## Before opening a PR

Run the full local gate — CI enforces all of it:

```bash
npm run lint            # eslint, must be error-free
npm run format:check    # prettier
npm run test:coverage   # unit + coverage thresholds
npm run build:rollup    # bundles
npm run size            # gzip budget
```

- Add tests for every change. Bug fixes get a regression test; features get
  coverage of the new surface.
- Keep the diff focused. Don't reformat unrelated code.
- Match the surrounding style (4-space indent, double quotes, `jdm_` prefix on
  public instance methods).

## Commit & PR conventions

- Conventional Commits for subjects: `fix:`, `feat:`, `chore:`, `docs:`, etc.
- Reference the issue: `Fixes #N`.
- Update `CHANGELOG.md` under `## [Unreleased]` with an `Added` / `Changed` /
  `Fixed` / `Deprecated` entry.

## Deprecation policy

Because compatibility is guaranteed, nothing is removed abruptly.

1. **Deprecate, don't delete.** Keep the old name/behavior working. Add the
   replacement alongside it (e.g. a synced getter/setter alias, as done for
   `defadefaultDebounceTime` → `defaultDebounceTime`).
2. **Announce it.** Add a `Deprecated` entry to `CHANGELOG.md` and document the
   replacement in the same release.
3. **Wait at least one minor release** before considering removal — and removal
   only ever lands in a **major** version bump.

## Releasing (maintainers)

Version lives in `package.json` and is propagated everywhere automatically.
Never hand-edit version strings.

```bash
npm version patch   # or minor / major
# the "version" lifecycle script runs scripts/sync-version.mjs + full build
# and stages the result, so package.json, lock, src/jdm.js and dist all match
git push --follow-tags
```

Pushing the `vX.Y.Z` tag triggers `.github/workflows/release.yml`, which
re-runs the gate and publishes to npm with provenance (needs the `NPM_TOKEN`
repo secret).

SemVer: bug/typo fix → patch; additive public API → minor; any observable
break → major.
