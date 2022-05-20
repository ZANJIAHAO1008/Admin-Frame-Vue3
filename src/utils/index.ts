import { ElLoading } from "element-plus";
import { unref } from "vue";
import config from "../../package.json";
export const debounce = (function () {
  //防重复提交
  let timer = 0;
  return function (callback: Function, ms: number) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

export function Loading() {
  //loading方法
  return ElLoading.service({
    lock: false,
    text: "加载中···",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
}

export function getValues<T extends object, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  //获取value值
  return obj[key];
}

export function toObtainAnalyticalData<T>(target: T): T {
  //多层proxy解析
  return JSON.parse(JSON.stringify(unref(target)));
}

export function getImage(url: string, type: string) {
  //公共的获取图片的方法
  return new URL(`../assets/image/${url}.${type}`, import.meta.url).href;
}

export const printVersion = (name: string, version: string) => {
  console.log(
    `%c ${name} %c V${version} `,
    "padding: 5px 5px; border-radius: 3px 0 0 3px; color: #fff; background: #909399; font-weight: bold;",
    "padding: 5px 5px; border-radius: 0 3px 3px 0; color: #fff; background: #409EFF; font-weight: bold;"
  );
  console.log(config.description);
  console.log("%c希望世界和平." + "\n" + "Peace & Love.", "color: #40a9ff;");
  console.log(`%c项目地址:${config.url}`, "color: red;");
};

printVersion(config.name, config.version);

export const judgeEquipment = (): null | object => {
  //判断设备类型是否为手机
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
};
