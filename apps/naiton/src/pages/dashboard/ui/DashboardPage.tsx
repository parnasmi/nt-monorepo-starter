type RingMetric = {
  label: string;
  value: string;
  sublabel: string;
  progress: number;
};

const ringMetrics: RingMetric[] = [
  { label: "Total users", value: "1 245", sublabel: "users", progress: 72 },
  { label: "Monthly revenue", value: "15 000", sublabel: "USD", progress: 68 },
  { label: "Daily active sessions", value: "300", sublabel: "sessions", progress: 61 },
  { label: "Customer satisfaction", value: "87", sublabel: "%", progress: 74 },
];

const stackedMetrics = [
  { label: "May", left: "24%", middle: "76%", right: "0%", total: "599 km" },
  { label: "June", left: "26%", middle: "48%", right: "26%", total: "450 km" },
  { label: "July", left: "52%", middle: "30%", right: "18%", total: "700 km" },
];

function ProgressRing({ metric }: { metric: RingMetric }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (metric.progress / 100) * circumference;

  return (
    <div className="naiton-surface rounded-[24px] p-5">
      <p className="text-lg font-semibold text-slate-700">{metric.label}</p>
      <div className="mt-5 flex items-center justify-center">
        <svg className="h-36 w-36 -rotate-90" viewBox="0 0 140 140">
          <circle className="naiton-ring-track fill-none stroke-[10]" cx="70" cy="70" r={radius} />
          <circle
            className="naiton-ring-fill fill-none stroke-[10]"
            cx="70"
            cy="70"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="pointer-events-none absolute text-center">
          <div className="text-4xl font-semibold tracking-tight text-slate-800">{metric.value}</div>
          <div className="text-sm text-slate-500">{metric.sublabel}</div>
        </div>
      </div>
    </div>
  );
}

function StackedPanel() {
  return (
    <div className="naiton-surface rounded-[24px] p-5">
      <p className="text-lg font-semibold text-slate-700">Total users</p>
      <div className="mt-6 space-y-5">
        {stackedMetrics.map((row) => (
          <div key={row.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>{row.label}</span>
              <span className="text-2xl font-semibold tracking-tight text-slate-700">
                {row.total}
              </span>
            </div>
            <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="bg-sky-300" style={{ width: row.left }} />
              <div className="bg-amber-300" style={{ width: row.middle }} />
              <div className="bg-emerald-300" style={{ width: row.right }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <section className="space-y-4 p-3 sm:p-5">
      <div className="rounded-[28px] bg-white/70 px-5 py-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)] ring-1 ring-white/80 backdrop-blur">
        <p className="text-sm font-semibold tracking-[0.22em] text-primary uppercase">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-800">
          Cross-module command center
        </h1>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {ringMetrics.map((metric) => (
          <ProgressRing key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <StackedPanel />
        <StackedPanel />
      </div>
    </section>
  );
}
