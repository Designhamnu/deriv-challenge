/**
 * Progress toward a target. Brand fill on a brand-soft track, both from
 * tokens. The width percentage is the only inline style — it is data, not a
 * design value.
 */
export default function ProgressBar({ value = 0, max = 0, label }) {
  const safeMax = max > 0 ? max : 1
  const percent = Math.min(100, Math.max(0, (value / safeMax) * 100))

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className="h-2 w-full overflow-hidden rounded-full bg-brand-soft"
    >
      <div className="h-full rounded-full bg-brand" style={{ width: `${percent}%` }} />
    </div>
  )
}
