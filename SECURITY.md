# Security Policy

## Reporting a vulnerability

Please report security issues privately via GitHub's
**[Private vulnerability reporting](https://github.com/chisakiShinichirouToshiyuki/free-mcp-core/security/advisories/new)**
(Security tab → "Report a vulnerability"). Do not open a public issue for
security problems.

We aim to acknowledge reports within a few business days.

This repository is a library fork of
[freee/freee-mcp](https://github.com/freee/freee-mcp). Issues in the freee API
itself or in the upstream project should be reported to freee through their
own channels; this policy covers the fork-specific code and packaging
(`freee-mcp-core`).

## Threat model notes

`freee-mcp-core` is an MCP server library for the freee API. The repository
holds **no secrets**: OAuth client credentials and tokens are supplied by the
embedding application at runtime. When embedding it:

- Keep client secrets and tokens in a secret manager — never in source or env
  committed to git.
- Scope the exposed tool set to what the deployment actually needs.
- Put authentication and rate limiting in front of any remotely reachable
  endpoint that wraps this library.

## Automated hardening enabled on this repo

- Dependabot alerts + security updates + version updates (npm and
  github-actions ecosystems)
- Secret scanning + push protection
- CodeQL maximum-strictness profile: `security-extended` + `security-and-quality`
  + `security-experimental` suites and the GitHub Security Lab community audit
  pack, blocking on every PR (`.github/codeql/codeql-config.yml`)
- GitHub Actions pinned to full commit SHAs; workflows run with least-privilege
  `permissions` (deny-all default, per-job grants)
- Branch protection on `main` (PR required, CI + CodeQL must pass, linear
  history, no force-push)

## Alert handling policy (no false-positive dismissals)

Same policy as the sibling repos (free-actions-core / remote-free-actions):

- A CodeQL alert is **never dismissed as "false positive"** — the flagged
  pattern is forbidden by coding standard; rewrite the code so it does not fire.
- Rule-level exclusions are allowed ONLY for structural incompatibilities and
  live in `.github/codeql/codeql-config.yml` with the rationale inline.
- The only acceptable per-alert dismissal is "used in tests" with an explicit
  justification in the PR description.
