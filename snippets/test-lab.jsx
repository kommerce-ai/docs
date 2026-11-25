/*
 * Kommerce 101 — test shape and budget practice.
 *
 * The arithmetic mirrors the rules the engine already runs on: about 2.5x
 * break-even CPA to fund each idea, a six-day window, no verdict before 72
 * hours, and enough held back to confirm whatever passes. It is a teaching
 * aid. The real numbers come from Kommerce when you ask it for the test idea.
 *
 * Every component is self-contained. Mintlify compiles each exported
 * component in isolation, so a reference to anything declared at the top of
 * the file fails in the browser with "x is not defined" even when that
 * binding is exported. The repetition below is deliberate.
 */

export const TestDesigner = () => {
  const money = (n) => "$" + Math.round(n).toLocaleString("en-US");

  const STRICTNESS = [
  {
    key: "Cautious",
    says: "Wants more evidence before it acts. Spends more, is wrong less often.",
    when: "Each test costs real money to produce, or the client will ask you to defend the call.",
  },
  {
    key: "Balanced",
    says: "The default. Acts on the evidence a normal test produces.",
    when: "You have no reason to push either way.",
  },
  {
    key: "Bold",
    says: "Calls things sooner and is wrong more often.",
    when: "Creative is cheap and you want throughput.",
  },
];

  const WINNER_CAP = 10;

  const MIN_HOURS = 72;
  const WINDOW_DAYS = 6;
  const FUND_MULTIPLE = 2.5;
  const [ideas, setIdeas] = useState(2);
  const [cpa, setCpa] = useState(40);
  const [strict, setStrict] = useState("Balanced");

  const perIdea = cpa * FUND_MULTIPLE;
  const total = perIdea * ideas;
  const perDay = total / WINDOW_DAYS;
  const reserve = cpa * WINNER_CAP;
  const mode = STRICTNESS.find((s) => s.key === strict);

  const row = (label, value, note) => (
    <div className="flex items-baseline justify-between gap-4 border-b border-zinc-950/5 py-2 last:border-0 dark:border-white/5">
      <span className="text-sm text-zinc-950/60 dark:text-white/60">{label}</span>
      <span className="text-right">
        <span className="text-sm font-semibold text-zinc-950 dark:text-white">{value}</span>
        {note && <span className="block text-xs text-zinc-950/40 dark:text-white/40">{note}</span>}
      </span>
    </div>
  );

  return (
    <div className="not-prose my-6 rounded-xl border border-zinc-950/10 dark:border-white/10 p-4">
      <p className="text-sm font-semibold text-zinc-950 dark:text-white">Shape a test</p>
      <p className="mt-1 text-sm text-zinc-950/60 dark:text-white/60">
        Two numbers decide almost everything: how many ideas you are testing, and what one order is
        worth to the brand.
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="flex items-baseline justify-between text-xs font-semibold uppercase tracking-wide text-zinc-950/50 dark:text-white/50">
            <span>Ideas (versions)</span>
            <span className="text-sm font-bold normal-case text-zinc-950 dark:text-white">{ideas}</span>
          </span>
          <input
            type="range"
            min="1"
            max="6"
            value={ideas}
            onChange={(e) => setIdeas(Number(e.target.value))}
            className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-950/15 dark:bg-white/20"
          />
        </label>

        <label className="block">
          <span className="flex items-baseline justify-between text-xs font-semibold uppercase tracking-wide text-zinc-950/50 dark:text-white/50">
            <span>Break-even cost per order</span>
            <span className="text-sm font-bold normal-case text-zinc-950 dark:text-white">{money(cpa)}</span>
          </span>
          <input
            type="range"
            min="10"
            max="200"
            step="5"
            value={cpa}
            onChange={(e) => setCpa(Number(e.target.value))}
            className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-950/15 dark:bg-white/20"
          />
        </label>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-950/50 dark:text-white/50">
          Strictness
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {STRICTNESS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setStrict(s.key)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                s.key === strict
                  ? "bg-[#00071A] text-white dark:bg-[#EAFF5E] dark:text-[#00071A]"
                  : "bg-zinc-950/5 text-zinc-950 hover:bg-zinc-950/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              }`}
            >
              {s.key}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-zinc-950/70 dark:text-white/70">{mode.says}</p>
        <p className="mt-1 text-xs text-zinc-950/40 dark:text-white/40">Pick it when: {mode.when}</p>
      </div>

      <div className="mt-6 rounded-lg bg-zinc-950/[0.03] p-4 dark:bg-white/[0.04]">
        {row("Ad sets", `${ideas}`, "One per idea. Each gets its own budget.")}
        {row("Funding per idea", money(perIdea), `${FUND_MULTIPLE}× break-even cost per order`)}
        {row("Total test budget", money(total), `${money(perDay)} a day over ${WINDOW_DAYS} days`)}
        {row("Held back to confirm a winner", money(reserve), `up to ${WINNER_CAP}× break-even for the idea that passes`)}
        {row("Earliest verdict", `${MIN_HOURS} hours`, "Nothing is called before then, whatever the numbers look like")}
      </div>

      <div className="mt-4 space-y-2">
        {ideas >= 4 && (
          <p className="rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-400">
            {ideas} ideas is {money(total)} committed before you learn anything. Ideas multiply budget
            one for one. Cut to the two you would defend.
          </p>
        )}
        <p className="rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-400">
          Set these as lifetime budgets per ad set. A shared campaign budget lets Meta move money to
          whatever looks best on day one, and starves the other side before it produces a verdict.
          You are buying information; Meta is buying results. Those are different jobs.
        </p>
      </div>

      <p className="mt-4 text-xs text-zinc-950/40 dark:text-white/40">
        A teaching aid, not the source of truth. Ask Kommerce for the test idea and use the bar,
        budget and stop rule it returns.
      </p>
    </div>
  );
};

/* ─────────────────────────── fair-test check ───────────────────────── */

export const FairTestCheck = () => {
  const FAIR_TEST = [
  {
    rule: "Change only the variable",
    detail: "If A is offer-led and B is angle-led, both still show the same offer and the same product truth. Only the lead differs.",
  },
  {
    rule: "Match volume",
    detail: "The same number of creatives per version, at similar production quality.",
  },
  {
    rule: "Build each side's strongest creative",
    detail: "Use the account's best evidence for both. A straw man version wastes the whole test.",
  },
  {
    rule: "Name what each version must not do",
    detail: "For example: B never mentions the gifts before the call to action.",
  },
];

  const [open, setOpen] = useState(null);

  return (
    <div className="not-prose my-6 grid gap-2 sm:grid-cols-2">
      {FAIR_TEST.map((f, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setOpen(open === i ? null : i)}
          className={`rounded-xl border p-4 text-left transition-colors ${
            open === i
              ? "border-zinc-950/30 bg-zinc-950/[0.03] dark:border-white/30 dark:bg-white/[0.04]"
              : "border-zinc-950/10 hover:border-zinc-950/25 dark:border-white/10 dark:hover:border-white/25"
          }`}
        >
          <p className="text-sm font-semibold text-zinc-950 dark:text-white">
            {i + 1}. {f.rule}
          </p>
          {open === i && (
            <p className="mt-2 text-sm text-zinc-950/70 dark:text-white/70">{f.detail}</p>
          )}
        </button>
      ))}
    </div>
  );
};
