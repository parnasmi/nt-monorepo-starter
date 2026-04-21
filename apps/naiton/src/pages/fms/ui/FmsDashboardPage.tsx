export default function FmsDashboardPage() {
  const stats = [
    { label: "Active vehicles", value: "42", trend: "+3 this week" },
    { label: "In-transit", value: "18", trend: "6 delayed" },
    { label: "Fuel efficiency", value: "8.2 L/100km", trend: "-0.4 vs last month" },
    { label: "Maintenance due", value: "5", trend: "2 overdue" },
  ];

  return (
    <section className="space-y-4 p-3 sm:p-5">
      <div className="naiton-surface rounded-[26px] p-5">
        <p className="text-sm font-semibold tracking-[0.22em] text-slate-500 uppercase">FMS</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-800">
          Fleet dashboard
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Real-time fleet overview with key performance indicators.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="naiton-surface rounded-[24px] p-5">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-800">{s.value}</p>
            <p className="mt-1 text-xs text-slate-400">{s.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="naiton-surface rounded-[24px] p-6">
          <p className="text-lg font-semibold text-slate-800">Recent alerts</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" /> ZK-107-L — Engine warning light
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" /> 49-BBH-3 — Tire pressure low
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> ZK-112-L — Scheduled service
              completed
            </li>
          </ul>
        </div>
        <div className="naiton-surface rounded-[24px] p-6">
          <p className="text-lg font-semibold text-slate-800">Driver hours today</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Jan de Vries — 6h 45m (within limit)</li>
            <li>Pieter Bakker — 7h 12m (nearing limit)</li>
            <li>Stefan Visser — 4h 30m</li>
            <li>Marco Jansen — 8h 02m (at limit)</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
