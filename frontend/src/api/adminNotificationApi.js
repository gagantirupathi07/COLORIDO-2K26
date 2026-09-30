import axiosClient from "./axiosClient";

export const getAdminNotifications = async () => {
  const response = await axiosClient.get(
    "/notifications"
  );

  return response.data?.data || response.data || [];
};

export const getAdminUnreadNotifications = async () => {
  const response = await axiosClient.get(
    "/notifications/unread"
  );

  return response.data?.data || response.data || [];
};

export const getAdminUnreadNotificationCount = async () => {
  const response = await axiosClient.get(
    "/notifications/unread-count"
  );

  return response.data?.data ?? response.data ?? 0;
};

export const markAdminNotificationRead = async (
  id
) => {
  const response = await axiosClient.patch(
    `/notifications/${id}/read`
  );

  return response.data;
};

export const markAllAdminNotificationsRead =
  async () => {
    const response = await axiosClient.patch(
      "/notifications/read-all"
    );

    return response.data;
  };