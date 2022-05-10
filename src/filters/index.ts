export default {
  Gender(val: any) {
    //性别过滤 0女 1男 没有则未知
    const dataWare: string[] = ["女", "男"];
    return dataWare[Number(val)] ?? "未知";
  },
  inspectLanguage<T extends string>(val: T) {
    //过滤国际化中文
    switch (val) {
      case "zh":
        return "中文";
      case "zh-cn":
        return "中文";
      case "en":
        return "English";
    }
  },
};
