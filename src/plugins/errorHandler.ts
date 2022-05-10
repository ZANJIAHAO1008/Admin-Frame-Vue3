export default function load(app: any) {
  app.config.errorHandler = (err: string, instance: any, info: object) => {
    // 向追踪服务报告错误
    console.error("全局异常捕捉:", err, instance, info);
  };
}
