import { defineStore } from "pinia";
import { ElConfig } from "@/types/layout";
interface State extends Partial<ElConfig> {
  isDark: boolean;
  appConfig: {
    showBreadcrumb: boolean;
    showReFresh: boolean;
    showFoldButton: boolean;
    showI18n: boolean;
    showMessage: boolean;
    showFullScreen: boolean;
    showLogo: boolean;
    showHeader:boolean;
    showTabBar: boolean;
    showSideBar:boolean;
  };
}

export const useConfigStore = defineStore({
  id: "config_974813758", // id必填，且需要唯
  persist: {
    enabled: true, // 开启数据缓存
  },
  state: (): State => {
    return {
      language: undefined, //系统语言
      componentSize: undefined, //组件大小
      isDark: false, //是否是黑夜模式
      appConfig: {
        showBreadcrumb: true, //面包屑是否展示
        showReFresh: false, //刷新按钮是否展示
        showFoldButton: true, //折叠按钮是否展示
        showI18n: true, //国际化是否展示
        showMessage: true, //消息是否展示
        showFullScreen: true, //全屏是否展示
        showLogo: true, //logo是否展示
        showHeader:true, //是否显示顶栏
        showTabBar: true, //标签栏是否展示
        showSideBar:true,//是否显示菜单栏
      },
    };
  },
  actions: {
    handleShowAppConfig<T extends keyof State["appConfig"]>(
      name: T,
      status: boolean
    ) {
      //控制元素显示隐藏
      this.appConfig[name] = status;
    },
  },
});