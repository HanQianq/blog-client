import request from "@/services/request";

export const loginApi = (data: { username: string; password: string }) =>
  request.post<{ token: string }>("/user/login", data);

export const getUserInfoApi = () =>
  request.post<{ id: string; name: string; avatar: string }>("/user/info", {});
