import axiosClient from "./axiosClient";

export const registerForEvent = async (data) => {
  const response = await axiosClient.post(
    "/registrations",
    data
  );

  return response.data;
};

export const getMyRegistrations = async () => {
  const response = await axiosClient.get(
    "/registrations/my"
  );

  return response.data?.data || response.data;
};

export const getMyRegistration = async (id) => {
  const response = await axiosClient.get(
    `/registrations/my/${id}`
  );

  return response.data?.data || response.data;
};

export const cancelMyRegistration = async (id) => {
  const response = await axiosClient.delete(
    `/registrations/my/${id}`
  );

  return response.data;
};