import axiosClient from "./axiosClient";

export const getAdminRegistrations =
  async () => {
    const response =
      await axiosClient.get(
        "/registrations/admin/all"
      );

    return (
      response.data?.data ||
      response.data
    );
  };

export const getAdminRegistration =
  async (id) => {
    const response =
      await axiosClient.get(
        `/registrations/admin/${id}`
      );

    return (
      response.data?.data ||
      response.data
    );
  };