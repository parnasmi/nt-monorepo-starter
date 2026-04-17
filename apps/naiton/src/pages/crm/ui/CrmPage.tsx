import { Plus, Search } from "lucide-react";
import { useMemo } from "react";

import { DataTable } from "@repo/ui-kit/shared/ui/DataTable";
import { Button } from "@repo/ui-kit/shadcn/button";
import { Input } from "@repo/ui-kit/shadcn/input";

type CompanyRow = {
  id: string;
  company: string;
  type: string;
  status: string;
  relations: string;
  accountManager: string;
  zip: string;
  phone: string;
  email: string;
  tax: string;
  city: string;
  country: string;
  business: string;
};

const cityRows = [
  ["Praxis Dordrecht", "Jan Hendrik Volders", "4538 AN", "Amsterdam"],
  ["Praxis Amsterdam", "Lara Thompson", "2381", "Rotterdam"],
  ["Praxis Groningen", "Michael Chen", "3967 GA", "The Hague"],
  ["Praxis Breda", "Sarah Johnson", "1334 NA", "Utrecht"],
  ["Praxis Nijmegen", "David Smith", "1191 DJ", "Eindhoven"],
  ["Praxis Oudenbosch", "Emma Brown", "3583 CA", "Tilburg"],
  ["Praxis Oude Tonge", "James Wilson", "9722 AA", "Groningen"],
  ["Hombach Zwolle", "Olivia Garcia", "5213 AL", "Almere"],
  ["Hombach Rotterdam", "Liam Martinez", "7547 RT", "Breda"],
  ["Hombach Utrecht", "Ava Rodriguez", "2908 ZJ", "Nijmegen"],
  ["Hombach Amsterdam", "Noah Lee", "6416 NX", "Enschede"],
  ["Selecteer Kleur: Caviar 910", "Sophia Anderson", "8251 ES", "Haarlem"],
  ["Hombach The Hague", "Jackson Thomas", "4873 DK", "Arnhem"],
  ["Hombach Groningen", "Isabella Taylor", "3245 GC", "Zaanstad"],
  ["Hombach Eindhoven", "Lucas Moore", "7681 PE", "Amersfoort"],
  ["Hombach Tilburg", "Mia Jackson", "5961 CS", "Apeldoorn"],
  ["Hombach Almere", "Ethan White", "2235 XW", "Maastricht"],
  ["Hombach Breda", "Harper Harris", "6824 AZ", "Dordrecht"],
].map(([company, accountManager, zip, city], index) => ({
  id: "1856",
  company,
  type: "Client",
  status: index < 14 ? "Active" : "Inactive",
  relations: "1",
  accountManager,
  zip,
  phone: `+310${String(249876543 + index * 13579)}`,
  email: `${accountManager.toLowerCase().replaceAll(" ", ".")}@naiton.local`,
  tax: `NL${String(45762930887 + index * 14321)}`,
  city,
  country: "Netherland",
  business: company,
}));

export default function CrmPage() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }: { row: { original: CompanyRow } }) => (
          <span className="font-semibold text-emerald-500">{row.original.id}</span>
        ),
      },
      { accessorKey: "company", header: "Company" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "status", header: "Status" },
      { accessorKey: "relations", header: "Relations" },
      { accessorKey: "accountManager", header: "Account manager" },
      { accessorKey: "zip", header: "ZIP" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "tax", header: "Tax #" },
      { accessorKey: "city", header: "City" },
      { accessorKey: "country", header: "Country" },
      { accessorKey: "business", header: "Business" },
    ],
    [] as const,
  );

  return (
    <section className="space-y-4 p-3 sm:p-5">
      <div className="naiton-surface rounded-[26px] p-3">
        <div className="flex flex-col gap-3 border-b border-slate-200/80 pb-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.22em] text-slate-500 uppercase">CRM</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-800">Company</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[240px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input className="h-10 rounded-xl pl-9" placeholder="Company search" />
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
              Preset <span className="font-semibold text-slate-700">Default</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
              VAT
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
              Rows 200
            </div>
            <Button className="rounded-xl bg-primary px-4">
              <Plus className="h-4 w-4" />
              New company
            </Button>
          </div>
        </div>

        <div className="mt-3 overflow-hidden rounded-[20px] border border-slate-200 bg-white">
          <DataTable
            columns={columns}
            data={cityRows}
            pageSize={12}
            tableOptions={{
              getRowId: (row) => `${row.id}-${row.company}`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
