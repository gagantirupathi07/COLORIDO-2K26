import axios from "axios";

const API_URL = "http://localhost:8080/api";

const eventApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getEvents() {
  const response = await eventApi.get("/events");
  return response.data;
}

export async function getEventBySlug(slug) {
  const response = await eventApi.get(`/events/slug/${slug}`);
  return response.data;
}

export async function getEventsByCategory(category) {
  const response = await eventApi.get(
    `/events/category/${category}`
  );

  return response.data;
}

export default eventApi;