import axiosClient from "./axiosClient";

export const getAllCategory = () => axiosClient.get(`category/`);

export const postCategory = (value) => axiosClient.post(`category/`, value);

export const updateCategory = (value) =>
  axiosClient.put(`category/${value.id}`, value.data);

export const deleteCategory = (id) => axiosClient.delete(`category/${id}`);
