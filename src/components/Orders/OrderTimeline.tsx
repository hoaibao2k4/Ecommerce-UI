import type { OrderStatus } from "@/types";
import { getTimelineSteps, isStepCompleted } from "@/utils/orderUtils";

interface OrderTimelineProps {
  status: OrderStatus;
}

export default function OrderTimeline({ status }: Readonly<OrderTimelineProps>) {
  const normalizedStatus = status.toUpperCase() as OrderStatus;
  const isCancelled = normalizedStatus === "CANCELLED";
  const steps = getTimelineSteps(isCancelled);

  return (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
      <h3 className="text-[10px] uppercase font-black text-slate-400 mb-6 tracking-widest text-center">
        Order Progress
      </h3>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative">
        <div className="hidden sm:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

        {steps.map((step, idx) => {
          const isCompleted = isStepCompleted(step, normalizedStatus, isCancelled);

          const isCurrent = normalizedStatus === step;
          const isCancelledStep = step === "CANCELLED";

          return (
            <div
              key={step}
              className="relative z-10 flex flex-row sm:flex-col items-center gap-3 sm:gap-2 flex-1 w-full sm:w-auto"
            >
              <div
                className={`w-8 h-8 rounded-full border-4 flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                  isCompleted
                    ? isCancelledStep
                      ? "bg-red-500 border-red-200 text-white"
                      : "bg-primary border-primary/20 text-white"
                    : "bg-white border-slate-200 text-slate-300"
                } ${
                  isCurrent
                    ? isCancelledStep
                      ? "ring-4 ring-red-200 scale-110"
                      : "ring-4 ring-primary/20 scale-110"
                    : ""
                }`}
              >
                {isCompleted ? (isCancelledStep ? "✕" : "✓") : idx + 1}
              </div>
              <span
                className={`text-[10px] font-black uppercase tracking-tighter sm:tracking-widest ${
                  isCurrent
                    ? isCancelledStep
                      ? "text-red-500"
                      : "text-primary"
                    : isCompleted
                      ? "text-slate-600"
                      : "text-slate-300"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
