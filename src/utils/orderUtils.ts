import type { OrderStatus } from "@/types";

export const STANDARD_STEPS: OrderStatus[] = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED"];

export const isStepCompleted = (
  step: OrderStatus,
  currentStatus: OrderStatus,
  isCancelled: boolean
): boolean => {
  if (isCancelled) {
    return (
      step === "CANCELLED" ||
      STANDARD_STEPS.indexOf(step) < STANDARD_STEPS.indexOf(currentStatus)
    );
  }
  return STANDARD_STEPS.indexOf(currentStatus) >= STANDARD_STEPS.indexOf(step);
};

export const getTimelineSteps = (isCancelled: boolean): OrderStatus[] => {
  return isCancelled
    ? ([...STANDARD_STEPS.slice(0, 2), "CANCELLED"] as OrderStatus[])
    : STANDARD_STEPS;
};
