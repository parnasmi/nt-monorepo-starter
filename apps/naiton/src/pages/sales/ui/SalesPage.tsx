import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Filter, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useCreateMutation } from "@/shared/api/api-helper-hooks/useCreateMutation";
import { useFetchQueries } from "@/shared/api/api-helper-hooks/useFetchQueries";
import { endpoints } from "@/shared/const/endpoints.const";
import { useToastNotif } from "@/shared/hooks/useToastNotif/useToastNotif";
import type {
  CreateSalesOrderRequest,
  GetRequestResponse,
  PostRequestResponse,
  SalesOrder,
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

const salesStatuses = ["draft", "confirmed", "fulfilled"] as const;

const createOrderSchema = z.object({
  customer: z.string().min(2, "Customer name is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  status: z.enum(salesStatuses),
});

type CreateOrderFormValues = z.infer<typeof createOrderSchema>;
type SalesOrdersResponse = GetRequestResponse<SalesOrder[]>;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const statusClassNames: Record<SalesOrder["status"], string> = {
  draft: "border-slate-200 bg-slate-100 text-slate-600",
  confirmed: "border-sky-200 bg-sky-50 text-sky-700",
  fulfilled: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

function SalesStatusBadge({ status }: { status: SalesOrder["status"] }) {
  return (
    <Badge
      className={cn(
        "rounded-full border px-2.5 py-1 font-medium capitalize",
        statusClassNames[status],
      )}
    >
      {status}
    </Badge>
  );
}

export default function SalesPage() {
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
  } = useForm<CreateOrderFormValues>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      customer: "",
      amount: 125000,
      status: "draft",
    },
  });

  const ordersQuery = useFetchQueries<SalesOrdersResponse>({
    url: endpoints.SALES_ORDERS,
    params: { per_page: 50 },
    keepPrevious: true,
    refetchOnWindowFocus: false,
  });

  const createOrderMutation = useCreateMutation<
    CreateSalesOrderRequest,
    PostRequestResponse<SalesOrder>
  >({
    url: endpoints.SALES_ORDERS,
    onSuccess: (response) => {
      void queryClient.invalidateQueries({
        predicate: (query) =>
          typeof query.queryKey[0] === "string" &&
          query.queryKey[0].startsWith(endpoints.SALES_ORDERS),
      });
      showToast({
        message: typeof response.message === "string" ? response.message : "Sales order created",
        type: "success",
      });
      reset({
        customer: "",
        amount: 125000,
        status: "draft",
      });
      setIsCreateDialogOpen(false);
    },
    isAutoErrNotifEnabled: true,
  });

  const filteredOrders = useMemo(() => {
    const orders = ordersQuery.data?.data ?? [];
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    if (!normalizedSearch) {
      return orders;
    }

    return orders.filter((order) =>
      [order.id, order.customer, order.status].some((value) =>
        value.toLowerCase().includes(normalizedSearch),
      ),
    );
  }, [deferredSearch, ordersQuery.data?.data]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }: { row: { original: SalesOrder } }) => (
          <span className="font-semibold text-emerald-600">{row.original.id}</span>
        ),
      },
      {
        accessorKey: "customer",
        header: "Customer",
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }: { row: { original: SalesOrder } }) =>
          currencyFormatter.format(row.original.amount),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: { original: SalesOrder } }) => (
          <SalesStatusBadge status={row.original.status} />
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created at",
        cell: ({ row }: { row: { original: SalesOrder } }) =>
          dateFormatter.format(new Date(row.original.createdAt)),
      },
    ],
    [],
  );

  const totalOrders = ordersQuery.data?.meta?.total ?? filteredOrders.length;
  const isSubmitting = createOrderMutation.isPending || isFormSubmitting;

  return (
    <section className="space-y-4 p-3 sm:p-5">
      <div className="naiton-surface rounded-[26px] p-3">
        <div className="flex flex-col gap-3 border-b border-slate-200/80 pb-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                Sales
              </p>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-800">Orders</h1>
              <p className="mt-1 text-sm text-slate-500">
                {totalOrders} mock orders loaded for client-side pagination.
              </p>
            </div>
            <div className="relative hidden w-full max-w-xs xl:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                className="h-10 rounded-xl border-slate-200 pl-9"
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search orders"
                value={searchValue}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button className="rounded-xl" size="sm" variant="outline">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <Button className="rounded-xl" size="sm" variant="outline">
              <Filter className="h-4 w-4" />
            </Button>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
              Rows <span className="font-semibold text-slate-700">{filteredOrders.length}</span>
            </div>
            <Button
              className="rounded-xl bg-primary px-4"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              New order
            </Button>
          </div>
        </div>

        <div className="mt-3 overflow-hidden rounded-[20px] border border-slate-200 bg-white">
          {ordersQuery.isLoading ? (
            <div className="flex h-72 items-center justify-center text-sm text-slate-500">
              Loading sales orders...
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredOrders}
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
              customer: "",
              amount: 125000,
              status: "draft",
            });
          }
        }}
      >
        <DialogContent className="sm:max-w-[540px]">
          <DialogHeader>
            <DialogTitle>Create sales order</DialogTitle>
            <DialogDescription>
              This posts to the MSW-backed sales endpoint and refreshes the lazy-loaded orders
              table.
            </DialogDescription>
          </DialogHeader>

          <form
            className="space-y-4"
            onSubmit={handleSubmit(async (values) => {
              await createOrderMutation.mutateAsync(values);
            })}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="sales-order-customer">
                Customer
              </label>
              <Input
                id="sales-order-customer"
                placeholder="Praxis Amsterdam"
                {...register("customer")}
              />
              {errors.customer ? (
                <p className="text-sm font-medium text-destructive">{errors.customer.message}</p>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="sales-order-amount">
                  Amount
                </label>
                <Input
                  id="sales-order-amount"
                  min="0"
                  step="1000"
                  type="number"
                  {...register("amount", { valueAsNumber: true })}
                />
                {errors.amount ? (
                  <p className="text-sm font-medium text-destructive">{errors.amount.message}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Status</label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {salesStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status ? (
                  <p className="text-sm font-medium text-destructive">{errors.status.message}</p>
                ) : null}
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Saving..." : "Create order"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
