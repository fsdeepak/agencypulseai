import api from "@/lib/api";

interface addWebsiteVariables {
  name: string;
  url: string;
}

export const handleAddWebsite = async (data: addWebsiteVariables) => {
  const response = await api.post("/website/add", data);

  return response.data;
};

interface websiteVariable {
  id: string;
  name: string;
  url: string;
  apiKey: string;
}
export const handleGetWebsite = async (): Promise<websiteVariable[]> => {
  const response = await api.get("/website/");

  return response.data.websites;
};

interface updateWebsiteVariable extends addWebsiteVariables {
  id: string;
}

export const handleUpdateWebsite = async (data: updateWebsiteVariable) => {
  const response = await api.patch(`/website/${data.id}`, data);
  return response.data;
};

interface deleteWebsiteVariable {
  id: string;
}
export const handleDeleteWebsite = async (data: deleteWebsiteVariable) => {
  const response = await api.delete(`/website/${data.id}`);
  return response.data;
};
