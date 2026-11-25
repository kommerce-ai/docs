/*
 * Kommerce 101 — Meta safe zones, drawn rather than described.
 *
 * Percentages come straight from the reference page: 9:16 loses the top 13%
 * to the Reels bar, everything below 65% to the caption and button, and the
 * right 120px of the lower half to Meta's icons. 4:5 loses its bottom 200px.
 *
 * Class names are written out in full because Mintlify only generates CSS for
 * Tailwind classes it can see in the page source.
 */

export const SafeZones = () => {
  const [ratio, setRatio] = useState("9:16");
  const [show, setShow] = useState(true);
  const nineSixteen = ratio === "9:16";

  return (
    <div className="not-prose my-6 rounded-xl border border-zinc-950/10 dark:border-white/10 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-zinc-950 dark:text-white">Where Meta covers your image</p>
        <div className="flex gap-2">
          {["9:16", "4:5"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRatio(r)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                r === ratio
                  ? "bg-[#00071A] text-white dark:bg-[#EAFF5E] dark:text-[#00071A]"
                  : "bg-zinc-950/5 text-zinc-950 hover:bg-zinc-950/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              }`}
            >
              {r}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="rounded-lg bg-zinc-950/5 px-3 py-1.5 text-sm font-medium text-zinc-950 hover:bg-zinc-950/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          >
            {show ? "Hide zones" : "Show zones"}
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <div
          className={`relative overflow-hidden rounded-lg bg-zinc-950/[0.06] dark:bg-white/[0.08] ${
            nineSixteen ? "aspect-[9/16] w-[200px]" : "aspect-[4/5] w-[260px]"
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-zinc-950/30 dark:text-white/30">your image</span>
          </div>

          {show && nineSixteen && (
            <>
              <div className="absolute inset-x-0 top-0 h-[13%] border-b border-red-500/50 bg-red-500/25">
                <span className="absolute left-1 top-1 text-[9px] font-medium text-red-700 dark:text-red-300">
                  Reels bar · top 13%
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-[35%] border-t border-red-500/50 bg-red-500/25">
                <span className="absolute left-1 top-1 text-[9px] font-medium text-red-700 dark:text-red-300">
                  Caption + button · below 65%
                </span>
              </div>
              <div className="absolute bottom-[35%] right-0 h-[15%] w-[11.1%] border-l border-amber-500/60 bg-amber-500/30">
                <span className="absolute -left-10 top-1 text-[9px] font-medium text-amber-700 dark:text-amber-300">
                  icons
                </span>
              </div>
            </>
          )}

          {show && !nineSixteen && (
            <div className="absolute inset-x-0 bottom-0 h-[14.8%] border-t border-red-500/50 bg-red-500/25">
              <span className="absolute left-1 top-1 text-[9px] font-medium text-red-700 dark:text-red-300">
                Call to action · bottom 200px
              </span>
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm text-zinc-950/70 dark:text-white/70">
        {nineSixteen
          ? "1080 × 1920. Keep anything that has to be read inside the middle band. Render 9:16 first, then crop 4:5 from the middle 70%."
          : "1080 × 1350. The bottom 200 pixels carry Meta's call to action, so nothing that has to be read goes there."}
      </p>
      <p className="mt-2 text-sm text-zinc-950/70 dark:text-white/70">
        Never put a button in the image. Meta adds its own, and two buttons read as a mistake.
      </p>
    </div>
  );
};
