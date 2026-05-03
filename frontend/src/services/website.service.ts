import api from "@/lib/api";

interface addWebsiteVariables {
  name: string;
  url: string;
}

export const handleAddWebsite = async (data: addWebsiteVariables) => {
  const response = await api.post("/website/add", data);

  return response.data;
};

interface Website {
  id: string;
  name: string;
  url: string;
  apiKey: string;
}
export const handleGetWebsite = async (): Promise<Website[]> => {
  const response = await api.get("/website/");

  return response.data.websites;
};
