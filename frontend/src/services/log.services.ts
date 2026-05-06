import api from "@/lib/api";

export const handleGetLogs = async (id: string, page: number) => {
  const response = await api.get(`/logs/${id}?page=${page}`);
  return response.data;
};

export const handleGetAlerts = async (id: string, page: number) => {
  const response = await api.get(`/alerts/${id}?page=${page}`);
  return response.data;
};
