import { ArrowRight, BadgeDollarSign, ClipboardList, PackageCheck, Users } from "lucide-react";

import { Badge } from "@repo/ui-kit/shadcn/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui-kit/shadcn/card";

type KpiCard = {
  label: string;
  value: string;
  trend: string;
  progress: number;
  icon: typeof BadgeDollarSign;
};

const kpiCards: KpiCard[] = [
  {
    label: "Total sales",
    value: "$1.84M",
    trend: "+12.4% vs last month",
    progress: 78,
    icon: BadgeDollarSign,
  },
  {
    label: "New leads",
    value: "286",
    trend: "+34 this week",
    progress: 63,
    icon: Users,
  },
  {
    label: "Open orders",
    value: "91",
    trend: "14 awaiting approval",
    progress: 52,
    icon: ClipboardList,
  },
  {
    label: "Ready to ship",
    value: "47",
    trend: "9 expedited today",
    progress: 69,
    icon: PackageCheck,
  },
];

const activityRows = [
  { title: "Sales pipeline", value: "48 opportunities", change: "11 hot leads need action" },
  { title: "Warehouse sync", value: "99.1% matched", change: "2 transfers pending" },
  { title: "Collections pulse", value: "$84k overdue", change: "3 accounts escalated" },
];

const spotlightRows = [
  { label: "Amsterdam branch", share: "34%", width: "34%" },
  { label: "Rotterdam branch", share: "28%", width: "28%" },
  { label: "Utrecht branch", share: "22%", width: "22%" },
  { label: "Other locations", share: "16%", width: "16%" },
];

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-2 rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-400"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <section className="space-y-4 p-3 sm:p-5">
      <Card className="naiton-surface rounded-[28px] border-white/70 bg-white/85 shadow-[0_12px_28px_rgba(15,23,42,0.05)] backdrop-blur">
        <CardHeader className="gap-2 pb-4">
          <Badge className="w-fit rounded-full bg-primary/10 px-3 py-1 text-primary hover:bg-primary/10">
            Admin
          </Badge>
          <CardTitle className="text-3xl tracking-tight text-slate-800">
            Cross-module command center
          </CardTitle>
          <CardDescription className="max-w-2xl text-sm leading-6 text-slate-500">
            Snapshot KPIs help the suite shell feel alive from the first load while Sales and CRM
            wire into mock-backed module data.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 xl:grid-cols-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;

          return (
            <Card key={card.label} className="naiton-surface rounded-[24px] border-white/70">
              <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
                <div>
                  <CardDescription className="text-sm font-medium text-slate-500">
                    {card.label}
                  </CardDescription>
                  <CardTitle className="mt-3 text-4xl tracking-tight text-slate-800">
                    {card.value}
                  </CardTitle>
                </div>
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <ProgressBar progress={card.progress} />
                <p className="text-sm text-slate-500">{card.trend}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
        <Card className="naiton-surface rounded-[24px] border-white/70">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">Operational spotlight</CardTitle>
            <CardDescription>Static dashboard cards for Phase 10 KPI scaffolding.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {spotlightRows.map((row) => (
              <div key={row.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>{row.label}</span>
                  <span className="font-semibold text-slate-700">{row.share}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-300 to-emerald-400"
                    style={{ width: row.width }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="naiton-surface rounded-[24px] border-white/70">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">Activity</CardTitle>
            <CardDescription>Daily highlights across the suite shell.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activityRows.map((row) => (
              <article
                key={row.title}
                className="rounded-[18px] border border-slate-200/80 bg-white/80 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-800">{row.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{row.value}</p>
                  </div>
                  <ArrowRight className="mt-0.5 h-4 w-4 text-slate-400" />
                </div>
                <p className="mt-3 text-sm text-slate-600">{row.change}</p>
              </article>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
