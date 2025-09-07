/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";
import axios from "axios";

// 定义后端返回数据的通用结构
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const res = response.data;
    if (res.code !== 200) {
      console.error("API Error:", res.message);
      return Promise.reject(new Error(res.message || "Error"));
    }
    return res.data;
  },
  (error) => {
    console.error("Network Error:", error);
    return Promise.reject(error);
  }
);

// 封装通用请求方法
const request = {
  get: async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return instance.get<any, T>(url, config);
  },

  post: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return instance.post<any, T>(url, data, config);
  },

  put: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return instance.put<any, T>(url, data, config);
  },

  delete: async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return instance.delete<any, T>(url, config);
  },
};

export default request;
