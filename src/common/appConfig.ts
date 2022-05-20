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
    () => configStore.language,
    (newValue, oldValue) => {
      //实时监听国际化切换替换element自带国际化
      newValue === "en" ? (elConfig.locale = en) : (elConfig.locale = zhCn);
    }
  );

  watch(
    () => configStore.componentSize,
    (newValue, oldValue) => {
      //实时监听国际化切换替换element自带国际化
      elConfig.componentSize = newValue;
    }
  );

  watch(
    () => configStore.isGrayscale,
    (newValue, oldValue) => {
      //实时监听灰色模式
      settingGrayscale(newValue);
    }
  );

  const settingGrayscale = (type: boolean) => {
    //添加灰色主题
    if (type) {
      document.body.setAttribute("style", "filter:grayscale(100%)");
    } else {
      document.body.setAttribute("style", "filter:grayscale(0)");
    }
  };

  const addDefaultSetting = () => {
    //添加一些默认配置
    if (!Cookies.get("lang")) {
      //如果未设置过 则默认中文 可根据接口返回的个人信息中 增加默认语言
      Cookies.set("lang", defaultLanguages?.value[1] ?? "zh");
      configStore.$patch({
        language: "zh",
      });
    }

    if (!configStore.componentSize) {
      //默认添加size大小
      configStore.$patch({
        componentSize: "",
      });
    }
  };

  onMounted(() => {
    addDefaultSetting();
    settingGrayscale(configStore.isGrayscale);
  });

  return {
    elConfig,
    addDefaultSetting,
  };
}
