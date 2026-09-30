import axiosClient from "./axiosClient";

export const loginUser = async (data) => {
  const response = await axiosClient.post("/auth/login", data);
  return response.data?.data || response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosClient.get("/auth/me");
  return response.data?.data || response.data;
};

export const sendRegistrationOtp = async (data) => {
  const response = await axiosClient.post(
    "/auth/otp/register/send",
    data
  );
  return response.data;
};

export const verifyRegistrationOtp = async (data) => {
  const response = await axiosClient.post(
    "/auth/otp/register/verify",
    data
  );
  return response.data;
};

export const sendForgotPasswordOtp = async (data) => {
  const response = await axiosClient.post(
    "/auth/otp/forgot-password/send",
    data
  );
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await axiosClient.post(
    "/auth/otp/forgot-password/reset",
    data
  );
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("colorido_token");
  localStorage.removeItem("colorido_user");
};