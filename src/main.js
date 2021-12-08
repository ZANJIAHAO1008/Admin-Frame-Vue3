import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus'; //ElementUI库
import 'element-plus/lib/theme-chalk/index.css'; //ElementUI库样式
import './assets/css/font-awesome.min.css';//font 样式
import store from './store';
import filters from "./filters"; //全局过滤器
import * as _public from "./util/utils"; //一些全局方法
import animated from 'animate.css';//动画库
import i18n from '../src/locales/i18n.js'; //国际化
import 'amfe-flexible' //移动端适配
import { dialogDrag, copy } from './directives/index'; //自定义指令
import moment from 'moment'; //日期时间格式化
import 'default-passive-events'; //添加被动事件监听器来阻止’touchstart’事件
const app = createApp(App)
app.config.globalProperties._public = _public; //公共方法
app.config.globalProperties.$filters = filters; //公共过滤器
app.config.globalProperties.$moment = moment; //日期时间过滤器
app.use(ElementPlus,
    {
        i18n: i18n.global.t,
    })
app.use(i18n)
app.use(animated)
app.use(dialogDrag)
app.use(copy)
app.use(router)
app.use(store)
app.mount('#app')
