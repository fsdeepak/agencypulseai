"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// 1. Create a factory function
function makeQueryClient() {
  return new QueryClient();
}

// 2. Store the client in a module-level variable (outside the React tree)
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client so data isn't shared between users
    return makeQueryClient();
  } else {
    // Browser: make a new query client ONLY if we don't already have one
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Provider({ children }: { children: React.ReactNode }) {
  // 3. Get the singleton client instead of using useState
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
