import axiosClient from "./axiosClient";

export const getAdminDashboardStats = async () => {
  const response = await axiosClient.get(
    "/admin/dashboard/stats"
  );

  return response.data?.data ||
    response.data;
};