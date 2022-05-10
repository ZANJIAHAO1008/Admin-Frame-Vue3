import Request from "./request";
import * as qs from "qs";
export const http = new Request({
  baseURL: import.meta.env.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  transformRequest: [
    function (data, headers) {
      // 对 data 进行任意转换处理
      return qs.stringify(data);
    },
  ],
});
