const panels = [
  { title: "Sample graph" },
  { title: "Sample graph" },
  { title: "Sample graph" },
  { title: "Sample graph" },
];

export default function AccountingPage() {
  return (
    <section className="grid h-full gap-4 p-3 sm:p-5 xl:grid-cols-[2fr_2fr_1.3fr]">
      <div className="grid gap-4 xl:col-span-2 xl:grid-cols-2">
        {panels.map((panel, index) => (
          <div key={`${panel.title}-${index}`} className="naiton-surface rounded-[24px] p-5">
            <p className="text-lg font-semibold text-slate-700">{panel.title}</p>
            <div className="naiton-grid-bg mt-6 h-[320px] rounded-[18px] border border-slate-100 bg-white/75" />
          </div>
        ))}
      </div>
      <div className="naiton-surface rounded-[24px] p-5">
        <p className="text-lg font-semibold text-slate-700">Activity</p>
        <div className="mt-6 space-y-4">
          {[
            "Month-end close package staged",
            "VAT reconciliation needs review",
            "Cashbook variance flagged for Amsterdam",
            "Receivables reminder batch scheduled",
          ].map((item) => (
            <div key={item} className="rounded-[18px] bg-slate-50 p-4 text-sm text-slate-600">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
