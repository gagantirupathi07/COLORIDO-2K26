import axiosClient from "./axiosClient";

export const getAdminEvents = async () => {
  const response = await axiosClient.get("/events");
  return response.data?.data || response.data;
};

export const getAdminEvent = async (id) => {
  const response = await axiosClient.get(`/events/${id}`);
  return response.data?.data || response.data;
};

export const createEvent = async (data) => {
  const response = await axiosClient.post("/events", data);
  return response.data?.data || response.data;
};

export const updateEvent = async (id, data) => {
  const response = await axiosClient.put(`/events/${id}`, data);
  return response.data?.data || response.data;
};

export const deleteEvent = async (id) => {
  const response = await axiosClient.delete(`/events/${id}`);
  return response.data;
};