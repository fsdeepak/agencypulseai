import { handleGetAlerts, handleGetLogs } from "@/services/log.services";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetLogs = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["logs", id],
    queryFn: ({ pageParam = 1 }) => handleGetLogs(id, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? undefined;
    },

    refetchInterval: 20000,
    refetchIntervalInBackground: false,
  });
};

export const useGetAlerts = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["alerts", id],
    queryFn: ({ pageParam = 1 }) => handleGetAlerts(id, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? undefined;
    },

    refetchInterval: 20000,
    refetchIntervalInBackground: false,
  });
};
