import axiosClient from "./axiosClient";

export const getAllBanner = () => axiosClient.get(`banner/`);

export const postBanner = (value) => axiosClient.post(`banner/`, value);

export const updateBanner = (value) =>
  axiosClient.put(`banner/${value.id}`, value.data);

export const deleteBanner = (id) => axiosClient.delete(`banner/${id}`);
