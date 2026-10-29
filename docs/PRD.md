# Clearance PRD (short copy)

The full PRD is in Notion: https://app.notion.com/p/40844e320dfe8191a6dace4b2516465c

## Problem
An engineer at an AI agent startup is moving from prototype (on Composio's managed apps) to launch, which needs their own OAuth app with each provider. They can't tell if setup takes an hour or six weeks, or what will block approval.

The root cause has three parts:
- Every provider has different rules.
- The rules change with what you want to do and who your users are.
- No single place publishes timelines or blockers.

## Job to be done
"Tell me if any app will block my launch date, and what to do today."

## Solution
One report built from six layers:
0. Overview
1. Category
2. Intent and audience (the hero)
3. Precedent
4. Seven gauges: access, review, permission level, prerequisites, limits before approval, ongoing duties, and agent vs you
5. Verdict: Cleared, Hold or Gated, with the time split into your work and waiting

Every claim is marked Sourced, Tested or Unverified.

## Key insight
Intent and audience decide the timeline more than the app does. For Gmail:
- Send-only is about 10 business days of review.
- Reading mail is about 6 weeks plus a paid security assessment.
- Internal-only use is exempt.

## Scope
**v1:**
- 5 verified, intent-aware guides
- Live generation
- Share links
- Evidence log

**Not in v1:**
- 100 guides
- Live web research
- Saving live guides
- Real approvals
- Rule-change alerts

## Metrics
- **North star:** a launch decision in under 5 minutes.
- **Accuracy:** above 95% of Sourced claims hold up in a monthly re-check.
- **Trust:** the share of claims that are Sourced or Tested.
- **Spread:** shares per developer.

## Roadmap
1. 5 apps.
2. The top 100 toolkits, ranked by usage times difficulty, with live web research and live drafts sent to review.
3. Rule-change alerts, and the agent filing setup through Composio's programmatic auth configs.
