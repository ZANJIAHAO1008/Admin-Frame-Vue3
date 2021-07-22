import {createRouter, createWebHashHistory} from 'vue-router'
import {ElLoading} from "element-plus";
import {getToken} from '../util/auth.js';
import NProgress from 'nprogress';//加载进度条
import 'nprogress/nprogress.css';
// 进度条配置项
NProgress.configure({
    showSpinner: false
})


const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: '/',
        redirect: '/login'
    },
        {
            path: "/login",
            meta: {
                title: '登录'
            },
            component: () => import ("../views/Login.vue")
        },
        {
            path:"/home",
            meta: {
                title: '首页'
            },
            component: () => import ("../views/Home.vue"),
            children: [
                {
                    path: "/homePage",
                    meta: {
                        title: '个人中心'
                    },
                    component: () => import ("../views/homePage.vue")
                },
                {
                    path: "/table",
                    meta: {
                        title: '基础表格'
                    },
                    component: () => import ("../views/Table.vue")
                },
                {
                    path: "/form",
                    meta: {
                        title: '基础表单'
                    },
                    component: () => import ("../views/Form.vue")
                },
                {
                    path: "/messageCenter",
                    meta: {
                        title: '消息中心'
                    },
                    component: () => import ("../views/messageCenter.vue")
                },
            ]
        },
        {
            path: "/404",
            meta: {
                title: '404'
            },
            component: () => import ("../views/404.vue")
        },
        {
            path: "/403",
            meta: {
                title: '403'
            },
            component: () => import ("../views/403.vue")
        },
    ],
})

//手动跳转的页面白名单
const whiteList = ['/login', '/404', '/403'];

router.beforeEach((to, from, next) => {
    document.title = `ZAN-ADMIN - ${to.meta.title} `; //添加title
    const user = getToken();//获取token to.path !== '/login'
    NProgress.start();// 路由跳转前钩子函数中 - 执行进度条开始加载
    if (user) {
        if (to.path === '/') {
            next();
        } else {
            next();
        }
    } else {
        if (whiteList.includes(to.path)) {  //如果是白名单无须token则直接进入
            next();
        } else {
            ElLoading.error("无token信息 请登陆")
            next('/login')
        }

    }
});


// 路由跳转后钩子函数中 - 执行进度条加载结束
router.afterEach(() => {
    NProgress.done();
});

export default router;
