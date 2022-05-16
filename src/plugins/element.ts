import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import i18n from "@/locales/i18n";
import Cookies from "js-cookie";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
export default function load(app: any) {
  app.use(ElementPlus
  );
}
