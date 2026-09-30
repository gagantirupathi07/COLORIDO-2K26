import axiosClient from "./axiosClient";

export const getNotifications = async () => {
  const response = await axiosClient.get("/notifications");
  return response.data;
};

export const getUnreadNotifications = async () => {
  const response = await axiosClient.get(
    "/notifications/unread"
  );

  return response.data;
};

export const getUnreadNotificationCount = async () => {
  const response = await axiosClient.get(
    "/notifications/unread-count"
  );

  return response.data;
};

export const markNotificationAsRead = async (id) => {
  const response = await axiosClient.patch(
    `/notifications/${id}/read`
  );

  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  const response = await axiosClient.patch(
    "/notifications/read-all"
  );

  return response.data;
};