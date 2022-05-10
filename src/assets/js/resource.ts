export default [
  //资源信息
  {
    resourceName: "message.resource.dashboard.name",
    resourceUrl: "/dashboard",
    resourceIcon: "fa fa-tachometer",
    children: [
      {
        resourceName: "message.resource.dashboard.children.workbench",
        resourceUrl: "/dashboard/workbench",
        children: [],
      },
      {
        resourceName: "message.resource.dashboard.children.analysis",
        resourceUrl: "/dashboard/analysis",
        children: [],
      },
    ],
  },
  {
    resourceName: "message.resource.function.name",
    resourceUrl: "/components",
    resourceIcon: "fa fa-wrench",
    children: [
      {
        resourceName: "message.resource.function.children.dialogDrag",
        resourceUrl: "/components/dialogDrag",
        children: [],
      },
      {
        resourceName: "message.resource.function.children.watermark",
        resourceUrl: "/components/watermark",
        children: [],
      },
      {
        resourceName: "message.resource.function.children.copy",
        resourceUrl: "/components/copy",
        children: [],
      },
      {
        resourceName: "message.resource.function.children.qrCode",
        resourceUrl: "/components/qrCode",
        children: [],
      },
      {
        resourceName: "message.resource.function.children.infiniteScroll",
        resourceUrl: "/components/infiniteScroll",
        children: [],
      },
      {
        resourceName: "message.resource.function.children.computerMonitor",
        resourceUrl: "/components/computerMonitor",
        children: [],
      },
    ],
  },
  {
    resourceName: "message.resource.template.name",
    resourceUrl: "/template",
    resourceIcon: "fa fa-file-text",
    children: [
      {
        resourceName: "message.resource.template.children.easyForm",
        resourceUrl: "/template/easyForm",
        children: [],
      },
      {
        resourceName: "message.resource.template.children.tableOperation",
        resourceUrl: "/template/tableOperation",
        children: [],
      },
      {
        resourceName: "message.resource.template.children.cardList",
        resourceUrl: "/template/cardList",
        children: [],
      },
    ],
  },
  {
    resourceName: "message.resource.editor.name",
    resourceUrl: "/editor",
    resourceIcon: "fa fa-bold",
    children: [
      {
        resourceName: "message.resource.editor.children.markdown",
        resourceUrl: "/editor/markdown",
        children: [],
      },
      {
        resourceName: "message.resource.editor.children.textEditor",
        resourceUrl: "/editor/textEditor",
        children: [],
      },
    ],
  },
  {
    resourceName: "message.resource.result.name",
    resourceUrl: "/tips",
    resourceIcon: "fa fa-random",
    children: [
      {
        resourceName: "message.resource.result.children.successTip",
        resourceUrl: "/tips/successTip",
        children: [],
      },
      {
        resourceName: "message.resource.result.children.warningTip",
        resourceUrl: "/tips/warningTip",
        children: [],
      },
      {
        resourceName: "message.resource.result.children.errorTip",
        resourceUrl: "/tips/errorTip",
        children: [],
      },
    ],
  },
  {
    resourceName: "message.resource.abnormalPage.name",
    resourceUrl: "/global/abnormal",
    resourceIcon: "fa fa-exclamation-triangle",
    children: [
      {
        resourceName: "message.resource.abnormalPage.children.404",
        resourceUrl: "/global/abnormal/404",
        children: [],
      },
      {
        resourceName: "message.resource.abnormalPage.children.403",
        resourceUrl: "/global/abnormal/403",
        children: [],
      },
      {
        resourceName: "message.resource.abnormalPage.children.build",
        resourceUrl: "/global/abnormal/build",
        children: [],
      },
      {
        resourceName: "message.resource.abnormalPage.children.networkError",
        resourceUrl: "/global/abnormal/networkError",
        children: [],
      },
    ],
  },
  {
    resourceName: "message.resource.message.name",
    resourceUrl: "/messageManagement",
    resourceIcon: "fa fa-comment",
    children: [
      {
        resourceName: "message.resource.message.children.feedbackCenter",
        resourceUrl: "/main/feedbackCenter",
        children: [],
      },
    ],
  },
  {
    resourceName: "message.resource.authority.name",
    resourceUrl: "/setting",
    resourceIcon: "fa fa-cog",
    children: [
      {
        resourceName: "message.resource.authority.children.user",
        resourceUrl: "/setting/user",
        children: [],
      },
      {
        resourceName: "message.resource.authority.children.role",
        resourceUrl: "/setting/role",
        children: [],
      },
      {
        resourceName: "message.resource.authority.children.resource",
        resourceUrl: "/setting/resource",
        children: [],
      },
    ],
  },
  {
    resourceName: "message.resource.noviceGuide.name",
    resourceUrl: "/main/noviceGuide",
    resourceIcon: "fa fa-question-circle-o",
    children: [],
  },
  {
    resourceName: "message.resource.i18n.name",
    resourceUrl: "/main/i18n",
    resourceIcon: "fa fa-language",
    children: [],
  },
];
