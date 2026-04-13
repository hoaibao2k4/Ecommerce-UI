import React from "react";

type Route = {
  id: number;
  path: string;
  adminOnly?: boolean;
  component: React.ComponentType<Record<string, never>>;
  layout: React.ComponentType<{ children?: React.ReactNode }> | null;
};

export type { Route };
