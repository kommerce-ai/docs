/*
 * Kommerce 101 — course shell.
 *
 * ── The one rule that matters in this file ──────────────────────────────
 * Every component must be SELF-CONTAINED. Mintlify compiles each exported
 * component in isolation, so a component cannot reference anything declared
 * at the top of the file — not a helper, not a constant, not even when that
 * binding is itself exported. It compiles, the page returns 200, and then it
 * dies in the browser with "x is not defined".
 *
 * So the localStorage helpers and the lesson registry are repeated inside the
 * components that need them. That duplication is deliberate. Do not "tidy" it
 * into shared constants.
 *
 * ── Progress ────────────────────────────────────────────────────────────
 * Progress lives in the reader's own browser under "kommerce101.progress.v1".
 * It is per-device, it clears with site data, and nobody else can see it.
 * Anything that has to be on the record goes through the checkpoint form.
 */

/* ─────────────────────────── lesson header ─────────────────────────── */

export const LessonHeader = ({ module: mod, lesson, minutes, outcomes = [] }) => (
  <div className="not-prose mb-8 border-b border-zinc-950/10 dark:border-white/10 pb-6">
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium uppercase tracking-wide text-zinc-950/50 dark:text-white/50">
      <span>Module {mod}</span>
      <span>·</span>
      <span>Lesson {lesson}</span>
      <span>·</span>
      <span>{minutes} min</span>
    </div>
    {outcomes.length > 0 && (
      <div className="mt-4 rounded-xl bg-zinc-950/[0.03] dark:bg-white/[0.04] p-4">
        <p className="text-sm font-semibold text-zinc-950 dark:text-white">
          By the end of this lesson you can
        </p>
        <ul className="mt-2 space-y-1">
          {outcomes.map((o, i) => (
            <li key={i} className="flex gap-2 text-sm text-zinc-950/70 dark:text-white/70">
              <span className="text-zinc-950/30 dark:text-white/30">—</span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

/* ───────────────────────── knowledge check ─────────────────────────── */

export const Check = ({ question, options = [], answer = 0, why = "" }) => {
  const [picked, setPicked] = useState(null);
  const done = picked !== null;

  return (
    <div className="not-prose my-6 rounded-xl border border-zinc-950/10 dark:border-white/10 p-4">
      <p className="text-sm font-semibold text-zinc-950 dark:text-white">{question}</p>
      <div className="mt-3 flex flex-col gap-2">
        {options.map((option, i) => {
          const right = i === answer;
          let tone =
            "border-zinc-950/10 dark:border-white/10 hover:border-zinc-950/30 dark:hover:border-white/30";
          if (done && right) tone = "border-emerald-500 bg-emerald-500/10";
          else if (done && picked === i) tone = "border-red-500 bg-red-500/10";
          return (
            <button
              key={i}
              type="button"
              onClick={() => setPicked(i)}
              className={`rounded-lg border px-3 py-2 text-left text-sm text-zinc-950 dark:text-white transition-colors ${tone}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {done && (
        <p className="mt-3 text-sm text-zinc-950/70 dark:text-white/70">
          <span className="font-semibold text-zinc-950 dark:text-white">
            {picked === answer ? "Correct. " : "Not quite. "}
          </span>
          {why}
        </p>
      )}
    </div>
  );
};

/* ────────────────────── mark complete + progress ───────────────────── */

export const LessonComplete = ({ id, next, nextTitle }) => {
  // Self-contained by necessity. See the note at the top of this file.
  const KEY = "kommerce101.progress.v1";
  const TOTAL_LESSONS = 4; // raise this as modules 01, 02, 04 and 05 land
  const read = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch (e) {
      return {};
    }
  };

  const [done, setDone] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const p = read();
    setDone(Boolean(p[id]));
    setCount(Object.values(p).filter(Boolean).length);
  }, [id]);

  const toggle = () => {
    const p = read();
    if (p[id]) delete p[id];
    else p[id] = Date.now();
    try {
      localStorage.setItem(KEY, JSON.stringify(p));
    } catch (e) {
      /* private window or blocked storage: it just won't persist */
    }
    setDone(Boolean(p[id]));
    setCount(Object.values(p).filter(Boolean).length);
  };

  // Hold the space until localStorage has been read, so the button never
  // flips from unchecked to checked in front of the reader.
  if (done === null) return <div className="not-prose mt-10 h-24" />;

  const pct = Math.min(100, Math.round((count / TOTAL_LESSONS) * 100));

  return (
    <div className="not-prose mt-10 rounded-xl border border-zinc-950/10 dark:border-white/10 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={toggle}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
            done
              ? "bg-[#EAFF5E] text-[#00071A]"
              : "bg-zinc-950/5 dark:bg-white/10 text-zinc-950 dark:text-white hover:bg-zinc-950/10 dark:hover:bg-white/20"
          }`}
        >
          {done ? "✓ Lesson complete" : "Mark lesson complete"}
        </button>
        {next && (
          <a href={next} className="text-sm font-medium text-zinc-950 dark:text-white hover:underline">
            {nextTitle || "Next lesson"} →
          </a>
        )}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-1.5 flex-1 rounded-full bg-zinc-950/10 dark:bg-white/10">
          <div
            className="h-1.5 rounded-full bg-[#00071A] dark:bg-[#EAFF5E] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="shrink-0 text-xs text-zinc-950/50 dark:text-white/50">
          {count} of {TOTAL_LESSONS} lessons
        </span>
      </div>
    </div>
  );
};

/* ───────────────────────────── checkpoint ──────────────────────────── */

export const Checkpoint = ({ module: mod, title, tasks = [], formUrl }) => {
  const key = `kommerce101.checkpoint.m${mod}`;
  const [ticked, setTicked] = useState(null);

  useEffect(() => {
    try {
      setTicked(JSON.parse(localStorage.getItem(key) || "[]"));
    } catch (e) {
      setTicked([]);
    }
  }, [key]);

  const toggle = (i) => {
    const next = ticked.includes(i) ? ticked.filter((t) => t !== i) : [...ticked, i];
    setTicked(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch (e) {
      /* ignore */
    }
  };

  if (ticked === null) return <div className="not-prose h-72" />;

  const allDone = tasks.length > 0 && ticked.length === tasks.length;

  return (
    <div className="not-prose my-8 rounded-xl border-2 border-[#00071A] dark:border-[#EAFF5E] p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-950/50 dark:text-white/50">
        Module {mod} checkpoint
      </p>
      <p className="mt-1 text-lg font-semibold text-zinc-950 dark:text-white">{title}</p>
      <p className="mt-2 text-sm text-zinc-950/60 dark:text-white/60">
        {ticked.length} of {tasks.length} done
      </p>

      <ul className="mt-4 space-y-1">
        {tasks.map((task, i) => {
          const on = ticked.includes(i);
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => toggle(i)}
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
                    on
                      ? "text-zinc-950/40 line-through dark:text-white/40"
                      : "text-zinc-950/80 dark:text-white/80"
                  }`}
                >
                  {task}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 border-t border-zinc-950/10 dark:border-white/10 pt-4">
        {formUrl ? (
          <a
            href={formUrl}
            target="_blank"
            rel="noreferrer"
            className={`inline-block rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              allDone
                ? "bg-[#EAFF5E] text-[#00071A]"
                : "bg-zinc-950/5 dark:bg-white/10 text-zinc-950/60 dark:text-white/60"
            }`}
          >
            Submit the checkpoint →
          </a>
        ) : (
          <p className="text-sm text-zinc-950/50 dark:text-white/50">
            No submission form connected yet. Send your work to your lead in the meantime.
          </p>
        )}
        <p className="mt-2 text-xs text-zinc-950/50 dark:text-white/50">
          The ticks above are only for you. Submitting is what puts it on the record.
        </p>
      </div>
    </div>
  );
};

/* ──────────────────────────── walkthrough ─────────────────────────── */

/*
 * Drop a recorded walkthrough into a lesson:
 *   <Walkthrough id="LOOM_VIDEO_ID" title="Writing a brief end to end" />
 * Loom share URLs look like loom.com/share/<id>; pass only the id. For
 * YouTube, pass the watch id and add source="youtube".
 *
 * Record on the demo brand. Check every frame for client names, spend and
 * ROAS figures, Meta account and pixel IDs, member emails and browser chrome
 * before it goes up. This site is public.
 */
export const Walkthrough = ({ id, title, source = "loom" }) => {
  const src =
    source === "youtube"
      ? `https://www.youtube.com/embed/${id}`
      : `https://www.loom.com/embed/${id}`;

  return (
    <div className="not-prose my-6">
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-zinc-950/10 dark:border-white/10">
        <iframe src={src} title={title || "Walkthrough"} allowFullScreen className="h-full w-full" />
      </div>
      {title && <p className="mt-2 text-xs text-zinc-950/50 dark:text-white/50">Watch first: {title}</p>}
    </div>
  );
};

/* ────────────────────────── course home map ────────────────────────── */

export const CourseMap = () => {
  // The registry lives inside the component on purpose. See the note at the
  // top of this file: a top-level const would not survive compilation.
  const COURSE = [
    {
      num: "01",
      title: "Get the account ready",
      blurb: "Take a brand from signed to launch-ready: details, products, assets and Meta access.",
      checkpoint: "Onboard a demo brand until it reads launch-ready",
      lessons: [],
    },
    {
      num: "02",
      title: "Read the account",
      blurb: "Audit a Meta account before you spend against it, and find the angles worth testing.",
      checkpoint: "Audit a demo account and write up the findings",
      lessons: [],
    },
    {
      num: "03",
      title: "Build a test",
      blurb: "Decide what to test, write the brief, create the test, generate the ads.",
      checkpoint: "Ship a brief, a test and three images on the demo brand",
      checkpointHref: "/kommerce-101/build-a-test/checkpoint",
      lessons: [
        { id: "m3l1", n: 1, title: "Decide what to test", minutes: 8, href: "/kommerce-101/build-a-test/what-to-test" },
        { id: "m3l2", n: 2, title: "Write the brief", minutes: 12, href: "/kommerce-101/build-a-test/the-brief" },
        { id: "m3l3", n: 3, title: "Create the test", minutes: 10, href: "/kommerce-101/build-a-test/the-test" },
        { id: "m3l4", n: 4, title: "Generate the ads", minutes: 8, href: "/kommerce-101/build-a-test/the-ads" },
      ],
    },
    {
      num: "04",
      title: "Run the money",
      blurb: "Publish, watch the right numbers, and call the verdict the engine is pointing at.",
      checkpoint: "Call the verdict on five finished tests",
      lessons: [],
    },
    {
      num: "05",
      title: "Scale and report",
      blurb: "Put real budget behind a proven idea, and tell the client what happened.",
      checkpoint: "Produce a weekly report from a live account",
      lessons: [],
    },
  ];

  const [progress, setProgress] = useState(null);

  useEffect(() => {
    try {
      setProgress(JSON.parse(localStorage.getItem("kommerce101.progress.v1") || "{}"));
    } catch (e) {
      setProgress({});
    }
  }, []);

  const p = progress || {};
  const all = COURSE.flatMap((m) => m.lessons);
  const doneCount = all.filter((l) => p[l.id]).length;
  const pct = all.length ? Math.round((doneCount / all.length) * 100) : 0;

  return (
    <div className="not-prose">
      <div className="mb-8 rounded-xl border border-zinc-950/10 dark:border-white/10 p-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-zinc-950 dark:text-white">Your progress</span>
          <span className="text-sm text-zinc-950/50 dark:text-white/50">
            {progress === null ? " " : `${doneCount} of ${all.length} lessons · ${pct}%`}
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full rounded-full bg-zinc-950/10 dark:bg-white/10">
          <div
            className="h-1.5 rounded-full bg-[#00071A] dark:bg-[#EAFF5E] transition-all"
            style={{ width: `${progress === null ? 0 : pct}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {COURSE.map((mod) => {
          const live = mod.lessons.length > 0;
          const modDone = mod.lessons.filter((l) => p[l.id]).length;
          return (
            <div
              key={mod.num}
              className={`rounded-xl border p-5 ${
                live
                  ? "border-zinc-950/10 dark:border-white/10"
                  : "border-dashed border-zinc-950/10 dark:border-white/10 opacity-60"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-base font-semibold text-zinc-950 dark:text-white">
                  <span className="text-zinc-950/40 dark:text-white/40">{mod.num}</span> {mod.title}
                </p>
                {live ? (
                  <span className="text-xs text-zinc-950/50 dark:text-white/50">
                    {modDone} of {mod.lessons.length} done
                  </span>
                ) : (
                  <span className="rounded bg-zinc-950/5 dark:bg-white/10 px-2 py-0.5 text-xs text-zinc-950/50 dark:text-white/50">
                    Being written
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-zinc-950/60 dark:text-white/60">{mod.blurb}</p>

              {live && (
                <ol className="mt-4 space-y-1">
                  {mod.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <a
                        href={lesson.href}
                        className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm hover:bg-zinc-950/[0.03] dark:hover:bg-white/[0.04]"
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                            p[lesson.id]
                              ? "border-[#00071A] bg-[#00071A] text-white dark:border-[#EAFF5E] dark:bg-[#EAFF5E] dark:text-[#00071A]"
                              : "border-zinc-950/25 dark:border-white/25"
                          }`}
                        >
                          {p[lesson.id] ? "✓" : ""}
                        </span>
                        <span className="text-zinc-950 dark:text-white">
                          {lesson.n}. {lesson.title}
                        </span>
                        <span className="ml-auto text-xs text-zinc-950/40 dark:text-white/40">
                          {lesson.minutes} min
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              )}

              <p className="mt-4 flex items-start gap-2 text-sm text-zinc-950/70 dark:text-white/70">
                <span className="text-zinc-950/30 dark:text-white/30">⚑</span>
                {mod.checkpointHref ? (
                  <a href={mod.checkpointHref} className="hover:underline">
                    <span className="font-medium text-zinc-950 dark:text-white">Checkpoint:</span>{" "}
                    {mod.checkpoint}
                  </a>
                ) : (
                  <span>
                    <span className="font-medium text-zinc-950 dark:text-white">Checkpoint:</span>{" "}
                    {mod.checkpoint}
                  </span>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
