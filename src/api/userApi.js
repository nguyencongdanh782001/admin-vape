import axiosClient from "./axiosClient";

export const getUser = () => axiosClient.get("user/");

export const getAllUser = (value) => axiosClient.get(`user/all/?new=${value}`);

export const getUserStats = () => axiosClient.get(`user/stats`);

export const getUserDetail = (id) => axiosClient.get(`user/find/${id}`);

export const updateUser = (data) =>
  axiosClient.put(`user/${data.id}`, data.value);

export const deleteUser = (id) => axiosClient.delete(`user/${id}`);
