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
                    path: "/404",
                    meta: {
                        title: '404'
                    },
                    component: () => import ("../views/404.vue")
                },
                {
                    path: "/403",
                    meta: {
                        title: '404'
                    },
                    component: () => import ("../views/403.vue")
                },
                {
                    path: "/messageCenter",
                    meta: {
                        title: '消息中心'
                    },
                    component: () => import ("../views/messageCenter.vue")
                },
            ]
        }
    ],
})

// router.beforeEach((to, from, next) => {
//     document.title = `后台管理系统 - ${to.meta.title} `;
//     const user = localStorage.getItem('person_name');
//     if(!user && to.path!=='/login'){  //路由校验
//         next('/login')
//     }
//     else if(!to.meta.title){ //不存在的页面进入404
//         next('/404')
//     }
//     else{
//         next();
//     }
// });

export default router;