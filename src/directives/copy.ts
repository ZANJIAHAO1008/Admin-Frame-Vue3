import { ElMessage } from "element-plus";
import Clipboard from "clipboard";
const copy = (app: any, options: any) => {
  app.directive("copy", {
    mounted(el: any, binding: any) {
      el.addEventListener("click", () => {
        const clipboard = new Clipboard(`.${binding?.value}`);
        clipboard.on("success", (e) => {
          console.log(`指令方法复制成功`);
          ElMessage({
            message: `指令方法复制成功`,
            type: "success",
          });
          // 释放内存
          clipboard.destroy();
        })
        clipboard.on("error", (e) => {
          // 不支持复制
          //console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy();
        })
      });
    },
  });
}
export default copy;
