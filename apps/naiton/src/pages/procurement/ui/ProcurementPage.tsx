const cards = [
  { title: "Pending approvals", value: "18" },
  { title: "Preferred suppliers", value: "64" },
  { title: "Contract renewals", value: "7" },
];

export default function ProcurementPage() {
  return (
    <section className="space-y-4 p-3 sm:p-5">
      <div className="naiton-surface rounded-[26px] p-6">
        <p className="text-sm font-semibold tracking-[0.22em] text-slate-500 uppercase">
          Procurement
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-800">
          Supplier and spend workspace
        </h1>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="naiton-surface rounded-[24px] p-5">
            <p className="text-sm text-slate-500">{card.title}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-800">
              {card.value}
            </p>
          </div>
        ))}
      </div>
      <div className="naiton-grid-bg naiton-surface rounded-[24px] p-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[22px] border border-white/80 bg-white/90 p-5">
            <p className="text-lg font-semibold text-slate-800">Regional sourcing map</p>
            <div className="mt-4 h-72 rounded-[18px] bg-gradient-to-br from-cyan-100 to-emerald-50" />
          </div>
          <div className="rounded-[22px] border border-white/80 bg-white/90 p-5">
            <p className="text-lg font-semibold text-slate-800">Buyer notes</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Contract sync is ready for Phase 10 API wiring.</li>
              <li>Vendor scorecards will reuse the dashboard card system.</li>
              <li>Approval modals stay deferred to keep this phase routing-focused.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
