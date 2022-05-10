import { ElMessage } from "element-plus";
import { getToken, removeToken } from "../utils/auth";
import { transitionLocal } from "@/locales/i18n"; //国际化
import NProgress from "nprogress"; //加载进度条
import "nprogress/nprogress.css";
import {
  RouteLocationNormalized,
  NavigationGuardNext,
  Router,
} from "vue-router";
import { useTitle, useOnline } from "@vueuse/core";

// 进度条配置项
handleProgress("init");

export const online = useOnline(); //网络状态

export const WHITE_LIST: string[] = [
  "/login",
  "/global/abnormal/404",
  "/global/abnormal/networkError",
]; //白名单列表

export const CLEAR_TOKEN_LIST: string[] = ["/login"]; //指定清空token的页面

export const siteName = "Admin Frame"; //网站名称

export function useMiddleware(router: Router) {
  //路由中间件
  // 路由跳转后钩子函数前
  router.beforeEach(async (to, from, next) => {
    await addSiteTitle(to.meta.title as string); //添加标题
    await handleProgress("start"); //添加进度条
    await routerIntercept(
      to as RouteLocationNormalized,
      next as NavigationGuardNext
    ); //路由判断操作
  })

  // 路由跳转后钩子函数中
  router.afterEach(async () => {
    await handleProgress("stop"); //停止进度条
  })
}

export function addSiteTitle(name: string) {
  //添加网站标题
  const title = useTitle();
  title.value = `${siteName} | ${transitionLocal("message." + name)}`;
}

export function handleProgress(action: string) {
  //进度条操作
  if (action === "start") {
    NProgress.start();
  } else if (action === "stop") {
    NProgress.done();
  } else if (action === "init") {
    NProgress.configure({
      showSpinner: false,
    });
  }
}

export function routerIntercept(
  to: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  //路由判断操作
  const url: string = to.path;

  clearTokenAction(url); //指定清空token的页面

  if (!to.matched.length) {
    //如果该路由不存在
    next("/global/abnormal/404");
  }

  if (WHITE_LIST.includes(url)) {
    //如果是白名单则直接进入
    if (url === "/login") {
      removeToken();
    }
    next();
  } else if (getToken()) {
    //token存在直接进入
    if (!online.value && url !== "/global/abnormal/networkError") {
      //监听网络 如果无网络直接进入networkError
      next("/global/abnormal/networkError");
    } else {
      next();
    }
  } else {
    //否则返回登录页
    ElMessage.error("无登陆凭证,无法访问,请先登陆!");
    next("/login");
  }
}

export function clearTokenAction(url: string) {
  //指定清空token的页面
  if (CLEAR_TOKEN_LIST.includes(url)) {
    removeToken();
  }
}
