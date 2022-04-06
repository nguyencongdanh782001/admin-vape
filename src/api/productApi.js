import axiosClient from "./axiosClient";

export const fetchProduct = () => axiosClient.get(`product/allproduct`);

export const fetchProductDetail = (id) => axiosClient.get(`product/find/${id}`);

export const deleteProduct = (id) => axiosClient.delete(`product/${id}`);

export const updateProduct = (value) =>
  axiosClient.put(`product/${value.id}`, value.data);

export const postProduct = (value) => axiosClient.post(`product/`, value);
