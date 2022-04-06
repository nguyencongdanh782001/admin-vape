import axiosClient from "./axiosClient";

export const signIn = (data) => axiosClient.post("auth/login", data);

export const signUp = (data) => axiosClient.post("auth/register", data);
