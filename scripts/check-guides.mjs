// Validates the verified guide data inside index.html.
// Run: node scripts/check-guides.mjs
import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const start = html.indexOf("const SRC=");
const end = html.indexOf("const TIER=");
if (start < 0 || end < 0) throw new Error("Could not find SRC/LIB data block in index.html");

const ctx = {};
vm.runInNewContext(html.slice(start, end) + ";this.SRC=SRC;this.LIB=LIB;", ctx);
const { SRC, LIB } = ctx;

const errors = [];
const TIERS = ["green", "amber", "red"];
const EV = ["S", "T", "U"];
const INTENTS = ["read", "write", "act"];
const AUDIENCES = ["team", "public"];
const match = (w, i, a) => (!w.intent || w.intent.includes(i)) && (!w.aud || w.aud.includes(a));

for (const [k, s] of Object.entries(SRC)) {
  if (!/^https:\/\//.test(s.u)) errors.push(`source ${k}: url must be https`);
}

let claims = 0;
const tally = { S: 0, T: 0, U: 0 };
for (const app of LIB) {
  const where = `app ${app.id}`;
  for (const f of ["id", "name", "category", "overview", "portal"]) if (!app[f]) errors.push(`${where}: missing ${f}`);
  if (!app.paths?.length) errors.push(`${where}: no paths`);

  // Every intent x audience combination must resolve to a path.
  for (const i of INTENTS) for (const a of AUDIENCES) {
    if (!app.paths.find((p) => match(p.when, i, a))) errors.push(`${where}: no path for ${i}/${a}`);
  }

  app.paths.forEach((p, n) => {
    const at = `${where} path ${n}`;
    if (!TIERS.includes(p.tier)) errors.push(`${at}: bad tier ${p.tier}`);
    for (const f of ["work", "wait", "why"]) if (!p[f]) errors.push(`${at}: missing ${f}`);
    if (p.gauges?.length !== 6) errors.push(`${at}: expected 6 gauges (G1-G6), got ${p.gauges?.length}`);
    if (!p.steps?.some((s) => s.who === "you")) errors.push(`${at}: no human step`);
    const items = [...(p.gauges || []), ...(p.blockers || []), ...(p.steps || [])];
    for (const c of items) {
      claims++;
      if (!EV.includes(c.ev)) errors.push(`${at}: claim without evidence label: "${c.text || c.value}"`);
      else tally[c.ev]++;
      if (c.ev === "S" && !SRC[c.src]) errors.push(`${at}: SOURCED claim has no valid source: "${c.text || c.value}"`);
      if (c.src && !SRC[c.src]) errors.push(`${at}: unknown source key ${c.src}`);
      if (c.who && !["agent", "you"].includes(c.who)) errors.push(`${at}: step owner must be agent or you`);
    }
  });
}

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n- ` + errors.join("\n- "));
  process.exit(1);
}
console.log(`✓ ${LIB.length} apps, ${claims} claims: ${tally.S} sourced, ${tally.T} tested, ${tally.U} unverified. Every intent/audience combination resolves.`);
