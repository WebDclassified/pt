# Phase 18 — Launch, Monitoring, and Maintenance

## Objective

Ship a production-grade site and keep it healthy.

## Pre-launch

Verify:

- production domain
- HTTPS
- canonical host
- DNS
- sitemap
- robots
- metadata
- OG preview
- favicon
- resume link
- project URLs
- contact form
- analytics choice
- error monitoring
- security headers

## Monitoring

Track, where appropriate:

- uptime
- client errors
- server errors
- contact failures
- 404s
- Core Web Vitals
- heavy asset failures

## Deploy pipeline

Recommended:

```text
git push
 ↓
lint
 ↓
typecheck
 ↓
test
 ↓
build
 ↓
dependency/security checks
 ↓
preview
 ↓
visual smoke test
 ↓
production
```

## Release discipline

Before every release:

- inspect cinematic scenes
- inspect mobile
- run accessibility checks
- run performance check
- verify content facts
- verify links

## Content maintenance

Keep current:

- role
- availability
- projects
- resume
- current learning/building

Never leave an outdated “available” status or stale project information.

## Backup/reproducibility

A fresh checkout should be capable of building the site with documented environment requirements.

## Gate

PASS only after a real production-like deployment test confirms that the site is reproducible and operational.
