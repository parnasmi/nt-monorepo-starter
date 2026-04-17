import { Building2, Sparkles } from "lucide-react";

import { Button } from "@repo/ui-kit/shadcn/button";

export function RegisterPage() {
  return (
    <section className="naiton-panel w-full rounded-[28px] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Building2 className="h-6 w-6" />
      </div>
      <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-800">
        Company onboarding
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Registration screens are intentionally deferred while the PoC focuses on login, routing, and
        persistent shell behavior.
      </p>
      <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 text-sm text-emerald-900">
        <div className="flex items-center gap-2 font-semibold">
          <Sparkles className="h-4 w-4" />
          Planned next
        </div>
        <p className="mt-2">Company onboarding will be introduced in a later phase.</p>
      </div>
      <Button className="mt-6 w-full rounded-xl" disabled>
        Registration stays disabled in this phase
      </Button>
    </section>
  );
}
