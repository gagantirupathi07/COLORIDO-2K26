import axiosClient from "./axiosClient";

export const sendContactMessage = async (data) => {
  const response = await axiosClient.post("/contact", data);

  return response.data;
};