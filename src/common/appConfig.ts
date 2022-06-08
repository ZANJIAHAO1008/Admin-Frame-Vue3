/**
 * @description 一些应用配置方法
 */
import { ElConfig } from "@/types/layout";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import Cookies from "js-cookie";
import { usePreferredLanguages } from "@vueuse/core";
export function useAppConfig(configStore: any) {
  // 查询本机语言
  const defaultLanguages = usePreferredLanguages();

  // Element全局配置
  const elConfig: Partial<ElConfig> = reactive({
    locale: undefined,
    componentSize: "",
  });

  const switchLanguage = (lang: string) => {
    //切换语言
    if (lang === "en") {
      elConfig.locale = en;
    } else if (lang === "zh") {
      elConfig.locale = zhCn;
    }
    Cookies.set("lang", lang);
  };
  // 监听各配置变化
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
        switchLanguage(nLanguage);
      }
      if (nComponentSize !== oComponentSize) {
        elConfig.componentSize = nComponentSize;
      }
      if (nIsGrayscale !== oIsGrayscale) {
        grayscaleConfig(nIsGrayscale);
      }
    }
  );
  const grayscaleConfig = (status: boolean) => {
    //添加灰色主题
    if (status) {
      document.body.setAttribute("style", "filter:grayscale(100%)");
    } else {
      document.body.setAttribute("style", "filter:grayscale(0)");
    }
  };
  const languageConfig = () => {
    //配置语言
    const defaultLanguage = "zh";
    if (!Cookies.get("lang")) {
      if (configStore.language) {
        Cookies.set("lang", configStore.language);
      } else {
        //如果未设置过 则默认中文 可根据接口返回的个人信息中 增加默认语言
        Cookies.set("lang", defaultLanguages?.value[1] ?? defaultLanguage);
        configStore.$patch({
          language: defaultLanguage,
        });
        switchLanguage(defaultLanguage);
      }
    } else if (Cookies.get("lang")) {
      switchLanguage(Cookies.get("lang") ?? defaultLanguage);
    }
  };
  const componentSizeConfig = () => {
    //配置组件大小
    configStore.$patch({
      componentSize: configStore.componentSize || "default",
    });

    elConfig.componentSize = configStore.componentSize || "default";
  };
  const addDefaultConfig = () => {
    //添加默认配置
    languageConfig();
    componentSizeConfig();
    grayscaleConfig(configStore.isGrayscale);
  };

  return {
    elConfig,
    addDefaultConfig,
  };
}
