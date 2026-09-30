import axiosClient from "./axiosClient";

export const getAdminContacts = async () => {
  const response = await axiosClient.get("/contact");

  return response.data?.data || response.data || [];
};

export const getAdminContact = async (id) => {
  const response = await axiosClient.get(
    `/contact/${id}`
  );

  return response.data?.data || response.data;
};

export const updateContactStatus = async (
  id,
  status
) => {
  const response = await axiosClient.patch(
    `/contact/${id}/status`,
    null,
    {
      params: {
        status
      }
    }
  );

  return response.data?.data || response.data;
};

export const deleteContact = async (id) => {
  const response = await axiosClient.delete(
    `/contact/${id}`
  );

  return response.data;
};