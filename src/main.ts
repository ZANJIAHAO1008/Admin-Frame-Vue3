import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import pinia from "@/pinia";
import "@/assets/css/font-awesome.min.css"; //font 样式
import "animate.css/animate.min.css";
import '@/assets/style/dark.scss'
import '@/assets/style/light.scss'
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
