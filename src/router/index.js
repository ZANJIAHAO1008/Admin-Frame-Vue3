import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: '/',
        redirect: '/login'
    },
        {
            path:"/login",
            meta: {
                title: '登录'
            },
            component: () => import ("../views/Login.vue")
        },
        {
            path:"/home",
            meta: {
                title: '主页'
            },
            component: () => import ("../views/Home.vue")
        }
    ],
})
export default router;