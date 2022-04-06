import axiosClient from "./axiosClient";

export const getAllBrand = () => axiosClient.get(`brand/`);

export const postBrand = (value) => axiosClient.post(`brand/`, value);

export const updateBrand = (value) =>
  axiosClient.put(`brand/${value.id}`, value.data);

export const deleteBrand = (id) => axiosClient.delete(`brand/${id}`);
