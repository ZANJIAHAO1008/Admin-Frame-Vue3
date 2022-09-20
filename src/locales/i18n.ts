import { createI18n } from "vue-i18n";
import Cookies from "js-cookie";
import en from "./en";
import cn from "./zh-cn";
// $t('message.public.editLang') 页面中使用
const messages = {
  en: {
    message: {
      ...en,
    },
  },
  zh: {
    message: {
      ...cn,
    },
  },
};
export const i18n = createI18n({
  locale: Cookies.get("lang") || "zh",
  legacy:false,
  globalInjection: true,
  fallbackLocale: "zh",
  messages,
});

export function transitionLocal(message: string) {
  //防止刷新 用来转换i18n
  if (!message) {
    //无传参
    return false;
  }
  return i18n.global.t(message);
}

export default i18n;
