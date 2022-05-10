import { http } from "./http";

export function getInfo(data: any) {
  // 资源列表查询
  return http.request({
    url: "/api/login",
    method: "post",
    data,
  });
}

