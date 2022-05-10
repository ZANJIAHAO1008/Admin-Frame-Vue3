import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken, removeToken } from "@/utils/auth";
class Request {
  // axios 实例
  instance: AxiosInstance | undefined;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(
      (req: AxiosRequestConfig) => {
        //全局请求拦截器
        if (getToken()) {
          req.headers.token = getToken();
        }
        return req;
      },
      (err: any) => err
    );
    this.instance.interceptors.response.use(
      //全局响应拦截器
      (res: AxiosResponse) => {
        return res.data;
      },
      (err: any) => err
    );
  }

  request(config: AxiosRequestConfig) {
    if (!this.instance) {
      return;
    }
    return this.instance.request(config);
  }
}

export default Request;
