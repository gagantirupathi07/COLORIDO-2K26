import axiosClient from "./axiosClient";

export const getEvents = async () => {
  const response = await axiosClient.get("/events");
  return response.data?.data || response.data;
};

export const getEventById = async (id) => {
  const response = await axiosClient.get(`/events/${id}`);
  return response.data?.data || response.data;
};

export const getEventBySlug = async (slug) => {
  const response = await axiosClient.get(`/events/slug/${slug}`);
  return response.data?.data || response.data;
};

export const getEventsByCategory = async (category) => {
  const response = await axiosClient.get(
    `/events/category/${category}`
  );

  return response.data?.data || response.data;
};

export const getEventsByCategoryAndGender = async (
  category,
  gender
) => {
  const response = await axiosClient.get(
    `/events/category/${category}/gender/${gender}`
  );

  return response.data?.data || response.data;
};