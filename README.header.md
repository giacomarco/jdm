<!-- This header is hand-maintained and prepended to the generated API docs by
     `npm run docs:markdown` (scripts/build-readme.mjs). Edit it here, not in README.md. -->

# JDM — JavaScript DOM Manipulator

[![npm version](https://img.shields.io/npm/v/jdm_javascript_dom_manipulator.svg)](https://www.npmjs.com/package/jdm_javascript_dom_manipulator)
[![CI](https://github.com/communicationbox/jdm/actions/workflows/ci.yml/badge.svg)](https://github.com/communicationbox/jdm/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/jdm_javascript_dom_manipulator.svg)](./LICENSE)
[![bundle size](https://img.shields.io/badge/gzip-~6KB-brightgreen.svg)](#)

Tiny, chainable DOM manipulator. Create elements, query and index children,
wire events (incl. a global event bus), animate, and bind form values — all
with a fluent `jdm_*` API on the raw DOM node.

```bash
npm install jdm_javascript_dom_manipulator
```

```javascript
import "jdm_javascript_dom_manipulator";

JDM("<button>Click</button>", document.body)
    .jdm_addClassList(["btn", "btn-primary"])
    .jdm_onClick(() => console.log("clicked"));
```

- **Docs:** full API reference below (generated from JSDoc).
- **Changelog:** [CHANGELOG.md](./CHANGELOG.md)
- **Contributing:** [CONTRIBUTING.md](./CONTRIBUTING.md) — note the strict
  backwards-compatibility and deprecation policy.
- **Security:** [SECURITY.md](./SECURITY.md)

---

# API Reference
