# Verification log

Checked on 29 Oct 2026. Sourced means we opened the official page and the claim is on it. Tested means an agent tried it without logging in. Unverified means inferred, third-party, or not found on the official page.

## Google / Gmail

| Claim | Status | Source |
| --- | --- | --- |
| Estimates: brand verification 2-3 business days, sensitive scopes 10 business days, restricted 6 weeks | Sourced | [OAuth verification FAQ](https://support.google.com/cloud/answer/13463817) |
| Unverified apps with sensitive or restricted scopes have a 100 new-user cap for the project's lifetime, which can't be reset | Sourced | FAQ |
| gmail.send is sensitive; the full mail scope is restricted | Sourced | FAQ |
| Restricted scopes need a CASA security assessment by a Google-empanelled assessor if data passes through your servers, with reassessment every 12 months | Sourced | [Restricted scope verification](https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification) |
| Google charges no fee; the assessor's fee is agreed between you and the assessor | Sourced | FAQ |
| Internal-only apps (Workspace org, Internal user type) are exempt | Sourced | Restricted scope page |
| gmail.readonly and gmail.modify are restricted | **Unverified.** Widely documented, but not on the pages we opened | [Gmail scopes](https://developers.google.com/workspace/gmail/api/auth/scopes) |
| Demo video may be requested | **Unverified** | none |
| The Cloud console needs a human login | **Tested.** An agent request to console.cloud.google.com was redirected to accounts.google.com sign-in | none |

## Slack

| Claim | Status | Source |
| --- | --- | --- |
| Since 29 May 2025, new non-Marketplace apps and new installs get 1 request a minute on conversations.history and conversations.replies, with a maximum of 15 objects per call | Sourced | [Changelog](https://docs.slack.dev/changelog/2025/05/29/rate-limit-changes-for-non-marketplace-apps) |
| Internal customer-built apps and Marketplace apps are not affected | Sourced | Changelog |
| **Corrected:** a web search summary claimed existing installs would be throttled from a later date. The changelog says existing installations are not affected, so we follow the changelog. | Corrected | Changelog |
| Public distribution needs OAuth and HTTPS on the redirect, events and interactivity URLs | Sourced | [Distribution](https://docs.slack.dev/app-management/distribution) |
| Some workspaces allow only Marketplace apps, or require admin approval | Sourced | Distribution |
| Apps are uninstalled when their creator leaves (most scopes) | Sourced | Distribution |
| Marketplace review time | **Unverified.** Not published | none |

## GitHub

| Claim | Status | Source |
| --- | --- | --- |
| Self-serve registration with no review step described | Sourced (absence) | [Creating an OAuth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) |
| Up to 10 callback URLs; up to 100 OAuth apps per owner | Sourced | same |
| User token expiry is on by default; GitHub recommends GitHub Apps for fine-grained access | Sourced | same |
| Secret handling advice | **Unverified.** General practice | none |

## LinkedIn

| Claim | Status | Source |
| --- | --- | --- |
| Only Sign in (profile, email) and Share (w_member_social) are open self-serve | Sourced | [Getting access](https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access) |
| Marketing, Sales Navigator (SNAP) and Talent need partner approval; Compliance is closed | Sourced | same |
| Share limits: 150 requests a day per member, 100,000 per app | Sourced | [Share on LinkedIn](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin) |
| An app must be linked to a Company Page that a Page admin verifies | **Unverified.** Third-party guides only | none |

## Notion

| Claim | Status | Source |
| --- | --- | --- |
| Internal connections use a token for one workspace; public connections use OAuth | Sourced | [Authorization](https://developers.notion.com/docs/authorization) |
| Public connections are submitted for review; the authorization URL appears only after submission | Sourced | same |
| Install scope (any workspace or a chosen set) can't change after creation | Sourced | same |
| Review time | **Unverified.** Not published | none |
| Privacy policy, terms and support email are required | **Unverified.** Third-party guides; the official page names only the redirect URI | none |

## Composio

| Claim | Status | Source |
| --- | --- | --- |
| GitHub, Gmail and Slack are named as managed apps | Sourced | [Managed vs custom auth](https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app) |
| Managed apps show "Composio" on the consent screen, share quota, and have a 15-minute minimum polling interval | Sourced | same |
| Managed status for LinkedIn and Notion | **Unverified.** The directory page loads client-side and we couldn't read it | [Directory](https://docs.composio.dev/toolkits/managed-auth) |


## Agent setup attempts (no login, 29 Oct 2026, 19:15 UTC)

An agent tried to start each provider's OAuth flow and open its developer portal from a clean machine, to find exactly where it gets stopped.

| Provider | What the agent tried | What happened | What it means |
| --- | --- | --- | --- |
| Google | Started authorization with an unregistered client ID asking for gmail.readonly | Redirected to an error: "The OAuth client was not found" (invalid_client) | Nothing works until you register a client. The Cloud console redirects to sign-in, so a human logs in. |
| LinkedIn | Started authorization with an unregistered client ID | "The passed in client_id is invalid" | Same: you need a registered app first. |
| Notion | Started authorization with an unregistered client ID | Redirected to the install-integration page, with no error shown before sign-in | Notion checks the client only after the user signs in, so a bad setup surfaces late. |
| Slack | Authorization URL and app dashboard | Both load a sign-in page | Creating the app needs a human Slack login. |
| GitHub | Authorization URL and new-app page | Blocked by our sandbox's network proxy (403) | Not tested. This is a limit of our environment, not of GitHub. |

Creating a real OAuth app needs a logged-in browser session on every provider, and GitHub has no public API for creating OAuth apps. That's why every "create the app" step in the guides is tagged "You". The agent's job is everything before and after that step.

## Summary

| Tally | Count |
| --- | --- |
| Corrected | 1 |
| Tested | 4 no-login probes (Google, LinkedIn, Notion, Slack); GitHub blocked by our network |
| Open unknowns | 8 |
