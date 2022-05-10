import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import { useMiddleware } from "./middleware";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    meta: {
      title: "resource.login.name",
    },
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/dashboard",
    meta: {
      title: "resource.dashboard.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "analysis",
        meta: {
          title: "resource.dashboard.children.analysis",
        },
        component: () => import("@/components/dashboard/analysis.vue"),
      },
      {
        path: "workbench",
        meta: {
          title: "resource.dashboard.children.workbench",
        },
        component: () => import("@/components/dashboard/workbench.vue"),
      }
    ],
  },
  {
    path: "/components",
    meta: {
      title: "resource.function.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "dialogDrag",
        meta: {
          title: "resource.function.children.dialogDrag",
          requiresAuth: true,
        },
        component: () => import("@/components/dialogDrag/index.vue"),
      },
      {
        path: "watermark",
        meta: {
          title: "resource.function.children.watermark",
        },
        component: () => import("@/components/watermark/index.vue"),
      },
      {
        path: "copy",
        meta: {
          title: "resource.function.children.copy",
        },
        component: () => import("@/components/copy/index.vue"),
      },
      {
        path: "computerMonitor",
        meta: {
          title: "resource.function.children.computerMonitor",
        },
        component: () => import("@/components/computerMonitor/index.vue"),
      },
      {
        path: "qrCode",
        meta: {
          title: "resource.function.children.qrCode",
        },
        component: () => import("@/components/qrCode/index.vue"),
      },
      {
        path: "infiniteScroll",
        meta: {
          title: "resource.function.children.infiniteScroll",
        },
        component: () => import("@/components/infiniteScroll/index.vue"),
      },
    ],
  },
  {
    path: "/template",
    meta: {
      title: "resource.template.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "cardList",
        meta: {
          title: "resource.template.children.cardList",
        },
        component: () => import("@/components/template/cardList.vue"),
      },
      {
        path: "easyForm",
        meta: {
          title: "resource.template.children.easyForm",
        },
        component: () => import("@/components/template/easyForm.vue"),
      },
      {
        path: "tableOperation",
        meta: {
          title: "resource.template.children.tableOperation",
        },
        component: () => import("@/components/template/tableOperation.vue"),
      },
    ],
  },
  {
    path: "/editor",
    meta: {
      title: "resource.editor.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "textEditor",
        meta: {
          title: "resource.editor.children.textEditor",
        },
        component: () => import("@/components/editor/textEditor.vue"),
      },
      {
        path: "markdown",
        meta: {
          title: "resource.editor.children.markdown",
        },
        component: () => import("@/components/editor/markdown.vue"),
      },
    ],
  },
  {
    path: "/tips",
    meta: {
      title: "resource.result.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "successTip",
        meta: {
          title: "resource.result.children.successTip",
        },
        component: () => import("@/components/tips/successTip.vue"),
      },
      {
        path: "errorTip",
        meta: {
          title: "resource.result.children.errorTip",
        },
        component: () => import("@/components/tips/errorTip.vue"),
      },
      {
        path: "warningTip",
        meta: {
          title: "resource.result.children.warningTip",
        },
        component: () => import("@/components/tips/warningTip.vue"),
      },
    ],
  },
  {
    path: "/global",
    meta: {
      title: "resource.abnormalPage.name",
    },
    component: () => import("@/layouts/global/index.vue"),
    children: [
      {
        path: "abnormal/404",
        meta: {
          title: "resource.abnormalPage.children.404",
        },
        component: () => import("@/components/abnormal/404.vue"),
      },
      {
        path: "abnormal/403",
        meta: {
          title: "resource.abnormalPage.children.403",
        },
        component: () => import("@/components/abnormal/403.vue"),
      },
      {
        path: "abnormal/networkError",
        meta: {
          title: "resource.abnormalPage.children.networkError",
        },
        component: () => import("@/components/abnormal/networkError.vue"),
      },
      {
        path: "abnormal/build",
        meta: {
          title: "resource.abnormalPage.children.build",
        },
        component: () => import("@/components/abnormal/build.vue"),
      },
    ],
  },
  {
    path: "/setting",
    meta: {
      title: "resource.authority.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "user",
        meta: {
          title: "resource.authority.children.user",
        },
        component: () => import("@/views/setting/user.vue"),
      },
      {
        path: "role",
        meta: {
          title: "resource.authority.children.role",
        },
        component: () => import("@/views/setting/role.vue"),
      },
      {
        path: "resource",
        meta: {
          title: "resource.authority.children.resource",
        },
        component: () => import("@/views/setting/resource.vue"),
      },
    ],
  },
  {
    path: "/main",
    meta: {
      title: "resource.other.name",
    },
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "feedbackCenter",
        meta: {
          title: "resource.message.children.feedbackCenter",
        },
        component: () => import("@/components/message/feedbackCenter.vue"),
      },
      {
        path: "noviceGuide",
        meta: {
          title: "resource.noviceGuide.name",
        },
        component: () => import("@/components/noviceGuide/index.vue"),
      },
      {
        path: "i18n",
        meta: {
          title: "resource.i18n.name",
        },
        component: () => import("@/components/i18n/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

useMiddleware(router); //路由中间件操作

export default router;
