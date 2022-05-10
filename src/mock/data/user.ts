import { Random } from "mockjs";
import { Message } from "@/types/http";
export default [
  {
    url: "/api/login",
    method: "post",
    statusCode: 200,
    response: (): Message<string> => {
      return {
        code: 200,
        message: "登录成功",
        data: "LnN2QDE2NDE0NzcxO2NuLjo4ZloxV0VCbWF6MSt4ZWlBcEpWWUJocUozak1OYU1rRFhRNkxUZVRZdFJBPQ",
        serverTime: new Date(),
      };
    },
  },
  {
    url: "/api/getUserInfo",
    method: "get",
    statusCode: 200,
    response: (): Message<object> => {
      return {
        code: 200,
        message: "请求成功",
        data: {
          staffName: Random.cname(),
          username: "admin",
          sex: "0",
          phone: "18866884562",
          birthDate: Random.date("yyyy-MM-dd"),
          address: Random.county(true),
          marks: Random.paragraph(),
          userState: "",
          jurisdiction: "",
          image: "",
        },
        serverTime: new Date(),
      };
    },
  },
];
