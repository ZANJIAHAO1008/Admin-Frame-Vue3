/**
 * @description 一些应用配置方法
 */
import { ElConfig } from "@/types/layout";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import Cookies from "js-cookie";
import { usePreferredLanguages } from "@vueuse/core";
export function useAppConfig(configStore: any) {
  const defaultLanguages = usePreferredLanguages();
  const elConfig: Partial<ElConfig> = reactive({
    locale: undefined,
    componentSize: "",
  });

  watch(
    () => [
      configStore.language,
      configStore.componentSize,
      configStore.isGrayscale,
    ],
    (
      [nLanguage, nComponentSize, nIsGrayscale],
      [oLanguage, oComponentSize, oIsGrayscale]
    ) => {
      if (nLanguage !== oLanguage) {
        settingElLanguage(nLanguage);
      }

      if (nComponentSize !== oComponentSize) {
        elConfig.componentSize = nComponentSize;
      }
      if (nIsGrayscale !== oIsGrayscale) {
        settingGrayscale(nIsGrayscale);
      }
    }
  );

  const settingGrayscale = (status: boolean) => {
    //添加灰色主题
    if (status) {
      document.body.setAttribute("style", "filter:grayscale(100%)");
    } else {
      document.body.setAttribute("style", "filter:grayscale(0)");
    }
  };

  const settingElLanguage = (lang: string) => {
    //切换Element语言
    if (lang === "en") {
      elConfig.locale = en;
    } else if (lang === "zh") {
      elConfig.locale = zhCn;
    }
    Cookies.set("lang", lang);
  };

  const settingDefaultConfig = () => {
    //添加默认配置

    if (!Cookies.get("lang")) {
      if (configStore.language) {
        Cookies.set("lang", configStore.language);
      } else {
        const defaultLang = "zh";
        //如果未设置过 则默认中文 可根据接口返回的个人信息中 增加默认语言
        Cookies.set("lang", defaultLanguages?.value[1] ?? defaultLang);
        configStore.$patch({
          language: defaultLang,
        });
        settingElLanguage(defaultLang);
      }
    }

    if (!configStore.componentSize) {
      //默认添加size大小
      configStore.$patch({
        componentSize: "",
      });
    }
  };

  onMounted(() => {
    settingDefaultConfig();
    settingGrayscale(configStore.isGrayscale);
  });

  return {
    elConfig,
  };
}
