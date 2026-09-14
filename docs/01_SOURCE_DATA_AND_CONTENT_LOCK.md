# Phase 01 — Source Data and Content Lock

## Objective

Convert the factual source material into a clean content model without importing the previous portfolio's design language.

## Required outputs

Create a structured content source such as TypeScript/JSON/MDX with:

- identity
- headline/positioning
- contact
- experience
- leadership
- projects
- skills
- resume link
- social links
- attribution

## Content lock

Before implementation, freeze the facts listed in:

- `data/PROFILE_SOURCE_OF_TRUTH.md`
- `data/VIZQUO_VERIFIED_DATA.md`

The agent may improve wording, but may not alter factual claims.

## Project priority

Recommended showcase order:

1. Vizquo — new/current open-source developer tool
2. Qupay — digital wallet/payment system
3. Hilo — social microblogging platform
4. Medium Blog Platform — TypeScript/PostgreSQL/React/Hono
5. Block Swap — Web3 learning/interface project
6. Wallet App — secondary backend-focused project

The exact order may change after repository verification, but every change must be justified.

## Project data integrity

Before publishing any project:

- verify repository exists
- verify repository/project name
- verify stack against actual code
- verify live demo if claimed
- verify screenshot is from actual project
- remove unsupported metrics/claims

## Content hierarchy

Homepage should not expose every implementation detail. The homepage gives:

- identity
- strongest project previews
- experience snapshot
- technical strengths
- CTA

Dedicated project pages provide the deeper technical story.

## Content gaps

Create `CONTENT_GAPS.md` listing anything that should be confirmed but is missing, for example:

- exact current education details
- current preferred job title
- live project URLs beyond GitHub
- exact current skill proficiency
- verified project metrics
- verified testimonials
- any missing Vizquo technical details

Do not fabricate missing information.

## Gate

PASS only if every displayed factual statement can be traced to the source-of-truth files or a current verified source.
