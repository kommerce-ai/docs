/*
 * Kommerce 101 — brief practice tools.
 *
 * Every component is self-contained: Mintlify compiles each exported
 * component in isolation, so a reference to anything declared at the top of
 * the file fails in the browser with "x is not defined" even when that
 * binding is exported. The repetition below is deliberate.
 */

/* ─────────────────────── awareness level picker ────────────────────── */

export const AwarenessPicker = () => {
  const AWARENESS = [
  {
    key: "Unaware",
    job: "Make her recognise herself or a moment. No product yet.",
    opens: "A scene or an identity",
    example: "3pm and you're reading the same sentence again.",
  },
  {
    key: "Problem Aware",
    job: "Name the pain in her words. Hint there is a way out.",
    opens: "The problem",
    example: "Still tired after eight hours? It isn't the hours.",
  },
  {
    key: "Solution Aware",
    job: "Say why this kind of fix beats the others she knows.",
    opens: "The mechanism",
    example: "Not melatonin. A magnesium blend that works with your own cycle.",
  },
  {
    key: "Product Aware",
    job: "Prove this product. Specifics and proof.",
    opens: "The product",
    example: "4,000 reviews. Average 23 minutes faster to sleep.",
  },
  {
    key: "Most Aware",
    job: "Give the deal and a reason to act now.",
    opens: "The offer",
    example: "30% off the sleep bundle. Ends Sunday.",
  },
];

  const [picked, setPicked] = useState(1);
  const level = AWARENESS[picked];

  return (
    <div className="not-prose my-6 rounded-xl border border-zinc-950/10 dark:border-white/10 p-4">
      <p className="text-sm font-semibold text-zinc-950 dark:text-white">
        Pick a level to see what the opening line is allowed to say
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {AWARENESS.map((a, i) => (
          <button
            key={a.key}
            type="button"
            onClick={() => setPicked(i)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              i === picked
                ? "bg-[#00071A] text-white dark:bg-[#EAFF5E] dark:text-[#00071A]"
                : "bg-zinc-950/5 text-zinc-950 hover:bg-zinc-950/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            }`}
          >
            {a.key}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-950/40 dark:text-white/40">
            The headline's job
          </p>
          <p className="mt-1 text-sm text-zinc-950/80 dark:text-white/80">{level.job}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-950/40 dark:text-white/40">
            Opens on
          </p>
          <p className="mt-1 text-sm text-zinc-950/80 dark:text-white/80">{level.opens}</p>
        </div>
      </div>
      <div className="mt-4 rounded-lg bg-zinc-950/[0.03] p-3 dark:bg-white/[0.04]">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-950/40 dark:text-white/40">
          A sleep supplement, at this level
        </p>
        <p className="mt-1 text-sm italic text-zinc-950 dark:text-white">“{level.example}”</p>
      </div>
    </div>
  );
};

/* ───────────────────────── hypothesis builder ──────────────────────── */

export const HypothesisBuilder = () => {
  const [change, setChange] = useState("");
  const [result, setResult] = useState("");
  const [control, setControl] = useState("");
  const [reason, setReason] = useState("");
  const [against, setAgainst] = useState("");
  const [copied, setCopied] = useState(false);

  const field = (label, value, set, placeholder, hint) => (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-zinc-950/50 dark:text-white/50">
        {label}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => set(e.target.value)}
        className="mt-1 w-full rounded-lg border border-zinc-950/15 bg-transparent px-3 py-2 text-sm text-zinc-950 placeholder:text-zinc-950/30 focus:border-zinc-950/40 focus:outline-none dark:border-white/15 dark:text-white dark:placeholder:text-white/25 dark:focus:border-white/40"
      />
      {hint && <span className="mt-1 block text-xs text-zinc-950/40 dark:text-white/40">{hint}</span>}
    </label>
  );

  const sentence =
    `We believe ${change || "[change]"} will ${result || "[result]"} compared with ` +
    `${control || "[control or break-even]"}, because ${reason || "[reason, with evidence]"}. ` +
    `Against it: ${against || "[strongest counter-evidence]"}.`;

  const complete = change && result && control && reason;
  const chars = sentence.length;

  const copy = () => {
    try {
      navigator.clipboard.writeText(sentence);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      /* clipboard blocked: the text is on screen to copy by hand */
    }
  };

  return (
    <div className="not-prose my-6 rounded-xl border border-zinc-950/10 dark:border-white/10 p-4">
      <p className="text-sm font-semibold text-zinc-950 dark:text-white">Write a hypothesis</p>
      <p className="mt-1 text-sm text-zinc-950/60 dark:text-white/60">
        Fill the five parts. The sentence builds itself underneath.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {field("Change", change, setChange, "leading on the gift ladder")}
        {field("Result", result, setResult, "beat break-even on cost per order")}
        {field("Compared with", control, setControl, "the current best static at $41 per order")}
        {field("Because", reason, setReason, "offer-led statics took 3 of the last 4 wins (PAT-9)")}
      </div>
      <div className="mt-3">
        {field(
          "Against it",
          against,
          setAgainst,
          "the account's two offer-led losers both ran at this awareness level",
          "This is the clause most people drop. It is the one that makes the test honest."
        )}
      </div>

      <div className="mt-4 rounded-lg bg-zinc-950/[0.03] p-3 dark:bg-white/[0.04]">
        <p className="text-sm leading-relaxed text-zinc-950 dark:text-white">{sentence}</p>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copy}
          disabled={!complete}
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
            complete
              ? "bg-[#EAFF5E] text-[#00071A]"
              : "cursor-not-allowed bg-zinc-950/5 text-zinc-950/30 dark:bg-white/10 dark:text-white/30"
          }`}
        >
          {copied ? "Copied" : "Copy hypothesis"}
        </button>
        <span className={`text-xs ${chars > 600 ? "text-red-500" : "text-zinc-950/40 dark:text-white/40"}`}>
          {chars} / 600 characters
        </span>
        {complete && !against && (
          <span className="text-xs text-amber-600 dark:text-amber-400">
            No counter-evidence. Either you haven't looked, or the test is one-sided.
          </span>
        )}
      </div>
    </div>
  );
};

/* ──────────────────────── evidence row checker ─────────────────────── */

export const EvidenceChecker = () => {
  const STRENGTHS = ["Strong", "Likely", "Leaning", "Directional", "Thin", "Against"];

  const [tag, setTag] = useState("");
  const [fact, setFact] = useState("");
  const [strength, setStrength] = useState("Directional");

  const hasNumber = /\d/.test(fact);
  const hasSpend = /\$\s?\d/.test(fact);
  const orderMatch = fact.match(/(\d+)\s*(purchase|order|sale)/i);
  const orders = orderMatch ? parseInt(orderMatch[1], 10) : null;
  const strong = ["Strong", "Likely"].includes(strength);
  const thinButStrong = orders !== null && orders < 10 && strong;

  const problems = [];
  if (fact && !hasNumber) problems.push("No numbers. “Converts well” is an opinion, not evidence.");
  if (fact && hasNumber && !hasSpend) problems.push("No spend figure. A result without spend can't be weighed.");
  if (thinButStrong)
    problems.push(`${orders} orders can't carry “${strength}”. Under about ten orders, nothing beats Directional.`);
  if (!tag && fact) problems.push("No tag. A line with no source doesn't belong in the evidence.");

  return (
    <div className="not-prose my-6 rounded-xl border border-zinc-950/10 dark:border-white/10 p-4">
      <p className="text-sm font-semibold text-zinc-950 dark:text-white">Test an evidence row</p>
      <p className="mt-1 text-sm text-zinc-950/60 dark:text-white/60">
        Write one the way you would in a brief. This checks it the way a reviewer would.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-[140px_1fr]">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-950/50 dark:text-white/50">
            Tag
          </span>
          <input
            type="text"
            value={tag}
            placeholder="PAT-9"
            onChange={(e) => setTag(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-950/15 bg-transparent px-3 py-2 text-sm text-zinc-950 placeholder:text-zinc-950/30 focus:border-zinc-950/40 focus:outline-none dark:border-white/15 dark:text-white dark:placeholder:text-white/25"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-950/50 dark:text-white/50">
            Fact
          </span>
          <input
            type="text"
            value={fact}
            placeholder="4 purchases at $32.08 on $128 spend"
            onChange={(e) => setFact(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-950/15 bg-transparent px-3 py-2 text-sm text-zinc-950 placeholder:text-zinc-950/30 focus:border-zinc-950/40 focus:outline-none dark:border-white/15 dark:text-white dark:placeholder:text-white/25"
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {STRENGTHS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStrength(s)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              s === strength
                ? "bg-[#00071A] text-white dark:bg-[#EAFF5E] dark:text-[#00071A]"
                : "bg-zinc-950/5 text-zinc-950 hover:bg-zinc-950/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {fact && (
        <div className="mt-4">
          {problems.length === 0 ? (
            <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400">
              ✓ This would survive review. <span className="font-mono text-xs">**{tag}** — {fact} — <em>{strength}</em></span>
            </p>
          ) : (
            <ul className="space-y-1">
              {problems.map((p, i) => (
                <li key={i} className="rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-400">
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

/* ────────────────────────── lever assignment ───────────────────────── */

export const LeverPicker = () => {
  const LEVERS = [
  { key: "O", name: "Offer", pulls: "The deal, the gift ladder, value against price" },
  { key: "L", name: "Logic", pulls: "The mechanism, the numbers, the proof" },
  { key: "S", name: "Social", pulls: "Other people, belonging, reviews" },
  { key: "E", name: "Emotion", pulls: "Relief, pride, the moment" },
  { key: "N", name: "Novelty", pulls: "New format, unexpected object, pattern interrupt" },
];

  const [a, setA] = useState("O");
  const [b, setB] = useState("O");
  const [isVariable, setIsVariable] = useState(false);

  const clash = a === b && !isVariable;
  const pick = (value, set, side) => (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-950/50 dark:text-white/50">
        Version {side}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {LEVERS.map((l) => (
          <button
            key={l.key}
            type="button"
            title={l.pulls}
            onClick={() => set(l.key)}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
              l.key === value
                ? "bg-[#00071A] text-white dark:bg-[#EAFF5E] dark:text-[#00071A]"
                : "bg-zinc-950/5 text-zinc-950 hover:bg-zinc-950/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            }`}
          >
            {l.key} · {l.name}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="not-prose my-6 rounded-xl border border-zinc-950/10 dark:border-white/10 p-4">
      <p className="text-sm font-semibold text-zinc-950 dark:text-white">Assign the levers</p>
      <p className="mt-1 text-sm text-zinc-950/60 dark:text-white/60">
        A lever is how a version argues its angle. Two versions pulling the same lever are two
        executions of one idea, not a test.
      </p>

      <div className="mt-4 space-y-4">
        {pick(a, setA, "A")}
        {pick(b, setB, "B")}
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm text-zinc-950/70 dark:text-white/70">
        <input
          type="checkbox"
          checked={isVariable}
          onChange={(e) => setIsVariable(e.target.checked)}
          className="h-4 w-4 rounded border-zinc-950/25 dark:border-white/25"
        />
        The lever is the variable I'm testing
      </label>

      <div className="mt-4">
        {clash ? (
          <p className="rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-400">
            Both versions pull <strong>{LEVERS.find((l) => l.key === a).name}</strong>. Whichever wins,
            you learn nothing about the angle. Change one, or say the lever is the variable.
          </p>
        ) : (
          <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400">
            ✓ A pulls {LEVERS.find((l) => l.key === a).name}, B pulls {LEVERS.find((l) => l.key === b).name}
            {isVariable ? ", and the lever is what you're testing." : ". The verdict will point at something."}
          </p>
        )}
      </div>
    </div>
  );
};

/* ───────────────────────────── brief QA ────────────────────────────── */

export const BriefQA = () => {
  const BRIEF_QA = [
  {
    group: "Creative QA",
    items: [
      "Every creative follows the brand guidelines (look, product on screen, never-list).",
      "The product is shown accurately; no banned imagery.",
      "Paired creatives differ only in the variable.",
      "Every reference link is real and opens.",
    ],
  },
  {
    group: "Copy QA",
    items: [
      "Openings match each creative's awareness label.",
      "Every headline passes the gate: visualise, falsify, only us.",
      "Every number is claimable (product facts or the brand's safe-proof list).",
      "No banned words or claims.",
      "Product names exactly as in the catalogue.",
      "Character counts within limits (primary ≤400, aim ≤125; headline ≤40).",
    ],
  },
  {
    group: "Test QA",
    items: [
      "One variable; everything else held constant.",
      "Labels are exact Kommerce values (persona, awareness, angle).",
      "The offer and the landing page price are confirmed and match the copy.",
      "The budget fits the account's safe test spend, or the overage is noted.",
      "No live test already answers this question.",
      "Ads go in paused.",
    ],
  },
];

  const total = BRIEF_QA.reduce((n, g) => n + g.items.length, 0);
  const [ticked, setTicked] = useState([]);

  const toggle = (key) =>
    setTicked((t) => (t.includes(key) ? t.filter((x) => x !== key) : [...t, key]));

  const open = total - ticked.length;

  return (
    <div className="not-prose my-6 rounded-xl border border-zinc-950/10 dark:border-white/10 p-4">
      <p className="text-sm font-semibold text-zinc-950 dark:text-white">The QA list, in full</p>
      <p className="mt-1 text-sm text-zinc-950/60 dark:text-white/60">
        Tick only what is true. Anything left open becomes a blocker on the plan.
      </p>

      <div className="mt-4 space-y-5">
        {BRIEF_QA.map((group) => (
          <div key={group.group}>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-950/40 dark:text-white/40">
              {group.group}
            </p>
            <ul className="mt-2 space-y-1">
              {group.items.map((item, i) => {
                const key = `${group.group}-${i}`;
                const on = ticked.includes(key);
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => toggle(key)}
                      className="flex w-full items-start gap-3 rounded-lg px-2 py-1.5 text-left hover:bg-zinc-950/[0.03] dark:hover:bg-white/[0.04]"
                    >
                      <span
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                          on
                            ? "border-[#00071A] bg-[#00071A] text-white dark:border-[#EAFF5E] dark:bg-[#EAFF5E] dark:text-[#00071A]"
                            : "border-zinc-950/25 dark:border-white/25"
                        }`}
                      >
                        {on ? "✓" : ""}
                      </span>
                      <span
                        className={`text-sm ${
                          on ? "text-zinc-950/40 line-through dark:text-white/40" : "text-zinc-950/80 dark:text-white/80"
                        }`}
                      >
                        {item}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <p
        className={`mt-4 rounded-lg px-3 py-2 text-sm ${
          open === 0
            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
            : "bg-zinc-950/[0.03] text-zinc-950/70 dark:bg-white/[0.04] dark:text-white/70"
        }`}
      >
        {open === 0
          ? "✓ Nothing open. The plan can go to whoever owns the money."
          : `${open} of ${total} still open. Each one is a blocker until it clears or you note why it can't.`}
      </p>
    </div>
  );
};
