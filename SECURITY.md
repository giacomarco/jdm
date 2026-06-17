# Security Policy

## Supported versions

| Version | Supported |
| ------- | --------- |
| 2.6.x   | ✅        |
| < 2.6   | ❌        |

The latest 2.x release line receives security fixes.

## Reporting a vulnerability

Please **do not** open a public issue for security problems.

Report privately via GitHub's
[security advisories](https://github.com/communicationbox/jdm/security/advisories/new),
or email the maintainer (see `package.json` author / repository profile).

Include: affected version, a description, and a minimal reproduction if
possible. You can expect an acknowledgement within a few days. Once a fix is
released, we'll credit you in the advisory unless you prefer to stay anonymous.

## Scope notes

JDM manipulates the DOM and parses HTML strings via `DOMParser`. Treat any
HTML passed to `JDM(...)` as you would `innerHTML`: **never feed it untrusted
input without sanitizing first.** This is inherent to the library's purpose,
not a vulnerability in JDM itself.
