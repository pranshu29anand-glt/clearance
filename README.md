# Clearance

**Will this app block your launch?** Look up an app, say what your AI agent will do with it and who will use it, and Clearance tells you:

- how hard it is to get your own OAuth app ready with that provider
- how long it takes, split into your work and the provider's wait
- what could block approval
- which steps an agent can do for you and where you take over

- **Live app:** https://claude.ai/artifact/U2gX2mc85SBbbxQWmhwAPy
- **PRD (the product thinking):** https://app.notion.com/p/40844e320dfe8191a6dace4b2516465c

Built as a take-home for Composio's APM Integrations role.

## What's in this repo

| Path | What it is |
| --- | --- |
| `index.html` | The whole app in one file. The 5 verified guides are the `LIB` data inside it. |
| `agent/live-agent.md` | The exact instructions the live agent follows, layer by layer. |
| `evidence/verification-log.md` | Every claim in the library: sourced, tested, corrected, or unverified. |
| `evidence/live-test-log.md` | Apps used to test live generation, and what to look for. |
| `docs/PRD.md` | Short copy of the PRD, so this repo stands alone. |
| `scripts/check-guides.mjs` | Validates the guide data: every claim has an evidence label, every Sourced claim points to a real source, every intent and audience combination resolves to a verdict. Runs in CI on every push. |

## Setup

There's nothing to install and no API key.

1. **Use it:** open the live app link. The verified library works for anyone with the link.
2. **Live generation:** type an app that isn't in the library (for example Razorpay, Zoom or HubSpot) and click "Check clearance". It runs on the viewer's own Claude account through the Claude artifact runtime, so you must be signed in to Claude and allow the request when asked.
3. **Run locally:** open `index.html` in a browser. The library works. Live mode shows a notice, because it needs the Claude runtime.
4. **Check the data:** `node scripts/check-guides.mjs` (Node 18+, no dependencies).

## How the code is laid out

`index.html` is one self-contained file, because it's hosted as a Claude artifact with no build step. Inside the `<script>`:

| Block | What it does |
| --- | --- |
| `SRC` | Every official source we opened, keyed by short id. |
| `LIB` | The 5 guides. Each app has `paths`, and each path has a `when` condition (`intent`, `aud`). `resolve()` picks the first path that matches the developer's choices, so the verdict changes with intent and audience. |
| `report()` | Renders one verdict: stamp, time bar, steps (agent or you), blockers, and receipts (gauges and sources). |
| `agentPrompt()` and `live()` | Live mode. It sends the layered prompt through the artifact runtime's `sample` call, parses the JSON, then enforces honesty in code (see `agent/live-agent.md`). |
| `radar()`, `board()` | The hero radar and the ticket cards, both recomputed from `resolve()`. |
| `EPS`, `openHyper()` | The "What's next" roadmap and its hyperspace sequence: a canvas starfield, a CSS 3D crawl, and staggered card animations. It respects `prefers-reduced-motion`. |

To add an app, add one `LIB` entry with its sources in `SRC` and run the check script.

## Key decisions

1. **The verdict first, clicks last.** Developers ask "will this block my launch?" before "which button do I press?". Every report opens with Cleared / Hold / Gated and a time split into your work and the wait.
2. **Intent-aware guides, not one guide per app.** What you want to do (read, write, act) and who will use it (your team or the public) change the answer more than the app does. For Gmail, send-only is about 10 business days of review, reading mail is about 6 weeks plus a paid security assessment, and an internal-only app is exempt.
3. **One model everywhere.** The same six layers (overview, category, intent, precedent, seven gauges, verdict) structure the PRD, the guide data, the report, and the live agent's instructions.
4. **Evidence on every claim.** Sourced means we opened the official doc. Tested means an agent tried it. Unverified means inferred or third-party. Live reports are forced to Unverified, because the live agent can't browse.
5. **Five varied apps over many shallow ones.** The five cover every tier and five categories, including one (Notion) where the honest answer is "not published".
6. **Zero cost, zero credentials.** It's hosted as a Claude artifact, and live mode uses the viewer's Claude access. No keys are stored anywhere.

## Limitations

- **Live mode doesn't browse.** It answers from the model's knowledge, which can be out of date. It's labelled Unverified throughout, and the sources it suggests are marked "not opened". The next step on the roadmap is live web research.
- **Live mode needs a Claude login.** Reviewers without one can use the library; the live flow is demoed on a call.
- **Live reports can't be shared by link yet.** "Copy as text" is the workaround. Saving them to the library is on the roadmap.
- **No real OAuth apps were created.** That would need logins and credentials. "Tested" covers only what an agent could check without logging in.
- **Rules change.** Each guide shows when it was last checked (29 Oct 2026).
- **5 apps, not 100.** The data format is built to scale; adding a guide means adding one `LIB` entry.

## Author

Pranshu Anand · [Portfolio](https://app.notion.com/p/32244e320dfe81a69501d3aee6859b52)
