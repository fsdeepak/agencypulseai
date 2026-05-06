import {
  handleAddWebsite,
  handleDeleteWebsite,
  handleGetWebsite,
  handleUpdateWebsite,
} from "@/services/website.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useAddWebsite = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: handleAddWebsite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["website"] });
      toast.success("Website added successfully.");
      router.replace("/dashboard");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Adding Website failed";
      console.log(error);
      toast.error(message);
    },
  });
};

export const useGetWebsite = () => {
  return useQuery({
    queryKey: ["website"],
    queryFn: handleGetWebsite,
    retry: false,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

export const useUpdateWebsite = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: handleUpdateWebsite,
    onSuccess: () => {
      toast.success("Website update successfully.");
      router.refresh();
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Updating website failed";
      toast.error(message);
    },
  });
};

export const useDeleteWebsite = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: handleDeleteWebsite,
    onSuccess: () => {
      toast.success("Website deleted successfully.");
      router.replace("/dashboard");
      queryClient.invalidateQueries({ queryKey: ["website"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Deleting website failed.";
      toast.error(message);
    },
  });
};
