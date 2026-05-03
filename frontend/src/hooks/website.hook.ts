import { handleAddWebsite, handleGetWebsite } from "@/services/website.service";
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
