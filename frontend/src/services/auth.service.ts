import api from "../lib/api";

interface RegisterVariables {
  name: string;
  email: string;
  password: string;
}

export const handleRegister = async (data: RegisterVariables) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

interface loginVariable {
  email: string;
  password: string;
}
export const handleLogin = async (data: loginVariable) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

interface resendVerificationVariable {
  email: string;
}
export const handleResendVerification = async (
  data: resendVerificationVariable,
) => {
  const response = await api.post("/auth/resend-verifcation-email", data);

  return response.data;
};

export const handleGetMe = async () => {
  const { data } = await api.get("/auth/me");

  return data;
};

export const handleLogout = async () => {
  return api.post("/auth/logout");
};

interface resetPasswordVariable {
  email: string;
}
export const handleResetPasswordVerification = async (
  data: resetPasswordVariable,
) => {
  const response = await api.post("/auth/request-password-reset", data);
  return response.data;
};

interface setPasswordVariable {
  password: string;
  token: string;
}

export const handeSetPassword = async (data: setPasswordVariable) => {
  const response = await api.post("/auth/reset-password", data);

  return response.data;
};
