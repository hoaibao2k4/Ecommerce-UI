import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and merges Tailwind CSS classes intelligently.
 * @param inputs - List of class values to be combined.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
