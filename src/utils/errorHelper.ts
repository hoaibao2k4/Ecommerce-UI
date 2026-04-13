// Determines if an error from RTK Query is critical enough to warrant
// showing a full-page ErrorPage.
// 
// Critical errors include:
// - Network failures (FETCH_ERROR)
// - Server crashes (5xx status codes)
// - Missing resources that the page depends on (404)
export const isCriticalError = (isError: boolean, error: unknown): boolean => {
  if (!isError || !error) return false;

  if (typeof error === "object" && "status" in error) {
    const status = error.status;
    
    // FETCH_ERROR: Connection lost
    if (status === "FETCH_ERROR") return true;
    
    // 5xx: Server errors
    if (typeof status === "number" && status >= 500) return true;

    // 404: Resource not found (usually critical for detail pages)
    if (status === 404) return true;
  }

  // Otherwise, assume it's a non-critical business/validation error
  return false;
};

// Interface representing the structure of our Backend error response
export interface ApiErrorData {
  message?: string;
  status?: number;
  error?: string;
  path?: string;
  timestamp?: string;
}


// Safely extracts a human-readable error message from an RTK Query error object.
export const getErrorMessage = (error: unknown): string => {
  if (!error) return "An unknown error occurred";

  if (typeof error === "object" && error !== null) {
    // 1. Handle RTK Query specific errors
    if ("status" in error) {
      if (error.status === "FETCH_ERROR") {
        return "Connection failed. Please check your internet.";
      }

      // 2. Handle Backend Error Data ({ data: { message: "..." } })
      if ("data" in error && error.data && typeof error.data === "object") {
        const errorData = error.data as ApiErrorData;
        return (
          errorData.message || errorData.error || "A server error occurred"
        );
      }
    }

    // Fallback for other object types instead of [object Object]
    try {
      return JSON.stringify(error);
    } catch {
      return "An unexpected error occurred";
    }
  }

  // Final fallback for non-object types (primitives)
  return typeof error === "string" ? error : "An unknown error occurred";
};
