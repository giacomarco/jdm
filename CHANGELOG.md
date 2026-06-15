# Changelog

All notable changes to `jdm_javascript_dom_manipulator` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Backwards compatibility is a hard guarantee: the public API and observable
behavior are preserved across minor and patch releases. Anything to be removed
is first marked **Deprecated** here for at least one minor release (see
[CONTRIBUTING.md](./CONTRIBUTING.md#deprecation-policy)).

## [Unreleased]

## [2.6.0] - 2026-06-15

### Added

- `Jdm.warnDuplicateNames` static flag (default `true`) to opt out of
  duplicate `data-name`/`name` console warnings during child collection.

### Changed

- Duplicate `data-name`/`name` warnings are now aggregated to **one line per
  key per node** instead of one per occurrence, ending log spam on repeated
  structures (lists of cards, etc.). Collection semantics unchanged — the last
  match still wins. (#1)

### Fixed

- Renamed the internal debounce property `defadefaultDebounceTime` →
  `defaultDebounceTime`. (#2)

### Deprecated

- `defadefaultDebounceTime` — kept as a synced getter/setter alias of
  `defaultDebounceTime` for backwards compatibility. Use `defaultDebounceTime`.

## [2.5.0]

### Added

- Event bus (`Jdm.on/off/emit/once`) and per-element event APIs.
- Plugin system (`Jdm.use`) with method-cache invalidation.
- Playwright end-to-end suite across Chromium, Firefox and WebKit.
- TypeScript declarations and `exports` subpath map.

## [2.4.7]

- Baseline published release prior to the changelog. Tiny chainable DOM
  manipulator: `Jdm` class, `JDM` factory global, `<jdm-element>` custom
  element, animations, form value handling, `String/Number.prototype` helpers.

[Unreleased]: https://github.com/giacomarco/jdm/compare/v2.6.0...HEAD
[2.6.0]: https://github.com/giacomarco/jdm/compare/v2.5.0...v2.6.0
[2.5.0]: https://github.com/giacomarco/jdm/compare/v2.4.7...v2.5.0
[2.4.7]: https://github.com/giacomarco/jdm/releases/tag/v2.4.7
