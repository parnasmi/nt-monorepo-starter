export default function ProductionOrdersPage() {
  const orders = [
    {
      id: "PO-5001",
      product: "Steel Frame Assembly",
      qty: 500,
      status: "In progress",
      line: "Line A",
      completion: 68,
    },
    {
      id: "PO-5002",
      product: "Aluminium Panel Set",
      qty: 1200,
      status: "Queued",
      line: "Line B",
      completion: 0,
    },
    {
      id: "PO-5003",
      product: "Circuit Board v4",
      qty: 3000,
      status: "In progress",
      line: "Line C",
      completion: 42,
    },
    {
      id: "PO-5004",
      product: "Packaging Box 40x30",
      qty: 8000,
      status: "Complete",
      line: "Line A",
      completion: 100,
    },
    {
      id: "PO-5005",
      product: "Motor Housing Unit",
      qty: 250,
      status: "In progress",
      line: "Line B",
      completion: 85,
    },
  ];

  return (
    <section className="space-y-4 p-3 sm:p-5">
      <div className="naiton-surface rounded-[26px] p-5">
        <p className="text-sm font-semibold tracking-[0.22em] text-slate-500 uppercase">
          Production
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-800">Orders</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Manufacturing orders and production line status.
        </p>
      </div>

      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="naiton-surface rounded-[20px] p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-slate-800">{o.product}</p>
                <p className="text-xs text-slate-500">
                  {o.id} · {o.line} · {o.qty} units
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  o.status === "Complete"
                    ? "bg-emerald-50 text-emerald-700"
                    : o.status === "In progress"
                      ? "bg-sky-50 text-sky-700"
                      : "bg-slate-100 text-slate-600"
                }`}
              >
                {o.status}
              </span>
            </div>
            {o.completion > 0 && o.completion < 100 && (
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-sky-500"
                  style={{ width: `${o.completion}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
