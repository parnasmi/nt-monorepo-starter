const channels = [
  { name: "Direct sales", revenue: "$482K", growth: "+12%", share: 38, color: "bg-emerald-500" },
  { name: "Marketplace", revenue: "$312K", growth: "+8%", share: 24, color: "bg-sky-500" },
  { name: "Subscriptions", revenue: "$256K", growth: "+22%", share: 20, color: "bg-violet-500" },
  { name: "Wholesale", revenue: "$178K", growth: "-3%", share: 14, color: "bg-amber-500" },
  { name: "Other", revenue: "$56K", growth: "+1%", share: 4, color: "bg-slate-400" },
];

export default function RevenuePage() {
  return (
    <section className="space-y-4 p-3 sm:p-5">
      <div className="naiton-surface rounded-[26px] p-5">
        <p className="text-sm font-semibold tracking-[0.22em] text-slate-500 uppercase">
          Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-800">
          Revenue breakdown
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Revenue distribution across channels for the current quarter.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {[
          { label: "Total revenue", value: "$1.28M" },
          { label: "MRR", value: "$107K" },
          { label: "Avg. deal size", value: "$24.5K" },
          { label: "Net margin", value: "18.2%" },
        ].map((m) => (
          <div key={m.label} className="naiton-surface rounded-[24px] p-5">
            <p className="text-sm text-slate-500">{m.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-800">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="naiton-surface rounded-[24px] p-6">
        <p className="text-lg font-semibold text-slate-800">Revenue by channel</p>
        <div className="mt-4 space-y-4">
          {channels.map((ch) => (
            <div key={ch.name} className="flex items-center gap-4">
              <span className="w-28 text-sm font-medium text-slate-600">{ch.name}</span>
              <div className="flex-1">
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${ch.color}`}
                    style={{ width: `${ch.share}%` }}
                  />
                </div>
              </div>
              <span className="w-16 text-right text-sm font-semibold text-slate-700">
                {ch.revenue}
              </span>
              <span
                className={`w-12 text-right text-xs font-semibold ${ch.growth.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}
              >
                {ch.growth}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
