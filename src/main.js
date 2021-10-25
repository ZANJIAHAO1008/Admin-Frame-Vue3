import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import './assets/css/font-awesome.min.css'
import store from './store'
import filters from "./filters";
import * as _public from "./util/utils";
import animated from 'animate.css'
import i18n from '../src/locales/i18n.js'
import 'amfe-flexible'
import dialogDrag from './directive/dialogDrag';
import copy from './directive/copy';
import moment from 'moment';
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
