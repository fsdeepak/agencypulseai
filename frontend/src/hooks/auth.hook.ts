import {
  handleGetMe,
  handleLogin,
  handleLogout,
  handleRegister,
  handleResendVerification,
  handleResetPasswordVerification,
  handeSetPassword,
} from "@/services/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useRegiter = () => {
  return useMutation({
    mutationFn: handleRegister,
    onSuccess: () => {
      toast.success("Welcome, Please verify you email.");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: handleLogin,
    onSuccess: () => {
      toast.success("Welcome back");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Invalid credentital";
      toast.error(message);
    },
  });
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: handleResendVerification,
    onSuccess: () => {
      toast.success("Please check your email.");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Please try again.";
      toast.error(message);
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: handleGetMe,
    retry: false,
    staleTime: 10 * 60 * 1000,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: handleLogout,
    onSuccess: () => {
      toast.success("Logout successfully.");
    },
  });
};

export const useResetPasswordVerification = () => {
  return useMutation({
    mutationFn: handleResetPasswordVerification,
    onSuccess: () => {
      toast.success(
        "If an account exists with that email, a reset link has been sent.",
      );
    },
    onError: (err: any) => {
      const message = err?.response?.data?.message || "Please try again.";
      toast.error(message);
    },
  });
};

export const useSetPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: handeSetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully");
      router.push("/login");
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    },
  });
};
