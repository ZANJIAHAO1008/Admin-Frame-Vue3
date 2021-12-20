import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { ElMessage } from "element-plus";
import { getToken } from '../util/auth.js';
import { transitionLocal } from '../locales/i18n'; //国际化
import NProgress from 'nprogress';//加载进度条
import 'nprogress/nprogress.css';
// 进度条配置项
NProgress.configure({
    showSpinner: false
})

//默认不需要权限的页面
const constantRouterMap = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: "/login",
        meta: {
            title: '登录'
        },
        component: () => import("../views/Login.vue")
    },
    {
        path: "/main",
        meta: {
            title: '基础'
        },
        component: () => import("../views/Main.vue"),
        children: [
            {
                path: "/homePage",
                meta: {
                    title: 'resource.homePage.name'
                },
                component: () => import("../views/homePage.vue")
            },
            {
                path: "/user",
                meta: {
                    title: 'resource.authority.children.user'
                },
                component: () => import("../views/setting/user.vue")
            },
            {
                path: "/role",
                meta: {
                    title: 'resource.authority.children.role'
                },
                component: () => import("../views/setting/role.vue")
            },
            {
                path: "/resource",
                meta: {
                    title: 'resource.authority.children.resource'
                },
                component: () => import("../views/setting/resource.vue")
            },
            {
                path: "/messageCenter",
                meta: {
                    title: 'resource.message.children.messageCenter'
                },
                component: () => import("../views/message/messageCenter.vue")
            },
            {
                path: "/easyForm",
                meta: {
                    title: 'resource.template.chlidren.easyForm'
                },
                component: () => import("../views/form/easyForm.vue")
            },
            {
                path: "/tableOperation",
                meta: {
                    title: 'resource.template.chlidren.tableOperation'
                },
                component: () => import("../views/form/tableOperation.vue")
            },
            {
                path: "/404",
                meta: {
                    title: 'resource.abnormalPage.children.404'
                },
                component: () => import("../views/abnormal/404.vue")
            },
            {
                path: "/403",
                meta: {
                    title: 'resource.abnormalPage.children.403'
                },
                component: () => import("../views/abnormal/403.vue")
            },
            {
                path: "/networkError",
                meta: {
                    title: 'resource.abnormalPage.children.networkError'
                },
                component: () => import("../views/abnormal/networkError.vue")
            },
            {
                path: "/noData",
                meta: {
                    title: 'resource.abnormalPage.children.noData'
                },
                component: () => import("../views/abnormal/noData.vue")
            },
            {
                path: "/build",
                meta: {
                    title: 'resource.abnormalPage.children.build'
                },
                component: () => import("../views/abnormal/build.vue")
            },
            {
                path: "/textEditor",
                meta: {
                    title: 'resource.editor.chlidren.textEditor'
                },
                component: () => import("../views/editor/textEditor.vue")
            },
            {
                path: "/markdown",
                meta: {
                    title: 'resource.editor.chlidren.markdown'
                },
                component: () => import("../views/editor/markdown.vue")
            },
            {
                path: "/successTip",
                meta: {
                    title: 'resource.result.chlidren.successTip'
                },
                component: () => import("../views/tip/success.vue")
            },
            {
                path: "/errorTip",
                meta: {
                    title: 'resource.result.chlidren.errorTip'
                },
                component: () => import("../views/tip/error.vue")
            },
            {
                path: "/warningTip",
                meta: {
                    title: 'resource.result.chlidren.warningTip'
                },
                component: () => import("../views/tip/warning.vue")
            },
            {
                path: "/dialogDrag",
                meta: {
                    title: 'resource.function.chlidren.dialogDrag'
                },
                component: () => import("../views/content/dialogDrag.vue")
            },
            {
                path: "/wartermark",
                meta: {
                    title: 'resource.function.chlidren.wartermark'
                },
                component: () => import("../views/content/wartermark.vue")
            },
            {
                path: "/map",
                meta: {
                    title: 'resource.function.chlidren.map'
                },
                component: () => import("../views/content/map.vue")
            },
            {
                path: "/timePicker",
                meta: {
                    title: 'resource.function.chlidren.timePicker'
                },
                component: () => import("../views/content/timePicker.vue")
            },
            {
                path: "/copy",
                meta: {
                    title: 'resource.function.chlidren.copy'
                },
                component: () => import("../views/content/copy.vue")
            },
            {
                path: "/computerMonitor",
                meta: {
                    title: 'resource.function.chlidren.computerMonitor'
                },
                component: () => import("../views/content/computerMonitor.vue")
            },
            {
                path: "/qrcode",
                meta: {
                    title: 'resource.function.chlidren.qrcode'
                },
                component: () => import("../views/content/qrcode.vue")
            },
            {
                path: "/infiniteScroll",
                meta: {
                    title: 'resource.function.chlidren.infiniteScroll'
                },
                component: () => import("../views/content/infiniteScroll.vue")
            },
            {
                path: "/cardList",
                meta: {
                    title: 'resource.template.chlidren.cardList'
                },
                component: () => import("../views/form/cardList.vue")
            },
            {
                path: "/workflow",
                meta: {
                    title: 'resource.workflow.name'
                },
                component: () => import("../views/workflow/index.vue")
            },
            {
                path: "/noviceGuide",
                meta: {
                    title: 'resource.noviceGuide.name'
                },
                component: () => import("../views/noviceGuide/index.vue")
            },
            {
                path: "/i18n",
                meta: {
                    title: 'resource.i18n.name'
                },
                component: () => import("../views/i18n/index.vue")
            },
        ]
    }
]

const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes: constantRouterMap,
})

//手动跳转的页面白名单
const whiteList = ['/login', '/404', '/403'];

router.beforeEach((to, from, next) => {

    document.title = `Admin Frame | ${transitionLocal('message.' + to.meta.title) ?? to.meta.title}`; //添加title
    const user = getToken();//获取token to.path !== '/login'
    NProgress.start();// 路由跳转前钩子函数中 - 执行进度条开始加载
    if (!to.matched.length) {
        next('/404');
    }
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
            ElMessage.error("无登陆凭证,无法访问,请先登陆!")
            next('/login')
        }

    }
});


// 路由跳转后钩子函数中 - 执行进度条加载结束
router.afterEach(() => {
    NProgress.done();
});

export default router;
