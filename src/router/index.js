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
            component: () => import ("../views/Home.vue"),
            children:[
                {
                    path:"/table",
                    meta: {
                        title: '表格'
                    },
                    component: () => import ("../views/Table.vue")
                },
                {
                    path:"/404",
                    meta: {
                        title: '该页面不存在'
                    },
                    component: () => import ("../views/404.vue")
                },
            ]
        }
    ],
})

router.beforeEach((to, from, next) => {
    document.title = `后台管理系统 - ${to.meta.title} `;

    console.log(to);
    const user = localStorage.getItem('person_name');
    if(!user && to.path!=='/login'){  //路由校验
        next('/login')
    }
    else if(!to.meta.title){ //不存在的页面进入404
        next('/404')
    }
    else{
        next();
    }
});

export default router;