import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useCreateMutation } from "@/shared/api/api-helper-hooks/useCreateMutation";
import { useFetchQueries } from "@/shared/api/api-helper-hooks/useFetchQueries";
import { endpoints } from "@/shared/const/endpoints.const";
import { useToastNotif } from "@/shared/hooks/useToastNotif/useToastNotif";
import type {
  CreateCrmLeadRequest,
  CrmLead,
  GetRequestResponse,
  PostRequestResponse,
} from "@/shared/types/requests.types";
import { Badge } from "@repo/ui-kit/shadcn/badge";
import { Button } from "@repo/ui-kit/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui-kit/shadcn/dialog";
import { Input } from "@repo/ui-kit/shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui-kit/shadcn/select";
import { DataTable } from "@repo/ui-kit/shared/ui/DataTable";
import { cn } from "@repo/ui-kit/lib/utils";

const leadStages = ["new", "qualified", "proposal"] as const;
const leadSources = ["website", "referral", "campaign"] as const;

const createLeadSchema = z.object({
  name: z.string().min(2, "Lead name is required"),
  company: z.string().min(2, "Company name is required"),
  stage: z.enum(leadStages),
  source: z.enum(leadSources),
});

type CreateLeadFormValues = z.infer<typeof createLeadSchema>;
type CrmLeadsResponse = GetRequestResponse<CrmLead[]>;

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const stageClassNames: Record<CrmLead["stage"], string> = {
  new: "border-amber-200 bg-amber-50 text-amber-700",
  qualified: "border-sky-200 bg-sky-50 text-sky-700",
  proposal: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

function StageBadge({ stage }: { stage: CrmLead["stage"] }) {
  return (
    <Badge
      className={cn(
        "rounded-full border px-2.5 py-1 font-medium capitalize",
        stageClassNames[stage],
      )}
    >
      {stage}
    </Badge>
  );
}

export default function CrmPage() {
  const [searchValue, setSearchValue] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const deferredSearch = useDeferredValue(searchValue);
  const queryClient = useQueryClient();
  const { showToast } = useToastNotif();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<CreateLeadFormValues>({
    resolver: zodResolver(createLeadSchema),
    defaultValues: {
      name: "",
      company: "",
      stage: "new",
      source: "website",
    },
  });

  const leadsQuery = useFetchQueries<CrmLeadsResponse>({
    url: endpoints.CRM_LEADS,
    params: { per_page: 50 },
    keepPrevious: true,
    refetchOnWindowFocus: false,
  });

  const createLeadMutation = useCreateMutation<CreateCrmLeadRequest, PostRequestResponse<CrmLead>>({
    url: endpoints.CRM_LEADS,
    onSuccess: (response) => {
      void queryClient.invalidateQueries({
        predicate: (query) =>
          typeof query.queryKey[0] === "string" &&
          query.queryKey[0].startsWith(endpoints.CRM_LEADS),
      });
      showToast({
        message: typeof response.message === "string" ? response.message : "CRM lead created",
        type: "success",
      });
      reset({
        name: "",
        company: "",
        stage: "new",
        source: "website",
      });
      setIsCreateDialogOpen(false);
    },
    isAutoErrNotifEnabled: true,
  });

  const filteredLeads = useMemo(() => {
    const leads = leadsQuery.data?.data ?? [];
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    if (!normalizedSearch) {
      return leads;
    }

    return leads.filter((lead) =>
      [lead.id, lead.name, lead.company, lead.stage, lead.source].some((value) =>
        value.toLowerCase().includes(normalizedSearch),
      ),
    );
  }, [deferredSearch, leadsQuery.data?.data]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }: { row: { original: CrmLead } }) => (
          <span className="font-semibold text-emerald-600">{row.original.id}</span>
        ),
      },
      {
        accessorKey: "name",
        header: "Lead",
      },
      {
        accessorKey: "company",
        header: "Company",
      },
      {
        accessorKey: "stage",
        header: "Stage",
        cell: ({ row }: { row: { original: CrmLead } }) => (
          <StageBadge stage={row.original.stage} />
        ),
      },
      {
        accessorKey: "source",
        header: "Source",
        cell: ({ row }: { row: { original: CrmLead } }) => (
          <span className="capitalize">{row.original.source}</span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created at",
        cell: ({ row }: { row: { original: CrmLead } }) =>
          dateFormatter.format(new Date(row.original.createdAt)),
      },
    ],
    [],
  );

  const totalLeads = leadsQuery.data?.meta?.total ?? filteredLeads.length;
  const isSubmitting = createLeadMutation.isPending || isFormSubmitting;

  return (
    <section className="space-y-4 p-3 sm:p-5">
      <div className="naiton-surface rounded-[26px] p-3">
        <div className="flex flex-col gap-3 border-b border-slate-200/80 pb-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">CRM</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-800">Leads</h1>
            <p className="mt-1 text-sm text-slate-500">
              {totalLeads} mock leads ready for filtering and pagination.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[240px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                className="h-10 rounded-xl border-slate-200 pl-9"
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search leads"
                value={searchValue}
              />
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
              Rows <span className="font-semibold text-slate-700">{filteredLeads.length}</span>
            </div>
            <Button
              className="rounded-xl bg-primary px-4"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              New lead
            </Button>
          </div>
        </div>

        <div className="mt-3 overflow-hidden rounded-[20px] border border-slate-200 bg-white">
          {leadsQuery.isLoading ? (
            <div className="flex h-72 items-center justify-center text-sm text-slate-500">
              Loading CRM leads...
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredLeads}
              pageSize={10}
              tableOptions={{
                getRowId: (row) => row.id,
              }}
            />
          )}
        </div>
      </div>

      <Dialog
        open={isCreateDialogOpen}
        onOpenChange={(open) => {
          setIsCreateDialogOpen(open);
          if (!open) {
            reset({
              name: "",
              company: "",
              stage: "new",
              source: "website",
            });
          }
        }}
      >
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle>Create CRM lead</DialogTitle>
            <DialogDescription>
              This uses the same RHF + Zod + mock API pattern as Sales so both modules behave
              consistently.
            </DialogDescription>
          </DialogHeader>

          <form
            className="space-y-4"
            onSubmit={handleSubmit(async (values) => {
              await createLeadMutation.mutateAsync(values);
            })}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="crm-lead-name">
                  Lead
                </label>
                <Input id="crm-lead-name" placeholder="Sarah Johnson" {...register("name")} />
                {errors.name ? (
                  <p className="text-sm font-medium text-destructive">{errors.name.message}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="crm-lead-company">
                  Company
                </label>
                <Input
                  id="crm-lead-company"
                  placeholder="Praxis Amsterdam"
                  {...register("company")}
                />
                {errors.company ? (
                  <p className="text-sm font-medium text-destructive">{errors.company.message}</p>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Stage</label>
                <Controller
                  control={control}
                  name="stage"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {leadStages.map((stage) => (
                          <SelectItem key={stage} value={stage}>
                            {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.stage ? (
                  <p className="text-sm font-medium text-destructive">{errors.stage.message}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Source</label>
                <Controller
                  control={control}
                  name="source"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        {leadSources.map((source) => (
                          <SelectItem key={source} value={source}>
                            {source}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.source ? (
                  <p className="text-sm font-medium text-destructive">{errors.source.message}</p>
                ) : null}
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Saving..." : "Create lead"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
