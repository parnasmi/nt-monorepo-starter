import { ArrowRight, LockKeyhole, Mail } from "lucide-react";

import { Button } from "@repo/ui-kit/shadcn/button";
import { Input } from "@repo/ui-kit/shadcn/input";

export function AuthLoginPage() {
  return (
    <section className="naiton-panel w-full rounded-[28px] p-5 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
      <div className="mb-6">
        <p className="text-3xl font-semibold tracking-tight text-slate-800">Welcome to Naiton</p>
        <p className="mt-2 text-sm text-slate-500">
          Phase 8 establishes the shell and layout. The interactive login flow arrives in Phase 9.
        </p>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input className="h-11 rounded-xl pl-9" placeholder="Email" type="email" />
        </div>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input className="h-11 rounded-xl pl-9" placeholder="Password" type="password" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-slate-400">Secure enterprise workspace</span>
        <button className="font-medium text-primary" type="button">
          Reset password
        </button>
      </div>

      <Button className="mt-5 h-11 w-full rounded-xl" disabled>
        Login flow lands in Phase 9
        <ArrowRight className="h-4 w-4" />
      </Button>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        By signing in, you agree to the Terms and Conditions and Privacy Policy.
      </p>
    </section>
  );
}
