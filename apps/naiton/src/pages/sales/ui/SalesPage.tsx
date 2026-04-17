import { Filter, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useMemo } from "react";

import { DataTable } from "@repo/ui-kit/shared/ui/DataTable";
import { Button } from "@repo/ui-kit/shadcn/button";
import { Input } from "@repo/ui-kit/shadcn/input";

type SalesRow = {
  id: string;
  client: string;
  company: string;
  orderDate: string;
  status: string;
  ordered: string;
  stockPrice: string;
  delivered: string;
  invoiced: string;
  paid: string;
  approved: string;
  availability: string;
};

const rows: SalesRow[] = [
  [
    "2025223872",
    "Jan Hendrik Volders",
    "Selecteer Kleur: Caviar 910",
    "23 Sep 2025 07:42",
    "Warehouse",
  ],
  ["2025223872", "Lara Thompson", "Blindingen Maat: L", "24 Sep 2025 08:15", "Warehouse"],
  ["2025223872", "Michael Chen", "Selecteer Kleur: Caviar 910", "25 Sep 2025 09:30", "Warehouse"],
  ["2025223872", "Sarah Johnson", "Kleur: Cascade", "26 Sep 2025 10:45", "Warehouse"],
  ["2025223872", "David Smith", "Blindingen Maat: L", "27 Sep 2025 11:00", "Warehouse"],
  ["2025223872", "Emma Brown", "Praxis Oudensbosch", "28 Sep 2025 12:05", "Active"],
  ["2025223872", "James Wilson", "Praxis Oude Tonge", "29 Sep 2025 13:20", "Active"],
  ["2025223872", "Olivia Garcia", "Hombach Zwolle", "30 Sep 2025 14:35", "Active"],
  ["2025223872", "Liam Martinez", "Hombach Rotterdam", "01 Oct 2025 15:50", "Active"],
  ["2025223872", "Ava Rodriguez", "Hombach Utrecht", "02 Oct 2025 16:05", "Active"],
  ["2025223872", "Noah Lee", "Hombach Amsterdam", "03 Oct 2025 17:10", "Active"],
  ["2025223872", "Sophia Anderson", "Selecteer Kleur: Caviar 910", "04 Oct 2025 18:25", "Active"],
  ["2025223872", "Jackson Thomas", "Hombach The Hague", "05 Oct 2025 19:40", "Active"],
  ["2025223872", "Isabella Taylor", "Hombach Groningen", "06 Oct 2025 20:55", "Active"],
  ["2025223872", "Lucas Moore", "Hombach Eindhoven", "07 Oct 2025 21:10", "Active"],
  ["2025223872", "Mia Jackson", "Hombach Tilburg", "08 Oct 2025 22:25", "Active"],
  ["2025223872", "Ethan White", "Hombach Almere", "09 Oct 2025 23:00", "Active"],
  ["2025223872", "Harper Harris", "Hombach Breda", "10 Oct 2025 23:20", "Active"],
].map(([id, client, company, orderDate, status], index) => ({
  id,
  client,
  company,
  orderDate,
  status,
  ordered: (184.12 + index * 11.4).toFixed(2),
  stockPrice: [87.12, 9.63, 68.81, 2480.08][index % 4]!.toFixed(2),
  delivered: index < 4 ? (184.12 + index * 11.4).toFixed(2) : "0.0",
  invoiced: "0.0",
  paid: "0.0",
  approved: index > 5 && index < 9 ? "warning" : "ok",
  availability: "ok",
}));

export default function SalesPage() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }: { row: { original: SalesRow } }) => (
          <span className="font-semibold text-emerald-500">{row.original.id}</span>
        ),
      },
      { accessorKey: "client", header: "Client" },
      { accessorKey: "company", header: "Company" },
      { accessorKey: "orderDate", header: "Order date" },
      { accessorKey: "status", header: "Status" },
      { accessorKey: "ordered", header: "Ordered" },
      { accessorKey: "stockPrice", header: "Stock price" },
      { accessorKey: "delivered", header: "Delivered" },
      { accessorKey: "invoiced", header: "Invoiced" },
      { accessorKey: "paid", header: "Paid" },
      {
        accessorKey: "approved",
        header: "Approved",
        cell: ({ row }: { row: { original: SalesRow } }) => (
          <span className={row.original.approved === "ok" ? "text-emerald-500" : "text-red-500"}>
            {row.original.approved === "ok" ? "◌" : "⊗"}
          </span>
        ),
      },
      {
        accessorKey: "availability",
        header: "Availability",
        cell: () => <span className="text-emerald-500">◌</span>,
      },
    ],
    [] as const,
  );

  return (
    <section className="space-y-4 p-3 sm:p-5">
      <div className="naiton-surface rounded-[26px] p-3">
        <div className="flex flex-col gap-3 border-b border-slate-200/80 pb-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div>
              <p className="text-sm font-semibold tracking-[0.22em] text-slate-500 uppercase">
                Sales
              </p>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-800">Orders</h1>
            </div>
            <div className="relative hidden w-full max-w-xs xl:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input className="h-10 rounded-xl pl-9" placeholder="Order search" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button className="rounded-xl" size="sm" variant="outline">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <Button className="rounded-xl" size="sm" variant="outline">
              <Filter className="h-4 w-4" />
            </Button>
            <Button className="rounded-xl" size="sm" variant="outline">
              Search
            </Button>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
              Preset <span className="font-semibold text-slate-700">Stand alone</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
              VAT
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
              Rows 200
            </div>
            <Button className="rounded-xl bg-primary px-4">
              <Plus className="h-4 w-4" />
              New order
            </Button>
          </div>
        </div>

        <div className="mt-3 overflow-hidden rounded-[20px] border border-slate-200 bg-white">
          <DataTable
            columns={columns}
            data={rows}
            pageSize={12}
            tableOptions={{
              getRowId: (row) => `${row.id}-${row.client}`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
