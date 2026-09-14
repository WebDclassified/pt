# Phase 14 — SEO, Security, Privacy, and Trust

## SEO

Implement:

- unique `<title>` per page
- useful meta description
- canonical URL
- semantic headings
- descriptive links
- sitemap.xml
- robots.txt where appropriate
- Open Graph metadata
- appropriate social metadata
- structured data only when truthful
- crawlable project URLs

## Project URLs

Use stable URLs such as:

- `/projects/vizquo`
- `/projects/qupay`
- `/projects/hilo`
- `/projects/medium-blog`
- `/projects/block-swap`
- `/projects/wallet-app`

Actual slug choice may vary, but must remain stable and descriptive.

## JavaScript

Important content must remain in the DOM and discoverable even if the cinematic layer is unavailable.

## Security baseline

Use:

- HTTPS
- Content-Security-Policy appropriate to actual dependencies
- HSTS where appropriate
- X-Content-Type-Options
- appropriate Referrer-Policy
- appropriate Permissions-Policy
- dependency security checks
- secret scanning

Do not blindly copy a maximal security-header list that breaks required features.

## Contact endpoint

If a server route exists:

- server-side validation
- rate limiting
- spam protection
- safe error handling
- no secret exposure

## Secrets

Never ship:

- API secrets
- SMTP passwords
- private keys
- database credentials
- signing keys

into the browser bundle or public repository.

## Demo safety

Public demos must never expose real customer data, production destructive operations, or uncontrolled paid API access.

## Privacy

Minimize analytics and contact data.

For India-facing deployment, review applicable DPDP requirements before collecting/retaining personal data.

## Gate

PASS only when a security/SEO checklist is completed and no critical secrets or insecure endpoints are found.
