import * as _public from "@/utils";
import moment from "moment"; //日期时间格式化
import filters from "@/filters";
export default function load(app: any) {
  app.config.globalProperties._public = _public; //公共方法
  app.config.globalProperties.$filters = filters; //公共过滤器
  app.config.globalProperties.$moment = moment; //日期时间过滤器
}
