/**
 * @description 手机访问时添加一些默认配置
 */
import { judgeEquipment } from "@/utils";
export function useMobile(configStore: any, tagStore: any) {
  let isMobile = computed(() => {
    return Boolean(judgeEquipment());
  });

  const addMobileConfig = () => {
    //手机登录添加默认配置
    configStore.$patch({
      componentSize: "small",
      isDark: false,
      KeepAliveMaxLength: 10,
      appConfig: {
        showConfigMenu: false, //配置按钮是否展示
        showBreadcrumb: true, //面包屑是否展示
        showReFresh: false, //刷新按钮是否展示
        showFoldButton: false, //折叠按钮是否展示
        showI18n: false, //国际化是否展示
        showMessage: false, //消息是否展示
        showFullScreen: false, //全屏是否展示
        showLogo: false, //logo是否展示
        showHeader: true, //是否显示顶栏
        showTabBar: false, //标签栏是否展示
        showSideBar: true, //是否显示菜单栏
      },
    });
    tagStore.$patch({
      collapse: true, //关闭菜单栏
    });
  };

  onMounted(() => {
    if (unref(isMobile)) {
      //如果设备是手机则添加默认配置
      addMobileConfig();
    }
  });
  return {
    isMobile: unref(isMobile),
    addMobileConfig,
  };
}
