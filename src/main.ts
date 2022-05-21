import { createApp } from "vue";
import "@/pinia/modules/config";
import App from "./App.vue";
import router from "@/router";
import pinia from "@/pinia";
// import 'uno.css'
import "default-passive-events";
import "vue-global-api"; //自动引入vue插件
import { loadAllPlugins } from "@/plugins";
const app = createApp(App);
// 加载所有插件
loadAllPlugins(app);
app.use(router);
app.use(pinia);
app.mount("#app");
